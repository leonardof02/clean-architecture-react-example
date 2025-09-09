import { CreateTodo } from "./application/use-cases/CreateTodo";
import { DeleteTodo } from "./application/use-cases/DeleteTodo";
import { GetAllTodos } from "./application/use-cases/GetAllTodos";
import { UpdateTodo } from "./application/use-cases/UpdateTodo";
import { LocalStorageTodoRepository } from "./infrastructure/LocalStorageToDoRepository";

export const CreateToDoUseCase = CreateTodo(LocalStorageTodoRepository);
export const DeleteToDoUseCase = DeleteTodo(LocalStorageTodoRepository);
export const GetAllToDosUseCase = GetAllTodos(LocalStorageTodoRepository);
export const UpdateToDoUseCase = UpdateTodo(LocalStorageTodoRepository);
