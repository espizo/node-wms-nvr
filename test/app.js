/**
 * Created by zhongkui on 2016/5/12.
 */

var request = require('request'),
    vars = require('./../resource/vars');

var streams = [
     {
        streamName:"bcad28804da8_01",
        uri: "rtsp://admin:admin@218.201.251.99:6554/cam/realmonitor?channel=1&subtype=0"
         //,audioTrack: true
         //,transportMode: 'tcp'
         //,autoStartup: false
     },{
        streamName:"bcad28804da8_02",
        uri:"rtsp://admin:admin@218.201.251.99:6554/cam/realmonitor?channel=2&subtype=0"
     }
]

if (process.argv[2] == 'publishStream' || process.argv[2] == 'releaseStream') {
    request.post('http://localhost:9080/dss/'.concat(process.argv[2]), http_header, function (err, res, body) {
        if (err)
            console.error(err)
        else
            console.log(body);
    }).body = JSON.stringify(streams);
} else if (process.argv[2] == 'status') {
    streams.forEach(function(ch){
        request.get('http://localhost:9080/dss/'.concat(ch.streamName,'/status'), http_header, function(err, res, body){
            if (err)
                console.error(err)
            else
                console.log(body);
        })
    })
}