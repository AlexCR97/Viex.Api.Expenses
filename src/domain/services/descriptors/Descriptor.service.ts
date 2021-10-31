import { TransactionTypeDescriptorNotFoundError } from "@/domain/errors/TransactionTypeDescriptorNotFound.error";
import { RoleDescriptor } from "@/persistence/mongo/roleDescriptors/RoleDescriptor.entity";
import RoleDescriptorRepository from "@/persistence/mongo/roleDescriptors/RoleDescriptor.repository";
import { TransactionCategoryDescriptor } from "@/persistence/mongo/transactionCategoryDescriptors/TransactionCategoryDescriptor.entity";
import TransactionCategoryDescriptorRepository from "@/persistence/mongo/transactionCategoryDescriptors/TransactionCategoryDescriptor.repository";
import { TransactionTypeDescriptor } from "@/persistence/mongo/transactionTypeDescriptors/TransactionTypeDescriptor.entity";
import TransactionTypeDescriptorsRepository from "@/persistence/mongo/transactionTypeDescriptors/TransactionTypeDescriptor.repository";
import { Inject, Service } from "typedi";
import { TransactionCategoryDescriptorModel } from "./TransactionCategoryDescriptor.model";

@Service()
export default class DescriptorService {
    
    @Inject() private readonly _roleDescriptorsRepository!: RoleDescriptorRepository
    @Inject() private readonly _transactionCategoryDescriptorsRepository!: TransactionCategoryDescriptorRepository
    @Inject() private readonly _transactionTypeDescriptorsRepository!: TransactionTypeDescriptorsRepository

    async getRolesAsync(): Promise<string[]> {
        const roleDescriptors = await this._roleDescriptorsRepository.getWhereAsync({ })
        return roleDescriptors.map(x => x.description)
    }

    async getTransactionCategoriesAsync(): Promise<TransactionCategoryDescriptorModel[]> {
        const descriptors = await this._transactionCategoryDescriptorsRepository.getWhereAsync({ })
        return descriptors.map(x => ({
            description: x.description,
            transactionTypeDescriptor: x.transactionTypeDescriptor.description,
        }))
    }

    async getTransactionTypesAsync(): Promise<string[]> {
        const transactionTypeDescriptors = await this._transactionTypeDescriptorsRepository.getWhereAsync({ })
        return transactionTypeDescriptors.map(x => x.description)
    }

    seedRolesAsync(roleDescriptors: string[]) {
        const roleDescriptorEntities = roleDescriptors.map(descriptor => {
            const roleDescriptor = new RoleDescriptor()
            roleDescriptor.description = descriptor
            return roleDescriptor
        })
        return this._roleDescriptorsRepository.createRangeAsync(roleDescriptorEntities)
    }

    async seedTransactionCategoriesAsync(transactionCategoryDescriptors: TransactionCategoryDescriptorModel[]) {
        const entities: TransactionCategoryDescriptor[] = []

        for (const descriptorModel of transactionCategoryDescriptors) {
            const transactionTypeDescriptor = await this._transactionTypeDescriptorsRepository.getFirstAsync({ description: descriptorModel.transactionTypeDescriptor })
            
            if (!transactionTypeDescriptor)
                throw new TransactionTypeDescriptorNotFoundError({ propertyName: 'description', propertyValue: descriptorModel.description })
            
            const entity = new TransactionCategoryDescriptor()
            entity.description = descriptorModel.description
            entity.transactionTypeDescriptor = transactionTypeDescriptor

            entities.push(entity)
        }

        await this._transactionCategoryDescriptorsRepository.createRangeAsync(entities)
    }

    seedTransactionTypesAsync(transactionTypeDescriptors: string[]) {
        const transactionTypeDescriptorEntities = transactionTypeDescriptors.map(descriptor => {
            const transactionTypeDescriptor = new TransactionTypeDescriptor()
            transactionTypeDescriptor.description = descriptor
            return transactionTypeDescriptor
        })
        return this._transactionTypeDescriptorsRepository.createRangeAsync(transactionTypeDescriptorEntities)
    }
}