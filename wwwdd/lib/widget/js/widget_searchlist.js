
(function(window,undefined){
	var elems = document.getElementsByTagName('div');
	var bd = $bodyDimensions(window);
	var searchlist = []//搜索内容展示容器
	
	for(var i=0 ; i<elems.length ; i++){
		if(elems[i].hasAttribute("data-role")){
			if(elems[i].getAttribute("data-role") == "searh-rlist")
				searchlist.push(elems[i]);
		}
	}
	
	for(var k=0 ;k<searchlist.length ; k++){
		var elem = searchlist.pop();
		if(elem.children.length == 0){
			elem.style.backgroundImage = "url('../image/icon-error-search.png')";
		}else{
			elem.style.backgroundImage = "";
		}
	}
	
	
})()