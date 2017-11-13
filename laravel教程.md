# Installation
Server Requirements
- PHP >= 7.0.0
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

或者使用lavarel的vagrant box Homestead
Laravel 的 Homestead 开发环境部署
https://laravel-china.org/topics/2/laravel-deployment-of-homestead-development-environment

First, download the Laravel installer using Composer:
```bash
composer global require "laravel/installer"
```

Make sure to place composer's system-wide vendor bin directory in your $PATH so the laravel executable can be located by your system. 
GNU / Linux Distributions: $HOME/.config/composer/vendor/bin
```sh
set -U fish_user_paths /usr/local/bin $fish_user_paths
```

Once installed, the laravel new command will create a fresh Laravel installation in the directory you specify. 
```
laravel new blog
```

Local Development Server
If you have PHP installed locally and you would like to use PHP's built-in development server to serve your application, you may use the serve Artisan command.
```sh
php artisan serve
```