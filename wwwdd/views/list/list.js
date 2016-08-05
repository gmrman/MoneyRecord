define(['lib/basecode/base64.js','views/service/CommonService.js'],function() {
    return ['$scope', '$ionicModal','$state', '$ionicPopup',"$http","commonService",
    function($scope, $ionicModal, $state, $ionicPopup,$http,commonService) {
    $scope.commonService = commonService;
    $scope.commonService.getData();
    $scope.listdata = $scope.commonService.data;
    $scope.showDetails  = function(accounts){
      $state.go("details",{data:accounts})
    };
}];
});
