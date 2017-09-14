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
        
