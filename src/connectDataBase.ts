export function connectDatabase() {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/event-graphql-db', {autoIndex: true});
    mongoose.connection.on('error', (err: any) => {
        console.log(err);
    });
    mongoose.connection.once('open', () => {
        console.log('Connected to mongodb');
    });
}