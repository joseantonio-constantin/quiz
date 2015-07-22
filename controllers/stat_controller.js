var models = require('../models/models.js');

// GET /quizes/statistics
exports.index = function(req, res, next) {

  models.Quiz.count().then(function(nquizes) { // El número de preguntas totales
    req.npreg = nquizes;
    console.log("Success1: "+req.npreg);

    models.Comment.count().then(function(ncomments) { // El número de comentarios totales
        req.ncomm = ncomments;
        console.log("Success2: "+req.ncomm);

        // SELECT COUNT(DISTINCT Quizzes.id) AS count FROM Quizzes INNER JOIN Comments ON Quizzes.id=Comments.QuizId
        models.Quiz.count({
              distinct: 'pregunta',
              include: [{
                  model: models.Comment,
                  as: 'Comments',
                  required: true
              }]
        }).then(function(npreg_comm) { // El número de preguntas con comentarios
            console.log("Success: "+req.npreg+" "+req.ncomm+" "+npreg_comm);
            res.render('statistics/index', {nquizes: req.npreg, ncomments: req.ncomm, nquizes_comments: npreg_comm, errors: []});
        });
    });
  }).catch(function(error){next(error)});

};
