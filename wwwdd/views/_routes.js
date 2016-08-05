define(["angularAMD"], function (angularAMD) {
    var registerRoutes = function ($stateProvider, $urlRouterProvider) {
        // route
        $stateProvider
        .state("index", angularAMD.route({
            url: "/",
            templateUrl:"index.html",
            controllerUrl: "views/index.js"
        }))
        .state("register", angularAMD.route({
            url: "/register",
            cache: false,
            templateUrl:"views/register/register.html",
            controllerUrl: "views/register/register.js"
        }))
        .state("login", angularAMD.route({
            url: "/login",
            cache: false,
            templateUrl:"views/login/login.html",
            controllerUrl: "views/login/login.js"
        }))
        .state("list", angularAMD.route({
            url: "/list",
            cache: false,
            templateUrl:"views/list/list.html",
            controllerUrl: "views/list/list.js"
        }))
        .state("new", angularAMD.route({
            url: "/new",
            cache: false,
            templateUrl:"views/new/new.html",
            controllerUrl: "views/new/new.js",
            css:["views/new/new.css"]
        }))
        .state("details", angularAMD.route({
            url: "/details",
            cache: false,
            params:{data:null},
            templateUrl:"views/details/details.html",
            controllerUrl: "views/details/details.js"
        }))
        .state("newDetail", angularAMD.route({
            url: "/newDetail",
            cache: false,
            params:{data:null},
            templateUrl:"views/new/newDetail.html",
            controllerUrl: "views/new/newDetail.js"
        }));

        $urlRouterProvider.otherwise('/');
    };
    // return
    return registerRoutes;
});
