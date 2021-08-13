import Solicitation from '../../solicitations/schemas/Solicitation';

interface Request {
    title: string;
    description: string;
    user: string;
    adm: boolean;
    id: string;
}

class CreateSolicitationService {
    public async execute({
        title,
        description,
        user,
        adm,
        id,
    }: Request): Promise<Solicitation> {
        const idUser = adm ? user : id;

        const createSolicitation = new Solicitation({
            title,
            description,
            user: idUser,
        });

        const solicitation = await createSolicitation.save();
        return solicitation;
    }
}

export default CreateSolicitationService;
