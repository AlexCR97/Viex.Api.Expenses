import { MikroORM } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/mongodb";
import { RoleDescriptor } from "./roleDescriptors/RoleDescriptor.entity";
import { TransactionCategoryDescriptor } from "./transactionCategoryDescriptors/TransactionCategoryDescriptor.entity";
import { TransactionTypeDescriptor } from "./transactionTypeDescriptors/TransactionTypeDescriptor.entity";

export default class ExpensesContext {
    
    readonly roleDescriptors: EntityRepository<RoleDescriptor>
    readonly transactionCategoryDescriptors: EntityRepository<TransactionCategoryDescriptor>
    readonly transactionTypeDescriptors: EntityRepository<TransactionTypeDescriptor>

    private static _instance: ExpensesContext

    private constructor(orm: MikroORM) {
        this.roleDescriptors = orm.em.getRepository(RoleDescriptor)
        this.transactionCategoryDescriptors = orm.em.getRepository(TransactionCategoryDescriptor)
        this.transactionTypeDescriptors = orm.em.getRepository(TransactionTypeDescriptor)
    }

    static init(orm: MikroORM) {
        this._instance = new ExpensesContext(orm)
    }

    static get instance() {
        if (!this._instance)
            throw 'ExpensesContext instance has not been initialized'

        return this._instance
    }
}
