import request from 'supertest'
import { app } from '../../../../app.js'
import {randomWord} from '../../../helpers/utils'

it(
    'returns 201 on successful signup',
    async () => {
        return request(app)
            .post('/users')
            .send({
                name: 'Tassio Valle',
                email: randomWord(10)+'@ufrb.edu.br',
                role: "ADMIN"
            })
            .expect(201)
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