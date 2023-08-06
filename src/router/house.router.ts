import { Router } from 'express';
import { HouseRepository } from '../repositories/house.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { HouseController } from '../controllers/house.controller.js';
import { logged, who } from '../middlewares/interceptors.js';

export const housesRouter = Router();

const controller = new HouseController(
    HouseRepository.getInstance(),
    UserRepository.getInstance()
);

housesRouter.get('/', controller.getAll.bind(controller));
housesRouter.get('/find', controller.findInspo.bind(controller));
housesRouter.get('/:id', controller.getWish.bind(controller));
housesRouter.post('/', logged, who, controller.postNew.bind(controller));
housesRouter.patch('/:id', logged, who, controller.patch.bind(controller));
housesRouter.delete('/:id', logged, who, controller.delete.bind(controller));
