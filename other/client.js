/**
 * Created by zhongkui on 2016/4/26.
 */

var request = require('request')
    , util = require('util')
    , EventEmitter = require('events').EventEmitter;

var options = {
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

var channels = [
    {
        streamName: 'bcad28804da8_01',
        uri: 'rtsp://live:gzydYytLive123@218.201.251.99:5554/h264/ch33/main/av_stream',
        audioTrack: true
    }, {
        streamName: 'bcad28804da8_02',
        uri: 'rtsp://live:gzydYytLive123@218.201.251.99:554/h264/ch34/main/av_stream'
    }, {
        streamName: 'bcad28804da8_03',
        uri: 'rtsp://admin:admin123@218.201.243.247:554/cam/realmonitor?channel=1&subtype=0'
    }, {
        streamName: 'bcad28804da8_04',
        uri: 'rtsp://admin:admin123@218.201.243.247:554/cam/realmonitor?channel=2&subtype=0'
    }/*,
     {
     //appName: 'dss',
     streamName: 'bcad28804da8_05'
     ,uri: 'rtsp://admin:admin123@218.201.243.247:554/cam/realmonitor?channel=3&subtype=0'
     // ,audioTrack: true
     }*/
]
var event = new EventEmitter();

event.on('createStreamfile', function (ch) {
    request.post('http://localhost:9080/dvr/createStreamfile', options, function (err, res, body) {
        if (err)
            console.error(err);
        else {
            console.log('createStreamfile[%s]: %s', ch.streamName, body);

            if (JSON.parse(body).success) {
                event.emit('connectStream', ch);
            }
        }
    }).body = JSON.stringify(ch);
});

event.on('removeStreamfile', function (ch) {
    request.post('http://localhost:9080/dvr/removeStreamfile', options, function (err, res, body) {
        if (err)
            console.error(err);
        else {
            console.log('removeStreamfile[%s]: %s', ch.streamName, body);
        }
    }).body = JSON.stringify(ch);
});

event.on('connectStream', function (ch) {
    request.post('http://localhost:9080/dvr/connectStream', options, function (err, res, body) {
        if (err)
            console.error(err);
        else {
            console.log('connectStream[%s]: %s', ch.streamName, body);
            //test closeStream
            if (JSON.parse(body).success) {
                /*
                 setTimeout(function () {
                 event.emit('closeStream', ch);
                 //event.emit('incomingStreams', ch);
                 }, 5 * 1000);
                 */
            }
        }
    }).body = JSON.stringify(ch);
});

event.on('closeStream', function (ch) {
    request.post('http://localhost:9080/dvr/closeStream', options, function (err, res, body) {
        if (err)
            console.error(err);
        else {
            console.log('closeStream[%s]: %s', ch.streamName, body);
            //test removeStreamfile
            if (JSON.parse(body).success) {
                event.emit('removeStreamfile', ch);
            }
        }
    }).body = JSON.stringify(ch);
});

event.on('incomingStreams', function (ch) {
    request.post('http://localhost:9080/dvr/incomingStreams', options, function (err, res, body) {
        if (err)
            console.error(err);
        else
            console.log('incomingStreams[%s]: %s', ch.streamName, body);
    }).body = JSON.stringify(ch);
});
/*
 channels.forEach(function(ch){
 event.emit('createStreamfile', ch);
 })
 */

/*
var table = {}

var ss = 'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.Address=10.196.230.149\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.DeviceType=ZNNCMP-R202\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.Enable=true\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.Password=12345\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.ProtocolType=Onvif\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.Vendor=Onvif\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.VideoInputs[0].Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_0.VideoInputs[0].ServiceType=AUTO\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.Address=10.196.230.134\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.DeviceType=8004\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.Enable=true\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.Password=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.ProtocolType=Onvif\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.Vendor=Onvif\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.VideoInputs[0].Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_1.VideoInputs[0].ServiceType=AUTO\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.Address=10.196.230.150\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.DeviceType=IPC-KW100W-CE\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.Enable=true\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.Name=PZC4DW868W00649\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.Password=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.ProtocolType=Onvif\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.Vendor=Onvif\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.VideoInputs[0].Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_2.VideoInputs[0].ServiceType=AUTO\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.Address=192.168.0.0\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.DeviceType=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.Enable=false\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.Password=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.ProtocolType=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.Vendor=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.VideoInputs[0].Name=通道四\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_3.VideoInputs[0].ServiceType=AUTO\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.Address=192.168.0.0\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.DeviceType=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.Enable=false\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.Password=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.ProtocolType=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.Vendor=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.VideoInputs[0].Name=通道五\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_4.VideoInputs[0].ServiceType=AUTO\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.Address=192.168.0.0\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.DeviceType=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.Enable=false\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.Password=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.ProtocolType=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.Vendor=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.VideoInputs[0].Name=通道六\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_5.VideoInputs[0].ServiceType=AUTO\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.Address=192.168.0.0\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.DeviceType=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.Enable=false\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.Password=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.ProtocolType=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.Vendor=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.VideoInputs[0].Name=通道七\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_6.VideoInputs[0].ServiceType=AUTO\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.Address=192.168.0.0\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.DeviceType=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.Enable=false\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.HttpPort=80\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.Mac=ff:ff:ff:ff:ff:ff\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.Name=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.Password=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.Port=37777\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.ProtocolType=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.RtspPort=554\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.UserName=admin\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.Vendor=Dahua2\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.VideoInputs[0].ExtraStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.VideoInputs[0].MainStreamUrl=\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.VideoInputs[0].Name=通道八\r\n' +
    'table.RemoteDevice.uuid:System_CONFIG_NETCAMERA_INFO_7.VideoInputs[0].ServiceType=AUTO';

var array = ss.split("\r\n");

array.forEach(function (item) {
    var m = item.match(/System_CONFIG_NETCAMERA_INFO_(.*)\.(.*)=(.*)/, item);
    var idx = util.format('channel_%d', m[1]);
    try {
        if (!table[idx])
            table[idx] = {};

        table[idx][m[2]] = m[3];
    }catch (ex) {}
    //table[idx][m[2]] = '';
    //console.log("[%s] %s=%s", idx, key, val);
});
console.log(table);
//console.log(ss.split("\r\n"));
*/

/*
 function hex2a(hexString) {
 var hex = hexString.toString();//force conversion
 var str = '';
 for (var i = 0; i < hexString.length; i += 2)
 str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
 return str;
 }

 var hexString = 'b4000000200000000700000000000000000000000000000000000000000000003835313031000000000000000000000000000000000000000000000000000000';
 var hexCount = parseInt(hexString.substring(0, 2), 16);
 console.log(hexCount);


 var startPos = parseInt(hexString.slice(2, 10), 16);
 console.log(startPos);
 var dataLen = parseInt(hexString.slice(11, 18), 16);
 console.log(dataLen);

 hexString = hexString.slice(startPos * 2, (startPos + dataLen) * 2);
 console.log(hex2a(hexString));
 */
/*
 var db = new MongoDb('mongodb://sa:Mongodb2016@10.201.253.168:27017/wms', function (err) {
 if (err)
 throw err;

 var hexString = 'b4000000200000000700000000000000000000000000000000000000000000003130303030300000000000000000000000000000000000000000000000000000';
 var hexCount = parseInt(hexString.substring(0, 2), 16);

 var startPos = parseInt(hexString.slice(2, 10), 16);
 var dataLen = parseInt(hexString.slice(11, 18), 16);

 hexString = hexString.substring(startPos * 2, (startPos + + dataLen - 1) * 2);

 var regId = hex2a(hexString);

 console.log(regId+'<'+ typeof  regId);

 db.checkWhitelistByRegId(regId, function (exists) {
 console.log('exists: %s  registerId: %s', exists, regId);
 });
 });
 */
var ss = '314b303341423950414d505053394c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

console.log(ss.replace(/00+?$/, ''));

channels.forEach(function(item){
    console.log(item.uri);
    if(/^rtsp:\/\/([A-Za-z0-9]+:[A-Za-z0-9]+@([0-9]?\d)+\.([0-9]?\d)+\.([0-9]?\d)+\.([0-9]?\d)+:([0-9]?\d)+\/+?)/.test(item.uri)){
        console.log('ok');
    }
});