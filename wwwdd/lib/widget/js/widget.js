(function(window){
	$topWindow = function () {//通用函数，获取顶端窗口
	    var parentWin = window;
	    while (parentWin != parentWin.parent) {
	        if (parentWin.parent.document.getElementsByTagName("FRAMESET").length > 0) break;
	        parentWin = parentWin.parent;
	    }
	    return parentWin;
	};
	var topWin = $topWindow();
	var topDoc = topWin.document;
	Date.prototype.getToday = function(){//type'YYYY-MM-DD'
		var d = new Date();
		var day = ((parseInt(d.getDate())<10)?"0"+d.getDate():d.getDate())
		var month = ((parseInt(d.getMonth()+1)<10)?"0"+(d.getMonth()+1):(d.getMonth()+1))
		var str = d.getFullYear()+"-"+month+"-"+day;
		return str;
	}
	Date.prototype.getTodayTime = function(){//type'YYYY-MM-DD'
		var d = new Date();
		var day = ((parseInt(d.getDate())<10)?"0"+d.getDate():d.getDate())
		var month = ((parseInt(d.getMonth()+1)<10)?"0"+(d.getMonth()+1):(d.getMonth()+1))
		var str = d.getFullYear()+"-"+month+"-"+day+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+".000";
		return str;
	}
	Date.prototype.getWeek = function(day){//type'YYYY-MM-DD'
		var week = new Date(day).getDay()
		switch(week)
		{
		case 0:
		  return '周天'
		  break;
		case 1:
		  return '周一'
		  break;
		case 2:
		  return '周二'
		  break;
		case 3:
		  return '周三'
		  break;
		case 4:
		  return '周四'
		  break;
		case 5:
		  return '周五'
		  break;
		case 6:
		  return '周六'
		  break;
		default:
		  return week
		}
	}
	$id = function (id) {//通用函数，通过id获取元素
	    return typeof id == "string" ? document.getElementById(id) : id;
	};
	$radio = function (name) {//通用函数，通过id获取元素
		try{
		   var radios = document.getElementsByName(name);
		   for(var i=0;i<radios.length;i++){
			   if(radios[i].checked){
				   return radios[i];
			   }
		   }
		   return {value:""}
	   }catch(e){
		   return {value:""}
	   }
	};
	$bodyDimensions = function(win){//通用函数，获取屏幕值
		win=win||window;
		var doc = win.document;
		var cw = ((doc.compatMode == "BackCompat")?doc.body.clientWidth:doc.documentElement.clientWidth);
		var ch = ((doc.compatMode == "BackCompat")?doc.body.clientHeight:doc.documentElement.clientHeight);
		var sl = Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);
		var st = Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);
		var sw = Math.max(doc.documentElement.scrollWidth,doc.body.scrollWidth);
		var sh = Math.max(doc.documentElement.scrollHeight,doc.body.scrollHeight);
		var w = Math.max(cw,sw);
		var h = Math.max(ch,sh);
		return{
			"clientWidth": cw,
			"clientHeight": ch,
			"scrollLeft": sl,
			"scrollTop": st,
			"scrollWidth": sw,
			"scrollHeight": sh,
			"width": w,
			"height": h
		}
	}

	window.$bodyDimensions = $bodyDimensions;
	window.$id = $id;
	window.$radio = $radio;
	/*界面弹窗对象*/
	var dialogDiv = {
		ID : '',
		HTMLS : "",
	    Width : "100%",
	    Height : "100",
	    BackgroundColor:'#000',
	    Top : "30%",
	    AutoClose : null,
	    BackClose:false,
		init : function(){},
		get:function(n) {
	        return config[n];
	    },
	    set:function(n, v) {
	        config[n] = v;
	    },
	    createDom: function(){
			var div = this.getBgDiv();
			var _self = this;
			if(!div){
				div=topDoc.createElement("div");
				div.id="_DialogDiv_"+this.ID;
				topDoc.getElementsByTagName("BODY")[0].appendChild(div);
				div.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;z-index:1000;background-color:"+this.BackgroundColor+";opacity:0.4;filter:alpha(opacity=40);";
			}
			div=topDoc.createElement("div");
			div.id="backdrop_"+this.ID;
			div.style.cssText="position:fixed;left:0;top:0;width:100%;height:100%;z-index:1001;";

			topDoc.getElementsByTagName("BODY")[0].appendChild(div);
			div.innerHTML = '<div id="div_back_'+this.ID+'" align="center" style="position:absolute;">'+this.HTMLS+'</div>';
			if(_self.BackClose){
				div.onclick = function(){
					_self.close();
					//e.preventDefault();
				}
			}
	    },
	    autoClose : function(){
			if(this.closed) {
				clearTimeout(this._closeTimeoutId);
				return;
			}
			this.AutoClose -= 1;
			if(this.AutoClose <= 0){
				this.close();
			}else{
				var self = this;
				this._closeTimeoutId = setTimeout(function(){
					self.autoClose();
				}, 1000);
			}
		},
	    bindEvent : function(){},
		show:function(){
	        this.createDom();
	        this.setPosition();
	        this.bindEvent();
	        var div = topWin.$id("_DialogDiv_" + this.ID);
	        div.style.display = '';
	        if (this.AutoClose && this.AutoClose > 0) this.autoClose();
		},
	    close:function(){
			var totalDialog = this.getBgDiv();
			totalDialog.style.display = "none";
			$id('backdrop_'+this.ID).innerHTML = "";
			$id('backdrop_'+this.ID).outerHTML = "";
			this.closed = true;
	    },
	    getBgDiv:function(){
			var dialogDiv = topWin.$id("_DialogDiv_"+this.ID);
			if(!dialogDiv){
				//alert('获取弹出层页面对象出错');
			}try{
				return dialogDiv;
			}finally{
				dialogDiv = null;
			}
	    },
	    setPosition:function(){
			var bd = $bodyDimensions(topWin);
			var Targetdiv = topWin.$id("div_back_"+this.ID);
			var divHeight = ((this.Height.search('%') == -1)?this.Height:parseInt(this.Height.split('%')[0])*bd.clientHeight/100);
			var divWidth = ((this.Width.search('%') == -1)?this.Width:parseInt(this.Width.split('%')[0])*bd.clientWidth/100 );
			var divTop = ((this.Top.search('%') == -1)?this.Top:parseInt(this.Top.split('%')[0])*bd.clientHeight/100 );
			Targetdiv.style.top  = ((divTop!="")?divTop:(bd.clientHeight -((divHeight == "")? 350 :inputHeight))/2 )+ "px";
			Targetdiv.style.left = (bd.clientWidth -((divWidth == "")? 250 :divWidth))/2 + "px";

			Targetdiv.style.width = divWidth + "px";
			Targetdiv.style.height = divHeight + "px";
	},
};

