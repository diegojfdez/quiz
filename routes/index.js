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
router.param('commentId', commentController.load);

// Rutas de sesion
router.get('/login', sessionController.autoLogout, sessionController.new);
router.post('/login', sessionController.autoLogout, sessionController.create);
router.get('/logout', sessionController.destroy);

/* GET /author. */
router.get('/author', sessionController.autoLogout, function(req, res) {
  res.render('author', { autor: 'Diego J. Fernández Raposo', errors: [] });
});


// Get quizes
router.get('/quizes', sessionController.autoLogout, quizController.index);

// Get single quiz
router.get('/quizes/:quizId(\\d+)', sessionController.autoLogout, quizController.show);

/* controlador de las respuestas */
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autoLogout, quizController.answer);


/* controlador de los comentarios */
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.autoLogout, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.autoLogout, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
	sessionController.autoLogout, sessionController.loginRequired, commentController.publish); // debe ser PUT


// Get single quiz editing form
router.get('/quizes/:quizId(\\d+)/edit', sessionController.autoLogout, sessionController.loginRequired, quizController.edit);

// PUT single quiz editing
router.put('/quizes/:quizId(\\d+)', sessionController.autoLogout, sessionController.loginRequired, quizController.update);

// DELETE single quiz 
router.delete('/quizes/:quizId(\\d+)', sessionController.autoLogout, sessionController.loginRequired, quizController.destroy);

/* controlador del formulario de creación de preguntas */
router.get('/quizes/new', sessionController.autoLogout, sessionController.loginRequired, quizController.new);

/* controlador la creación de una pregunta a traves del formulario anterior */
router.post('/quizes/create', sessionController.autoLogout, sessionController.loginRequired, quizController.create);

module.exports = router;
