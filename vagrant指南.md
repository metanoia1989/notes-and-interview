# Vagrant 虚拟机管理器 指南

安装，项目开始，box，开启虚拟机以及SSH连接
同步文件夹，初始加载脚本，网络连接
共享，拆卸，再构建，管理器切换

所有的盒子市场 : https://app.vagrantup.com/boxes/search

Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
end

```
# 初始化的时候添加box
$ vagrant init hashicorp/precise64 
# 初始化之后再添加box
$ vagrant box add hashicorp/precise64
```
A Vagrant plugin to keep your VirtualBox Guest Additions up to date

```
$ vagrant box add laravel/homestead ~/Downloads/virtualbox.box
config.vm.box = "/media/metanoia/local_F/vagrant/ubuntu12.04/Ubuntu12.04.LTS.32.box"
```

vagrant up
vagrant ssh
vagrant destroy
vagrant box remove
vagrant halt name
vagrant status name

ssh必须要求key所有者连接，在f盘下所有者为root，用root启动，又遭遇virtualbox不能启动。必须用metanoia身份挂载F盘。

sudo mount -t ntfs-3g -o rw,auto,username="metanoia",password="kuyewen1234",gid="1000",uid="1000",x-systemd.automount,noatime /dev/sda6 /media/metanoia/local_F/

Synced Folders  /vagrant directory 
config.vm.synced_folder "../data", "/vagrant_data"

# 网络配置 端口转发
```
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"
```

# virtualbox特性
```
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
```



# 定义虚拟机名
```
Vagrant.configure('2') do |config|
    config.vm.box = "precise64"
    config.vm.box_url = "http://files.vagrantup.com/precise64.box"
    config.vm.define "foohost" do |foohost|    //终端下名
    end
    config.vm.provider :virtualbox do |vb|
        vb.name = "barhost"     // virtualbox GUI下名
    end
end
```

vagrant-vbguest 
https://github.com/dotless-de/vagrant-vbguest
A Vagrant plugin to keep your VirtualBox Guest Additions up to date

# SSH配置
~/v/ubuntu16.04> vagrant ssh-config
Host ubuntu16demo
  HostName 127.0.0.1
  User vagrant
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /home/metanoia/vagrant/ubuntu16.04/.vagrant/machines/ubuntu16demo/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL




# 初始化指令
```
  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
```
vagrant reload --provision
quickly restart your virtual machine, skipping the initial import step.
This works because in the shell script above we installed Apache and setup the default DocumentRoot of Apache to point to our /vagrant directory, which is the default synced folder setup by Vagrant.

初始化安装apche
save it as bootstrap.sh in the same directory as your Vagrantfile
```
#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi
```
configure Vagrantfile
```
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"
  config.vm.provision :shell, path: "bootstrap.sh"
end
```

# 共享vagrant虚拟机
利用ngork作内网穿透，需要环境变量里有ngork，然后利用一个生成的url来访问vagrant环境，叫做Vagrant Share。
然后ngork闭源，无法在服务器上部署，等同废物。

# 拆卸 teardown
vagrant suspend 保存虚拟机状态，便于快速恢复
vagrant halt  关机，可以用up再次启动
vagrant destroy 回收磁盘，销毁实例，适用up会再次导入box

# 指定虚拟机接口
$ vagrant up --provider=vmware_fusion