import request from 'supertest'

import { app } from '../../../../app.js'

let userAuth = {}
let intitutionId

beforeEach(async() => {
    //Create or Login
    const resCreateUser = await request(app).post('/users').send({
        name: "Tester User Admin",
        email: "tester_user_admin@mail.com",
        role: "ADMIN"
    })
    userAuth = resCreateUser.body
})

afterEach(async () => {
    // TODO: await request(app).delete(`/institutions/${userAuth.id}`).send()
    //await request(app).delete(`/users/${userAuth.id}`).send()
    console.log("delete the tester user")
});

describe("POST /institutions", () => {
    

    test("Extected status: 200. Return the institution created.", async () => {

        var exampleInstitution = {
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
        }

        const respCreateInstitution = await request(app).post('/institutions')
                                                        .set('x-access-token', userAuth.token)
                                                        .send(exampleInstitution)
        expect(respCreateInstitution.id != null).toEqual(true)
        intitutionId = respCreateInstitution.id
    })

})
