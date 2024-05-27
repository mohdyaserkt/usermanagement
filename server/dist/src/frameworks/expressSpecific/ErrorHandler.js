"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const errorHandler = (err, req, res, next) => {
    const error = new common_1.ResponseError({
        status: err.status || 500,
        msg: err.msg || err.message || 'No MSG',
        reason: err.reason || err.stack || 'Somebody failed',
        url: req.originalUrl,
        ip: req.ip,
        validationErrors: err.validationErrors || []
    });
    res.status(error.status);
    res.json(new common_1.Response({
        status: false,
        error
    }));
};
exports.default = errorHandler;
