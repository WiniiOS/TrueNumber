const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');
const User = require('../models/User');
const { verifyToken } = require('../config/jwt');


exports.isAuthenticated = async (req, res, next) => {
  try {
    // Vérification du token dans les headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ 
        message: 'Session invalide. Veuillez vous reconnecter.'
        });
    }

    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
  }
  next();
};