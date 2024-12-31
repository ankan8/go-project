import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import './TodoForm.css'; // Ensure the CSS is imported

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const res = await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: newTodo }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setNewTodo("");
      // Call the function to refetch or invalidate the data if needed
      alert("Todo added successfully!");
    } catch (error) {
      console.log('error');
      
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={createTodo} className="todo-form">
      <div className="form-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          autoFocus
          placeholder="Enter a new todo"
          className="todo-input"
        />
        <button type="submit" className="todo-button" disabled={isCreating}>
          {isCreating ? (
            <div className="spinner"></div>
          ) : (
            <IoMdAdd size={30} />
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
