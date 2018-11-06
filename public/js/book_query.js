define(['jquery'],function ($) {
	var t = getRequest('t').t;
	var s = getRequest('t').s;
	console.log(t);
	var book_query = new Vue({
		el:'#book_query',
		data:{
			res:[],
			goods:[],
		},
		mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        },
        methods:{
        	dataList:function () {
        		var $this = this;
        		$.post('/api/book_query',{id:t},function (data) {
        			console.log(data);
        			if(data.success){
        				data.result[0].book_status_str = s;
                        $this.res = data.result;
                        console.log($this.res);
                        var goods_name = $this.res[0].goods_name.split(',');
                        var goods_number = $this.res[0].goods_number.split(',');
                        var goods_price = $this.res[0].goods_price.split(',');
                        for(var i=0;i<goods_name.length;i++){
                    		$this.goods.push({
                    			goods_name:goods_name[i],
                    			goods_price:goods_price[i],
                    			goods_number:goods_number[i]
                    		});
                        }
                        console.log($this.goods);

                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            history.go(-1);
                        });
                    }
        		});
        	}
        }
	});
	function getRequest() {     
	   var url = window.location.search; //获取url中"?"符后的字串     
	   var theRequest = new Object();     
	   if (url.indexOf("?") != -1) {     
	      var str = url.substr(1);     
	      strs = str.split("&");     
	      for(var i = 0; i < strs.length; i ++) {     
	          //就是这句的问题  
	         theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);   
	         //之前用了unescape()  
	         //才会出现乱码    
	      }     
	   }     
	   return theRequest;     
	} 
});