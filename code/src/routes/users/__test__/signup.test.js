import request from 'supertest'
import { app } from '../../../../app.js'
import { randomWord } from '../../../helpers/utils'

import { deleteUser } from '../../../db/user.js';

describe('SignUp Tests', () => {

    it(
        'returns 201 on successful signup',
        async () => {
            let response = await request(app)
                .post('/users')
                .send({
                    name: 'Tassio Valle',
                    email: randomWord(10) + '@ufrb.edu.br',
                    password: '123456A@b',
                    passwordConfirmation: '123456A@b'
                })
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('token')
            await deleteUser(response.body.id)
        }
    )

    it(
        'returns 400 for empty names',
        async () => {
            return request(app)
                .post('/users')
                .send({
                    name: '',
                    email: 'tassio.vale@ufrb.edu.br'
                })
                .expect(400)
        }
    )

    it(
        'returns 400 for invalid emails',
        async () => {
            return request(app)
                .post('/users')
                .send({
                    name: 'Tassio Valle',
                    email: 'tassio.vale@'
                })
                .expect(400)
        }
    )

    it(
        'returns 400 for incomplete request objects',
        async () => {
            return request(app)
                .post('/users')
                .send({
                    email: 'tassio.vale@'
                })
                .expect(400)
        }
    )
});
