import type { ToDo } from "@/features/todos/domain/ToDo";
import type { JsonServerTodo } from "../JsonServerTodo";
import type { Label } from "@/features/todos/domain/Label";
import type { ToDoCompletionStatus } from "@/features/todos/domain/ToDoCompletionStatus";

export const JsonServerTodoAdapter = {
  toDomainTodo(jsonServerTodo: JsonServerTodo): ToDo {
    return {
      id: parseInt(jsonServerTodo.id),
      title: jsonServerTodo.title,
      description: jsonServerTodo.description,
      todoCompletionStatus: jsonServerTodo.status as ToDoCompletionStatus,
      labels: jsonServerTodo.labels.map((label) => ({ name: label } as Label)),
    };
  },

  // Convierte de dominio → API/DB
  fromDomainTodo(todo: ToDo): JsonServerTodo {
    return {
      id: todo.id.toString(),
      title: todo.title,
      description: todo.description,
      status: todo.todoCompletionStatus,
      labels: todo.labels.map((label) => label.name),
    };
  },
};
