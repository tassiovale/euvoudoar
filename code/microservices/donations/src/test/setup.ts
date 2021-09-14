import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'teste';

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signin = () => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    // create JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build a session object
    const session = { jwt: token };

    // Serialize to json string
    const sessionJSON = JSON.stringify(session);

    // Base64 encoding
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // Return cookie string
    return [`express:sess=${base64}`];
};