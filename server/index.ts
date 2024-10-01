import express = require('express');
require('dotenv').config();

const app = express();

// test api gateway
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export = app;