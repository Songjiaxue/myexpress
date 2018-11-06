define(['jquery','aside','bootstrap-dialog','paginator','parsley'],function ($,aside) {
    aside.select_menu_storage('304');
    aside.init_aside();
	var up = new Vue({
		el:'#up',
		data:{
			res:[],
			isNull:false,
			option:{
                pageSize: 10,
                currentPage: 1,
                admin_id: sessionStorage.id
            }
		},
        methods:{
            dataList: function(param){
                var $this = this;
                var par = param?param:$this.option;
                $.post('/api/goods_up',par,function (data) {
                    if(data.success){
                        if(data.result.total>0){
                            console.log(data);
                            $this.isNull = true;
                            $this.res = data.result;
                            $this.loadPaginator(par.currentPage,par.pageSize,data.result.total,par.admin_id);
                            $('#page').show();
                        }
                        else{
                            $this.isNull = false;
                            $('#page').hide();
                        }
                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            history.go(-1);
                        });
                    }
                });
            },
            //分页
            //currentPage：当前页
            //pageSize:每页显示条数
            //totalPages：总条数
            loadPaginator:function (currentPage,pageSize,totalPages,admin_id) {
                var $this = this;
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
                        console.log(newPage);
                        var option = {currentPage: newPage, pageSize: pageSize, totalPages: totalPages,admin_id:admin_id};
                        $this.dataList(option);
                    }
                };
                $("#page").bootstrapPaginator(page_options);
            },
            downData:function (param) {
            	var $this = this;
            	$.post('/api/goods_down_update',{id:param},function (data) {
            		if(data.success){
                            $this.dataList();
                            down.dataList();
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.success('下架成功！');
                        }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            $('[data-dismiss="modal"]').trigger('click');
                        });
                    }
            	})
            },
            upData:function (param) {
            	console.log(param);
            	upManage.id = param.id;
            	upManage.isEdit = true;
            	upManage.res.coupon_name = param.coupon_name;
            	upManage.res.number = param.volume;
            }
        }
	});
	var down = new Vue({
		el:'#down',
		data:{
			res:[],
			isNull:false,
			option:{
                pageSize: 10,
                currentPage: 1,
                admin_id:sessionStorage.id
            }
		},
        methods:{
            dataList: function(param){
                var $this = this;
                var par = param?param:$this.option;
                $.post('/api/goods_down',par,function (data) {
                    if(data.success){
                        if(data.result.total>0){
                            console.log(data);
                            $this.isNull = true;
                            $this.res = data.result;
                            $this.loadPaginator(par.currentPage,par.pageSize,data.result.total,par.admin_id);
                            $('#page').show();
                        }
                        else{
                            $this.isNull = false;
                            $('#page').hide();
                        }
                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            history.go(-1);
                        });
                    }
                });
            },
            //分页
            //currentPage：当前页
            //pageSize:每页显示条数
            //totalPages：总条数
            loadPaginator:function (currentPage,pageSize,totalPages,admin_id) {
                var $this = this;
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
                        console.log(newPage);
                        var option = {currentPage: newPage, pageSize: pageSize, totalPages: totalPages,admin_id:admin_id};
                        $this.dataList(option);
                    }
                };
                $("#page").bootstrapPaginator(page_options);
            },
            upData:function (param) {
            	var $this = this;
            	upManage.id = param;

            }
        }
	});
	var waiting = new Vue({
		el:'#waiting',
		data:{
			res:[],
			isNull:false,
			option:{
                pageSize: 10,
                currentPage: 1,
                admin_id:sessionStorage.id
            }
		},
		mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        },
        methods:{
            dataList: function(param){
                var $this = this;
                var par = param?param:$this.option;
                $.post('/api/goods_waiting',par,function (data) {
                    if(data.success){
                        if(data.result.total>0){
                            console.log(data);
                            $this.isNull = true;
                            $this.res = data.result;
                            $this.loadPaginator(par.currentPage,par.pageSize,data.result.total,par.admin_id);
                            $('#page').show();
                        }
                        else{
                            $this.isNull = false;
                            $('#page').hide();
                        }
                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            history.go(-1);
                        });
                    }
                });
            },
            //分页
            //currentPage：当前页
            //pageSize:每页显示条数
            //totalPages：总条数
            loadPaginator:function (currentPage,pageSize,totalPages,admin_id) {
                var $this = this;
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
                        console.log(newPage);
                        var option = {currentPage: newPage, pageSize: pageSize, totalPages: totalPages,admin_id:admin_id};
                        $this.dataList(option);
                    }
                };
                $("#page").bootstrapPaginator(page_options);
            },
            upData:function (param) {
            	var $this = this;
            	upManage.id = param;
            	console.log(param);
            }
        }
	});
	var upManage = new Vue({
		el:'#upManage',
		data:{
			coupon:[],
			res:{
				coupon_name:'0',
				number:''
			},
			id:'',
			isEdit:false
			
		},
		mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        },
        methods:{
        	dataList:function () {
        		var $this = this;
                $.post('/api/coupon',{admin_id:sessionStorage.id},function (data) {
                    if(data.success){
                        if(data.result.length>0){
                            $this.coupon = data.result;
                        }
                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            history.go(-1);
                        });
                    }
                });
        	},
        	addData:function(param){
                var $this = this;
                param.id = $this.id;
                console.log(param);
                $('.submitData').trigger('click');
			    $.post('/api/goods_up_update',param,function (data) {
	            		if(data.success){
                            down.dataList();
                            up.dataList();
                            waiting.dataList();
                            //$.bootstrapDialog.success('更新成功！');
                            $('[data-dismiss="modal"]').trigger('click');
                        }
	                    else{
	                        $.bootstrapDialog.warning_ban(data);
	                    }
            		})
            }
        }
	});
	$('#add_form').parsley().on('form:submit',function(){
        return false;
    });
	$('.goods_up').on('click',function () {
        var param = $(this).attr('data-param');
        switch (param) {
            case '1':
                up.dataList();
                break;
            case '2':
                down.dataList();
                break;
            default:
                waiting.dataList();
                break;
        }
    });
});