const controller = require('../controller/receiverManagement');

module.exports = function (fastifyApp, opts, done) {
    fastifyApp.get('/get-receiver', controller.Get_Receiver);
    fastifyApp.post('/post-receiver', controller.Post_Receiver);
    //     fastifyApp.patch('/patch-contact', contactManagement.Patch_contact);
    //     fastifyApp.delete('/delete-contact', contactManagement.Delete_contact);
    //      //fastifyApp.put('/put-contact', contactManagement.Put_contact);
    done();
};
