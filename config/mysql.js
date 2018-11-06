/**
 * Created by songjx 2017/3/21.
 */
var mysql = require('mysql');   // 引用mysql模块。注意要先安装mysql： npm install mysql
var config = require('./db');

var onelib_pool = mysql.createPool(config.onelib);
exports.onelib_pool = onelib_pool;
