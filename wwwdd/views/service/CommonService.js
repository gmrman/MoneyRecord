/**
 * 工作日报公共服务
 */
define(["app",'lib/basecode/base64.js'],function(app){
    app.service("commonService",[
        function(){

            var self = this;
            /**
             * 账号数据
             * @type {null}
             */
            self.data = [];
             /**
              * 测试属性
              */
            self.url = null;

            self.getData = function(){
              console.log("getdata");
              if(localStorage.data != null){
                 self.data = JSON.parse(localStorage.data);
              }
            };

            self.setData = function(){
              console.log("setdata");
              localStorage.data = JSON.stringify(self.data);
            };


        }
    ]);

});
