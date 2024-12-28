// проверка авторизации (токена)

import { NextFunction, Request,Response } from "express";
import { UnauthorizedException } from "../exceptions/baseException";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { JWT_SECRET } from "../secrets";
import jwt from 'jsonwebtoken'

const authMiddleware = async(req: Request, res: Response,next: NextFunction) => {

    const token = req.headers.authorization

    if (!token) {
        next(new UnauthorizedException("unauthorized",ErrorCode.UNAUTHORIZED));
    }

    try {
        const payload = jwt.verify(token!,JWT_SECRET) as any
        const user = await prismaClient.user.findFirst({where:{id:payload.userId}})

        if (!user) {
            next(new UnauthorizedException("unauthorized",ErrorCode.UNAUTHORIZED));
        }

        req.user = user as any;
        next()
    } catch (err) {
        next(new UnauthorizedException("unauthorized",ErrorCode.UNAUTHORIZED));
    }

}
export default authMiddleware