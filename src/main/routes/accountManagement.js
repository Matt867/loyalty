const { Router } = require('express');
const bcrypt = require('bcrypt');
const { BusinessAccount, ConsumerAccount } = require('../models/index');
const accountManagement = Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const { CreateToken, VerifyToken } = require('../middlewares/functions')

dotenv.config();

const SALT_ROUNDS = 10;

accountManagement.use(cors());

async function validateBusinessCredentials (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  try {
    user = await BusinessAccount.findOne({
      where: {
        username: username
      } 
    })
    if (!user) throw new Error("Invalid username or password")
    await bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        next()
      } else {
        res.status(403).send("Invalid username or password")
      }
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function validateConsumerCredentials (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  try {
    user = await ConsumerAccount.findOne({
      where: {
        username: username
      } 
    })
    if (!user) throw new Error("Invalid username or password")
    await bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        next()
      } else {
        res.status(403).send("Invalid username or password")
      }
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

accountManagement.post('/newBusiness', async (req, res) => {
  try {
    const { username, password, businessName } = req.body;
    if (!username || !password || !businessName) {
      throw new Error("No fields can be empty")
    }
    salt = await bcrypt.genSalt(SALT_ROUNDS);
    hash = await bcrypt.hash(password, salt);
    newBusiness = await BusinessAccount.create({
      username: username,
      password: hash,
      businessName: businessName
    });
    res.status(201).json({
      loggedIn: true,
      token: CreateToken(req.body.username)
    });  
  } catch (error) {
    res.status(400).send(error.message);
  }
})

accountManagement.post('/newConsumer', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("No fields can be empty")
    }
    salt = await bcrypt.genSalt(SALT_ROUNDS);
    hash = await bcrypt.hash(password, salt);
    newBusiness = await ConsumerAccount.create({
      username: username,
      password: hash,
    });
    res.status(201).json({
      loggedIn: true,
      token: CreateToken(req.body.username)
    });  
  } catch (error) {
    res.sendStatus(400);
  }
})

accountManagement.post('/businessLogin', validateBusinessCredentials, async (req, res) => {
  res.status(200).json({
    loggedIn: true,
    token: CreateToken(req.body.username)
  });
})

accountManagement.post('/consumerLogin', validateConsumerCredentials, async (req, res) => {
  res.status(200).json({
    loggedIn: true,
    token: CreateToken(req.body.username)
  });
})

module.exports = accountManagement;