const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function CreateToken (username) {
  const token = jwt.sign(
    {username},
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: 60 * 60
    }
  );
  return token;
}

function VerifyToken (req, res, next) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.username = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
}

function isLoggedIn (token) {
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return true;
  } catch (err) {
    return false
  }
}

module.exports = { CreateToken, VerifyToken };