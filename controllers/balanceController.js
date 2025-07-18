const User = require('../models/User');

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('balance');
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};