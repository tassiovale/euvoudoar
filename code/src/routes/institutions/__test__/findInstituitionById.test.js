import request from 'supertest'
import { app } from '../../../../app.js'

import { deleteInstitutionById } from '../../../db/institution.js'
import { deleteUser } from '../../../db/user.js'

let user = {}
let institutionId

beforeEach(async () => {
    await request(app).post('/users').send({
        name: "Tester User Admin",
        email: "tester_user_admin@mail.com",
        role: "ADMIN"
    }).then((res) => {
        user = res.body
    })

    await request(app).post('/institutions')
        .set('x-access-token', user.token)
        .send({
            "name": "XPTO",
            "cnpj": "61.394.098/0001-01",
            "paymentGateway": {
                "type": "pagarme",
                "apiKey": "fkldsy879ey087yfg908stfb089760r976b0v"
            },
            "description": "Descrição da instituição...",
            "images": [
                "https://sistemas.ufrb.edu.br/sigaa/img/consolidacao/avaliacao.PNG",
                "https://cdn.4devs.com.br/imagens/logo_4devs.png"
            ]
        })
        .then((res) => {
            institutionId = res.body.id
        })
})

afterEach(async () => {
    await deleteInstitutionById(institutionId)
    await deleteUser(user.id)
})

describe('GET /institutions/{id}', () => {
    test('Should return 200 when institution is found', async () => {
        request(app).get(`/institutions/${institutionId}`)
            .set('x-access-token', user.token)
            .then(res => {
                expect(res.body.id).toEqual(institutionId)
                expect(res.status).toBe(200)
            })
    })

    test('Should return 404 when institution is not found', async () => {
        request(app).get(`/institutions/123456789`)
            .set('x-access-token', user.token)
            .then(res => {
                expect(res.status).toBe(404)
            })
    })
})