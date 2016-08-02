var express = require('express');
var logger = require('morgan');
var cors = require('cors');
config = require('config');

require('./routes/word.js'); // including word.js



var app = express();
process.env.NODE_ENV = 'development';
app.use(logger('dev'));
app.use(cors());




