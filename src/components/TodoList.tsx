
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todo = {
      id: uuidv4(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
    toast.success("Task added");
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const newStatus = !todo.completed;
          if (newStatus) {
            toast.success("Task completed");
          }
          return { ...todo, completed: newStatus };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted");
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <form onSubmit={handleAddTodo} className="mb-6 relative">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="pl-4 pr-12 py-6 text-sm sm:text-base bg-white border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="Add task"
        >
          <PlusCircle size={20} />
        </button>
      </form>

      <div className="space-y-6">
        {activeTodos.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-2">Tasks</h2>
            <div className="space-y-1">
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          </div>
        )}

        {completedTodos.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-2">Completed</h2>
            <div className="space-y-1">
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          </div>
        )}

        {todos.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
