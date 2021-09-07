import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {        
    const response = await request(app)
        .get('/api/account/current_user')
        .set('Cookie', await global.signin())
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with a null current user if not authenticated', async () => {        
    const response = await request(app)
        .get('/api/account/current_user')
        .send()
        .expect(200);

    expect(response.body.currentUser).toBeNull();
});