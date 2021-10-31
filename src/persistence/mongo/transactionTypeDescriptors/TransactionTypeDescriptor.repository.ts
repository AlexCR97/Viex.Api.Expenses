import { FilterQuery } from "@mikro-orm/core";
import { Service } from "typedi";
import ExpensesContext from "../ExpensesContext";
import { TransactionTypeDescriptor } from "./TransactionTypeDescriptor.entity";

@Service()
export default class TransactionTypeDescriptorsRepository {
    createRangeAsync(transactionTypeDescriptors: TransactionTypeDescriptor[]) {
        return ExpensesContext.instance.transactionTypeDescriptors.persistAndFlush(transactionTypeDescriptors)
    }

    getFirstAsync(where: FilterQuery<TransactionTypeDescriptor>): Promise<TransactionTypeDescriptor | null> {
        return ExpensesContext.instance.transactionTypeDescriptors.findOne(where)
    }

    getWhereAsync(where: FilterQuery<TransactionTypeDescriptor>): Promise<TransactionTypeDescriptor[]> {
        return ExpensesContext.instance.transactionTypeDescriptors.find(where)
    }
}