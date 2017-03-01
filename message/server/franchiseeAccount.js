//
var dao=require("../config/dao");



exports.login = function(req,res){
    var data = req.body;
    var sql="select * from t_franchisee_account";
    var user_name = data['user_name'];
    var pwd = data['pwd'];
    console.log(user_name);
    sql += " where user_name = ? and pwd = ?";
    var args=[user_name,pwd];
    dao.findBySql(sql,args,function(info){
        res.json(info);
    });

};



