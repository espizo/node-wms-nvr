/**
 * Created by zhongkui on 2016/5/12.
 */

'use strict'

module.exports = function (hexString) {
    var hex = hexString.toString();//force conversion
    var str = '';
    for (var i = 0; i < hexString.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
    return str;
};