const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { BusinessAccount, ConsumerAccount, Stamp, Review } = require('../models/index');
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
    req.token = decoded;
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

async function ReviewAverage(businessID) {
  let scoreSum = 0;
  scores = await Review.findAll({
    where: {
      businessID: businessID,
    },
    attributes: ['score'],
  })
  if (!scores) throw new Error("No scores found");
  scores.map(obj => scoreSum += obj['score']);
  return (Math.floor((scoreSum/scores.length)*10) / 10)
}

async function StampBreakdown(stampeeID, isBusiness) {
    stamps = await Stamp.findAll({
      where: {
        stampeeID: stampeeID,
      },
      attributes: ['id', 'dateTime', 'stamperID'],
    })
    if (!stamps) throw new Error("No data found");
    return stamps;
}

async function ReviewBreakdown(revieweeID) {
    reviews = await Review.findAll({
      where: {
        businessID: revieweeID,
      },
      attributes: ['id', 'dateTime', 'reviewBody', 'businessID', 'score'],
    })
    if (!reviews) throw new Error("No data found");
    return reviews;
}

module.exports = { CreateToken, VerifyToken, ReviewAverage, StampBreakdown, ReviewBreakdown };