import User from '../../users/schemas/User';

interface Request {
    name: string;
    email: string;
    cpf: string;
    password: string;
    adm: boolean;
}

class CreateUserService {
    public async execute({
        name,
        email,
        cpf,
        password,
        adm,
    }: Request): Promise<User> {
        const createUser = new User({
            name,
            email,
            cpf,
            password,
            adm,
        });

        const user = await createUser.save();

        return user;
    }
}

export default CreateUserService;
