var Keyboard = function(){
    var config = {};
    this.objID = "";
    this.Width = "250"
    this.Content = ['1','2','3','4','5','6','7','8','9','.','0']
    this.HTMLS = '<div id="keyboard" class="keyboard-back" align="center">'+
	'<div class="keyboard-top-back">'+
		'<input id="output" type="text" class="keyboard-output" readonly="true" value = "'+((this.objID.value == 0 ||this.objID.value == undefined)?"":this.objID.value)+'"/>'+
	'</div>'+
	'<div id="pressback" class="keyboard-number-back">'+'<span class="keyboard-pressbtn keyboard-btn">'+this.Content[0]+'</span><span class="keyboard-pressbtn keyboard-btn">'+this.Content[1]+'</span><span class="keyboard-pressbtn keyboard-btn">'+this.Content[2]+'</span><br/><span class="keyboard-pressbtn keyboard-btn">'+this.Content[3]+'</span><span class="keyboard-pressbtn keyboard-btn">'+this.Content[4]+'</span><span class="keyboard-pressbtn keyboard-btn">'+this.Content[5]+'</span><br/><span class="keyboard-pressbtn keyboard-btn">'+this.Content[6]+'</span><span class="keyboard-pressbtn keyboard-btn">'+this.Content[7]+'</span><span class="keyboard-pressbtn keyboard-btn">'+this.Content[8]+'</span><br/><span class="keyboard-pressbtn keyboard-btn">'+this.Content[9]+'</span><span class="keyboard-pressbtn keyboard-btn">'+this.Content[10]+'</span><span class="keyboard-pressbtn keyboard-btn keyboard-press-delete"> </span><br/>'+'</div>'+
	'<div class="keyboard-button-back">'+
		'<span id="btn_cancle" class="keyboard-btn-bottom keyboard-btn-cancle">取消</span>'+
		'<span id="btn_ok" class="keyboard-btn-bottom keyboard-btn-ok">确定</span>'+
	'</div>'+
'</div>';

this.bindEvent=function(){
	var obj = this;
	var pressback = topWin.$id("pressback");
	var spans = pressback.getElementsByTagName('span');
	var btn_cancle = topWin.$id("btn_cancle");
	var btn_ok = topWin.$id("btn_ok");
	var output = topWin.$id("output");
	btn_cancle.onclick = function(){
		obj.close()
	}
	btn_ok.onclick = function(){
		obj.objID.value = ((output.value == "")?"0":output.value);
		obj.close()
	}
	for(var i=0 ; i<(spans.length-1);i++){
		spans[i].onclick = function(){
			var oldnum = output.value;
			var thisnum = this.innerHTML
			 oldnum = oldnum+thisnum;
			 output.value = oldnum
		}
	}
	spans[11].onclick = function(){
			var oldnum = output.value;
			var numlength = oldnum.length;
			 output.value = oldnum.substr(0, numlength-1)
	}

},

    this.init();
}
	
	
Keyboard.prototype = dialogDiv;
var keyboard = new Keyboard();
/*
function OpenKeyboard(obj){
	var keybord = new Keyboard()
	keybord.objID = obj;
	keybord.show();
}
*/
(function(window,undefined){
	var elems = document.getElementsByTagName('div');
	var bd = $bodyDimensions(window);
	var inputs = []//第一类导航栏
	for(var i=0 ; i<elems.length ; i++){
		if(elems[i].hasAttribute("data-role")){
			if(elems[i].getAttribute("data-role") == "number")
			inputs.push(elems[i]);
		}
	}


})(window)