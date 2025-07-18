const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Auth Service'
  },
  host: 'localhost:3000',
  schemes: ['http'], // Change à 'https' si ton API utilise HTTPS
  definitions: {
    User: {
      id: '1',
      email: 'example@example.com',
      phone: '+237658682586',
      password: 'password123',
    },
  },
  basePath: '/api/v1',
};


const outputFile = './assets/swagger-output.json'; // Chemin vers le fichier de sortie
const endpointsFiles = ['./routes/authRoutes.js','./routes/userRoutes.js']; // Chemin vers ton fichier de routes principal

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./index.js'); // Lance le serveur après la génération
});