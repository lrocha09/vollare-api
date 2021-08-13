import mongoose from 'mongoose';
import { environment } from '../../../config/environment';

const dbInit = async (): Promise<void> => {
    try {
        mongoose.Promise = global.Promise;

        mongoose.connect(environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('Connected to:', environment.db.url);
    } catch {
        throw new Error('Could not connect to database!');
    }
};

export default dbInit;
