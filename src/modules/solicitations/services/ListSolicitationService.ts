import Solicitation from '../../solicitations/schemas/Solicitation';

interface Query {
    status: string;
    title: string;
    adm: string;
    id: string;
}

class ListSolicitationService {
    public async execute({
        status,
        title,
        adm,
        id,
    }: Query): Promise<Solicitation | Solicitation[]> {
        let filter;

        adm ? (filter = {}) : (filter = { user: id });

        if (status && title) {
            adm
                ? (filter = {
                      status: status,
                      title: title,
                  })
                : (filter = {
                      user: id,
                      status: status,
                      title: title,
                  });
        } else if (status) {
            adm
                ? (filter = {
                      status: status,
                  })
                : (filter = {
                      user: id,
                      status: status,
                  });
        } else if (title) {
            adm
                ? (filter = {
                      title: title,
                  })
                : (filter = {
                      user: id,
                      title: title,
                  });
        }

        return await Solicitation.find(filter).populate('user', [
            'adm',
            'name',
            'email',
        ]);
    }
}

export default ListSolicitationService;
