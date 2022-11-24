import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

const createDonationProfile = async (donationProfile) => {
    return databaseClientInstance.donationProfile.create(
        {
            data: donationProfile
        }
    )
}


export {
    createDonationProfile
}