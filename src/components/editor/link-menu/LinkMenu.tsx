import { BubbleMenu, Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import { LinkPreview } from "./LinkPreview";
import { LinkEditor } from "./LinkEditor";

interface LinkMenuProps {
  editor: Editor;
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
}

export const LinkMenu = ({ editor }: LinkMenuProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const { href: link, target } = editor.getAttributes("link");

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("link");
    return isActive;
  }, [editor]);

  const handleEdit = useCallback(() => setShowEdit(true), []);

  const handleClear = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowEdit(false);
    return null;
  }, [editor]);

  const handleSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: url,
          target: openInNewTab ? "_blank" : "",
        })
        .run();
      setShowEdit(false);
    },
    [editor],
  );

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        onHidden: () => {
          setShowEdit(false);
        },
      }}
    >
      {showEdit ? (
        <LinkEditor
          url={link}
          newTab={target === "_blank"}
          onSetLink={handleSetLink}
        />
      ) : (
        <LinkPreview url={link} onEdit={handleEdit} onClear={handleClear} />
      )}
    </BubbleMenu>
  );
};
