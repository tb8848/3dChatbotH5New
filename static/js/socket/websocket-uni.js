let socketOpen = false;

import {getStomp} from './stomp.js';
	  subscriptions:[],
	  stomp:null,
		
		for (let i = 0; i < socketMsgQueue.length; i++) {
		  ws.send(socketMsgQueue[i]);
		}
		socketMsgQueue = [];
	  // if(null == stomp){
		 //  this.stomp = getStomp();
	  // }
	  const Stomp = getStomp();
	  console.log(client);
      client.connect({}, function() {
	  var that = this;
	  socketMsgQueue.length = 0;
	    console.log('重连中...')
			  that.client = c;
			  that.subscriptions.forEach(function(f) {
			      f(c);
			  });
		  });
		var funExsist = false;
		this.subscriptions.forEach(function(e){
		if (e.toString()==subscribe.toString())
		 {
			  funExsist = true;
														 
		 }
		});
		
		if (funExsist==false)
		{
							//把订阅保存到数组
							this.subscriptions.push(fun);
							
							//执行订阅
							fun(this.client);	  	
		}
								             
		
	}


