* 微信小程序测试用例，可以用来学习小程序的编写

* 部署到服务器后，需要创建如下两个文件

1. `./server/config.js`

```js
//配置数据库相关配置
// mysql
const config = {
    database: '你的数据库',
    username: '用户',
    password: '密码',
    host: "IP地址",
    port: 3306,//一般mysql都默认为这个端口
}

module.exports = config
```

2. `./web/config.js`

* 这里需要填写你部署的后端服务器在哪

```js
export default  {
    url: '*.*.*.*',
    port: 3000//这里端口要对应后端接口运行的端口，已在代码指定为3000，如要修改要同步这里
}
```

* 将web部署到服务器后，运行 `npm install`命令，然后 `npm start`
  * 如果要永久运行该程序请自行用其他插件执行，这里建议用 forever，（主要是自己的服务器已经全局安装过了，懒得去修改这个项目了）
  * 执行的文件为 `./bin/www`,(参考express自动生成框架)
* 然后用你的微信开发者工具（开发版）打开该项目（./web），执行npm install 命令
  * 并且在开发者工具中勾选上 使用 npm
  * 建议此时再重新构建一次npm