define(['lib/basecode/base64.js','views/service/CommonService.js'],function() {
    return ['$scope', '$ionicModal','$state', '$ionicPopup',"$http","commonService",
    function($scope, $ionicModal, $state, $ionicPopup,$http,commonService) {

      // var test = [{id:"百度"},{id:"新浪"}];
     $scope.commonService = commonService;
     $scope.key={password:""};
     $scope.check = function(){
       if($scope.key.password == decrypt(localStorage.pass,'gengmr')){
         $scope.commonService.getData();
         $state.go("list");
       }else{
         console.log("no");
       }
     };
}];
});
