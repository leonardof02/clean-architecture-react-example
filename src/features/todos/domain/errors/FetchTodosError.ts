import { DomainError } from "../DomainError";

export class FetchTodosError extends DomainError {
  constructor(message: string) {
    super(message, "FETCH_TODOS_ERROR");
  }
}
