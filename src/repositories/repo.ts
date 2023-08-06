import { House } from '../entities/house.js';
import { UserI } from '../entities/user.js';

export type id = number | string;

export interface HouseRepo {
    getAll: () => Promise<Array<House>>;
    getWish: (id: id) => Promise<House>;
    findInspo: (data: Partial<House>) => Promise<House[]>;
    postNew: (data: Partial<House>) => Promise<House>;
    patch: (id: id, data: Partial<House>) => Promise<House>;
    delete: (id: id) => Promise<id>;
}

export interface UserRepo {
    getUser: (id: id) => Promise<UserI>;
    update: (id: id, data: Partial<UserI>) => Promise<UserI>;
    findUser: (data: Partial<UserI>) => Promise<UserI>;
    postNewUser: (data: Partial<UserI>) => Promise<UserI>;
}
