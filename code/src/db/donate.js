import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()
const defaultPageSize = parseInt(process.env.DEFAULT_PAGE_SIZE)
const defaultPageNumber = parseInt(process.env.DEFAULT_PAGE_NUMBER)

const createDonate = async (donate) => {
    const createdDonate = await databaseClientInstance.donate.create(
        {
            data: donate
        }
    )
    return createdDonate
}

const searchPagedDonations = async (where) => {
    //console.log('where.data: '+where.data)
    const { keyword } = where
    //console.log('keyword: '+keyword)
    const { page, limit } = where
    const take = parseInt(limit) || defaultPageSize
    const skip = parseInt(page || defaultPageNumber) * take

    const donor = await databaseClientInstance.user.findMany({
        where: {
            name: keyword
        }
    })

    const institution = await databaseClientInstance.institution.findMany({
        where: {
            name: keyword
        }
    })

    console.log(institution)
    console.log(donor)

    const donorIds = donor.map((donor)=>{
        return donor.id
    })

    const institutionIds = institution.map((institution)=>{
        return institution.id
    })

    console.log('donorIds: ' + donorIds)
    console.log('institutionIds: ' + institutionIds)

    console.log('donor.id: ' + donor.id)
    console.log('institution.id: ' + institution.id)

    const donations = await databaseClientInstance.donate.findMany(
        { 
            where: {
                OR: [
                  { donorId: {in: donorIds}  },
                  { institutionId: {in: institutionIds} },
                ]
            },
            skip,
            take
        }
    )
    return donations
}

const findDonateById = async (id) => {
    return databaseClientInstance.donate.findUnique({
        where: { id }
    })
}

const deleteDonate = async(id) => {
    const deletedDonate = await databaseClientInstance.donate.delete({
        where: {
            id: id
        }
    })
    return deletedDonate
}

export { 
    createDonate,
    searchPagedDonations,
    findDonateById,
    deleteDonate
}