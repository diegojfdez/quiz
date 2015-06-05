var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload (precarga) de comandos con :quizId
router.param('quizId', quizController.load);

/* GET /author. */
router.get('/author', function(req, res) {
  res.render('author', { autor: 'Diego J. Fernández Raposo' });
});


// Get quizes
router.get('/quizes', quizController.index);

// Get single quiz
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* controlador de las respuestas */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
