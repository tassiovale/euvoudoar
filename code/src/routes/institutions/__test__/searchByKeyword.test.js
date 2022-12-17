import request from 'supertest'
import { app } from '../../../../app.js'
import { HTTP_STATUS_NO_CONTENT, HTTP_STATUS_OK } from '../../../constants/httpStatusCodes.js'
import { createUser, deleteUser } from '../../../db/user.js'
import { deleteInstitutionById } from '../../../db/institution.js'
import { TEST_INFO, generateEmail } from '../../../__test__/testInfo.js'
import { makeToken } from '../../../helpers/makeToken.js'

describe('GET /institutions/', () => {
    beforeAll(async () => {
        TEST_INFO.testerAdminUser.email = generateEmail()
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

    test('Should return 200 when institution is found', async () => {
        await request(app).get(`/institutions?keyword=${TEST_INFO.institution.name}`)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .then(res => {
                expect(res.body[0].id).toEqual(TEST_INFO.institution.id)
                expect(res.status).toBe(HTTP_STATUS_OK)
            })
    })
    test('Should return 204 when not have institutions', async () => {
        await request(app).get(`/institutions?keyword=XPTU`)
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .then(res => {
                expect(res.status).toBe(HTTP_STATUS_NO_CONTENT)
            })
    })
})