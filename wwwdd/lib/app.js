/**
 * Created by davidlee on 16/3/12.
 */
// config
require.config({

    // paths
    paths: {
        // angular
        "angular": "angular/angular.min",
        "angular-animate": "angular/angular-animate.min",
        "angular-sanitize": "angular/angular-sanitize.min",
        "angular-resource": "angular/angular-resource.min",
        // angular-ui-router
        "angular-ui-router": "angular-ui-router/angular-ui-router.min",
        // angular-css
        "angular-css": "angular-css/angular-css.min",
        // angular-amd
        "angularAMD": "angular-amd/angularAMD.min",
        "ngload": "angular-amd/ngload.min",
        // ionic
        "ionic": "ionic/js/ionic.min",
        "ionic-angular": "ionic/js/ionic-angular",
        "ionic-close-popup": "ionic/js/ionic-close-popup",
        "Widget": "widget/js/widget",
        "ngCordova":"cordova/ng-cordova.min"
    },
    // shim
    shim: {
        // angular
        "angular": {
            exports: "angular"
        },
        "angular-animate": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-resource": ["angular"],
        // angular-ui-router
        "angular-ui-router": ["angular"],
        // angular-css
        "angular-css": ["angular"],
        // angular-amd
        "angularAMD": ["angular"],
        "ngCordova": ["angular"],
        "ngload": ["angularAMD"],
        // ionic
        "ionic": {
            exports: "ionic"
        },
        "ionic-angular": ["ionic", "angular", "angular-animate", "angular-sanitize", "angular-resource"],
    }
});
// bootstrap
define(["angular", "angularAMD", "ionic", "routes", "angular-ui-router", "angular-css", "ionic-angular","ngCordova"], function(angular, angularAMD, ionic, registerRoutes) {

    // module
    var app = angular.module("app", ["ui.router", "angularCSS", "ionic","ngCordova"]);
    app.run(function($ionicPlatform, $cordovaSQLite) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        //创建数据库
        if (window.cordova){
          db = $cordovaSQLite.openDB("my.db");  //device
        }else{
          db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        }
        //创建汇总表
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Summary (month TEXT PRIMARY KEY NOT NULL, input DOUBLE, output DOUBLE, inandout DOUBLE)");
        //创建明细表
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Detail (month TEXT PRIMARY KEY NOT NULL, input DOUBLE, output DOUBLE, inandout DOUBLE)");

      });
    })
    app.config(["$ionicConfigProvider", function($ionicConfigProvider) {
        $ionicConfigProvider.templates.maxPrefetch(0);
    }]);
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);

    return angularAMD.bootstrap(app);
});
