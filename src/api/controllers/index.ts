import { Express, Request, Response } from 'express'
import Container from 'typedi'
import DescriptorsController from './Descriptors.controller'

const descriptorsController = Container.get(DescriptorsController)

export default function(server: Express) {
    /* #region Descriptors */

    server.get('/descriptors/roles', (request: Request, response: Response) => descriptorsController.getRolesAsync(request, response))
    server.post('/descriptors/roles/seed', (request: Request, response: Response) => descriptorsController.seedRolesAsync(request, response))
    
    server.get('/descriptors/transactionCategories', (request: Request, response: Response) => descriptorsController.getTransactionCategoriesAsync(request, response))
    server.post('/descriptors/transactionCategories/seed', (request: Request, response: Response) => descriptorsController.seedTransactionCategoriesAsync(request, response))

    server.get('/descriptors/transactionTypes', (request: Request, response: Response) => descriptorsController.getTransactionTypesAsync(request, response))
    server.post('/descriptors/transactionTypes/seed', (request: Request, response: Response) => descriptorsController.seedTransactionTypesAsync(request, response))

    /* #endregion */
}
