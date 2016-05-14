/**
 * Created by zhongkui on 2016/5/12.
 */

var db = require('../resource/mongo'),
    hex2a = require('../util/hex2ascii'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

'use strict'

function Dahua() {
    EventEmitter.call(this);

    this.on('register', function(remote_addr, data){
        try {
            data = data.slice(64).replace(/00+?$/, '');
            var serial_no = hex2a(data);
            //console.log("product:%s  deviceId:%s  ip:%s", product, devId, remote_addr);
            if (serial_no) {
                db.checkWhitelistBySerialNo(serial_no, function(exists, id){
                    if(exists)
                        db.updateDvrProfile(id, remote_addr)
                    else
                        db.insertDvrProfile(serial_no, 'dahua', remote_addr);
                })
            }
        } catch(ex) {
            util.error(ex);
        }
    });
}

util.inherits(Dahua, EventEmitter);
module.exports = new Dahua();