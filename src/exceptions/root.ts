
export class HttpException extends Error {
    message: string;
    errorCode:  any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode:number, error:any) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error
    }
}

export enum ErrorCode {
    UNAUTHORIZED = 1001,
    FORBIDDEN = 1002,
    NOT_FOUND = 1003,
    BAD_REQUEST = 1004,
    CONFLICT = 1005,
    INCORRECT_PASSWORD = 1006,
    INTERNAL_EXCEPTION = 3001,
}