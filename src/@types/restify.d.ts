import User from '../models/User';

declare module 'restify' {
    export interface Request {
        authenticated: {
            adm?: User.adm;
            id?: User.id;
        };
    }
}
