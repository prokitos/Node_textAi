// создание трех основных роутов

import {Router} from "express";
import authRoutes from "./auth";
import aiRoutes from "./ai";
import balanceRoutes from "./balance";

const rootRouter: Router = Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/ai',aiRoutes)
rootRouter.use('/balance',balanceRoutes)

export default rootRouter