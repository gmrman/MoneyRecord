define(['lib/basecode/base64.js','views/service/CommonService.js'],function() {
    return ['$scope', '$ionicModal','$state', '$ionicPopup',"$http","commonService",
    function($scope, $ionicModal, $state, $ionicPopup,$http,commonService) {

     $scope.commonService = commonService;
     $scope.commonService.getData();
     $scope.data = $scope.commonService.data;
     $scope.singledata = {id:"",account:[]};
     $scope.singleaccount = {name:"",password:""};

     $scope.insertNew = function(){
       if($scope.singledata.id !="" &&  $scope.singleaccount.name !="" && $scope.singleaccount.password !=""){
         var r = checkdata($scope.singledata.id,$scope.singleaccount);

         if(r.flag1){//如果该标签内有该账户名
           var confirmPopup = $ionicPopup.confirm({
             title: '替换密码',
             template: '该标签内已有该账户名称,是否替换密码？'
           });
          confirmPopup.then(function(res) {
             if(res) {//选择替换
               console.log("1");
              //  r.singleaccount = $scope.singleaccount;
              angular.forEach($scope.data,function(da){//查看是否已有该标签
                if($scope.singledata.id==da.id){
                  console.log("2");
                  angular.forEach(da.account,function(d){//查看是否已有该账户名
                    if(d.name == $scope.singleaccount.name){
                      console.log("3");
                      d.password = $scope.singleaccount.password;
                      $scope.commonService.setData();
                      $state.go("list");
                    }
                  });
                }
              });
              } else {//取消替换
              //  r.singleaccount = $scope.singleaccount;
             }
           });
         }else{//没有该账户名
           if(r.flag){//如果已有该标签数据
             angular.forEach($scope.data,function(da){//查看是否已有该标签
               if($scope.singledata.id==da.id){
                 da.account.push($scope.singleaccount);
               }
             });
           }else{
             $scope.singledata.account.push($scope.singleaccount);
             $scope.data.push($scope.singledata);
           }
           $scope.commonService.setData();//重新储存数据
           $state.go("list");
         }

       }else{
         console.log("请填写完整信息！");
       }
     };

     function checkdata(id,account){
       var result = {flag:false,flag1:false,singledata:null,singleaccount:null};
       angular.forEach($scope.data,function(da){//查看是否已有该标签
         if(id==da.id){
           result.flag = true;
           result.singledata = da;
           angular.forEach(da.account,function(d){//查看是否已有该账户名
             if(d.name == account.name){
               result.flag1 = true;
               result.singleaccount = d;
             }
           });
         }
       });
       return result;
     }

}];
});
