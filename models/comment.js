// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
	  	'Comment',  	// Nombre de la tabla
		{
		  texto: {						// campo 0
				    type: DataTypes.STRING,		
				    validate:  { notEmpty: {msg: "-> Falta Comentario"}}
		  		 },
		  publicado: {						// campo 0
				    type: DataTypes.BOOLEAN,		
				    defaultValue: false
		  		 }
		});
}
