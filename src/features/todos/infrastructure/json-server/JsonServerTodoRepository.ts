import { Err, Ok, type Result } from "../../domain/errors/Result";
import type { ToDo } from "../../domain/ToDo";
import type { ToDoRepository } from "../../domain/ToDoRepository";
import { JsonServerTodoAdapter } from "./adapters/JsonServerTodoAdapter";
import type { JsonServerTodo } from "./JsonServerTodo";

const url = "http://localhost:8000/todos";

export const JsonServerTodoRepository: ToDoRepository = {
  async getAll(): Promise<Result<ToDo[], Error>> {
    try {
      debugger;
      const response = await fetch(url);
      const data: JsonServerTodo[] = await response.json();

      const todos = data.map((element) =>
        JsonServerTodoAdapter.toDomainTodo(element)
      );

      return Ok(todos);
    } catch (error) {
      return Err(error as Error);
    }
  },
  async getById(id: number): Promise<ToDo | null> {
    throw new Error("Function not implemented.");
  },
  async create(todo: ToDo): Promise<Result<void, Error>> {
    const jsonServerNewTodo = JsonServerTodoAdapter.fromDomainTodo(todo);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonServerNewTodo),
    });

    if (!response.ok) {
      return Err(new Error("Failed to create todo"));
    }

    return Ok();
  },
  async update(todo: ToDo): Promise<Result<void, Error>> {
    throw new Error("Function not implemented.");
  },
  async delete(id: number): Promise<Result<void, Error>> {
    debugger;

    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return Err(new Error("Failed to delete todo"));
    }

    return Ok();
  },
};
