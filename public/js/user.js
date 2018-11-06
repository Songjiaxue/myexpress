define(['jquery','parsley','bootstrap-dialog','paginator'],function ($) {
    var option = {
            pageSize: 10,
            currentPage: 1,
            id: sessionStorage.id
        };
    var user = new Vue({
        el:'#user',
        data:{
            res:[],
            isNull:false
        },
        mounted:function() {
            this.$nextTick(function () {
                this.dataList('/api/user',option);
            })
        },
        methods:{
            dataList: function(url,param){
                var $this = this;
                $.post(url,param,function (data) {
                    if(data.success){
                        if(data.result.list.length>0){
                            $this.isNull = true;
                            $this.res = data.result.list;
                            $this.loadPaginator(param.currentPage,param.pageSize,data.result.total,param.id);
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
            loadPaginator:function (currentPage,pageSize,totalPages,id) {
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
                        var option = {currentPage: newPage, pageSize: pageSize, totalPages: totalPages,id:id};
                        $this.dataList('/api/user',option);
                    }
                };
                $("#page").bootstrapPaginator(page_options);
            },
            upData:function (param) {
                var $this = this;
                upManage.id = param;
            },
            deleteData:function(param){
                var $this = this;
                $.bootstrapDialog.warning('删除操作不可撤销，是否继续？',function () {
                    $.post('/api/delete_user',{id:param},function (data) {
                        console.log(data);
                        if(data.success){
                            $this.dataList('/api/user',option);
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
    //查询
    $('#search').on('click',function () {
        var par = option;
        var user_type = $('#search_type').val();
        var url = '';
        if(user_type!=-1){
            par.user_type = user_type;
            url = '/api/user_con';
        }
        else{
            url = '/api/user';
        }
        user.dataList(url,par);
    });
});