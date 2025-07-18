require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Configuration de la connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/true_number_db', {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 20000
}).catch(err => {
  console.error('Impossible de se connecter à MongoDB :', err.message);
  process.exit(1);
});

const createAdmin = async () => {
  try {
    // const existingAdmin = await User.findOne({ email: 'admin@highreference.com' });
    // if (existingAdmin) {
    //   console.log('Le compte admin existe déjà');
    //   return process.exit(0);
    // }

    // Créer le nouvel admin
    const admin = new User({
      username: 'admin1',
      email: 'admin1@highreference.com',
      password: 'Administrateur1234',
      phone: '+237658682587',
      role: 'admin',
      balance: 0
    });

    await admin.save();
    console.log('✅ Compte admin créé avec succès !');
    console.log('-----------------------------');
    console.log('Email: admin@highreference.com');
    console.log('Mot de passe: Admin1234');
    console.log('-----------------------------');
    
  } catch (error) {
    console.error('❌ Erreur critique :', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Démarrer le processus
createAdmin();