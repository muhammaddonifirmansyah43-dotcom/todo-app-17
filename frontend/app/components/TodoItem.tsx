'use client';

import React from 'react';
import Link from 'next/link';
import { Todo } from '@/types/todo';

export type { Todo };

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${
        todo.completed
          ? 'border-emerald-200 bg-emerald-50/40'
          : 'border-gray-300 bg-white'
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 shrink-0 accent-blue-400"
        />

        <span
          className={`text-sm ${
            todo.completed
              ? 'text-gray-300 line-through'
              : 'text-gray-800'
          }`}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/task/${todo.id}`}
          className="rounded-md bg-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-300"
        >
          Detail →
        </Link>

        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="rounded-md bg-red-400 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500"
        >
          Hapus
        </button>
      </div>
    </li>
  );
}