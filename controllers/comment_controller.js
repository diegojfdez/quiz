var models = require('../models/models.js');

// GET /quizes/:id/comments/new
exports.new = function(req, res) {
	res.render('comments/new.ejs', 
	  { quizid: req.params.quizId,
       errors: []
    });
};


// POST /quizes/:id/comments
exports.create = function(req, res) {
  var comment = models.Comment.build( 
    { texto:  req.body.comment.texto,
      QuizId: req.params.quizId
    });
   
  // guarda en la BD los campos pregunta y respuesta
  comment.validate().then(function(err){   // validate() requiere subir a sequelize 2.0
    if(!err)  // si NO hay error
      comment.save().then(function(){
        res.redirect('/quizes/' + req.params.quizId);
      });
    else      // hay error de validación
      res.render('comments/new.ejs', { comment: comment, errors: err.errors });    
  });

};