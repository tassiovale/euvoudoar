import request from 'supertest'
import { cnpj, gera_random, randomWord } from '../../../helpers/utils'

import { app } from '../../../../app.js'
import { getDatabaseClientInstance } from '../../../db/clientInstance.js'
import { createInstitution } from '../../../db/institution'
import { createDonationProfile, updateDonationProfile } from "../../../db/donationProfile.js";
import {getTesterUser} from "../../../__test__/setup.tester.js"
import { ADMIN } from '../../../constants/roles'

let userAuth = null
let userAuth_2 = null
let intitutionId = null

beforeEach(async () => {
    userAuth = await getTesterUser({
        name: "Tester User Admin",
        email: "testerAdmin1@mail.com",
        role: ADMIN,
        password: "senha"
    })
    userAuth_2 = await getTesterUser({
        name: "Tester User Admin 2",
        email: "testerAdmin2@mail.com",
        role: ADMIN,
        password: "senha"
    })
})

afterEach(async () => {
    const databaseClientInstance = getDatabaseClientInstance()

    await databaseClientInstance.institution.delete({
        where: {
            id: intitutionId
        }
    })

    await databaseClientInstance.user.delete({
        where: {
            id: userAuth.id,
        }
    })
    await databaseClientInstance.user.delete({
        where: {
            id: userAuth_2.id,
        }
    })
});

describe("Donation Profiles", () => {


    test("Should create donation profile.", async () => {
        const exampleInstitution = {
            "name": "XPTO",
            "cnpj": randomWord(10),
            "paymentGateway": {
                "type": "pagarme",
                "apiKey": "fkldsy879ey087yfg908stfb089760r976b0v"
            },
            "description": "Descrição da instituição...",
            images: [{
                url: "localhost"
            }]
        }

        const instituion = await createInstitution({
            ...exampleInstitution,
            paymentGateway: {
                create: exampleInstitution.paymentGateway
            },
            images: {
                create: exampleInstitution.images
            },
            createdBy: {
                connect: { id: userAuth.id }
            },
            updatedBy: {
                connect: { id: userAuth.id }
            }
        })

        intitutionId = instituion.id


        const exampleDonationProfile = {
            "name": "Contribuição mensal",
            "institutionId": "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
            "recurrence": "WEEKLY",
            "recurrenceExpirationDate": "2022-11-28 14:32:00"
        }

        const perfil_1 = await createDonationProfile({
            name: "Contribuição mensal",
            institution: {
                connect: { id: intitutionId },
            },
            recurrence: "WEEKLY",
            recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
            createdBy: {
                connect: { id: userAuth.id },
            },
            updatedBy: {
                connect: { id: userAuth.id },
            },
        });

        const perfil_2 = await createDonationProfile({
            name: "Contribuição mensal",
            institution: {
                connect: { id: intitutionId },
            },
            recurrence: "WEEKLY",
            recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
            createdBy: {
                connect: { id: userAuth.id },
            },
            updatedBy: {
                connect: { id: userAuth.id },
            },
        });



        const exampleDonationProfile_2 = {
            "name": "Contribuição mensal",
            "institutionId": "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
            "recurrence": "WEEKLY",
            "recurrenceExpirationDate": "2022-11-28 14:32:00"
        }

        await request(app).post(`/institutions/${instituion.id}/donation_profiles`)
            .set('x-access-token', userAuth.token)
            .send(exampleDonationProfile_2)

        await request(app).post(`/institutions/${instituion.id}/donation_profiles`)
            .set('x-access-token', userAuth.token)
            .send(exampleDonationProfile_2)


        const donationProfilesRequest = await request(app).get(`/institutions/${intitutionId}/donation_profiles/?page=1&limit=2&keyword=Contribuição mensal`).set('x-access-token', userAuth.token)

        expect(JSON.parse(donationProfilesRequest.text).length).toBe(2)



    })
    test("Should donation profile, not exist.", async () => {
        const exampleInstitution = {
            "name": "XPTO",
            "cnpj": randomWord(10),
            "paymentGateway": {
                "type": "pagarme",
                "apiKey": "fkldsy879ey087yfg908stfb089760r976b0v"
            },
            "description": "Descrição da instituição...",
            images: [{
                url: "localhost"
            }]
        }

        const instituion = await createInstitution({
            ...exampleInstitution,
            paymentGateway: {
                create: exampleInstitution.paymentGateway
            },
            images: {
                create: exampleInstitution.images
            },
            createdBy: {
                connect: { id: userAuth.id }
            },
            updatedBy: {
                connect: { id: userAuth.id }
            }
        })

        intitutionId = instituion.id


        const exampleDonationProfile = {
            "name": "Contribuição mensal",
            "institutionId": "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
            "recurrence": "WEEKLY",
            "recurrenceExpirationDate": "2022-11-28 14:32:00"
        }

        const perfil_1 = await createDonationProfile({
            name: "Contribuição mensal",
            institution: {
                connect: { id: intitutionId },
            },
            recurrence: "WEEKLY",
            recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
            createdBy: {
                connect: { id: userAuth.id },
            },
            updatedBy: {
                connect: { id: userAuth.id },
            },
        });

        const perfil_2 = await createDonationProfile({
            name: "Contribuição mensal",
            institution: {
                connect: { id: intitutionId },
            },
            recurrence: "WEEKLY",
            recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
            createdBy: {
                connect: { id: userAuth.id },
            },
            updatedBy: {
                connect: { id: userAuth.id },
            },
        });



        const exampleDonationProfile_2 = {
            "name": "Contribuição mensal",
            "institutionId": "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
            "recurrence": "WEEKLY",
            "recurrenceExpirationDate": "2022-11-28 14:32:00"
        }

        await request(app).post(`/institutions/${instituion.id}/donation_profiles`)
            .set('x-access-token', userAuth.token)
            .send(exampleDonationProfile_2)

        await request(app).post(`/institutions/${instituion.id}/donation_profiles`)
            .set('x-access-token', userAuth.token)
            .send(exampleDonationProfile_2)


        const donationProfilesRequest = await request(app).get(`/institutions/${intitutionId}/donation_profiles/?page=1&limit=2&keyword=Contribuição diario`).set('x-access-token', userAuth.token)

        expect(JSON.parse(donationProfilesRequest.text).length).toBe(0)



    })

})

