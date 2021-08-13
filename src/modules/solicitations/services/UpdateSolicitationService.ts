import Solicitation from '../../solicitations/schemas/Solicitation';
import { NotFoundError, NotAuthorizedError } from 'restify-errors';

interface Request {
    status: string;
    adm: boolean;
    idSolicitation: string;
}

class UpdateSolicitationService {
    public async execute({
        status,
        adm,
        idSolicitation,
    }: Request): Promise<Solicitation> {
        if (!adm) {
            throw new NotAuthorizedError(
                'Error: Restricted access to administrators',
            );
        }

        const options = { new: true, runValidators: true, overwrite: false };
        const solicitation = await Solicitation.findByIdAndUpdate(
            idSolicitation,
            { status: status },
            options,
        );

        if (solicitation) {
            return solicitation;
        } else {
            throw new NotFoundError('Error: Solicitation not found!');
        }
    }
}

export default UpdateSolicitationService;
