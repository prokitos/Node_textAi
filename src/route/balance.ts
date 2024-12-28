// отвечает за навигацию связанную с балансом

import {Router} from 'express'
import { errorHandler } from '../error-handler'
import { getBalanceById, getCurrentBalance, updateBalanceById } from '../controllers/users'
import authMiddleware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin'

const balanceRoutes:Router = Router()

balanceRoutes.get('/checkBalance/:id',[authMiddleware,adminMiddleware], errorHandler(getBalanceById))
balanceRoutes.put('/updateBalance/:id',[authMiddleware,adminMiddleware], errorHandler(updateBalanceById))
balanceRoutes.post('/myBalance', [authMiddleware] ,errorHandler(getCurrentBalance))

export default balanceRoutes