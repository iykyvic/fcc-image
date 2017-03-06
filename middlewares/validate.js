module.exports = {
  checkPhrase(req, res, next) {
    const phrase = req.query.phrase;
    if (!/\w/gi.test(phrase)) {
      return res.status(400).json({
        status: 'fail',
        message: ''
      });
    }
    next();
  }
};
