const User = require('../models/Usermodel');
const bcrypt = require('bcrypt');
 

const { paginateResults, sortResults } = require('../middleware/utils');

// GET /api/users - Retrieve all users with pagination and sorting
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page number
    const limit = parseInt(req.query.limit) || 10; // Get the number of items per page
    const sortBy = req.query.sortBy || 'name'; // Get the field to sort by from the query parameters
    const sortOrder = req.query.sortOrder || 'asc'; // Get the sort order from the query parameters

    // Retrieve all users from the database
    const users = await User.find();

    // Sort the users using the utility function
    const sortedResults = sortResults(users, sortBy, sortOrder);

    // Paginate the sorted results using the utility function
    const paginatedResults = paginateResults(sortedResults, page, limit);

    res.json(paginatedResults);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};



// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    // const user = new User(req.body);
    // const savedUser = await user.save();
    const { name, email, password } = req.body;
    const hashpass = await bcrypt.hash(password, 10)
    let data = {
      name,
      email,
      password: hashpass
    }
    const savedUser = await User.create(data)
    res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Update a specific user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Delete a specific user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
