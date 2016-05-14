# PublishStream
###
    POST http://<WOWZA_HOST>:9090/<APP_NAME>/publishStream
Request date:
###
    [
        {
            "streamName":"bcad28804da8_01",                                          //(required)
            "uri":"rtsp://user:pass@xx.xx.xx.xx:554/h264/ch33/main/av_stream",       //(required)
            "audioTrack": false,                                                     //(optional default: false)
            "transportMode": "tcp",                                                  //(optional value: udp or tcp)
            "autoStartup": true                                                      //(optional default: true)
        },{
            "streamName":"bcad28804da8_02",                                          //(required)
            "uri":"rtsp://user:pass@xx.xx.xx.xx:554/h264/ch34/main/av_stream"        //(required)
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
        "data":{
            "streamName":"bcad28804da8_02",
             "uri":"rtsp://user:pass@xx.xx.xx.xx/h264/ch34/main/av_stream"
        }
    }

# ReleaseStream
###
    POST http://<WOWZA_HOST>:9090/<APP_NAME>/releaseStream
Request date:
###
    [
        {
            "streamName":"bcad28804da8_01",                                     //(required)
            "uri":null                                                          //(optional)
        },{
            "streamName":"bcad28804da8_02",                                     //(required)
            "uri":null                                                          //(optional)
        }
    ]
Response data:
###
    {"success":true, "message":"","data":null}
or
###
    @See StartStreams Response data

# StreamStatus
###
    GET http://<WOWZA_HOST>:9090/<APP_NAME>/<STREAM_NAME>/status
Example:
###
    http://localhost:9080/nvr/bcad28804da8_01/status
Response data:
###
    {
        "success":true,
        "message":"",
        "data": {
            "streamName":"bcad28804da8_01",
            "isConnected":true
        }
    }