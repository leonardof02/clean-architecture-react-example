import { useQuery } from "@tanstack/react-query";
import { useTodoRepository } from "../providers/TodoRepositoryProvider";

export function useTodos() {
  const todoRepository = useTodoRepository();

  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const result = await todoRepository.getAll();
      if (result.ok) return result.value;
      else throw new Error("Failed to fetch todos");
    },
    retry: 1,
  });

  return query;
}
