import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import React, { Fragment } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { MENU } from "./menu";
import "./extensions/math/math.css";

interface EditorMenuProps {
  vertical: boolean;
  editable: boolean;
  editor: Editor;
}

export const EditorMenu = ({ vertical, editable, editor }: EditorMenuProps) => {
  return (
    <div
      className={cn(
        "z-10 bg-neutral-950",
        vertical ? "flex" : "sticky top-0 block",
      )}
    >
      <Separator orientation={vertical ? "vertical" : "horizontal"} />
      <div>
        <div
          className={cn(
            "flex justify-start gap-1",
            vertical
              ? "sticky top-0 mx-1.5 flex-col py-2 pt-12 md:pt-2"
              : "mx-1 my-2 flex-wrap",
          )}
        >
          {MENU.map((group, index) => (
            <Fragment key={group.name}>
              {group.commands.map((command) => (
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
                  className="border border-transparent"
                  disabled={!editable}
                >
                  <command.icon className="h-4 w-4" />
                </Button>
              ))}
              {index < MENU.length - 1 && (
                <Separator
                  className={cn(
                    "hidden h-auto md:block",
                    vertical ? "my-1 h-px" : "mx-0.5",
                  )}
                  orientation={vertical ? "horizontal" : "vertical"}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Separator orientation={vertical ? "vertical" : "horizontal"} />
    </div>
  );
};
