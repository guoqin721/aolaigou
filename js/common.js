function head_mygou () {//显示我的奥莱购
	$('#head_li5').mouseenter(function  () {
		$('#head_li5').css({"background":"#fff"});
		//console.log($('#head_li5').css());
		$('.header_sele').css('display','block');

	});
	$('.header_sele').mouseleave(function  () {
		$('.header_sele').css('display','none');
		$('#head_li5').css({"background":"#f0f0f0"});	
	});	
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
