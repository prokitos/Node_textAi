// проверка аутентификации (администратора)

import { $Enums } from "@prisma/client";
import { NextFunction, Request,Response } from "express";
import { UnauthorizedException } from "../exceptions/baseException";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async(req: Request, res: Response,next: NextFunction) => {

    const user = req.user
    if (user.role == $Enums.Role.Admin) {
        next()
    } else {
        next(new UnauthorizedException("unauthorized",ErrorCode.UNAUTHORIZED));
    }

}
export default adminMiddleware