var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes });
  }).catch(function(error) { next(error); });
};

// Autoload - comprueba si la ruta incluye un :quizIdalido
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error); });
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	var er = new RegExp("^\\s*" + req.quiz.respuesta + "\\s*$","i");
	
	if (er.test(req.query.respuesta))
  	    resultado = 'Correcto';

	res.render('quizes/answer', 
	   { respuesta: resultado,
	     quiz: req.quiz });
};
