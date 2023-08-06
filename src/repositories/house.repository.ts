import { HouseRepo, id } from './repo.js';
import { House, HouseModel } from '../entities/house.js';

export class HouseRepository implements HouseRepo {
    static instance: HouseRepository;

    public static getInstance(): HouseRepository {
        if (!HouseRepository.instance) {
            HouseRepository.instance = new HouseRepository();
        }
        return HouseRepository.instance;
    }

    #Model = HouseModel;

    private constructor() {
        //
    }

    async getAll(): Promise<Array<House>> {
        return this.#Model.find();
    }

    async getWish(id: id): Promise<House> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result;
    }

    async findInspo(search: Partial<House>): Promise<House[]> {
        const result = await this.#Model.find(search);
        return result;
    }

    async postNew(data: Partial<House>): Promise<House> {
        data.isAvailable = true;
        const result = await this.#Model.create(data);
        return result;
    }

    async patch(id: id, data: Partial<House>): Promise<House> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result;
    }

    async delete(id: id): Promise<id> {
        await this.#Model.findByIdAndDelete(id);
        return id;
    }
}
