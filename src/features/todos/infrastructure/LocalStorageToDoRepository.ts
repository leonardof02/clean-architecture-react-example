import { Err, type Result, Ok } from "@/features/todos/domain/errors/Result";
import type { ToDo } from "../domain/ToDo";
import type { ToDoRepository } from "../domain/ToDoRepository";

export const LocalStorageTodoRepository: ToDoRepository = {
  async getAll(): Promise<Result<ToDo[]>> {
    try {
      const todos = JSON.parse(localStorage.getItem("todos") ?? "[]");
      await Promise.resolve();
      return Ok(todos);
    } catch (error) {
      return Err(error as Error);
    }
  },

  async create(todo: ToDo): Promise<Result<undefined>> {
    try {
      const todos = JSON.parse(localStorage.getItem("todos") ?? "[]") || [];
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      Promise.resolve();
      return Ok(undefined);
    } catch (error) {
      return Err(error as Error);
    }
  },

  async update(todo: ToDo): Promise<Result<void>> {
    try {
      const todos: ToDo[] =
        JSON.parse(localStorage.getItem("todos") ?? "[]") || [];
      const index = todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        todos[index] = todo;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      return Ok();
    } catch (error) {
      return Err(error as Error);
    }
  },

  async delete(id: number): Promise<Result<void>> {
    try {
      const todos: ToDo[] =
        JSON.parse(localStorage.getItem("todos") ?? "[]") || [];
      const index = todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      return Ok();
    } catch (error) {
      return Err(error as Error);
    }
  },

  async getById(id: number): Promise<ToDo | null> {
    try {
      const todos: ToDo[] =
        JSON.parse(localStorage.getItem("todos") ?? "[]") || [];
      const index = todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        return Promise.resolve(todos[index]);
      } else {
        return Promise.resolve(null);
      }
    } catch (error) {
      throw new Error("Failed to fetch todo");
    }
  },
};
