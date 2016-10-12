$(function  () {
	$('.data-sao').hover(function  () {
		$('.dstelma').css("display","block");
	},function  () {
		$('.dstelma').css("display","none");
	});
	$.ajax({
		url:"json/scarfs.json",
		type:"post",
		dataType:"json",
		async:true,
		success:function(data) {
			$('.hot_sc .left-conli-tu').find('img').each(function  (index) {
				$(this).attr("src",data.goodslist2[index].dali1);
			});
			$('.hot_sc .left-conli-txt').find('a').each(function  (index) {
				$(this).html(data.goodslist2[index].name);
			});
			$('.hot_sc .left-conli-val').each(function  (index) {
				$(this).html(data.goodslist2[index].price);
			});
		}
	});
	
})
