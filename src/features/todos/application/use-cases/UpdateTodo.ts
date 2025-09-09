import { DomainError } from "../../domain/DomainError";
import type { ToDo } from "../../domain/ToDo";
import type { ToDoRepository } from "../../domain/ToDoRepository";

export type UpdateTodoCommand = Partial<Omit<ToDo, "id">> & {
  id: number;
};

export const UpdateTodo = (toDoRepository: ToDoRepository) => {
  return async (command: UpdateTodoCommand) => {
    const todo = await toDoRepository.getById(command.id);
    if (!todo) throw new DomainError("Todo not found", "TODO_NOT_FOUND");

    const { id, description, labels, todoCompletionStatus, title } = todo;
    const todoToUpdate = {
      id,
      description,
      labels,
      todoCompletionStatus,
      title,
    };

    const updatedTodo: ToDo = {
      ...todoToUpdate,
      ...command,
    };

    return await toDoRepository.update(updatedTodo);
  };
};
