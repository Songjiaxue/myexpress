(function(w){
    requirejs.config({
        baseUrl: '/javascripts/js',
        paths: {
            'ueditor':'ueditor/ueditor.all',
            'ueconfig':'ueditor/ueditor.config',
            'uelang':'ueditor/lang/zh-cn/zh-cn',
            'datepicker':'datepicker/bootstrap-datepicker.min',
            'datepicker.lang':'datepicker/bootstrap-datepicker.zh-CN.min',
            'datepicker.extend':'datepicker/datepicker.extend',
            'parsley':'parsley/parsley',
            'parsley.extend':'parsley/parsley.extend',
            'parsley.lang':'parsley/i18n/zh_cn',
            'parsley.lang.extend':'parsley/i18n/zh_cn.extra',
            'bootstrap-dialog':'bootstrap-dialog/bootstrap-dialog.min',
            'paginator':'bootstrap-paginator/bootstrap-paginator.min',
            'bootstrap.plugin':'app.plugin',
            'bootstrap':'bootstrap',
            'app':'app.min',
            'jquery':'jquery',
            'util': '../util',
            'cropbox':'cropbox/cropbox',
            'jquery.cropbox':'cropbox/jquery.cropbox',
        },
        shim: {
            'bootstrap':['jquery'],
            'paginator':['bootstrap'],
            //'bootstrapDialog':['css!../js/bootstrap-dialog/bootstrap-dialog.min.css'],
            'datepicker':['jquery','css!../js/datepicker/datepicker.css'],
            'datepicker.lang':['datepicker'],
            'datepicker.extend':[,'datepicker'],
            'bootstrap.plugin':['bootstrap'],
            'bootstrap-dialog':['bootstrap'],
            'parsley':['jquery','css!./parsley.css'],
            'parsley.extend':['parsley','parsley.lang','parsley.lang.extend'],
            'parsley.lang':['parsley'],
            'parsley.lang.extend':['parsley'],
            'cropbox':['jquery','css!../js/cropbox/cropbox.css'],
            'jquery.cropbox':['jquery','css!../js/cropbox/jquery.cropbox.css'],
            'uelang':{
                deps:['ueditor','ZeroClipboard']
            },
            'util':['jquery'],
            'ueditor':['ueconfig'],
        }
    });
    //在requirejs 下 echart必须使用的 url路径
    window.UEDITOR_HOME_URL='/javascripts/js/ueditor/';
    require(['jquery','ueconfig','bootstrap'],function($){
        /* 去掉整个拖动的效果 */
        $(document).on("dragstart", function () {return false;});

        /*$.ajaxSetup({
            beforeSend : function (xhr) {
                if(this.url.indexOf(ContextPath)==0){
                }else{
                    this.url=ContextPath+this.url;
                }

            }
        })*/
        window.$=window.jQuery=$;
        $.bootstrapDialog={};//申明对话框控件
        window.UEDITOR_CONFIG.toolbars2=[[
            'fontfamily',
            'fontsize',
            'undo',
            'redo',
            'bold',
            'italic',
            'underline',
            'indent',
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            'forecolor', //字体颜色
            'backcolor', //背景色
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            'selectall', //全选
            'cleardoc', //清空文档
            'customstyle', //自定义标题
            'paragraph', //段落格式
            'attachment', //附件
            'simpleupload', //单图上传
            'insertimage', //多图上传
            'emotion', //表情
            'scrawl', //涂鸦
            'insertvideo', //视频
            'music', //音乐
            'link' //超链接
        ]]
        //关闭ueditor的自动保存
        window.UEDITOR_CONFIG.enableAutoSave=false;
        window.UEDITOR_CONFIG.elementPathEnabled=false;
        //关闭远程抓取图片
        window.UEDITOR_CONFIG.catchRemoteImageEnable=false;
        window.UEDITOR_CONFIG.zIndex=2000;
        //window.UEDITOR_CONFIG.enterTag='br';
        //window.UEDITOR_CONFIG.pasteplain=true;
        //window.UEDITOR_CONFIG.retainOnlyLabelPasted=true;
        window.UEDITOR_CONFIG.maximumWords=2000;
        window.UEDITOR_CONFIG.autoFloatEnabled=false;

        /*//字体限制 先不用此功能
         window.UEDITOR_CONFIG.fnMaxWordsDo=  function(type,editor) {
         if(this.getContentLength(true)>this.options.maximumWords){
         var aContent= this.getContent().split("<br>||<br/>");
         var t_max=0
         var iContent="";
         for(var key in aContent){
         t_max+=aContent[key].length;
         if(key!=0)iContent+="<br>";
         if(t_max>this.options.maximumWords){
         iContent+=aContent[key].substr(0,aContent[key].length-(t_max-this.options.maximumWords));
         break;
         }else{
         iContent+=aContent[key]
         }
         }
         this.setContent(iContent);
         }
         }*/

    })
})(window);
/* 预防在ie9上出现未知错误 */
if(!window.console){
    window.console={
        log:function (msg) {return msg},
        error:function (msg) {return msg}
    }
}
(function(w,d){
    require(['jquery','bootstrap','bootstrap.plugin'],function($){
        $(document).on("mouseenter","[data-toggle='tooltip']", function () {
            $(this).tooltip('show');
        });

        $(document).on("selectstart",".pagination", function (e) {
            e.preventDefault();
            return false;
        })
    });

    require(['jquery','bootstrap-dialog'], function ($,bdg) {
        $.bootstrapDialog=bdg;
        $.bootstrapDialog.DEFAULT_TEXTS[bdg.TYPE_DEFAULT] = '信息';
        $.bootstrapDialog.DEFAULT_TEXTS[bdg.TYPE_INFO] = '信息';
        $.bootstrapDialog.DEFAULT_TEXTS[bdg.TYPE_PRIMARY] = '信息';
        $.bootstrapDialog.DEFAULT_TEXTS[bdg.TYPE_SUCCESS] = '成功';
        $.bootstrapDialog.DEFAULT_TEXTS[bdg.TYPE_WARNING] = '警告';
        $.bootstrapDialog.DEFAULT_TEXTS[bdg.TYPE_DANGER] = '危险';
        $.bootstrapDialog.DEFAULT_TEXTS['OK'] = '确认';
        $.bootstrapDialog.DEFAULT_TEXTS['CANCEL'] = '取消';
        $.bootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = '确认';
        $.bootstrapDialog.onModal=function(e){
            e.preventDefault();
            var $this=$(this);
            $.bootstrapDialog.show({
                closable: false,
                onshow: function (dialog) {
                    dialog.getModal().html('');
                    dialog.getModal().load(encodeURI($this.attr("href")));
                    dialog.updateClosable();
                }
            });
            return false;
        }
        $.bootstrapDialog.modalTip= function (content) {
            $.bootstrapDialog.show({
                message:content,
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                }
            });
        };
        //成功的模态窗口定制
        $.bootstrapDialog.success= function (content,func) {
            var $success=$('<div class="padder padder-v"><div class="row m-t-sm">' +
                '<div class="col-xs-4 m-t m-r-n col-xs-offset-1"><img class="img-full" src="/images/success01.png"></div>' +
                '<div class="col-xs-7 m-t"><h3>'+content+'</h3></div>' +
                '<div class="col-xs-12 m-t-lg" style="padding: 0 100px;"><button class="btn btn-info btn-block" data-dismiss="modal" aria-label="Close">确 &nbsp;认</button></div>' +
                '</div></div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onhidden: function () {
                    if(func&&typeof func =='function')
                        func.apply(this);
                }
            });
        };
        $.bootstrapDialog.preview = function (pram) {
            var $success = '<div class="item">' +
                '<div class="top text-right w-full padder padder-v"> ' +
                '<button class="close block" data-dismiss="modal">×</button> ' +
                '</div>' +
                '</div>' +
                '<div class="row padder-v padder m-t-sm"> ' +
                '<style>' +
                '.content p{' +
                'font-size: 18px;' +
                'text-indent:2em;' +
                '} ' +
                '</style> ' +
                '<div class="col-xs-12 text-left"> ' +
                '<p class=" font-bold h3">' +
                pram.title
                + '</p>' +
                '</div>' +
                '<div class="col-xs-12 m-t-md"> ' +
                '<p class="text-muted">' +
                pram.time + '  ' +
                pram.author
                + '</p> ' +
                '</div> ' +
                '<div class="line line-dashed b-b line-lg "></div> ' +
                '<div class="col-xs-12 content"> ' +
                pram.content
                + '</div> ' +
                '</div>';
            $.bootstrapDialog.show({
                onshow: function (dialog) {
//                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin", "0 auto");
                    dialog.getModalDialog().css("margin-top", "20px");
                    dialog.getModalDialog().css("width", "80%");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
//                     func.apply(this);
                }
            });
        };
        $.bootstrapDialog.addSuccess= function (param,sureFunc,cancelFunc) {
            var content = param.content;
            var button = param.button;
            var $success=$('<div class="padder padder-v"> <div class="row m-t-sm"> <div class="col-xs-4 col-sm-offset-4 ">'+
                ' <img class="img-full img-responsive center-block" src="/images/success01.png"></div>'+
                '<div class="col-xs-12 m-t text-center"> <p class="h4">提示</p>'+
                '<p class="h5 m-t-md">'+content+'</p> </div>'+
                '<div class="col-xs-12 m-t-lg" style="padding: 0 50px;">'+
                '<div class="row">'+
                '<div class="col-sm-6" style="padding-right: 5px;padding-left: 0px;">'+
                '<button class="btn btn-default btn-block "  name="modal_cancel" aria-label="cancel">'+button.cencel+
                '</button> </div> <div class="col-sm-6" style="padding-left: 5px;padding-right: 0px;">'+
                '<button class="btn btn-info btn-block "  name="modal_sure" aria-label="sure"> '+button.sure+
                '</button> </div> </div> </div></div></div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    $('[name=modal_sure]').unbind().click(function () {
                        if(sureFunc&&typeof sureFunc =='function')
                            sureFunc.apply(this);
                    });
                    $('[name=modal_cancel]').unbind().click(function () {
                        if(cancelFunc&&typeof cancelFunc =='function')
                            cancelFunc.apply(this);
                    });
                },
                onhidden: function () {
                    if(cancelFunc&&typeof cancelFunc =='function')
                        cancelFunc.apply(this);
                }
            });
        };
        //成功的是否模态窗口定制
        $.bootstrapDialog.success_IsTrue= function (content,sureFunc,cancelFunc) {
            var $success=$('<div class="padder padder-v"> <div class="row m-t-sm"> <div class="col-xs-4 col-sm-offset-4 ">'+
                ' <img class="img-full img-responsive center-block" src="/images/success01.png"></div>'+
                '<div class="col-xs-12 m-t text-center"> <p class="h4">提示</p>'+
                '<p class="h5 m-t-md">'+content+'</p> </div>'+
                '<div class="col-xs-12 m-t-lg" style="padding: 0 50px;">'+
                '<div class="row">'+
                '<div class="col-sm-6" style="padding-right: 5px;">'+
                '<button class="btn btn-default btn-block " data-dismiss="modal" name="modal_cancel" aria-label="cancel">'+
                '否 </button> </div> <div class="col-sm-6" style="padding-left: 5px;">'+
                '<button class="btn btn-info btn-block " data-dismiss="modal" name="modal_sure" aria-label="sure"> 是'+
                '</button> </div> </div> </div></div></div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    $('[name=modal_sure]').unbind().click(function () {
                        if(sureFunc&&typeof sureFunc =='function')
                            sureFunc.apply(this);
                    });
                    $('[name=modal_cancel]').unbind().click(function () {
                        if(cancelFunc&&typeof cancelFunc =='function')
                            cancelFunc.apply(this);
                    });
                },
                onhidden: function () {
                    if(cancelFunc&&typeof cancelFunc =='function')
                        cancelFunc.apply(this);
                }

            });
        };
        //修改成功的模态窗口定制
        $.bootstrapDialog.success_update= function (content,func) {
            var $success=$('<div class="padder padder-v"><div class="row m-t-sm">' +
                '<div class="col-xs-4 m-t m-r-n col-xs-offset-1"><img class="img-full" src="/images/success_update.png"></div>' +
                '<div class="col-xs-7 m-t"><h3>'+content+'</h3></div>' +
                '<div class="col-xs-12 m-t-lg" style="padding: 0 100px;"><button class="btn btn-info btn-block" name="modal_update" data-dismiss="modal" aria-label="Close">确 &nbsp;认</button></div>' +
                '</div></div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    $('[name=modal_update]').unbind().click(function () {
                        if(func&&typeof func =='function')
                            func.apply(this);
                    });
                },
                onhidden: function () {
                    if(func&&typeof func =='function')
                        func.apply(this);
                }
            });
        };
        //修改成功模态窗口定制
        $.bootstrapDialog.submit= function (content,sureFunc) {
            var $success=$('<div class="padder padder-v"> <div class="row m-t-sm"> <div class="col-xs-4 col-sm-offset-4 ">'+
                ' <img class="img-full img-responsive center-block" src="/images/success_update.png"></div>'+
                '<div class="col-xs-12 m-t text-center"> '+
                '<p class="h5 m-t-md">'+content+'</p> </div>'+
                '<div class="col-xs-12 m-t-lg" style="padding: 0 100px;"><button class="btn btn-info btn-block" name="modal_update" data-dismiss="modal" aria-label="Close">确 &nbsp;认</button></div>'+
                '</div> </div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    $('[name=modal_update]').unbind().click(function () {
                        if(sureFunc&&typeof sureFunc =='function')
                            sureFunc.apply(this);
                    });
                },
                onhidden: function () {
                    if(sureFunc&&typeof sureFunc =='function')
                        sureFunc.apply(this);
                }

            });
        };
        //失败的模态窗口定制
        $.bootstrapDialog.failure= function (content,sureFunc) {
            var $success=$('<div class="padder padder-v"><div class="row m-t-sm">' +
                '<div class="col-xs-4 m-t m-r-n col-xs-offset-1"><img class="img-full" src="/images/failure.png"></div>' +
                '<div class="col-xs-7 m-t"><h3>'+content+'</h3></div>' +
                '<div class="col-xs-12 m-t-lg" style="padding: 0 100px;"><button class="btn btn-info btn-block" name="modal_failure" data-dismiss="modal" aria-label="Close">确 &nbsp;认</button></div>' +
                '</div></div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    //$('[name=modal_failure]').unbind().click(function () {
                    //    if(sureFunc&&typeof sureFunc =='function')
                    //        sureFunc.apply(this);
                    //});
                },
                onhidden: function () {
                    if(sureFunc&&typeof sureFunc =='function')
                        sureFunc.apply(this);
                }
            });
        };

        //警告的模态窗口定制
        $.bootstrapDialog.warning= function (content,sureFunc,cancelFunc) {
            var $success=$('<div class="padder padder-v"> <div class="row m-t-sm"> <div class="col-xs-4 col-sm-offset-4 ">'+
                ' <img class="img-full img-responsive center-block" src="/images/warning.png"></div>'+
                '<div class="col-xs-12 m-t text-center"> <p class="h4">警告</p>'+
                '<p class="h5 m-t-md">'+content+'</p> </div>'+
                '<div class="col-xs-12 m-t-lg" style="padding: 0 50px;">'+
                '<div class="row">'+
                '<div class="col-sm-6" style="padding-right: 5px;">'+
                '<button class="btn btn-default btn-block " data-dismiss="modal" name="modal_cancel" aria-label="cancel">'+
                '否 </button> </div> <div class="col-sm-6" style="padding-left: 5px;">'+
                '<button class="btn btn-info btn-block " data-dismiss="modal" name="modal_sure" aria-label="sure"> 是'+
                '</button> </div> </div> </div> </div> </div>');
            var cancel = false;
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    $('[name=modal_sure]').unbind().click(function () {
                        cancel = true;
                        if(sureFunc&&typeof sureFunc =='function')
                            sureFunc.apply(this);
                    });
                    $('[name=modal_cancel]').unbind().click(function () {
                        cancel = true;
                        if(cancelFunc&&typeof cancelFunc =='function')
                            cancelFunc.apply(this);
                    });
                },
                onhidden: function () {
                    if(cancelFunc && typeof cancelFunc =='function' && !cancel)
                        cancelFunc.apply(this);
                }

            });
        };
        //禁止警告的模态窗口定制
        $.bootstrapDialog.warning_ban= function (content,sureFunc) {
            var $success=$('<div class="padder padder-v"> <div class="row m-t-sm"> <div class="col-xs-4 col-sm-offset-4 ">'+
                ' <img class="img-full img-responsive center-block" src="/images/warning.png"></div>'+
                '<div class="col-xs-12 m-t text-center"> <p class="h4">警告</p>'+
                '<p class="h5 m-t-md">'+content+'</p> </div>'+
                '<div class="col-xs-12 m-t-lg" style="padding: 0 100px;"><button class="btn btn-info btn-block" name="modal_sure" data-dismiss="modal" aria-label="Close">确 &nbsp;认</button></div>'+
                '</div> </div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    $('[name=modal_sure]').unbind().click(function () {
                        if(sureFunc&&typeof sureFunc =='function')
                            sureFunc.apply(this);
                    });
                },
                onhidden: function () {
                    if(sureFunc&&typeof sureFunc =='function')
                        sureFunc.apply(this);
                }

            });
        };
        //新建窗口的模态窗口定制
        $.bootstrapDialog.window_open= function (content,url) {
            var $success=$('<div class="padder padder-v"> <div class="row m-t-sm"> <div class="col-xs-4 col-sm-offset-4 ">'+
                ' <img class="img-full img-responsive center-block" src="/images/warning.png"></div>'+
                '<div class="col-xs-12 m-t text-center"> <p class="h4">警告</p>'+
                '<p class="h5 m-t-md">'+content+'</p> </div>'+
                '<div class="col-xs-12 m-t-lg" style="padding: 0 50px;">'+
                '<div class="row">'+
                '<div class="col-sm-6" style="padding-right: 5px;">'+
                '<button class="btn btn-default btn-block " data-dismiss="modal" name="modal_cancel" aria-label="cancel">'+
                '取 &nbsp;消 </button> </div> <div class="col-sm-6" style="padding-left: 5px;">'+
                '<a href="'+url+'" target="_blank" class="btn btn-info btn-block" name="modal_sure" >确 &nbsp;认</a> </div> </div> </div> </div> </div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },onshown: function (dialogRef) {
                    $('[name=modal_cancel]').unbind().click(function () {
                        dialogRef.close();
                    });
                    $('[name=modal_sure]').unbind("click").click(function () {
                        //$(".bootstrap-dialog,.modal-backdrop").remove()
                        dialogRef.close();
                    });
                }
            });
        };
        //提示框
        $.bootstrapDialog.tip= function (content,sureFunc) {
            var $success=$('<div class="padder padder"> <div class="row "> <div class="col-xs-12  bg-info text-center" style="border-radius:5px 5px 0px 0px"> ' +
                '<p class="h4 m-t-sm m-b-sm">提示</p></div>' +
                '<div class="col-xs-12  text-center"> <p class="h5 m-t-md"></p>'+content+'<p></p> </div>' +
                '<div class="col-xs-12 m-t-md m-b-sm" style="padding: 0 100px;">' +
                '<button class="btn btn-info btn-block" name="modal_sure" data-dismiss="modal" aria-label="Close">确 &nbsp;认</button>' +
                '</div></div> </div>');
            $.bootstrapDialog.show({
                size:"size-small",
                onshow: function (dialog) {
                    dialog.getModalHeader().remove();
                    dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                    dialog.getModalContent().html($success);
                },
                onshown: function () {
                    $('[name=modal_sure]').unbind().click(function () {
                        if(sureFunc){
                            sureFunc.apply();
                        }
                    });
                },
                onhidden: function () {
                    if(sureFunc){
                        sureFunc.apply();
                    }
                }

            });
        };
        $(document).on('click','[data-toggle="ajaxModal"]',$.bootstrapDialog.onModal);
    })

})(window,document)

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function formatTimeToStr(times,pattern){
    var d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
    if(pattern){
        d = new Date(times).Format(pattern);
    }
    return d.toLocaleString();
}

