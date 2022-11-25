import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

const createDonationProfile = async (donationProfile) => {
    return databaseClientInstance.donationProfile.create(
        {
            data: donationProfile
        }
    )
}

const updateDonationProfile = async (donationProfile, donationProfilesId) => {

    return await databaseClientInstance.donationProfile.update(
        {
            where: {
                id: donationProfilesId
            },
            data: donationProfile,

        }
    )
}

const findDonationProfileById = async (donationProfilesId) => {

    return await databaseClientInstance.donationProfile.findUnique(
        {
            where: {
                id: donationProfilesId
            }
        }
    )
}

const findDonationProfilePages = async (page, limit) => {

    return await databaseClientInstance.donationProfile.findMany({

        skip: Number(page),
        take: Number(limit),

    })
}

export {
    createDonationProfile,
    updateDonationProfile,
    findDonationProfileById,
    findDonationProfilePages
}