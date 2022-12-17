import request from 'supertest'
import {cnpj, gera_random, randomWord} from '../../../helpers/utils'
import { ADMIN } from '../../../constants/roles'
import { app } from '../../../../app.js'
import { getDatabaseClientInstance } from '../../../db/clientInstance.js'
import { createInstitution } from '../../../db/institution'

let userAuth = null
let intitutionId = null

beforeEach(async() => {
    const resCreateUser = await request(app).post('/users').send({
        name: "Tester User Admin",
        email: randomWord(10)+"@mail.com",
        role: ADMIN,
        password: "senha"
    })
    userAuth = resCreateUser.body
})

afterEach(async () => {
    const databaseClientInstance = getDatabaseClientInstance()
    

    await databaseClientInstance.institution.delete({
        where:{
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
                connect: {id:userAuth.id}
            },
            updatedBy: {
                connect: {id:userAuth.id}
            }
        })

        intitutionId = instituion.id


        const exampleDonationProfile = {
            "name": "Contribuição mensal",
            "institutionId": "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
            "recurrence": "WEEKLY",
            "recurrenceExpirationDate": "2022-11-28 14:32:00"
        }

        const donationProfilesRequest = await request(app).post(`/institutions/${instituion.id}/donation_profiles`)
                                                        .set('x-access-token', userAuth.token)
                                                        .send(exampleDonationProfile)

        
        expect(donationProfilesRequest.id).not.toBeNull()

        

    })  

})
