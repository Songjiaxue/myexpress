define(['js/jquery','ajaxfileupload'], function ($) {
    return {
        init: function () {
            
        },
        /* 替换 $[]中的数据*/
        replaceElementInnerText: function (ele, data) {
            var $ele,innerHTML;
            if(typeof ele == 'string'){
                $ele=$(ele);
                innerHTML=$ele.html();
            }else{
                $ele=(ele instanceof jQuery)?ele:$(ele);
                innerHTML=$ele.html();
            }
            var pattern=/\$\[(\w+\.*\w*)]/g;
            var replace_attr=[];
            var i=0;
            while(i++<100) {
                var result = pattern.exec(innerHTML);
                if (!result) {
                    break;
                }
                replace_attr.push(result[1]);
            }

            for(var key in replace_attr){
                var replace=new RegExp('\\$\\['+replace_attr[key]+'\\]','g');
                if(replace_attr[key].indexOf(".")>0){
                    var replace_attr_keys=replace_attr[key].split(".");
                    var replace_attr_str="data";
                    if(!data[replace_attr_keys[0]]||typeof data[replace_attr_keys[0]]!=='object'){
                        continue;
                    }
                    for(var _key in replace_attr_keys){
                        replace_attr_str+='[\''+replace_attr_keys[_key]+'\']';
                    }
                    if(eval(replace_attr_str)!=null){
                        innerHTML=innerHTML.replace(replace,eval(replace_attr_str));
                    }
                }else{
                    if(data[replace_attr[key]]!=null){
                        innerHTML=innerHTML.replace(replace,data[replace_attr[key]]);
                    }else {
                        innerHTML=innerHTML.replace(replace,"");
                    }
                }
            }

            $ele.html(innerHTML);
            $ele.find('img[img-load="load"]').each(function () {
                var reg=new RegExp("(http|ftp|https):\/\/w*");
                if(reg.exec($(this).attr('_src'))){
                    $(this).attr("src",$(this).attr('_src'));
                }
                if($(this).attr('_src').indexOf("/diy/images/")==0){
                    $(this).attr("src",$(this).attr('_src'));
                }
            });
            return $ele.prop("outerHTML");
        },

        /* 替换 $[]中的数据,只返回数据*/
        replaceElementOuterHTML: function (ele, data) {
            var $ele,outerHTML;
            if(typeof ele == 'string'){
                $ele=$(ele);
                outerHTML=$ele.prop('outerHTML');
            }else{
                $ele=(ele instanceof jQuery)?ele:$(ele);
                outerHTML=$ele.prop('outerHTML');
            }
            var pattern=/\$\[(\w+)]/g;
            var replace_attr=[];
            var i=0;
            while(i++<100) {
                var result = pattern.exec(outerHTML);
                if (!result) {
                    break;
                }
                replace_attr.push(result[1]);
            }
            for(var key in replace_attr){
                var replace=new RegExp('\\$\\['+replace_attr[key]+'\\]','g');
                if(data[replace_attr[key]]!=null){
                    outerHTML=outerHTML.replace(replace,data[replace_attr[key]]);
                }else{
                    outerHTML=outerHTML.replace(replace,"");
                }
            }
            $ele[0].innerHTML=outerHTML;
            $ele.find('img[img-load="load"]').each(function () {
                var reg=new RegExp("(http|ftp|https):\/\/w*");
                if(reg.exec($(this).attr('_src'))){
                    $(this).attr("src",$(this).attr('_src'));
                }
            });
            return $ele[0].outerHTML;
        },

        uploadImage :function(elementId,func,dataType) {
            //判断是否有选择上传文件
            var imgPath = $("#"+elementId).val();
            if (imgPath == "") {
                alert("请选择上传图片！");
                return;
            }
            //判断上传文件的后缀名
            var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' && strExtension != 'gif'
                && strExtension != 'png' && strExtension != 'bmp') {
                alert("请选择图片文件");
                return;
            }
            var arr_change=$._data($("#"+elementId)[0], 'events')['change'];

            $.ajaxFileUpload({
                url: '/common/UEditorUpload_uploadImage',
                secureuri: false,
                fileElementId: elementId,//file标签的id
                dataType: dataType?dataType:'text',//返回数据的类型
                data: {},//一同上传的数据
                success: function (data, status) {
                    func.apply(this,[data]);
                    //把图片替换
                    $("#"+elementId).bind('change',arr_change[0].handler);
                },
                error: function (data, status, e) {
                    console.log("上传失败");
                    console.log(e);
                    $("#"+elementId).bind('change',arr_change[0].handler);
                }
            });
        },

        uploadFile :function(elementId,func,dataType) {
            //判断是否有选择上传文件
            var imgPath = $("#"+elementId).val();
            if (imgPath == "") {
                alert("请选择上传文件！");
                return;
            }
            //获取上创文件的change事件
            var arr_change=$._data($("#"+elementId)[0], 'events')['change'];

            $.ajaxFileUpload({
                url: '/common/UEditorUpload_uploadFile',
                secureuri: false,
                fileElementId: elementId,//file标签的id
                dataType: dataType?dataType:'text',//返回数据的类型
                data: {},//一同上传的数据
                success: function (data, status) {
                    func.apply(this,[data]);
                    $("#"+elementId).bind('change',arr_change[0].handler);
                },
                error: function (data, status, e) {
                    console.log("上传失败");
                    console.log(e);
                    $("#"+elementId).bind('change',arr_change[0].handler);
                }
            });
        },

        /**
         * 获取浏览器url 参数
         * @param name
         * @returns {null}
         */
        getUrlParam : function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },

        formatTimeToStr : function(times,pattern){
            var d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
            if(pattern){
                d = new Date(times).Format(pattern);
            }
            return d.toLocaleString();
        },
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
                if(str_length>len)
                {
                    str_cut = str_cut.concat("...");
                    return str_cut;
                }
            }
            //如果给定字符串小于指定长度，则返回源字符串；
            if(str_length<=len){
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
        },
        isJson: function (obj) {
            return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
        },
        html_encode:function (str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/\n/g, "<br>");
            return s;
        },
        html_decode:function(str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, " ");
            s = s.replace(/&#39;/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            s = s.replace(/<br>/g, "\n");
            return s;
        }
    };
})


