const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Service Authencafication',
            version: '1.0.0',
            description: 'API Documentation',
        },
    },
    apis: ['app.js', 'routes/*.js'], 
    tags: [
       {name: 'Authentication',description: 'API operations related to authentication users'},
    ],
};

module.exports = swaggerOptions;