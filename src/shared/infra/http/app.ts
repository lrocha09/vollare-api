require('dotenv').config();
import restify, { plugins } from 'restify';
import handleError from '../../errors/handleError';
import Routes from './routes';

const app = restify.createServer();

app.use(plugins.bodyParser());
app.use(plugins.queryParser());
app.on('restifyError', handleError);

Routes(app);

export default app;
