import { TreeNode } from "@/models/node.interface";
import { useNoteStore } from "@/store/note-store";
import {
  MultiBackend,
  NodeModel,
  Tree,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { SidebarNode } from "./SidebarNode";

export const SidebarContent = () => {
  const tree = useNoteStore((s) => s.folders);
  const updateFolders = useNoteStore((s) => s.updateFolders);

  const handleDrop = (node: NodeModel[]) => updateFolders(node as TreeNode[]);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className="flex h-full flex-col gap-2 overflow-y-auto">
        <Tree
          tree={tree}
          rootId="root"
          sort={false}
          dropTargetOffset={5}
          insertDroppableFirst
          enableAnimateExpand
          onDrop={handleDrop}
          canDrop={(_, { dragSource, dropTargetId }) => {
            if (dragSource?.parent === dropTargetId) {
              return true;
            }
          }}
          classes={{
            dropTarget: "bg-cyan-900/20 rounded",
            draggingSource: "opacity-20",
            root: "border-none h-full",
            listItem: "pt-1",
          }}
          placeholderRender={(_, { depth }) => <Placeholder depth={depth} />}
          render={(node, { depth, isOpen, onToggle }) => (
            <SidebarNode
              node={node}
              depth={depth}
              isOpen={isOpen}
              onToggle={onToggle}
            />
          )}
        />
      </div>
    </DndProvider>
  );
};

interface PlaceholderProps {
  depth: number;
}

const Placeholder = ({ depth }: PlaceholderProps) => {
  return (
    <div
      className="absolute right-0 mx-2 h-0.5 bg-cyan-800"
      style={{ left: depth * 15 }}
    />
  );
};