var m_tool={
    cutStr:function (str,len) {
        var str_length = 0;
        var str_len = 0;
        var str_cut = new String();
        str_len = str.length;
        for(var i = 0;i<str_len;i++)
        {
            a = str.charAt(i);
            str_length++;
            if(escape(a).length > 4)
            {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if(str_length>=len)
            {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if(str_length<len){
            return  str;
        }
    },
    getStrLength:function(str){
        var str_length = 0;
        var str_len = 0;
        str_len = str.length;
        for(var i = 0;i<str_len;i++)
        {
            a = str.charAt(i);
            str_length++;
            if(escape(a).length > 4)
            {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        return str_length;
    }
}

var DICT_CONF={INDUSTRY_CONF:{},CATEGORY_CONF:{}};

/**
 * 加载配置文件
 */
function loadDataConf(func){
    var INDUSTRY_CONF={};
    var CATEGORY_CONF={};
    var apply_data={};
    $.post("/common/Industry_getIndustryList",{iDisplayStart:0,iDisplayLength:9999}, function (d) {
        var aaData= d.aaData;
        if(d.aaData && d.aaData.length>0){
            for(var i in aaData){
                INDUSTRY_CONF[aaData[i].id]=aaData[i].name;
                INDUSTRY_CONF[aaData[i].name]=aaData[i].id;
            }
            DICT_CONF.INDUSTRY_CONF=INDUSTRY_CONF;
        }
        apply_data['industry_list']=aaData;
        //console.log(d);
    },'json').done(function () {
        $.post("/common/Category_getCategoryAllList",{iDisplayStart:0,iDisplayLength:9999}, function (d) {
            //console.log(d);
            var aaData= d.aaData;
            if(aaData && aaData.length>0){
                for(var i in aaData){
                    CATEGORY_CONF[aaData[i].id]=aaData[i].name;
                    CATEGORY_CONF[aaData[i].name]=aaData[i].id;
                }
                DICT_CONF.CATEGORY_CONF=CATEGORY_CONF;
            }
            apply_data['category_list']=aaData;
        },'json').done(function () {
            func.apply(this,[apply_data]);
        });
    })
}
/* 做预防代码块出现显示 */
require(['jquery'], function ($) {

    var ajax_send_num = 0;
    var ajax_complete_num = 0;
    $(document).ajaxSend(function () {
        ++ajax_send_num;
    });
    $(document).ajaxComplete(function () {
        ++ajax_complete_num;
        if(ajax_send_num == ajax_complete_num){
            if($(".app > .app-content").css("visibility")=='hidden'){
                $(".app > .app-content").css("visibility","visible");
            }
        }
    });
    $(document).ready(function () {
        setTimeout(function () {
            if(ajax_send_num==0){
                $(".app > .app-content").css("visibility","visible");
            }
        },200);
    });
    var cStyle=$(document.body).attr("style");
    var reg_display=/\w*display:\s*none\w*/g;
    if(cStyle&& cStyle.match(reg_display)){
        $(document.body).show();
    }
});


/**
 * Created by zhang on 2016/5/25.
 * 左侧强大的使用的菜单条控制
 * 菜单的选中，多级菜单的展开
 */
define("aside",['jquery'],function($){

    var $aside=$("#aside");

    var $aside_toggle=$("#aside [aside-toggle]a");

    var _aside_storage_={};
    if(window.sessionStorage){
        var _aside_storage_=sessionStorage.getItem("_aside_storage_");
        if(_aside_storage_){
            _aside_storage_=JSON.parse(_aside_storage_)
        }else{
            sessionStorage.setItem("_aside_storage_","{}");
            _aside_storage_={};
        }
    }

    return {
        close_aside: function () {
            $('section.app').toggleClass("app-aside-folded");
            $aside_toggle.toggleClass("active");
        },
        open_aside: function () {
            $('section.app').removeClass("app-aside-folded");
            $aside_toggle.removeClass("active");
        },
        select_menu: function (menu_item_id) {
            var $menu_item= $aside.find("[menu_item_id='"+menu_item_id+"']");
            $aside.find("li.active").removeClass("active");
            if(!$menu_item.attr("href")|| location.href.indexOf($menu_item.attr("href"))<0){
                $aside.find("[menu_item_id]").each(function () {
                    if($(this).attr("href")&&location.href.indexOf($(this).attr("href"))>=0){
                        $menu_item=$(this)
                    }
                });
            }
            $menu_item.closest("li").toggleClass("active");
            if($menu_item.closest("ul").closest("li").length>0){
                $menu_item.closest("ul").closest("li").toggleClass("active");
                if($menu_item.closest("ul").closest("li").closest("ul").closest("li").length>0){
                    $menu_item.closest("ul").closest("li").closest("ul").closest("li").toggleClass("active");
                }
            }
        },
        /*更新aside的数据*/
        update_aside_storage: function () {
            if(window.sessionStorage){
                sessionStorage.setItem("_aside_storage_",JSON.stringify(_aside_storage_));
            }
        },
        /*更新aside关闭的状态*/
        close_aside_storage: function () {
            _aside_storage_.isOpen=false;
            this.update_aside_storage();
        },
        /*更新aside打开的状态*/
        open_aside_storage: function () {
            _aside_storage_.isOpen=true;
            this.update_aside_storage();
        },
        /*更新存储中菜单的id*/
        select_menu_storage: function (menu_item_id) {
            _aside_storage_.menu_item_id=menu_item_id;
            this.update_aside_storage();
        },
        /*初始化aside显示状态*/
        init_aside: function () {
            if(_aside_storage_.isOpen==false){
                this.close_aside();
            }
            if(_aside_storage_.menu_item_id){
                this.select_menu(_aside_storage_.menu_item_id);
            }else{
                this.select_menu(-99999);
            }
        }

    };
})