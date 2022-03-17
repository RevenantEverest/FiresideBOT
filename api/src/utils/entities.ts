import { BaseEntity, EntityTarget, getManager, DeepPartial } from 'typeorm';
import * as promises from './promises.js';
import { entityTypes, promiseTypes } from '../types';

type OperationReturn<T> = entityTypes.OperationReturn<T>;
type HandleReturn<T> = promiseTypes.HandleReturn<T>;
type Target<T> = EntityTarget<T>;
type Data<T> = DeepPartial<T>;

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