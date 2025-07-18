require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');

const swaggerOptions = require('./swaggerOptions');

const app = express();

// Configuration CORS basique
app.use(cors({
  origin: config.cors.origins
}));

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/game', gameRoutes);
app.use('/api/v1/users', userRoutes);


// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// Connexion MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    startServer();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

function startServer() {
  const PORT = config.port || 3000;
  const server = app.listen(PORT, () => {
    console.log(`Authentication Service running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API Documentation: http://localhost:${PORT}/api/v1/api-docs`);
  });
  
  // Gestion des arrêts gracieux
  // Signal Système envoyé à un processus pour lui demander de s'arrêter proprement 
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('Process terminated');
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    });
  });
}

module.exports = app;