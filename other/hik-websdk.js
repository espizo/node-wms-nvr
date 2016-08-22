/**
 * Created by zhongkui on 2016/5/4.
 */
define(function (require, exports, module) {
    function WebSDK() {
        var WSDK_ERROR_COMMOD = 1, WSDK_ERROR_PARAMNUM = 2, HTTP_STATUS_200 = 200, HTTP_STATUS_400 = 400, HTTP_STATUS_401 = 401, PARAM_OPTION_CHANNEL = "channel", PARAM_OPTION_STREAM = "videoStream", PARAM_OPTION_DISK = "disk", PARAM_OPTION_PRESET = "preset", PARAM_OPTION_PATROL = "patrol", PARAM_OPTION_PATTERN = "pattern", PARAM_OPTION_EXCEPTION = "exception", PARAM_OPTION_IO = "io", PARAM_OPTION_OUTPUT = "output", PARAM_OPTION_MODE = "mode", PARAM_OPTION_USER = "user", PARAM_OPTION_CUSTOM = "custom", PARAM_OPTION_REGION = "region", PARAM_OPTION_SCENE = "scene", PARAM_OPTION_DERECTION = "direction", PARAM_OPTION_LINE = "line", PARAM_OPTION_SMART = "smart", PARAM_OPTION_LINK = "link", PARAM_OPTION_SCHEDULE = "schedule", PARAM_OPTION_INTERFACE = "interface", PARAM_OPTION_CLOUD = "cloud", PARAM_OPTION_TIMESTAMP = "timeStamp", PARAM_OPTION_FILENAME = "filename", PARAM_OPTION_WANNUM = "wannum", m_oTransMethord = null, m_deviceSet = [], m_bDebug = !1, self = this;
        this.CGI = {
            deviceLan: {url: "%s%s:%s/SDK/language"},
            login: {url: "%s%s:%s/ISAPI/Security/userCheck?timeStamp=%s", req: [PARAM_OPTION_TIMESTAMP]},
            challenge: {url: "%s%s:%s/ISAPI/Security/challenge"},
            activateStatus: {url: "%s%s:%s/SDK/activateStatus"},
            activate: {url: "%s%s:%s/ISAPI/System/activate"},
            activateIPC: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/activate"},
            sHttpCapa: {url: "%s%s:%s/SDK/capabilities"},
            deviceCapa: {url: "%s%s:%s/ISAPI/System/capabilities"},
            deviceInfoCapa: {url: "%s%s:%s/ISAPI/System/deviceInfo/capabilities"},
            deviceInfo: {url: "%s%s:%s/ISAPI/System/deviceInfo"},
            imageCap: {url: "%s%s:%s/ISAPI/Image/channels/1/imageCap"},
            smartCap: {url: "%s%s:%s/ISAPI/Smart/capabilities"},
            AnalogChannelInfo: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels"},
            AnalogChannelSingleInfo: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            DigitalChannelInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels"},
            ChannelSingleInfo: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s"},
                req: [PARAM_OPTION_CHANNEL]
            },
            DigitalChannelStatus: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/status"},
            ZeroChannelInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels"},
            StreamChannels: {url: "%s%s:%s/ISAPI/Streaming/channels"},
            StreamProxyChannels: {url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels"},
            sourceSupport: {url: "%s%s:%s/ISAPI/ContentMgmt/sourceSupport"},
            addIpc: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels"},
            modifyIpc: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s", req: [PARAM_OPTION_CHANNEL]},
            deleteIpc: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s", req: [PARAM_OPTION_CHANNEL]},
            sourceCapability: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/sourceCapability"},
            ipcSearch: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/search"},
            customProtocol: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/customProtocols/%s",
                req: [PARAM_OPTION_CUSTOM]
            },
            customProtocolCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/customProtocols/%s/capabilities",
                req: [PARAM_OPTION_CUSTOM]
            },
            talkInfo: {url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/1/"},
            talkListInfo: {url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels"},
            holidayInfo: {url: "%s%s:%s/ISAPI/System/Holidays"},
            pnpInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/pnp"},
            AnalogAlarmOutputInfo: {url: "%s%s:%s/ISAPI/System/IO/outputs"},
            DigitalAlarmOutputInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs"},
            AnalogAlarmInputInfo: {url: "%s%s:%s/ISAPI/System/IO/inputs"},
            DigitalAlarmInputInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/inputs"},
            overlayCapa: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/overlays/capabilities"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/overlays/capabilities"},
                req: [PARAM_OPTION_CHANNEL]
            },
            overlayInfo: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/overlays"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/overlays"},
                req: [PARAM_OPTION_CHANNEL]
            },
            videoCapa: {
                analog: {url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/capabilities"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels/%s%s/capabilities"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            videoDynamicCapa: {
                analog: {url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/dynamicCap"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels/%s%s/dynamicCap"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            videoInfo: {
                analog: {url: "%s%s:%s/ISAPI/Streaming/channels/%s%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels/%s%s"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            audioCapa: {url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/capabilities", req: [PARAM_OPTION_CHANNEL]},
            audioInfo: {url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s", req: [PARAM_OPTION_CHANNEL]},
            audioDynamicCapa: {url: "%s%s:%s/ISAPI/System/Audio/channels/%s/dynamicCap", req: [PARAM_OPTION_CHANNEL]},
            eventVideoCapa: {
                url: "%s%s:%s/ISAPI/Event/notification/Streaming/%s01/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            eventVideoInfo: {
                analog: {url: "%s%s:%s/ISAPI/Event/notification/Streaming/%s01"},
                digital: {url: "%s%s:%s/ISAPI/Event/notification/Streaming/%s01"},
                req: [PARAM_OPTION_CHANNEL]
            },
            zeroChannelCapa: {url: "%s%s:%s/ISAPI/ContentMgmt/ZeroStreaming/channels/101/capabilities"},
            zeroChannelInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/ZeroStreaming/channels/101"},
            zeroChannelEnable: {url: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels/1"},
            recordCap: {url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks/%s01/capabilities", req: [PARAM_OPTION_CHANNEL]},
            captureCap: {url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks/%s01/capabilities", req: [PARAM_OPTION_CHANNEL]},
            trackInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks"},
            eventCapa: {url: "%s%s:%s/ISAPI/Event/capabilities"},
            exceptionLink: {url: "%s%s:%s/ISAPI/Event/triggers/%s", req: [PARAM_OPTION_EXCEPTION]},
            snapshotCap: {
                analog: {url: "%s%s:%s/ISAPI/Snapshot/channels/%s/capabilities"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/SnapshotProxy/channels/%s/capabilities"},
                req: [PARAM_OPTION_CHANNEL]
            },
            snapshotInfo: {
                analog: {url: "%s%s:%s/ISAPI/Snapshot/channels/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/SnapshotProxy/channels/%s"},
                req: [PARAM_OPTION_CHANNEL]
            },
            snapshotListInfo: {
                analog: {url: "%s%s:%s/ISAPI/Snapshot/channels"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/SnapshotProxy/channels"},
                req: [PARAM_OPTION_CHANNEL]
            },
            motionCapa: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/motionDetection/layout/capabilities"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/motionDetection/layout/capabilities"},
                req: [PARAM_OPTION_CHANNEL]
            },
            motionInfo: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/motionDetection"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/motionDetection"},
                req: [PARAM_OPTION_CHANNEL]
            },
            motionLink: {url: "%s%s:%s/ISAPI/Event/triggers/VMD-%s", req: [PARAM_OPTION_CHANNEL]},
            motionSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/motionDetections/VMD_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            videoTamperInfo: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/tamperDetection"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/tamperDetection"},
                req: [PARAM_OPTION_CHANNEL]
            },
            videoTamperLink: {url: "%s%s:%s/ISAPI/Event/triggers/tamper-%s", req: [PARAM_OPTION_CHANNEL]},
            videoTamperSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/tamperDetections/Tamperdetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            videoTamperRegion: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/tamperDetection/regions"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/tamperDetection/regions"},
                req: [PARAM_OPTION_CHANNEL]
            },
            tamperInfo: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/privacyMask"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/privacyMask"},
                req: [PARAM_OPTION_CHANNEL]
            },
            tamperRegion: {
                analog: {url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/privacyMask/regions"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/privacyMask//regions"},
                req: [PARAM_OPTION_CHANNEL]
            },
            displayCap: {
                analog: {url: "%s%s:%s/ISAPI/Image/channels/%s/capabilities"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/capabilities"},
                req: [PARAM_OPTION_CHANNEL]
            },
            displayScene: {url: "%s%s:%s/ISAPI/Image/channels/imageModes"},
            displayInfo: {
                analog: {url: "%s%s:%s/ISAPI/Image/channels/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s"},
                req: [PARAM_OPTION_CHANNEL]
            },
            videoLossInfo: {
                analog: {url: "%s%s:%s/ISAPI/Image/channels/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s"},
                req: [PARAM_OPTION_CHANNEL]
            },
            videoLossLink: {url: "%s%s:%s/ISAPI/Event/triggers/videoloss-%s", req: [PARAM_OPTION_CHANNEL]},
            videoLossSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/videolosses/Videoloss_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            alarmInputInfo: {
                analogIO: {url: "%s%s:%s/ISAPI/System/IO/inputs/%s"},
                digitalIO: {url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/inputs/%s"},
                req: [PARAM_OPTION_IO]
            },
            alarmInputLink: {url: "%s%s:%s/ISAPI/Event/triggers/IO-%s", req: [PARAM_OPTION_IO]},
            alarmInputSchedule: {url: "%s%s:%s/ISAPI/Event/schedules/inputs/%s", req: [PARAM_OPTION_IO]},
            alarmOutputInfo: {
                analogIO: {url: "%s%s:%s/ISAPI/System/IO/outputs/%s"},
                digitalIO: {url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs/%s"},
                req: [PARAM_OPTION_IO]
            },
            alarmOutputSchedule: {url: "%s%s:%s/ISAPI/Event/schedules/outputs/%s", req: [PARAM_OPTION_IO]},
            alarmOutputTrigger: {
                analogIO: {url: "%s%s:%s/ISAPI/System/IO/outputs/%s/trigger"},
                digitalIO: {url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs/%s/trigger"},
                req: [PARAM_OPTION_IO]
            },
            alarmOutputStatus: {
                analogIO: {url: "%s%s:%s/ISAPI/System/IO/outputs/%s/status"},
                digitalIO: {url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs/%s/status"},
                req: [PARAM_OPTION_IO]
            },
            audioDetectCap: {
                url: "%s%s:%s/ISAPI/Smart/AudioDetection/channels/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioDetectInfo: {url: "%s%s:%s/ISAPI/Smart/AudioDetection/channels/%s", req: [PARAM_OPTION_CHANNEL]},
            audioDetectionStatus: {
                url: "%s%s:%s/ISAPI/Smart/AudioDetection/channels/%s/status",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioDetectLink: {url: "%s%s:%s/ISAPI/Event/triggers/audioexception-%s", req: [PARAM_OPTION_CHANNEL]},
            audioDetectSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/audioDetections/audioexception_%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            virtualFocus: {url: "%s%s:%s/ISAPI/Smart/DefocusDetection/%s", req: [PARAM_OPTION_CHANNEL]},
            virtualFocusLink: {url: "%s%s:%s/ISAPI/Event/triggers/defocus-%s", req: [PARAM_OPTION_CHANNEL]},
            sceneChangeInfo: {url: "%s%s:%s/ISAPI/Smart/SceneChangeDetection/%s", req: [PARAM_OPTION_CHANNEL]},
            sceneChangeLink: {url: "%s%s:%s/ISAPI/Event/triggers/scenechangedetection-%s", req: [PARAM_OPTION_CHANNEL]},
            sceneChangeSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/sceneChangeDetections/scenechangedetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceDetectCap: {url: "%s%s:%s/ISAPI/Smart/FaceDetect/%s/capabilities", req: [PARAM_OPTION_CHANNEL]},
            faceDetectInfo: {url: "%s%s:%s/ISAPI/Smart/FaceDetect/%s", req: [PARAM_OPTION_CHANNEL]},
            faceDetectLink: {url: "%s%s:%s/ISAPI/Event/triggers/facedetection-%s", req: [PARAM_OPTION_CHANNEL]},
            faceDetectSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/faceDetections/facedetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            rs485Capa: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/capabilities"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/capabilities"},
                req: [PARAM_OPTION_CHANNEL]
            },
            rs485Info: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s"},
                req: [PARAM_OPTION_CHANNEL]
            },
            networkBondCapa: {url: "%s%s:%s/ISAPI/System/Network/Bond/capabilities"},
            networkBond: {url: "%s%s:%s/ISAPI/System/Network/Bond/1"},
            networkInterfaceCapa: {url: "%s%s:%s/ISAPI/System/Network/interfaces/capabilities"},
            networkInterface: {url: "%s%s:%s/ISAPI/System/Network/interfaces"},
            networkInterfacePut: {url: "%s%s:%s/ISAPI/System/Network/interfaces/%s", req: [PARAM_OPTION_INTERFACE]},
            PPPoEInfo: {url: "%s%s:%s/ISAPI/System/Network/PPPoE/1"},
            PPPoEStatus: {url: "%s%s:%s/ISAPI/System/Network/PPPoE/1/status"},
            ddnsCapa: {url: "%s%s:%s/ISAPI/System/Network/DDNS/capabilities"},
            ddnsInfo: {url: "%s%s:%s/ISAPI/System/Network/DDNS/1"},
            ddnsCountry: {url: "%s%s:%s/ISAPI/System/Network/DDNS/CountryID/capabilities"},
            email: {url: "%s%s:%s/ISAPI/System/Network/mailing"},
            emailCap: {url: "%s%s:%s/ISAPI/System/Network/mailing/capabilities"},
            snmp: {url: "%s%s:%s/ISAPI/System/Network/SNMP"},
            portInfo: {url: "%s%s:%s/ISAPI/Security/adminAccesses"},
            ftpCapa: {url: "%s%s:%s/ISAPI/System/Network/ftp/capabilities"},
            ftpEvent: {url: "%s%s:%s/ISAPI/Event/notification/ftp"},
            ftpInfo: {url: "%s%s:%s/ISAPI/System/Network/ftp"},
            upnp: {url: "%s%s:%s/ISAPI/System/Network/UPnP"},
            upnpStatus: {url: "%s%s:%s/ISAPI/System/Network/UPnP/ports/status"},
            alarmCenter: {url: "%s%s:%s/ISAPI/Event/notification/alarmCenter/1"},
            telnet: {url: "%s%s:%s/ISAPI/System/Network/telnetd"},
            cfg28181: {url: "%s%s:%s/ISAPI/System/Network/SIP"},
            sip28181: {url: "%s%s:%s/ISAPI/System/Network/SIP/1/SIPInfo"},
            dialstatus: {url: "%s%s:%s/ISAPI/System/Network/WirelessDial/Interfaces/1/dialstatus"},
            ehome: {url: "%s%s:%s/ISAPI/System/Network/Ehome"},
            ezviz: {url: "%s%s:%s/ISAPI/System/Network/EZVIZ"},
            networkExtension: {url: "%s%s:%s/ISAPI/System/Network/extension"},
            certificate: {url: "%s%s:%s/ISAPI/Security/serverCertificate/certificate"},
            deleteCertificate: {url: "%s%s:%s/ISAPI/Security/serverCertificate/certificate"},
            createCertificate: {url: "%s%s:%s/ISAPI/Security/serverCertificate/selfSignCert"},
            certSignReq: {url: "%s%s:%s/ISAPI/Security/serverCertificate/certSignReq"},
            deleteCertSignReq: {url: "%s%s:%s/ISAPI/Security/serverCertificate/certSignReq"},
            netPreviewStrategy: {url: "%s%s:%s/ISAPI/System/Network/NetPreviewStrategy"},
            wifiInfo: {url: "%s%s:%s/ISAPI/System/Network/interfaces/2/wireless"},
            wanList: {url: "%s%s:%s/ISAPI/System/Network/WAN"},
            wanCapa: {url: "%s%s:%s/ISAPI/System/Network/WAN/%s/capabilities", req: [PARAM_OPTION_WANNUM]},
            wanInfo: {url: "%s%s:%s/ISAPI/System/Network/WAN/%s", req: [PARAM_OPTION_WANNUM]},
            storage: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage"},
            deletehdd: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/delete", req: [PARAM_OPTION_DISK]},
            startSmartTest: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/SMARTTest/start", req: [PARAM_OPTION_DISK]},
            smartTestInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/SMARTTest/config"},
            smartStatus: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/SMARTTest/status", req: [PARAM_OPTION_DISK]},
            startHddTest: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/start",
                req: [PARAM_OPTION_DISK]
            },
            hddTestPause: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/pause",
                req: [PARAM_OPTION_DISK]
            },
            hddTestResume: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/resume",
                req: [PARAM_OPTION_DISK]
            },
            stopHddTest: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/Stop",
                req: [PARAM_OPTION_DISK]
            },
            hddTestStatus: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/status",
                req: [PARAM_OPTION_DISK]
            },
            hddCapa: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/capabilities"},
            hddProperty: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s", req: [PARAM_OPTION_DISK]},
            nasProperty: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/%s", req: [PARAM_OPTION_DISK]},
            nasInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas"},
            nasSeach: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/search"},
            formatHdd: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/format", req: [PARAM_OPTION_DISK]},
            formatNas: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/%s/format", req: [PARAM_OPTION_DISK]},
            formatHddStatus: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/formatStatus", req: [PARAM_OPTION_DISK]},
            formatNasStatus: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/%s/formatStatus", req: [PARAM_OPTION_DISK]},
            storageExt: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/extension"},
            patrolCap: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols", req: [PARAM_OPTION_CHANNEL]},
            patrolInfo: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            patrolStart: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s/start"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s/start"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            patrolStop: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s/stop"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s/stop"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            deletePatrol: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            patternInfo: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns"},
                req: [PARAM_OPTION_CHANNEL]
            },
            patternRecordStart: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/recordstart"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/recordstart"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            patternRecordStop: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/recordstop"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/recordstop"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            patternStart: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/start"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/start"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            patternStop: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/stop"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/stop"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            deletePattern: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            oneKeyFocus: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/onepushfoucs/start", req: [PARAM_OPTION_CHANNEL]},
            initCamera: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/onepushfoucs/reset", req: [PARAM_OPTION_CHANNEL]},
            ptzFocus: {
                analog: {url: "%s%s:%s/ISAPI/Image/channels/%s/focus"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/focus"},
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzIris: {
                analog: {url: "%s%s:%s/ISAPI/Image/channels/%s/iris"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/iris"},
                req: [PARAM_OPTION_CHANNEL]
            },
            setMenu: {
                analog: {url: "%s%s:%s/ISAPI/Image/channels/%s/menu"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/menu"},
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzControl: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/continuous"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/continuous"},
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzAutoControl: {
                ipdome: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/1/presets/%s/goto"},
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/autoPan"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/autoPan"},
                req: [PARAM_OPTION_CHANNEL]
            },
            setPreset: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PRESET]
            },
            goPreset: {
                analog: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto"},
                digital: {url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s/goto"},
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PRESET]
            },
            set3DZoom: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/position3D"},
            monthRecordSearch: {
                url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks/%s/dailyDistribution",
                req: [PARAM_OPTION_CHANNEL]
            },
            recordSearch: {url: "%s%s:%s/ISAPI/ContentMgmt/search"},
            startPlayback: {url: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s"},
            startDownloadRecord: {url: "%s%s:%s/ISAPI/ContentMgmt/download"},
            restart: {url: "%s%s:%s/ISAPI/System/reboot"},
            restore: {url: "%s%s:%s/ISAPI/System/factoryReset?mode=%s", req: [PARAM_OPTION_MODE]},
            startVoiceTalk: {
                open: {url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/open"},
                close: {url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/close"},
                audioData: {url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/audioData"}
            },
            startRealPlay: {
                channels: {url: "%s%s:%s/PSIA/streaming/channels/%s"},
                zeroChannels: {url: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"}
            },
            upgradeFlag: {url: "%s%s:%s/ISAPI/System/upgradeFlag"},
            startUpgrade: {
                upgrade: {url: "%s%s:%s/ISAPI/System/updateFirmware"},
                status: {url: "%s%s:%s/ISAPI/System/upgradeStatus"}
            },
            onlineUpgradeCapa: {url: "%s%s:%s/ISAPI/System/onlineUpgrade/capabilities"},
            onlineServerStatus: {url: "%s%s:%s/ISAPI/System/onlineUpgrade/server"},
            onlineNewVersion: {url: "%s%s:%s/ISAPI/System/onlineUpgrade/version?check=%s", req: [PARAM_OPTION_CUSTOM]},
            onlineUpgrade: {url: "%s%s:%s/ISAPI/System/onlineUpgrade/upgrade"},
            onlineUpgradeStatus: {url: "%s%s:%s/ISAPI/System/onlineUpgrade/status"},
            deviceConfig: {url: "%s%s:%s/ISAPI/System/configurationData"},
            timeInfo: {url: "%s%s:%s/ISAPI/System/time"},
            ntpServerCapa: {url: "%s%s:%s/ISAPI/System/time/ntpServers/capabilities"},
            ntpServerInfo: {url: "%s%s:%s/ISAPI/System/time/ntpServers/1"},
            rs232Capa: {url: "%s%s:%s/ISAPI/System/Serial/ports/1/capabilities"},
            rs232Info: {url: "%s%s:%s/ISAPI/System/Serial/ports/1"},
            menuOutputCapa: {
                url: "%s%s:%s/ISAPI/System/Video/outputs/channels/%s/capabilities",
                req: [PARAM_OPTION_OUTPUT]
            },
            menuOutput: {url: "%s%s:%s/ISAPI/System/Video/outputs/channels"},
            menuOutputMode: {url: "%s%s:%s/ISAPI/System/Video/Menu/1"},
            logSearch: {url: "%s%s:%s/ISAPI/ContentMgmt/logSearch"},
            service: {url: "%s%s:%s/ISAPI/System/Hardware"},
            softwareServiceCapa: {url: "%s%s:%s/ISAPI/Security/previewLinkNum/capabilities"},
            softwareService: {url: "%s%s:%s/ISAPI/Security/previewLinkNum"},
            rtspAuth: {url: "%s%s:%s/ISAPI/Streaming/channels/101"},
            webAuth: {url: "%s%s:%s/ISAPI/Security/webCertificate"},
            telnetService: {url: "%s%s:%s/ISAPI/System/Network/telnetd"},
            sshService: {url: "%s%s:%s/ISAPI/System/Network/ssh"},
            ipFilter: {url: "%s%s:%s/ISAPI/System/Network/ipFilter"},
            userPermission: {url: "%s%s:%s/ISAPI/Security/UserPermission/%s", req: [PARAM_OPTION_USER]},
            user: {url: "%s%s:%s/ISAPI/Security/users"},
            userModify: {url: "%s%s:%s/ISAPI/Security/users/%s", req: [PARAM_OPTION_USER]},
            userDelete: {url: "%s%s:%s/ISAPI/Security/users/%s", req: [PARAM_OPTION_USER]},
            userSyncIPCPassword: {url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/syncIPCPasswd"},
            lockPTZ: {url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/lockPTZ", req: [PARAM_OPTION_CHANNEL]},
            lockPTZIntelligent: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/lockPtz", req: [PARAM_OPTION_CHANNEL]},
            fieldDetectionCapa: {
                url: "%s%s:%s/ISAPI/Smart/%s/%s/capabilities",
                req: [PARAM_OPTION_SMART, PARAM_OPTION_CHANNEL]
            },
            fieldDetection: {url: "%s%s:%s/ISAPI/Smart/%s/%s", req: [PARAM_OPTION_SMART, PARAM_OPTION_CHANNEL]},
            fieldDetectionRegion: {
                url: "%s%s:%s/ISAPI/Smart/%s/%s/regions/%s",
                req: [PARAM_OPTION_SMART, PARAM_OPTION_CHANNEL, PARAM_OPTION_REGION]
            },
            fieldDetectionLink: {url: "%s%s:%s/ISAPI/Event/triggers/%s", req: [PARAM_OPTION_LINK]},
            fieldDetectionSchedule: {url: "%s%s:%s/ISAPI/Event/schedules/%s", req: [PARAM_OPTION_SCHEDULE]},
            lineDetectionCapa: {url: "%s%s:%s/ISAPI/Smart/LineDetection/%s/capabilities", req: [PARAM_OPTION_CHANNEL]},
            lineDetection: {url: "%s%s:%s/ISAPI/Smart/LineDetection/%s", req: [PARAM_OPTION_CHANNEL]},
            lineDetectionItem: {
                url: "%s%s:%s/ISAPI/Smart/LineDetection/%s/lineItem/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_LINE]
            },
            lineDetectionLink: {url: "%s%s:%s/ISAPI/Event/triggers/linedetection-%s", req: [PARAM_OPTION_CHANNEL]},
            lineDetectionSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/lineDetections/linedetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            roadDetectionCap: {url: "%s%s:%s/ISAPI/ITC/capability"},
            VCADeviceCap: {url: "%s%s:%s/ISAPI/Intelligent/Capabilities"},
            VCAChannelsList: {url: "%s%s:%s/ISAPI/Intelligent/intelliChannelList"},
            VCAIntelliResource: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliType", req: [PARAM_OPTION_CHANNEL]},
            VCAIntelliCap: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/capabilities", req: [PARAM_OPTION_CHANNEL]},
            VCAIntelliScenes: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliTrace", req: [PARAM_OPTION_CHANNEL]},
            VCAIntelliLibVer: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliResource",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliOverlayCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliResource/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliShield: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/Shield", req: [PARAM_OPTION_CHANNEL]},
            VCAIntelliTrack: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/zoomRatio", req: [PARAM_OPTION_CHANNEL]},
            VCAIntelliShield: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/Shield", req: [PARAM_OPTION_CHANNEL]},
            VCAIntelliFaceRuleCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceRule/Capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliFaceRule: {url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceRule", req: [PARAM_OPTION_CHANNEL]},
            delVCAIntelliScene: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliTrace/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliSceneParam: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliTrace/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliSaveSceneLocation: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/scenePtz/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliGotoSceneLocation: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/scenePtz/%s/goto",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliPTZLimit: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PTZLimited/%s/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE, PARAM_OPTION_DERECTION]
            },
            VCAIntelliGotoPTZLimit: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PTZLimited/%s/%s/goto",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE, PARAM_OPTION_DERECTION]
            },
            VCAIntelliSceneRule: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/behaviorRule/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliCalibration: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/calibration",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliCalibrationVerify: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/calibration/verify",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliAdvanceParam: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/AlgParam",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliRestartLib: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/restoreBehaviorLib",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliRestoreLib: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/restoreAlgParam",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliSceneSchedule: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/behaviorRule/%s/schedules",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliSceneLinkage: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/behaviorRule/%s/notifications",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            imgTypeCapa: {url: "%s%s:%s/ISAPI/ContentMgmt/Capabilities"},
            recordTypeCapa: {
                url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks/%s01/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleDetect: {url: "%s%s:%s/ISAPI/Traffic/channels/%s/vehicleDetect", req: [PARAM_OPTION_CHANNEL]},
            vehicleDetectScene: {
                url: "%s%s:%s/ISAPI/Traffic/channels/%s/vehicleDetect/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            vehicleDetectCap: {url: "%s%s:%s/ISAPI/Traffic/capabilities"},
            vehicleSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/vehicledetects/vehicledetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleLinkage: {url: "%s%s:%s/ISAPI/Event/triggers/vehicledetection-%s", req: [PARAM_OPTION_CHANNEL]},
            vehicleBlackSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/blackList/blackList-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleBlackLinkage: {url: "%s%s:%s/ISAPI/Event/triggers/blackList-%s", req: [PARAM_OPTION_CHANNEL]},
            vehicleWhiteSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/whiteList/whiteList-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleWhiteLinkage: {url: "%s%s:%s/ISAPI/Event/triggers/whiteList-%s", req: [PARAM_OPTION_CHANNEL]},
            triggerCap: {url: "%s%s:%s/ISAPI/Event/triggersCap"},
            cloudStorage: {
                url: "%s%s:%s/ISAPI/ContentMgmt/channels/%s/cloudStorage/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_CLOUD]
            },
            vehicleCamera: {url: "%s%s:%s/ISAPI/Traffic/channels/%s/cameraInfo", req: [PARAM_OPTION_CHANNEL]},
            vehiclePicture: {url: "%s%s:%s/ISAPI/Traffic/channels/%s/picParam", req: [PARAM_OPTION_CHANNEL]},
            vehiclePictureCap: {
                url: "%s%s:%s/ISAPI/Traffic/channels/%s/picParam/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            workMode: {url: "%s%s:%s/ISAPI/ContentMgmt/workmode"},
            workModeCap: {url: "%s%s:%s/ISAPI/ContentMgmt/workmode/capabilities"},
            platformRestore: {
                url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/PlatReset?mode=%s",
                req: [PARAM_OPTION_MODE]
            },
            platformVSB: {url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/VSB"},
            platformNMS: {url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/NetManagerAccess"},
            platformAccess: {url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/PlatformAccess"},
            service28181Cap: {url: "%s%s:%s/ISAPI/System/Network/GB28181Service/capabilities"},
            service28181: {url: "%s%s:%s/ISAPI/System/Network/GB28181Service"},
            advertisingImport: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/import?filename=%s",
                req: [PARAM_OPTION_FILENAME]
            },
            advertisingImportStatus: {url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/importStatus"},
            advertisingFileList: {url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/fileList"},
            advertising: {url: "%s%s:%s/ISAPI/ContentMgmt/Advertising"},
            advertisingCap: {url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/capabilities"},
            advertisingSchedule: {url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/schedule"},
            backOverlayCap: {url: "%s%s:%s/ISAPI/ContentMgmt/ATM/capabilities"},
            zeroEnLarge: {url: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels/%s/enlarge", req: [PARAM_OPTION_CHANNEL]},
            thirdCloudStorageCap: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloudStorage/capabilities"},
            thirdCloudStorageInfo: {url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloudStorage"},
            thirdCloudUploadCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloudStorage/channels/%s/uploadStrategy/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            thirdCloudUploadInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloudStorage/channels/%s/uploadStrategy",
                req: [PARAM_OPTION_CHANNEL]
            },
            thirdCloudUrl: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloudStorage/URL?type=%s",
                req: [PARAM_OPTION_MODE]
            },
            regCropCap: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/regionClip/capabilities",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            regCropInfo: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/regionClip",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            vgaConfigCap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/VGAConfig/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            vgaConfigInfo: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/VGAConfig",
                req: [PARAM_OPTION_CHANNEL]
            },
            activeMulticastCap: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/activeMulticast/capabilities",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            activeMulticastInfo: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/activeMulticast",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            rtmpCap: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/RTMPCfg/capabilities",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            rtmpInfo: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/RTMPCfg",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            }
        }, this.findDeviceIndexByIP = function (e, t) {
            for (var a = 0; m_deviceSet.length > a; a++)if (m_deviceSet[a].m_szHostName == e)return a;
            return t !== void 0 && _callUserFun(HTTP_STATUS_401, null, t), -1
        }, this.WSDK_DeviceLan = function (e, t, a, n) {
            var o = _FormatString(this.CGI.deviceLan.url, 2 == t ? "https://" : "http://", e, a), i = {
                type: "GET",
                url: o,
                success: null,
                error: null
            };
            $.extend(i, n), $.extend(i, {
                success: function (e, t) {
                    "function" == typeof n.success && n.success(e, t)
                }, error: function (e, t) {
                    "function" == typeof n.error && n.error(e, t)
                }
            }), _submitRequest(o, i)
        }, this.WSDK_Activate = function (e, t, a, n) {
            var o = _FormatString(this.CGI[n.cmd].url, 2 == t ? "https://" : "http://", e, a), i = {
                type: "GET",
                url: o,
                success: null,
                error: null
            };
            $.extend(i, n), $.extend(i, {
                success: function (e, t) {
                    "function" == typeof n.success && n.success(e, t)
                }, error: function (e, t) {
                    "function" == typeof n.error && n.error(e, t)
                }
            }), _submitRequest(o, i)
        }, this.WSDK_Login = function (e, t, a, n, o, i, r) {
            var s = this.findDeviceIndexByIP(e);
            if (-1 != s)return _PrintString("设备已经登录过"), void 0;
            var l = _FormatString(this.CGI.login.url, 2 == t ? "https://" : "http://", e, a, i), d = {
                type: "GET",
                url: l,
                username: n,
                password: o,
                success: null,
                error: null
            };
            $.extend(d, r), $.extend(d, {
                success: function (i, s) {
                    if ("200" === $(s).find("statusValue").eq(0).text()) {
                        var l = new deviceInfoClass;
                        l.m_szHostName = e, l.m_szHttpProtocol = 2 == t ? "https://" : "http://", l.iPort = a, l.szUserName = n, l.szPassword = o, m_deviceSet.push(l), _PrintString("登录成功"), _getChannelInfo(e), _getAlarmInputInfo(e)
                    }
                    "function" == typeof r.success && r.success(i, s)
                }, error: function (e, t) {
                    "function" == typeof r.error && r.error(e, t)
                }
            }), _submitRequest(l, d)
        }, this.WSDK_SetLoginInfo = function (e, t, a, n, o) {
            var i = this.findDeviceIndexByIP(e);
            if (-1 != i)return _PrintString("设备已经登录过"), m_deviceSet[i].m_szHttpProtocol = 2 == t ? "https://" : "http://", m_deviceSet[i].iPort = a, m_deviceSet[i].szUserName = n, m_deviceSet[i].szPassword = o, void 0;
            var r = new deviceInfoClass;
            r.m_szHostName = e, r.m_szHttpProtocol = 2 == t ? "https://" : "http://", r.iPort = a, r.szUserName = n, r.szPassword = o, m_deviceSet.push(r), _PrintString("设置登录信息成功"), _getChannelInfo(e), _getAlarmInputInfo(e)
        }, this.WSDK_GetDeviceConfig = function (e, t, a, n) {
            _checkCommond(t, n) && _submit(e, _getHttpMethod("get", t), _getCmd(t), a, n)
        }, this.WSDK_SetDeviceConfig = function (e, t, a, n) {
            _checkCommond(t, n) && _submit(e, _getHttpMethod("set", t), _getCmd(t), a, n)
        }, this.WSDK_PTZControl = function (e, t, a, n, o, i) {
            n = 7 > n ? 15 * n : 100, o && (n = 0);
            var r = [{}, {pan: 0, tilt: n}, {pan: 0, tilt: -n}, {pan: -n, tilt: 0}, {pan: n, tilt: 0}, {
                pan: -n,
                tilt: n
            }, {pan: -n, tilt: -n}, {pan: n, tilt: n}, {
                pan: n,
                tilt: -n
            }, {speed: -n}, {speed: n}, {speed: -n}, {speed: n}, {speed: -n}, {speed: n}, {speed: n}], s = null, l = "";
            switch (a) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    s = this.CGI.ptzControl, l = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + r[a].pan + "</pan>" + "<tilt>" + r[a].tilt + "</tilt>" + "</PTZData>";
                    break;
                case 9:
                case 10:
                    s = this.CGI.ptzControl, l = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + r[a].speed + "</zoom>" + "</PTZData>";
                    break;
                case 11:
                case 12:
                    s = this.CGI.ptzFocus, l = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + r[a].speed + "</focus>" + "</FocusData>";
                    break;
                case 13:
                case 14:
                    s = this.CGI.ptzIris, l = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + r[a].speed + "</iris>" + "</IrisData>";
                    break;
                case 15:
                    s = this.CGI.ptzAutoControl, l = "<?xml version='1.0' encoding='UTF-8'?><autoPanData><autoPan>" + r[a].speed + "</autoPan>" + "</autoPanData>";
                    break;
                default:
            }
            var d = "PUT", u = {data: l};
            if ($.extend(u, i), null != s) {
                var c = {};
                c[PARAM_OPTION_CHANNEL] = t, _submit(e, d, s, c, u)
            } else _callUserFun(WSDK_ERROR_COMMOD, null, u)
        };
        var _PrintString = function () {
            if (m_bDebug) {
                var e = _FormatString(arguments);
                console.log(e)
            }
        }, _checkCommond = function (e, t) {
            return e in self.CGI ? !0 : (_callUserFun(WSDK_ERROR_COMMOD, null, t), !1)
        }, _getHttpMethod = function (e, t) {
            var a = "GET";
            switch (e) {
                case"get":
                    a = _gerGetMethod(t);
                    break;
                case"set":
                    a = _gerSetMethod(t);
                    break;
                default:
            }
            return a
        }, _gerGetMethod = function (e) {
            var t = "GET";
            switch (e) {
                case"monthRecordSearch":
                    t = "POST";
                    break;
                case"recordSearch":
                    t = "POST";
                    break;
                case"nasSeach":
                    t = "POST";
                    break;
                case"logSearch":
                    t = "POST";
                    break;
                default:
            }
            return t
        }, _gerSetMethod = function (e) {
            var t = "PUT";
            switch (e) {
                case"tamperRegion":
                    t = "DELETE";
                    break;
                case"videoTamperRegion":
                    t = "DELETE";
                    break;
                case"deleteCertificate":
                    t = "DELETE";
                    break;
                case"deleteCertSignReq":
                    t = "DELETE";
                    break;
                case"user":
                    t = "POST";
                    break;
                case"userDelete":
                    t = "DELETE";
                    break;
                case"addIpc":
                    t = "POST";
                    break;
                case"deleteIpc":
                    t = "DELETE";
                    break;
                case"delVCAIntelliScene":
                    t = "DELETE";
                    break;
                case"deletePattern":
                    t = "DELETE";
                    break;
                case"deletePatrol":
                    t = "DELETE";
                    break;
                case"sourceCapability":
                    t = "POST";
                    break;
                default:
            }
            return t
        }, _getCmd = function (CommondString) {
            var oCommond;
            return eval("oCommond = self.CGI." + CommondString), oCommond
        }, _FormatString = function () {
            for (var e = arguments[0], t = 1; arguments.length > t; t++)e = e.replace("%s", arguments[t]);
            return e
        }, _submit = function () {
            var e = arguments[0], t = arguments[1], a = arguments[2], n = arguments[3], o = arguments[4], i = self.findDeviceIndexByIP(e, o);
            if (-1 != i) {
                if (a.req !== void 0)for (var r = 0; a.req.length > r; r++)if (!(a.req[r] in n))return _callUserFun(WSDK_ERROR_PARAMNUM, null, o), void 0;
                var s = m_deviceSet[i], l = "";
                "string" != typeof a.url ? "analog" in a ? l = parseInt(n[PARAM_OPTION_CHANNEL], 10) <= s.iAnalogChannelNum ? a.analog.url : a.digital.url : "analogIO" in a && (l = parseInt(n[PARAM_OPTION_IO], 10) <= s.iAnalogAlarmInputNum ? a.analogIO.url : a.digitalIO.url) : l = a.url;
                var d = _FormatString(l, s.m_szHttpProtocol, s.m_szHostName, s.iPort);
                if (a.req !== void 0)for (var r = 0; a.req.length > r; r++)d = _FormatString(d, n[a.req[r]]);
                var u = {type: t, username: s.szUserName, password: s.szPassword};
                $.extend(u, o), _submitRequest(d, u)
            }
        }, _submitRequest = function (e, t) {
            var a = new m_oTransMethord;
            a.submitRequest(e, t)
        }, _getChannelInfo = function (e) {
            var t = self.findDeviceIndexByIP(e);
            if (-1 != t) {
                var a = m_deviceSet[t];
                _submit(e, "GET", self.CGI.AnalogChannelInfo, null, {
                    async: !1, success: function (e, t) {
                        a.iAnalogChannelNum = parseInt($(t).find("VideoInputChannel").length, 10)
                    }
                })
            }
        }, _getAlarmInputInfo = function (e) {
            var t = self.findDeviceIndexByIP(e);
            if (-1 != t) {
                var a = m_deviceSet[t];
                _submit(e, "GET", self.CGI.AnalogAlarmInputInfo, null, {
                    async: !1, success: function (e, t) {
                        a.iAnalogAlarmInputNum = parseInt($(t).find("IOInputPort").length, 10)
                    }
                })
            }
        }, _callUserFun = function (e, t, a) {
            e != HTTP_STATUS_200 ? "function" == typeof a.error && a.error(e, t) : "function" == typeof a.success && a.success(e, t), "function" == typeof a.complete && a.complete(e, t)
        }, deviceInfoClass = function () {
            this.szIP = "", this.m_szHostName = "", this.szUserName = "", this.szPassword = "", this.m_szHttpProtocol = "http://", this.iPort = 80, this.szDeviceType = "", this.iAnalogChannelNum = 0, this.iDigitalChannelNum = 0, this.iAnalogAlarmInputNum = 0
        }, transClient = function () {
            this.options = {timeout: 3e4, data: null, async: !0, complete: null, success: null, error: null}
        };
        transClient.prototype.submitRequest = function () {
        }, transClient.prototype.processSuccessCB = function (e) {
            e && 4 == e.readyState && (HTTP_STATUS_200 == e.status ? "function" == typeof this.options.success && this.options.success(HTTP_STATUS_200, e.responseXML, e) : "function" == typeof this.options.error && this.options.error(e.status, e.responseXML, e))
        }, transClient.prototype.processErrorCB = function (e, t) {
            4 == e.readyState ? "function" == typeof this.options.error && this.options.error(e.status, e.responseXML, e) : ("timeout" == t || "error" == t) && "function" == typeof this.options.error && this.options.error(e.status, e.responseXML, e)
        }, transClient.prototype.processCompleteCB = function (e) {
            "function" == typeof this.options.complete && this.options.complete(e.status, e.responseXML, e)
        };
        var jqueryAjaxClient = function () {
            transClient.call(this)
        };
        jqueryAjaxClient.prototype = new transClient, jqueryAjaxClient.prototype.submitRequest = function (e, t) {
            $.extend(this.options, t);
            var a;
            a = "string" == typeof this.options.data ? oUtils.parseXmlFromStr(this.options.data) : this.options.data;
            var n = this;
            $.ajax({
                type: n.options.type,
                beforeSend: function (e) {
                    e.setRequestHeader("If-Modified-Since", "0")
                },
                username: n.options.username,
                password: n.options.password,
                async: n.options.async,
                timeout: n.options.timeout,
                url: e,
                processData: !1,
                data: a,
                success: function (e, t, a) {
                    n.processSuccessCB(a)
                },
                error: function (e, t) {
                    n.processErrorCB(e, t)
                },
                complete: function (e) {
                    n.processCompleteCB(e)
                }
            })
        }, m_oTransMethord = jqueryAjaxClient
    }

    var oBase64, oUtils;
    oBase64 = require("base64"), oUtils = require("utils"), window.WebSDK = new WebSDK
});