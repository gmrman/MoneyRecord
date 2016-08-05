/**
 * Created by davidlee on 16/3/12.
 */
define(
    // routes
    [
        "views/_routes.js",
        //"views/app/_routes.js",
        //"views/app/rol_00/_routes.js",
      //  "views/app/rol_01/_routes.js",
        //"views/app/rol_02/_routes.js",
        //"views/app/rol_03/_routes.js",
        //"views/app/rol_04/_routes.js",
        //"views/app/rol_05/_router.js"
    ],

    // register
    function () {

        // routes
        var routes = arguments;

        // register
        var registerRoutes = function ($stateProvider, $urlRouterProvider) {
            for (var i = 0; i < routes.length; i++) {
                routes[i]($stateProvider, $urlRouterProvider);
            }
        };

        // return
        return registerRoutes;
    }
);
