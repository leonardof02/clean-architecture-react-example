import { FetchTodosError } from "../../domain/errors/FetchTodosError";
import type { Label } from "../../domain/Label";
import type { ToDo } from "../../domain/ToDo";
import type { ToDoCompletionStatus } from "../../domain/ToDoCompletionStatus";
import type { ToDoRepository } from "../../domain/ToDoRepository";

export type CreateTodoCommand = {
  title: string;
  description: string;
  labels: Label[];
  todoCompletionStatus: ToDoCompletionStatus;
};

export function CreateTodo(toDoRepository: ToDoRepository) {
  return async (createTodoCommand: CreateTodoCommand) => {
    const { title, description, labels, todoCompletionStatus } =
      createTodoCommand;

    const todo: ToDo = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      description: description,
      todoCompletionStatus: todoCompletionStatus,
      labels: labels,
    };

    const result = await toDoRepository.create(todo);
    if (!result.ok) throw new FetchTodosError("Failed to fetch todos");
  };
}
