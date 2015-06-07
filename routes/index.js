var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload (precarga) de comandos con :quizId
router.param('quizId', quizController.load);

/* GET /author. */
router.get('/author', function(req, res) {
  res.render('author', { autor: 'Diego J. Fernández Raposo', errors: [] });
});


// Get quizes
router.get('/quizes', quizController.index);

// Get single quiz
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* controlador de las respuestas */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* controlador del formulario de creación de preguntas */
router.get('/quizes/new', quizController.new);

/* controlador la creación de una pregunta a traves del formulario anterior */
router.post('/quizes/create', quizController.create);

module.exports = router;
