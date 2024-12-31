import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import TodoItem from "./TodoItem";

import './TodoList.css'; // Ensure the CSS is imported


export type Todo = {
  _id: number;
  body: string;
  completed: boolean;
};

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch(BASE_URL + "/todos");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data || [];
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-header">
        Today's Tasks
      </h1>
      {isLoading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {!isLoading && todos?.length === 0 && (
        <div className="empty-tasks">
          <p className="empty-message">All tasks completed! 🤞</p>
          <img src="/go.png" alt="Go logo" className="go-logo" />
        </div>
      )}
      <div className="todo-items">
        {todos?.map((todo,idx) => (
          <TodoItem key={idx} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
