import 'dotenv/config'
import {z} from 'zod'

//colocando um formato padrão que vou receber de dados das variaveis de ambiente
// process.env
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'teste', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success == false){
    console.error('Variavel de ambiente com erro: env:', _env.error.format())

    throw new Error('Variavel de ambiente invalida.')
}

export const env = _env.data
