const express = require('express');
const Home = require('../controllers/Home');

const home = express.Router();

/* GET home page. */
home.get('/', Home);


module.exports = home;
