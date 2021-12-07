# 配置命令行
临时使用
npm --registry https://registry.npm.taobao.org install express

持久使用
npm config set registry https://registry.npm.taobao.org
sudo npm config set registry https://registry.npm.taobao.org

使用官方镜像
npm config set registry https://registry.npmjs.org/

查看npm源地址
npm config get registry

# 通过配置文件 .npmrc
.npmrc 文件位置
项目目录：/path/to/my/project/.npmrc
用户目录：~/.npmrc
全局配置：$PREFIX/etc/.npmrc
内置配置：/path/to/npm/.npmrc

编辑 ~/.npmrc 加入下面内容
registry = https://registry.npm.taobao.org



# 通过cnpm
```sh
# 安装 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 通过 cnpm 命令替代 npm 命令安装模块
cnpm install express
```


# 设置代理
npm config set proxy http://server:port
npm config set https-proxy http://server:port   

# 使用nrm快速切换npm源
nrm 是一个 NPM 源管理器，允许你快速地在如下 NPM 源间切换
安装：sudo npm install -g nrm 
列出可用的源：nrm ls
切换：nrm use taobao 
增加源：nrm add <registry> <url> [home]
删除源：nrm del <registry>
测试速度：nrm test