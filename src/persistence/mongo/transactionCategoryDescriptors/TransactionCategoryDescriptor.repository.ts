import { FilterQuery } from "@mikro-orm/core"
import { Service } from "typedi"
import { IDescriptorRepository } from '../Descriptor.repository'
import ExpensesContext from "../ExpensesContext"
import { TransactionCategoryDescriptor } from "./TransactionCategoryDescriptor.entity"

@Service()
export default class TransactionCategoryDescriptorRepository implements IDescriptorRepository<TransactionCategoryDescriptor> {
    createRangeAsync(entities: TransactionCategoryDescriptor[]): Promise<void> {
        return ExpensesContext.instance.transactionTypeDescriptors.persistAndFlush(entities)
    }

    getWhereAsync(where: FilterQuery<TransactionCategoryDescriptor>): Promise<TransactionCategoryDescriptor[]> {
        return ExpensesContext.instance.transactionCategoryDescriptors.find(where)
    }
}