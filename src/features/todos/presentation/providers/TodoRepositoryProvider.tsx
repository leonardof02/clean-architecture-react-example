import React from "react";
import type { ToDoRepository } from "../../domain/ToDoRepository";
import { JsonServerTodoRepository } from "../../infrastructure/json-server/JsonServerTodoRepository";

type ContextType = ToDoRepository | null;

type Props = {
  children: React.ReactNode;
};

const TodoRepositoryContext = React.createContext<ContextType>(null);

// Proveer el Repository de Infrastructura
const todoRepository = JsonServerTodoRepository;

export function TodoRepositoryProvider({ children }: Props) {
  return (
    <TodoRepositoryContext.Provider value={todoRepository}>
      {children}
    </TodoRepositoryContext.Provider>
  );
}

export function useTodoRepository() {
  const todoRepository = React.useContext(TodoRepositoryContext);
  if (!todoRepository) {
    throw new Error(
      "useTodoRepository must be used within a TodoRepositoryProvider"
    );
  }
  return todoRepository;
}
