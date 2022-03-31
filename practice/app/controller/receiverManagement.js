const nodemailer = require('nodemailer');
const cron = require('node-cron');
const ReceiverCollection = require('../model/receiver');

const senderInfo = {
    user: 'tpffl0420@gmail.com',
    pass: 'mlfyvqnsvbbfhqox',
};

const mailSender = {
    // 메일발송 함수
    sendGmail: function (param) {
        var transporter = nodemailer.createTransport({
            service: 'gmail', // 메일 보내는 곳
            prot: 587,
            host: 'smtp.gmail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: senderInfo.user, // 보내는 메일의 주소
                pass: senderInfo.pass, // 보내는 메일의 비밀번호
            },
        });
        // 메일 옵션
        var mailOptions = {
            from: senderInfo.user, // 보내는 메일의 주소
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
    Get_Receiver: async (request, reply) => {
        try {
            //모든 등록된 고객 불러오기
            const receiver = ReceiverCollection.findMany({ isActivated: true });
            return await reply.code(200).send({
                success: true,
                receiverList: receiver,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },
    Post_Receiver: async (request, reply) => {
        //이메일 등록하기
        try {
            const { name, email } = request.body;
            console.log(name, email);
            const emailFound = await ReceiverCollection.find({ email: email });
            if (emailFound) {
                return await reply.code(400).send({
                    success: false,
                    message: 'email already exist!',
                });
            }
            const result = await ReceiverCollection.create(
                { name: name, receiverEmail: email },
                { _id: false, createdDate: false, modifiedDate: false, schemaVersion: false }
            );
            return await reply.code(200).send({
                success: true,
                result: result,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },
    Patch_Receiver: async (request, reply) => {
        //회원 이메일 또는 이름 수정 또는 활성화 상태 수정
        try {
            const id = request.query.id;
            const { name, email, isActivated } = request.body;
            const updateEmailInfo = await ReceiverCollection.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        name: name,
                        email: email,
                        isActivated: isActivated,
                    },
                    $currentDate: { modifiedDate: true },
                },
                { new: true, select: { createdTime: false, schemaVersion: false, _id: false, __v: false, schemaVersion: false } }
            ).exec();
            return await reply.code(200).send({
                success: true,
                result: updateEmailInfo,
            });
        } catch (err) {
            return await reply.code(500).send({
                success: false,
                err,
            });
        }
    },

    Delete_Receiver: async (request, reply) => {
        try {
            const id = request.query.id;
            let deleteResult = null;
            const targetFound = await ReceiverCollection.find({ _id: id });
            if (targetFound) {
                deleteResult = await ReceiverCollection.deleteOne({ _id: id });
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
