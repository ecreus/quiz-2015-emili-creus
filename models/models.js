var path = require('path');
 // postgres DATABASE_url =postgres://user:paswd@host:port/database
 // SQLite DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]|| null);
var user 	= (url[2]|| null);
var pwd		= (url[3]|| null);
var protocol	= (url[1]|| null);
var dialect	= (url[1]|| null);
var port	= (url[5]|| null);
var host	= (url[4]|| null);
var storage	= process.env.DATABASE_STORAGE;


// cargar modelo ORM

var Sequelize = require ('sequelize');


// Usar BBDD SQlite o postgres

var sequelize = new Sequelize( DB_name,user,pwd,
		{dialect:protocol,
		 protocol: protocol,
		 port: port,
		 host: host, 
		storage:storage,
		omitNull:true
		}
		);

// Importar la definicion de la tabla quiz en quiz.js

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar definicion de la tabla comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);


// Exportar definicion de la tabla quiz

exports.Quiz=Quiz;
exports.Comment=Comment;


// p2p modulo 7

var registros=0;

// sequelize.sync() crea e iniciliza tabla de preguntas DB

sequelize.sync().then(function(){
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if (count === 0){
			// p2p modulo 7
                        //exports.num_registros=num_registros
                        // fin

			Quiz.create({ pregunta:'Capital de Italia',
			respuesta:'Roma', tema:'humanidades'
				   });
			Quiz.create({ pregunta:'Capital de Portugal',
			respuesta:'Lisboa', tema:'humanidades'
				   });
			Quiz.create({ pregunta:'Capital de Francia',
			respuesta:'Paris', tema:'humanidades'
				   })
			.then(function(){console.log('Base de datos inicializada')});
			exports.registros=count;
                        console.log(" Numero de registros en la base"+count); 
		//  p2p modulo 7
		}else{

			exports.registros=count;
			console.log("registros="+count);
		// fin
		};
	});
});
