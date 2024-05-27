"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ResponseError = exports.Response = void 0;
class Response {
    constructor({ status = false, error = null, content = null }) {
        this.status = status;
        this.error = error;
        this.content = content;
    }
}
exports.Response = Response;
class ResponseError {
    constructor({ status, msg, reason, url, ip, validationErrors = [] }) {
        this.status = status;
        this.msg = msg;
        this.reason = reason;
        this.url = url;
        this.ip = ip;
        this.validationErrors = validationErrors;
    }
}
exports.ResponseError = ResponseError;
class ValidationError {
    constructor({ field, msg }) {
        this.field = field;
        this.msg = msg;
    }
}
exports.ValidationError = ValidationError;
