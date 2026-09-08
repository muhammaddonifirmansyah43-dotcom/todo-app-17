'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types/api-todo';
import { todoService } from '@/services/todoService';

type ApiTodoListProps = {
  initialTasks: TaskItem[];
};

export default function ApiTodoList({
  initialTasks,
}: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (
    id: number,
    currentCompleted: boolean
  ) => {
    const newCompleted = !currentCompleted;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: newCompleted }
          : task
      )
    );

    try {
      await todoService.updateTodoStatus(id, newCompleted);
    } catch (error) {
      console.error('Gagal update Todo:', error);
    }
  };

  return (
    <div className="pt-3">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[13px] font-medium text-gray-700">
          Daftar Tugas
        </h2>

        <span className="rounded-full bg-gray-100 px-2 py-1 text-[9px] text-gray-500">
          {tasks.length} item
        </span>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex min-h-[40px] items-center justify-between rounded-lg border px-2.5 py-2 ${
              task.completed
                ? 'border-green-100 bg-green-50/50'
                : 'border-gray-200 bg-white'
            }`}
          >
            {/* Checkbox + Judul */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleToggleTask(
                    task.id,
                    task.completed
                  )
                }
                className="h-3.5 w-3.5 shrink-0 accent-blue-400"
              />

              <span
                className={`text-[10px] leading-[15px] ${
                  task.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-600'
                }`}
              >
                {task.title}
              </span>
            </div>

            {/* Badge */}
            <div className="ml-2 flex shrink-0 items-center gap-1">
              {/* ID */}
              <span className="rounded-full bg-purple-50 px-1.5 py-0.5 text-[8px] font-medium text-purple-500">
                ID: #{task.id}
              </span>

              {/* User */}
              <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[8px] font-medium text-blue-500">
                User: {task.userId}
              </span>

              {/* Status */}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[8px] font-medium ${
                  task.completed
                    ? 'bg-green-50 text-green-600'
                    : 'bg-yellow-50 text-yellow-600'
                }`}
              >
                {task.completed ? 'Selesai' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}