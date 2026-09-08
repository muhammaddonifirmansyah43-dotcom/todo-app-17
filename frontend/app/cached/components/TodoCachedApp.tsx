'use client';

import React from 'react';
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Todo } from '@/types/todo';

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

export default function TodoCachedApp({
  initialTodos,
}: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    'TODO_LIST_CACHE',
    initialTodos
  );

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [
      newTodo,
      ...currentTodos,
    ]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

  const handleResetToDefault = () => {
    if (
      confirm(
        'Kembalikan data ke daftar tugas awal?'
      )
    ) {
      setTodos(initialTodos);
    }
  };

  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />

      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />

          <span className="text-xs text-gray-500">
            Cache aktif (localStorage: TODO_LIST_CACHE)
          </span>
        </div>

        <button
          type="button"
          onClick={handleResetToDefault}
          className="text-xs text-gray-500 underline hover:text-gray-700"
        >
          Reset ke Data Awal
        </button>
      </div>

      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}