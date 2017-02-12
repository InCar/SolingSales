//
var dao=require("../config/dao");



exports.login = function(req,res){
    var data = req.body;
    console.log("-------------");
    console.log(data);
    var sql="select * from t_account";
    var user_name = data['user_name'];
    var pwd = data['pwd'];
    sql += " where user_name = ? and pwd = ?";
    var args=[user_name,pwd];
    dao.findBySql(sql,args,function(info){
        res.json(info);
    });

};



