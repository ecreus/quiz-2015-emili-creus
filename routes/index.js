var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');


/* GET home page. */
// Anterior
//router.get('/', function(req, res) {
//  res.render('index', { title: 'QUIZ' });
//});

// Nuevo
router.get('/', quizController.init);


//autoload de comandos con :quizId

router.param('quizId',quizController.load);


/* router.get('/quizes/question',quizController.question);*/
/* router.get('/quizes/answer', quizController.answer);*/
// definicion de rutas de /quizes

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);



router.get('/author',quizController.author);

module.exports = router;
