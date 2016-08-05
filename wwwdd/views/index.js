define(function() {
    return ['$scope', '$ionicModal','$state', '$ionicPopup',"$http",
    function($scope, $ionicModal, $state, $ionicPopup,$http) {
      if(localStorage.pass==null){
        //没有设置查询密码
        $state.go("register");
      }else{
        //设置完查询密码后，重新输入，然后查看具体信息
        $state.go("login");
      }
}];
});
