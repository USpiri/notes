import { BubbleMenu as Bubble, isTextSelection } from "@tiptap/react";
import { Fragment, useCallback } from "react";
import { MENU } from "./menu";
import { Button } from "../ui/button";
import { EditorView } from "@tiptap/pm/view";
import { EditorState } from "@tiptap/pm/state";
import { Editor } from "@tiptap/core";
import { LinkPopover } from "./link-menu/LinkPopover";

export interface ShouldShowProps {
  editor: Editor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}

export const isTextSelected = ({ editor }: { editor: Editor }) => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  } = editor;

  const isEmptyTextBlock =
    !doc.textBetween(from, to).length && isTextSelection(selection);

  // TODO: replace editor.isActive("codeBlock") with
  // custom function "isCustomNodeSelected"
  if (
    empty ||
    isEmptyTextBlock ||
    !editor.isEditable ||
    editor.isActive("codeBlock") ||
    editor.isActive("link") ||
    editor.isActive("mathDisplay") ||
    editor.isActive("mathInline") ||
    editor.isActive("imageBlock")
  ) {
    return false;
  }

  return true;
};

export const BubbleMenu = ({ editor }: { editor: Editor }) => {
  const handleLink = useCallback(
    (url: string, inNewTab?: boolean) =>
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: inNewTab ? "_blank" : "" })
        .run(),
    [editor],
  );

  return (
    <Bubble
      editor={editor}
      tippyOptions={{ popperOptions: { placement: "top-start" } }}
      shouldShow={({ view, editor }) => {
        if (!view) return false;
        return isTextSelected({ editor });
      }}
    >
      <div className="flex gap-0.5 rounded border border-neutral-800 bg-neutral-950 px-2 py-1">
        {MENU.map((group) => (
          <Fragment key={group.name}>
            {group.commands
              .filter((i) => i.inline)
              .map((command) => {
                // TODO: Improve commands renderinf to not use ifs
                if (command.name === "link") {
                  return (
                    <LinkPopover key={command.name} onSetLink={handleLink} />
                  );
                } else {
                  return (
                    <Button
                      key={command.name}
                      onClick={() => command.action(editor)}
                      size="icon"
                      title={command.label}
                      variant={
                        (command.shouldBeMarked &&
                          command.shouldBeMarked(editor)) ??
                        false
                          ? "outline"
                          : "ghost"
                      }
                      className="h-[unset] w-[unset] rounded border border-transparent p-1"
                    >
                      <command.icon className="h-4 w-4" />
                    </Button>
                  );
                }
              })}
          </Fragment>
        ))}
      </div>
    </Bubble>
  );
};
