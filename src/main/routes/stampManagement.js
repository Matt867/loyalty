const { Router } = require('express')
const bcrypt = require('bcrypt');
const { BusinessAccount, ConsumerAccount, Stamp } = require('../models/index');
const stampManagement = Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const { VerifyToken, BusinessAverage, StampBreakdown } = require('../middlewares/functions')

dotenv.config();

stampManagement.use(cors());

stampManagement.post('/new', VerifyToken, async (req, res) => {
  try {
    const {username} = req.token;
    if (!username) {
      throw new Error("No username found")
    }
    const {stampeeID} = req.body;
    if (!stampeeID) {
      throw new Error("Missing required body params");
    }
    let stamper = await BusinessAccount.findOne({where: {
      username: username
    }});
    let stampee = await ConsumerAccount.findByPk(stampeeID);
    if (!stamper || !stampee) {
      throw new Error("Cannot find stamper/stampee with that id");
    }
    const stamp = Stamp.create({
      stamperID: stamper.id,
      stampeeID: stampee.id,
    });
    res.sendStatus(201);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

stampManagement.get('/breakdown/:id', async (req, res) => {
  try {
    const stamps = await StampBreakdown(req.params.id)
    res.json(stamps);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

stampManagement.post('/consumerCheck/stampCount/:businessID', VerifyToken, async (req, res) => {
  try {
    const {username} = req.token;
    const businessID = req.params.businessID
    const consumer = await ConsumerAccount.findOne({
      where: {
        username: username
      }
    });
    if (!consumer) throw new Error("No consumer found");

    const stampCount = await Stamp.count({
      where: {
        stampeeID: consumer.id,
        stamperID: businessID
      }
    })
    res.json({
      stampCount: stampCount
    })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

stampManagement.post('/businessCheck/stampCount/:consumerID', VerifyToken, async (req, res) => {
  try {
    const {username} = req.token;
    const consumerID = req.params.consumerID
    const business = await BusinessAccount.findOne({
      where: {
        username: username
      }
    });
    if (!business) throw new Error("No consumer found");

    const stampCount = await Stamp.count({
      where: {
        stampeeID: consumerID,
        stamperID: business.id
      }
    })
    res.json({
      stampCount: stampCount
    })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

stampManagement.post('/validate/:consumerID', VerifyToken, async (req, res) => {
  try {
    const {username} = req.token;
    const consumerID = req.params.consumerID;
    const {count} = req.body
    const business = await BusinessAccount.findOne({
      where: {
        username: username
      }
    });
    const consumer = await ConsumerAccount.findByPk(consumerID);
    if (!business || !consumer) throw new Error("Business or Consumer cannot be found with those params");
    for (let i=0; i<count; i++) {
      const stamp = await Stamp.findOne({
        where: {
          stamperID: business.id,
          stampeeID: consumerID,
          validated: false
        }
      });
      stamp.update({
        validated: true
      });
    }
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e.message)
  }
  
})

module.exports = stampManagement