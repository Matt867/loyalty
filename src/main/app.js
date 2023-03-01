const express = require('express');
const app = express();
const db = require('./db/db');
const cors = require('cors');
const accountManagement = require('./routes/accountManagement');

app.use(express.json());

app.use('/accountManagement', accountManagement);

app.listen(4000);