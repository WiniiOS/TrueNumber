const User = require('../models/User');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  const admin = new User({
    username: 'admin',
    email: 'admin@highreference.com',
    password: await bcrypt.hash('Admin1234', 12),
    phone: '+237658682586',
    role: 'admin',
    balance: 0
  });
  await admin.save();
  console.log('Admin créé avec succès');
};

createAdmin().catch(console.error);