import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import api from "./api";
import { axiosConfig } from "./config/axios";
import { Todo } from "./types";

axiosConfig();

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await api.get("/todos");
    setTodos(response.data);
  };

  const createTodo = async (e: FormEvent) => {
    e.preventDefault();
    const response = await api.post("/todos", {
      title: newTodo,
      completed: false,
    });
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const updateTodo = async (id: number, completed: boolean) => {
    const response = await api.put(`/todos/${id}`, completed);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: response.data.completed } : todo
      )
    );
  };

  const deleteTodo = async (id: number) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Todo 완료 여부에 따라 CSS 클래스를 조건부로 반환하는 함수
  const getTodoClassName = (completed: boolean): string => {
    return completed ? "completed" : "";
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={createTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, !todo.completed)}
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
