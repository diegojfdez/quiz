var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController= require('../controllers/session_controller');
 
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload (precarga) de comandos con :quizId
router.param('quizId', quizController.load);

// Rutas de sesion
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

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


/* controlador de los comentarios */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);


// Get single quiz editing form
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);

// PUT single quiz editing
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);

// DELETE single quiz 
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

/* controlador del formulario de creación de preguntas */
router.get('/quizes/new', sessionController.loginRequired, quizController.new);

/* controlador la creación de una pregunta a traves del formulario anterior */
router.post('/quizes/create', sessionController.loginRequired, quizController.create);

module.exports = router;
