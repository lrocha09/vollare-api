import restify from 'restify';
import userRoutes from './user.routes';
import solicitationRoutes from './solicitation.routes';
import sessionsRouter from './sessions.routes';

const routes = (app: restify.Server) => {
    sessionsRouter(app);
    userRoutes(app);
    solicitationRoutes(app);
};

export default routes;
