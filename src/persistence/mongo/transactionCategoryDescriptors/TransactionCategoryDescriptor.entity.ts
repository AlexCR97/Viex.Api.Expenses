import { Entity, OneToOne } from "@mikro-orm/core";
import { BaseDescriptor } from "../BaseDescriptor.entity";
import { TransactionTypeDescriptor } from "../transactionTypeDescriptors/TransactionTypeDescriptor.entity";

@Entity()
export class TransactionCategoryDescriptor extends BaseDescriptor {
    @OneToOne()
    transactionTypeDescriptor!: TransactionTypeDescriptor
}
