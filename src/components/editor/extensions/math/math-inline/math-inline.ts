// import { Node, ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";
// import { Callout } from "./CalloutComponent";
//
// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     inlineMath: {
//       toggleCallout: () => ReturnType;
//     };
//   }
// }
//
// const name = "inline-math";
//
// export const CalloutExtension = Node.create({
//   name,
//   group: "inline",
//   inline: true,
//   selectable: true,
//   atom: true,
//
//   parseHTML() {
//     return [{ tag: this.name }];
//   },
//
//   renderHTML({ HTMLAttributes }) {
//     return [this.name, mergeAttributes(HTMLAttributes), 0];
//   },
//
//   addAttributes() {
//     return {
//       latex: {
//         default: "",
//       },
//     };
//   },
//
//   addNodeView() {
//     return ReactNodeViewRenderer(Callout);
//   },
//
//   addCommands() {
//     return {
//       toggleCallout:
//         () =>
//         ({ commands }) => {
//           return commands.toggleWrap(this.name);
//         },
//     };
//   },
// });
