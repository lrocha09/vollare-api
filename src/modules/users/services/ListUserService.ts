import User from '../../users/schemas/User';
import { NotAuthorizedError } from 'restify-errors';

interface Params {
    name: string;
    adm: boolean;
}

class ListUserService {
    public async execute({ name, adm }: Params): Promise<User | User[]> {
        if (!adm) {
            throw new NotAuthorizedError(
                'Error: Restricted access to administrators',
            );
        }

        const filter = name ? { name: name } : {};

        return await User.find(filter, 'active adm name email');
    }
}

export default ListUserService;
