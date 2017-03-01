/**
 * Created by liz on 2017/2/11.
 */
/*
 * create by liz 2014-08-22
 * */
angular.module("franchiseeListApp",[]).controller("franchiseeListCtrl",function ($scope,$http,$timeout){

    $scope.publishModel = function(){
        $scope.tips = "";
        $scope.title = "";
        $scope.url="";
        $("#newsAddModal").modal('show');
        $timeout(function(){
            $('#fileToUpload').change(function() {
                /* Act on the event */
                if ($('#fileToUpload').val()) {
                    var fileName = $('#fileToUpload').val();
                    var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
                    if (extension == ".jpg" || extension == ".png") {
                        var data = new FormData();
                        data.append('upload', $('#fileToUpload')[0].files[0]);
                        $.ajax({
                            url: '/wsite/upload',
                            type: 'POST',
                            data: data,
                            cache: false,
                            contentType: false, //不可缺参数
                            processData: false, //不可缺参数
                            success: function(data) {
                                $scope.$apply(function (){
                                   $scope.url = data.msg;
                                });
                            },
                            error: function() {
                                console.log('error');
                            }
                        });
                    }
                }
            });
        },1000)
    };

    $scope.commit = function(){
        if(!$scope.title){
           $scope.tips = "请填写标题";
            return;
        }
        if(!$scope.url){
            $scope.tips = "请选择图片";
            return;
        }
        $scope.postData={"title":$scope.title,"url":$scope.url};
        $http.post('/wsite/addInformation',$scope.postData).success(function(data){
            if(data.status == "success")
            {
                $("#newsAddModal").modal('hide');
                $scope.getFranchisee();
            }
        }).error(function(data){
            console.log(data.status);
        })
    };

    $scope.getFranchisee = function(){
        $http.get("/wsite/getInformationList").success(function(data){
            if(data.status == "success")
            {
                $scope.informationList = data.data;
            }
            else{
                alert(data.message);
            }
        }).error(function(data){
            alert(data.message);
        })
    };
    $scope.getFranchisee();
});