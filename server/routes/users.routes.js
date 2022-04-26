import { Router } from 'express';
import {
  getUser,
  createUser,
  updateUser,
  removeUser,
  getUsers,
} from '../controllers/users.controllers.js';

const router = Router();

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', removeUser);

export default router;
