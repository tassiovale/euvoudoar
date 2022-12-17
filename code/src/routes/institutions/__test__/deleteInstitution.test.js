import request from 'supertest'
import { app } from '../../../../app.js'
import { createUser, deleteUser } from '../../../db/user.js'
import { deleteInstitutionById } from '../../../db/institution.js'
import { HTTP_STATUS_OK, HTTP_STATUS_UNAUTHORIZED } from '../../../constants/httpStatusCodes.js'
import { TEST_INFO } from '../../../__test__/testInfo.js'
import { makeToken } from '../../../helpers/makeToken.js'


describe('DELETE /institutions/{id}', () => {
    beforeAll(async () => {
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser)
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

    test('Should return 200 if success', async () => {
        await request(app).delete(`/institutions/${TEST_INFO.institution.id}`)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .then(res => {
                expect(res.status).toBe(HTTP_STATUS_OK)
                expect(res.body.institution.deleterId).toEqual(TEST_INFO.testerAdminUser.id)
                expect(res.body.institution.deletedAt).not.toBeNull()
            })
    })

    test('Expected unauthorized error.', async () => {
        await request(app).delete(`/institutions/${TEST_INFO.institution.id}`)
            .then(res => {
                expect(res.status).toBe(HTTP_STATUS_UNAUTHORIZED)
            })
    })

    test('Should return 404 when institution is not found', async () => {
        await request(app).delete(`/institutions/123456789`)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .then(res => {
                expect(res.status).toBe(404)
            })
    })
})