(function(window,undefined){
	var elems = document.getElementsByTagName('div');
	var bd = $bodyDimensions(window);
	var navbar1 = []//第一类导航栏
	
	for(var i=0 ; i<elems.length ; i++){
		if(elems[i].hasAttribute("data-type")){
			if(elems[i].getAttribute("data-type") == "navbar1")
				navbar1.push(elems[i]);
		}
	}
	for(i=0 ; i<navbar1.length ; i++){
		if(navbar1[i].hasChildNodes()){
			var navbar1_child = [];
			var navbar1_main = [];
			var click_num = 0;
			for(var k=0;k<navbar1[i].children.length;k++){
				if(navbar1[i].children[k].getAttribute("data-type") == "child")
				navbar1_child.push(navbar1[i].children[k]);
				if(navbar1[i].children[k].getAttribute("data-type") == "main")
				navbar1_main.push(navbar1[i].children[k]);
			}
			navbar1_main[0].style.left = (bd.clientWidth - 60)	/2  +'px';
			navbar1_child[0].style.left = (bd.clientWidth - 50)	/2 - 80 +'px';
			navbar1_child[1].style.left = (bd.clientWidth - 50)	/2 +'px';
			navbar1_child[2].style.left = (bd.clientWidth - 50)	/2 + 80 +'px';
			navbar1_main[0].onclick = function(){
				k = 0;
				if(click_num == 0) {
					//for(k;k<navbar1_child.length;k++){	
						navbar1_child[0].classList.add('vs-move-out-child1');
						navbar1_child[0].addEventListener('webkitTransitionEnd', function () {
						//	this.style.visibility="visible";
							this.className = "navbar1-child1"				
						});
						navbar1_child[1].classList.add('vs-move-out-child2');
						navbar1_child[1].addEventListener('webkitTransitionEnd', function () {
						//	this.style.visibility="visible";
							this.className = "navbar1-child2"				
						});
						navbar1_child[2].classList.add('vs-move-out-child3');
						navbar1_child[2].addEventListener('webkitTransitionEnd', function () {
						//	this.style.visibility="visible";
							this.className = "navbar1-child3"				
						});
					//}
					click_num ++;
				}else{
					//for(k;k<navbar1_child.length;k++){
						navbar1_child[0].classList.add('vs-move-fade-child1');
						navbar1_child[0].addEventListener('webkitTransitionEnd', function () {								 this.className = ""	
						//	  this.style.visibility="hidden";
						});
						navbar1_child[1].classList.add('vs-move-fade-child2');
						navbar1_child[1].addEventListener('webkitTransitionEnd', function () {								 this.className = ""	
						//	  this.style.visibility="hidden";
						});
						navbar1_child[2].classList.add('vs-move-fade-child3');
						navbar1_child[2].addEventListener('webkitTransitionEnd', function () {								 this.className = ""	
						//	  this.style.visibility="hidden";
						});
					//}
					click_num --;
				
				}
			}
			
		}
	}
	
	function div_transfrom(num,dir,obj){
	obj.addEventListener('webkitTransitionEnd', function () {
		cleanClasses(obj);
		addAllClass(obj,'vs-right moveli ',num-1,obj.childElementCount-1);
		addAllClass(obj,'vs-left moveli ',0,num);
		if(targetNode!=undefined){
			targetNode.className+= ' '+'vs-current moveli ';
		}
	});
		var targetNode=obj.children[num];
		var rightNode=targetNode.nextElementSibling;
		var leftNode=targetNode.previousElementSibling;
		if(dir==='right'){
			targetNode.classList.add('vs-move-'+dir);
			rightNode.classList.add('vs-move-'+dir);
		}
		if(dir==='left'){
			targetNode.classList.add('vs-move-'+dir);
			leftNode.classList.add('vs-move-'+dir);
		}
}

	
})(window)