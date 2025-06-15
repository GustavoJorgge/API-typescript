import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import cookie from '@fastify/cookie'

// Cookies <--> Formas da gente manter contexto entre requisições
// 

export async function transactionsRoutes(app: FastifyInstance) {

    app.register(cookie)

    app.get('/', async () => {
        const transactions = await knex ('transactions').select()
    
        return {
            total: transactions.length,
            transactions}
    })

    app.get('/:id', async(request) => {
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const {id} = getTransactionsParamsSchema.parse(request.params)

        const transaction = await knex("transactions").where('id',id).first()

        return{
            transaction
        }
    })

    app.get('/summary', async()=>{

        const summary = await knex('transactions').sum('amount', {as: 'Amount'}).first()

        return {
            summary
        }
    })

    app.post('/', async (request, reply) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if(!sessionId){
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 dia ( segundos * minutos * horas * dias)
            })
        }

        await knex('transactions').insert({
            id: crypto.randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1,
            session_id: sessionId
        })


        // HTTP Codes: 
        // 201 - Recurso criado com sucesso

        return reply.status(201).send()
    })

}