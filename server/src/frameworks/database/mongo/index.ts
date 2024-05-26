import mongoose from 'mongoose';
import schemas from './schemas';

const connect = (): void => {
    const dbConnStr: string = process.env.DB_CONNECTION_STRING as string;

    mongoose.connect(dbConnStr).catch(error => console.error('Connection to mongo has failed.', error));

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection to mongo has failed.'));
    db.once('open', () => {
        console.log('Successfully connected to mongo db cluster');
    });
};

export { connect, schemas };
