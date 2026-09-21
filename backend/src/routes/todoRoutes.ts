import { Router } from 'express';

import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController';

import {
  validateTodo,
  validateUpdateTodo
} from '../middlewares/validator';

import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get(
  '/',
  verifyToken,
  getTodos
);

router.get(
  '/:id',
  verifyToken,
  getTodoById
);

router.post(
  '/',
  verifyToken,
  validateTodo,
  createTodo
);

router.put(
  '/:id',
  verifyToken,
  validateUpdateTodo,
  updateTodo
);

router.delete(
  '/:id',
  verifyToken,
  deleteTodo
);

export default router;