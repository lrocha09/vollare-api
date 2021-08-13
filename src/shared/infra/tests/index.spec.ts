import request from 'supertest';
import 'jest';
import app from '../http/app';
import { connection } from 'mongoose';
import { environment } from '../../../config/environment';
import dbInit from '../database';
import User from '../../../modules/users/schemas/User';
import Solicitation from '../../../modules/solicitations/schemas/Solicitation';

beforeAll(() => {
    environment.db.url = `${environment.db.url}-test`;
    dbInit();

    User.deleteMany({}).exec();
    Solicitation.deleteMany({}).exec();
});

describe('User Tests', () => {
    it('post /users', async () => {
        const response = await request(app).post('/users').send({
            name: 'test1',
            email: 'test1@email.com',
            cpf: '111.111.111-11',
            password: 'test123456',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('cpf');
        expect(response.body).toHaveProperty('adm');
    });

    it('get /users', async () => {
        await request(app).post('/users').send({
            name: 'test2',
            email: 'test2@email.com',
            cpf: '222.222.222-22',
            password: 'test123456',
            adm: true,
        });

        const resSession = await request(app).post('/sessions').send({
            email: 'test2@email.com',
            password: 'test123456',
        });

        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${resSession.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('Solicitation Tests', () => {
    it('post /solicitations - adm: false', async () => {
        const resUser = await request(app).post('/users').send({
            name: 'test3',
            email: 'test3@email.com',
            cpf: '333.333.333-33',
            password: 'test123456',
        });

        const resSession = await request(app).post('/sessions').send({
            email: 'test3@email.com',
            password: 'test123456',
        });

        const response = await request(app)
            .post('/solicitations')
            .send({
                title: 'solicitation test1',
                description: 'solicitation description1',
            })
            .set('Authorization', `Bearer ${resSession.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body.user).toBe(resUser.body.id);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('createdAt');
    });

    it('post /solicitations - adm: true', async () => {
        const resUser = await request(app).post('/users').send({
            name: 'test4',
            email: 'test4@email.com',
            cpf: '444.444.444-44',
            password: 'test123456',
        });

        await request(app).post('/users').send({
            name: 'test5',
            email: 'test5@email.com',
            cpf: '555.555.555-55',
            password: 'adm123456',
            adm: true,
        });

        const resSessionAdm = await request(app).post('/sessions').send({
            email: 'test5@email.com',
            password: 'adm123456',
        });

        const response = await request(app)
            .post('/solicitations')
            .send({
                title: 'solicitation test1',
                description: 'solicitation description1',
                user: resUser.body.id,
            })
            .set('Authorization', `Bearer ${resSessionAdm.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body.user).toBe(resUser.body.id);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('createdAt');
    });

    it('get /solicitations - adm: true', async () => {
        const resUser = await request(app).post('/users').send({
            name: 'test7',
            email: 'test7@email.com',
            cpf: '777.777.777-77',
            password: 'test123456',
        });

        await request(app).post('/users').send({
            name: 'test8',
            email: 'test8@email.com',
            cpf: '888.888.888-88',
            password: 'adm123456',
            adm: true,
        });

        const resSessionAdm = await request(app).post('/sessions').send({
            email: 'test8@email.com',
            password: 'adm123456',
        });

        await request(app)
            .post('/solicitations')
            .send({
                title: 'solicitation2',
                description: 'solicitation description2',
                user: resUser.body.id,
            })
            .set('Authorization', `Bearer ${resSessionAdm.body.token}`);

        const response = await request(app)
            .get('/solicitations?status=aberta&title=solicitation2')
            .set('Authorization', `Bearer ${resSessionAdm.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body[0].status).toBe('aberta');
        expect(response.body[0].title).toBe('solicitation2');
        expect(response.body[0].user._id).toBe(resUser.body.id);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('get /solicitations - adm: false', async () => {
        const resUser = await request(app).post('/users').send({
            name: 'test9',
            email: 'test9@email.com',
            cpf: '999.999.999-99',
            password: 'test123456',
        });

        const resSession = await request(app).post('/sessions').send({
            email: 'test9@email.com',
            password: 'test123456',
        });

        await request(app)
            .post('/solicitations')
            .send({
                title: 'solicitation3',
                description: 'solicitation description 3',
                user: resUser.body.id,
            })
            .set('Authorization', `Bearer ${resSession.body.token}`);

        const response = await request(app)
            .get('/solicitations?status=aberta&title=solicitation3')
            .set('Authorization', `Bearer ${resSession.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body[0].status).toBe('aberta');
        expect(response.body[0].title).toBe('solicitation3');
        expect(response.body[0].user._id).toBe(resUser.body.id);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('patch /solicitations', async () => {
        const resAdm = await request(app).post('/users').send({
            name: 'test10',
            email: 'test10@email.com',
            cpf: '101.010.101-01',
            password: 'adm123456',
            adm: true,
        });

        const resSessionAdm = await request(app).post('/sessions').send({
            email: 'test10@email.com',
            password: 'adm123456',
        });

        const resSolicitation = await request(app)
            .post('/solicitations')
            .send({
                title: 'solicitation4',
                description: 'solicitation description 4',
                user: resAdm.body.id,
            })
            .set('Authorization', `Bearer ${resSessionAdm.body.token}`);

        const response = await request(app)
            .patch(`/solicitations/${resSolicitation.body._id}`)
            .set('Authorization', `Bearer ${resSessionAdm.body.token}`)
            .send({
                status: 'fechada',
            });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('fechada');
        expect(response.body.title).toBe('solicitation4');
        expect(response.body.user).toBe(resAdm.body.id);
    });

    it('delete /solicitations', async () => {
        const resAdm = await request(app).post('/users').send({
            name: 'test11',
            email: 'test11@email.com',
            cpf: '111.010.101-11',
            password: 'adm123456',
            adm: true,
        });

        const resSessionAdm = await request(app).post('/sessions').send({
            email: 'test11@email.com',
            password: 'adm123456',
        });

        const resSolicitation = await request(app)
            .post('/solicitations')
            .send({
                title: 'solicitation5',
                description: 'solicitation description 5',
                user: resAdm.body.id,
            })
            .set('Authorization', `Bearer ${resSessionAdm.body.token}`);

        const response = await request(app)
            .del(`/solicitations/${resSolicitation.body._id}`)
            .set('Authorization', `Bearer ${resSessionAdm.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('OK');
        expect(response.body).toHaveProperty('message');
    });
});

afterAll(async () => {
    connection.close();
});
