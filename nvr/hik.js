/**
 * Created by zhongkui on 2016/5/12.
 */

var db = require('../resource/mongo'),
    hex2a = require('../util/hex2ascii'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

'use strict'

function Hikvision() {
    EventEmitter.call(this);

    this.on('register', function(remote_addr, data){
        try {
            var firstByte = data.slice(0, 2)
            var hexCount = parseInt(firstByte, 16);
            if (data.length !== hexCount * 2) {
                return;
            }

            data = data.slice(26);
            var hexArray = data.split('000000');
            /**
             * 0:unknow
             * 1:device name
             * 2:device id
             * 3:mac addr
             * 4:[http port,] tcp port
             * @type array
             */
            var serial_no = hex2a(hexArray[2].slice(0, -2));
            var devName = hex2a(hexArray[1].slice(0, -2));
            var macAddr = hexArray[3].slice(0, -2);
            //console.log("product:%s  deviceId:%s  deviceName:%s  macAddr:%s  ip:%s", product, devId, devName, macAddr, remote_addr);
            if (serial_no) {
                db.checkWhitelistBySerialNo(serial_no, function(exists, id){
                    if(exists)
                        db.updateDvrProfile(id, remote_addr)
                    else
                        db.insertDvrProfile(serial_no, 'hik', remote_addr, devName, macAddr);
                })
            }
        } catch (ex) {
            util.error(ex);
        }
    });
}

util.inherits(Hikvision, EventEmitter);
module.exports = new Hikvision();