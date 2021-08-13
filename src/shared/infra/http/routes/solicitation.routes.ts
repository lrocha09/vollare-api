import restify from 'restify';
import CreateSolicitationService from '../../../../../src/modules/solicitations/services/CreateSolicitationService';
import UpdateSolicitationService from '../../../../../src/modules/solicitations/services/UpdateSolicitationService';
import DeleteSolicitationService from '../../../../../src/modules/solicitations/services/DeleteSolicitationService';
import ListSolicitationService from '../../../../../src/modules/solicitations/services/ListSolicitationService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppError from '../../../errors/AppError';

const solicitationRoutes = (app: restify.Server) => {
    app.post(
        '/solicitations',
        ensureAuthenticated,
        async (request, response, next) => {
            const { adm, id } = request.authenticated;

            try {
                const { title, description, user } = request.body;
                const createSolicitation = new CreateSolicitationService();
                const solicitation = await createSolicitation.execute({
                    title,
                    description,
                    user,
                    adm,
                    id,
                });

                response.json(solicitation);

                return next();
            } catch (error) {
                next(AppError(error));
            }
        },
    );

    app.patch(
        '/solicitations/:id',
        ensureAuthenticated,
        async (request, response, next) => {
            try {
                const { adm } = request.authenticated;
                const { status } = request.body;
                const idSolicitation = request.params.id;

                const updateSolicitation = new UpdateSolicitationService();
                const solicitation = await updateSolicitation.execute({
                    adm,
                    status,
                    idSolicitation,
                });

                response.json(solicitation);

                return next();
            } catch (error) {
                next(AppError(error));
            }
        },
    );

    app.del(
        '/solicitations/:id',
        ensureAuthenticated,
        async (request, response, next) => {
            try {
                const { id, adm } = request.authenticated;
                const idSolicitation = request.params.id;
                const deleteSolicitation = new DeleteSolicitationService();

                const soliDeleted = await deleteSolicitation.execute({
                    id,
                    adm,
                    idSolicitation,
                });

                response.json(soliDeleted);

                return next();
            } catch (error) {
                next(AppError(error));
            }
        },
    );

    app.get(
        '/solicitations',
        ensureAuthenticated,
        async (request, response, next) => {
            try {
                const { adm, id } = request.authenticated;
                const { status, title } = request.query;

                const ListSolicitation = new ListSolicitationService();
                const result = await ListSolicitation.execute({
                    status,
                    title,
                    adm,
                    id,
                });

                response.json(result);

                return next();
            } catch (error) {
                next(AppError(error));
            }
        },
    );
};

export default solicitationRoutes;
