# StartStream
POST http://[WOWZA_HOST]:9080/[APP_NAME]/startStream</br>
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

# StopStream
POST http://[WOWZA_HOST]:9080/[APP_NAME]/stopStream</br>
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
