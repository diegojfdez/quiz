// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
	  	'Quiz',  	// Nombre de la tabla
		{
		  pregunta: {					// campo 1
		    type: DataTypes.STRING,		
		    validate:  { notEmpty: {msg: "-> Falta Pregunta"}}
		  },
		  respuesta: {					// campo 2 ..
		    type: DataTypes.STRING,	
		    validate:  { notEmpty: {msg: "-> Falta Respuesta"}}
		  }
		});
}
