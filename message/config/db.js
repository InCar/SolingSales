/**
 * Created by Jesse Qu on 3/26/14.
 */

"use strict";

var mysql = require('mysql');
var util = require('util');

exports = module.exports = function() {
    if (! global.poolInCar) {

        var host = process.env.INCAR_MySQLHost || '114.215.172.92';
        var user = process.env.INCAR_MySQLUser || 'soling';
        var pwd = process.env.INCAR_MySQLPwd || 'soling123';

        // product环境使用incar,开发环境使用incardev
        // 操作product环境时,请谨慎
        var dbname = process.env.INCAR_MySQLDatabase || 'solingsales';

        var args = {
            host: host,
            user: user,
            password: pwd,
            database: dbname,
            timezone: '0000'
        };
        global.poolInCar = mysql.createPool(args);

        var strDB = util.format("MySQL: %s@%s/%s", args.user, args.host, args.database);
        if(process.env.NODE_ENV !== 'product' && args.database === 'incar')
            console.warn("WARN!!!WARN!!!WARN!!!\nYou're using the product database, be more careful, please!!!\n"
                + strDB + "\nWARN!!!WARN!!!WARN!!!\n");
        else
            console.log(strDB);

        // 不知什么原因,每过几分钟,客户端就会lost connection
        // 临时解决办法,每过一段时间,随便发点什么给数据库
        // 使用其它语言编写的客户端连接Azure中的虚拟机也会出现此问题
        // 但连接Ali云上的虚拟机并不发生此问题,所以
        // 非常有可能是Azure平台的防火墙或是负载均衡中的设置强制断开5分钟没有数据的TCP连接
        // 参考 http://social.msdn.microsoft.com/Forums/silverlight/en-US/04589d2d-4acb-4f86-a2d0-957dc2a73a4f/endpoints-not-working-dns-scans-them
        // 已切换到Ali云,关闭此功能
        // setInterval(function(){
        //     var pool = global.poolInCar;
        //     pool.query("SELECT id FROM t_4s LIMIT 1", null, function(ex, result){});
        // }, 120*1000);

        if(process.env.INCAR_TraceSQL)
            console.info("设置环境变量INCAR_TraceSQL=false即可关闭SQL输出");
        else
            console.info("设置环境变量INCAR_TraceSQL=true可以开启SQL输出");
    }
    return global.poolInCar;
};
