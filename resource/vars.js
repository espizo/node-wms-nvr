/**
 * Created by zhongkui on 2016/5/12.
 */

'use strict'

global.mongo_url = 'mongodb://sa:Mongodb2016@10.201.253.168:27017/wms';

global.mongo_opt = {
    server: {
        auto_reconnect: true,
        poolSize: 20,
        socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}
    }
}

global.http_header = {
    auth: {
        "user": "admin",    //wowza user
        "pass": "admin",    //wowza pass
        "sendImmediately": false
    },
    headers: {
        "User-Agent": "request/2.72.0",
        "accept": "application/json",
        "Content-Type": "application/json"
    }
}

global.restApi = {
    streamfiles: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/%s/streamfiles',
    incomingstreams: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/%s/instances/_definst_/incomingstreams/%s',
    pushpublish: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/%s/pushpublish/mapentries/%s_%s',
    startupstreams: 'http://localhost:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/startupstreams'
}
