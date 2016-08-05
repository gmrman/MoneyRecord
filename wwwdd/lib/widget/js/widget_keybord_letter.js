var topWin = $topWindow();
var topDoc = topWin.document;
	
	
	var Keyboard_letter = function(){
        var config = {};
        this.ID = "";
        this.objID = "";
        this.type = "Lower";
        this.Width = "";
        this.Height = "";
        this.Bottom = "";
        this.NumberCase = {"1":["1","2","3","4","5","6","7","8","9","0"],
						   "2":["-","/",":",";","(",")","$","&","@",'"'],
						   "3":[".",",","?","!","'"]
						   }
        this.SymbolCase = {"1":["[","]","{","}","#","%","^","*","+","="],
						   "2":["_","\\","|","~","<",">","€","£","￥",'·'],
						   "3":[".",",","?","!","'"]
						   }
        this.LetterLowerCase = {"1":["q","w","e","r","t","y","u","i","o","p"],
						        "2":["a","s","d","f","g","h","j","k","l"],
						        "3":["z","x","c","v","b","n","m"]
						        }
        this.LetterUpperCase = {"1":["Q","W","E","R","T","Y","U","I","O","P"],
						        "2":["A","S","D","F","G","H","J","K","L"],
						        "3":["Z","X","C","V","B","N","M"]
						        }
        this.get = function(n) {
            return config[n];
        }
        this.set = function(n, v) {
            config[n] = v;
        }
        this.init();
	}
