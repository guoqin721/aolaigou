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
/*floor3放大*/
function floor2_expand () {
	var curIndex = 2;
	var _list = $('#floor2_tupian .floor2_box').get();
	$('#floor2_tupian .floor2_box').mouseenter(function  () {
		for(var i =0;i < _list.length;i++){
			_list[i].index = i;
			if(this.index !==  curIndex){
				$(_list[curIndex]).finish().animate({width:"200px"});
				$(_list[curIndex]).children('a').animate({"height":"440px"});
				$(_list[curIndex]).children('.baiye_da').css({display:"none"});
				$(_list[curIndex]).children('.baiye_xiao').css({display:"block"});
				
				$(this).animate({width:"400px"});
				$(this).children('a').finish().animate({"height":"420px"});
				//console.log($(this));
				$(this).children('.baiye_da').finish().css({display:"block"});
				$(this).children('.baiye_xiao').finish().css({display:"none"});
				curIndex = this.index;
				
			}
		}
	});
}

/*floor3_hotSale*/
function dataLoad () {
	$.post("floor3_hotsale.json",null,function(data,textStatus) {
		if(textStatus == 'success'){
			hotSale (data);
		}
	},"json");
	$.post("floor3_moldbaby.json",null,function(data,textStatus) {
		if(textStatus == 'success'){
			//alert('ok')
			moldbaby (data);
			hotsaleTab ();
		}
	},"json");
}
function hotSale (data) {
	$('#datu a').get(0).href = data.data[0].href;
	$('#datu img').get(0).src = data.data[0].src;
	for(var i = 0;i <= 1;i++  ){
		$('#hotul1 a').get(i).href = data.data[i+1].href;
		$('#hotul1 img').get(i).src = data.data[i+1].src;
	}
	for(var i = 0;i <= 2;i++  ){
		$('#hotul2 a').get(i).href = data.data[i+3].href;
		$('#hotul2 img').get(i).src = data.data[i+3].src;
	}
	for(var i = 0;i <= 2;i++  ){
		$('#hotul3 a').get(i).href = data.data[i+6].href;
		$('#hotul3 img').get(i).src = data.data[i+6].src;
	}
}
function moldbaby (data) {
	$('#moldbaby li img').each(function  (index) {
		this.src = data.data[index].src;

	});
	$('#moldbaby ul li>a').each(function  (index) {
		this.href = data.data[index].href;
	});
	$('.moldbaby_tip>a').each(function  (index) {
		this.href = data.data[index].href;
		$(this).html(data.data[index].tip);
	});
	$('.moldbaby_prise').each(function  (index) {
		$(this).children('em').html(data.data[index].prise).siblings('del').html(data.data[index].prise_s);
	});
}
	/*tab的切换*/
function hotsaleTab () {
	$('#f3cont_tip span').mouseenter(function  () {
		var index = $(this).index();
		$(this).removeClass('tip1');
		$(this).addClass('tip2');
		$(this).siblings().removeClass('tip2');
		$(this).siblings().addClass('tip1');
		$('.main').eq(index).css('display','block');
		$('.main').eq(index).siblings('.main').css('display','none');
	});
}
