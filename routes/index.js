var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* controlador de las preguntas */
router.get('/quizes/question', quizController.question);

/* controlador de las respuestas */
router.get('/quizes/answer', quizController.answer);

module.exports = router;
