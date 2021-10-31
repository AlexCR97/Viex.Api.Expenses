import config from '@/config.json'
import initApi from '@/api'
import initPersistence from '@/persistence'

async function main() {
    console.log('Starting application...')
    console.log('Config:', config)

    const server = await initApi()
    await initPersistence(server)

    console.log('Application started!')

    server.listen(config.api.port, () => {
        console.log(`Server listening in port ${config.api.port}`)
    })
}

main().catch(err => {
    console.log("Unhandled error:", err)
})
