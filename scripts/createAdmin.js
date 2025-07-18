require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

// Connexion MongoDB simplifiée (sans options dépréciées)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/true_number_db')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => {
    console.error('Erreur MongoDB:', err.message);
    process.exit(1);
  });

const createAdmin = async () => {
  const adminData = {
    username: 'admin_' + Math.random().toString(36).substring(2, 6), // Nom unique
    email: 'admin@highreference.com',
    password: 'Admin1234',
    phone: '+237658682586',
    role: 'admin',
    balance: 1000
  };

  try {
    // Suppression d'éventuels admins existants
    await User.deleteMany({ email: adminData.email });
    
    const admin = new User(adminData);
    await admin.save();

    console.log('\n✅ ADMIN CRÉÉ AVEC SUCCÈS');
    console.log('============================');
    console.log(`Username: ${admin.username}`);
    console.log(`Email:    ${admin.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log('============================');

  } catch (error) {
    console.error('❌ Erreur finale:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();