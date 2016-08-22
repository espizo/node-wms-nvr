/**
 * Created by zhongkui on 2016/5/4.
 */

var request = require('request')
    ,util = require('util')
    , xml2js = require('xml2js')
    ,EventEmitter = require('events').EventEmitter;

var host = 'http://10.196.11.236:8088';

var options = {
    auth: {
        "user": "admin",    //wowza user
        "pass": "hik12345",    //wowza pass
        "sendImmediately": false
    },
    headers: {
        "User-Agent": "request/2.72.0",
        "accept": "application/x-www-form-urlencoded; charset=UTF-8",
        "Content-Type": "application/xml; charset=UTF-8"
    }
}

var event = new EventEmitter();

event.on('trunLeft', function(ch, cb){
    request.put(util.format('%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%d/continuous', host, ch), options, function(err, res, body){
        if(err)
            cb(err)
        else
            cb(null,body);
    }).body = '<PTZData><pan>60</pan><tilt>0</tilt></PTZData>';
});

event.on('stop', function(ch, cb){
    request.put(util.format('%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%d/continuous', host, ch), options, function(err, res, body){
        if(err)
            cb(err)
        else
            cb(null,body);
    }).body = '<PTZData><pan>0</pan><tilt>0</tilt></PTZData>';
});

//ptz test
/*
event.emit('trunLeft', 1, function(err, body){
    if(err)
        util.error(err);
    else {
        console.log(body);
        setTimeout(function(){
            event.emit('stop', 1, function(err, body){
                console.log(body);
            })
        }, 100);
    }

});
*/

request(util.format('%s/ISAPI/ContentMgmt/InputProxy/channels', host), options, function(err, res, body){
    if(err)
        console.error(err)
    else {
       xml2js.parseString(body, {explicitArray : false, ignoreAttrs : true}, function(err, json){
            if (err)
                console.error(err)
            else {
                json.InputProxyChannelList.InputProxyChannel.forEach(function (item) {
                    console.log(item);
                })
            }
       });
    }
});