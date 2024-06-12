import { Extension } from "@tiptap/react";
import { MathDisplay } from "./math-display/math-display";
import { MathInline } from "./math-inline/math-inline";

export const Math = Extension.create({
  name: "math",
  addExtensions() {
    return [MathDisplay, MathInline];
  },
});
