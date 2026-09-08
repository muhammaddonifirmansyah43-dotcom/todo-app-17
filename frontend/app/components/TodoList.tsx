'use client';

import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-8 text-center text-gray-400">
        <p>Belum ada tugas.</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h2 className="mb-4 text-lg font-medium text-gray-800">
        Daftar Tugas
      </h2>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}