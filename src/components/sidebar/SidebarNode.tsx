import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { SidebarFolder } from "./SidebarFolder";
import { SidebarItem } from "./SidebarItem";
import { Suspense } from "react";
import { SidebarContextMenu } from "./SidebarContextMenu";

interface SidebarNodeProps {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
}

export const SidebarNode = ({
  node,
  depth,
  isOpen,
  onToggle,
}: SidebarNodeProps) => {
  const { id, droppable } = node;
  const indent = depth * 15;

  const handleToggle = () => {
    onToggle(id);
  };

  const dragOverProps = useDragOver(id, isOpen, onToggle);

  return (
    <div style={{ marginLeft: indent }} {...dragOverProps} className="text-xs">
      <SidebarContextMenu
        isFolder={droppable ?? false}
        id={node.id.toString()}
        parentId={node.parent.toString()}
        className="z-10"
      >
        {droppable ? (
          <SidebarFolder
            id={node.id.toString()}
            text={node.text}
            isOpen={isOpen}
            onClick={handleToggle}
          />
        ) : (
          <Suspense>
            <SidebarItem id={node.id.toString()} text={node.text} />
          </Suspense>
        )}
      </SidebarContextMenu>
    </div>
  );
};
