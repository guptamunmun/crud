const express = require('express');
const router = express.Router();
const UserController = require('../controller/Usercontoller');
const ProductController = require('../controller/productcontroller');
const authController =require("../controller/authcontroller")
const {authenticateUser}=require("../middleware/middleware")
const { validateCreateUser, validateUpdateUser, validateCreateProduct, validateUpdateProduct } = require('../middleware/validation');

// User Routes
router.get('/api/users', UserController.getAllUsers);
router.post('/api/users', validateCreateUser, UserController.createUser);
router.get('/api/users/:id', UserController.getUserById);
router.put('/api/users/:id', validateUpdateUser, UserController.updateUser);
router.delete('/api/users/:id', UserController.deleteUser);

// Product Routes
router.get('/api/products',authenticateUser, ProductController.getAllProducts);
router.post('/api/products',authenticateUser, validateCreateProduct, ProductController.createProduct);
router.get('/api/products/:id', authenticateUser,ProductController.getProductById);
router.put('/api/products/:id', authenticateUser,validateUpdateProduct, ProductController.updateProduct);
router.delete('/api/products/:id',authenticateUser, ProductController.deleteProduct);
//login 
router.post('/api/login',authController.loginUser)

module.exports = router;
