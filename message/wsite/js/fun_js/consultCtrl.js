/**
 * Created by liz on 2017/2/11.
 */
/*
 * create by liz 2014-08-22
 * */
angular.module("consult",[]).controller("consultCtrl",function ($scope,$http){


    $scope.pageSize = 10;

    $scope.allStatus = [{status:0,name:"未联系"},{status:1,name:"已联系"},{status:2,name:"==请选择=="}];
    $scope.status = 2;

    $scope.findConsultList = function(CurrentPage){
        if(CurrentPage <= 0 || CurrentPage > $scope.totalPage) return false;
        $scope.currentPage = CurrentPage;
        var province = $('#s_province option:selected').val();
        var city = $('#s_city option:selected').val();
        var county = $('#s_county option:selected').val();
        var query = "?page="+CurrentPage+"&pageSize="+$scope.pageSize;
        if(province != "省份"){
           query += "&province="+province;
        }
        if(city != "城市"){
            query += "&city="+city;
        }

        if(county != "区"){
            query += "&county="+county;
        }

        query += "&status="+$scope.status;

        $http.get("/wsite/getConsultList"+query).success(function(data){
            if(data.status == "success")
            {
               $scope.consultList = data.data;
               pageable(data.rowCount);
            }
            else{
                alert(data.message);
            }
        }).error(function(data){
            alert(data.message);
        })
    };


    $scope.findConsultList(1);

    var pageable = function(count){
       $scope.totalCount = count;
        if(count > 0){
           $scope.totalPage = Math.ceil(count / $scope.pageSize);
           if($scope.totalPage <= 7){
                 pageNum(1,$scope.totalPage);
           }else{
               var temp = $scope.totalPage - $scope.currentPage;
               if($scope.currentPage < 5){
                   pageNum(1,7)
               }else if(temp <= 3){
                   pageNum($scope.totalPage-6,$scope.totalPage)
               }else{
                   pageNum($scope.currentPage - 3,$scope.currentPage + 3);
               }

           }
        }
    };
    var pageNum = function(startPage,totalPage){
        $scope.pageNum = [];
        for(var i = startPage;i <= totalPage; i++){
            $scope.pageNum.push(i);
        }
    };

    $scope.open = function(Id,index){
      $scope.index = index;
      $scope.Id = Id ;
        console.log($scope.Id);
      $("#dealModal").modal('show');
    };

    //处理
    $scope.handle = function(){

        $http.put('/wsite/editConsult',{Id:$scope.Id}).success(function(data){
           if(data.status = "success"){
               $("#dealModal").modal('hide');
               $scope.consultList[$scope.index].status = 1;
           }else{
               alert("提交出错,请稍后再试！");
           }
        }).error(function(data){
            console.log(data.status);
        })
    };

    //导出excel
    $scope.export = function(){
        $http.get('/wsite/exportExcel').success(function(data){

        }).error(function(data){
            console.log(data.status);
        })
    };


    _init_area();
    var Gid  = document.getElementById ;


    $scope.showArea = function(){
        Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" +
        Gid('s_city').value + " - 县/区" +
        Gid('s_county').value + "</h3>"
    };



    $scope.newsAddModal = function(){
        $("#dealModal").modal('show');
    };



});