/**
 * @param base64Codes
 *            图片的base64编码
 */
function sumitImageFile(url,base64Codes,filename,func){

    var form=document.createElement("form");
    var formData = new FormData(form);   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数

    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    formData.append("upfile",convertBase64UrlToBlob(base64Codes));  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同

    formData.append("upfileFileName",filename?filename:"default.png");
    //ajax 提交form
    $.ajax({
        url : url,
        type : "POST",
        data : formData,
        dataType:"json",
        processData : false,         // 告诉jQuery不要去处理发送的数据
        contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
        success:function(data){
            if(func&&func instanceof Function){
                func.apply(this,[data]);
            }
            delete iframe;
        },
        xhr:function(){            //在jquery函数中直接使用ajax的XMLHttpRequest对象
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    console.log("正在提交."+percentComplete.toString() + '%');        //在控制台打印上传进度
                }
            }, false);
            return xhr;
        }

    });
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData ){

    var array=urlData.split(',');
    var bytes=window.atob(array[1]);        //去掉url的头，并转换为byte

    var reg= /:(.+);/g;
    var contentType = reg.exec(array[0])[1];

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : (contentType?contentType:'image/png')});
}
//序列化($.serializeArray)后的对象数组转对象
function arrayToObj(data) {
    var obj = {};
    for (var i = 0; i < data.length; i++) {
        obj[data[i].name] = data[i].value;
    }
    return obj;
}
//将序列化数组分割成num个一组的对象数组
function arrToObjArr(arr, num) {
    var temp = [];
    while (arr.length >= num) {
        temp.push(arrayToObj(arr.splice(0, num)))
    }
    return temp;
}

//序列化form内的表单转为json对象
//用法：$(#id).serializeObject()
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
