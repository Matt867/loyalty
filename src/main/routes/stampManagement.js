const { Router } = require('express')
const bcrypt = require('bcrypt');
const { BusinessAccount, ConsumerAccount, Stamp } = require('../models/index');
const stampManagement = Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const { VerifyToken } = require('../middlewares/functions')

dotenv.config();

stampManagement.use(cors());

stampManagement.post('/new', VerifyToken, async (req, res) => {
  try {
    const {username} = req.token;
    if (!username) {
      throw new Error("No username found")
    }
    const {stampeeName, score} = req.body;
    let isBusinessStampee = true;
    let isBusinessStamper = false;
    if (!stampeeName || !score) {
      throw new Error("Missing required body params");
    }
    let stamper = await ConsumerAccount.findOne({where: {
      username: username
    }});
    if (!stamper) {
      stamper = await BusinessAccount.findOne({
        where: {
          username: username
        }
      });
      isBusinessStamper = true;
    }

    let stampee = await BusinessAccount.findOne({where: {
      username: stampeeName
    }});
    if (!stampee) {
      stampee = await ConsumerAccount.findOne({
        where: {
          username: stampeeName
        }
      });
      if (!stampee) {
        throw new Error("No consumer or business account found with given stampee username");
      }
      isBusinessStampee = false
    }

    if (stamper.constructor.name === stampee.constructor.name) {
      throw new Error("Stamper and stampee cannot be of the same type");
    }

    const stamp = Stamp.create({
      score: score,
      stamperID: stamper.id,
      stampeeID: stampee.id,
      isBusinessStampee: isBusinessStampee,
      isBusinessStamper: isBusinessStamper,
    });

    res.sendStatus(201);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

stampManagement.get('/business/breakdown/:id', async (req, res) => {
  try {
    scores = await Stamp.findAll({
      where: {
        stampeeID: req.params.id,
        isBusinessStampee: true
      },
      attributes: ['id', 'dateTime', 'score', 'stamperID', 'isBusinessStamper'],
    })
    if (!scores) throw new Error("No data found");
    res.json(scores);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

stampManagement.get('/business/average/:id', async (req, res) => {
  try {
    let scoreSum = 0;
    scores = await Stamp.findAll({
      where: {
        stampeeID: req.params.id,
        isBusinessStampee: true
      },
      attributes: ['score'],
    })
    if (!scores) throw new Error("No scores found");
    scores.map(obj => scoreSum += obj['score']);
    console.log(scoreSum);
    res.json({
      average: (Math.floor((scoreSum/scores.length)*10) / 10)
    });
  } catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = stampManagement