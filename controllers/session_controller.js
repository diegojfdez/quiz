// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
  req.session.user ? 
      next() 
  : 
      res.redirect('/login');
};

// MW de autodesconexion de sesión
exports.autoLogout = function(req, res, next) {
  if(req.session.user){
    if(Date.now() - req.session.user.tiempo > 120000) // si han pasado más de 2 minutos (120000ms) desconectamos
      res.redirect('/logout');
    else{
      req.session.tiempo = Date.now();
      next();
    }
  } else
    next();
};



// GET /login  -- Formulario de login
exports.new = function(req, res) {
  var errors = req.session.errors || {};
	res.render('session/new', { errors: errors   });
};


// POST /login  -- Crear la session
exports.create = function(req, res) {
  var userController = require('./user_controller');
  userController.autenticar(
    req.body.login, 
    req.body.password, 
    function(error, user){
      if(error) {
        req.session.errors = [{message: 'se ha producido un error: ' + error}];
        res.redirect("/login");
        return;
      }

      // Crear req.session.user y guardar id y username
      // Si existe re.session.user hay session!
      req.session.user = {
        id:       user.id,
        username: user.username,
        tiempo:     Date.now(), 
      }
      res.redirect(req.session.redir.toString()); // volvemos a la página previa al login
  });  
   
};

// GET /logout  -- Destruir sesion
exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString()); // volvemos a la página previa al login
};
