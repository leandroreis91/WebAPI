var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//C:\Users\<matric>\AppData\Roaming\npm\pm2 start app.js --watch

var port = process.env.PORT || 3000;


app.listen( port, function() {
	'use strict';
	console.log( 'Listening on port ' + port );
} );

//controllers
var actorCtrl = require('./server/controllers/actor.js')
var movieCtrl = require('./server/controllers/movie.js')


//router

var getMovies = function() {
	return [
		{
			id: 1,
			title: "Matrix",
			releaseDate: 1999
		},
		{
			id: 2,
			title: "Matrix Reload",
			releaseDate: 2003
		},
		{
			id: 3,
			title: "Matrix Revolutions",
			releaseDate: 2003
		}
	]
}


var getMovieWithId = function(id) {
	var movies = getMovies()
	var selected = movies.filter(function(object){
		return object.id == id
	});

	return selected
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('server is running',200);
});

app.get('/movies', function(req, res) {
	movieCtrl.readAll(function(resp) {
		res.status(resp.statusCode).json(resp);
	});
  });


app.get('/movie/:id', function(req, res) {	
	var id = req.params["id"];
	movieCtrl.readBySlug(id, function(resp) {
		res.status(resp.statusCode).json(resp);
	});
});

app.get('/actors', function(req, res) {
	actorCtrl.readAll(function(resp) {
    res.status(resp.statusCode).json(resp);
  });
});