import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserRepository } from '../repositories/user.repository.js';
import { HouseRepository } from '../repositories/house.repository.js';

export const usersRouter = Router();

const controller = new UserController(
    HouseRepository.getInstance(),
    UserRepository.getInstance()
);

usersRouter.get('/:id', controller.getUser.bind(controller));
usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
