const dotenv = require('dotenv');
const api = require('gettyimages-api');
const model = require('../models/SearchModel');

const Searches = model.Searches;
dotenv.config();

module.exports = (req, res) => {
  const creds = {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD
  };
  const client = new api(creds);
  let offset = req.query.offset;
  let limit = req.query.limit;
  offset = !isNaN(offset) && offset > 0 && offset < 11 ? offset : 1;
  client.search().images().withPage(offset);
  limit = !isNaN(limit) && limit > 0 && limit < 11 ? limit : 10;
  client.search().images()
  .withPage(offset)
  .withPageSize(limit)
  .withPhrase(req.query.phrase)
  .execute((error, data) => {
    const images = [];
    data.images.forEach((image, index) => {
      const {
        display_sizes: { 0: { uri: url } },
        caption: snippet,
        title: alt
      } = image;
      images[index] = { url, snippet, alt };
    });
    if (error) {
      return res.status(500).json({ status: 'fail', message: error });
    } else if (images.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No images match your query phrase'
      });
    }
    const search = { term: req.query.phrase, when: new Date() };
    return Searches.create(search, (err) => {
      if (err) {
        return res.status(500)
        .json({ status: 'fail', message: 'database error' });
      }
      return res.status(200).json({
        status: 'success',
        pages: data.result_count,
        page: offset,
        data: images
      });
    });
  });
};
