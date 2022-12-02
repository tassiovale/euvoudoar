import { PrismaClient } from '@prisma/client'
import { createInstitution } from '../src/db/institution.js'
const prisma = new PrismaClient()

let userTest = null
let userTestAdmin = null
let institutionTest1 = null
let institutionTest2 = null
let donate1 = null
let donate2 = null

async function main() {
    await createUsers().then( async () => {
        await createInstitutions().then( async () => {
            await createDonates()
        })
    })
        
}


async function createUsers() {
    userTest = await prisma.user.upsert({
        where: { email: 'userTest@gmail.com' },
        update: {},
        create: { 
            name: 'userTest',
            email: 'userTest@gmail.com',
            role: undefined
            
        }
    })
    userTestAdmin = await prisma.user.upsert({
        where: { email: 'userTest@gmail.com' },
        update: {},
        create: {
            name: 'userTestAdmin',
            email: 'userTestAdmin@gmail.com',
            role: 'Admin'
        }
    })
}

async function createInstitutions() {
    institutionTest1 = await prisma.institution.upsert({
        where: { cnpj: "61.394.099/0001-01" },
        update: {},
        create: {
           name: "InstitutoX",
                cnpj: "61.394.099/0001-01",
                paymentGateway: {
                    create: {
                        type: "pagarme",
                        apiKey: "fkldsy879ey087yfg908stfb089760r976b0v"
                    }
                },
                description: "teste",
                images: {
                    create: [{
                        url:"https://resultadosdigitais.com.br/wp-content/blogs.dir/8/files/2019/03/tela-principal-do-google-images-720x322.png"
                    }]
                },
                createdBy: {
                    connect: { id: userTestAdmin.id }
                },
                updatedBy: {
                    connect: { id: userTestAdmin.id }
                }
        }
    })
}

async function createDonates() {
    donate2 = await prisma.donate.upsert({
        where: {id:'1'},
        update: {},
        create: { 
            institutionId: institutionTest1.id,
                donorId: userTest.id,
                recurrence: 'WEEKLY',
                recurrenceExpirationDate: null,
                value: 30,
                createdBy: userTest.id,
                updatedBy: userTest.id
            }
    })
}
main()
  .then(async () => {
    console.log(userTest,userTestAdmin,institutionTest1,institutionTest2,donate1,donate2)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })