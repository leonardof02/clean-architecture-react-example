import { FetchTodosError } from "@/features/todos/domain/errors/FetchTodosError";
import type { ToDoRepository } from "../../domain/ToDoRepository";
import type { ToDo } from "@/features/todos/domain/ToDo";
import { Err, Ok, type Result } from "@/features/todos/domain/errors/Result";
import type { DomainError } from "@/features/todos/domain/DomainError";

export function GetAllTodos(todoRepository: ToDoRepository) {
  
  return async (): Promise<Result<ToDo[], DomainError>> => {
    const result = await todoRepository.getAll();
    if (result.ok) return Ok(result.value);
    else return Err(new FetchTodosError("Failed to fetch todos"));
  };
}
