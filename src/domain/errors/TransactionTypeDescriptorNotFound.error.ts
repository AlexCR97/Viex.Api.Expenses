import { NotFoundError } from "@/utils/errors/NotFound.error";

export class TransactionTypeDescriptorNotFoundError extends NotFoundError {
    constructor(options: { propertyName?: string, propertyValue?: any}) {
        if (options.propertyName && options.propertyValue)
            super('TransactionTypeDescriptor', options.propertyName, options.propertyValue)
    }
}