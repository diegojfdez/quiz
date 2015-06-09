var models = require('../models/models.js');

// Autoload - comprueba si la ruta incluye un :quizIdalido
exports.load = function(req, res, next, commentId) {
  models.Comment.find(
      {
        where:    { 
                    id: Number(commentId)
                  }
      }
    ).then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else { next(new Error('No existe commentId=' + commentId)); }
    }
  ).catch(function(error) { next(error); });
};

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

// GET /quizes/:id/comments/:commId/publish
exports.publish = function(req, res) {
  req.comment.publicado = true;
   
  // guarda el cambio en la BD
  req.comment.save( { fields: ["publicado"] } )
    .then(function(){
          res.redirect('/quizes/' + req.params.quizId);
        })
    .catch(function(error) { next(error); });
};