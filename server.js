const express = require('express');
const morgan = require ('morgan');

const app = express();

const blogRouter = require('./blogRouter');

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', function (req,res){
	res.sendFile(__dirname + 'views/index.html');
})

app.use('/blog-posts', blogRouter);

function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise(function (resolve, reject){
		server = app.listen(port, function(){
			console.log(`Your app is listening on port ${port}`);
			resolve(server);
		}).on('error', function(err){
			reject(err)
		});
	});
}

function closeServer() {
	return new Promise(function (resolve, reject){
		console.log('Closing server');
		server.close(function(err){
			if (err) {
				reject(err);
				return;
			}
			resolve();
		})
	})
}

if (require.main === module) {
	runServer().catch(function(err) {
		console.error(err);
	})
}

module.exports = {app, runServer, closeServer}; 
