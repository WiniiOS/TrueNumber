module.exports = {
  port: process.env.PORT || 3000,
  mongoose: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-service',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  cors: {
    origins: process.env.CORS_ORIGINS || 'http://localhost:3000'
  }
};