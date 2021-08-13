import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../users/schemas/User';
import { environment } from '../../../config/environment';
import { NotFoundError } from 'restify-errors';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
            throw new NotFoundError('Incorrect email and/or password!');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new NotFoundError('Incorrect email and/or password!');
        }

        const { secret, expiresIn } = environment.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
