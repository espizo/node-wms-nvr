# StartStreams
###
    POST http://[WOWZA_HOST]:9080/[APP_NAME]/startStreams</br>
Request date:
###
    [
        {
            "streamName":"bcad28804da8_01",                                 //(required)
            "uri":"rtsp://user:pass@xx.xx.xx.xx/h264/ch33/main/av_stream"   //(required)
        },{
            "streamName":"bcad28804da8_02",                                 //(required)
            "uri":"rtsp://user:pass@xx.xx.xx.xx/h264/ch34/main/av_stream"   //(required)
        }
    ]
Response data:
###
    {"success":true, "message":"","data":null}
or
###
    {"success":false, "message":"","data":{"bcad28804da8_01":"errmsg","bcad28804da8_02":\"errmsg\"}}

# StopStreams
###
    POST http://[WOWZA_HOST]:9080/[APP_NAME]/stopStreams</br>
Request date:
###
    [
        {
            "streamName":"bcad28804da8_01",                                 //(required)
            "uri":null                                                      //(optional)
        },{
            "streamName":"bcad28804da8_02",                                 //(required)
            "uri":null                                                      //(optional)
        }
    ]
Response data:
###
    {"success":true, "message":"","data":null}
or
###
    {"success":false, "message":"","data":{"bcad28804da8_01":"errmsg","bcad28804da8_02":\"errmsg\"}}

# StreamStatus
###
    POST http://[WOWZA_HOST]:9080/[APP_NAME]/streamStatus</br>
Request date:
###
    {
            "streamName":"bcad28804da8_01",                                 //(required)
            "uri":null                                                      //(optional)
    }
Response data:
###
    {
        "sourceIp":"{
            uri : \"rtsp://user:pass@xx.xx.xx.xx:554/cam/realmonitor?channel=2&subtype=0\",
            rtspStreamAudioTrack : \"false\"
        }",
        "isPTZEnabled":false,
        "applicationInstance":"_definst_",
        "name":"bcad28804da8_01.stream",
        "isRecordingSet":false,
        "isStreamManagerStream":true,
        "isPublishedToVOD":false,
        "isConnected":true,
        "ptzPollingInterval":2000
    }