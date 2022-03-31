const controller = require('../controller/emailContentManagement');

module.exports = function (fastifyApp, opts, done) {
    fastifyApp.get('/get-mail-content', controller.Get_Mail_Content);
    fastifyApp.post('/post-mail-content', controller.Post_Mail_Content);
    fastifyApp.patch('/patch-mail-content', controller.Patch_Mail_Content);
    fastifyApp.delete('/delete-mail-content', controller.Delete_Mail_Content);
    fastifyApp.post('/send-mail', controller.Send_Mail);
    done();
};
