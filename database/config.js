const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } );

        console.log('Connection successful');
    } catch (error) {
        console.log(error);
        throw new Error('Error init')
    }
}

module.exports = {
    dbConnection
}