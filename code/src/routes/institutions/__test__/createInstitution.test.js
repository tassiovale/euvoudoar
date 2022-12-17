import request from 'supertest'
import { app } from '../../../../app.js'
import { createUser, deleteUser } from '../../../db/user.js'
import { deleteInstitutionById } from '../../../db/institution.js'
import { TEST_INFO, generateEmail } from '../../../__test__/testInfo.js'
import { makeToken } from '../../../helpers/makeToken.js'
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_UNAUTHORIZED } from '../../../constants/httpStatusCodes.js'

describe("POST /institutions", () => {
    beforeAll(async () => {
        TEST_INFO.testerAdminUser.email = generateEmail()
        TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser)
        TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser)

        TEST_INFO.testerUser.email = generateEmail()
        TEST_INFO.testerUser = await createUser(TEST_INFO.testerUser)
        TEST_INFO.testerUser.token = makeToken(TEST_INFO.testerUser)
    })

    afterAll(async () => {
        await deleteInstitutionById(TEST_INFO.institution.id)
        await deleteUser(TEST_INFO.testerAdminUser.id)
        await deleteUser(TEST_INFO.testerUser.id)
    });

    test("Expect created status. Return the institution created.", async () => {
        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(TEST_INFO.institution)
            .then((res) => {
                expect(res.status).toBe(HTTP_STATUS_CREATED)
                expect(res.body.id).not.toBeFalsy()
                TEST_INFO.institution.id = res.body.id
            })
    })

    test("Expect errors when not provide name in institution data.", async () => {

        const wrongInstitution = {...TEST_INFO.institution}
        wrongInstitution.name = ""

        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(wrongInstitution)
            .then((res) => {
                expect(res.status).toBe(HTTP_STATUS_BAD_REQUEST)
            })
    })

    test("Expect 403 error when not provide cnpj in institution data.", async () => {

        const wrongInstitution = {...TEST_INFO.institution}
        wrongInstitution.cnpj = ""

        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(wrongInstitution)
            .then((res) => {
                expect(res.status).toBe(HTTP_STATUS_BAD_REQUEST)
            })
    })

    test("Expect 4003 error when not provide images in institution data.", async () => {

        const wrongInstitution = {...TEST_INFO.institution}
        wrongInstitution.images = ""

        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(wrongInstitution)
            .then((res) => {
                expect(res.status).toBe(HTTP_STATUS_BAD_REQUEST)
            })
    })

    test("Expect 403 error when not provide description in institution data.", async () => {

        const wrongInstitution = {...TEST_INFO.institution}
        wrongInstitution.description = ""

        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerAdminUser.token)
            .send(wrongInstitution)
            .then((res) => {
                expect(res.status).toBe(HTTP_STATUS_BAD_REQUEST)
            })
    })

    test("Expected 401, unauthorized error", async () => {

        await request(app).post('/institutions')
            .send(TEST_INFO.institution)
            .then((res) => {
                expect(res.status).toBe(HTTP_STATUS_UNAUTHORIZED)
            })
    })

    test("Expected anauthorized error", async () => {
        await request(app).post('/institutions')
            .set('x-access-token', TEST_INFO.testerUser.token)
            .send(TEST_INFO.institution)
            .then((res) => {
                expect(res.status).toBe(HTTP_STATUS_UNAUTHORIZED)
            })
    })
})
