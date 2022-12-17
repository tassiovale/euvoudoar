import request from 'supertest'
import { app } from '../../../../app.js'
import { createUser, deleteUser } from '../../../db/user.js'
import { deleteInstitutionById } from '../../../db/institution.js'
import { TEST_INFO } from '../../../__test__/testInfo.js'
import { makeToken } from '../../../helpers/makeToken.js'

describe("POST /institutions", () => {
    beforeAll(async () => {
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser)
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
