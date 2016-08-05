angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$cordovaSQLite) {

  $scope.settings = {
    enableFriends: true
  };
  // var db = null;
  // if (window.cordova) {
  //     db = $cordovaSQLite.openDB({ name: "my.db" }); //device
  //     $scope.ssss="Android";
  //    console.log("Android");
  //   }else{
  //     db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
  //     $scope.ssss="browser";
  //     console.log("browser");
  //   }

  $scope.execute = function() {
    $scope.ssss = errorsss;
    // db.transaction(function(tx){
    //      //首先它创建一个数据库表，里面有3个字段
    //      tx.executeSql('CREATE TABLE IF NOT EXISTS test_table(data TEXT,data_num TEXT)',[]);
    //      //创建一个查询语句用来查询数据库表的所有记录（这个由于是所有查询，所以不需要预编译语句和参数 (第二个参数)）
    //      //然后定义了一个回调函数，表明对于结果集的处理
    //      tx.executeSql('SELECT * FROM InfoData',[],function(tx,rs){
    //         console.log("ssss");
    //      });
    //  }
    //
    //  );
    // var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    // $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
    //   console.log("insertId: " + res.insertId);
    // //  $scope.ssss="success";
    // }, function (err) {
    //   console.error(err);
    // });
  };
});
