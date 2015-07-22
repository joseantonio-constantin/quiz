// GET /author
exports.index = function(req, res) {
  res.render('author', {
    autor: 'José Antonio Constantin',
    foto: 'autor.jpg',
    video: 'sample.mp4',
    errors: []
    });
};
