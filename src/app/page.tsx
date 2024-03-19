import { NoteEditor } from "@/components/editor/NoteEditor";
import { CONTENT } from "@/lib/content";

export default function Home() {
  const editor = {
    content: CONTENT,
    vertical: false,
  };
  return (
    <main className="mx-auto w-full max-w-3xl py-16">
      <NoteEditor editorConfig={editor} />
    </main>
  );
}
