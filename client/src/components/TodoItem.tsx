import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BASE_URL } from "../App";
import { Todo } from "./TodoList";
import { useState } from "react";
import './TodoItem.css'; // Ensure the CSS is imported

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: updateTodo } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo is already completed");
      setIsUpdating(true);
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdating(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      setIsDeleting(true);
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        setIsDeleting(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="todo-item">
      <div className="todo-content">
        <p
          className={`todo-text ${todo.completed ? "completed" : "in-progress"}`}
        >
          {todo.body}
        </p>
        {todo.completed ? (
          <span className="badge completed">Done</span>
        ) : (
          <span className="badge in-progress">In Progress</span>
        )}
      </div>
      <div className="actions">
        <span
          className="check-icon"
          onClick={() => updateTodo()}
        >
          {isUpdating ? (
            <div className="spinner"></div>
          ) : (
            <FaCheckCircle size={20} />
          )}
        </span>
        <span
          className="delete-icon"
          onClick={() => deleteTodo()}
        >
          {isDeleting ? (
            <div className="spinner"></div>
          ) : (
            <MdDelete size={25} />
          )}
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
