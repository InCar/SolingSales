
var dao=require("../config/dao");
//var nodeExcel = require('excel-export');//关联excel-export模块


exports.addInformation = function(req,res){
    var data = req.body;
    var sql = "INSERT t_information SET ?";
    var dto = {
        realname:data['title'],
        phone_num:data['url'],
        creater:"admin",
        create_time:changeDate_1(new Date())
    };
    dao.insertBySql(sql,[dto],function(info){
         res.json(info);
    })

};

exports.getInformation = function(req,res){
    var query = req.query;
    var page=parseInt(query['page']);
    var pageSize=parseInt(query['pageSize']);
    var sql="select * from t_information where 1=1 order by create_time desc";
    var args = [];
    dao.findBySqlForPage(sql,args,function(info){
        res.json(info);
    },(page-1)*pageSize,pageSize);
};

exports.deleteInformation = function(req,res){
    var data = req.body;
    var Id = data['Id'];
    var sql = "delete from t_information where Id = ?";
    var args = [Id];
    dao.executeBySql(sql,args,function(info){
        res.json(info);
    });
};


function judgeData(data){
    if(data != null && data != "undefined" && data != "") return true;
    return false;
}

function changeDate_1(date)
{
    if(date == "0000-00-00 00:00:00" || date == null) return null;
    var year = new Date(Date.parse(date)).getFullYear();
    var month = (new Date(Date.parse(date)).getMonth()) + 1;
    var day = new Date(Date.parse(date)).getDate();
    var hour = new Date(Date.parse(date)).getHours();
    var minute = new Date(Date.parse(date)).getMinutes();
    if(month < 10) month= "0" + month;
    if(day < 10) day= "0" + day;
    if(hour < 10) hour = "0" + hour;
    if(minute < 10) minute= "0" + minute;

    return (year+"-"+month+"-"+day+" "+hour+":"+minute);
}