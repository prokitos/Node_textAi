// основные ошибки

import { ErrorCode, HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 500)
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode ) {
        super(message, errorCode, 401)
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string,errorCode:ErrorCode) {
        super(message,errorCode,400)
    }
}