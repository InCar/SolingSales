/**
 * Created by liz on 2017/2/11.
 */
/*
 * create by liz 2014-08-22
 * */
angular.module("index",[]).controller("indexCtrl",function ($scope,$http){


    var Gid  = document.getElementById ;
    $scope.consultClick = function(){
        $scope.tips = "";
        _init_area();
        $('#consultModal').modal('show');
        //Gid('s_county').setAttribute('onchange','showArea()');
    };

    var showArea = function(){
        Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" +
        Gid('s_city').value + " - 县/区" +
        Gid('s_county').value + "</h3>"
    };

    $scope.consultSubmit = function(){
        if(!$scope.username){
             $scope.tips = "姓名不能为空";
             return false;
        }
        if(!(/^1[34578]\d{9}$/.test($scope.phone))){
            $scope.tips = "手机号号码有误";
            return false;
        }
       var province = $('#s_province option:selected').val();
       var city = $('#s_city option:selected').val();
       var county = $('#s_county option:selected').val();
       if(province == "省份"){
           $scope.tips = "请选择省份";
           return false;
       }
        if(city == "城市"){
            $scope.tips = "请选择城市";
            return false;
        }

        if(county == "区"){
            $scope.tips = "请选择区";
            return false;
        }
        $scope.tips = "";

        $scope.postData={"realname":$scope.username,"phone_num":$scope.phone,"province":province,"city":city,"county":county};
        $http.post('/wsite/addConsult',$scope.postData).success(function(data){
            if(data.status == "success")
            {
                $('#consultModal').modal('hide');
                $("#consultOkModal").modal('show');
                initData();
            }else{
                alert("提交出错,请稍后再试！");
            }
        }).error(function(data){
            console.log(data.status);
        })

    };
    function initData()
    {
        $scope.username = "";
        $scope.phone = "";
    }

    $scope.loginClick = function(){
       $scope.tips = "";
       $("#loginModal").modal('show');
    };

    $scope.login = function(){
        if(!$scope.account){
            $scope.tips = "请填写账号";
            return false;
        }
        if(!$scope.pwd){
            $scope.pwd = "请填写密码";
            return false;
        }

        var sha1_password =hex_sha1($scope.pwd);//SHA1进行加密
        $scope.postData={"user_name":$scope.account,"pwd":sha1_password};
        $http.post('/wsite/login',$scope.postData).success(function(data){
            console.log((data.data).length);
            if((data.data).length > 0){
                window.location.href = "/consultList.html";
            }else{
                alert("登录账号或密码错误！");
            }
        }).error(function(data){
            console.log(data.status);
        })
    }

    // 加盟商登录显示
    $scope.franchiseeLoginClick = function(){
        $scope.franchiseeLoginTips = "";
        $("#franchiseeLoginModal").modal('show');
    };

});