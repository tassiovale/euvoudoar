import request from 'supertest'

import { app } from '../../../../app.js'
import { HTTP_STATUS_CREATED } from '../../../constants/httpStatusCodes.js'
import { deleteInstitutionById } from '../../../db/institution.js'
import { deleteUser, createUser } from '../../../db/user.js'
import { makeToken } from '../../../helpers/makeToken.js'

import { TEST_INFO } from '../../../__test__/testInfo'

let userAuth = {}
let institutionId

describe("POST /institutions", () => {

    beforeAll(async () => {
        //Create or Login
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser)
        userAuth = TEST_INFO.testerAdminUser
    })

    afterAll(async () => {
        await deleteInstitutionById(institutionId)
        await deleteUser(userAuth.id)
    });

    test("Extected status: 200. Return the institution created.", async () => {
        let res = await request(app).post('/institutions')
            .set('x-access-token', userAuth.token)
            .send(TEST_INFO.institution)
        expect(res.body.id).toBeDefined()
        expect(res.statusCode).toEqual(HTTP_STATUS_CREATED)
        institutionId = res.body.id

    })

})
