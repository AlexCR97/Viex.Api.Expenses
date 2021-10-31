import { Express, Request, Response } from 'express'
import { MikroORM, RequestContext } from "@mikro-orm/core";
import { RoleDescriptor } from "./roleDescriptors/RoleDescriptor.entity";
import config from '@/config.json'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import ExpensesContext from './ExpensesContext';
import { BaseDescriptor } from './BaseDescriptor.entity';
import { BaseEntity } from './BaseEntity.entity';
import { TransactionTypeDescriptor } from './transactionTypeDescriptors/TransactionTypeDescriptor.entity';
import { TransactionCategoryDescriptor } from './transactionCategoryDescriptors/TransactionCategoryDescriptor.entity';

export default async function(server: Express) {
    console.log('Initializing Mongo...')

    const connectionString = getConnectionString()
    console.log('connectionString:', connectionString)

    const orm = await MikroORM.init({
        entities: [
            BaseEntity,
            BaseDescriptor,
            RoleDescriptor,
            TransactionCategoryDescriptor,
            TransactionTypeDescriptor,
        ],
        dbName: config.persistence.mongo.databaseName,
        type: 'mongo',
        clientUrl: connectionString,
        metadataProvider: TsMorphMetadataProvider,
    })

    ExpensesContext.init(orm)
    
    server.use((_request: Request, _response: Response, next: (...args: any[]) => void) => {
        RequestContext.create(orm.em, next)
    })

    console.log('Mongo initialized!')
}

const connectionStringTemplate = 'mongodb+srv://<user>:<password>@maincluster.gwcad.mongodb.net/<databaseName>?retryWrites=true&w=majority'

function getConnectionString(): string {
    return connectionStringTemplate
        .replace('<user>', config.persistence.mongo.user)
        .replace('<password>', config.persistence.mongo.password)
        .replace('<databaseName>', config.persistence.mongo.databaseName)
}
