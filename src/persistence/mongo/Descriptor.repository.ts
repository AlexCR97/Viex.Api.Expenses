import { FilterQuery } from "@mikro-orm/core";

export interface IDescriptorRepository<TEntity> {
    createRangeAsync(entities: TEntity[]): Promise<void>
    getWhereAsync(where: FilterQuery<TEntity>): Promise<TEntity[]>
}