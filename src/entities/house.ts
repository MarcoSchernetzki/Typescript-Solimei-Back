import { Schema, Types, model } from 'mongoose';

export type Location =
    | 'Castelar Norte'
    | 'Castelar Sur'
    | 'Ituzaingo Norte'
    | 'Ituzaingo Sur'
    | 'Hurlingham'
    | 'Merlo Norte'
    | 'Merlo Sur'
    | 'Moreno Norte'
    | 'Moron Norte'
    | 'Moron Sur'
    | 'Ramos Mejia Norte'
    | 'Ramos Mejia Sur'
    | 'Padua Norte'
    | 'Padua Sur';

export type Zone =
    | 'Buenos Aires'
    | 'Capital Federal'
    | 'Gba Norte'
    | 'Gba Oeste'
    | 'Zona Atlantica';

export type PropertyType =
    | 'Casa'
    | 'Casa con departamento'
    | 'Casa fondo'
    | 'Casa para 2 familias'
    | 'Casa ph'
    | 'Chalet'
    | 'Chalet ph'
    | 'Cochera'
    | 'Departamento'
    | 'Departamento tipo casa'
    | 'Duplex'
    | 'Emprendimiento'
    | 'Fraccion'
    | 'Galpon'
    | 'Galpon con vivienda'
    | 'Galpon industrial'
    | 'Inmueble comercial'
    | 'Local'
    | 'Local con vivienda'
    | 'Lote'
    | 'Monoambiente'
    | 'Oficina'
    | 'Otro'
    | 'Piso'
    | 'Quinta'
    | 'Salon'
    | 'Semipiso'
    | 'Triplex'
    | 'Vivienda en blocks';

export type House = {
    id: Types.ObjectId;
    street: string;
    image: string;
    price: number;
    zone: Zone;
    location: Location;
    description: string;
    isAvailable: boolean;
    environments: string;
    propertyType: PropertyType;
};

export type ProtoHouse = {
    street?: string;
    image?: Array<string>;
    price?: number;
    zone?: Zone;
    location?: Location;
    description?: string;
    isAvailable?: boolean;
    environments?: string;
    propertyType?: PropertyType;
};

export const houseSchema = new Schema<House>({
    street: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    price: Number,
    zone: String,
    location: String,
    description: String,
    isAvailable: Boolean,
    environments: String,
    propertyType: String,
});

houseSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});

export const HouseModel = model<House>('House', houseSchema, 'Houses');
