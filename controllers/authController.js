const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const { generateToken } = require('../config/jwt');

/**
* Creates/Registers User
* @param {username} string Username of the User
* @param {email} string email of the User
* @param {phone} string Phone of the User
* @param {password} String Password of the User
*/
exports.register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email ou nom d\'utilisateur déjà utilisé' });
    }

    const user = new User({ username, email, password, phone });
    await user.save();

    const token = generateToken(user);

    return res.status(201).json({ 
      message: 'Compte créé avec succès',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/** 
* Signing Users with Providing teh JWT Token
* @param {email} string Email of the User
* @param {password} String Password of the User
*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/** 
* LogOut Users
*/
exports.logout = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Non autorisé. Aucun token fourni.' });
  }
  // Réponse de déconnexion réussie
  return res.status(200).json({ message: 'Déconnexion réussie.' });
}