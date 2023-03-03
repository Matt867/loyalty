const express = require('express');
const app = express();
const db = require('./db/db');
const cors = require('cors');
const accountManagement = require('./routes/accountManagement');
const stampManagement = require('./routes/stampManagement');
const reviewManagement = require('./routes/reviewManagement');

app.use(express.json());

app.use('/accountManagement', accountManagement);
app.use('/stamps', stampManagement);
app.use('/reviews', reviewManagement);

app.listen(4000);

module.exports = app;