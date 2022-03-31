const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let CloudDB = null;
try {
    CloudDB = mongoose.createConnection('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (err) {
    console.log(err);
}

const SenderSchema = new mongoose.Schema({
    adminEmail: {
        type: String,
        //  required: true,
    },
    adminPassword: {
        type: String,
        // required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },
    modifiedDate: {
        type: Date,
        default: Date.now,
    },
    schemaVersion: {
        type: String,
        default: '1',
    },
});

module.exports = CloudDB.model('Sender', SenderSchema);
