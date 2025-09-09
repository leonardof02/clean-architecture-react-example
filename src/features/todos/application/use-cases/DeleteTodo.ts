import { DomainError } from "../../domain/DomainError";
import type { ToDoRepository } from "../../domain/ToDoRepository";

export type DeleteTodoCommand = {
  id: number;
};

export function DeleteTodo(toDoRepository: ToDoRepository) {
  return async (command: DeleteTodoCommand) => {
    const { id } = command;
    const result = await toDoRepository.delete(id);
    if (!result.ok)
      throw new DomainError("Failed to delete todo", "DELETE_TODO_ERROR");
  };
}
