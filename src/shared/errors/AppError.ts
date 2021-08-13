import { NotFoundError, RestifyHttpErrorOptions } from 'restify-errors';

const AppError = (error: RestifyHttpErrorOptions) => {
    return new NotFoundError(error.message);
};

export default AppError;
