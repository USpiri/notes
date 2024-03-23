import { Note } from "./note.interface";

export interface Folder {
  id: string;
  name: string;
  notes: Note[];
  folders: Folder[];
}
