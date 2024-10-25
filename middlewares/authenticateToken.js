const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

// Middleware to validate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token

  // Check if the token is provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid Token",
        providedToken: token, // Include the invalid token in the response for debugging
      });
    }

    // Attach user data to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
