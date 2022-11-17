import request from 'supertest'
import { app } from '../../../../app.js'
import {randomWord} from '../../../helpers/utils'

it(
    'returns filled array on successful deletion',
    async () => {
        const postResponse = await request(app)
            .post('/users')
            .send({
                name: 'Tassio Valle',
                email: randomWord(10)+'@ufrb.edu.br'
            })
        
        const deleteRoute = `/users/${postResponse.body.id}`
        const deleteResponse = await request(app)
            .delete(deleteRoute)
            .send()

        expect(deleteResponse.body.length).toBeGreaterThan(0)
    }
)

it(
    'returns empty array on non-existent user',
    async () => {
        const deleteRoute = '/users/7845645876'
        const response = await request(app)
            .delete(deleteRoute)
            .send()
        expect(response.body).toEqual([])
    }
)