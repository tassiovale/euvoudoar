import request from 'supertest'
import { app } from '../../../../app.js'

import { deleteInstitutionById } from '../../../db/institution.js'
import { deleteUser } from '../../../db/user.js'

let userAuth = {}
let institutionId

beforeEach(async () => {
    const resCreateUser = await request(app).post('/users').send({
        name: "Tester User Admin",
        email: "tester_user_admin@mail.com",
        role: "ADMIN"
    })
    userAuth = resCreateUser.body
})

afterEach(async () => {
    await deleteInstitutionById(institutionId)
    await deleteUser(userAuth.id)
});

describe("POST /institutions", () => {
    test("Expect status: 200. Return the institution created.", async () => {
        await request(app).post('/institutions')
            .set('x-access-token', userAuth.token)
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
                expect(res.status).toBe(201)
                expect(res.body.id).not.toBeFalsy()
                institutionId = res.body.id
            })
    })

})
