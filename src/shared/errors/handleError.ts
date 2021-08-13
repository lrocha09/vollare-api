import { Request, Response, Next } from 'restify';

const handleError = (
    request: Request,
    response: Response,
    error: any,
    next: Next,
) => {
    error.toJSON = function customToJSON() {
        return {
            name: error.name,
            message: error.message,
        };
    };
    next();
};

export default handleError;
