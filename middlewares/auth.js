const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    
    if (!req.headers.authorization) {
      return res.status(401).send("User is not authorized");
    }
   const token = req.headers.authorization;
    const decoded= jwt.verify(token, "my-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Forbidden",
    });
  }
};
