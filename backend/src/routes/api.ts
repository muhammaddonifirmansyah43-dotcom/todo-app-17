import { Router } from 'express';

import {
  register,
  login
} from '../controllers/authController';

import {
  getTodos,
  createTodo
} from '../controllers/todoController';

import {
  validateRegister,
  validateLogin,
  validateTodo
} from '../middlewares/validator';

import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Register
router.post(
  '/auth/register',
  validateRegister,
  register
);

// Login
router.post(
  '/auth/login',
  validateLogin,
  login
);

// Get Todo
router.get(
  '/todos',
  verifyToken,
  getTodos
);

// Create Todo
router.post(
  '/todos',
  verifyToken,
  validateTodo,
  createTodo
);

export default router;