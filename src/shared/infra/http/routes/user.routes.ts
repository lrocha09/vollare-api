import restify from 'restify';
import CreateUserService from '../../../../../src/modules/users/services/CreateUserService';
import ListUserService from '../../../../../src/modules/users/services/ListUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppError from '../../../errors/AppError';

const userRoutes = (app: restify.Server) => {
    app.post('/users', async (request, response, next) => {
        try {
            const { name, email, cpf, password, adm } = request.body;
            const createUser = new CreateUserService();
            const user = await createUser.execute({
                name,
                email,
                cpf,
                password,
                adm,
            });

            response.json({
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                adm: user.adm,
            });

            return next();
        } catch (error) {
            next(AppError(error));
        }
    });

    app.get('/users', ensureAuthenticated, async (request, response, next) => {
        try {
            const { adm } = request.authenticated;
            const { name } = request.query;
            const ListUser = new ListUserService();

            const user = await ListUser.execute({ name, adm });

            response.json(user);

            return next();
        } catch (error) {
            next(AppError(error));
        }
    });
};

export default userRoutes;
