/**
 * Created by zhongkui on 2016/5/12.
 */

var net = require('net'),
    express = require('express'),
    vars = require('./resource/vars'),
    wowza = require('./resource/wowza'),
    hik = require('./nvr/hik'),
    dahua = require('./nvr/dahua');

'use strict'

var response = function(err, data) {
    if(err)
        return JSON.stringify({'success': false, 'message': err.message, 'data': data})
    else
        return JSON.stringify({'success':true, 'message': '', 'data':null})
}

//Hik IPServer & Dahua Active-registration
var server = net.createServer(function (socket) {
    var remote_addr = socket.remoteAddress.match(/::ffff:(.*)/)[1].trim();

    socket.on('data', function (data) {
        var data = data.toString('hex');
        var firstByte = data.slice(0, 2).toLowerCase();
        if (firstByte === 'b4')
            dahua.emit('register', remote_addr, data);
        else
            hik.emit('register', remote_addr, data);
    })

    socket.on('close', function (err) {
    })

    socket.on('error', function (err) {
    })
}).listen(7070);
console.log('TCP listening on 7070');

var app = express().use(function (req, res, next) {
    var auth;
    if (req.headers.authorization) {
        auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }

    if (!auth || auth[0] !== http_header.auth.user || auth[1] !== http_header.auth.pass) {
        res.writeHead(401, {'Content-Type':'application/json', 'WWW-Authenticate': 'Basic realm="WowzaRealmName"'});
        res.end(JSON.stringify({'success': false, 'message': 'Unauthorized', 'data': null}));
    } else {
        next();
    }
});
app.listen(9090);
console.log('HTTP listening on 9090');

app.post('/:app/publishStream',function(req, res){
    var app = req.params.app;
    req.on('data', function (data){
        try {
            var streams = JSON.parse(data.toString());
            wowza.addStreams(app, streams, function(err, data) {
                res.end(response(err, data))
            })
        } catch (ex) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({'success': false, 'message': ex.message, 'data': null}));
        }
    });
});

app.post('/:app/releaseStream',function(req, res){
    var app = req.params.app;
    req.on('data', function (data){
        try {
            var streams = JSON.parse(data.toString());
            wowza.removeStreams(app, streams, function(err, data) {
                res.end(response(err, data))
            })
        } catch (ex) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({'success': false, 'message': ex.message, 'data': null}));
        }
    });
});

app.get('/:app/:stream/status',function(req, res){
    wowza.streamStatus(req.params.app, req.params.stream, function(err, data) {
            if(err) {
                res.writeHead(500, {'Content-Type': 'text/json'})
                res.end(JSON.stringify({'success': false, 'message': err.message, 'data': null}))
            } else
                res.end(JSON.stringify({'success': true, 'message': '', 'data': data}))
    })
})