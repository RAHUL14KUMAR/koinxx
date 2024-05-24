require('dotenv').config();
const connect =require('./Database/db');
const express = require('express');
const uploadingRouting = require('./Routes/uploadRouting');

const app = express();
app.use(express.json());

const port=3000;

app.use('/upload-csv', uploadingRouting);

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
connect;