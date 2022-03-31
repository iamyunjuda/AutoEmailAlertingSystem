const fastify = require('fastify');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
    dotenv.config({
        path: 'config/.env.development.local',
    });
    dotenv.config({
        path: 'config/.env.development',
    });
}
function build(opts = {}) {
    const app = fastify(opts);
    async function subsystem(fastify, opts) {
        await fastify.register(require('middie'));
        fastify.use(require('cors', 'mongoose')());
    }
    app.register(require('fastify-cors'));

    //handle root route
    app.get('/', (request, reply) => {
        try {
            reply.send('Hello world!, homepage backOffice server');
        } catch (e) {
            console.error(e);
        }
    });

    // app.register(require('./app/routes/route.serverManagement.js'), {
    //     prefix: '/api',
    // });
    app.register(require('./app/router/practice'), {
        prefix: '/api',
    });
    app.register(require('./app/router/routeReceiver'), {
        prefix: '/api',
    });
    app.register(require('./app/router/routeSender'), {
        prefix: '/api',
    });
    app.register(require('./app/router/routeEmail'), {
        prefix: '/api',
    });
    return app;
}

module.exports = build;
