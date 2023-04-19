const mongoose = require('mongoose');

const databaseConnection = async () => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB successfully connected');

    } catch (error) {
        console.error('Error connection DB', error);
        throw new Error('Error in db connection');
    }

}

module.exports = {
    databaseConnection
};