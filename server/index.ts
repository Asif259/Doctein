import {Request, Response} from "express";

import express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

export = app;