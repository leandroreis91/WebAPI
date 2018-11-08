var database = require('../util/databaseHelper.js');
var response = require('../util/responseHelper.js');

var ActorCtrl = {};
module.exports = ActorCtrl;




//GET /actor/:id - detalhes de um ator
ActorCtrl.readBySlug = function(id, callback){
  var sql = 'select id, name, photo_url FROM Star WHERE is_actor = true WHERE id = ?';
  var params = [id];

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    return callback(response.result(200, rows[0]));
  });
};


//GET /actors - lista todos os atores
ActorCtrl.readAll = function(callback){

  var sql = 'select id, name FROM Star WHERE is_actor = true';
  var params = null;

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    return callback(response.result(200, rows));
  });
};
