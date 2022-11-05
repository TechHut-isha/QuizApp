const router = require('express').Router();
let quiz = require('../models/quiz.model');
let result = require('../models/result.model');
let authorization = require('../middleware/authorization');

router.route('/').get(authorization, (req, res) => {
    quiz.find() //returns a promise
        .then(quiz => res.json(quiz))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/createQuiz').post(authorization, (req, res, next) => {
    quiz.create(req.body)
        .then((quiz) => {
            console.log('Quiz Created: ', quiz);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Expose-Headers", "*");
            res.setHeader('QuizId', quiz._id);
            res.json(quiz);
        }, (err) => next(err)).catch((err) => next(err));
});
router.route('/:quizId').get(authorization, (req, res, next) => {
    quiz.findById(req.params.quizId)
        .then((quiz) => {
            console.log(quiz);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(quiz);
        }, (err) => next(err)).catch((err) => next(err));
});
router.route('/:quizId/questions').get(authorization, (req, res, next) => {
    quiz.findById(req.params.quizId)
        .then((quiz) => {
            if (quiz != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz.questions);
            }
            else {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
});
router.route('/:quizId/addquestion').post(authorization, (req, res, next) => {
    quiz.findById(req.params.quizId)
        .then((quiz) => {
            if (quiz != null) {
                quiz.questions.push(req.body);
                quiz.save()
                    .then((quiz) => {
                        res.status(200).send('Question added!')
                    }, (err) => next(err));
            }
            else {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
});
router.route("/submit").post(async (req, res) => {
    const score = parseInt(req.body.score);
    const email = req.body.email.toLowerCase();

    const resultEntry = new result({ email, score });
    resultEntry
        .save()
        .then(() => res.send("result added!"))
        .catch((err) => res.status(400).json("error : " + err));
});

// router.route('/update/:id').post((req,res)=>{
//     const id = req.params.id;
//     Exercise.findById(id)
//     .then(exercise => {
//         exercise.username = req.body.username;
//         exercise.description = req.body.description;
//         exercise.duration = req.body.duration;
//         exercise.date= req.body.date;

//         exercise.save()
//         .then(() => res.json("Exercise updated!"))
//         .catch(err => res.status(400).json('Error: '+ err))
//     })
//     .catch(err => res.status(400).json('Error: '+ err))
// });

module.exports = router;