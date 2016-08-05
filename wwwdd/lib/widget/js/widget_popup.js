/**
	popup 控件
	--请确保已经引用widget_dialog.js文件与widget.js文件
**/


(function(window){
	var popUP = function(mesg){
		mesg = mesg || '';
	    var config = {};
	    this.ID = 'popup'
	    this.Top = "80%";
	    this.Width="100";
	    this.BackgroundColor = 'rgba(255, 255, 255, 0)';
	    this.AutoClose = 2;
	    this.HTMLS = '<div style="background-color: #2F2E2E;color: #fff;min-width: 80px;width:auto;height:40px;border-radius: 20px;line-height: 40px;font-size:12px;">'+mesg+'</div>';
		//this.show();
	}
	popUP.prototype = dialogDiv;
	window.popup = function(mesg){
		var Popup = new popUP(mesg);
		Popup.show();
	};
	var Dialog_button = function(mesg,htmls){
		mesg = mesg || '';
		var self = this;
	    var config = {};
	    this.ID = "dialogbutton";
	    this.Top = "30%";
	    this.Width="80%";
	    this.button = true;
	    this.BackgroundColor = 'black';
	    this.btnOk = function(){};
	    this.HTMLS = '<style>.dilaogbtn{background-color:#E5E9ED;border-radius:5px;}}</style>'+
	    '<div style="background-color:#DDE0E0;color: #73767B;min-width: 80px;height:80px;border-radius: 5px;font-size:14px;">'+
	    '<table cellspacing="0" class="dilaogbtn" align="center" width="100%">'+'<tr><td colspan="2" align="center">'+htmls+mesg+'</td></tr>'+
		'<tr align="center"><td id="dialog_cancle" style="border-right:1px solid #C1C7D0;border-top:1px solid #C1C7D0;height:40px;line-height:40px">关闭</td><td id="dialog_ok" style="border-top:1px solid #C1C7D0;">确认</td>'+
		'</tr></table>'+
	'</div>';
		//this.show();
	}
	Dialog_button.prototype = dialogDiv;
	var Dialog_unbutton = function(mesg){
		mesg = mesg || '';
	    var config = {};
	    this.Top = "30%";
	    this.Width="250";
	    this.ID = "dialogunbutton"
	    this.button = true;
	    this.BackgroundColor = 'rgba(255, 255, 255, 0)';
	    this.AutoClose = 2;
	    this.HTMLS = '<style>.dilaogbtn{background-color:#E5E9ED;border-radius:5px;}.dilaogbtn tr:nth-child(1) td{height:80px;line-height:80px}.dilaogbtn tr:nth-child(2) td{border-top:1px solid #C1C7D0;height:40px;line-height:40px}.dilaogbtn tr:nth-child(2) td:first-child{border-right:1px solid #C1C7D0;}</style>'+
	    '<div style="background-color:#DDE0E0;color: #73767B;min-width: 80px;height:80px;border-radius: 5px;font-size:14px;">'+
	    '<table cellspacing="0" class="dilaogbtn" align="center" width="100%">'+'<tr><td align="center">'+mesg+'</td></tr>'+
		'</table>'+
	'</div>';
		//this.show();
	}
	Dialog_unbutton.prototype = dialogDiv;
	
	window.dialog = function(mesg,param){
		mesg = mesg|| "";
		var flag = ((param == undefined)? false:true)
		if(flag){
			var dialog = new Dialog_button(mesg,param.htmls);
			dialog.htmls = param.htmls

		}else{
			var dialog = new Dialog_unbutton(mesg);
		}
		dialog.show();
		if(flag){
			$id('dialog_cancle').onclick = function(){
				param.btn_Cancle();
				dialog.close();
				}
			$id('dialog_ok').onclick = function(){
				param.btn_Ok();
				dialog.close();
				}
		}
	};})(window)




//popup.prototype = dialogDiv;
//var Loading = new appLoading();
