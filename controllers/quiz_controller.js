var models = require('../models/models.js');
// parte nueva ejeccicio P2P modulo 7
var title = "Quiz";
exports.init = function (req,res){
	 var num_registros= models.registros;
	 res.render('index', { title: title, num_registros:num_registros });
	 console.log('hay registros'+num_registros);
}
// fin
//autoload -factoriza el còdigo di la rutaa incluye :quizId
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
//		res.render('quizes/index.ejs',{quizes:quizes});
//	})
//};

// Inicio parte nueva p2p modulo 7
exports.index=function(req,res){
	var quizes="";
	console.log ("BD name="+models.registros);
	if (req.query.search) {
		var buscar=req.query.search;
		console.log(typeof req.query.search);
		console.log(typeof buscar);
		buscar = buscar.replace(/ /g,"%");
		console.log ("Buscamos:"+buscar);
		models.Quiz.findAll({where: ["pregunta like ?",'%'+ buscar+'%']}).then(function(quizes){
			for (var i=0; i<quizes.length; i++) {
				console.log(quizes[i].pregunta);
			}
			res.render('quizes/index.ejs',{ quizes: quizes});
		});
	}else{
	res.render('quizes/index.ejs',{ quizes: quizes});
	}
};	
// fin parte nueva


//GET /quizes/:id
exports.show=function(req,res){
 	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz:req.quiz});
	})
};

//GET /quizes/:id/answer
exports.answer=function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if(req.query.respuesta===req.quiz.respuesta){
			res.render('quizes/answer',{
				quiz:quiz,respuesta:'Correcto'});
		}else{
			res.render('quizes/answer',{
				quiz:req.quiz,respuesta:'Incorrecto'});
		}
	})
};
// GET /author
exports.author=function(req,res){
	res.render('author',{});
};
