import { Dayjs } from "dayjs";

export enum Color {
  Red = "red",
  Purple = "purple",
  Orange = "orange",
  Green = "green",
}
export enum Status {
  Block = "Block",
  Todo = "To Do",
  Onprogress = "On Progress",
  Done = "Done",
}
export enum Tag {
  Low = "Low",
  High = "High",
  Completed = "Completed",
  InProgress = "In progress",
}
export type TaskT = {
  id: number;
  name: string;
  project: string;
  lead: string;
  deadline: Date | null | Dayjs | string;
  creator: string;
  status: Status;
  description: string;
  tags: Tag[];
};
export type FormT = {
  name: string;
  project: string;
  lead: string;
  deadline: Date | null | Dayjs | string;
  creator: string;
  status: Status;
  description: string;
  tags: Tag[];
  startTime?: Dayjs | null | Date;
  endTime?: Dayjs | null | Date;
  id: number;
};
export type ChangeT = {
  id: number;
  status: Status;
};
