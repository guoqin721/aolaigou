function  cookieCheak() {
	console.log(getCookie("username"));
	console.log(getCookie("password"));
	if(getCookie("username")&&getCookie("password")){
		$('.he_cook1').html('Hi:'+getCookie("username")).css({"color":"red"});
		$('.he_cook2').html('退出').css({"color":"red"});
		$('.cookieUl').css({"margin-left":"780px"});
	}
	$('.he_cook2').click(function  () {
		if($('.he_cook2').html()=='退出'){
			$('.he_cook1').html('登录').css({"color":"#999"});
			$('.he_cook2').html('注册').css({"color":"#999"});
			$('.cookieUl').css({"margin-left":"829px"});
		}
	});	
}
function appShow () {
	$('.firul .li1').mouseenter(function  () {
		$('#app_show').css('display','block');
	});
	$('#app_show').mouseleave(function  () {
		$('#app_show').css('display','none');
	});
	
}
function head_mygou () {//显示我的奥莱购
	/*//方法一：
	$('#head_li5').mouseenter(function  () {
		$('#head_li5').css({"background":"#fff"});
		//console.log($('#head_li5').css());
		$('.header_sele').css('display','block');
		//这里用hide和show也行
	});
	$('#head_li5').mouseleave(function  () {
		$('.header_sele').css('display','none');
		$('#head_li5').css({"background":"#f0f0f0"});	
	});*/

	//方法二，show或者hide
	$('#head_li5').hover(function () {
		$('#head_li5').css({"background":"#fff"});
		$('.header_sele').show();
	},function () {
		$('.header_sele').hide();
		$('#head_li5').css({"background":"#f0f0f0"});
	});
	/* //方法三，slideToggle隐则显显则隐
	$('#head_li5').hover(function () {
		$('#head_li5').css({"background":"#fff"});
		$('.header_sele').slideToggle(1000);
	},function () {
		$('.header_sele').slideToggle(1000);
		$('#head_li5').css({"background":"#f0f0f0"});
	});*/
}
//搜索框的得焦失焦事件
function fnsearch () {
	$('#yinman').focus(function  () {
		$('#yinman')[0].value = '';
		$('#yinman').attr('placeholder',"请输入您想寻找的商品名称");
	});
	$('#yinman').blur(function  () {
		$('#yinman')[0].value = '茵曼';
		$('#sear_result').css('display','none');
		$('#sear_result').html('');
		//oResult.style.display='none';
	});
}
// 搜索框json
function a(data) {
	var oResult = document.getElementById('sear_result');
	var oYinman = document.getElementById('yinman');
	//console.log(data);
	var html = '<ul>';
	for (var i = 0; i < data.Data.SuggestVMs.length; i++) {
		html += '<li>' + data.Data.SuggestVMs[i].chnw + '</li>';
	}
	html += '</ul>';
	oResult.innerHTML = html;
	oYinman.onclick = function() {
		oResult.style.display = 'block';
	}
	 //$('#sear_result').not().click(function() {oResult.style.display='none';})

}
//搜索功能的实现
function oSearch () {
	$('#yinman').keyup(function  () {
		var oScript = document.createElement('script');
		oScript.src = "http://search.aolaigo.com//handler/suggest.ashx?callback=a&cmd=GetSuggestWords&keyword="+ $('#yinman').val() +"&order=1_1&page=1&psize=16&fp=1&iz=0";
		document.getElementsByTagName("head")[0].appendChild(oScript);		
	});	
}
