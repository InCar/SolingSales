
var dao=require("../config/dao");
var formidable = require("formidable");
var fs= require('fs');
//var nodeExcel = require('excel-export');//关联excel-export模块


exports.addInformation = function(req,res){
    var data = req.body;
    var sql = "INSERT t_information SET ?";
    var dto = {
        title:data['title'],
        url:data['url'],
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

var cacheFolder = './wsite/images/uploadcache/';
exports.upload = function(req, res) {

    var userDirPath =cacheFolder;
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            //displayUrl = UPLOAD_FOLDER + currentUser.id + avatarName;
            fs.renameSync(files.upload.path, newPath); //重命名
            res.send({
                code: 200,
                msg: "images/uploadcache" + avatarName
            });
        }
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