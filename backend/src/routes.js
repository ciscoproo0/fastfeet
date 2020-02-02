import { Router } from 'express';

// to be used in the future
// import UserController from './app/controllers/UserController';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

// to be used in the future
// routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// from here, the application will verify for bearer token in headers
routes.use(authMiddleware);

// to be used in the future
// routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);

routes.put('/recipients', RecipientController.update);

export default routes;
