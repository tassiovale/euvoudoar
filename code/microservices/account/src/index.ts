import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    try {
        await mongoose.connect('mongodb://account-mongo-srv:27017/account', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Successfully connected to MongoDB!');
    } catch(err) {
        console.error(err);
    }

    app.listen(3000, () =>{
        console.log('Server listening on 3000!');
    });
};

start();