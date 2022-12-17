import request from 'supertest'

import { app } from '../../../../app.js'
import { HTTP_STATUS_CREATED } from '../../../constants/httpStatusCodes.js'
import { deleteInstitutionById } from '../../../db/institution.js'
import { deleteUser, createUser } from '../../../db/user.js'
import { makeToken } from '../../../helpers/makeToken.js'
import { deleteDonateById } from '../../../db/donate.js'

import { TEST_INFO, generateEmail } from '../../../__test__/testInfo.js'
import { ADMIN } from '../../../constants/roles.js'

describe("POST /donations : create Donate", () => {

    beforeAll(async () => {
        TEST_INFO.testerAdminUser.email = generateEmail()
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.role = ADMIN
        TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser)
        const resCreateInstitution = (await request(app).post('/institutions')
                                        .set('x-access-token', TEST_INFO.testerAdminUser.token)
                                        .send(TEST_INFO.institution))
        TEST_INFO.institution.id = resCreateInstitution.body.id
        TEST_INFO.donate.institutionId = resCreateInstitution.body.id
        TEST_INFO.donate.donorId = TEST_INFO.testerAdminUser.id
    })

    afterAll(async () => {
        await deleteDonateById(TEST_INFO.donate.id)
        await deleteInstitutionById(TEST_INFO.institution.id)
        await deleteUser(TEST_INFO.testerAdminUser.id)
    });

    test("Extected status: 200. Return the donation created.", async () => {
        const res = await request(app).post('/donations/')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(TEST_INFO.donate)
        expect(res.body.id).toBeDefined()
        expect(res.statusCode).toEqual(HTTP_STATUS_CREATED)
        TEST_INFO.donate.id = res.body.id
    })

})
