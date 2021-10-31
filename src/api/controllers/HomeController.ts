import { Request, Response } from 'express'
import { Service } from 'typedi'

@Service()
export default class HomeController {
    get(_request: Request, response: Response) {
        response.json({
            key: 'This is a value'
        })
    }
}
