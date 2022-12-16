import request from 'supertest'
import { app } from '../../../../app.js'

import { deleteInstitutionById, findInstitutionByCNPJ} from '../../../db/institution.js'
import {getTesterUser} from "../../../__test__/setup.tester.js"


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
        name:"Tester User Admin",
        email:"tester_user_admin4@mail.com",
        password: "p12&35wdA.dNa-@to!",
        passwordConfirmation: "p12&35wdA.dNa-@to!",
    }
}

beforeAll(async () => {

    const institution = await findInstitutionByCNPJ(TEST_INFO.institution.cnpj)
    if (institution != null){
        if (institution.id != null){
            deleteInstitutionById(institution.id)
        }
    }
    TEST_INFO.testerAdminUser = await getTesterUser(TEST_INFO.testerAdminUser)
})

afterAll(async () => {
    await deleteInstitutionById(TEST_INFO.institution.id)
});

describe("POST /institutions", () => {
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
