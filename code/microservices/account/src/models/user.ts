import mongoose from 'mongoose';
import { Password } from '../services/password';

// required properties of a user (TS type checking)
interface UserAttributes {
    email: string;
    password: string;
}

// properties of a user model (collection)
interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttributes): UserDocument;
}

// properties of a user document
interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(
            this.get('password')
        );
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
    return new User(attrs);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };