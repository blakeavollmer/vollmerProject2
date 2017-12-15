var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM player p ' +
    'ORDER BY p.player_name';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getByPlayerId = function(player_id, callback) {
    var query = 'SELECT p.* FROM player p ' +
        'WHERE p.player_id = ?';
    var queryData = [player_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.getTeamByPlayerId = function(team_id, callback){
    var query = 'SELECT t.team_name FROM team t ' +
        'WHERE t.team_id = ?' ;
    var queryData = [team_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    })
}

exports.getByTeamId = function(team_id, callback) {
    var query = 'SELECT p.* FROM player p ' +
        'WHERE p.team_id = ?';
    var queryData = [team_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {


    var query = 'INSERT INTO player (player_name, team_id, position, nationality) VALUES (?)';

    var queryData = [params.player_name, params.team_id, params.position, params.nationality];

    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });


};

exports.delete = function(player_id, callback) {
    var query = 'DELETE FROM player WHERE player_id = ?';
    var queryData = [player_id];
    var query1 = 'DELETE FROM performance WHERE player_id = ?';


    connection.query(query1, queryData, function(err, result){
        connection.query(query, queryData, function(err, result){
            callback(err, result);
        })
    })

};