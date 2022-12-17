import request from 'supertest'
import { app } from '../../../../app.js'
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK } from '../../../constants/httpStatusCodes.js';
import { randomWord } from '../../../helpers/utils'
import { TEST_INFO } from '../../../__test__/testInfo.js'
import { createUser, deleteUser } from '../../../db/user.js'
import { makeToken } from '../../../helpers/makeToken.js';

let user;
describe("DELETE /user", () => {

    beforeAll(async () => {
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser)
        const response = await request(app)
            .post('/users')
            .send({
                name: 'Tassio Valle',
                email: randomWord(10) + '@ufrb.edu.br',
                password: '123456A@b',
                passwordConfirmation: '123456A@b'
            })
        user = response.body
    })

    afterAll(async () => {
        await deleteUser(TEST_INFO.testerAdminUser.id)
    })

    test('returns 200 if success', async () => {
        const deleteResponse = await request(app)
            .delete(`/users/${user.id}`)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send()
        expect(deleteResponse.status).toBe(HTTP_STATUS_OK)
        expect(deleteResponse.body.id).not.toBeNull()
    })

    test('returns empty array on non-existent user', async () => {
        const deleteRoute = '/users/7845645876'
        const response = await request(app)
            .delete(deleteRoute)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send()
        expect(response.status).toBe(HTTP_STATUS_NOT_FOUND)
        expect(response.body).toEqual([])
    })

})
