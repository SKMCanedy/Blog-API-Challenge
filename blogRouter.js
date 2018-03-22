

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('Happy Mar 21', 'This day is fantastic. The best ever.', 'SKM');
BlogPosts.create('The Day of Sick', 'I am sick today. Very sick. Sad face.', 'SKM');
BlogPosts.create('Best Mom Ever', 'I have the best mom in the world.', 'DWC')

router.get('/', function(req, res){
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, function(req, res){
	const newPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(newPost);
});

router.put('/:id', jsonParser, function(req, res){
	const updatedPost = BlogPosts.update({
		id: req.params.id, 
		title: req.body.title, 
		content: req.body.content, 
		author: req.body.author, 
	});
	res.status(204).end();
});

router.delete('/:id', function(req, res){
	BlogPosts.delete(req.params.id);
	res.status(204).end();
});

module.exports = router;