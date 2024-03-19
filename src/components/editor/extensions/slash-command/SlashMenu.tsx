import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Command, MenuGroup } from "@/models/menu.interface";

interface SlashMenuProps {
  editor: Editor;
  items: MenuGroup[];
  command: (command: Command) => void;
}

export const SlashMenu = React.forwardRef((props: SlashMenuProps, ref) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const activeItem = useRef<HTMLButtonElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [props.items]);

  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex].commands[commandIndex];
      props.command(command);
    },
    [props],
  );

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === "ArrowDown") {
        if (!props.items.length) {
          return false;
        }

        const commands = props.items[selectedGroupIndex].commands;

        let newCommandIndex = selectedCommandIndex + 1;
        let newGroupIndex = selectedGroupIndex;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex + 1;
        }

        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "ArrowUp") {
        if (!props.items.length) {
          return false;
        }

        let newCommandIndex = selectedCommandIndex - 1;
        let newGroupIndex = selectedGroupIndex;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1;
          newCommandIndex =
            props.items[newGroupIndex]?.commands.length - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1;
          newCommandIndex = props.items[newGroupIndex].commands.length - 1;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "Enter") {
        if (
          !props.items.length ||
          selectedGroupIndex === -1 ||
          selectedCommandIndex === -1
        ) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop;
      const offsetHeight = activeItem.current.offsetHeight;

      scrollContainer.current.scrollTop = offsetTop - offsetHeight;
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex);
      };
    },
    [selectItem],
  );

  const setSelectedIndex = (group: number, command: number) => {
    setSelectedCommandIndex(command);
    setSelectedGroupIndex(group);
  };

  if (!props.items.length) return null;

  return (
    <aside
      ref={scrollContainer}
      className="max-h-72 w-56 overflow-auto rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1"
    >
      {props.items.map((group, groupIndex) => (
        <div key={group.name}>
          <div className="mt-2 text-xs font-semibold text-neutral-500">
            {group.title}
          </div>
          <ul className="my-1 flex flex-col gap-1">
            {group.commands.map((command, commandIndex) => (
              <li key={command.name}>
                <button
                  className={cn(
                    "flex w-full items-center gap-2 rounded px-2 py-1",
                    selectedGroupIndex === groupIndex &&
                      selectedCommandIndex === commandIndex
                      ? "bg-neutral-900"
                      : "",
                  )}
                  onClick={createCommandClickHandler(groupIndex, commandIndex)}
                  onMouseEnter={() =>
                    setSelectedIndex(groupIndex, commandIndex)
                  }
                >
                  {/* <div className="bg-neutral-200 rounded-sm p-2 text-neutral-700"> */}
                  {/*   <command.icon className="h-4 w-4" /> */}
                  {/* </div> */}
                  <command.icon className="h-4 w-4" />
                  <div className="text-sm">{command.label}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
});

SlashMenu.displayName = "MenuList";
export default SlashMenu;
