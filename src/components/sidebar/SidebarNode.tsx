import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { SidebarFolder } from "./SidebarFolder";
import { SidebarItem } from "./SidebarItem";

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
      {droppable ? (
        <SidebarFolder
          id={node.id.toString()}
          text={node.text}
          isOpen={isOpen}
          onClick={handleToggle}
        />
      ) : (
        <SidebarItem id={node.id.toString()} text={node.text} />
      )}
    </div>
  );
};

interface WrapperProp {
  children: React.ReactNode;
  onClick?: () => void;
}

export const NodeItemWrapper = ({ children, onClick }: WrapperProp) => {
  return (
    <div
      className="flex items-center gap-2 rounded px-2 py-0.5 hover:bg-neutral-900"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
