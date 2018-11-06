/**
 * Created by songjx 2017/3/21.
 */
var mysql = require('../config/mysql');// 获取数据库连接配置

//增删改查
function query(sql, callback) {
    mysql.onelib_pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
//200成功
//成功执行后返回对象
function success(res,callback){
    var result = {
        result: res,
        success : true,
        code: 200
    };
    callback(result);
}
//900未知错误
//失败执行后返回对象
function failure(res,callback){
    var result = {
        result:res.code,
        success: false,
        code:res.errno
    }
    callback(result);
}
exports.query = query;
exports.failure = failure;
exports.success = success;

