/**
 * Created by zhongkui on 2016/5/12.
 */

'use strict'

var request = require('request'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    async = require('async');

var edges = [{
    "host": "10.201.253.136",
    "port": 1935,
    "userName": "pushUser",
    "password": "wowza2014"
}, {
    "host": "10.201.253.137",
    "port": 1935,
    "userName": "pushUser",
    "password": "wowza2014"
}]

var createStreamfile = function (app, ch, cb) {
    if (!ch.streamName)
        return cb(new Error('streamName not exists'));

    if (!ch.uri)
        return cb(new Error('uri not exists'))
    else if (!/^rtsp:\/\/([A-Za-z0-9]+:[A-Za-z0-9]+@)?([0-9]?\d)+\.([0-9]?\d)+\.([0-9]?\d)+\.([0-9]?\d)+:([0-9]?\d)+(\/.*)?$/.test(ch.uri))
        return cb(new Error('uri valid error'));

    var uri = util.format(restApi.streamfiles, app);
    var querystring = util.format("connectAppName=%s&appInstance=_definst_&mediaCasterType=rtp", app);
    request.post(uri.concat('/', ch.streamName), http_header, function (err, res, body) {
        if (err)
            cb(err)
        else {
            try {
                if (JSON.parse(body).success)
                    updateStreamfile(app, ch, cb)
                else
                    removeStreamfile(app, ch, function (err) {
                        if (err)
                            cb(err)
                        else
                            createStreamfile(app, ch, cb)
                    })
            } catch (ex) {
                cb(ex)
            }
        }
    }).body = JSON.stringify({
        "streamFiles": [
            {
                "id": querystring,
                "href": uri.concat('/', querystring)
            }
        ]
    })
}

var removeStreamfile = function (app, ch, cb) {
    var uri = util.format(restApi.streamfiles.concat('/%s'), app, ch.streamName);
    request.delete(uri, http_header, function (err, res, body) {
        if (err)
            cb(err)
        else
            cb(null)
    })
}

var updateStreamfile = function (app, ch, cb) {
    var uri = util.format(restApi.streamfiles.concat('/%s/adv'), app, ch.streamName);
    var settings = [
        {
            "enabled": true,
            "canRemove": true,
            "name": "uri",
            "value": ch.uri,
            "defaultValue": null,
            "type": "String",
            "sectionName": "Common",
            "section": null,
            "documented": true
        }, {
            "enabled": true,
            "canRemove": true,
            "name": "rtspStreamAudioTrack",
            "value": ch.audioTrack || false,
            "defaultValue": true,
            "type": "Boolean",
            "sectionName": "Common",
            "section": null,
            "documented": true
        }
    ]

    if (!(typeof(ch.transportMode) == 'undefined')) {
        settings.push({
            "enabled": true,
            "canRemove": true,
            "name": "rtpTransportMode",
            "value": ch.transportMode,
            "defaultValue": "udp",
            "type": "String",
            "sectionName": "Common",
            "section": null,
            "documented": true
        })
    }

    request.put(uri, http_header, function (err, res, body) {
        if (err)
            cb(err, ch)
        else
            cb(null, ch)
    }).body = JSON.stringify({
        "advancedSettings": settings
    })
}

var connectStream = function (app, ch, cb) {
    var uri = util.format(restApi.streamfiles.concat('/%s/actions/connect?connectAppName=%s&appInstance=_definst_&mediaCasterType=rtp'), app, ch.streamName, app);
    request.put(uri, http_header, function (err, res, body) {
        if (err)
            cb(err)
        else {
            try {
                if (JSON.parse(body).success)
                    cb(null)
                else
                    resetStream(app, ch, cb)
            } catch (ex) {
                cb(ex)
            }
        }
    })
}

var disconnectStream = function (app, ch, cb) {
    if (!ch.streamName)
        return cb(new Error('streamName not exists'));

    var uri = util.format(restApi.incomingstreams.concat('/actions/disconnectStream'), app, ch.streamName.concat('.stream'));
    request.put(uri, http_header, function (err, res, body) {
        if (err)
            cb(err)
        else
            cb(null)
    })
}

var resetStream = function (app, ch, cb) {
    var uri = util.format(restApi.incomingstreams.concat('/actions/resetStream'), app, ch.streamName.concat('.stream'));
    request.put(uri, http_header, function (err, res, body) {
        if (err)
            cb(err)
        else
            cb(null)
    })
}

var createStreamTarget = function (app, ch, cb) {
    var len = edges.length;
    edges.forEach(function (target) {
        async.series({
            s1: function(done){
                var uri = util.format(restApi.pushpublish, app, ch.streamName, target.host);
                target.profile = 'rtmp';
                target.sourceStreamName = util.format('%s.stream', ch.streamName);
                target.application = app;
                target.appInstance = '_definst_';
                target.streamName = ch.streamName;

                request.post(uri, http_header, function (err, res, body) {
                    if (err)
                        done(err)
                    else
                        deno(null)
                }).body = JSON.stringify(target)
            }
        },function(err, result){
            if(--len == 0)
                cb(null)
        })
    })
}

var removeStreamTarget = function (app, ch, cb) {
    var len = edges.length;
    edges.forEach(function (target) {
        async.series({
            s1: function(done){
                var uri = util.format(restApi.pushpublish, app, ch.streamName, target.host);
                request.delete(uri, http_header, function (err, res, body) {
                    if (err)
                        cb(err)
                    else
                        cb(null)
                })
            }
        },function(err, result){
            if(--len == 0)
                cb(null)
        })
    })
}

var addStartupStream = function (app, ch, cb) {
    request.post(restApi.startupstreams, http_header, function (err, res, body) {
        if (err)
            cb(err)
        else
            cb(null)
    }).body = JSON.stringify({
        "serverName": "_defaultServer_",
        "appName": app,
        "instance": "_definst_",
        "streamName": ch.streamName.concat('.stream'),
        "mediaCasterType": "rtp"
    })
}

var removeStartupStream = function (app, ch, cb) {
    var uri = util.format(restApi.startupstreams.concat('/applications/%s/instances/_definst_/streams/%s'), app, ch.streamName.concat('.stream'));
    request.delete(uri, http_header, function (err, res, body) {
        if (err)
            cb(err)
        else
            cb(null)
    })
}

function WOWZA() {
    EventEmitter.call(this);
}

util.inherits(WOWZA, EventEmitter);
module.exports = new WOWZA();

WOWZA.prototype.addStreams = function (app, streams, cb) {
    var len = streams.length, _errors = [];
    streams.forEach(function(ch) {
        async.series({
            s1: function(done) {
                createStreamfile(app, ch, done)
            },
            s2: function(done) {
                connectStream(app, ch, done)
            },
            s3: function(done) {
                createStreamTarget(app, ch, done)
            },
            s4: function(done) {
                addStartupStream(app, ch, done)
            }
        },function(err, result){
            if(err)
                _errors.push({streamName: ch.streamName || null, uri: ch.uri || null, errmsg: err.message})

            if (--len === 0)
                cb(_errors)
        })
    })
}

WOWZA.prototype.removeStreams = function (app, streams, cb) {
    var len = streams.length, _errors = [];
    streams.forEach(function (ch) {
        async.series({
            s1: function(done) {
                disconnectStream(app, ch, done)
            },
            s2: function(done) {
                removeStreamfile(app, ch, done)
            },
            s3: function(done) {
                removeStreamTarget(app, ch, done)
            },
            s4: function(done) {
                removeStartupStream(app, ch, done)
            }
        },function(err, result){
            if(err)
                _errors.push({streamName: ch.streamName || null, uri: ch.uri || null, errmsg: err.message})

            if (--len == 0)
                cb(_errors)
        })
    })
}

WOWZA.prototype.streamStatus = function (app, streams, cb) {
    var len = streams.length, _data=[];
    streams.forEach(function(ch){
        if(ch.streamName) {
            async.series({
                s1: function(done) {
                    var uri = util.format(restApi.incomingstreams, app, ch.streamName.concat('.stream'));
                    request.get(uri, http_header, function (err, res, body) {
                        if(err)
                            done(null, {streamName: ch.streamName, isConnected: false})
                        else {
                            var obj = JSON.parse(body)
                            done(null, {streamName: ch.streamName, isConnected: obj.code == 404 ? false : obj.isConnected})
                        }
                    })
                }
            },function(err, result){
                if(result)
                    _data.push(result.s1)

                if (--len == 0)
                    cb(_data)
            })
        } else len--
    })
}
