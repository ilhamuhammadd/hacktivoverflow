const router = require('express').Router()
const PostController = require('../controllers/postcontroller')
const AnswerController = require('../controllers/answercontroller')


router.get('/posting', PostController.findAll )

router.get('/posting/:id', PostController.findOne)

router.post('/posting', PostController.create)

router.patch('/posting/:id', PostController.upVote)

router.put('/posting/:id', PostController.editPost)

router.delete('/posting/:id', PostController.deletePost)

router.post('/answer', AnswerController.create)

router.get('/answer', AnswerController.getAnswer)

router.delete('/answer/:id', AnswerController.deleteAnswer)

module.exports = router