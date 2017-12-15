var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM team;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(team_id, callback) {
    var query = 'SELECT t.* FROM team t ' +
        'WHERE t.team_id = ?';
    var queryData = [team_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

            callback(err, result);
    });
};

exports.delete = function(team_id, callback) {
    var query = 'DELETE FROM team WHERE team_id = ?';
    var queryData = [team_id];



        connection.query(query, queryData, function(err, result){
            callback(err, result);
        })


};

exports.insert = function(params, callback) {


    var query = 'INSERT INTO team (team_name, league_name) VALUES (?)';

    var queryData = [params.team_name, params.league_name];

    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });


};