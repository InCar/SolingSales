
angular.module("franchiseeApp",[]).controller("franchiseeCtrl",function ($scope,$http){

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