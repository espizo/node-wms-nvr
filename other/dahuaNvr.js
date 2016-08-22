/**
 * Created by zhongkui on 2016/5/6.
 */
var request = require('request')
    , util = require('util')
    , hex_md5 = require('./hex_md5')
    , EventEmitter = require('events').EventEmitter;

var host = 'http://10.196.230.147';

//request.debug = true;

var options = {
    auth: {
        "user": "admin",    //nvr user
        "pass": "admin",    //nvr pass
        "sendImmediately": false
    },
    headers: {
        "User-Agent": "request/2.72.0",
        "accept": "text/plain",
        "Content-Type": "text/plain"
    }
}

var event = new EventEmitter();

event.on('ptzStart', function(ch, code, cb){
    request(util.format('%s/cgi-bin/ptz.cgi?action=start&channel=%d&code=%s&arg1=5&arg2=0&arg3=0', host, ch, code), options, function(err, res, body){
        if(err)
            cb(err)
        else {
            if (res.statusCode === 200)
                console.log('ptzStart:' + body);
            cb(null, ch, code);
        }
    });
});

event.on('ptzStop', function(ch, code, cb){
    request(util.format('%s/cgi-bin/ptz.cgi?action=stop&channel=%d&code=%s&arg1=5&arg2=0&arg3=0', host, ch, code), options, function(err, res, body){
        if(err)
            cb(err)
        else {
            if (res.statusCode === 200)
                console.log('ptzStop:' + body);
            cb(null, ch);
        }
    });
});

request(util.format('%s/cgi-bin/configManager.cgi?action=getConfig&name=RemoteDevice', host), options, function(err, res, body){
    if(err)
        console.error(err)
    else {
        var table = {};
        if (res.statusCode === 200) {
            var array = body.split("\r\n");
            array.forEach(function (item) {
                var m = item.match(/System_CONFIG_NETCAMERA_INFO_(.*)\.(.*)=(.*)/, item);
                try {
                    var ch = parseInt(m[1]);
                    if (!table[ch])
                        table[ch] = {};

                    table[ch][m[2]] = m[3];
                }catch (ex) {}
            });
        }
        console.log(table);
    }
});


/*
event.emit('ptzStart', 0, 'Right', function(err, ch, code){
    console
    if(!err) {
        setTimeout(function(){
            event.emit('ptzStop', ch, 'Right', function(err, ch){
                if(!err) {
                    event.emit('ptzStart', ch, 'Up', function(err, ch, code) {
                        setTimeout(function(){
                            event.emit('ptzStop', ch, 'Up', function(err, ch) {});
                        }, 5000);
                    })
                }
            });
        }, 10000);
    }
});
    */