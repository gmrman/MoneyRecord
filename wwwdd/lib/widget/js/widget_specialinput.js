//-------------input data-type['number']-----------------
(function(window,undefined){
	var elems = document.getElementsByTagName('input');
	var numInputs = [];//定义数字输入框控件数组
	var searchInputs = [];//定义搜索框控件数组
	var tappluse = function(inputNode){
		var inputnum = ((inputNode.value == "")?0:inputNode.value)
		inputNode.value = parseFloat(inputnum)+1;
		inputNode.onchange();
	};
	var tapeminus = function(inputNode){
		var inputnum = ((inputNode.value == "")?0:inputNode.value)
		inputNode.value = parseFloat(inputnum)-1;
		inputNode.onchange();
	};
	for(var i=0 ; i<elems.length ; i++){
		if(elems[i].hasAttribute("data-type")){
			if(elems[i].getAttribute("data-type") == "number")
				numInputs.push(elems[i]);
			if(elems[i].getAttribute("data-type") == "search")
				searchInputs.push(elems[i]);
		}
	}
	var tapclear = function(inputNode){
		inputNode.value = "";
	}
	/*渲染数字控件*/
	for(i=0;i<numInputs.length;i++){
		var ParentNode = numInputs[i].parentNode;
		var newContainer = document.createElement('div');
		newContainer.className = 'input_Container';
		var inputNode = numInputs[i].cloneNode(true);
		inputNode.onchange = function(){};
		
		var addNode = document.createElement('div');
		addNode.className = 'plus';
		addNode.onclick = function(){tappluse(this.previousSibling)};
		
		var minusNode = document.createElement('div');
		minusNode.className = 'minus';
		minusNode.onclick = function(){tapeminus(this.nextSibling)};
		
		numInputs[i].parentNode.insertBefore(newContainer,numInputs[i]);
		newContainer.appendChild(minusNode);
		newContainer.appendChild(inputNode);
		newContainer.appendChild(addNode);
		ParentNode.removeChild(numInputs[i]);
	}
	/*渲染搜索框控件*/
	for(i=0;i<searchInputs.length;i++){
		var ParentNode = searchInputs[i].parentNode;
		var newContainer = document.createElement('div');
		var attr = document.createAttribute('data-type');
		attr.value = "input_search";
		newContainer.setAttributeNode(attr)
		var inputNode = searchInputs[i].cloneNode(true);
		var SearchSpan = document.createElement('span');
		var ClearSpan = document.createElement('span');
		ClearSpan.onclick = function(){
			tapclear(this.previousSibling.previousSibling)
		};
		searchInputs[i].parentNode.insertBefore(
		newContainer,searchInputs[i]);
		newContainer.appendChild(inputNode);
		newContainer.appendChild(SearchSpan);
		newContainer.appendChild(ClearSpan);
		ParentNode.removeChild(searchInputs[i]);
	}
})(window)
