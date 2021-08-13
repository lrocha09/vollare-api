import { RequestHandler } from 'restify';
import { verify } from 'jsonwebtoken';
import { environment } from '../../../../config/environment';
import User from '../../../../modules/users/schemas/User';
import { NotFoundError } from 'restify-errors';

const ensureAuthenticated: RequestHandler = async (request, response, next) => {
    try {
        const authHeader = request.header('authorization');

        if (authHeader) {
            const [, token] = authHeader.split(' ');

            const { sub } = verify(token, environment.jwt.secret);
            const user = await User.findById(sub).exec();

            if (user) {
                const { adm, id } = user;
                request.authenticated = { adm, id };
            }
        } else {
            throw new NotFoundError('Error: Bearer Token vazio!');
        }

        return next();
    } catch (error) {
        response.json(error);
    }
};

export default ensureAuthenticated;
