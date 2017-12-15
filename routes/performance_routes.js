var express = require('express');
var router = express.Router();
var team_dal = require('../model/player_dal');
var series_dal = require('../model/series_dal');
var performance_dal = require('../model/performance_dal');
var champion_dal = require('../model/champion_dal');
var player_dal = require('../model/player_dal');


router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('team/teamViewAll', { 'result':result });
        }
    });

});



router.get('/', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.getById(req.query.team_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('team/teamViewById', {'result': result});
            }
        });
    }
});

router.get('/userAll', function(req, res) {

        performance_dal.getAllUserNotNull(function (err, result) {
            if (result.length == 0){

                    res.render('performance/userGameViewAll', {'result': result});

            }
            else {
                var player_id = result[0].player_id;
                performance_dal.getByPlayerId(player_id, function (err, result1) {
                    var team_id = result[0].team_id;
                    player_dal.getTeamByPlayerId(team_id, function (err, result2) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.render('performance/userGameViewAll', {
                                'result': result,
                                'team': result2,
                                'champion': result1
                            });
                        }

                    })
                })
            }
        });






});




router.get('/add', function(req, res){
    performance_dal.getAllUser(function(err,result) {
        champion_dal.getAll(function(err, result1) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('performance/userGameAdd', {'result': result, 'champion': result1});
            }
        })
    });
});

router.get('/insert', function(req, res){
    if(req.query.player_id == null) {
        res.send('A player name must be provided.');
    }
    else if(req.query.kills == null) {
        res.send('A value for kills must be provided.');
    }
    else if(req.query.deaths == null) {
        res.send('A value for deaths must be provided.');
    }
    else if(req.query.assists == null) {
        res.send('A value for assists must be provided.');
    }
    else if(req.query.champion_id == null) {
        res.send('A champion must be provided');
    }

    else {
            performance_dal.insert(req.query, function (err, result) {
                if (err) {
                    console.log(err)
                    res.send(err);
                }
                else {
                    res.send('Success!');
                }
            });

    }
});

module.exports = router;