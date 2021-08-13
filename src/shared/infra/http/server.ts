import dbInit from '../database';
import { environment } from '../../../config/environment';
import app from './app';

try {
    dbInit().then(() =>
        app.listen(environment.server.port, () => {
            console.log(
                `🚀 Server started on port ${environment.server.port}!`,
            );
        }),
    );
} catch (error) {
    console.log(error);
}
