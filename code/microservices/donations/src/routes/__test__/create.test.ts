import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on donation with valid data', async () => {
    return request(app)
        .post('/api/donations')
        .set('Cookie', global.signin())
        .send({
            institutionName: 'Igreja Nossa Senhora',
            description: 'Dízimo',
            value: 300
        })
        .expect(201);
});

it('returns unauthorized with invalid cookie', async () => {
    return request(app)
        .post('/api/donations')
        .send({
            institutionName: 'Igreja Nossa Senhora',
            description: 'Dízimo',
            value: 300
        })
        .expect(401);
});

it('returns a 400 on missing parameters', async () => {
    await request(app)
        .post('/api/donations')
        .set('Cookie', global.signin())
        .send({
            description: 'Dízimo',
            value: 300
        })
        .expect(400);
    await request(app)
        .post('/api/donations')
        .set('Cookie', global.signin())
        .send({
            institutionName: 'Igreja Nossa Senhora',
            value: 300
        })
        .expect(400);
    await request(app)
        .post('/api/donations')
        .set('Cookie', global.signin())
        .send({
            institutionName: 'Igreja Nossa Senhora',
            description: 'Dízimo',
        })
        .expect(400);
});

it('returns a 400 on wrong parameters values', async () => {
    await request(app)
        .post('/api/donations')
        .set('Cookie', global.signin())
        .send({
            institutionName: '',
            description: 'Dízimo',
            value: 300
        })
        .expect(400);
    await request(app)
        .post('/api/donations')
        .set('Cookie', global.signin())
        .send({
            institutionName: 'Igreja Nossa Senhora',
            description: '',
            value: 300
        })
        .expect(400);
    await request(app)
        .post('/api/donations')
        .set('Cookie', global.signin())
        .send({
            institutionName: 'Igreja Nossa Senhora',
            description: 'Dízimo',
            value: -10
        })
        .expect(400);
});