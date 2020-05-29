import { Router } from 'express';

// package to upload files
import multer from 'multer';

import multerConfig from './config/multer';

import DeliverymanController from './app/controllers/DeliverymanController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import OrderController from './app/controllers/OrderController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

const routes = Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// from here, the application will verify for bearer token in headers
routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);

routes.post('/recipients', RecipientController.store);

routes.put('/recipients/:id', RecipientController.update);

routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliveryman', DeliverymanController.index);

routes.post('/deliveryman', DeliverymanController.store);

routes.put('/deliveryman', DeliverymanController.update);

routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/orders', OrderController.index);

routes.get('/orders/deliveryman/:id', OrderController.index);

routes.get('/orders/deliveryman/:id/deliveries', OrderController.index);

routes.post('/orders', OrderController.store);

routes.put('/orders/:id', OrderController.update);

routes.put('/orders/:id/start_date', OrderController.update);

routes.put('/orders/:id/end_date', OrderController.update);

routes.delete('/orders/:id', OrderController.delete);

routes.get('/delivery-problems', DeliveryProblemController.index);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);

routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.delete(
  '/delivery/:id/cancel-delivery',
  DeliveryProblemController.delete
);

export default routes;
