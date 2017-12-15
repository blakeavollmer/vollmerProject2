var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM coach;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getByCoachId = function(team_id, callback) {
    var query = 'SELECT c.* FROM coach c ' +
        'WHERE c.coach_id = ?';
    var queryData = [coach_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.getByTeamId = function(team_id, callback) {
    var query = 'SELECT c.* FROM coach c ' +
        'WHERE c.team_id = ?';
    var queryData = [team_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};