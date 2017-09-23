# 干货阅读

> 1 , 脱离jquery,使用原生ajax

<a href="https://segmentfault.com/a/1190000004100271" target="_blank">链接地址</a>

> 2 , MDN  原生ajax文档

<a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started" target="_blank">链接地址</a>

> 3 , asp.net WebApi 详细文档

<a href="http://www.cnblogs.com/r01cn/archive/2012/11/11/2765432.html" target="_blank">链接地址</a>

> 4 , 

        /// <summary>
        /// 获取Post请求的数据
        /// </summary>
        /// <returns></returns>
        public string GetPostData()
        {
            var request = HttpContext.Current.Request;
            byte[] byts = new byte[request.InputStream.Length];
            request.InputStream.Read(byts, 0, byts.Length);
            string jsonParam = System.Text.Encoding.UTF8.GetString(byts);          
            return jsonParam;
        }

        /// <summary>
        /// 获取get请求的数据
        /// </summary>
        /// <returns></returns>
        public string GetGetData()
        {
            var request = HttpContext.Current.Request;
            string jsonParam = request.QueryString["jsonParam"];          
            return jsonParam;
        }

5 , .net  构建http请求

<a href="http://www.cnblogs.com/no27/p/6528700.html" target="_blank">链接地址</a>

6 , api 插件及 Content-Type

<a href="https://segmentfault.com/a/1190000003002851" target="_blank">链接地址</a>

7 , mySql 安装教程
<a href="http://www.cnblogs.com/sshoub/p/4321640.html" target="_blank">链接地址</a>