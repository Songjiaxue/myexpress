define(['jquery','bootstrap-dialog','paginator'],function($){
    $(document).ready(function() {
        var vm = new Vue({
            el: '#add_goods_type',
            data: {
                //表单值
                res:{
                    type:null,
                    f_type_id:0
                },
                //父级option
                f_type:{
                    data:[]
                },
                isEdit:false//编辑按钮的隐藏和显示
            },
            mounted: function() {
                this.$nextTick(function () {
                    this.dataList();
                })
            },
            methods: {
                //增加商品类型
                addData:function (param) {
                    var $this = this;
                    param.admin_id = sessionStorage.id;
                    $.post("/api/add_goods_type",param,function(data){
                        if(data.success){
                            $('[data-dismiss="modal"]').trigger('click');
                            vm2.dataList();
                            $this.dataList();
                            $.bootstrapDialog.success('添加成功！',function () {
                                $('[data-dismiss="modal"]').trigger('click');
                            });
                        }
                        else{
                            $.bootstrapDialog.warning_ban(data);
                        }
                    })
                },
                //父级option选项渲染
                dataList:function () {
                    var $this = this;
                    $.post('/api/goods_type_query',{admin_id:sessionStorage.id},function (res) {
                        if(res.success){
                            if(res.result.length>0){
                                $this.f_type.data = res.result;
                            }
                        }
                    });
                },
                //修改商品类型
                updateData:function (param) {
                    var $this = this;
                    $.post('/api/update_goods_type',param,function (data) {
                        if(data.success){
                            $this.dataList();//父类型列表刷新
                            vm2.dataList();//子类型列表刷新
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.success('修改成功！');
                        }
                        else{
                            $.bootstrapDialog.warning_ban(data,function () {
                                $('[data-dismiss="modal"]').trigger('click');
                            });
                        }
                    });
                }
            }
        });
        var vm2 = new Vue({
            el:'#type_list',
            data:{
                res:[],//父类型列表刷新
                option:{
                    currentPage:1,
                    pageSize:10,
                    admin_id: sessionStorage.id
                },
                //暂无数据的显示（false：显示）
                isNull:false
            },
            mounted: function() {
                var $this = this;
                this.$nextTick(function () {
                    $this.dataList();
                })
            },
            methods:{
                dataList:function () {
                    var $this = this;
                    var par = $this.option;
                    $.post('/api/goods_type',par,function (data) {
                        if(data.success){
                            if(data.result.total>0){
                                $this.isNull = true;
                                $this.res = data.result;
                                $this.loadPaginator(par.currentPage,par.pageSize,data.result.total);
                            }
                        }
                        else{
                            $.bootstrapDialog.warning_ban(data,function () {
                                history.go(-1);
                            });
                        }
                    });
                },
                editData:function (param) {
                    vm.res = param;
                    vm.isEdit = true;
                },
                //分页
                //currentPage：当前页
                //pageSize:每页显示条数
                //totalPages：总条数
                loadPaginator:function (currentPage,pageSize,totalPages) {
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
                            var option = {currentPage: newPage, pageSize: pageSize, totalPages: totalPages};
                            $this.dataList(option);
                        }
                    };
                    $("#page").bootstrapPaginator(page_options);
                },
                //子类型的数据渲染
                z_type_list:function (index,param) {
                    console.log(index,param);
                    vm3.dataList(index,param);
                }
            }
        });
        var vm3 = new Vue({
            el: '#z_type_list',
            data: {
                res:[]
            },
            methods: {
                //列表渲染
                dataList:function (index,param) {
                    var $this = this;
                    console.log(index);
                    var par = {
                        id:param?param:0,
                        admin_id: sessionStorage.id
                    };
                    $.post('/api/goods_z_type_query',par,function (res) {
                        console.log(res);
                        if(res.success){
                            if(res.result.length==0){
                                return false;
                            }
                            else{
                                $this.res = res.result;
                                $this.$nextTick(function(){
                                    $(vm2.$el).find('.addTr').remove();
                                    $(vm2.$el).find('tr').eq(index).after($('#z_type_list').children().clone());
                                });
                            }
                        }
                    });

                },
                editData:function (param) {
                    console.log(param);
                    vm.res = param;
                    vm.isEdit = true;
                },
            }
        });
        //子类型的展开切换，以及相关的样式切换
        $(document).on('click','.show_z_type', function () {
            var $this = $(this);
            if(!$this.find('i').eq(0).hasClass('hide')){
                $this.find('i').eq(0).addClass('hide');
                $this.find('i').eq(1).removeClass('hide');
                $('.addTr').show();
            }
            else{
                $this.find('i').eq(1).addClass('hide');
                $this.find('i').eq(0).removeClass('hide');
                $('.addTr').hide();
            }

        });
        $(document).on('click','.deleteData', function () {
            var $this = $(this);
            var param = $this.attr('data-param');
            $.bootstrapDialog.warning('删除操作不可撤销，是否继续？',function () {
                $.post('/api/delete_goods_type',{type_id:param},function (data) {
                    console.log(data);
                    if(data.success){
                        $this.parents('tr').remove();
                        if($('#type_list').find('tr').length == 1){
                            vm2.isNull = false;
                        }
                        $.bootstrapDialog.success('删除成功！');
                    }
                    else{
                        $.bootstrapDialog.warning_ban(data,function () {
                            $('[data-dismiss="modal"]').trigger('click');
                        });
                    }
                });
            });
        });
        $('.add').on('click',function () {
            vm.res ={
                type:null,
                f_type_id:0
                    };
            vm.isEdit = false;
        });

    })
});