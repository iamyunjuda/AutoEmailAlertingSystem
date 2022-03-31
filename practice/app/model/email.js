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

const EmailSchema = new mongoose.Schema({
    subject: {
        type: String,
        //required: true,
    },
    content: {
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

module.exports = CloudDB.model('Email', EmailSchema);
