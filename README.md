##### 项目介绍
    vue + express + mysql // 待重构

##### 文件结构  
    |——bin                        // 启动文件 <br>
        |——www
    |——config
        |——db.js                  // 后台——数据库配置文件
        |——mysql.js               // 后台——数据库连接----连接池
    |——models
        |——apiTask.js             // 后台——接口----抛出给前台
        |——sqlMapping.js          // 后台——sql语句
        |——tasks.js               // 后台——接口公共方法
    |——public                     // 静态资源
        |——fonts                  // 字体文件
        |——images                 // 图片
        |——javascripts            // 引入的js资源
        |——js                     // 每个模块的vue实例
        |——stylesheets            // 公共样式
    |——routes                     // 路由配置
        |——api.js                 // 后台接口url
        |——index.js               // 前台页面路由
    |——views                      // 视图文件
    |——default.sql                // 数据库
    |——app.js                     // express  配置文件----模板使用ejs
    |——package.json               
##### usage
    1. 安装mysql,node
    2. 新建数据库，账号root,密码root,导入default.sql
    3. git clone 'path/to/git/url'  
    4. npm install
    5. npm start