Keyboard_letter.prototype = {
	init : function(){
        },
	createDom:function(){
		
		var div = topWin.$id("_DialogDiv_" + this.ID);
		if(!div){ 
			div=topDoc.createElement("div");
			div.id="_DialogDiv_"+this.ID;
			topDoc.getElementsByTagName("BODY")[0].appendChild(div);
			div.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;z-index:1000;background-color:#333;opacity:0.4;filter:alpha(opacity=40);";
		}
		var HTMLS ='<div id="Keyboard_letter" class="keyboard_letter-back" align="center">'+
		'<div class="keyboard_letter-top-back">'+
			'<input id="output" type="text" class="keyboard_letter-output" readonly="true" value = "'+((this.objID.value == 0)?"":this.objID.value)+'"/>'+
		'</div>'+
		'<div id="pressback" class="keyboard_letter-number-back"></div>'+
	'</div>';
		div=topDoc.createElement("div");
		div.id="backdrop_"+this.ID;
		var bodyElem = topDoc.getElementsByTagName("body")[0]
		bodyElem.appendChild(div);
		div.innerHTML = HTMLS;
		div.className = "backdrop";
		var pressback = topWin.$id("pressback");
		var type = this.type 
		this.changePress(type);
	},
	bindEvent:function(obj,type){
		var pressback = topWin.$id("pressback");
		var spans = pressback.getElementsByTagName('span');
		var output = topWin.$id("output");
		var upspannum = 0;
		var deletenum = 0;		//删除按钮位置索引
		var deletefun = function(){
				var oldnum = output.value;
				var numlength = oldnum.length;
				output.value = oldnum.substr(0, numlength-1)
		}
		for(var i=0 ; i<(spans.length);i++){
				spans[i].onclick = function(){
					var oldnum = output.value;
					var letter = this.innerHTML;
					letter=((letter == '&amp;')?'&':(letter =='&lt;')?'<':(letter =='&gt;')?'>':letter)
					switch(letter)
					{
						case "space":
							oldnum = oldnum+ ' ';
							output.value = oldnum;
							break;
						case "return":
							obj.objID.value =output.value;
							obj.close()
							break;
						case "ABC":
							obj.changePress('Lower');
							break;
						case "#+=":
							obj.changePress('SymbolCase');
							break;
						case "123":
							obj.changePress('Number')
							break;
						case " ":
						break;
						default:
							oldnum = oldnum+letter;
							output.value = oldnum;
							break;
	
					}
				}
		switch(type)
		{
			case "Upper":
				spans[19].onclick = function(){
					obj.changePress('Lower');
				}
				spans[27].onclick = function(){
					deletefun();
				}
				break;
			case "Lower":
				spans[19].onclick = function(){
					obj.changePress('Upper');
				}
				spans[27].onclick = function(){
					deletefun();
				}
				break;
			case "Number":
				spans[26].onclick = function(){
					deletefun();
				}
				break;
			case "SymbolCase":
				spans[26].onclick = function(){
					deletefun();
				}
			default:
				break;
		}
			
		}

	},
	show:function(){
        this.createDom();
        this.setKeyboard_letterPosition();
        var div = topWin.$id("_DialogDiv_" + this.ID);
        div.style.display = ''
	},
	close:function(){
		var totalDialog = this.getDialogDiv();
			totalDialog.style.display = "none"
        if (isIE) {
            //ie下不能跨窗口拷贝元素，只能跨窗口拷贝html代码
            var fragment = document.createElement("div");
            fragment.innerHTML = totalDialog.outerHTML;
            totalDialog.outerHTML = "";
         //   document.getElementsByTagName("BODY")[0].appendChild(fragment)
        } else {
        	totalDialog.innerHTML = "";
         //   document.getElementsByTagName("BODY")[0].appendChild(totalDialog)
        }
		var div = topWin.$id("backdrop_" + this.ID);
        div.outerHTML = "";
	},
	getDialogDiv:function(){
		var dialogDiv = topWin.$id("_DialogDiv_"+this.ID);
		if(!dialogDiv){
			alert('获取弹出层页面对象出错');
		}try{
			return dialogDiv;
		}finally{
			dialogDiv = null;
		}
	},
	setKeyboard_letterPosition:function(){
		var div = topWin.$id("Keyboard_letter");
		var bd = $bodyDimensions(topWin);
		var inputHeight = ((this.Height.search('%') == -1)?this.Height:parseInt(this.Height.split('%')[0])*bd.clientHeight/100);
		var inputWidth = ((this.Width.search('%') == -1)?this.Width:parseInt(this.Width.split('%')[0])*bd.clientWidth/100 );
		var inputBottom = ((this.Bottom.search('%') == -1)?this.Bottom:parseInt(this.Bottom.split('%')[0])*bd.clientHeight/100 );
		div.style.bottom  = ((inputBottom!="")?inputBottom:(bd.clientHeight -((inputHeight == "")? 350 :inputHeight))/2 )+ "px";
		div.style.left = (bd.clientWidth -((inputWidth == "")? 250 :inputWidth))/2 + "px";
		div.style.width = inputWidth + "px";
		div.style.height = inputHeight + "px";
		//div.style.position  = (bd.clientHeight -300)/2
	},
	changePress:function(type){
		var contentJSON ={}
		var pressback = topWin.$id("pressback");
		var bottombar = '';
		var barhtml = ""
		switch(type)
		{
			case "Upper":
				contentJSON = this.LetterUpperCase;
				var bottombar = '123';
				barhtml = '<span  id="UpperCase" class="keyboard_letter-pressbtn keyboard_letter-btn keyboard_letter-press-Upper"> </span>'
				break;
			case "Lower":
				contentJSON = this.LetterLowerCase;
				var bottombar = '123';
				barhtml= '<span  id="UpperCase" class="keyboard_letter-pressbtn keyboard_letter-btn keyboard_letter-press-Lower"> </span>'

				break;
			case "Number":
				contentJSON = this.NumberCase;
				var bottombar = 'ABC'
				barhtml= '<span  id="UpperCase" name="lower" class="keyboard_letter-pressbtn keyboard_letter-btn keyboard_letter-press-num">#+=</span>'

				break;
			case "SymbolCase":
				contentJSON = this.SymbolCase;
				var bottombar = 'ABC'
				barhtml= '<span class="keyboard_letter-pressbtn keyboard_letter-btn keyboard_letter-press-num">123</span>'
				break;
			default:
				break;
		}
		pressback.innerHTML = '';
			for(var k = 1; k <4;k++){
				var thishtml = '';
				for(var i=0;i<contentJSON[k.toString()].length;i++){
					thishtml += '<span class="keyboard_letter-pressbtn keyboard_letter-btn">'+contentJSON[k.toString()][i]+'</span>'
					if(k == 3 && i == contentJSON[k.toString()].length-1){
						thishtml = barhtml+ thishtml +'<span id="delete" class="keyboard_letter-pressbtn keyboard_letter-btn keyboard_letter-press-delete"> </span>'
					}
					
				}
				thishtml = '<div class="letter-div">' +thishtml +'</div>';
				pressback.innerHTML+=thishtml
			}
		var bottomhtml = '<div class="letter-div">'+
							'<span class="keyboard_letter-btn keyboard_letter-num">'+bottombar+'</span>'+
							'<span class="keyboard_letter-btn keyboard_letter-space">space</span>'+
							'<span class="keyboard_letter-btn keyboard_letter-return">return</span>'+
						'</div>';
		pressback.innerHTML+=bottomhtml;
		this.bindEvent(this,type);
	}
}
function OpenKeyboard_letter(obj,type){
	type =type ||'Lower';
		var keybord = new Keyboard_letter()
		keybord.objID = obj;
		keybord.Width = "100%";
		keybord.Bottom = "0";
		keybord.type = type;
		keybord.show();

}
