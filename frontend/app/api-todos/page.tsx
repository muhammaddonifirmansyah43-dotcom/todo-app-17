import React from 'react';
import ApiTodoList from './components/ApiTodoList';
import { getTasks } from '@/lib/tasks';

export default async function ApiTodosPage() {
  const result = await getTasks({
    limit: 15,
    skip: 0,
  });

  return (
    <main className="min-h-screen bg-white px-4 py-2">
      <div className="mx-auto w-full max-w-[460px] rounded-xl border border-gray-200 bg-white px-5 py-5">
        <header className="border-b border-gray-300 pb-3">
          <h1 className="text-[20px] font-bold leading-7 text-gray-800 text-center">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        <ApiTodoList initialTasks={result.tasks} />
      </div>
    </main>
  );
}