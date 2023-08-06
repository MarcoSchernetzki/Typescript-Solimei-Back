import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../interfaces/error.js';
import { UserRepo, HouseRepo as HouseRepo } from '../repositories/repo.js';
import { ExtraRequest } from '../middlewares/interceptors.js';
import createDebug from 'debug';
const debug = createDebug('Wish:interceptor');

export class HouseController {
    constructor(public houseRepo: HouseRepo, public userRepo: UserRepo) {}

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            debug('getAll');
            const houses = await this.houseRepo.getAll();
            resp.status(201);
            resp.json({ houses });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service Unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async getWish(req: Request, resp: Response, next: NextFunction) {
        try {
            debug('getWish');
            const houses = await this.houseRepo.getWish(req.params.id);
            resp.status(201);
            resp.json({ houses });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    async findInspo(req: Request, resp: Response, next: NextFunction) {
        try {
            debug('findInspo');
            const houses = await this.houseRepo.findInspo(req.body);
            resp.status(201);
            resp.json({ houses });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    async postNew(req: ExtraRequest, resp: Response, next: NextFunction) {
        try {
            debug('postNew');
            if (!req.payload) {
                throw new Error('Invalid payload');
            }
            const houses = await this.houseRepo.postNew(req.body);
            resp.status(201);
            resp.json({ houses });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            debug('patch');
            const wish = await this.houseRepo.patch(req.params.id, req.body);
            resp.status(201);
            resp.json({ wish });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            debug('delete');
            const wish = await this.houseRepo.getWish(req.params.id);
            await this.houseRepo.delete(wish.id.toString());
            resp.status(201);
            resp.json({ id: wish.id });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    createHttpError(error: Error) {
        if (error.message === 'Not found id') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
}
