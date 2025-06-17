import {config} from 'dotenv'
import {z} from 'zod'

if(process.env.NODE_ENV == 'test'){
    config({path: '.env.test'})
}else{
    config()
}

//colocando um formato padrão que vou receber de dados das variaveis de ambiente
// process.env
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success == false){
    console.error('Variavel de ambiente com erro: env:', _env.error.format())

    throw new Error('Variavel de ambiente invalida.')
}

export const env = _env.data
