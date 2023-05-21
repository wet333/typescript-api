import { Request } from "express";

// All errors must implement GeneralError
export interface GeneralError {
    type: string;
    statusCode: number;
    message: string;
    requestURL: string;
    extraData: Object[];

    getError(): {
        type: string;
        requestURL: string;
        message: string;
        extraData: Object[];
    };

    getStatusCode(): number;
}

// Error types
export class ControllerError extends Error implements GeneralError {

    public type: string;
    public statusCode: number;
    public requestURL: string;
    public extraData: Object[];

    constructor(req: Request, message: string, extraData: Object[] = []) {
        super(message);
        this.type = "ControllerError";
        this.statusCode = 500;
        this.requestURL = req.url;
        this.extraData = extraData;
    }

    public getError() { 
        return {
            type: this.type, 
            requestURL: this.requestURL, 
            message: this.message, 
            extraData: this.extraData
        }
    };

    public getStatusCode(): number {
        return this.statusCode;
    }
}

export class ValidationError extends Error implements GeneralError {

    public type: string;
    public statusCode: number;
    public requestURL: string;
    public extraData: Object[];

    constructor(req: Request, message: string, extraData: Object[] = []) {
        super(message);
        this.type = "ValidationError";
        this.statusCode = 400;
        this.requestURL = req.url;
        this.extraData = extraData;
    }

    public getError() { 
        return {
            type: this.type, 
            requestURL: this.requestURL, 
            message: this.message, 
            extraData: this.extraData
        }
    };

    public getStatusCode(): number {
        return this.statusCode;
    }
}

export interface ValidationErrorItem {
    field: string;
    message: string;
}