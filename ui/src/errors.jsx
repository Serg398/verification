import C from './C';

export const ExtendedError = class ExtendedError {
    message;
    status;
    code;
    info;

    constructor(message, status, code, info = undefined) {
        this.message = message;
        this.status = status;
        this.code = code;
        this.info = typeof info === 'object' ? info : null;
    };

    getUserMessage(getSystemIfEmpty = true) {
        return (
            this.info?.userMessage ?
                this.info.userMessage :
                getSystemIfEmpty ?
                    this.message :
                    undefined
        );
    };
}

export class CommonStringError extends ExtendedError {
    constructor(message, status) {
        super(message, status, C.COMMON_ERROR_CODE);
    };
}

export class CommonJsonError extends ExtendedError {
    constructor(status, info) {
        super('', status, C.COMMON_ERROR_CODE, info);
    };
}