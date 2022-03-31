const nodemailer = require('nodemailer');
const cron = require('node-cron');
const EmailCollection = require('../model/email');
const SenderCollection = require('../model/sender');
const ReceiverCollection = require('../model/receiver');
const mailSender = {
    // 메일발송 함수
    sendGmail: async function (param) {
        const senderEmail = await SenderCollection.findOne(
            {},
            { _id: false, createdDate: false, modifiedDate: false, schemaVersion: false }
        );
        console.log(senderEmail, 'chchchchc');
        var transporter = nodemailer.createTransport({
            service: 'gmail', // 메일 보내는 곳
            prot: 587,
            host: 'smtp.gmail.com',
            secure: false,
            requireTLS: true,

            auth: {
                user: senderEmail.adminEmail, // 보내는 메일의 주소
                pass: senderEmail.adminPassword, // 보내는 메일의 비밀번호
            },
        });
        // 메일 옵션
        var mailOptions = {
            from: senderEmail.adminEmail, // 보내는 메일의 주소
            to: param.toEmail, // 수신할 이메일
            subject: param.subject, // 메일 제목
            text: param.text, // 메일 내용
        };

        // 메일 발송
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
};

module.exports = {
    Post_Mail_Content: async (request, reply) => {
        try {
            console.log(1);
            const { subject, content } = request.body;
            console.log(subject, content);
            const emailContent = await EmailCollection.create({ subject: subject, content: content });
            return await reply.code(200).send({
                success: true,
                result: emailContent,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },
    Get_Mail_Content: async (request, reply) => {
        try {
            const emailContent = EmailCollection.findMany({ isActivated: true });
            return await reply.code(200).send({
                success: true,
                receiverList: emailContent,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },
    Patch_Mail_Content: async (request, reply) => {
        try {
            const id = request.query.id;
            const { subject, content } = request.body;

            const updateEmailContent = await EmailCollection.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        subject: subject,
                        content: content,
                    },
                    $currentDate: { modifiedDate: true },
                },
                { new: true, select: { createdTime: false, schemaVersion: false, _id: false, __v: false, schemaVersion: false } }
            );
            return await reply.code(200).send({
                success: true,
                result: updateEmailContent,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },

    Delete_Mail_Content: async (request, reply) => {
        try {
            const id = request.query.id;
            let deleteResult = null;
            const targetFound = await EmailCollection.find({ _id: id });
            if (targetFound) {
                deleteResult = await EmailCollection.deleteOne({ _id: id });
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

    Send_Mail: async (request, reply) => {
        try {
            console.log(1);
            const contentId = request.query.id;

            const mailContent = await EmailCollection.find(
                { _id: contentId },
                { _id: false, schemaVersion: false, createdDate: false, modifiedDate: false, __v: false }
            );
            const receiverList = await ReceiverCollection.find(
                { isActivated: true },
                { _id: false, schemaVersion: false, createdDate: false, modifiedDate: false, __v: false, isActivated: false, name: false }
            );

            console.log(mailContent, 'mailcontent');
            console.log(receiverList, 'receiverList');

            let emailParam = null;
            receiverList.forEach(el => {
                console.log(el);
                emailParam = {
                    toEmail: el.receiverEmail,
                    subject: mailContent.subject,
                    text: mailContent.content,
                };
            });
            cron.schedule('*/1 * * * *', () => {
                mailSender.sendGmail(emailParam);
                console.log('alert!');
            });

            return await reply.code(200).send({
                success: true,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                message: err.message,
            });
        }
    },
};
