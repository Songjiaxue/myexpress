define(['jquery','aside','bootstrap-dialog','paginator','parsley'], function ($,aside) {
    var option = {
        pageSize :10,
        currentPage:1,
        admin_id:sessionStorage.id
    }
    //一周动态——商品
    var goods = new Vue({
        el: '#goods',
        data: {
            res: {},
            isNull: false,//数据列表是否为空
            option:{
                pageSize: 5,
                currentPage: 1
            }
        },
        mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        },
        methods:{
            dataList: function(){
                var $this = this;
                var par = {
                    pageSize:$this.option.pageSize,
                    currentPage:$this.option.currentPage,
                    admin_id:sessionStorage.id
                };
                $.post('/api/goods',par,function (data) {
                    if(data.success){
                        if(data.result.total>0){
                            $this.isNull = true;
                            $this.res = data.result;
                        }
                        else{
                            $this.isNull = false;
                        }
                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            history.go(-1);
                        });
                    }
                });
            },
        }
    });
    //一周动态——订单
    var book = new Vue({
        el: '#book',
        data: {
            res: {},
            isNull: false//数据列表是否为空
        },
        mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        },
        methods:{
            dataList: function(){
                var $this = this;
                $.post('/api/book_query_all',{admin_id:sessionStorage.id},function (data) {
                    if(data.success){
                        if(data.result.length>0){
                            $this.isNull = true;
                            for(var i=0;i<data.result.length;i++){
                                switch (data.result[i].book_status){
                                    case 0:
                                        data.result[i].book_status_str='待付款';
                                        break;
                                    case 1:
                                        data.result[i].book_status_str='已付款';
                                        break;
                                    case 2:
                                        data.result[i].book_status_str='待发货';
                                        break;
                                    case 3:
                                        data.result[i].book_status_str='已发货';
                                        break;
                                    case 4:
                                        data.result[i].book_status_str='已完成';
                                        break;
                                    case 5:
                                        data.result[i].book_status_str='已评价';
                                        break;
                                    default:
                                        break;
                                }
                            }
                            
                            $this.res = data.result;
                        }
                        else{
                            $this.isNull = false;
                        }
                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            history.go(-1);
                        });
                    }
                });
            },
        }
    });
    //我的任务
    var number = new Vue({
        el:'#number',
        data:{
            circle1:0,//待处理商品
            circle2:0,//待发货
            circle3:0//待评价
        },
        mounted:function () {
            this.$nextTick(function () {
                this.dataList();
            });
        },
        methods:{
            dataList:function () {
                var $this = this;
                var par2 = option;
                par2.book_status = 2;//待发货接口传参
                var par3 = option;
                par2.book_status = 5;//待评价接口传参
                //待处理商品
                $.post('/api/goods_waiting',option,function (data) {
                    if(data.success){
                        $this.circle1 = data.result.number;
                    }
                });
                //待发货
                $.post('/api/book',par2,function (data) {
                    if(data.success){
                        $this.circle2 = data.result.number;
                    }
                });
                //待评价
                $.post('/api/book',par3,function (data) {
                    if(data.success){
                        $this.circle3 = data.result.number;
                    }
                });
            }
        }
    });
    //更多链接跳转
    $('#more').on('click',function () {
        var param = $('.work_list.active').attr('data-param');
        //左侧菜单栏
        (param==1)?aside.select_menu_storage('401'):aside.select_menu_storage('301');
        aside.init_aside();
        //section链接跳转
        window.location.href = (param==1)?'/book':'/goods';
    });

});
