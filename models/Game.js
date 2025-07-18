const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  generatedNumber: { type: Number, required: true },
  result: { type: String, enum: ['gagné', 'perdu'], required: true },
  balanceChange: { type: Number, required: true },
  newBalance: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);