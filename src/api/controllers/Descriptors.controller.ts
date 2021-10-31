import DescriptorService from "@/domain/services/descriptors/Descriptor.service";
import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import roleDescriptorSeed from '@/persistence/mongo/roleDescriptors/RoleDescriptor.seed.json'
import transactionCategoryDescriptorSeed from '@/persistence/mongo/transactionCategoryDescriptors/TransactionCategoryDescriptor.seed.json'
import transactionTypeDescriptorSeed from '@/persistence/mongo/transactionTypeDescriptors/TransactionTypeDescriptor.seed.json'

@Service()
export default class DescriptorsController {

    @Inject() private readonly _descriptorService!: DescriptorService

    async getRolesAsync(_request: Request, response: Response) {
        const descriptors = await this._descriptorService.getRolesAsync()
        response.json(descriptors)
    }

    async getTransactionCategoriesAsync(_request: Request, response: Response) {
        const descriptors = await this._descriptorService.getTransactionCategoriesAsync()
        response.json(descriptors)
    }

    async getTransactionTypesAsync(_request: Request, response: Response) {
        const descriptors = await this._descriptorService.getTransactionTypesAsync()
        response.json(descriptors)
    }

    async seedRolesAsync(_request: Request, response: Response) {
        await this._descriptorService.seedRolesAsync(roleDescriptorSeed)
        response.sendStatus(202)
    }

    async seedTransactionCategoriesAsync(_request: Request, response: Response) {
        await this._descriptorService.seedTransactionCategoriesAsync(transactionCategoryDescriptorSeed)
        response.sendStatus(202)
    }

    async seedTransactionTypesAsync(_request: Request, response: Response) {
        await this._descriptorService.seedTransactionTypesAsync(transactionTypeDescriptorSeed)
        response.sendStatus(202)
    }
}
