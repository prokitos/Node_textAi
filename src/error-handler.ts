// обработка ошибок для роутов

import { NextFunction,Response, Request } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/baseException"

export const errorHandler = (method: Function) => {
    return async (req: Request, res:Response, next: NextFunction) => {
        try {
            await method(req,res,next)
        } catch(err:any) {
            let exceptions: HttpException;
            if (err instanceof HttpException) {
                exceptions = err
            } else {
                exceptions = new InternalException('some went wrong', ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exceptions)
        }
    }
}