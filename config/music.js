var music = null;
var num = 1;
export function playMusic(){
	music = uni.createInnerAudioContext(); //创建播放器对象
	music.src = "/static/didi.mp3";
	music.play(); //执行播放
	music.onEnded(() => {//音频播放结束
		if(num >= 3){
			num = 1;
			music = null;
		}else if(music != null){
			num++;
			music.play();
		}
	});
}

export function stopMusic(){
	music = null;
}