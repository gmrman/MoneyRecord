define(['lib/basecode/base64.js','views/service/CommonService.js'],function() {
    return ['$scope', '$ionicModal','$state', '$ionicPopup',"$http","commonService",'$stateParams',
    function($scope, $ionicModal, $state, $ionicPopup,$http,commonService,$stateParams) {

     $scope.commonService = commonService;
     $scope.commonService.getData();
     $scope.data = $scope.commonService.data;

     if($stateParams.data!=null){
       $scope.id = $stateParams.data;
     }

     $scope.singleaccount = {name:"",password:""};

     $scope.insertNew = function(){
       if($scope.singleaccount.name !="" && $scope.singleaccount.password !=""){
         var flag= false;
         var target = {};
        angular.forEach($scope.data,function(da){//找到已有标签
          if($scope.id==da.id){
            target = da;
            angular.forEach(da.account,function(d){//查看是否已有该账户名称
              if($scope.singleaccount.name == d.name){
                 flag= true;
              }
            });
          }
        });
         if(flag){//如果该标签内有该账户名
           var confirmPopup = $ionicPopup.confirm({
             title: '替换密码',
             template: '该标签内已有该账户名称,是否替换密码？'
           });
          confirmPopup.then(function(res) {
             if(res) {//选择替换
               angular.forEach(target.account,function(d){//查看是否已有该账户名称
                 if($scope.singleaccount.name == d.name){
                    d.password = $scope.singleaccount.password;
                 }
               });
               $scope.commonService.setData();//重新储存数据
               $scope.goback($scope.id);
              // angular.forEach($scope.data,function(da){//查看是否已有该标签
              //   if($scope.singledata.id==da.id){
              //     console.log("2");
              //     angular.forEach(da.account,function(d){//查看是否已有该账户名
              //       if(d.name == $scope.singleaccount.name){
              //         console.log("3");
              //         d.password = $scope.singleaccount.password;
              //         $scope.commonService.setData();
              //         $state.go("list");
              //       }
              //     });
              //   }
              // });
              }
           });
         }else{//没有该账户名
           target.account.push($scope.singleaccount);
           $scope.commonService.setData();//重新储存数据
           $scope.goback($scope.id);
         }

       }else{
         console.log("请填写完整信息！");
       }
     };

    //  function checkdata(id,account){
    //    var result = {flag:false,flag1:false,singledata:null,singleaccount:null};
    //    angular.forEach($scope.data,function(da){//查看是否已有该标签
    //      if(id==da.id){
    //        result.flag = true;
    //        result.singledata = da;
    //        angular.forEach(da.account,function(d){//查看是否已有该账户名
    //          if(d.name == account.name){
    //            result.flag1 = true;
    //            result.singleaccount = d;
    //          }
    //        });
    //      }
    //    });
    //    return result;
    //  }

    $scope.goback = function(id){
      angular.forEach($scope.data,function(da){//查看是否已有该标签
        if($scope.id==da.id){
          $state.go("details",{data:da});
        }
      });
    };
}];
});
