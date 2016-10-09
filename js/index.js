/*特价商品倒计时*/
var timer = 0;
function teJiatime () {
	clearInterval(timer);
	var timeResult = '';
	var lastTimer = new Date(2016,9,22);
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
	$.post("json/floor3_hotsale.json",null,function(data,textStatus) {
		if(textStatus == 'success'){
			hotSale (data);
		}
	},"json");
	$.post("json/floor3_moldbaby.json",null,function(data,textStatus) {
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
		$('.main').eq(index).css('display','none');
		$('.main').eq(index).siblings('.main').css('display','block');
	});
}
/*floor4切换*/
function f4DataLoad () {
	$.post("json/floor4goods.json",null,function(data,textStatus) {
		if(textStatus == 'success'){
			dealData(data);
		}
	},"json");
}
/*f4给每个tab添加图片*/
function dealData (data) {
	$('#boxright .main').each(function  (index) {
		//console.log($('#boxright .main'));
		if(index == 5){
			hotLoad(data);
		}else{
			f4OtherLoad(data,index);
		}
	});
}
function hotLoad (data) {
	$('#boxright #hot li').not('.lilun').each(function  (index) {
		//console.log($('#boxright #hot li').not('.lilun'));
		$(this).find('img').attr("src",data.Data[0].data[index].src);
	});
	$('#boxright #hot li').filter('.lilun').find('img').each(function  (index) {
		$(this).attr("src",data.Data[0].data[(index+1)].src);
		//console.log(data.Data[0].data[(index+1)]);
	});
	f4smallLunbo();
}
function f4OtherLoad(data,ind) {
	//console.log($('#boxright .main').eq(1));
	//console.log($('#boxright .main').eq(4));
	$('#boxright .main').eq(ind).find('.divimg a').each(function  (index) {
		//console.log($(this));
		$(this).attr("href",data["Data"][5-ind].data[index].href)
		$(this).children().attr("src",data.Data[5-ind].data[index].src);
		//console.log($(this).next());
	});
	$('#boxright .main').eq(ind).find('.namatip a').each(function  (index) {
		$(this).attr("href",data.Data[5-ind].data[index].href).html(data.Data[5-ind].data[index].tip);
	});
	$('#boxright .main').eq(ind).find('.divprise em').each(function  (index) {
		$(this).html(data.Data[5-ind].data[index].prise).next().html(data.Data[5-ind].data[index].prise_s);
	});
	f4Tab ();
}
function f4Tab () {
	$('#f4cont_tip span').mouseenter(function  () {
		var index = $(this).index();
		$(this).removeClass('tip1');
		$(this).addClass('tip2');
		$(this).siblings().removeClass('tip2');
		$(this).siblings().addClass('tip1');
		$('#boxright .main').eq(index).css('display','block');
		$('#boxright .main').eq(index).siblings('.main').css('display','none');
	});
}
function f4smallLunbo () {
	var curIndex = 0;
	var timer = 0;
	var _li =$('.small_ul li').get();
	//alert(_li);
	var _list = $('.lilun a').get();
	for(var i = 0;i < _list.length;i++){
		_li[i].index = i;
		_li[i].onmouseover = function  () {
			//console.log(this.index);
			if(this.index !== curIndex){
				//console.log(i);
				$(_li[this.index]).css('background','#666666');
				$(_list[curIndex]).css('display','none');
				$(_list[this.index]).css('display','block');
				$(_li[curIndex]).css('background','#cbcbcb');
				curIndex = this.index;
			}	
		};
	}
	function exec () {
		clearTimeout(timer);
		$(_list[curIndex]).css('display','none');
		$(_li[curIndex]).css('background','#cbcbcb');
		curIndex ++;
		if(curIndex == 4){
			curIndex = 0;
		}
		$(_list[curIndex]).css('display','block');
		$(_li[curIndex]).css('background','#666');
		timer = setTimeout(exec,3000);
	}
	exec();
}
/*f4footer数据加载*/
function f4footerload () {
	$.post("json/f4footer.json",null,function  (data,textstatus) {
		if(textstatus == "success"){
			f4DealData(data);
		}
	},"json");
}
function f4DealData (data) {
	$('.f4brand1 li').find('img').each(function  (index) {
		$(this).attr('src',data.data[index].src);
	});
	var f4Brand = new BrandTab('f4brand1','brandPrev','brandNext')
	 f4Brand._oA1Click();
	 f4Brand._oA2Click();
}
/*brand切换*/
function BrandTab (_ul,_aPrve,_aNext) {
	this.currBrand = 0;
	this._ulCount = document.getElementsByClassName(_ul);
	
	this._oA1 = document.getElementById(_aPrve);
	this._oA2 = document.getElementById(_aNext);
	this._oA1Click = function  () {
		var _self = this;
		
		for(var i = _self.currBrand;i < _self._ulCount.length;i++){
			_self._oA1.onclick = function  () {
				_self._ulCount[_self.currBrand].style.display = 'none';
				--_self.currBrand;
				if(_self.currBrand<0){
					_self.currBrand = _self._ulCount.length-1;
					//console.log(_self.currBrand);
				}
				_self._ulCount[_self.currBrand].style.display = 'block';
			}
		}
	} 
	this._oA2Click = function  () {
		var _self = this;
		for(var i = _self.currBrand;i < _self._ulCount.length;i++){
			_self._oA2.onclick = function  () {
				_self._ulCount[_self.currBrand].style.display = 'none';
				++_self.currBrand;
				if(_self.currBrand >= _self._ulCount.length){
					_self.currBrand = 0;
					
				}
				//console.log(_self._ulCount[_self.currBrand]);
				_self._ulCount[_self.currBrand].style.display = 'block';
			}
		}
	} 
}
/*floor5*/
function f5DataLoad () {
	$.post("json/f5.json",null,function  (data,textstatus) {
		if(textstatus == "success"){
			//alert('ok')
			f5DataDeal(data);
		}
	},"json");
}
function  f5DataDeal(data) {
	$('.ironeleft').each(function  (index) {
		$(this).children('a').attr('href',data.data[index].href).children('img').attr('src',data.data[index].src);
	});
	$('.ir1_two li').each(function  (index) {
		$(this).find('.irval1 del').html(data.data[index+2].prise_s);
		$(this).find('.irval2 a').attr('href',data.data[index+2].href).html(data.data[index+2].tip).parent().next().html(data.data[index+2].prise);
		$(this).find('.irimg a').attr('href',data.data[index+2].href).children('img').attr('src',data.data[index+2].src);
	});
	$('.f5brand1 li').each(function  (index) {
		$(this).children('a').attr('href',data.data[index+6].href).children('img').attr('src',data.data[index+6].src);
	});
	$('.f5brand2 li').each(function  (index) {
		$(this).children('a').attr('href',data.data[index+6].href).children('img').attr('src',data.data[index+6].src);
	});
	var f5Brand = new BrandTab('f5brand','searPrve','searNext')
	 f5Brand._oA1Click();
	 f5Brand._oA2Click();
}
/*floor6*/
function f6DataLoad () {
	$.post("json/f6.json",null,function  (data,textstatus) {
		if(textstatus == 'success'){
			f6DataDeal(data);
		}
	},"json");
}
function f6DataDeal(data){
	$('#f6con li').children('a').each(function  (index) {
		$(this).attr('href',data.data[index].href).children().attr('src',data.data[index].src);
	});
	var _of6titex = document.getElementsByClassName('f6titex');
	for(var i = 0;i < _of6titex.length;i++){
		new LastTime(_of6titex[i]).reTimer();	
	}
}
function LastTime (_this) {
	this.timer = 0;
	this.lastTimer = new Date(2016,9,15);
	this.reTimer = function  () {
		var _self = this;
		clearInterval(_self.timer);
		var seconds = 0,minutes = 0,hours = 0,days = 0;
		_self.timer = setInterval(function  () {
			var nowTime = new Date();
			seconds = parseInt((_self.lastTimer - nowTime)/1000 % 60);
			minutes =  parseInt(((_self.lastTimer - nowTime)/1000-seconds)/60%60);
			hours = parseInt((_self.lastTimer - nowTime)/1000/60/60)-(parseInt((_self.lastTimer - nowTime)/1000/60/60/24))*24;
			days = parseInt((_self.lastTimer - nowTime)/1000/60/60/24);
			_this.innerHTML ='仅剩:<span>' + get0(days) + '</span>天<span>'+ get0(hours) + '</span>时<span>' + get0(minutes) + '</span>分<span>' + get0(seconds) + '</span>'; 	
			
		},30);			
	}
}
