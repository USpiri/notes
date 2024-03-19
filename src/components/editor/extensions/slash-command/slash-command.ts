import { PluginKey } from "@tiptap/pm/state";
import { Extension, ReactRenderer } from "@tiptap/react";
import Suggestion, {
  SuggestionProps,
  SuggestionKeyDownProps,
} from "@tiptap/suggestion";

import tippy from "tippy.js";

import { SlashMenu } from "./SlashMenu";
import { MENU } from "../../menu";

const name = "slashCommand";
let popup: any;

export const SlashCommand = Extension.create({
  name,
  priority: 200,
  onCreate() {
    popup = tippy("body", {
      interactive: true,
      trigger: "manual",
      placement: "bottom-start",
      popperOptions: {
        strategy: "fixed",
        modifiers: [{ name: "flip", enabled: false }],
      },
    });
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: "/",
        allowSpaces: true,
        startOfLine: true,
        pluginKey: new PluginKey(name),
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const isRootDepth = $from.depth === 1;
          const isParagraph = $from.parent.type.name === "paragraph";
          const isStartOfLine = $from.parent.textContent.charAt(0) === "/";
          // const isInColumn = this.editor.isActive('column');
          const afterContent = $from.parent.textContent.substring(
            $from.parent.textContent.indexOf("/"),
          );
          const isValidAfterContent = !afterContent.endsWith("  ");

          return (
            isRootDepth && isParagraph && isStartOfLine && isValidAfterContent
          );
        },
        command: ({ editor, props }) => {
          console.log("COMMAND");

          const { view, state } = editor;
          const { $from, $head } = view.state.selection;

          const end = $from.pos;
          const from = $head?.nodeBefore
            ? end -
              ($head.nodeBefore.text?.substring(
                $head.nodeBefore.text?.indexOf("/"),
              ).length ?? 0)
            : $from.start();

          const tr = state.tr.deleteRange(from, end);
          view.dispatch(tr);

          props.action(editor);
          view.focus();
        },
        items: ({ query }) => {
          const withFilteredCommands = MENU.map((group) => ({
            ...group,
            commands: group.commands
              .filter((item) => {
                const labelNormalized = item.label.toLowerCase().trim();
                const queryNormalized = query.toLowerCase().trim();

                if (item.aliases) {
                  const aliases = item.aliases.map((alias) =>
                    alias.toLowerCase().trim(),
                  );

                  return (
                    labelNormalized.includes(queryNormalized) ||
                    aliases.includes(queryNormalized)
                  );
                }

                return labelNormalized.includes(queryNormalized);
              })
              .filter((command) =>
                command.shouldBeHidden
                  ? !command.shouldBeHidden(this.editor)
                  : true,
              ),
          }));

          const withoutEmptyGroups = withFilteredCommands.filter((group) => {
            if (group.commands.length > 0) {
              return true;
            }

            return false;
          });

          const withEnabledSettings = withoutEmptyGroups.map((group) => ({
            ...group,
            commands: group.commands.map((command) => ({
              ...command,
              isEnabled: true,
            })),
          }));

          return withEnabledSettings;
        },

        render: () => {
          let component: any;
          let scrollHandler: (() => void) | null = null;
          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(SlashMenu, {
                props,
                editor: props.editor,
              });

              const { view } = props.editor;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[name].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[name].rect;
                }

                let yPos = rect.y;

                if (
                  rect.top + component.element.offsetHeight + 40 >
                  window.innerHeight
                ) {
                  const diff =
                    rect.top +
                    component.element.offsetHeight -
                    window.innerHeight +
                    40;
                  yPos = rect.y - diff;
                }

                return new DOMRect(rect.x, yPos, rect.width, rect.height);
              };

              scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              popup?.[0].setProps({
                getReferenceClientRect,
                appendTo: () => document.body,
                content: component.element,
              });

              popup?.[0].show();
            },
            onUpdate(props: SuggestionProps) {
              component.updateProps(props);

              const { view } = props.editor;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[name].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[name].rect;
                }

                return new DOMRect(rect.x, rect.y, rect.width, rect.height);
              };

              let scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              props.editor.storage[name].rect = props.clientRect
                ? getReferenceClientRect()
                : {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  };
              popup?.[0].setProps({
                getReferenceClientRect,
              });
            },

            onKeyDown(props: SuggestionKeyDownProps) {
              if (props.event.key === "Escape") {
                popup?.[0].hide();

                return true;
              }

              if (!popup?.[0].state.isShown) {
                popup?.[0].show();
              }

              return component.ref?.onKeyDown(props);
            },

            onExit(props) {
              popup?.[0].hide();
              if (scrollHandler) {
                const { view } = props.editor;
                view.dom.parentElement?.removeEventListener(
                  "scroll",
                  scrollHandler,
                );
              }
              component.destroy();
            },
          };
        },
      }),
    ];
  },
  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  },
});
