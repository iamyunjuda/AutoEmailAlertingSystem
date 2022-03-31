const fastify = require('fastify');
const senderManagement = require('../controller/senderManagement');

module.exports = function (fastifyApp, opts, done) {
    fastifyApp.post('/post-sender', senderManagement.Post_Sender);
    fastifyApp.get('/get-sender', senderManagement.Get_Sender);
    fastifyApp.patch('/patch-sender', senderManagement.Patch_Sender);
    fastifyApp.delete('/delete-sender', senderManagement.Delete_Sender);

    done();
};
