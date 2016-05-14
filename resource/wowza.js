/**
 * Created by zhongkui on 2016/5/12.
 */

'use strict'

var request = require('request'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    linux = require('os').platform() === 'linux',
    version = '1461141426000';

var restApi = {
    streamfiles: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/%s/streamfiles',
    incomingstreams: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/%s/instances/_definst_/incomingstreams/%s',
    pushpublish: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/%s/pushpublish/mapentries',
    startupstreams: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/startupstreams'
}

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
        return cb(new Error('request data streamName not exists'), ch);

    if (!ch.uri)
        return cb(new Error('request data uri not exists'), ch)
    else if (!/^rtsp:\/\/(([A-Za-z0-9]+:[A-Za-z0-9]+@)?([0-9]?\d)+\.([0-9]?\d)+\.([0-9]?\d)+\.([0-9]?\d)+:([0-9]?\d)+\/+?)/.test(ch.uri))
        return cb(new Error('request data uri valid error'), ch);

    var uri = util.format(restApi.streamfiles, app);
    var querystring = util.format("connectAppName=%s&appInstance=_definst_&mediaCasterType=rtp", app);
    request.post(uri.concat('/', ch.streamName), http_header, function (err, res, body) {
        if (err)
            cb(err, ch)
        else {
            try {
                if (JSON.parse(body).success)
                    updateStreamfile(app, ch, cb)
                else
                    removeStreamfile(app, ch, function (err, ch) {
                        if (err)
                            cb(err, ch)
                        else
                            createStreamfile(app, ch, cb)
                    })
            } catch (ex) {
                cb(ex, ch)
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
            cb(err, ch)
        else
            cb(null, ch)
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
        "version": version,
        "advancedSettings": settings
    })
}

var connectStream = function (app, ch, cb) {
    var uri = util.format(restApi.streamfiles.concat('/%s/actions/connect?connectAppName=%s&appInstance=_definst_&mediaCasterType=rtp'), app, ch.streamName, app);
    request.put(uri, http_header, function (err, res, body) {
        if (err)
            cb(err, ch)
        else {
            try {
                if (JSON.parse(body).success)
                    cb(null, ch)
                else
                    resetStream(app, ch, cb)
            } catch (ex) {
                cb(ex, ch)
            }
        }
    })
}

var disconnectStream = function (app, ch, cb) {
    var uri = util.format(restApi.incomingstreams.concat('/actions/disconnectStream'), app, ch.streamName.concat('.stream'));
    request.put(uri, http_header, function (err, res, body) {
        if (err)
            cb(err, ch)
        else
            cb(null, ch)
    })
}

var resetStream = function (app, ch, cb) {
    var uri = util.format(restApi.incomingstreams.concat('/actions/resetStream'), app, ch.streamName.concat('.stream'));
    request.put(uri, http_header, function (err, res, body) {
        if (err)
            cb(err, ch)
        else
            cb(null, ch)
    })
}

var createStreamTarget = function (app, ch, cb) {
    var uri = util.format(restApi.pushpublish, app);
    edges.forEach(function (target) {
        target.profile = 'rtmp';
        target.sourceStreamName = util.format('%s.stream', ch.streamName);
        target.entryName = util.format('%s_%s', ch.streamName, target.host);
        target.application = app;
        target.appInstance = '_definst_';
        target.streamName = ch.streamName;

        request.post(uri, http_header, function (err, res, body) {
            if (err)
                cb(err, ch)
            else
                cb(null, ch)
        }).body = JSON.stringify(target)
    })
}

var removeStreamTarget = function (app, ch, cb) {
    edges.forEach(function (target) {
        var uri = util.format(restApi.pushpublish.concat('/%s_%s'), app, ch.streamName, target.host);
        request.delete(uri, http_header, function (err, res, body) {
            if (err)
                cb(err, ch)
            else
                cb(null, ch)
        })
    })
}

var addStartupStream = function (app, ch, cb) {
    request.post(restApi.startupstreams, http_header, function (err, res, body) {
        if (err)
            cb(err, ch)
        else
            cb(null, ch)
    }).body = JSON.stringify({
        "version": version,
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
            cb(err, ch)
        else
            cb(null, ch)
    })
}

function WOWZA() {
    EventEmitter.call(this);
}

util.inherits(WOWZA, EventEmitter);
module.exports = new WOWZA();

WOWZA.prototype.addStreams = function (app, streams, cb) {
    streams.forEach(function (ch) {
        createStreamfile(app, ch, function (err, ch) {
            if (err)
                cb(err, ch)
            else
                connectStream(app, ch, function (err, ch) {
                    if (err)
                        cb(err, ch)
                    else {
                        createStreamTarget(app, ch, function (err, ch) {
                            if (err)
                                cb(err, ch)
                        })

                        if (typeof(ch.autoStartup) == 'undefined' || ch.autoStartup) {
                            addStartupStream(app, ch, function (err, ch) {
                                if (err)
                                    cb(err, ch)
                            })
                        }

                        cb(null)
                    }
                })
        })
    })
}

WOWZA.prototype.removeStreams = function (app, streams, cb) {
    streams.forEach(function (ch) {
        disconnectStream(app, ch, function (err, ch) {
            if (err)
                cb(err, ch)
            else
                removeStreamfile(app, ch, function (err, ch) {
                    if (err)
                        cb(err, ch)
                    else {
                        removeStreamTarget(app, ch, function (err, ch) {
                            if (err)
                                cb(err, ch)
                        })

                        if (typeof(ch.autoStartup) == 'undefined' || ch.autoStartup) {
                            removeStartupStream(app, ch, function (err, ch) {
                                if (err)
                                    cb(err, ch)
                            })
                        }

                        cb(null)
                    }
                })
        })
    })
}

WOWZA.prototype.streamStatus = function (app, stream, cb) {
    var uri = util.format(restApi.incomingstreams, app, stream.concat('.stream'));
    request.get(uri, http_header, function (err, res, body) {
        if (err)
            cb(err)
        else {
            if (res.statusCode == 404)
                cb(null, {streamName: stream, isConnected: false})
            else {
                var obj = JSON.parse(body)
                cb(null, {streamName: obj.name.split('.')[0], isConnected: obj.isConnected})
            }
        }
    })
}
