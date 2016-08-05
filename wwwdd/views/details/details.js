define(['lib/basecode/base64.js','views/service/CommonService.js'],function() {
    return ['$scope', '$ionicModal','$state', '$ionicPopup',"$http","commonService",'$stateParams',
    function($scope, $ionicModal, $state, $ionicPopup,$http,commonService,$stateParams) {
    // $scope.commonService = commonService;
    // $scope.commonService.getData();
    // $scope.listdata = $scope.commonService.data;
    $scope.lists = {};
    if($stateParams.data!=null){
      $scope.list = $stateParams.data;
    }

    $scope.newDetail  = function(id){
      $state.go("newDetail",{data:id});
    };

}];
});
