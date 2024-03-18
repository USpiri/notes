import { NoteEditor } from "@/components/editor/NoteEditor";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl py-16">
      <NoteEditor content="<h1>Hello</h1>" />
    </main>
  );
}
