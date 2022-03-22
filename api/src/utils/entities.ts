import { BaseEntity, EntityTarget, getManager, DeepPartial } from 'typeorm';
import * as promises from './promises.js';
import { entityTypes, promiseTypes } from '../types';
import { DEFAULTS } from '../constants/index.js';

type OperationReturn<T> = entityTypes.OperationReturn<T>;
type HandleReturn<T> = promiseTypes.HandleReturn<T>;
type Target<T> = EntityTarget<T>;
type Data<T> = DeepPartial<T>;
type IndexOptions = entityTypes.IndexOptions;

export async function save<T extends BaseEntity>(entity: Target<T>, data: Data<T>): Promise<T> {
    const manager = getManager();
    const entityObject = manager.create<T>(entity, data);
    
    return await entityObject.save();
};

export async function insert<T extends BaseEntity>(entity: Target<T>, data: Data<T>): OperationReturn<T> {
    try {
        const res = await save<T>(entity, data);
        return [res, undefined];
    }
    catch(err) {
        const error = err as Error;
        return [undefined, error];
    }
};

export async function update<T extends BaseEntity>(entity: Target<T>, data: Data<T>): OperationReturn<T> {
    try {
        const res = await save<T>(entity, data);
        return [res, undefined];
    }
    catch(err) {
        const error = err as Error;
        return [undefined, error];
    }
};

export async function findAndSaveOrUpdate<T extends BaseEntity>(entity: Target<T>, conditional: object, data: Data<T>): Promise<HandleReturn<T>> {
    const manager = getManager();

    const promise = manager.findOne(entity, { where: conditional });
    const [findRes, findErr] = await promises.handle<object | undefined>(promise);

    if(findErr) {
        return [undefined, findErr];
    }
    if(!findRes) {
        return await insert(entity, data);
    }

    return await update(entity, findRes as Data<T>);
};

export async function findOrSave<T extends BaseEntity>(entity: Target<T>, conditional: object, data: Data<T>): Promise<HandleReturn<T>> {
    const manager = getManager();

    const promise = manager.findOne(entity, { where: conditional });
    const [findRes, findErr] = await promises.handle<object | undefined>(promise);

    if(findErr) {
        return [undefined, findErr];
    }
    if(!findRes) {
        return await insert(entity, data);
    }

    const entityObject = manager.create(entity, findRes as Data<T>);
    return [entityObject, undefined];
};

export async function index<T extends BaseEntity>(entity: Target<T>, options: IndexOptions): Promise<HandleReturn<T[]>> {
    const manager = getManager();

    const promise = manager.find(entity, {
        skip: options.offset ?? 0,
        take: options.limit ?? DEFAULTS.LIMIT
    });
    const [res, err] = await promises.handle<T[]>(promise);

    if(err) {
        return [undefined, err];
    }

    return [res, undefined];
};

export async function indexAndCount<T extends BaseEntity>(entity: Target<T>, options: IndexOptions): Promise<HandleReturn<[T[], number]>> {
    const manager = getManager();

    const promise = manager.findAndCount<T>(entity, {
        skip: options.offset ?? 0,
        take: options.limit ?? DEFAULTS.LIMIT
    });
    const [res, err] = await promises.handle<[T[], number]>(promise);

    if(err) {
        return [undefined, err];
    }

    return [res, undefined];
};

export async function findOne<T extends BaseEntity>(entity: Target<T>, conditional: object): Promise<HandleReturn<T>> {
    const manager = getManager();

    const promise = manager.findOne(entity, {
        where: conditional
    });
    const [res, err] = await promises.handle<object | undefined>(promise);

    if(err) {
        return [undefined, err];
    }

    const entityObject = res ? manager.create(entity, res as Data<T>) : undefined;
    return [entityObject, undefined];
}