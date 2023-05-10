import { Router } from 'express';

// Controllers
import { apiStatus } from './api-status';

export const generalRouter = Router();

// Routes
generalRouter.get('/status', apiStatus);