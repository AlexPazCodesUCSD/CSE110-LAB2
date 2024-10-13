export enum Label {
  personal = "personal",
  study = "study",
  work = "work",
  other = "other",
}

export type Note = {
  favorite: boolean;
  id: number;
  title: string;
  content: string;
  label: Label;
};

