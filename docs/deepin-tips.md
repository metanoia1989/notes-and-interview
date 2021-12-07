# 系统适用
启动器图标的大小调节 Ctrl + -/+

15.5 的字体渲染太过锐利，需要大一点才好看，字体大小13px比较合适


# 文件\文件夹
find ./ -iname "*.txt"
find ./ | grep txt
find ./ | grep txt | grep Site | grep -v linux

当然，复制文件夹，并且要保留所有的权限属性，加上参数 -ra
cp -ra a b

如果你复制的文件夹里面有很多内容，你想看到实时进度的话，可以用 -v 参数
cp -rav a b

# 开机自动加载 ~/.bash_profile 文件
.bashrc 文件是每次打开一个新的终端窗口的时候执行的。而.bash_profile 文件是每次登录用户的时候执行一次。
如果要在登录时执行一次，应该写入 .profile
我们要的是解决问题，而不是让你告诉我们，我们的问题不是问题！
```
# 编辑文件
vim ~/.config/deepin/deepin-terminal/config.conf
# 找到第56行，讲 false 修改为 true
run_as_login_shell=true
# :wq 保存退出
:wq
```

# 配置静态服务器
### Python 静态服务器
```python
python -m SimpleHTTPServer or http.server 
http://127.0.0.1:8000/
echo 'alias pyhttp="python -m SimpleHTTPServer"' >> ~/.bash_profile && . ~/.bash_profile
```

### nodejs 的 http-server 服务
nodejs 有一个 http-server 的http服务包,也可以启动一个 http 服务。
```js
sudo npm install http-server -g
// 启动一个http服务 默认端口 8080
http-server
// 指定一个端口启动
http-server -p 9000
//命令缩写
// 启动一个http服务 默认端口 8080
hs
// 指定一个端口启动
hs -p 9000
```

### 安装 Browsersync 服务
当我们的文件保存的时候，就立即自动刷新了，就是 Browsersync。vue+webpack开发时有这样的功能。
```
sudo npm install -g browser-sync
// 跳转到你的网页文件目录
cd ~/youSiteName
// 执行下面的命令
browser-sync start --server --files "css/*.css"
//监控css目录下面的样式文件和根目录下面的html文件
browser-sync start --server --files "css/*.css, *.html"
//html和css文件比较松散
browser-sync start --server --files "**/*.css, **/*.html"
```

动态网站使用 Browsersync 服务
```bash
# 做一个反向代理
browser-sync start --proxy "主机名" --files "css/*.css"
# 监控所有的样式文件和网页文件
browser-sync start --proxy "www.cms.com" --files "**/*.css, **/*.html"
```

命令缩写
```js
// 编辑配置文件
vim ~/.bash_profile
// 给文件末尾添加
alias bshttp='browser-sync start --server --files "**/*.css, **/*.html"'
//:wq 保存退出
// 使配置文件生效
. ~/.bash_profile
```

browsersync 中文官方网站 http://www.browsersync.cn/
browsersync 英文官方网站 https://browsersync.io/

# 服务器环境
修改mysql密码
```js
// 如果你上面的配置成功了，输入mysql即可进入mysql命令行模式
// 用 root 用户登录 mysql
mysql -u root
// 打开 mysql 这个数据库（这里的mysql 和上面的 mysql是不一样的，这个是库名，上面是命令）
use mysql
// 将 mysql 的 root 用户密码设置为 123456
UPDATE user SET password=PASSWORD('123456') WHERE user='root';
// 使修改生效
flush PRIVILEGES;
// 退出 
exit
```

推荐使用 mycli 这款终端下的 mysql 管理软件管理，比自带的命令行好用多了，可以补全命令。

# deb包使用
```
安装一个 Debian 软件包
dpkg -i <package.deb>

列出 <package.deb> 的内容
dpkg -c <package.deb>

从 <package.deb> 中提取包裹信息
dpkg -I <package.deb>

移除一个已安装的包裹 remove
dpkg -r <package>

完全清除一个已安装的包裹 purge
dpkg -P <package>

列出 <package> 安装的所有文件清单
dpkg -L <package>

显示已安装包裹的信息
dpkg -s <package>

重新配制一个已经安装的包裹
dpkg-reconfigure <package>
```

