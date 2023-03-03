const { Tweet, User, Impression } = require('../models');
const db = require('./db');


const seed = async () => {
    db.sync({force: true})
}


seed()

module.exports = seed;