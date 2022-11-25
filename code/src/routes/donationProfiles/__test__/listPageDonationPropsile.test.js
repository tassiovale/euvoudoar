import request from 'supertest'
import { cnpj, gera_random, randomWord } from '../../../helpers/utils'

import { app } from '../../../../app.js'
import { getDatabaseClientInstance } from '../../../db/clientInstance.js'
import { createInstitution } from '../../../db/institution'
import { createDonationProfile, updateDonationProfile } from "../../..//db/donationProfile.js";
let userAuth = null
let userAuth_2 = null
let intitutionId = null

beforeEach(async () => {
    const resCreateUser = await request(app).post('/users').send({
        name: "Tester User Admin",
        email: randomWord(10) + "@mail.com",
        role: "ADMIN",
        password: "senha"
    })
    const resCreateUser_2 = await request(app).post('/users').send({
        name: "Tester User Admin 2",
        email: randomWord(10) + "@mail.com",
        role: "ADMIN",
        password: "senha"
    })
    userAuth = resCreateUser.body
    userAuth_2 = resCreateUser_2.body
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

        const donationProfile_1 = await createDonationProfile({
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
        const donationProfile_2 = await createDonationProfile({
            name: "Contribuição mensal",
            institution: {
                connect: { id: intitutionId },
            },
            recurrence: "WEEKLY",
            recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
            createdBy: {
                connect: { id: userAuth_2.id },
            },
            updatedBy: {
                connect: { id: userAuth_2.id },
            },
        });

        // Se alguém souber de alguma forma que faça o prisma aceitar fazer a paginação com o metodo GET mim avise
        const donationProfilesRequest = await request(app).post(`/institutions/${intitutionId}/donation_profiles/page/?page=1&limit=1&keyword=XPTO`).set('x-access-token', userAuth.token)

        expect(JSON.parse(donationProfilesRequest.text).length).toBe(1)




    })

})

