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

const ReceiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    receiverEmail: {
        type: String,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: true,
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

module.exports = CloudDB.model('Receiver', ReceiverSchema);
