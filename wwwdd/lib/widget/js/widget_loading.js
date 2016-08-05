/**
	loading 控件
	--请确保已经引用widget_dialog.js文件与widget.js文件
**/
var appLoading = function(TYPE){
	TYPE = TYPE || 'type1'
    var config = {};
    this.Top = "60%";
    switch(TYPE)
	{
		case "type1":
			this.HTMLS = '<img src="widget/image/loading1.gif"/>';
			break;
		case "type2":
		    this.HTMLS = '<span class="ui-icon-loading"></span>';
			break;
		default:
			this.HTMLS = '<img src="widget/image/'+this.imgurl+'"/>';
			break;
	}
	this.ID = 'loading'

}
appLoading.prototype = dialogDiv;
var Loading = new appLoading('type2');