/**
	popup 控件
**/

	var popUP = function(mesg){
		mesg = mesg || '';
	    var config = {};
	    this.ID = 'popup'
	    this.Top = "80%";
	    this.Width="100";
	    this.BackgroundColor = 'rgba(255, 255, 255, 0)';
	    this.AutoClose = 2;
			if(mesg == '工作提报成功！！'){
				this.Top="30%";
				this.HTMLS='<div class="ui-content pk-box"><p>'+mesg+'</p></div>';
			}else{
	    	this.HTMLS = '<div style="background-color: #2F2E2E;color: #fff;min-width: 80px;height:40px;border-radius: 20px;line-height: 40px;font-size:12px;">'+mesg+'</div>';
			}
		//this.show();
	};
	popUP.prototype = dialogDiv;
	window.popup = function(mesg){
		var Popup = new popUP(mesg);
		Popup.show();
	};
	var popError = function(mesg){
		mesg = mesg || '';
	    var config = {};
	    this.ID = 'popup'
	    this.Top = "80%";
	    this.Width="150";
	    this.BackgroundColor = 'rgba(255, 255, 255, 0)';
	    this.AutoClose = 2;
	    this.HTMLS = '<div style="background-color: red;color: #fff;min-width: 100px;height:40px;border-radius: 20px;line-height: 40px;font-size:12px;">'+mesg+'</div>';
		//this.show();
	};
	popError.prototype = dialogDiv;
	window.errorpop = function(mesg){
		var Errorpop = new popError(mesg);
		Errorpop.show();
	};
	var Dialog_button = function(mesg,htmls){
		mesg = mesg || '';
		var self = this;
	    var config = {};
	    this.ID = "dialogbutton";
	    this.Top = "20%";
	    this.Width="80%";
	    this.button = true;
	    this.BackgroundColor = 'rgba(255, 255, 255, 0)';
	    this.btnOk = function(){};
	    this.HTMLS = '<style>.dilaogbtn{background-color:#E5E9ED;border-radius:5px;}}</style>'+
	    '<div style="background-color:#DDE0E0;color: #73767B;min-width: 80px;height:80px;border-radius: 5px;font-size:14px;">'+
	    '<table cellspacing="0" class="dilaogbtn" align="center" width="100%">'+'<tr><td colspan="2" align="center">'+htmls+mesg+'</td></tr>'+
		'<tr align="center"><td id="dialog_cancle" style="border-right:1px solid #C1C7D0;border-top:1px solid #C1C7D0;height:40px;line-height:40px">取消</td><td id="dialog_ok" style="border-top:1px solid #C1C7D0;">确认</td>'+
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
};
	var Dialog_edit = function(mesg,type,id){
		mesg = mesg || '';
	    var config = {};
	    this.Top = "20%";
	    this.Width="250";
	    this.ID = "dialogedit"+id
	    this.button = true;
	    this.BackClose = type;
	    this.BackgroundColor = 'black';
			if(id!="btn_commit"){
				this.HTMLS ='<div style="background-color:#fff;color: #000;min-width: 80px;height:auto;border-radius: 10px;font-size:14px;">'+mesg+'</div>';
			}else{
	    	this.HTMLS='<div class="ui-content pk-box"><p>'+mesg+'</p></div>';
			}
		//this.show();
	}
	Dialog_edit.prototype = dialogDiv;
	window.$dialog = function(mesg,type,id){
		id = id||"";
		type = ((type==undefined)?true:false)
		var $dialog = new Dialog_edit(mesg,type,id);
		$dialog.show();
		return $dialog;
	}
