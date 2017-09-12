


/**
 * =====================================
 *               帮助类相关方法
 * =====================================
 */ 

;(function($)
{
    $.extend(
    {
        /**
         * 取到url的参数值
         * @param name 参数名（string）       
         * @returns 返回参数值
         */
        getQueryString:function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            var test= JSON.stringify(r);
            if ( r != null ){
               return decodeURI(r[2]);
            }else{
               return null;
            } 
        },
        /**
         * 对html进行转义
         * @param str 参数名（string）       
         * @returns 转义后的值
         */
        html_encode:function(str){
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/\"/g, "&quot;");
            return s;      
        },
         /**
         * 对转义后的html进行解析
         * @param str 参数名（string）       
         * @returns 转义后的值
         */
       html_decode:function(str){
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&quot;/g, "\"");
            return s;  
        },
        /**
         * 对.net序列化后的时间格式进行转换
         * @param jsondate 参数名（形式为：/Date(1502294400000)/）       
         * @returns YY-MM-DD
         */
        ChangeJsonDate:function(jsondate){
            jsondate = jsondate.replace("/Date(", "").replace(")/", "");
            if (jsondate.indexOf("+") > 0) {
                jsondate = jsondate.substring(0, jsondate.indexOf("+"));
            } else if (jsondate.indexOf("-") > 0) {
                jsondate = jsondate.substring(0, jsondate.indexOf("-"));
            }
            var date = new Date(parseInt(jsondate, 10));
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + month + "-" + currentDate;
        },
         /**
         * 对js凭借html出现单双引号进行处理
         * @param string 参数名       
         * @returns 
         */
        escapeHtml:function(string){
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };
            return String(string).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }

    });
})(jQuery);



