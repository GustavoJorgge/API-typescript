import fastify from "fastify"
import { knex } from "./database"
import crypto from 'node:crypto'
import {env} from './env'

const app = fastify()

app.get('/hello', async()=>{
// const transactions = await knex('transactions').insert({
//     id: crypto.randomUUID(),
//     title: 'Teste transacao',
//     amount: 1000,
// }).returning('*')

const transactions = await knex('transactions').select('*').where('amount',300)
    return transactions
})

app.listen({
    port: env.PORT,
}).then(() =>{
    console.log('http server running')
})