var models = require('../models/models.js');
// parte nueva ejericio P2P modulo 7
var title = "Quiz";
exports.init = function (req,res){
	 var num_registros= models.registros;
         console.log('preguntas en la base de datos '+num_registros);
	 res.render('index', { title: title, num_registros: num_registros,errors:[] });
}
// fin
//autoload -factoriza el c√≤digo di la rutaa incluye :quizId
exports.load = function (req,res,next,quizId) {

	models.Quiz.find(quizId).then(
	   function(quiz) {
		if (quiz){
		 req.quiz=quiz;
		 next();
		} else { next ( new Error('No existe quizId ='+ quizId));}
	}
	).catch(function(error) { next(error);});
}; 



// GET /quizes

//exports.index= function(req,res){
//	models.Quiz.findAll().then(function(quizes){
//		res.render('quizes/index.ejs',{quizes:quizes, errors:[]});
//	})
//};

// Inicio parte nueva p2p modulo 7
//exports.index=function(req,res){
//	var quizes="";
//	console.log ("BD name="+models.registros);
//	if (req.query.search) {
//		var buscar=req.query.search;
//		console.log(typeof req.query.search);
//		console.log(typeof buscar);
//		buscar = buscar.replace(/ /g,"%");
//		console.log ("Buscamos:"+buscar);
//		models.Quiz.findAll({where: ["pregunta like ?",'%'+ buscar+'%']}).then(function(quizes){
//			for (var i=0; i<quizes.length; i++) {
//				console.log(quizes[i].pregunta);
//			}
//			res.render('quizes/index.ejs',{ quizes: quizes,errors:[]});
//		});
//	}else{
//	res.render('quizes/index.ejs',{ quizes: quizes,errors:[]});
//	}
//};	
// fin parte nueva

// tercera version

exports.index = function(req, res) {
   //Filtrado de b˙squeda
   if (req.query.search) {
   		var search = req.query.search.replace(/\s/g,"%");
   		//Lista buscando el contenido y ordenando de forma ascendente
    	models.Quiz.findAll({where:["pregunta like ?", '\%'+search+'\%'],order:'pregunta ASC'}).then(
   			function(quizes){
   				res.render('quizes/index', { quizes: quizes, errors: []});
   			}
   		).catch(function(error) { next(error);})
    } else {
    	models.Quiz.findAll().then(
    		function(quizes){
        		res.render('quizes/index', {quizes: quizes, errors: []});
       		}
       	).catch(function(error) { next(error);})
    }
};


// Fin de la tercera version





//GET /quizes/:id
exports.show=function(req,res){
 	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz:req.quiz,errors:[]});
	})
};

//GET /quizes/:id/answer
//exports.answer=function(req,res){
//	models.Quiz.find(req.params.quizId).then(function(quiz) {
//		if(req.query.respuesta===req.quiz.respuesta){
//			res.render('quizes/answer',{
//				quiz:req.quiz,respuesta:'Correcto',errors[]});
//		}else{
//			res.render('quizes/answer',{
//				quiz:req.quiz,respuesta:'Incorrecto',errors:[]});
//		}
//	})
//};

exports.answer=function(req,res){
	var resultado='Incorrecto';
	if (req.query.respuesta===req.quiz.respuesta){
		resultado='Correcto';
 	}
 	res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado, errors:[]});
};



// modulo 8
// GET /quizes/new
exports.new = function(req,res){
	var quiz=models.Quiz.build( // crea objecto raiz
		{pregunta:"Pregunta", respuesta:"Respuesta", tema:"Tema"});
	res.render('quizes/new',{quiz:quiz,errors:[]});
};

// POST /quizes/create
exports.create=function(req,res){
	var quiz=models.Quiz.build(req.body.quiz);

	quiz
	 .validate()
	  .then(function(err){
		if(err) {
		  res.render('quizes/new',{quiz:quiz,errors:err.errors});
		}else{
		  // Guarda en la base e datos
		  quiz
		   .save({fields:["pregunta","respuesta","tema"]})
		    .then(function(){res.redirect('/quizes')})
		}
	}
	);
};

//GET /quizes/:id/edit
exports.edit=function(req,res){ 
	var quiz=req.quiz;
	res.render('quizes/edit',{quiz:quiz,errors:[]});
};


// PUT/quizes/:id
exports.update = function( req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta= req.body.quiz.respuesta;
	req.quiz.tema=req.body.quiz.tema;
	req.quiz
	 .validate()
	  .then(
		function(err){
			if(err) {
				res.render('quizes/edit',{quiz:req.quiz,errors:err.errors});
			}else{
				req.quiz
				 .save({fields:["pregunta","respuesta","tema"]})
				  .then(function(){res.redirect('/quizes');});
			}
		}
	);
};

// Delete /quizes/:id
exports.destroy=function(req,res) {
	req.quiz.destroy().then(function(){
	 res.redirect('/quizes');
	}).catch(function(error){next(error)});
};



// GET /author
exports.author=function(req,res){
	res.render('author',{});
};
