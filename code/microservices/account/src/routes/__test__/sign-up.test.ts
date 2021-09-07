import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/account/sign_up')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/account/sign_up')
        .send({
            email: 'teste@teste',
            password: '123456'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/account/sign_up')
        .send({
            email: 'teste@teste.com',
            password: '123'
        })
        .expect(400);
});

it('returns a 400 with the missing email parameter', async () => {
    return request(app)
        .post('/api/account/sign_up')
        .send({
            password: '123456'
        })
        .expect(400);
});

it('returns a 400 with the missing password parameter', async () => {
    return request(app)
        .post('/api/account/sign_up')
        .send({
            email: 'email@email.com'
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/account/sign_up')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(201);

    await request(app)
        .post('/api/account/sign_up')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/account/sign_up')
        .send({
            email: 'teste@teste.com',
            password: '123456'
        })
        .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});