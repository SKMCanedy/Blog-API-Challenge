const express = require('express');
const app = express();
const blogRouter = require('./blogRouter');

app.use('/blog-posts', blogRouter);

app.listen(8080, function(){
	console.log('Listening on 8080');
});