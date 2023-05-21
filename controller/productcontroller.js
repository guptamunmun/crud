
const Product = require('../models/Productmodel');
const { paginateResults, sortResults } = require('../middleware/utils');

// GET /api/products - Retrieve all products with pagination and sorting
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page number
    const limit = parseInt(req.query.limit) || 10; // Get the number of items per page
    const sortBy = req.query.sortBy || 'name'; // Get the field to sort by from the query parameters
    const sortOrder = req.query.sortOrder || 'asc'; // Get the sort order from the query parameters

    // Retrieve all products from the database
    const products = await Product.find();

    // Sort the products using the utility function
    const sortedResults = sortResults(products, sortBy, sortOrder);

    // Paginate the sorted results using the utility function
    const paginatedResults = paginateResults(sortedResults, page, limit);

    res.json(paginatedResults);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
};


// Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
}
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
}
};

// Update a specific product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
}
};

// Delete a specific product by ID
const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
  }
  };
  
  module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };
 