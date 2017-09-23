# webApI 1

> 1 , .net webApi的项目构建

        1.1 创建asp.net mvc4应用程序，选择webApi项目，注意控制器选用的是空api控制器

> 2 , 路由匹配

        2.1 默认路由匹配是在app_start文件夹下的WebApiConfig.cs里

        2.2 形式为 api/{controller}/{id} 注意和我们默认的形式不太相同

        2.3 利用默认的路由模板，Web API使用HTTP方法来选择动作。然而，也可以创建在URI中包含动作名的路由：
        
        routes.MapHttpRoute( 
            name: "ActionApi", 
            routeTemplate: "api/{controller}/{action}/{id}", 
            defaults: new { id = RouteParameter.Optional } 
        );

        在这个路由模板中，{action}参数命名了控制器上的动作方法。采用这种风格的路由，需要使用注解属性来指明所允许的HTTP方法。例如，假设你的控制器有以下方法：

        public class ProductsController : ApiController 
        { 
            [HttpGet] 
            public string Details(int id); 
        }

为了找到动作，Web API会考查HTTP方法，然后寻找一个名称以HTTP方法名开头的动作。例如，对于一个GET请求，Web API会查找一个以“Get…”开头的动作，如“GetContact”或“GetAllContacts”等。这种约定仅运用于GET、POST、PUT和DELETE方法。通过把注解属性运用于控制器

> 3 , 属性注解（接受谓词）

        3.1 在下列示例中，FindProduct方法被映射到GET请求：

        public class ProductsController : ApiController 
        { 
            [HttpGet] 
            public Product FindProduct(id) {} 
        }
        

        3.2 要允许一个动作有多个HTTP方法，或允许对GET、PUT、POST和DELETE以外的其它HTTP方法，
             需使用AcceptVerbs（接收谓词）注解属性，它以HTTP方法列表为参数。

        public class ProductsController : ApiController 
        { 
            [AcceptVerbs("GET", "HEAD")]   // 指示该动作接收HTTP的GET和HEAD方法 —      译者注
            public Product FindProduct(id) { } 
        
            // WebDAV method
            //      WebDAV方法（基于Web的分布式著作与版本控制的HTTP方法，是一个扩展的HTTP方法       — 译者注）
            [AcceptVerbs("MKCOL")]   //         MKCOL是隶属于WebDAV的一个方法，它在URI指定的位置创建集合
            public void MakeCollection() { } 
        }
        

> 4 ，构建http请求

        4.1  HttpWebRequest - System.Net

> 5 , http content-type

        Content-Type用于指定内容类型，一般是指网页中存在的Content-Type，Content-Type属性指定请求和响应的HTTP内容类型。如果未指定 ContentType，默认为text/html。

        下面是几个常见的Content-Type:
        
        1.text/html
        2.text/plain
        3.text/css
        4.text/javascript
        5.application/x-www-form-urlencoded
        6.multipart/form-data
        7.application/json
        8.application/xml

        前面几个都很好理解，都是html，css，javascript的文件类型，后面四个是POST的发包方式。



`1.application/x-www-form-urlencoded`

        application/x-www-form-urlencoded是常用的表单发包方式，普通的表单提交，或者js发       包，默认都是通过这种方式，
        
        比如一个简单地表单：
        
        <form enctype="application/x-www-form-urlencoded" action="http://homeway.me/        post.php" method="POST">
            <input type="text" name="name" value="homeway">
            <input type="text" name="key" value="nokey">
            <input type="submit" value="submit">
        </form>
        那么服务器收到的raw header会类似：
        
        Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*     ;q=0.8
        Accept-Encoding:gzip, deflate
        Accept-Language:zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,gl;q=0.2,de;q=0.2
        Cache-Control:no-cache
        Connection:keep-alive
        Content-Length:17
        Content-Type:application/x-www-form-urlencoded
        那么服务器收到的raw body会是，name=homeway&        key=nokey，在php中，通过$_POST就可以获得数组形式的数据。
        
        
        

