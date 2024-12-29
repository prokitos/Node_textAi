// точка входа

import express, {Express} from 'express'
import { PORT } from './secrets'
import { PrismaClient } from '@prisma/client'
import rootRouter from './route'
import { errorMiddleware } from './middlewares/errors'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'


const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json', 'utf-8'));
const app:Express = express()
app.use(express.json())
app.use('/api',rootRouter)


export const prismaClient = new PrismaClient({
    log: ['query']
})

app.use(errorMiddleware)

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(PORT, () => {console.log("app work")})


