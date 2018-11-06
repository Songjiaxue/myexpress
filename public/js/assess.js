define(['jquery','bootstrap-dialog','paginator'],function (   $) {
    var wa_assess = new Vue({
        el:'#wa_assess',
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
                par.assess_status = 0;
                $.post('/api/assess',par,function (data) {
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
                assessModal.id = param;
            }
        }
    });
    var al_assess = new Vue({
        el:'#al_assess',
        data:{
            res:[],
            isNull:false,
            option:{
                pageSize: 10,
                currentPage: 1,
                admin_id: sessionStorage.id
            }
        }/*,
        mounted:function() {
            this.$nextTick(function () {
                this.dataList();
            })
        }*/,
        methods:{
            dataList: function(param){
                var $this = this;
                var par = param?param:$this.option;
                par.assess_status = 1;
                $.post('/api/assess',par,function (data) {
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
                            console.log(22222);
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
            }
        }
    });
    var assessModal = new Vue({
        el:'#assessModal',
        data:{
            res:{
                assess_back:'0',
                assess_back_details:''
            },
            id:''
        },
        methods:{
            addData:function(param){
                var $this = this;
                param.id = $this.id;
                console.log(param);
                $.post('/api/assess_back',param,function (data) {
                        if(data.success){
                            wa_assess.dataList();
                            al_assess.dataList();
                            $('[data-dismiss="modal"]').trigger('click');
                            $.bootstrapDialog.success('评价成功！');
                        }
                        else{
                            $.bootstrapDialog.warning_ban(data);
                        }
                    })
            }
        }
    });
    $('.assess').on('click',function () {
        var param = $(this).attr('data-param');
        if(param == 0){
            wa_assess.dataList();
        }
        else{
            al_assess.dataList();
        }
    });
});