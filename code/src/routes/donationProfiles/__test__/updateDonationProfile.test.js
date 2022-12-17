import request from 'supertest'
import { randomWord } from '../../../helpers/utils'
import { createDonationProfile, } from "../../../db/donationProfile.js";
import { app } from '../../../../app.js'
import { getDatabaseClientInstance } from '../../../db/clientInstance.js'
import { createInstitution } from '../../../db/institution'
import { ADMIN } from '../../../constants/roles';

let userAuth = null
let intitutionId = null

beforeEach(async () => {
    const resCreateUser = await request(app).post('/users').send({
        name: "Tester User Admin",
        email: randomWord(10) + "@mail.com",
        role: ADMIN,
        password: "senha"
    })
    userAuth = resCreateUser.body


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
});

describe("Donation Profiles", () => {


    test("Should update donation profile.", async () => {
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
            "name": "Contribuição Diaria",
            "institutionId": "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
            "recurrence": "WEEKLY",
            "recurrenceExpirationDate": new Date("2022-11-28 14:32:00")
        }

        const donationProfile = await createDonationProfile({
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

        const expectData = {
            id: donationProfile.id,
            name: exampleDonationProfile.name,
            recurrence: exampleDonationProfile.recurrence,
            recurrenceExpirationDate: "2022-11-28 14:32:00",
            institutionId: instituion.id,
            createdAt: donationProfile.createdAt,
            updatedAt: new Date(),
            deletedAt: null,
            creatorId: userAuth.id,
            updaterId: userAuth.id,
            deleterId: null
        }

        const donationProfilesRequest = await request(app).put(`/institutions/${instituion.id}/donation_profiles/${donationProfile.id}`)
            .set('x-access-token', userAuth.token)
            .send(exampleDonationProfile)


        expect(JSON.parse(donationProfilesRequest.text).name).toEqual(expectData.name)
        expect(JSON.parse(donationProfilesRequest.text).recurrence).toEqual(expectData.recurrence)





    })

})
