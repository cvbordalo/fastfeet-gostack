import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import Recipient from './app/models/Recipient';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/', async (req, res) => {
  const recipient = await Recipient.create({
    name: 'Carlos Vitor',
    street: 'Timbó',
    number: '2730',
    complement: 'Ap 301',
    state: 'Pará',
    city: 'Belém',
    zip_code: '66095531',
  });

  return res.json(recipient);
});

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
