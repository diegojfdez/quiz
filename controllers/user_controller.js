var users = {
  admin: {id:1, username:"admin", password: "1234"},
  pepe:  {id:2, username:"pepe", password: "5678"},
};

// Comprueba usuarios del objeto anterior
exports.autenticar = function(login, password, callback) {
  if( users[login])	{
    if(password === users[login].password)
      callback(null, users[login]);
    else
      callback(new Error('Password incorrecto.'));
  }
  else {
     callback(new Error('Usuario incorrecto.'));
  }

};
