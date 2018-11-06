define(['jquery','aside','paginator'],function ($,aside) {
	var t = getRequest('t').t?getRequest('t').t:0;
	aside.select_menu_storage('401');
	aside.init_aside();
	var option = {
		pageSize: 10,
		currentPage:1,
		admin_id:sessionStorage.id
	};
	var book = new Vue({
		el:'#book',
		data:{
			res:[],
			isNull:false,
			book_status_str:'',
		},
		mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        },
        methods:{
        	dataList: function(){
                var $this = this;
                $('.book_status').removeClass('active');
                $('.book_status').eq(t).addClass('active');
                loadData(t);
            }
        }
	});
	function loadData(param,t) {
		var par = t?t:option;
		par.book_status = param;
		console.log(param);
		switch (param){
        	case 0:
        		book.book_status_str='待付款';
        		break;
    		case 1:
        		book.book_status_str='已付款';
        		break;
    		case 2:
        		book.book_status_str='待发货';
        		break;
        	case 3:
        		book.book_status_str='已发货';
        		break;
        	case 4:
        		book.book_status_str='已完成';
        		break;
        	case 5:
        		book.book_status_str='已评价';
        		break;
        	default:
        		break;
        }
		$.post('/api/book',par,function (data) {
			if(data.success){
                if(data.result.total>0){
                    console.log(data);
                    book.isNull = true;
                    book.res = data.result;
                    loadPaginator(par.currentPage,par.pageSize,data.result.total,par.admin_id,param);
                    $('#page').show();
                }
                else{
                    book.isNull = false;
                    $('#page').hide();
                }
            }
            else{
                $.bootstrapDialog.warning_ban(data,function () {
                    history.go(-1);
                });
            }
		});
	}
	function loadPaginator(currentPage,pageSize,totalPages,admin_id,param) {
		totalPages = totalPages == 0 ? 1 : totalPages;
        var page_options = {
            //size:"small",
            bootstrapMajorVersion: 3,
            currentPage: currentPage,
            numberOfPages: 10,
            totalPages: totalPages,
            pageSize: pageSize,
            alignment: 'right',
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "prev":
                        return '<i class="fa fa-chevron-left"></i>';
                    case "next":
                        return '<i class="fa fa-chevron-right">';
                    case "page":
                        return page;
                }
            },
            shouldShowPage: function (type, page, current) {
                switch (type) {
                    case "first":
                    case "last":
                        return false;
                    default:
                        return true;
                }
            },
            //页数发生变化时，执行方法
            onPageChanged: function (event, oldPage, newPage) {
                console.log(admin_id);
                var opt = {currentPage: newPage, pageSize: pageSize, totalPages: totalPages,admin_id:admin_id};
                console.log();
                loadData(param,opt);
            }
        };
        $("#page").bootstrapPaginator(page_options);
	}
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
	$('.book_status').on('click',function () {
		var param = $(this).attr('data-param');
		loadData(param);
	});
});