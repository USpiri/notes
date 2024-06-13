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
import { Search, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

export const SidebarContent = () => {
  const treeStore = useNoteStore((s) => s.folders);
  const updateFolders = useNoteStore((s) => s.updateFolders);

  const [tree, setTree] = useState<NodeModel[]>([]);
  const [searchParam, setSearchParam] = useState("");

  const handleDrop = (node: NodeModel[]) => updateFolders(node as TreeNode[]);
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchParam(search);
    if (search.length) {
      filterTree(search);
    } else {
      setTree(treeStore);
    }
  };

  const filterTree = (search: string) => {
    setTree(
      treeStore
        .filter((t) => t.text.toLowerCase().includes(search) && !t.droppable)
        .map((t) => ({ ...t, parent: "root" })),
    );
  };

  useEffect(() => {
    if (searchParam.length) {
      filterTree(searchParam);
    } else {
      setTree(treeStore);
    }
  }, [treeStore]);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div>
        <label className="m-1 mb-0 flex items-center gap-2 rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-300">
          <Search className="h-4 w-4" />
          <input
            placeholder="Search..."
            onChange={handleSearch}
            value={searchParam}
            className="flex-1 bg-transparent py-1 placeholder-neutral-400 outline-none placeholder:font-medium"
          />
          {searchParam.length > 0 && (
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => {
                setSearchParam("");
                setTree(treeStore);
              }}
            />
          )}
        </label>
      </div>
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
