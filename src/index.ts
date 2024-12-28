// точка входа

import express, {Express} from 'express'
import { PORT } from './secrets'
import { PrismaClient } from '@prisma/client'
import rootRouter from './route'
import { errorMiddleware } from './middlewares/errors'


const app:Express = express()
app.use(express.json())
app.use('/api',rootRouter)

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.use(errorMiddleware)

app.listen(PORT, () => {console.log("app work")})








// npm start   ||   node src/index.js  
