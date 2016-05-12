# node-wms-nvr

#StartStream
POST http://[WOWZA_HOST]:9080/[APP_NAME]/startStream</br>
Request date:</br>
    [</br>
        {</br>
            "streamName":"bcad28804da8_01",                                 //(required)</br>
            "uri":"rtsp://user:pass@xx.xx.xx.xx/h264/ch33/main/av_stream"   //(required)</br>
        },{</br>
            "streamName":"bcad28804da8_02",                                 //(required)</br>
            "uri":"rtsp://user:pass@xx.xx.xx.xx/h264/ch34/main/av_stream"   //(required)</br>
        }</br>
    ]</br>
Response data:</br>
    {"success":true, "message":"","data":null}</br>
or</br>
    {"success":false, "message":"","data":{"bcad28804da8_01":"errmsg","bcad28804da8_02":\"errmsg\"}}

#StopStream
POST http://[WOWZA_HOST]:9080/[APP_NAME]/stopStream</br>
Request date:</br>
&nbps;[</br>
    &nbps;&nbps;{</br>
        &nbps;&nbps;&nbps;"streamName":"bcad28804da8_01",                              &nbps; //(required)</br>
        &nbps;&nbps;&nbps;"uri":null &nbps;//(optional)</br>
    &nbps;&nbps;},{</br>
        &nbps;&nbps;&nbps;"streamName":"bcad28804da8_02",                              &nbps; //(required)</br>
        &nbps;&nbps;&nbps;"uri":null &nbps;//(optional)</br>
    &nbps;&nbps;}</br>
&nbps;]</br>
Response data:</br>
    {"success":true,"message":"","data":null}</br>
 or</br>
    {"success":false, "message":"","data":{"bcad28804da8_01":"errmsg","bcad28804da8_02":\"errmsg\"}}
