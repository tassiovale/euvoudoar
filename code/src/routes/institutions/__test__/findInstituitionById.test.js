import request from 'supertest'
import { app } from '../../../../app.js'
import { HTTP_STATUS_UNAUTHORIZED } from '../../../constants/httpStatusCodes.js'
import { createUser, deleteUser } from '../../../db/user.js'
import { deleteInstitutionById } from '../../../db/institution.js'
import jwt from 'jsonwebtoken'

const TEST_INFO = {
    institution: {
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
    },
    testerAdminUser: {
        name: "Tester User Admin",
        email: "tester_user_admin4@mail.com",
        password: "p12&35wdA.dNa-@to!",
        role: "ADMIN"
    }
}

describe('GET /institutions/{id}', () => {
    beforeAll(async () => {
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.token = jwt.sign(
            {
                id: TEST_INFO.testerAdminUser.id,
                role: TEST_INFO.testerAdminUser.role
            },
            process.env.SECRETKEY
        )
        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(TEST_INFO.institution)
            .then(res => {
                TEST_INFO.institution.id = res.body.id
            }
            )
    })

    afterAll(async () => {
        await deleteInstitutionById(TEST_INFO.institution.id)
        await deleteUser(TEST_INFO.testerAdminUser.id)
    })

    test('Should return 200 when institution is found', async () => {
        await request(app).get(`/institutions/${TEST_INFO.institution.id}`)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .then(res => {
                expect(res.body.id).toEqual(TEST_INFO.institution.id)
                expect(res.status).toBe(200)
            })
    })

    test('Expected unauthorized error.', async () => {
        await request(app).get(`/institutions/${TEST_INFO.institution.id}`)
            .then(res => {
                expect(res.status).toBe(HTTP_STATUS_UNAUTHORIZED)
            })
    })

    test('Should return 404 when institution is not found', async () => {
        await request(app).get(`/institutions/123456789`)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .then(res => {
                expect(res.status).toBe(404)
            })
    })
})