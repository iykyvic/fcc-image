const mongoose = require('mongoose');

const SearchModel = new mongoose.Schema({
  term: String,
  when: Date
});

const Searches = mongoose.model('Search', SearchModel);

module.exports = {
  mongoose,
  Searches
};

