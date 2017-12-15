var express = require('express');
var router = express.Router();
var player_dal = require('../model/player_dal');
var performance_dal = require('../model/performance_dal');
var team_dal = require('../model/team_dal');
var series_dal = require('../model/series_dal');


router.get('/all', function(req, res) {
    series_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('series/seriesViewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.series_id == null) {
        res.send('series_id is null');
    }
    else {
        player_dal.getByPlayerId(req.query.player_id, function(err,result) {
            var team_id = result[0].team_id;
            performance_dal.getByPlayerId(req.query.player_id, function(err, result1){
                player_dal.getTeamByPlayerId(team_id, function(err, result2){
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('series/seriesViewById', {'result': result1, 'player': result, 'team': result2});
                    }
                })
            })

        });
    }
});

router.get('/add', function(req, res){
    series_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('series/seriesAdd', {'series': result});
        }
    });
});

router.get('/insert', function(req, res){
    if(req.query.player_name == null) {
        res.send('A player name must be provided.');
    }
    else if(req.query.team_id == null) {
        res.send('A team must be provided.');
    }
    else if(req.query.position == null) {
        res.send('A position must be provided.');
    }
    else if(req.query.nationality == null) {
        res.send('A nationality must be provided.');
    }

    else {
        player_dal.insert(req.query, function(err,result) {
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

router.get('/playerAvgKill', function(req,res){
    series_dal.getAvgKill(function(err, result){
        if(err){
            res.send(err);
        }
        else
        {
            res.render('series/playerAverageKills', {'result': result});
        }
    })

})

module.exports = router;