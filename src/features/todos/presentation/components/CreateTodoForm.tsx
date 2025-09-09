import { useEffect, useState } from "react";
import type { ToDoCompletionStatus } from "@/features/todos/domain/ToDoCompletionStatus";
import { Button } from "@/common/presentation/components/ui/button";
import { Input } from "@/common/presentation/components/ui/input";
import { Textarea } from "@/common/presentation/components/ui/textarea";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/common/presentation/components/ui/dropdown-menu";
import { useCreateTodoMutation } from "../mutations/useCreateTodoMutation";

export function CreateTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState("");
  const [status, setStatus] = useState<ToDoCompletionStatus>("pending");

  const createTodoMutation = useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    debugger;
    const labelsArray = labels
      .split(",")
      .map((name) => ({ id: Math.random(), name: name.trim(), color: "blue" })); // Simplified label creation

    // submit todo
    await createTodoMutation.mutateAsync({
      title,
      description,
      labels: labelsArray,
      todoCompletionStatus: status,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setLabels("");
    setStatus("pending");

    toast.success("To-Do created successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="labels">Labels (comma-separated)</label>
        <Input
          id="labels"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
        />
      </div>
      <div>
        <label>Status</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              {status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={(value) =>
                setStatus(value as ToDoCompletionStatus)
              }
            >
              <DropdownMenuRadioItem value="pending">
                Pending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="inProgress">
                In Progress
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="completed">
                Completed
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button type="submit" className="w-full">
        Create To-Do
      </Button>
    </form>
  );
}
