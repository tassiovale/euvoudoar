import request from 'supertest'
import { app } from '../../../../app.js'
import jwt from 'jsonwebtoken'
import { createUser, deleteUser } from '../../../db/user.js'
import { deleteInstitutionById } from '../../../db/institution.js'


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

describe("POST /institutions", () => {
    beforeAll(async () => {
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.token = jwt.sign(
            {
                id: TEST_INFO.testerAdminUser.id,
                role: TEST_INFO.testerAdminUser.role
            },
            process.env.SECRETKEY
        )
    })

    afterAll(async () => {
        await deleteInstitutionById(TEST_INFO.institution.id)
        await deleteUser(TEST_INFO.testerAdminUser.id)
    });

    test("Expect status: 200. Return the institution created.", async () => {
        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(TEST_INFO.institution)
            .then((res) => {
                expect(res.status).toBe(201)
                expect(res.body.id).not.toBeFalsy()
                TEST_INFO.institution.id = res.body.id
            })
    })

})
