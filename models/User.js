const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
* simple Schema For Storing User Details
* @param {username} String Username of the user
* @param {email} string Email of the user
* @param {phone} string Phone of the user
* @param {password} string Password of the user
* Default Created at variable to Stored Time Details
*/

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

/**
* Compare passwords
*/
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
* Hash password before saving
*/
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User',userSchema);