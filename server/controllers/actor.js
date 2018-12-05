var database = require('../util/databaseHelper.js');
var response = require('../util/responseHelper.js');
var base64 = require('file-base64');
require('../util/stringExtension.js');

var ActorCtrl = {};
module.exports = ActorCtrl;

//GET /actors - lista todos os atores
ActorCtrl.readAll = function(callback){

  var sql = 'SELECT id, name, photo_url FROM Star WHERE is_actor = true';
  var params = null;

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    return callback(response.result(200, rows));
  });
};

//GET /actor/:id - lista ator por ID
ActorCtrl.readBySlug = function(id, callback){
  var sql = 'SELECT id, name, photo_url FROM Star WHERE is_actor = true AND id = ?';
  var params = [id];

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }
    return callback(response.result(200, rows[0]));
  });
};


//POST /actor - insere ator
ActorCtrl.insert = function(params, callback){
  var imageName = params.title.fileNameClean('.jpg');
  base64.decode(params.photo_url, './public/images/' + imageName, function(err, output) {
    console.log("success insert photo actor");
  });
  
  var sql = 'INSERT INTO Star(name, photo_url, is_actor, is_director) VALUES(?,?,?,?)';
  var params = [params.name, imageName, true, false];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }
    
    var id = rows.insertId;
    ActorCtrl.readBySlug(id, callback);
  });
};

//PUT /actor/:id - altera um ator
ActorCtrl.update = function(id, params, callback){
  var imageName = params.title.fileNameClean('.jpg');
  base64.decode(params.photo_url, './public/images/' + imageName, function(err, output) {
    console.log("success update photo diretor");
  });
  
  var sql = 'UPDATE Star SET title = ?, photo_url = ?, released_date = ? WHERE is_actor = true AND id = ? ';
  var params = [params.title, imageName, params.released_date, id];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }
    
    ActorCtrl.readBySlug(id, callback);
  });
};

//DELETE /actor/:id - remove um ator
ActorCtrl.delete = function(id, callback){
  var sql = 'DELETE FROM Star WHERE  is_actor = true AND id = ? ';
  var params = [id];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }

    callback(response.result(204));
  });
};
