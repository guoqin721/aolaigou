/*特价商品倒计时*/
var timer = 0;
function teJiatime () {
	clearInterval(timer);
	var timeResult = '';
	var lastTimer = new Date(2016,9,12);
	var seconds = 0,minutes = 0,hours = 0;
	var floor1Timer  = document.getElementById("floor1_timer");
	timer = setInterval(function  () {
		var nowTime = new Date();
		seconds = parseInt((lastTimer - nowTime)/1000 % 60);
		minutes =  parseInt(((lastTimer - nowTime)/1000-seconds)/60%60);
		hours = parseInt((lastTimer - nowTime)/1000/60/60);
		timeResult ='距离本场结束仅剩:<span>' + get0(hours) + '</span>时<span>' + get0(minutes) + '</span>分<span>' + get0(seconds) + '</span>'; 	
		floor1Timer.innerHTML = timeResult;
	},30);	
	
}
function get0 (n) {
	return n > 9 ? n : ('0' + n) ; 
}


/*轮播图*/
function liMouseEvent () {
	var curIndex = 0;
	var timer = 0;
	var _li =$('#lunbo li').get();
	//alert(_li);
	var _list = $('#lunbo .luna').get();
	for(var i = 0;i < _list.length;i++){
		_li[i].index = i;
		_li[i].onmouseover = function  () {
			//console.log(this.index);
			if(this.index !== curIndex){
				//console.log(i);
				$(_li[this.index]).css('background','#ff3344');
				$(_list[curIndex]).css('display','none');
				$(_list[this.index]).css('display','block');
				$(_li[curIndex]).css('background','#fff');
				curIndex = this.index;
			}	
		};
	}
	$('#lunbo .prveBtn').click(function  () {
		$(_list[curIndex]).css('display','none');
		$(_li[curIndex]).css('background','#fff');
		curIndex --;
		if(curIndex == -1){
			curIndex = 4;
		}
		$(_list[curIndex]).css('display','block');
		$(_li[curIndex]).css('background','#ff3344');
	});
	$('#lunbo .nextBtn').click(function  () {
		$(_list[curIndex]).css('display','none');
		$(_li[curIndex]).css('background','#fff');
		curIndex ++;
		if(curIndex == 5){
			curIndex = 0;
		}
		$(_list[curIndex]).css('display','block');
		$(_li[curIndex]).css('background','#ff3344');
	});
	$('#lunbo .prveBtn').mouseenter(function  () {
		$(this).css('backgroundPosition','0 0');
	});
	$('#lunbo .prveBtn').mouseleave(function  () {
		$(this).css('backgroundPosition','0px -74px');
	});
	$('#lunbo .nextBtn').mouseenter(function  () {
		$(this).css('backgroundPosition','-40px 0');
	});
	$('#lunbo .nextBtn').mouseleave(function  () {
		$(this).css('backgroundPosition','-40px -74px');
	});
	function exec () {
		clearTimeout(timer);
		$(_list[curIndex]).css('display','none');
		$(_li[curIndex]).css('background','#fff');
		curIndex ++;
		if(curIndex == 5){
			curIndex = 0;
		}
		$(_list[curIndex]).css('display','block');
		$(_li[curIndex]).css('background','#ff3344');
		timer = setTimeout(exec,5000);
	}
	exec();
}