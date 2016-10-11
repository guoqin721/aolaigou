$(function  () {
	var _zBtnArr  = [false,false,false,false,false];
	var _rand = 0;
	var _arr =['RN2G','2GSZ','CXEP','HGAJ','6UVS','LSQM'];
	$('.reinp1,.reinp2,.reinp3,.reinp4,.reinp5').not('.reinp0').focus(function  () {
		$(this).css("border-color","lightsteelblue");
	});
	$('.reinp1').focus(function  () {
		$('.regrips1').css("color","#38c352").html('请输入注册的手机号');
		
	});
	$('.reinp1').blur(function  () {
		_zBtnArr[0] = false;
		$(this).css("border-color","#e6e6e6");
		var _reinp1 = $(this).val();
		$.ajax({
			type:"post",
			url:"../json/register.json",
			aspnc:false,
			dataType:"json",
			success:function  (data) {
				for(var j in data){
					if(_reinp1 == data[j].registerCode){
						$('.regrips1').css("color","#ff3344").html('对不起，用户名已经存在!');
						break;
					}else{
						fnUserName();
					}
				}
				
			}
			
		});
		function fnUserName () {
			if(!(_reinp1.length>0&&_reinp1.length<4)||_reinp1.length>50){		
				if((/^1(3|4|5|7|8)\d{9}$/.test(_reinp1))||_reinp1 == ''){
					$('.regrips1').html('');
				}else{
					$('.regrips1').css("color","#ff3344").html('账号暂时只开放手机号码注册');	
				}
			}else{
				$('.regrips1').css("color","#ff3344").html('用户名长度只能在4-50位字符之间');
			}
			if(($('.regrips1').html()=='')&&_reinp1 !== ''){
				_zBtnArr[0] = true;
			}
		}
		
	});
	$('.reinp2').focus(function  () {
		_zBtnArr[1] = false;
		$('.regrips2').css("color","#38c352").html('6-20位字符、可使用字母、数字或字符的组合');
	});
	$('.reinp2').blur(function  () {
		
		$(this).css("border-color","#e6e6e6");
		var _reinp2 = $(this).val();
		//console.log($(this).val());|([A-Za-z]{6,11})
		if((_reinp2.length>0&&_reinp2.length<6)||_reinp2.length>20){
			//console.log($('.regrips1'));
			$('.regrips2').css("color","#ff3344").html('密码长度只能在6-20位字符之间');
		}else if((/^(\d{6,11})$/.test(_reinp2))||(/^([A-Za-z]{6,11})$/.test(_reinp2))){
			$('.regrips2').css("color","#ff3344").html('该密码比较简单，有被盗风险');
		}else{
			$('.regrips2').html('');
		}	
		if(($('.regrips2').html()=='')&&_reinp2 !== ''){
			_zBtnArr[1] = true;
		}
	});
	$('.reinp3').focus(function  () {
		_zBtnArr[2] = false;
		$('.regrips3').css("color","#38c352").html('请再次输入密码');
	});
	$('.reinp3').blur(function  () {
		var _reinp2 = $('.reinp2').val();
		var _reinp3 = $(this).val();
		$(this).css("border-color","#e6e6e6");
		if(_reinp2 !== _reinp3){			
			$('.regrips3').css("color","#ff3344").html('两次输入的密码不一致');
		}else{
			if(_reinp2 == ''){
				$('.regrips3').html('');
			}else{
				$('.regrips3').css("color","#38c352").html('两次输入的密码一致');
			}
		}
		if($('.regrips3').html()=='两次输入的密码一致'){
			_zBtnArr[2] = true;
		}
		//console.log(_zBtnArr[2]);
	});
	
	$('.reinp4').focus(function  () {
		_zBtnArr[3] = false;
		$('.regrips4').css("color","#38c352").html('输入验证码');
	});
	$('.reinp4').blur(function  () {
		$(this).css("border-color","#e6e6e6");	
		if($(this).val() == ''){
			$('.regrips4').css("color","#ff3344").html('输入验证码');
		}else{
			$('.regrips4').html('');
		}
	});
	$('.relimg').click(function  () {
		 _rand = Math.floor(Math.random()*6);
		$('.relimg').attr('src','../img/register/yzm/reyan0'+_rand+'.jpg');
	});
	$('.reinp0').click(function  () {
		var _reinp4 = $('.reinp4').val();
		if(_zBtnArr[0]){
//			console.log(_arr[_rand]);
//			console.log(_rand);
			if(_reinp4 == _arr[_rand]){
				_zBtnArr[3] = true;
				$('.regrips4').html('');
				if($('.reinp0').val()=='获取验证码'){
					var _timer = 120;
					fnMesTime(_timer);
					//生成短信验证码
					fnMsCheck();
				}
			}else{
				$('.regrips4').css("color","#ff3344").html('验证码输入有误！');
			}
		}

	});
	function fnMesTime (_timer) {	
		clearInterval(MeTimer);
		//MeTimer = null;
		var MeTimer = setInterval(function  () {
			if(_timer <= 0){
				clearInterval(MeTimer);
				$('.reinp0').val('获取验证码');
//				_timer = 120;
			}else{
				_timer--;
				$('.reinp0').val(_timer+'秒后重新获取');
			}
		},1000);
	}
	function  fnMsCheck() {
		//console.log('start');
		var a = 0;
		var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','l','r','s','t','u','v','w','x','y','z'];
		var list = new Array(6);
		for(var i = 0;i < list.length;i++){
			 a = Math.floor(Math.random()*36);
			 list[i] = arr[a];
			 //console.log(a);
		}
		//console.log(list);
		$('.regrips5').html(list);
		console.log($('.regrips5').html());
		console.log(typeof($('.regrips5').html()));
	}
	$('.reinp5').focus(function  () {
		_zBtnArr[4] = false;
	});
	$('.reinp5').blur(function  () {
		$(this).css("border-color","#e6e6e6");
		//$('.regrips5').html('');
	});
	$('.regbtn').click(function  () {
		var _reinp5 = $('.reinp5').val();
		console.log(_reinp5);
		if(_reinp5 == $('.regrips5').html()){	
			_zBtnArr[4] = true;
			
			//console.log('ok')
//			$('.regrips5').css("color","#ff3344").html('输入的验证码有误，注册失败！');
		}
			//信息正确写入cookie
		if($('.reinp1').val() == ''){
			$('.regrips1').css("color","#ff3344").html('请输入邮箱/手机号');
		}
		if($('.reinp2').val() == ''){
			$('.regrips2').css("color","#ff3344").html('请输入密码');
		}
		if($('.reinp3').val() == ''){
			$('.regrips3').css("color","#ff3344").html('请输入密码');
		}
		if($('.reinp4').val() == ''){
			$('.regrips4').css("color","#ff3344").html('请输入验证码');
		}
		if($('.reinp5').val() == ''){
			$('.regrips5').css("color","#ff3344").html('请输入验证码');
		}
		console.log(_zBtnArr[0]);
		console.log(_zBtnArr[1]);
		console.log(_zBtnArr[2]);
		console.log(_zBtnArr[3]);
		if(_zBtnArr[0]&&_zBtnArr[1]&&_zBtnArr[2]&&_zBtnArr[3]){
			console.log('zhengque');
			if(_zBtnArr[4]==false){
				console.log('disicuo');
				$('.regrips5').css("color","#ff3344").html('输入的验证码有误，注册失败！');		
			}else{
				console.log('xierushibai');
				createCookie("username",$('.reinp1').val(),setCookieTime(10),"/");
				createCookie("password",$('.reinp2').val(),setCookieTime(10),"/");
				window.location.href = "login.html";
			}
		}
	});
})

       