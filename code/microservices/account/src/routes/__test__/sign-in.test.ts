import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/sign_in')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/sign_up')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(201);

    await request(app)
        .post('/api/users/sign_in')
        .send({
            email: 'teste@teste.com',
            password: '1234567'
        })
        .expect(400);
});

it('responds with cookie when given valid credencials', async () => {
    await request(app)
        .post('/api/users/sign_up')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(201);
        
    const response = await request(app)
        .post('/api/users/sign_in')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});