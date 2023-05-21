// authController.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const User = require("../models/Usermodel")

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // TODO: Retrieve user from the database based on the username
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the stored hashed password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create and sign a JWT token
  const token = jwt.sign({ id: user._id, username: user.name, role: user.role }, config.jwtSecret);

  res.json({ token });
};

module.exports = {
  loginUser,
};
