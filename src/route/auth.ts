// отвечает за навигацию связанную с авторизацией

import {Router} from 'express'
import { errorHandler } from '../error-handler'
import { login, signup } from '../controllers/users'

const authRoutes:Router = Router()

authRoutes.post('/signup', errorHandler(signup))
authRoutes.post('/login', errorHandler(login))

export default authRoutes