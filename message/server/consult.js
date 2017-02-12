//
var dao=require("../config/dao");
var nodeExcel = require('excel-export');//关联excel-export模块
//exports.postSuggest=function(req,res){
//    var dao=require("../config/dao");
//    dao.findBySql("select * from t_account",[],function(info){
//        res.json(info);
//    })
//    var query = req.query;
//    console.log("进来了"+"---"+query.stra);
//}

exports.addConsult = function(req,res){
    var data = req.body;
    var sql = "INSERT t_consult SET ?";
    var dto = {
        realname:data['realname'],
        phone_num:data['phone_num'],
        province:data['province'],
        city:data['city'],
        county:data['county'],
        create_time:changeDate_1(new Date())
    };

    dao.insertBySql(sql,[dto],function(info){
         res.json(info);
    })

};

exports.getConsults = function(req,res){
    var query = req.query;
    var page=parseInt(query['page']);
    var pageSize=parseInt(query['pageSize']);
    var province = query['province'];
    var city = query['city'];
    var county = query['county'];
    var status = query['status'];
    var sql="select * from t_consult where 1=1";
    var args=[];
    if(judgeData(province)){
       sql += " and province = ?";
        args.push(province);
    }
    if(judgeData(city)){
        sql += " and city = ?";
        args.push(city);
    }
    if(judgeData(county)){
        sql += " and county = ?";
        args.push(county);
    }

    if(status != 2){
        sql += " and status = ?";
        args.push(status);
    }
    sql+=" order by create_time desc";

    dao.findBySqlForPage(sql,args,function(info){
        res.json(info);
    },(page-1)*pageSize,pageSize);
};

exports.editConsult = function(req,res){
    var data = req.body;
    var Id = data['Id'];
    var sql = "update t_consult set status = 1 where Id = ?";
    var args = [Id];
    dao.executeBySql(sql,args,function(info){
        res.json(info);
    });
};

exports.exportExcel = function(req, res) {

    var sql="select * from t_consult ";
    sql+=" order by create_time desc";
    var conf ={};
    conf.rows =[];
    dao.findBySql(sql,[],function(info){
        var data = info.data;
        conf.cols = [{
            caption:'姓名',
            type:'string',
            width:50
        },{
            caption:'电话',
            type:'string',
            width:50
        },{
            caption:'省份',
            type:'string',
            width:50
        },{
            caption:'城市',
            type:'string',
            width:50
        }, {
            caption:'区',
            type:'string',
            width:50
        }, {
            caption:'创建时间',
            type:'String',
            width:50
        },{
            caption:'是否处理',
            type:'string',
            width:50
        }];
        for(var i = 0; i< data.length;i++){
            conf.rows.push([data[i].realname,data[i].phone_num,data[i].province,data[i].city,data[i].county,data[i].create_time,data[i].status==0?"未联系":"已联系"]);
        }
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "consultList2017.xlsx");
        res.end(result, 'binary');
    });
    // uncomment it for style example
    // conf.stylesXmlFile = "styles.xml";

    //conf.rows = [
    //    ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14159],
    //    ["e", new Date(2012, 4, 1), false, 2.7182],
    //    ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
    //    ["null date", null, true, 1.414]
    //];

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