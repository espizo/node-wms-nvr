# PublishStream
###
    POST http://<WOWZA_HOST>:9090/<APP_NAME>/publishStream
Request data:
###
    [
        {
            "streamName":"bcad28804da8_01",                                      //(required)
            "uri":"rtsp://user:pass@xx.xx.xx.xx:554/h264/ch33/main/av_stream",   //(required only PublishStream, other optional)
            "audioTrack": false,                                                 //(optional default: false)
            "transportMode": "tcp"                                               //(optional value: udp or tcp)
        },{
            "streamName":"bcad28804da8_02",                                      //(required)
            "uri":"rtsp://user:pass@xx.xx.xx.xx:554/h264/ch34/main/av_stream"    //(required)
        }
    ]
Response data:
###
    {"success":true, "message":"","data":null}
or
###
    {
        "success":false,
        "message":"request data uri valid error"",
        "data":[
            {
                "streamName":null,
                "uri":"rtsp://user:pass@xx.xx.xx.xx:554/h264/ch35/main/av_stream",
                "errmsg":"streamName not exists"
            },{
                "streamName":"571d8a57859a25800c690169_4",
                "uri":"rtsp://user:pass@xx.xx.xx.xx/h264/ch36/main/av_stream",
                "errmsg":"uri valid error"
            }
        ]
    }

# ReleaseStream
###
    POST http://<WOWZA_HOST>:9090/<APP_NAME>/releaseStream
Request date:
###
    @See PublishStream Request data
Response data:
    @See PublishStream Response data

# StreamStatus
###
    POST http://<WOWZA_HOST>:9090/<APP_NAME>/streamStatus
Request date:
###
    @See PublishStream Request data
Response data:
###
    {
        "success":true,
        "message":"",
        "data":[
            {
                "streamName":"572b1d3a984765081ff48218_2",
                "isConnected":true
            },{
                "streamName":"571d8a57859a25800c690169_2",
                "isConnected":false
            }
        ]
    }