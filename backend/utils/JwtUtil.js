const jwt = require("jsonwebtoken");
const SECRET_KEY = "rahasia"

const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY);
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          reject(err);
        } else if (err.name === "TokenExpiredError") {
          reject(err);
        }
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken };
