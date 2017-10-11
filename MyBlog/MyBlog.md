# 一，Hexo + github 搭建自己的博客

> 1 , hexo g , hexo s 无法起效果的问题 

    进入目录不对

> 2 ,  http://localhost:4000/ 进不去 

        福听阅读器默认占据4000的端口，端口被占用

        hexo s -p 5000    
        换成5000端口，果断可以访问。

> 3 , 

        文章标题，日期，标签，分类
        
        title: MVVM模式快速入门
        date: 2015-11-13 15:40:25
        tags: MVVM
        categories: IOS开发
        
        文章写好直接执行下面命令即可直接发布文章
        
        hexo d -g   

 4 ， 

        们，问题解决了么？我这边到是能获取到优酷的视频链接，前缀都相同为http://player.youku.com/embed/，后面再加上优酷视频的id（例如XMTMzNDkzNjQ3Ng==）就可以在手机端播放了，我用的是iframe标签播放的，不能用video标签，但是我这边有一个技术性问题就是iframe标签中的视频不能再app中全屏播放。。。。


5 , 

        
        
        放在github page上的静态网站怎么取消绑定自定义域名？
        github
        博客
        域名
        
            购买域名后添加了
        
                    @   CNAME     我的用户名.github.io
                    blog    A    192.30.252.154
                    blog    A    192.30.252.153
        
            三条记录
            然后在gh-pages分支上添加了内容为**blog.我的域名.cn**的CNAME文件
        
            但是访问的时候一直说服务器未响应，应该是github page给的ip的问题
        
            所以现在想改回来直接用 用户名.github.io来访问
        
            于是删掉了CNAME文件，但是访问 用户名.github.io         的时候还是跳转到blog.我的域名.cn
        
            怎么取消绑定？
        

6 ， 

        可以在_config.yml内加上如下代码更改hexo-server运行时的端口号：
        
        server:
          port: 4001
          compress: true
          header: true
        