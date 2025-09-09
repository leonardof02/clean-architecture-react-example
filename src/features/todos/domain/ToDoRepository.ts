import type { Result } from "./errors/Result";
import type { ToDo } from "./ToDo";

export interface ToDoRepository {
  getAll(): Promise<Result<ToDo[], Error>>;
  getById(id: number): Promise<ToDo | null>;
  create(todo: ToDo): Promise<Result<void, Error>>;
  update(todo: ToDo): Promise<Result<void, Error>>;
  delete(id: number): Promise<Result<void, Error>>;
}
