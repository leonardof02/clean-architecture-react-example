import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Label } from "../../domain/Label";
import type { ToDoCompletionStatus } from "../../domain/ToDoCompletionStatus";
import { useTodoRepository } from "../providers/TodoRepositoryProvider";
import type { ToDo } from "../../domain/ToDo";
import { FetchTodosError } from "../../domain/errors/FetchTodosError";

export type CreateTodoCommand = {
  title: string;
  description: string;
  labels: Label[];
  todoCompletionStatus: ToDoCompletionStatus;
};

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  const todoRepository = useTodoRepository();

  async function createTodoUseCase(createTodoCommand: CreateTodoCommand) {
    const { title, description, labels, todoCompletionStatus } =
      createTodoCommand;

    const todo: ToDo = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      description: description,
      todoCompletionStatus: todoCompletionStatus,
      labels: labels,
    };

    const result = await todoRepository.create(todo);

    if (!result.ok) throw new FetchTodosError("Failed to fetch todos");
  }

  const mutation = useMutation({
    mutationFn: createTodoUseCase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return mutation;
}