`2.multipart/form-data`

        multipart/form-data用在发送文件的POST包。
        
        这里假设我用python的request发送一个文件给服务器：
        
        data = {
            "key1": "123",
            "key2": "456",
        }
                files = {'file': open('index.py', 'rb')}
        res = requests.post(url="http://localhost/upload", method="POST", data=data,        files=files)
        print res
        通过工具，可以看到我发送的数据内容如下：
        
        POST http://www.homeway.me HTTP/1.1
        Content-Type:multipart/form-data;       boundary=------WebKitFormBoundaryOGkWPJsSaJCPWjZP
        
        ------WebKitFormBoundaryOGkWPJsSaJCPWjZP
        Content-Disposition: form-data; name="key2"
        456
        ------WebKitFormBoundaryOGkWPJsSaJCPWjZP
        Content-Disposition: form-data; name="key1"
        123
        ------WebKitFormBoundaryOGkWPJsSaJCPWjZP
        Content-Disposition: form-data; name="file"; filename="index.py"
        这里Content-Type告诉我们，发包是以multipart/       form-data格式来传输，另外，还有boundary用于分割数据。
        
        当文件太长，HTTP无法在一个包之内发送完毕，就需要分割数据，分割成一个一个chunk发送给服务端，
        
        那么--用于区分数据快，而后面的数据633e61ebf351484f9124d63ce76d8469就是标示区分        包作用。
        
        
        

`3.text/xml`

        微信用的是这种数据格式发送请求的。
        
        POST http://www.homeway.me HTTP/1.1 
        Content-Type: text/xml
        
        <?xml version="1.0"?>
        <resource>
            <id>123</id>
            <params>
                <name>
                    <value>homeway</value>
                </name>
                <age>
                    <value>22</value>
                </age>
            </params>
        </resource>
        php中$_POST只能读取application/x-www-form-urlencoded数据，$_FILES只能读取multipart/form-data类型数据，

        那么，要读取text/xml格式的数据，可以用：
        
        $file = fopen('php://input', 'rb');
        $data = fread($file, length);
        fclose($file);
        或者
        
        $data = file_get_contents('php://input');
        
        

`4.application/json`

        通过json形式将数据发送给服务器，一开始，我尝试通过curl，给服务器发送<application>     </application>/json格式包，
        
然而我收到的数据如下：
        
--------------------------e1e1406176ee348a Content-Disposition: form-data;      name="nid" 2 --------------------------e1e1406176ee348a Content-Disposition: form-data; name="uuid" cf9dc994-a4e7-3ad6-bc54-41965b2a0dd7 --------------------------e1e1406176ee348a Content-Disposition: form-data; name="access_token" 956731586df41229dbfec08dd5d54eedb98d73d2 --------------------------e1e1406176ee348a--

        后来想想明白了，HTTP通信中并不存在所谓的json，而是将string转成json罢了，也就是application/json可以将它理解为text/plain，
        普通字符串。

> 6 , HttpResponseException

        6.1 如果一个Web API控制器抛出一个未捕捉异常，会发生什么？
        默认地，大多数异常都会被转化成一个带有状态码“500 – 内部服务器错误”的HTTP响应。

        6.2 HttpResponseException（HTTP响应异常）类型是一种特殊的情况。这种异常会返回你在异常构造器中指定的任何HTTP状态码。
        例如，在以下方法中，如果id参数非法，会返回“404 — 未找到”。

        public Product GetProduct(int id) 
        { 
            Product item = repository.Get(id); 
            if (item == null) 
            { 
                throw new HttpResponseException(HttpStatusCode.NotFound); 
            } 
            return item; 
        }
        
        6.3 为了对响应进行更多控制，你也可以构造整个响应消息，并用HttpResponseException来包含它：

        public Product GetProduct(int id) 
        { 
            Product item = repository.Get(id); 
            if (item == null) 
            { 
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound) 
                { 
                    Content = new StringContent(string.Format("No product with ID =         {0}", id)), 
                    ReasonPhrase = "Product ID Not Found" 
                } 
                throw new HttpResponseException(resp); 
            } 
            return item; 
        }
        
        

