
db.dropDatabase() 删除当前数据库
db  查看当前数据库名

# 导入初始数据
$ mongorestore -h localhost -d leanote --dir /home/user1/leanote/mongodb_backup/leanote_install_data/

user1 username: admin, password: abc123 (管理员, 只有该用户才有权管理后台, 请及时修改密码)
user2 username: demo@leanote.com, password: demo@leanote.com (仅供体验使用)

为mongodb数据库添加用户
```
# 首先切换到leanote数据库下
> use leanote;
# 添加一个用户root, 密码是abc123
> db.createUser({
    user: 'root',
    pwd: 'abc123',
    roles: [{role: 'dbOwner', db: 'leanote'}]
});
# 测试下是否正确
> db.auth("root", "abc123");
1 # 返回1表示正确
```

mongo configure options reference 
https://docs.mongodb.com/manual/reference/configuration-options/index.html

storage:
    dbPath: "/home/metanoia/leanote/data"

security:
    authorization: "enabled"

# 开机启动
一般在服务器上的程序，开机启动是必不可少的，不然重启一下还要手动启动，那也太蠢了。

私人云笔记 Leanote 服务端搭建指南 让自己的笔记无处不在
https://www.idaybreak.com/install-leanote-server.html

Leanote 二进制版详细安装教程 Mac and Linux
https://github.com/leanote/leanote/wiki/Leanote-%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%89%88%E8%AF%A6%E7%BB%86%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B----Mac-and-Linux