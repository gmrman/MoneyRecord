/*!
*  弹出框dialog属性
*/
var dialogDiv = {
	ID : '',
	HTMLS : "",
    Width : "100%",
    Height : "100",
    BackgroundColor:'#000',
    Top : "30%",
    AutoClose : null,
	init : function(){},
	get:function(n) {
        return config[n];
    },
    set:function(n, v) {
        config[n] = v;
    },
    createDom: function(){
		var div = this.getBgDiv();
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
		div.innerHTML = '<div id="div_back_'+this.ID+'" align="center" style="position:absolute;">'+this.HTMLS+'</div>';;
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
}