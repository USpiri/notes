export interface TreeNode {
  id: string;
  parent: string;
  text: string;
  droppable?: boolean;
  data?: any;
}
