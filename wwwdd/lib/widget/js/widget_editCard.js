/**
*      编辑卡片module
*
*	
*	
**/
//编辑效果卡片
var card_edit = {
	label_btn:{},
	ID:"",
	cardTitle:'',
	title1:'编辑',
	title2:'完成',
	content1:{},//卡片界面1
	content2:{},//卡片界面2
	HTMLS1:'',//卡片界面1内代码
	HTMLS2:'',//卡片界面2内代码
	whentapFinish :function(param){},
	tapEdit : function(){
		this.label_btn.innerHTML = this.title2;
		console.log(this.label_btn.outerHTML+this.title2)
		this.content1.style.display = "none";
		this.content2.style.display = "block";
	},
	tapFinish : function(){
		this.label_btn.innerHTML = this.title1;
		this.whentapFinish(this.ID)
		this.content1.style.display = "block";
		this.content2.style.display = "none";
	},
	onTap: function(){
		if(this.label_btn.innerHTML == this.title1){
			this.tapEdit();
		}else if(this.label_btn.innerHTML == this.title2){
			this.tapFinish();
		}
	},
	creatCard : function(){
		var div1 = document.createElement('div');
		var att= document.createAttribute('data-role');
		att.value = 'card';
		div1.setAttributeNode(att);
		div1.id= this.ID;
		div1.innerHTML = '<div data-role="card-title"><label data-type="title-left">'+this.cardTitle+'</label><label class="edit-btn" data-type="edit-btn">'+this.title1+'</label></div>'+
		'<div data-role="card-content" data-type="scroll">'+
				'<div class="card_edit_content" data-role="content1">'+this.HTMLS1+'</div>'+
				'<div class="card_edit_content" data-role="content2">'+this.HTMLS2+'</div>'+
		'</div>'+
		'<div data-role="bar-bottom"></div>';
		var cardedit = this;
		this.label_btn = div1.getElementsByClassName('edit-btn')[0];
		this.content1 =  div1.getElementsByClassName('card_edit_content')[0];
		this.content2 =  div1.getElementsByClassName('card_edit_content')[1];
		div1.getElementsByClassName('edit-btn')[0].onclick = function(){
			if(this.innerHTML == cardedit.title1){cardedit.tapEdit();}
			else if(this.innerHTML == cardedit.title2){cardedit.tapFinish();}
		}
		return div1;
	}
}
/*parttern1 左划卡片*/
var li_parttern1={
	touchstart:function(e){
				e.currentTarget.focus();
				nStartY = e.changedTouches[0].screenX;
			    nStartX = e.changedTouches[0].screenX;
				touchfalg = true;
				var toLeft = e.currentTarget.style.left;
				var toLeft = parseInt(toLeft.split("px")[0]) ;
				if( toLeft != 0){
					e.currentTarget.style.left = 0 + 'px';
				}
	},
	touchmove:function(e){
		sh=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
		var changey = e.changedTouches[0].screenY-sh - nStartY;
	    var changex = e.changedTouches[0].screenX - nStartX;
		if(changey < 50){
			if(changex<-10||changex>10){
				var userAgent = navigator.appVersion
				var version = userAgent.substr(userAgent.indexOf('Android') + 8, 3);
				if(version.match('4.4')){ 
			        e.preventDefault();  
			    }
				if(touchfalg){  
					changex = Math.min(Math.max(-100, changex), 0) // restrict to -100px left, 0px right
				   	e.currentTarget.style.left = changex + 'px';
			  	}
			}
		}else{
			touchfalg = false;
		}
	},
	touchend:function(e){
		if(touchfalg){
			var toLeft = e.currentTarget.style.left
			var toLeft = parseInt(toLeft.split("px")[0]) 
			toLeft = ((toLeft > -50)?"0":"-100");
			console.log(e.currentTarget)
			e.currentTarget.style.left = toLeft +'px';
		}
		
		touchfalg = true;
	},
	tapDelete:function(e){},
	HTMLS:'',
	newNode:{},
	creatNode:function(){
		var self = this;
		var newli = document.createElement('li');
		var html_li ='<div>'+self.HTMLS+'</div>'+
		'<span data-type="delete">删除</span>'
		newli.innerHTML = html_li;
		var	spans = newli.getElementsByTagName('span');
		var moveDiv = newli.getElementsByTagName('div')[0];
		moveDiv.addEventListener('touchstart',function(e){li_parttern1.touchstart(e)},false);
		moveDiv.addEventListener('touchmove', function(e){li_parttern1.touchmove(e)},false);
		moveDiv.addEventListener('touchend', function(e){li_parttern1.touchend(e)},false);
		moveDiv.addEventListener('touchend', function(e){
			var change = Math.abs(e.changedTouches[0].screenX - nStartX);
			if(change<5){
				var toLeft = e.currentTarget.parentNode.parentNode.style.left;
				var toLeft = parseInt(toLeft.split("px")[0]);
				if( toLeft == 0){
				}else{
					e.currentTarget.parentNode.parentNode.style.left = 0 + 'px';
				}
			}
		});
		for(var i=0 ; i<spans.length ; i++){
			if(spans[i].hasAttribute("data-type")){
				if(spans[i].getAttribute("data-type") == "delete")
					spans[i].addEventListener('touchend',function(e){
						if(self.tapDelete == undefined){
							li_parttern1.tapDelete(e);
						}else{
							self.tapDelete(e);
						}
						 e.preventDefault();
					},false);
			}
		}
		return newli;
	}
}

var liPattern1 = function(){};
liPattern1.prototype = liPattern1;
//window.liPattern1 = liPattern1;