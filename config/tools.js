export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 解析URL，将URL分解成协议、HOST、端口、路径
 * @param {Object} url
 */
export function parseUrl(url){
	var result = {
		portocal:"",
		host:"",
		port:"",
		path:"",
		params:{
			
		}
	}
	var u2 = url.split("://");
	if(u2.length==2){
		result.portocal = u2[0]
		var hp = u2[1].split(":");
		if(hp.length==1){
			result.host = hp[0];
		}else if(hp.length==2){
			result.host = hp[0];
			result.port = hp[1]
		}
	}
	return result;
	
}