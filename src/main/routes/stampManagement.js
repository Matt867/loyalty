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

stampManagement.post('/newStamp', (req, res) => {
    
})

