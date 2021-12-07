laravel新建一个工程慢死人，受不了换源，之前就换过一次，但是没有记录下来，每次都要去查，非常的麻烦。

composer中文全量镜像 https://packagist.laravel-china.org

选项一、全局配置
> $ composer config -g repo.packagist composer https://packagist.laravel-china.org
选项二、单独使用
如果仅限当前工程使用镜像，去掉 -g 即可
> $ composer config repo.packagist composer https://packagist.laravel-china.org

取消镜像
> composer config -g --unset repos.packagist


composer 命令后面加上 -vvv （是3个v）可以打印出调错信息
```sh
$ composer -vvv create-project laravel/laravel blog
$ composer -vvv require psr/log
```

安装项目速度过慢Ctrl+c取消后无法新建项目：
composer.lock 缓存了之前的配置信息，从而导致新的镜像配置无效。先删除composer.lock 文件，进入项目目录再运行 composer install 重新生成。

创建新工程的两种方式
laravel new xxx
composer create-project laravel/laravel xxx

升级版本
> $ composer selfupdate

查看当前版本
> composer -V