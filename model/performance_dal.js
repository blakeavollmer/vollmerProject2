var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM performance;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getAllUserNotNull = function(callback) {
    var query = 'SELECT * FROM player pl ' +
    'LEFT JOIN performance p ON pl.player_id = p.player_id ' +
    'WHERE pl.player_id > 48 AND p.player_id IS NOT NULL';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getAllUser = function(callback) {
    var query = 'SELECT * FROM player pl WHERE pl.player_id > 48' ;

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getByPlayerId = function (player_id, callback){
    var query = 'SELECT pl.player_name, c.champion_name, p.kills, p.deaths, p.assists, p.game_id FROM performance p ' +
    'LEFT JOIN champion c ON p.champion_id = c.champion_id ' +
    'LEFT JOIN player pl ON pl.player_id = p.player_id ' +
    'WHERE p.player_id = ?';

    var queryData = [player_id];

    connection.query(query,queryData, function(err, result){
        callback(err, result);
    })

}

exports.getPlayerGamesByPlayerId = function (player_id, callback){
    var query = 'SELECT pl.player_name, c.champion_name, p.kills, p.deaths, p.assists FROM performance p ' +
        'LEFT JOIN champion c ON p.champion_id = c.champion_id ' +
        'LEFT JOIN player pl ON pl.player_id = p.player_id ' +
        'WHERE p.player_id = ?';

    var queryData = [player_id];

    connection.query(query,queryData, function(err, result){
        callback(err, result);
    })

}

exports.setKDA = function (player_id, callback){
    var query = 'UPDATE player SET kda = fn_kda(?) WHERE player_id = (?)';
    var queryData = [player_id, player_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    })
}

exports.insert = function(params, callback) {


    var query = 'INSERT INTO performance (player_id, kills, deaths, assists, champion_id) VALUES (?)';

    var queryData = [params.player_id, params.kills, params.deaths, params.assists, params.champion_id];

    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });


};
