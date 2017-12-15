var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM champion ORDER BY champion.champion_name';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(champion_id, callback){
    var query = 'SELECT c.* FROM champion c '+
        'WHERE c.champion_id = ?' ;

    var queryData = [champion_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback) {


    var query = 'INSERT INTO champion (champion_name, role) VALUES (?)';

    var queryData = [params.champion_name, params.role];

    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });


};