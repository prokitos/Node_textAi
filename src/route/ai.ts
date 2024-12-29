// отвечает за навигацию связанную с ИИ

import {Router} from 'express'
import { errorHandler } from '../error-handler'
import { chatWithModel, newModel, removeModel, updateModel } from '../controllers/models'
import authMiddleware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin'

const aiRoutes:Router = Router()

aiRoutes.post('/chat', [authMiddleware],errorHandler(chatWithModel))
aiRoutes.post('/addModel', [authMiddleware,adminMiddleware], errorHandler(newModel))
aiRoutes.delete('/removeModel/:id', [authMiddleware,adminMiddleware], errorHandler(removeModel))
aiRoutes.put('/updateModel/:id', [authMiddleware,adminMiddleware], errorHandler(updateModel))

export default aiRoutes