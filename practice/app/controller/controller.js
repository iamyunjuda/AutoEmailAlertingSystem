// const nodemailer = require('nodemailer');
// const cron = require('node-cron');
// const senderInfo = {
//     user: 'tpffl0420@gmail.com',
//     pass: 'mlfyvqnsvbbfhqox',
// };

// const mailSender = {
//     // 메일발송 함수
//     sendGmail: async function (param) {
//         console.log('check', params);
//         const mailOptions = {
//             from: senderInfo.user, // 보내는 메일의 주소
//             to: param.toEmail, // 수신할 이메일
//             subject: param.subject, // 메일 제목
//             text: param.text, // 메일 내용
//         };
//         const transporter = await nodemailer.createTransport({
//             service: 'gmail', // 메일 보내는 곳
//             prot: 587,
//             host: 'smtp.gmail.com',
//             secure: false,
//             requireTLS: true,
//             auth: {
//                 user: senderInfo.user, // 보내는 메일의 주소
//                 pass: senderInfo.pass, // 보내는 메일의 비밀번호
//             },
//         });
//         // 메일 옵션

//         // 메일 발송
//         await transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//     },
// };

// module.exports = {
//     Send_Mail: async (request, reply) => {
//         try {
//             console.log(1);
//             const { email } = request.query;
//             console.log(email);
//             let emailParam = {
//                 toEmail: email,
//                 subject: 'HELLO WORLD',
//                 text: '메일을 송신합니다.',
//             };

//             cron.schedule('10 * * * * *', () => {
//                 mailSender.sendGmail(emailParam);
//                 console.log('alert!');
//             });

//             return await reply.code(200).send({
//                 success: true,
//             });
//         } catch (err) {
//             return await reply.code(500).send({
//                 success: false,
//                 message: err.message,
//             });
//         }
//     },
// };
