$(function  () {
	//所有类目
	$('.shv3-menu-a').mouseenter(function  () {
		//console.log($('.shv3-menu-a'));
		$('.shv3-menu-a .search-core ').css('background-position','-103px -625px');
		$('.shv3-lcon').css("display","block");
	});
	$('.shv3-menu-a').mouseleave(function  () {
		$('.shv3-menu-a .search-core').css('background-position','-143px -625px');
		$('.shv3-lcon').css("display","none");
	});
	//热门推荐
	$.ajax({
		url:"json/scarfs_hot.json",
		type:"post",
		dataType:"json",
		async:true,
		success:function  (data) {
			//alert("ok");
			$('.hotv3-rtlia').find('img').each(function  (index) {
				$(this).attr("src",data.goodslist[index].goodspic);
			});
			$('.hotv3-rtlib-tit ').children('a').each(function  (index) {
				$(this).html(data.goodslist[index].name);
			});
			$('.hotv3-rtlib-val').each(function  (index) {
				$(this).html(data.goodslist[index].price);
			});
		}
	});
	/*更多带来的变化*/
//	var onOff = true;
//	$('.s-zjpp span').each(function  () {
//		$(this).click(function  () {
//		
//			if(onOff){
//				$(this).parent().prev().css({	
//					'width':'100%',
//					'float':'none',
//				    'background': '#fffdee',
//				    'border':'1px solid #edd188',
//				    'border-left': 'none',
//				    'border-right': 'none',
//				    'padding-top': '15px',
//				    'padding-bottom': '15px',
//				    'height': 'auto'
//				});
//				//$('.g-tab').css("display","block");
//				$(this).html('收起');
//				onOff = !onOff;
//			}else{
//				$(this).parent().prev().css({	
//					'width':'1000px',
//					'float':'left',
//				    'background': '#fff',
//				    'border':'none',
//				    'padding': '0',
//				});
//				//$('.g-tab').css("display","none");
//				$(this).html('更多');
//				onOff = !onOff;
//			}
//		});	
//	});
	/*这里没必要用each*/
	$('.fore1 dd:gt(5)').hover(function  () {
		$(this).children('a').css("background-position","-70px -13px");
		$(this).children('a').css("color","red");
	},function  () {
		$(this).children('a').css("background-position","-70px 1px");
		$(this).children('a').css("color","#1e55ab");
	});
	/*选择有BUG*/
	$('.fore1 dd:gt(5)').click(function  () {
		$(this).attr('offOn',true);
		if($(this).attr('offOn')){
			$(this).children('a').css("background-position","-70px 1px");
			$(this).children('a').css("color","#1e55ab");
			$(this).attr('offOn',false);
		}else{
			$(this).children('a').css("background-position","-70px -13px");
			$(this).children('a').css("color","red");
			$(this).attr('offOn',true);
		}
	});
	/*综合排序的筛选*/
	$('.fore1 dl dd.fore1-moren').hover(function  () {
		
	});
	/*列表拼川*/
	$.ajax({
		url:"json/scarfs.json",
		type:"post",
		dataType:"json",
		async:true,
		success:function(data) {
			//alert('ok');
			//console.log(tempFn2);
			var tempFn2 = Handlebars.compile($("#muBanYQ02").html());
			//console.log(tempFn2);
			var htmlstr2 = tempFn2(data);
			//console.log(htmlstr);
			$('.muBanYQ02').html(htmlstr2);
			//console.log($('.hot_sc .left-conli-tu'));
			$('.hot_sc .left-conli-tu').find('img').each(function  (index) {
				//console.log(data.goodslist2[index].dali1);
				$(this).attr("src",data.goodslist2[index].dali1);
			});
			$('.hot_sc .left-conli-txt').find('a').each(function  (index) {
				$(this).html(data.goodslist2[index].name);
			});
			$('.hot_sc .left-conli-val').each(function  (index) {
				$(this).html(data.goodslist2[index].price);
			});
			$('.hot_news .left-conli-tu').find('img').each(function  (index) {
				//console.log(data.goodslist2[index].dali1);
				$(this).attr("src",data.goodslist2[index].dali1);
			});
			$('.hot_news .left-conli-txt').find('a').each(function  (index) {
				$(this).html(data.goodslist2[index].name);
			});
			$('.hot_news .left-conli-val').each(function  (index) {
				$(this).html(data.goodslist2[index].price);
			});
		}
	});
	
	

	
});
