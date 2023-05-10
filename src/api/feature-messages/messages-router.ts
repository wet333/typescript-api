import { Router } from 'express';
import { getAllMessages } from './messages-controller';

export const messagesRouter = Router();

// GET /api/users
messagesRouter.get('/', getAllMessages);