> 7 , UserAgent

User-Agent是Http协议中的一部分，属于头域的组成部分，User Agent也简称UA。用较为普通的一点来说，是一种向访问网站提供你所使用的`浏览器类型、操作系统及版本、CPU 类型、浏览器渲染引擎、浏览器语言、浏览器插件等信息`的标识。UA字符串在每次浏览器 HTTP 请求时发送到服务器！

`作用`

根据前面介绍的user-agent的历史我们知道，通过user-agent不能完全准确的判断是属于那款浏览器。由于UA字符串在每次浏览器HTTP 请求时发送到服务器，所以服务器就可以根据它来做好多事。

比如：

1、统计用户浏览器使用情况。有些浏览器说被多少人使用了，实际上就可以通过判断每个IP的UA来确定这个IP是用什么浏览器访问的，以得到使用量的数据。

2、根据用户使用浏览器的不同，显示不同的排版从而为用户提供更好的体验。有些网站会根据这个来调整打开网站的类型,如是手机的就打开wap，显示非手机的就打开pc常规页面。用手机访问谷歌和电脑访问是不一样的，这些是谷歌根据访问者的UA来判断的。 

既然知道了UA的作用，那么其实客户端也可以使用UA来做一些神奇的事。

比如：伪装 user agent 来回避某些侦测特定浏览器才能读取的网站。

如果使用Firefox浏览器插件User agent switcher，用户就可以轻松地在不同UA之间切换，把自己伪装成其他浏览器。这样就可以在PC上预览WAP或移动格式的网页，比如专门为iPhone设计的页面。

> 8 . Content-Length

当客户端请求时是Connection: keep-alive的时候，服务器返回的形式Transfer-Encoding: chunked的形式，以确保页面数据是否结束，长连接就是这种方式，用chunked形式就不能用content-length

参考：
设置响应消息的实体内容的大小，单位为字节。对于HTTP协议来说，这个方法就是设置 Content-Length响应头字段的值。因为当浏览器与WEB服务器之间使用持久(keep-alive)的HTTP连接，如果WEB服务器没有采用chunked传输编码方式，那么它必须在每一个应答中发送一个 Content-Length的响应头来表示各个实体内容的长度，以便客户端能够分辨出上一个响应内容的结束位置。

> 9 , IIS部署错误

        9.1 无法识别的属性“targetFramework”。请注意属性名称区分大小写。错误解决办法

        1、打开IIs点击IIS根节点
        2、看右边的“操作”-》点击“更改.NET Framework 版本”
        3、选择相应的版本，我这里应该选择v4.0.30319,点击确定
        4、点击IIS的应用程序池
        5、在右边“操作”栏里选择“应用程序默认设置...”
        6、把“.NET Framework 版本”设置为v4.0，点击“确定”即可。
        7、设置需要的版本为允许允许，不然会出现如下错误：Internet Information Services 7.5.
            （1）、打开ISAPI和CGI限制
            （2）、找到你需要但被设为不允许运行的版本，
            （3）、把需要运行的版本设置为“允许”，即可

        本质上：就是一个版本未识别的问题

---

        9.2 没有相关的源行的错误

当将c#项目发布到iis服务器上的时候，此时可能会报出：

未能写入输出文件“c:\windows\Microsoft.NET\Framework\v4.0.50727\Temporary ASP.NET Files\root\880723cf\1f28d30b\App_Web_index.aspx.fd02bdc1.bcbkmk1v.dll”--“拒绝访问。 ”

解决方法：

找到服务器上C:\WINDOWS\temp 文件，给Users用户添加上修改和写入的权限即可！（`这里注意的是是要对users用户进行权限的控制`）
