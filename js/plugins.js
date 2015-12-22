function footer(){	
	var x = window.innerWidth;
	if(x >= 1600){
		document.getElementById('body').style.minHeight = window.innerHeight - 272 + 'px';
	} else {
		document.getElementById('body').style.minHeight = window.innerHeight - 240 + 'px';
	}
}
function naviSecondery(num) {
	var naviSecondery = document.getElementsByClassName('naviSeconderyBtn');
	for(var x = 0;x < naviSecondery.length;x++){
		if(x != num){
			naviSecondery[x].setAttribute('class','naviSeconderyBtn fontNormal');
		} else {
			naviSecondery[x].setAttribute('class','naviSeconderyBtn fontNormal naviSeconderyBtnActive');
		}
	}
}
function moreMenu(){
	var menu = document.getElementById('moreMenu');
	var moreBtn = document.getElementById('moreBtn');
	document.addEventListener('click',function(e){
		if(moreBtn == e.target && menu.style.display == 'none'){
			menu.style.display = 'block';
			setTimeout(function(){				
				menu.style.opacity = '1';
			},0)
		}
		if(moreBtn != e.target && menu.style.display == 'block'){
			menu.style.opacity = '0';
			setTimeout(function(){
				menu.style.display = 'none';
			},200)
		}
	})
}