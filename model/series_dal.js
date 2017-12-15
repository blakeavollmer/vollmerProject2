var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM series s ' +
        'ORDER BY s.bracket';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getAvgKill = function(callback){
    var query = 'SELECT * FROM player_kill_view';

    connection.query(query,function (err, result) {
        callback(err, result);
    })
}