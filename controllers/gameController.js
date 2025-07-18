const User = require("../models/User");
const Game = require("../models/Game");
const { body, validationResult } = require('express-validator');

/**
* Play Game
*/
exports.playGame = async (req, res) => {
  try {
    const userId = req.user.id;
    const generatedNumber = Math.floor(Math.random() * 101); // 0-100
    
    let result, balanceChange;
    if (generatedNumber > 70) {
      result = 'gagné';
      balanceChange = 50;
    } else {
      result = 'perdu';
      balanceChange = -35;
    }

    // Mise à jour du solde utilisateur
    const user = await User.findById(userId);
    const newBalance = user.balance + balanceChange;
    user.balance = newBalance;
    await user.save();

    // Enregistrement de la partie
    const game = new Game({
      user: userId,
      generatedNumber,
      result,
      balanceChange,
      newBalance
    });
    await game.save();

    return res.json({
      result,
      generatedNumber,
      newBalance
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
* Recuperer l'historique de jeu de l'utilisateur Connecté
*/
exports.getUserHistory = async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id }).sort('-date');
    return res.status(200).json(games);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
* Recuperer l'historique de jeu de tous les utilisateurs
*/
exports.getAllHistory = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    
    const games = await Game.find().sort('-date').populate('user', 'username');
    return res.json(games);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};