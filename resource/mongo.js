/**
 * Created by zhongkui on 2016/5/12.
 */

'use strict'

var mongodb = require('mongodb'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

function MongoDB() {
    EventEmitter.call(this);

    var self = this;
    mongodb.MongoClient.connect(mongo_url, mongo_opt, function (err, db) {
        if (err) {
            util.error(err);
            return;
        }

        util.log('CONNECT: %s successful!', mongo_url);

        self.on('insertData', function (tablename, obj) {
            db.collection(tablename).insertOne(obj.data, function (err, docs) {
                if (err)
                    util.error(err);
                else
                    util.log('insert %s: {n:%d, _id:%s}', tablename, docs.result.n, docs.insertedId);
            });
        });

        self.on('updateData', function (tablename, obj) {
            db.collection(tablename).updateOne(obj.criteria, {'$set': obj.data}, function (err, docs) {
                if (err)
                    util.error(err);
                else
                    util.log('update %s: {n:%d, _id:%s}', tablename, docs.result.nModified, obj.criteria._id);
            });
        });

        self.on('findData', function (tablename, obj, cb) {
            db.collection(tablename).find(obj.criteria).toArray(cb);
        });
    });
}

util.inherits(MongoDB, EventEmitter);
module.exports = new MongoDB();

MongoDB.prototype.insertDvrProfile = function (serial_no, product, remote_addr, dev_name, mac_addr) {
    this.emit('insertData', 'vap_nvr_info', {
        data: {
            nvr_name: dev_name || 'None',
            nvr_serial: serial_no,
            nvr_provider: product === 'hik' ? '海康' : product === 'dahua' ? '大华' : '',
            nvr_ip: remote_addr,
            channel_size: 16,
            nvr_model: product,
            nvr_port: 0,
            remark: mac_addr || '',
            status: "0",
            enable: "1",
            create_time: new Date(),
            __v: 0,
            app_name: 'nvr',
            start_num:  product === 'hik' ? 33 : 0,
            web_port: 80,
            rtsp_port: 554
        }
    });
}

MongoDB.prototype.updateDvrProfile = function (id, remote_addr) {
    this.emit('updateData', 'vap_nvr_info', {
        data: {
            nvr_ip: remote_addr,
            create_time: new Date()
        }, criteria: {
            _id:  mongodb.ObjectID(id)
        }
    });
}

MongoDB.prototype.checkWhitelistBySerialNo = function (serial_no, cb) {
    this.emit('findData', 'vap_nvr_info', {
        criteria: {
            nvr_serial: serial_no,
            enable: "1"
        }
    }, function (err, docs) {
        if (err) {
            util.error(err);
            return cb(false);
        }

        if (docs.length > 0)
            cb(true, docs[0]._id)
        else
            cb(false);
    })
}