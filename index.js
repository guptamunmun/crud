const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const config = require("./config/config")

const app = express();
const route = require("./routes/routes")

const port = config.server.port
// Middleware
app.use(express.json());
// app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://funupdb-first:VxaFh8Uez4zyv95l@cluster0.kizeuyb.mongodb.net/User?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes

app.use("/", route) 


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