/**日历控件
**/
var calendar={
	touchfalg:true,
	touchstart:function(e){
				this.touchfalg = true;
				e.currentTarget.focus();
				nStartY = e.changedTouches[0].screenX;
			    nStartX = e.changedTouches[0].screenX;
				var toLeft = e.currentTarget.style.left;
				var toLeft = parseInt(toLeft.split("px")[0]) ;
				if( toLeft != 0){
					e.currentTarget.style.left = 0 + 'px';
				}
	},
	touchmove:function(e){
		var _self = this
			sh=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
		var changey = e.changedTouches[0].screenY-sh - nStartY;
	    var changex = e.changedTouches[0].screenX - nStartX;
		if(changey < 100){
			var userAgent = navigator.appVersion
			var version = userAgent.substr(userAgent.indexOf('Android') + 8, 3);
			if(version.match('4.4')){e.preventDefault();}
			if(changex<-30){
				if(_self.touchfalg){//下一个月
					_self.touchfalg = false;
					_self.dnM();
				}
			}else if(changex>30){
				if(_self.touchfalg){//上一个月
					_self.touchfalg = false;
					this.upM();
				}
			}

		}
	},
	SelectFun : function(target){},
	dnMFun : function(target){},
	upMFun : function(target){},
	touchend:function(e){
		with(this){
		try{
			var toLeft = e.currentTarget.style.left
			var toLeft = parseInt(toLeft.split("px")[0])
			if(toLeft<5||toLeft>-5){
				var target = ((e.target)?e.target:e.targetTouches[0]);
				if(target.getAttribute("date-title") != "" &&target.getAttribute("date-title")!=null){
					var tds = document.getElementsByClassName('calendar_today');
					if(tds.length>0){tds[0].classList.remove('calendar_today')}
					//target.className +=" calendar_today";
					target.classList.add('calendar_today')
					var selected = document.getElementsByClassName('calendar_today');
					this.SelectFun(selected[0]);
				}
			}
			e.preventDefault();
		}catch(e){
			console.log(e)
		}
		}
	},
	STR:function(){
		with(this.data)
		return ""+Y+"."+M+'月';
	},
	V:function(spli){
		with(this)
		return ""+data.Y+"-"+((data.M<10)?"0"+data.M:data.M)+"-"+((data.D<10)?"0"+data.D:data.D)
	},
	T:function(){
		with(this)
		return data.TABLE
	},
	dnY:function(){
		with(this) {
			calendarChange(data.Y+1,data.M-1,data.D)
		}
	},
	dnM:function(){
		with(this){
			var _self = this;
			calendarChange(data.Y,data.M,data.D);
			dnMFun(_self.V());
		}
	},
	upY:function(){
		with(this){
			calendarChange(data.Y-1,data.M-1,data.D)
		}
	},
	upM:function(){
		with(this){
			var _self = this;
			calendarChange(data.Y,data.M-2,data.D);
			upMFun(_self.V());
		}
	},
	day:function(o){
		with(this){
			data.D=o;calendarChange(data.Y,data.M-1,data.D)
		}
	},
	data:{
		Y:null,
		M:null,
		D:null,
		W:null,
		H:null,
		U:null,
		YMD:null,
		YMD_C:"hot",
		ARR:null,
		TABLE:null,
		MN:null,
		WN:["週天","週一","週二","週三","週四","週五","週六"],
		SELECT:null,
		TADAY:new Date(),
		TADAY_C:"calendar_today",
		ROWLEN:7,
		VALUE:null
	},
	creatTable:function(){
		with(this){
			var table="<table height=100% width=100%><tr>";
			for(var i=0;i<data.ROWLEN;i++){
				var t=data.WN[i]||" ";
				table+="<th>"+t+"</th>";
			}
			for(var i in data.ARR){
				var showText=data.ARR[i]||" ",showTitle=data.ARR[i]||" ",br=i%data.ROWLEN,title,css="";
				if(!br){
					table+="</tr><tr>"
				};
				showTitle = ((showTitle<10)?"0"+showTitle:showTitle)
				data.ARR[i]?title=data.Y+"-"+((0<data.M<10)? "0"+data.M : data.M)+"-"+showTitle:title="";
				if(String(data.D)==String(data.ARR[i])){
					css+=""+data.YMD_C;
				}
				//if(data.YMD.getFullYear()==data.TADAY.getFullYear()&&data.YMD.getMonth()==data.TADAY.getMonth()&&String(data.TADAY.getDate())==String(data.ARR[i])){
				if(String(data.TADAY.getDate())==String(data.ARR[i])){
					css=" "+data.TADAY_C
				}
				table +="<td date-title='"+title+"' class="+css+">"+showText+"</td>";
			}
			table+="</tr></table>"
			data.TABLE=table;
			return table;
		}
	},
	calendarStarArr:function(userY,userM,userD){
		with(this){
			var Arr=[];
			var now = new Date(userY,userM,userD);
			var LastDay = now.getLastDay();
			var FirstDayofWeek = now.FirstDayofWeek();
			data.YMD=now;data.Y=now.getFullYear();
			data.M=now.getMonth()+1;
			data.D=now.getDate();
			data.W=now.getDay();
			while(Arr.length!=FirstDayofWeek){
				Arr.push(false)
			}
			for(var i=0;i<LastDay;i++){
				Arr.push(i+1)
			}
			while(Arr.length%data.ROWLEN!=0){
				Arr.push(false)
			}
			data.ARR=Arr;return Arr;
		}
	},
	calendarChange:function(userY,userM,userD){
		with(this){
			try{
			var _self = this;
			calendarStarArr(userY,userM,userD);
			creatTable(userD) ;
			var calendar_body=document.getElementById("calendar_body")
			calendar_body.innerHTML=_self.T();//显示表格
			$id('calendar_title').innerHTML = _self.STR();
			$id('calendar_title').name = _self.V();
			}catch(e){
				alert(e)
			}
		}
	},
	calendarStar:function(userY,userM,userD){
		with(this){
			data.MN = ["零","一","二","三","四","五","六","七","八","九","十","十一","十二"];
			calendarChange(userY,userM,userD);
		}
	},
	init:function(){
		with(this){
			Date.prototype.getLastDay=function(){
				return(new Date(this.getFullYear(),this.getMonth()+1,0).getDate())
			}
			Date.prototype.FirstDayofWeek=function(){
				return(new Date(this.getFullYear(),this.getMonth(),1).getDay())
			}

			calendarStar(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
			var calendar_body=document.getElementById("calendar_body")
			calendar.binFunction(calendar_body);
		}
	},
	binFunction:function(Target){
		with(this){
			var _self  = this;
			Target.addEventListener('touchstart',function(e){
				_self.touchstart(e);
				console.log('touchstart');

				},false);
			Target.addEventListener('touchmove', function(e){
				_self.touchmove(e);
				},false);
			Target.addEventListener('touchend', function(e){
				_self.touchend(e);
				},false);
		}
	}
}
window.calendar = calendar;
/*导航条more弹窗
	var barSide = (function(){
		var div = document.createElement('div');
		div.className = "barSideCss";
		topDoc.getElementsByTagName("BODY")[0].appendChild(div);
		div.innerHTML='test'
	})()
*/
})(window)
