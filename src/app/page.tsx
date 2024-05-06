import { Note } from "@/components/note/Note";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl py-16">
      <Suspense>
        <Note />
      </Suspense>
    </main>
  );
}
