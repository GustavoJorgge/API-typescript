import { test, beforeAll, afterAll,describe } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Transaction routes', () =>{
    beforeAll(async () => {
        await app.ready()
    })

    test('O Usuario consegue criar uma nova transação', async () => {
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 5000,
                type: 'credit',
            }).expect(201)
    
    
    })
})

afterAll(async () => {
    await app.close()
})