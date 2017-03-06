const express = require('express');
const Search = require('../controllers/Search');
const validate = require('../middlewares/validate');

const search = express.Router();

/* GET Images. */
search.get('/', validate.checkPhrase, Search);

module.exports = search;
