import React from 'react';
import TodoCachedApp from './components/TodoCachedApp';
import { getTodos } from '@/lib/todos';

export default async function CachedTodoPage() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-gray-300 bg-white p-8 shadow-lg">
          <header className="mb-6 border-b border-gray-300 pb-5">
            <h1 className="text-center text-3xl font-bold text-gray-800">
              Daftar Tugas (Todo List)
            </h1>
          </header>

          <TodoCachedApp
            initialTodos={initialTodos}
          />
        </div>
      </div>
    </main>
  );
}