define(['jquery','parsley','bootstrap-dialog','paginator'], function ($) {
    var img = '';
    var list = new Vue({
        el: '#goods',
        data: {
            res: {},
            isNull: false,
            isFind:false,
            option:{
                pageSize: 10,
                currentPage: 1,
                admin_id : sessionStorage.id
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
                $.post('/api/goods',par,function (data) {
                    if(data.success){
                        if(data.result.total>0){
                            console.log(data);
                            $this.isNull = true;
                            $this.res = data.result;
                            $this.loadPaginator(par.currentPage,par.pageSize,data.result.total,par.admin_id);
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
                    numberOfPages: 5,
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
            deleteData:function (param) {
                var $this = this;
                $.bootstrapDialog.warning('删除操作不可撤销，是否继续？',function () {
                    $.post('/api/delete_goods',{id:param},function (data) {
                        console.log(data);
                        if(data.success){
                            $this.dataList();
                            $.bootstrapDialog.success('删除成功！');
                        }
                        else{
                            $.bootstrapDialog.warning_ban(data);
                        }
                    });
                });
            },
            editData:function ( param) {
                add_goods.res = param;
                add_goods.isEdit = true;
                add_goods.isFind = false;
            },
            findData:function ( param) {
                add_goods.res = param;
                add_goods.isEdit = false;
                add_goods.isFind = true;
            }
        }
    });
    var add_goods = new Vue({
        el: '#add_goods',
        data: {
            res:{
                goods_id:'',
                goods_name:'',
                goods_img:'',
                goods_type:0,
                goods_size:0,
                goods_color:0,
                goods_material:0,
                service:0
            },
            size:[],
            material:[],
            color:[],
            type:[],
            isEdit:false,
            isFind:false
        },
        mounted:function() {
            this.$nextTick(function () {
                this.typeList();
                this.sizeList();
                this.materialList();
                this.colorList();
            })
        },
        methods:{
            addData:function(param){
                var $this = $(this);
                $('.submitData').trigger('click');
                param.goods_img = $('#goods_img').val();
                param.admin_id = sessionStorage.id;
                console.log(param);
                $.post("/api/add_goods",param,function(data){
                     if(data.success){
                         $('[data-dismiss="modal"]').trigger('click');
                            list.dataList();
                            //$this.dataList();
                            $.bootstrapDialog.success('添加成功！',function () {
                            $('[data-dismiss="modal"]').trigger('click');
                         });
                     }
                     else{
                         $('[data-dismiss="modal"]').trigger('click');
                         $.bootstrapDialog.warning_ban(data);
                     }
                 })

            },
            typeList:function(){
                var $this = this;
                $.post('/api/goods_z_type',{admin_id:sessionStorage.id},function (res) {
                    console.log(res);
                    if(res.success){
                        if(res.result){
                            if(res.result.length>0){
                                $this.type = res.result;
                            }
                        }
                    }
                });
            },
            sizeList:function(){
                var $this = this;
                $.post('/api/size_query',{admin_id:sessionStorage.id},function (res) {
                    console.log(res);
                    if(res.success){
                        if(res.result){
                            if(res.result.length>0){
                                $this.size = res.result;
                            }
                        }
                    }
                });
            },
            materialList:function(){
                var $this = this;
                $.post('/api/material_query',{admin_id:sessionStorage.id},function (res) {
                    if(res.success){
                        if(res.result){
                            if(res.result.length>0){
                                $this.material = res.result;
                            }
                        }
                    }
                });
            },
            colorList:function(){
                var $this = this;
                $.post('/api/color_query',{admin_id:sessionStorage.id},function (res) {
                    if(res.success){
                        if(res.result){
                            if(res.result.length>0){
                                $this.color = res.result;
                            }
                        }
                    }
                });
            },
            updateData:function (param) {
                    var $this = this;
                    $.post('/api/update_goods',param,function (data) {
                        if(data.success){
                            list.dataList();//父类型列表刷新
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
    $('#add_form').parsley().on('form:submit',function(){
        console.log(111111);
        console.log();

        return false;
    });
    $('.uploadBtn').on('click',function(){
        $('#goods_img').trigger('click');
    });
    $('#goods_img').on('change', function () {
        preview(this);
    });
    //图片预览
    function preview(file){
        var prevDiv = document.getElementById('preview');
        if (file.files && file.files[0])
        {
            var reader = new FileReader();
            reader.onload = function(evt){
                prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
            };
            reader.readAsDataURL(file.files[0]);

        }
        else
        {
            prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';

        }
    }
    $('.add').on('click',function () {
        add_goods.res = {
            goods_id:'',
            goods_name:'',
            goods_img:'',
            goods_type:0,
            goods_size:0,
            goods_color:0,
            goods_material:0,
            freight:'',
            service:0
        };
        add_goods.isEdit = false;
        add_goods.isFind = false;
    });

});
