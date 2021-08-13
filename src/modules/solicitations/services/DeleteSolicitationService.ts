import Solicitation from '../../solicitations/schemas/Solicitation';
import { NotFoundError, NotAuthorizedError } from 'restify-errors';

interface Params {
    id: string;
    adm: boolean;
    idSolicitation: string;
}

interface Response {
    message: string;
    name: string;
}

class DeleteSolicitationService {
    public async execute({
        id,
        adm,
        idSolicitation,
    }: Params): Promise<Response> {
        if (!adm) {
            const solicitation = await Solicitation.findById(idSolicitation);

            if (!(solicitation?.user == id)) {
                throw new NotAuthorizedError(
                    'Error: Restricted access to administrators',
                );
            }
        }

        const soliDeleted = await Solicitation.deleteOne({
            _id: idSolicitation,
        });

        if (soliDeleted.deletedCount) {
            return {
                name: 'OK',
                message: 'Solicitation deleted successfully!',
            };
        } else {
            throw new NotFoundError('Error: Solicitation not found!');
        }
    }
}

export default DeleteSolicitationService;
