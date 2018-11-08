var database = require('../util/databaseHelper.js');
var response = require('../util/responseHelper.js');

var MovieCtrl = {};
module.exports = MovieCtrl;


MovieCtrl.readBySlug = function(id, callback){
  var sql = 'select id, title FROM Movie WHERE id = ? ';
  var params = [id];

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    console.log(rows[0]);
    return callback(response.result(200, rows[0]));
  });
};


//GET /movies - lista todos os filmes
MovieCtrl.readAll = function(callback){

  var sql = 'select id, title FROM Movie';
  var params = null;

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    return callback(response.result(200, rows));
  });
};
