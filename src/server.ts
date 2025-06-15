import fastify from "fastify"
import { knex } from "./database"
import crypto from 'node:crypto'
import { env } from './env'
import { transactionsRoutes } from "./routes/transactions"

const app = fastify()

app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
})

app.register(transactionsRoutes, {
    prefix: 'transactions',
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('http server running')
})