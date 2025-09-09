import "@/index.css";
import { CreateTodoForm } from "@/features/todos/presentation/components/CreateTodoForm";
import { useTodos } from "./features/todos/presentation/queries/useTodos";
import { useDeleteTodoMutation } from "./features/todos/presentation/mutations/useDeleteTodoMutation";
import { TodoList } from "./features/todos/presentation/components/TodoList";
import { FetchTodosError } from "./features/todos/domain/errors/FetchTodosError";
import React from "react";

function App() {
  const { data: todos, isLoading, error, isError } = useTodos();
  const deleteTodoMutation = useDeleteTodoMutation();

  async function handleDelete(id: number) {
    await deleteTodoMutation.mutateAsync({
      id,
    });
  }

  console.log(error);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create a new To-Do</h2>
          <CreateTodoForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">To-Dos</h2>
          {isLoading && (
            <React.Fragment>
              <div className="w-full h-10 bg-gray-200"></div>
              <div className="w-full h-10 bg-gray-200"></div>
              <div className="w-full h-10 bg-gray-200"></div>
            </React.Fragment>
          )}

          {todos && <TodoList todos={todos} onDelete={handleDelete} />}

          {isError && error instanceof FetchTodosError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3">
              Error: {error.message}
              <p>{error.code}</p>
            </div>
          )}

          {isError && error instanceof MediaError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3">
              Error: {error.message}
              <p>{error.code}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
