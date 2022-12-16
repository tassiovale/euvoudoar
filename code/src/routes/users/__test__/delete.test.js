import request from 'supertest'
import { app } from '../../../../app.js'

import request from 'supertest'
import { app } from '../../../../app.js'
import { createUser, searchUserByEmail } from '../../../db/user.js'

const TEST_INFO = {}

beforeAll(async () => {

    const userAdminExists = await searchUserByEmail("tester_user_admin@mail.com")

    if (userExists != null){
        TEST_INFO.testerAdminUser = userAdminExists
    }else{
        TEST_INFO.testerAdminUser = await createUser({
            name:"Tester User Admin",
            email:"tester_user_admin@mail.com",
            role: "ADMIN",
            password: "p12&35wdA.dNa-@to!"
        })
    }

    const loginAdminUserRes = await request(app).post('/signin').send({
        email: TEST_INFO.testerUser.email,
        password: TEST_INFO.testerUser.password
    })

    TEST_INFO.loginAdminToken = loginAdminUserRes.body.token
    console.log(TEST_INFO)
})


describe("DELETE /user", () => {
    
    test('returns filled array on successful deletion', async () => {

        const deleteResponse = await request(app)
            .delete(`/users/${TEST_INFO.testerAdminUser.id}`)
            .send()

        console.log("delete reponse:")
        console.log(deleteResponse.body)
        expect(deleteResponse.body.length).toBeGreaterThan(0)
    })

    test('returns empty array on non-existent user', async () => {
        const deleteRoute = '/users/7845645876'
        const response = await request(app)
            .delete(deleteRoute)
            .send()
        expect(response.body).toEqual([])
    })

})
