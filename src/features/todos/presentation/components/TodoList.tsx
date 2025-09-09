import type { ToDo } from "@/features/todos/domain/ToDo";
import { Button } from "../../../../common/presentation/components/ui/button";

type Props = {
  todos: ToDo[];
  onDelete: (id: number) => void;
};

export function TodoList({ todos, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-4 border rounded flex flex-row justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{todo.title}</h3>
            <p>{todo.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">Status:</span>
              <span>{todo.todoCompletionStatus}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">Labels:</span>
              <div className="flex space-x-1">
                {todo.labels.map((label) => (
                  <span
                    key={label.id}
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded-full"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button
            variant={"destructive"}
            onClick={async () => {
              onDelete(todo.id);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
