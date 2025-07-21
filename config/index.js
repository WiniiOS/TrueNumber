module.exports = {
  port: process.env.PORT || 3000,
  mongoose: {
    url: process.env.MONGODB_URI,
    // url: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-service',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  cors: {
    origins: ['http://localhost:3001', 'http://localhost:3000','https://jeu-true-number.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
};