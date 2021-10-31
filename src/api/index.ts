import 'reflect-metadata'
import express from 'express'
import initControllers from '@/api/controllers'

export default async function() {
    console.log('Initializing api layer...')

    const server = express()
    
    initControllers(server)

    console.log('Initialized api layer!')

    return server
}
