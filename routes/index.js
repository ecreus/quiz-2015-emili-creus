var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');
var commentController=require('../controllers/comment_controller');
var sessionController= require('../controllers/session_controller');


/* GET home page. */
// Anterior
//router.get('/', function(req, res) {
//  res.render('index', { title: 'QUIZ',errors:[]});
//});

// Nuevo
router.get('/', quizController.init);


//autoload de comandos con :quizId
router.param('quizId',quizController.load);
router.param('commentId',commentController.load); //autoload:commentId

//definicion de rutas de sesion

router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create);// crear sesion
router.get('/logout', sessionController.destroy); //destruir sesion


/* router.get('/quizes/question',quizController.question);*/
/* router.get('/quizes/answer', quizController.answer);*/

// definicion de rutas de /quizes

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// rutas nuevas modulo 8
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired ,quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired , quizController.destroy);

// definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired,commentController.publish);

router.get('/author',quizController.author);

module.exports = router;
