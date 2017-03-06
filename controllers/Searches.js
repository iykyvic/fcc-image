const model = require('../models/SearchModel');

const Searches = model.Searches;

module.exports = (req, res) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  offset = !isNaN(offset) && offset > 0 && offset < 11 ? offset : 0;
  limit = !isNaN(limit) && limit > 0 && limit < 11 ? limit : 10;
  Searches.find({}, { _id: 0, __v: 0 }, (err, searches) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err });
    } else if (searches.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No image found'
      });
    }
    return res.status(200).json({
      status: 'success',
      data: searches
    });
  }).skip(+offset).limit(+limit);
};
