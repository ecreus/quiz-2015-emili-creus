// definicion estructura de la base de datos en sqlite

module.exports = function(sequelize,DataTypes){
	return sequelize.define('Quiz',
		{ pregunta: DataTypes.STRING,
		  respuesta: DataTypes.STRING,
		});
}
