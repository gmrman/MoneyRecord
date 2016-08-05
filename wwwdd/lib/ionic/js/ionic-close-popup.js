define(["app"], function(app) {
    app.service("IonicClosePopupService", [
        function() {
            array = Array();
            var currentPopup;
            var htmlEl = angular.element(document.querySelector('html'));
            htmlEl.on('click', function(event) {
                if (event.target.nodeName === 'HTML') {
                    if (currentPopup) {
                        currentPopup.pop().close();
                    }
                }
            });

            this.register = function(popup) {
                array.push(popup);
                currentPopup = array;
            };
            
            this.close_popup = function() {
                if (currentPopup) {
                    currentPopup.pop().close();
                }
            };
        }
    ]);

});
