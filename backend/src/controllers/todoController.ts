import { Request, Response } from 'express';
import { TodoModel } from '../models/todoModel';

export const getTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.userId;

  try {
    const todos = await TodoModel.getByUserId(userId);

    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data.'
    });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const userId = res.locals.userId;

  try {
    const todo = await TodoModel.getById(id, userId);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo tidak ditemukan.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data Todo.'
    });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { task } = req.body;
  const userId = res.locals.userId;

  try {
    const newId = await TodoModel.create(
      userId,
      task
    );

    res.status(201).json({
      success: true,
      message: 'Tugas berhasil ditambahkan!',
      data: {
        id: newId,
        task,
        is_completed: false
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan tugas.'
    });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const { task, is_completed } = req.body;
  const userId = res.locals.userId;

  try {
    const affectedRows = await TodoModel.update(
      id,
      userId,
      task,
      is_completed
    );

    if (affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Todo tidak ditemukan.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Todo berhasil diperbarui!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui Todo.'
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const userId = res.locals.userId;

  try {
    const affectedRows = await TodoModel.delete(
      id,
      userId
    );

    if (affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Todo tidak ditemukan.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Todo berhasil dihapus!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus Todo.'
    });
  }
};