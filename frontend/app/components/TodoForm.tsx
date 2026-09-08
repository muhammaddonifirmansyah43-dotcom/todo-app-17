'use client';

import React, { useState } from 'react';

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({
  onAddTodo,
}: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTodo(trimmedTitle);
    setTitle('');
  };

  return (
    <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
      >
        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Tambahkan tugas baru..."
          className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
        />

        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-md bg-blue-300 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Tambah
        </button>
      </form>
    </div>
  );
}