const { Router } = require('express')
const bcrypt = require('bcrypt');
const { BusinessAccount, ConsumerAccount, Stamp, Review } = require('../models/index');
const reviewManagement = Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const { VerifyToken, ReviewAverage, ReviewBreakdown } = require('../middlewares/functions')

dotenv.config();

reviewManagement.use(cors());

reviewManagement.post('/new', VerifyToken, async (req, res) => {
  try {
    const {username} = req.token;
    if (!username) {
      throw new Error("No username found")
    }
    const {businessID, reviewBody, score} = req.body;
    if (!businessID || !score) {
      throw new Error("Missing required body params");
    }
    let reviewer = await ConsumerAccount.findOne({where: {
      username: username
    }});
    let reviewee = await BusinessAccount.findByPk(businessID);
    if (!reviewee || !reviewer) {
      throw new Error("Cannot find reviewer/reviewee with that id");
    }
    const stamp = Review.create({
      businessID: businessID,     
      reviewBody: reviewBody,
      score: score,
      authorID: reviewer.id,
    });
    res.sendStatus(201);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

reviewManagement.get('/breakdown/:id', async (req, res) => {
  try {
    const reviews = await ReviewBreakdown(req.params.id);
    res.json(reviews);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

reviewManagement.get('/average/:id', async (req, res) => {
  try {
    const average = await ReviewAverage(req.params.id)
    res.json({
      average: average
    });
  } catch (e) {
    res.status(400).send(e.message)
  }
})

reviewManagement.put('/body/:reviewID', VerifyToken, async (req, res) => {
  try {
    const {reviewBody} = req.body
    const editor = await ConsumerAccount.findOne({where: {username: req.token.username}});
    const review = await Review.findByPk(req.params.reviewID);
    if (!review || !editor) throw new Error("No review found with that id");
    if (editor.id !== review.authorID) throw new Error("You do not have permission to edit this review");
    review.update({
      reviewBody: reviewBody
    })
    res.sendStatus(201);
  } catch (e) {
    res.status(400).send(e.message);
  }
})



module.exports = reviewManagement