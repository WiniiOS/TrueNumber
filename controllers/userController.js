const User = require('../models/User');


exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { role, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...updateData, ...(role && { role }) },
      { new: true }
    ).select('-password');
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};