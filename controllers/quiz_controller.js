var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  var search = '%' + (req.query.search||'').replace(/\s+/g,'%') +'%';
  console.log(search);
  models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
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
    res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
    var quiz = req.quiz;  // autoload de instancia de quiz
    res.render('quizes/edit', { quiz: quiz, errors: [] });
};

// PUT /quizes/:id
exports.update = function(req, res) {
    req.quiz.tema = req.body.quiz.tema;
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    
    req.quiz.validate().then(function(err){
      if(!err)    // Si no hay errores, a la BD
        req.quiz.save(
            { fields: [ "tema", "pregunta", "respuesta" ] }
          )
        .then( function() { res.redirect('/quizes'); } );
      else        // Si hay errores
        res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });


    });
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
    req.quiz.destroy().then(function(){
       res.redirect('/quizes'); 
     }).catch(function (error) {
       next(error);
     });
};


// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	var er = new RegExp("^\\s*" + req.quiz.respuesta + "\\s*$","i");
	
	if (er.test(req.query.respuesta))
  	    resultado = 'Correcto';

	res.render('quizes/answer', 
	   { respuesta: resultado,
	     quiz: req.quiz,
       errors: []
         });
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // f() q crea un nuevo objeto Quiz asociado a la tabla Quiz
      {
        tema: "otro", 
        pregunta: "Pregunta", 
        respuesta: "Respuesta"
      }
    );
    res.render('quizes/new', { quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

    console.log(quiz);  
  // guarda en la BD los campos pregunta y respuesta
  quiz.validate().then(function(err){   // validate() requiere subir a sequelize 2.0
    if(!err)  // si NO hay error
      quiz.save({fields: ["tema", "pregunta" , "respuesta"]}).then(function(){
        res.redirect('/quizes');
      });
    else      // hay error de validación
      res.render('quizes/new', { quiz: quiz, errors: err.errors });    
  });
};