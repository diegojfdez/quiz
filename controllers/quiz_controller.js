var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question', { pregunta: quiz[0].pregunta });
  });
};

// GET /quizes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
	var er = new RegExp("^\\s*" + quiz[0].respuesta + "\\s*$","i");
	if (er.test(req.query.respuesta))
  		res.render('quizes/answer', { respuesta: 'Correcto' });
  	else
  		res.render('quizes/answer', { respuesta: 'Incorrecto' });
  });
};
