/**
 * Created by zhongkui on 2016/5/12.
 */

var request = require('request'),
    vars = require('./../resource/vars');

var streams = [
     {
        streamName:"571d8a57859a25800c690169_1",
        uri: "rtsp://live:gzydYytLive123@218.201.251.99:5554/h264/ch33/main/av_stream"
     },{
        streamName:"571d8a57859a25800c690169_2",
        uri: "rtsp://live:gzydYytLive123@218.201.251.99:5554/h264/ch34/main/av_stream"
    },{
        streamName:"571d8a57859a25800c690169_3",
        uri: "rtsp://live:gzydYytLive123@218.201.251.99:5554/h264/ch35/main/av_stream"
    },{
        streamName:"571d8a57859a25800c690169_4",
        uri: "rtsp://live:gzydYytLive123@218.201.251.99:5554/h264/ch36/main/av_stream"
    },{
        streamName:"572b1d3a984765081ff48218_1",
        uri:"rtsp://admin:admin@218.201.251.99:6554/cam/realmonitor?channel=1&subtype=0"
    },{
        streamName:"572b1d3a984765081ff48218_2",
        uri:"rtsp://admin:admin@218.201.251.99:6554/cam/realmonitor?channel=2&subtype=0"
    },{
        streamName:"572b1d3a984765081ff48218_3",
        uri:"rtsp://admin:admin@218.201.251.99:6554/cam/realmonitor?channel=3&subtype=0"
    },{
        streamName:"572b1d3a984765081ff48218_4",
        uri:"rtsp://admin:admin@218.201.251.99:6554/cam/realmonitor?channel=4&subtype=0"
    },{
        streamName:" 572819b89789e1301e9bf6ab_1",
        uri:"rtsp://admin:admin123@218.201.243.247:554/cam/realmonitor?channel=1&subtype=0"
    },{
        streamName:" 572819b89789e1301e9bf6ab_2",
        uri:"rtsp://admin:admin123@218.201.243.247:554/cam/realmonitor?channel=2&subtype=0"
    },{
        streamName:" 572819b89789e1301e9bf6ab_3",
        uri:"rtsp://admin:admin123@218.201.243.247:554/cam/realmonitor?channel=3&subtype=0"
    },{
        streamName:" 572819b89789e1301e9bf6ab_4",
        uri:"rtsp://admin:admin123@218.201.243.247:554/cam/realmonitor?channel=4&subtype=0"
    }
]

if (process.argv[2] == 'publishStream' || process.argv[2] == 'releaseStream') {
    request.post('http://localhost:9090/nvr/'.concat(process.argv[2]), http_header, function (err, res, body) {
        if (err)
            console.error(err)
        else
            console.log(body);
    }).body = JSON.stringify(streams);
} else if (process.argv[2] == 'status') {
    streams.forEach(function(ch){
        request.get('http://localhost:9090/nvr/'.concat(ch.streamName,'/status'), http_header, function(err, res, body){
            if (err)
                console.error(err)
            else
                console.log(body);
        })
    })
}