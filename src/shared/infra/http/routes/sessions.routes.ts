import restify from 'restify';
import AuthenticateUserService from '../../../../../src/modules/users/services/AuthenticateUserService';
import AppError from '../../../errors/AppError';

const sessionsRouter = (app: restify.Server) => {
    app.post('/sessions', async (request, response, next) => {
        try {
            const { email, password } = request.body;
            const AuthenticateUser = new AuthenticateUserService();
            const { user, token } = await AuthenticateUser.execute({
                email,
                password,
            });

            response.json({
                user: {
                    adm: user.adm,
                    name: user.name,
                    email: user.email,
                },
                token,
            });

            return next();
        } catch (error) {
            next(AppError(error));
        }
    });
};

export default sessionsRouter;