## deepin利用conky打造一个炫酷的桌面
https://bbs.deepin.org/forum.php?mod=viewthread&tid=148009&extra=
https://github.com/metanoia1989/linux-tools/tree/master/conky

移动到用户家目录
```sh
mv conkyrc $HOME/.conkyrc  
mv feed $HOME/.feed    
```

配置开机启动
```sh
echo 'conky &' >> $HOME/.profile
echo "sh $HOME/.feed/feed.sh &" >> $HOME/.profile

cat $HOME/.feed/feed.sh | sed -i "/cd/c cd $HOME\/.feed" $HOME/.feed/feed.sh
```

修改网络监控的网卡
```sh
vim $HOME/.conkyrc
# 最后三行修改自己的网卡名
下载速度:$alignr${downspeed wlp2s0} k/s
上传速度:$alignr${upspeed wlp2s0} k/s
${downspeedgraph wlp2s0 324D23 77B753}
```

# 触摸板手势
https://bbs.deepin.org/forum.php?mod=viewthread&tid=148191&aid=45807

# 字体渲染更改不圆润的解决方案

https://bbs.deepin.org/forum.php?mod=viewthread&tid=148053&page=1&mobile=2

http://m.blog.csdn.net/fungleo/article/details/78438788

https://bbs.deepin.org/forum.php?mod=viewthread&tid=147987&fromguid=hot&extra=&mobile=2

https://bbs.deepin.org/forum.php?mod=viewthread&tid=147485&fromguid=hot&extra=&mobile=2

http://linuxbrew.sh

# 一个redis桌面客户端 
https://github.com/uniorder/kedis

# deepin顶部栏
业务爱好者的 https://github.com/linuxflyos/flyos-topbar
官方员工的开发 https://github.com/kirigayakazushin/deepin-topbar

topbar PPA 
```sh
Append content to /etc/apt/sources.list
deb [arch=amd64] https://packages.mkacg.com panda main
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3BBF73EE77F2FB2A
sudo apt update && sudo apt install deepin-topbar
```

flyos-topbar 
```
git clone https://github.com/linuxflyos/flyos-topbar
cd flyos-topbar
mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX=/usr ..
make
sudo make install
```
flyos要求cmake为3.8以上，而仓库的是3.7
```
sudo apt remove cmake
https://cmake.org/download/ 
chmod +x /path/to/cmake-3.6.2-Linux-x86_64.sh
sudo /path/to/cmake-3.6.2-Linux-x86_64.sh
sudo ln -s /opt/cmake-3.6.2-Linux-x86_64/bin/* /usr/local/bin
```
安装高版本cmake
sudo apt remove cmake
https://cmake.org/download/
wget cmake-3.10.0-rc5-Linux-x86_64.sh
chmod u+x cmake.sh
./cmake.sh
sudo ln -s /opt/cmake-3.6.2-Linux-x86_64/bin/* /usr/local/bin


依赖问题
xcb/xcb_ewmh.h: No such file or directory
sudo apt install libxcb-ewmh-dev
 xcb/xcb_icccm.h: No such file or directory
sudo apt install libxcb-icccm4-dev

xcb/composite.h: No such file or directory
sudo apt install libxcb-composite0-dev

xcb/xcb_image.h: No such file or directory
libxcb-image0-dev/

flyos-topbar/plugins/sound/soundapplet.h:12:22: fatal error: QGSettings: No such file or directory
```
 #include <QGSettings>
 #include <QSettings>
```
locate QGSettings
/usr/include/x86_64-linux-gnu/qt5/QGSettings
/usr/include/x86_64-linux-gnu/qt5/QGSettings/QGSettings
/usr/include/x86_64-linux-gnu/qt5/QGSettings/qgsettings.h

In file included from /home/metanoia/Application/flyos-topbar/plugins/sound/soundapplet.cpp:1:0:
/home/metanoia/Application/flyos-topbar/plugins/sound/soundapplet.h:12:22: fatal error: QGSettings: No such file or directory
 \#include <QGSettings>
                      ^
http://www.linuxidc.com/Linux/2011-11/47379.html


# 15.5字体变细解决
https://bbs.deepin.org/forum.php?mod=viewthread&tid=148334&extra=