import { app } from './app'
import {env} from './env'

const port = Number(process.env.PORT) || env.PORT
app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log(`http server running port ${port}` )
})