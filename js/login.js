$(function  () {
//	console.log(getCookie("username"));
//	console.log(getCookie("password"));
	var _count = 0;
	var _zBtnArr  = [false,false,false];
	var _rand = 0;
	var _arr =['1','0','6','14','4','2'];
	 _rand = Math.floor(Math.random()*6);
	$('#yanzhengma img').attr('src','../img/login/logyan/log0'+_rand+'.gif');
	$('.inp01,.inp02,.inp03').not('.checkbox').focus(function  () {
		$(this).css("border-color","lightsteelblue");
	});
	$('.inp01').focus(function  () {
		_zBtnArr[0] = false;
		$('.p2tips1').html('');
		
	});
	$('.inp01').blur(function  () {
		_zBtnArr[0] = false;
		$(this).css("border-color","#e6e6e6");
		var _inp01 = $(this).val();
			if(!(_inp01.length>0&&_inp01.length<4)||_inp01.length>50){		
				if((/^1(3|4|5|7|8)\d{9}$/.test(_inp01))||_inp01 == ''){
					$('.p2tips1').html('');
				}else{
					$('.p2tips1').css("color","#ff3344").html('账号暂时只开放手机号码注册');	
				}
			}else{
				$('.p2tips1').css("color","#ff3344").html('用户名长度只能在4-50位字符之间');
			}
		if(($('.p2tips1').html()=='')&&_inp01 !== ''){
			_zBtnArr[0] = true;
		}
	});
	$('.inp02').focus(function  () {
		_zBtnArr[1] = false;
		$('.p2tips2').html('');
	});
	$('.inp02').blur(function  () {	
		$(this).css("border-color","#e6e6e6");
		var _inp02 = $(this).val();
		if(_inp02 !== ''){
			_zBtnArr[1] = true;
			//console.log(_zBtnArr[1]);
		}
	});
	$('#yanzhengma img').click(function  () {
		 _rand = Math.floor(Math.random()*6);
		$('#yanzhengma img').attr('src','../img/login/logyan/log0'+_rand+'.gif');
	});
	$('.inp03').blur(function  () {
		$(this).css("border-color","#e6e6e6");
		var _inp03 = $('.inp03').val();
		if(_zBtnArr[0]){
	//			console.log(_arr[_rand]);
	//			console.log(_rand);
			if(!_inp03.length){
				$('.p2tips3').css("color","#ff3344").html('验证码不能为空')
			}else if(_inp03 == _arr[_rand]){
				_zBtnArr[2] = true;
				$('.p2tips3').html('');						
			}else{
				$('.p2tips3').html('');	
			}
		}
	});
	$('.p2lobot2').click(function  () {
		var _inp01 = $('.inp01').val();
		var _inp02 = $('.inp02').val();
		if(_inp01 == ''){
			$('.p2tips1').css("color","#ff3344").html('请输入用户名');
		}
		if(_inp02 == ''){
			$('.p2tips2').css("color","#ff3344").html('请输入密码');
		}
		var usernameCookie = getCookie("username");
		var passwordCookie = getCookie("password");
		if(_inp01 == usernameCookie&&passwordCookie == _inp02&&_inp01!==''){
			if($('.p2div3').css('display') == 'block'){		
				if(_zBtnArr[0]&&_zBtnArr[1]){
					//console.log('zhengque');
					if(_zBtnArr[2]==false){
						//console.log('disicuo');
						$('.p2tips3').css("color","#ff3344").html('输入的验证码有误，请重新输入');
						 _rand = Math.floor(Math.random()*6);
						$('#yanzhengma img').attr('src','../img/login/logyan/log0'+_rand+'.gif');
					}else{
						//信息正确可以登录了！！！
						console.log('ok');
					}
				}	
			}else{
				console.log('ok2');
			}
		}else{
			_count++;
			$('.p2tips2').css("color","#ff3344").html('账户名和密码不匹配，请重新输入');
			_rand = Math.floor(Math.random()*6);
			$('#yanzhengma img').attr('src','../img/login/logyan/log0'+_rand+'.gif');
		}
		if(_count >2){
			$('.p2div3').css('display','block');
			$('.p2tips3').css('display','block');
		}
		
	});
})
