import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTodoRepository } from "../providers/TodoRepositoryProvider";
import { DomainError } from "../../domain/DomainError";

export type DeleteTodoCommand = {
  id: number;
};

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  const todoRepository = useTodoRepository();

  const mutation = useMutation({
    mutationFn: async (deleteTodoCommand: DeleteTodoCommand) => {
      const { id } = deleteTodoCommand;
      const result = await todoRepository.delete(id);
      if (!result.ok)
        throw new DomainError("Failed to delete todo", "DELETE_TODO_ERROR");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return mutation;
}
