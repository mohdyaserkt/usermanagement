import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { ResponseError, Response } from '../common';

const errorHandler = (err: any, req: Request, res: ExpressResponse, next: NextFunction) => {
    const error = new ResponseError({
        status: err.status || 500,
        msg: err.msg || err.message || 'No MSG',
        reason: err.reason || err.stack || 'Somebody failed',
        url: req.originalUrl,
        ip: req.ip as string,
        validationErrors: err.validationErrors || []
    });

    res.status(error.status);
    res.json(new Response({
        status: false,
        error
    }));
};

export default errorHandler;
