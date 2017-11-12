虽说ngork有内存泄露的问题，但是在国外这是一款内网穿透并且运用广泛的工具。vagrant的share特性依赖这个工具。

ngork的服务安装涉及到自签名证书，看到证书我一般是恐惧的，因为背后的体系太身后。

看博客和教程是比较快的，更有时效性，难的深的以后再慢慢看文档。

自己建立ngrok服务器进行内网穿透 https://blog.phpgao.com/ngrok_how_to.html
从零教你搭建ngrok服务，解决外网调试本地站点 https://morongs.github.io/2016/12/28/dajian-ngrok/
搭建自己的ngrok服务 http://tonybai.com/2015/03/14/selfhost-ngrok-service/

# 解析域名
```
ngrok.metanoia1989.com ----------> A记录到你的 VPS IP
*.ngrok.metanoia1989.com ----------> CNAME到ngrok.metanoia1989.com
```

# 安装go语言环境
``` bash
# 从 go 官网下载最新的 go 版本
wget -c https://storage.googleapis.com/golang/go1.7.4.linux-amd64.tar.gz
tar -C /usr/local -zxvf go1.7.4.linux-amd64.tar.gz
# 设置相关环境变量
export GOROOT=/usr/local/go' >> /etc/profile
export PATH=$PATH:$GOROOT/bin' >> /etc/profile
export GOPATH=$HOME/go' >> /etc/profile
source /etc/profile
# 检查是否安装成功
go version
```

# 克隆代码
```
git clone https://github.com/inconshreveable/ngrok.git
cd ngrok
```

# 生成自签名证书
```bash
export NGROK_DOMAIN="ngrok.metanoia1989.com"

openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 36500 -out rootCA.pem
openssl genrsa -out device.key 2048
openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr
openssl x509 -req -in device.csr -days 36500 -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt 
# 生成的证书分别替换到 assets/client/tls和assets/server/tls中
cp rootCA.pem assets/client/tls/ngrokroot.crt
cp device.crt assets/server/tls/snakeoil.crt 
cp device.key assets/server/tls/snakeoil.key
```

# 编译ngrokd和ngrok
不同平台使用不同的 GOOS 和 GOARCH，GOOS为go编译出来的操作系统 (windows,linux,darwin)，GOARCH, 对应的构架 (386,amd64,arm)
```
Linux 平台 32 位系统：GOOS=linux GOARCH=386
Linux 平台 64 位系统：GOOS=linux GOARCH=amd64

Windows 平台 32 位系统：GOOS=windows GOARCH=386
Windows 平台 64 位系统：GOOS=windows GOARCH=amd64

MAC 平台 32 位系统：GOOS=darwin GOARCH=386
MAC 平台 64 位系统：GOOS=darwin GOARCH=amd64

ARM 平台：GOOS=linux GOARCH=arm
```
服务端运行在Linux下，我们不需要任何操作
$ make release-server 
仅仅在linux下使用
$ make release-all
$ GOOS=linux GOARCH=amd64 
$ make release-client 

# 启动ngrokd服务器
```
sudo ln -s /usr/bin/ngrokd /home/metanoia/app/ngrok/bin/ngrokd
# 帮助信息
ngrokd -h 
ngrokd -domain=$NGROK_DOMAIN
# 可以指定端口
ngrokd -domain=$NGROK_DOMAIN -httpAddr=":8080" -httpsAddr=":8081" 
```
其中，-domain为你的ngrok服务域名，-httpAddr为http服务端口地址，访问形式为：xxx.ngrok.morongs.com:8088，也可设置为80默认端口，-httpsAddr为https服务

后台运行ngrok
```
$ nohup ngrokd -domain="ngrok.morongs.com" -httpAddr=":8000" &
```

# 启动ngrok客户端验证
建立ngrok配置文件：ngrok.cfg
```
server_addr: “ngrok.metanoia1989.com:4443"
trust_host_root_certs: false
```

运行客户端，暴露本地4000端口站点
```	
$ ngrok -subdomain demo -config=./config.cfg 4000

Tunnel Status                 online                                       
Version                       1.7/1.7                                      
Forwarding                    http://demo.ngrok.metanoia1989.com:8081 -> 12
Forwarding                    https://demo.ngrok.metanoia1989.com:8081 -> 1
Web Interface                 127.0.0.1:4040                               
# Conn                        7                                            
Avg Conn Time                 143.34ms  
```

访问 demo.ngrok.metanoia1989.com 即可查看映射的本地服务。
http://localhost:4040 可以查看请求的详细信息

# 开机启动
```
vim /etc/rc.local

# 添加以下命令，注意使用绝对路径
# 服务端
nohup /path/to/ngrokd -domain=ngrok.phpgao.com -log="/tmp/ngrok.log" >/dev/null 2>&1 &

# 客户端
nohup ./ngrok -config ngrok.cfg -log stdout -log-level="INFO" -subdomain=test 8080 >/tmp/ngrok.log 2>&1 &
```

# 使用yml配置文件
```
tunnels:
  webapp:
    proto:
      http: 8080
    auth: "user:pw"
  ssh:
    proto:
      tcp: 22
```
```bash
运行某些
ngrok -congfig=ngrok.cfg start ssh
ngrok -congfig=ngrok.cfg start ssh webapp
运行全部
ngrok -congfig=ngrok.cfg start-all
```