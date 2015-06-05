// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',  	// Nombre de la tabla
		{ pregunta: DataTypes.STRING,	// campo 1
		  respuesta: DataTypes.STRING,	// campo 2 ..
		});
}
