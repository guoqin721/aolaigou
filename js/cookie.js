//创建cookie
function createCookie(name,value,expires,path,domain,secure){
	var cookieText = encodeURIComponent(name) + '=' +encodeURIComponent(value); 
	//检测expires是否是Date的一个实例对象
	if(expires instanceof Date){
		//给cookie加第一个参数（过期时间）
		cookieText += ';enpires=' + expires;
	}
	if(path){
		cookieText +=';path=' + path;
	}
	if(domain){
		cookieText +=';domain=' + domain;
	}
	if(secure){
		cookieText +=';secure';
	}
	document.cookie = cookieText;
}


//设置失效时间
function setCookieTime(day){
	var date = null;
	//确定形参day是一个数字且大于0
	if(typeof day == 'number' && day > 0){
	date = new Date();//创建日期对象
	date.setDate(date.getDate() + day );
	}
	return date;
}
//获取cookie
function getCookie(name){
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf( cookieName );
	var cookieValue = null;
	if(cookieStart > -1){
		var cookieEnd = document.cookie.indexOf(';',cookieStart);
		if(cookieEnd == -1){
				cookieEnd = document.cookie.length ;	
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length ,cookieEnd));
		
	}else{
		return 'cookie中没有您要找的东西';
		
	}
	return cookieValue;
}
function removeCookie(name){
	document.cookie = name + '=;expires = '+ new Date(0);
	
}


