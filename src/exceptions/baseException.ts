import { ErrorCode, HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any = null) {
        super(message, errorCode, 500, errors)
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any = null ) {
        super(message, errorCode, 401, errors)
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string,errorCode:ErrorCode,errors: any = null) {
        super(message,errorCode,400,errors)
    }
}