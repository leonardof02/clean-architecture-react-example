import type { Label } from "./Label";
import type { ToDoCompletionStatus } from "./ToDoCompletionStatus";

export type ToDo = {
  id: number;
  title: string;
  description: string;
  todoCompletionStatus: ToDoCompletionStatus;
  labels: Label[];
};
