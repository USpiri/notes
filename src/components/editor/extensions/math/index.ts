import { Extension } from "@tiptap/react";
import { MathDisplay } from "./math-display/math-display";
import "./math.css";

export const Math = Extension.create({
  name: "math",
  addExtensions() {
    return [MathDisplay];
  },
});
