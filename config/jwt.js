const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

  jwtSecret: process.env.JWT_SECRET || 'default_secret_for_dev_truenumber2025',  
  jwtExpiresIn: '24h', 
  /**
   * Génère un token JWT pour l'utilisateur
   * @param {Object} user - Doit contenir _id et role (client/admin)
   * @returns {String} Token JWT signé
   */
  generateToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  },
  /**
   * Vérifie un token JWT
   * @param {String} token 
   * @returns {Object|null} Payload décodé ou null si invalide
   */
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('[TRUE NUMBER] JWT Error:', err.message);
      return null;
    }
  }
};