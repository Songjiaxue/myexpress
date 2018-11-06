define(['jquery','bootstrap-dialog','paginator'],function($){
    $(document).ready(function() {
        var size_list = new Vue({
            el: '#size_list',
            data: {
                res:[],
                isNull:false
            },
            mounted: function() {
                this.$nextTick(function () {
                    this.dataList();
                })
            },
            methods: {
                dataList:function () {
                    var $this = this;
                    $.post('/api/size_query',{admin_id:sessionStorage.id},function (res) {
                        console.log(res);
                        if(res.success){
                            if(res.result){
                                if(res.result.length>0){
                                    $this.res = res.result;
                                    $this.isNull = true;
                                    setTimeout(function () {
                                        $('.size').eq(0).attr('rowspan',res.result.length);
                                        $('.size').each(function (eq,ele) {
                                            if(eq>0){
                                                $(ele).remove();
                                            }
                                        });
                                    },0);
                                }
                                else{
                                    $this.isNull = false;
                                }
                            }
                        }
                        else{
                            $.bootstrapDialog.warning_ban('系统出错！',function () {
                                //history.go(-1);
                            });
                        }
                    });
                },
                editData:function (param) {
                    add_size.res = param;
                    add_size.isEdit = true;
                },
                deleteData:function (param) {
                    var $this = this;
                    $.bootstrapDialog.warning('删除操作不可撤销，是否继续？',function () {
                        $.post('/api/delete_size',{id:param},function (data) {
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
                }
                
            }
        });
        var add_size = new Vue({
            el:'#add_goods_size',
            data:{
                res:{
                    size:''
                },
                isEdit:false
            },
            methods:{
                addData:function (param) {
                    var $this = this;
                    param.admin_id = sessionStorage.id;
                    $.post("/api/add_size",param,function(data){
                        if(data.success){
                            $('[data-dismiss="modal"]').trigger('click');
                            size_list.dataList();
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
                updateData:function (param) {
                    var $this = this;
                    $this.isEdit = false;
                    $.post('/api/update_size',param,function (data) {
                        if(data.success){
                            size_list.dataList();
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.success('修改成功！');
                        }
                        else{
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.warning_ban(data);
                        }
                    });
                }
            }
        });
        var material_list = new Vue({
            el: '#material_list',
            data: {
                res:[],
                isNull:false
            },
            mounted: function() {
                this.$nextTick(function () {
                    this.dataList();
                })
            },
            methods: {
                dataList:function () {
                    var $this = this;
                    $.post('/api/material_query',{admin_id:sessionStorage.id},function (res) {
                        console.log(res);
                        if(res.success){
                            if(res.result){
                                if(res.result.length>0){
                                    $this.res = res.result;
                                    $this.isNull = true;
                                    setTimeout(function () {
                                        $('.material').eq(0).attr('rowspan',res.result.length);
                                        $('.material').each(function (eq,ele) {
                                            if(eq>0){
                                                $(ele).remove();
                                            }
                                        });
                                    },0);
                                }
                                else{
                                    $this.isNull = false;
                                }
                            }

                        }
                        else{
                            $.bootstrapDialog.warning_ban('系统出错！',function () {
                                //history.go(-1);
                            });
                        }
                    });
                },
                editData:function (param) {
                    add_goods_material.res = param;
                    add_goods_material.isEdit = true;
                },
                deleteData:function (param) {
                    var $this = this;
                    $.bootstrapDialog.warning('删除操作不可撤销，是否继续？',function () {
                        $.post('/api/delete_material',{id:param},function (data) {
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
                }
                
            }
        });
        var add_goods_material = new Vue({
            el:'#add_goods_material',
            data:{
                res:{
                    material:''
                },
                isEdit:false
            },
            methods:{
                addData:function (param) {
                    var $this = this;
                    param.admin_id = sessionStorage.id;
                    $.post("/api/add_material",param,function(data){
                        if(data.success){
                            $('[data-dismiss="modal"]').trigger('click');
                            material_list.dataList();
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
                updateData:function (param) {
                    var $this = this;
                    $this.isEdit = false;
                    console.log(param);
                    $.post('/api/update_material',param,function (data) {
                        if(data.success){
                            material_list.dataList();
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.success('修改成功！');
                        }
                        else{
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.warning_ban(data);
                        }
                    });
                }
            }
        });
        var color_list = new Vue({
            el: '#color_list',
            data: {
                res:[],
                isNull:false
            },
            mounted: function() {
                this.$nextTick(function () {
                    this.dataList();
                })
            },
            methods: {
                dataList:function () {
                    var $this = this;
                    $.post('/api/color_query',{admin_id:sessionStorage.id},function (res) {
                        console.log(res);
                        if(res.success){
                            if(res.result){
                                if(res.result.length>0){
                                    $this.res = res.result;
                                    $this.isNull = true;
                                    setTimeout(function () {
                                        $('.color').eq(0).attr('rowspan',res.result.length);
                                        $('.color').each(function (eq,ele) {
                                            if(eq>0){
                                                $(ele).remove();
                                            }
                                        });
                                    },0);
                                }
                                else{
                                    $this.isNull = false;
                                }
                            }

                        }
                        else{
                            $.bootstrapDialog.warning_ban('系统出错！',function () {
                                //history.go(-1);
                            });
                        }
                    });
                },
                editData:function (param) {
                    add_goods_color.res = param;
                    add_goods_color.isEdit = true;
                },
                deleteData:function (param) {
                    var $this = this;
                    $.bootstrapDialog.warning('删除操作不可撤销，是否继续？',function () {
                        $.post('/api/delete_color',{id:param},function (data) {
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
                }
                
            }
        });
        var add_goods_color = new Vue({
            el:'#add_goods_color',
            data:{
                res:{
                    color:''
                },
                isEdit:false
            },
            methods:{
                addData:function (param) {
                    var $this = this;
                    param.admin_id = sessionStorage.id;
                    $.post("/api/add_color",param,function(data){
                        if(data.success){
                            $('[data-dismiss="modal"]').trigger('click');
                            color_list.dataList();
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
                updateData:function (param) {
                    var $this = this;
                    $this.isEdit = false;
                    console.log(param);
                    $.post('/api/update_color',param,function (data) {
                        if(data.success){
                            color_list.dataList();
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.success('修改成功！');
                        }
                        else{
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.warning_ban(data);
                        }
                    });
                }
            }
        });
        $('.add').on('click',function () {
            add_size.res = {
                size:''
            };
            add_size.isEdit = false;
            add_goods_material.res = {
                material:''
            };
            add_goods_material.isEdit = false;
            add_goods_color.res = {
                color:''
            };
            add_goods_color.isEdit = false;
        });
    
    })
});