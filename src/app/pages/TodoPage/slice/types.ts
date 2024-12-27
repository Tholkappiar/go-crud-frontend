/* --- STATE --- */
export interface TodoState {
  isLoading: boolean;
  todos: Todo[] | null;
  failureResponse: string | null;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}
