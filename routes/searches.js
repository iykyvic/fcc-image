const express = require('express');
const Searches = require('../controllers/Searches');

const searches = express.Router();

/* GETrecent searches. */
searches.get('/', Searches);

module.exports = searches;
