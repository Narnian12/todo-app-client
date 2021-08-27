import { Dispatch, SetStateAction } from "react";

export interface Todo {
  id: string,
  name: string,
  info: string,
  editing: boolean
}

export interface TodoStateInterface {
  todoList: Todo[],
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
}