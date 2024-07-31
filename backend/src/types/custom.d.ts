import { Request } from 'express';

export interface CustomRequest extends Request {
    start_time?: number,
    elapsed_time?: number,
    status?: number
}

export interface CustomError extends Error {
    _info: any,
    stack: any,
    _customMsg: any
}