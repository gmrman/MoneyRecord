//-------------input data-type['number']-----------------
(function(window,undefined){
	var elems = document.getElementsByTagName('input');
	var numInputs = []
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
		}
	}
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
})(window)
/*-------------/input data-type['srearch']-----------------*/
/****************************************data-type=search属性**************************************/ 
// window.onload = function (){
// 	research1();
// 	openClose();
// }

(function(window,undefined){
	var elems = document.getElementsByTagName("input");
	var numInputs = [];
	var onFoc = function(inputNode) {
		inputNode.value == "" ? inputNode.nextSibling.style.width = "0px" : inputNode.nextSibling.style.width='22px';
	};
	var onCli = function(inputNode) {
		inputNode.value='';
		inputNode.nextSibling.style.width='0px';
	}
	for(var i=0; i<elems.length; i++){
		if(elems[i].hasAttribute("data-type")){
			if(elems[i].getAttribute('data-type') == 'research'){
				numInputs.push(elems[i]);
			}			
		}
	}
	console.log(numInputs);
	for(i=0; i<numInputs.length; i++){
		var ParentNode = numInputs[i].parentNode;
		var newContainer = document.createElement('div');
		newContainer.className = "icon-mySearch";
		numInputs[i].onfocus = function(){onFoc(this)};
		numInputs[i].onblur = function(){onFoc(this)};
		var aP = document.createElement('p');
		var aSp = document.createElement('span');
		aP.className='icon-search';
		aSp.className='icon-clear';
		numInputs[i].parentNode.insertBefore(newContainer, numInputs[i]);
		newContainer.appendChild(aP);
		ParentNode.removeChild(numInputs[i]);
		newContainer.appendChild(numInputs[i]);
		newContainer.appendChild(aSp);
		aSp.onclick = function(){onCli(this.previousSibling)};

	}	
	var elems=document.getElementsByTagName('input');
	var numIputs=[];
	for(var i=0;i<elems.length;i++){
		if (elems[i].hasAttribute('data-type')) {
			if (elems[i].getAttribute('data-type') == 'switch') {
				numIputs.push(elems[i]);
			};
		};
	}
	var onTap = function(tap){
		if (tap.checked) {
			tap.parentNode.style.backgroundColor="#3380C3";
		}else{
			tap.parentNode.style.backgroundColor="#4f5E6C";
		};
	}
	for(i=0;i<numIputs.length;i++){
		var parentNode1=numIputs[i].parentNode;
		var newContainer=document.createElement('label');
		newContainer.className="icon-button";
		var oneSp = document.createElement('span');
		var twoSp = document.createElement('span');
		twoSp.className="icon-change";
		twoSp.innerHTML="on";
		var threeSp=document.createElement('span');
		threeSp.className="icon-change";
		threeSp.innerHTML="off";
		numIputs[i].parentNode.insertBefore(newContainer, numIputs[i]);
		parentNode1.removeChild(numIputs[i]);
		newContainer.appendChild(numIputs[i]);
		newContainer.appendChild(oneSp);
		newContainer.appendChild(twoSp);
		newContainer.appendChild(threeSp);
		numIputs[i].onclick=function(){ onTap(this) }
	}
})()
	

