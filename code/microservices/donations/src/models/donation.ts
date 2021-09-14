import mongoose from 'mongoose';

// required properties of a donation (TS type checking)
interface DonationAttributes {
    institutionName: string;
    description: string;
    userId: string;
    value: number;
}

// properties of a donation model (collection)
interface DonationModel extends mongoose.Model<DonationDocument> {
    build(attrs: DonationAttributes): DonationDocument;
}

// properties of a donation document
interface DonationDocument extends mongoose.Document {
    institutionName: string;
    description: string;
    userId: string;
    value: number;
}

const donationSchema = new mongoose.Schema({
    institutionName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
        versionKey: false
    }
});

donationSchema.statics.build = (attrs: DonationAttributes) => {
    return new Donation(attrs);
}

const Donation = mongoose.model<DonationDocument, DonationModel>('Donation', donationSchema);

export { Donation };