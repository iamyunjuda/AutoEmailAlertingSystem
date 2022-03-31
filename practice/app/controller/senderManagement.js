// Load models
const SenderCollection = require('../model/sender');

module.exports = {
    Post_Sender: async function (request, reply) {
        try {
            const { adminEmail, adminPassword } = request.body;
            const emailFound = await SenderCollection.find({ adminEmail: adminEmail });
            console.log(emailFound);
            if (emailFound.length) {
                return await reply.code(200).send({
                    success: true,
                    result: 'Email Already Exist',
                });
            }
            const sender = await SenderCollection.create({ adminEmail: adminEmail, adminPassword: adminPassword });
            return await reply.code(200).send({
                success: true,
                result: sender,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                message: err,
            });
        }
    },
    Get_Sender: async function (request, reply) {
        try {
            const senderResult = await SenderCollection.find(
                {},
                { _id: false, createdDate: false, modifiedDate: false, schemaVersion: false }
            );
            return await reply.code(200).send({
                success: true,
                result: senderResult,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: true,
                err,
            });
        }
    },

    Patch_Sender: async function (request, reply) {
        try {
            const id = request.query.id;
            const { adminEmail, adminPassword } = request.body;
            const updateSenderInfo = await SenderCollection.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        adminEmail: adminEmail,
                        adminPassword: adminPassword,
                    },
                    $currentDate: { modifiedDate: true },
                },
                { new: true, select: { createdTime: false, schemaVersion: false, _id: false, __v: false, schemaVersion: false } }
            ).exec();
            return await reply.code(200).send({
                success: true,
                result: updateSenderInfo,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },

    Delete_Sender: async function (request, reply) {
        try {
            const id = request.query.id;
            let deleteResult = null;
            const targetFound = await SenderCollection.find({ _id: id });
            if (targetFound) {
                deleteResult = await SenderCollection.deleteOne({ _id: id });
            } else {
                return await reply.code(201).send({
                    success: true,
                    message: 'id does not exist',
                });
            }
            return await reply.code(200).send({
                success: true,
                result: deleteResult,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },
};
