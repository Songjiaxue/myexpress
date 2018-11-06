define(['jquery','bootstrap-dialog','paginator','parsley','datepicker','datepicker.lang','datepicker.extend'], function ($) {
    console.log(111);
    var list = new Vue({
        el: '#coupon',
        data: {
            res: [],
            isNull: false,
        },
        mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        },
        methods:{
            dataList: function(){
                var $this = this;
                $.post('/api/coupon',{admin_id:sessionStorage.id},function (data) {
                    if(data.success){
                        if(data.result.length>0){
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
            deleteData:function (param) {
                var $this = this;
                $.bootstrapDialog.warning('删除操作不可撤销，是否继续？',function () {
                    $.post('/api/delete_coupon',{id:param},function (data) {
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
                add_coupon.res = param;
                add_coupon.isEdit = true;
            }
        }
    });
    var add_coupon = new Vue({
        el: '#add_coupon',
        data: {
            res:{
                coupon_name:'',
                coupon_total:'',
                coupon_money:'',
                start_time:'',
                end_time:'',
                number:''
            },
            isEdit:false,
        },
        methods:{
            addData:function(param){
                var $this = $(this);
                param.admin_id = sessionStorage.id;
                $('.submitData').trigger('click');
                $.post("/api/add_coupon",param,function(data){
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
                });
            },
            updateData:function (param) {
                    var $this = this;
                    $.post('/api/update_coupon',param,function (data) {
                        if(data.success){
                            list.dataList();//父类型列表刷新
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.success('修改成功！');
                        }
                        else{
                            $.bootstrapDialog.warning_ban(data);
                        }
                    });
                }
        }
    });
    $('#start_time').datepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        format: "yyyy-mm-dd",
    }).on('changeDate',function (e) {
        var start_time = e.date;
        $('#end_time').datepicker('setStartDate',start_time);
        add_coupon.res.start_time = $(this).val();
    });
    $('#end_time').datepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        format: "yyyy-mm-dd",
    }).on('changeDate',function (e) {
        var end_time = e.date;
        $('#start_time').datepicker('setEndDate',end_time);
        add_coupon.res.end_time = $(this).val();
    });
    $('.add').on('click',function () {
        add_coupon.res = {
            coupon_name:'',
            coupon_total:'',
            coupon_money:'',
            start_time:'',
            end_time:'',
            number:''
        };
        add_coupon.isEdit = false;
    });
    $('#add_form').parsley().on('form:submit',function(){
        console.log(111111);
        console.log();

        return false;
    });
});
