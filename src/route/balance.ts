// отвечает за навигацию связанную с балансом

import {Router} from 'express'
import { errorHandler } from '../error-handler'
import { checkBalance, me, updateBalance } from '../controllers/users'
import authMiddleware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin'

const balanceRoutes:Router = Router()

balanceRoutes.get('/checkBalance',[authMiddleware,adminMiddleware], errorHandler(checkBalance))
balanceRoutes.put('/updateBalance',[authMiddleware,adminMiddleware], errorHandler(updateBalance))
balanceRoutes.post('/me', [authMiddleware] ,errorHandler(me))

export default balanceRoutes