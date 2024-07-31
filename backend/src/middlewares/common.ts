import { Request, Response, NextFunction } from 'express';
import { CustomError, CustomRequest } from '../types/custom';

export const handleErrorResponse = function (err: CustomError, event: string, req: CustomRequest, res: Response, next: NextFunction) {
    const eventData = {
        error: err.toString(),
        details: JSON.stringify(err.stack),
        elapsed_time: req.elapsed_time,
        status: 500,
        reason: ''
    };
    if (err._info) {
        const info = err._info;
        const statusCode = info.status_code || 500;
        const message = err._customMsg || info.msg || {error: 'internal'};
        eventData.status = statusCode;
        eventData.reason = JSON.stringify(message);
        if(res.headersSent) {
           return;
        }
        return res.status(statusCode).send(message).end();
    }
    if(res.headersSent) {
        return;
     }
     return res.status(500).end();
}

export const handleNextResponse = function(err: CustomError, event: string, req: CustomRequest, res: Response, next:NextFunction) {
    let elapsed_time;
    if (req.start_time) {
        const end_time = Date.now();
        elapsed_time = parseInt(((end_time - req.start_time) / 1000).toFixed(2));
        req.elapsed_time = elapsed_time;
    }
    if (err) {
        return handleErrorResponse(err, event, req, res, next);
    }
    return next ? next() : res.status(200).end();
}

export const handle404ErrorResponse = function(err: CustomError, req: Request, res: Response, next: NextFunction) {
    const eventName = 'not_found';
    return handleErrorResponse(err, eventName, req, res, next);
}