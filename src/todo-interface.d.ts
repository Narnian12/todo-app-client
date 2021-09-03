import { Dispatch, SetStateAction } from "react";

export interface Todo {
  id: string,
  name: string,
  editing: boolean,
  visible: boolean,
  complete: boolean
}

export interface TodoStateInterface {
  todoList: Todo[],
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
}