define(['lib/basecode/base64.js'],function() {
    return ['$scope', '$ionicModal','$state', '$ionicPopup',"$http",
    function($scope, $ionicModal, $state, $ionicPopup,$http) {

    $scope.fromdata={pass:"",pass1:'',passAgain:''};

    $scope.createPass = function(){
      if($scope.fromdata.pass==$scope.fromdata.passAgain){
        var epass = encrypt($scope.fromdata.pass, 'gengmr');
        localStorage.pass=epass;
        $state.go("login");
      }else{
        $scope.message="两次密码输入不一致！";
      }
      // $scope.ss=localStorage.pass;
    };
}];
});
