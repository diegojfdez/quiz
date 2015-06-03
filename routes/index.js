var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET /author. */
router.get('/author', function(req, res) {
  res.render('author', { autor: 'Diego J. Fernández Raposo' });
});

/* controlador de las preguntas */
router.get('/quizes/question', quizController.question);

/* controlador de las respuestas */
router.get('/quizes/answer', quizController.answer);

module.exports = router;
