mastodon服务需要邮件发送，官方的配置上写的是mailgun，那我就注册这个服务吧。

mailgun有一系列的入门教程。

利用mailgun搭建私有域名邮箱 https://xdays.me/%E5%88%A9%E7%94%A8mailgun%E6%90%AD%E5%BB%BA%E7%A7%81%E6%9C%89%E5%9F%9F%E5%90%8D%E9%82%AE%E7%AE%B1.html

安装mailgun-php邮件发送库 https://documentation.mailgun.com/en/latest/libraries.html#php
类的地址：https://github.com/mailgun/mailgun-php
composer require mailgun/mailgun-php php-http/curl-client guzzlehttp/psr7


```php
<?php
# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;
# Instantiate the client.
$mgClient = new Mailgun('key-7d30b09f045c458ee4b933ad18f09ace');
$domain = "sandbox8269d0d7fe1a4fddb35e101ae03d14fb.mailgun.org";
# Make the call to the client.
$result = $mgClient->sendMessage("$domain",
          array('from' => 'Mailgun Sandbox<postmaster@sandbox8269d0d7fe1a4fddb35e101ae03d14fb.mailgun.org>',
                'to' =>   'adam smith <sogaxili@gmail.com>',
                'subject' => 'Hello adam smith',
                'text' => 'Congratulations adam smith, you just sent an email with Mailg'));
```

添加子域名，会出现帮助信息

Domain Information
State Active
IP Address 184.173.153.207 Manage IPs
SMTP Hostname smtp.mailgun.org
Default SMTP Login postmaster@sandbox8269d0d7fe1a4fddb35e101ae03d14fb.mailgun.org
API Base URL https://api.mailgun.net/v3/sandbox8269d0d7fe1a4fddb35e101ae03d14fb.mailgun.org
Default Password ff5f284e3be8a6b6942fa465bfb0fbb8Manage SMTP credentials
API Key key-7d30b09f045c458ee4b933ad18f09ace

https://sendgrid.com/
https://hackernoon.com/deploying-mastodon-on-digital-ocean-f54b94c7f5b8
API Key ID: wBxJ4koSSuuITR6wLiR2ZQ
API-KEY  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
```
SMTP_SERVER=smtp.sendgrid.net
SMTP_PORT=587
SMTP_LOGIN=apikey
SMTP_PASSWORD=<your-api-key>
SMTP_FROM_ADDRESS=youremail@gmail.com
```

My instance is piscolabis.me
https://www.sparkpost.com/
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_LOGIN=my google username@gmail.com
SMTP_PASSWORD= my gmail password
SMTP_FROM_ADDRESS=my google username@gmail.com
#SMTP_DOMAIN= # defaults to LOCAL_DOMAIN
#SMTP_DELIVERY_METHOD=smtp # delivery method can also be sendmail
#SMTP_AUTH_METHOD=plain
#SMTP_OPENSSL_VERIFY_MODE=peer
#SMTP_ENABLE_STARTTLS_AUTO=true
I have enabled "less secure apps" for google too

Also tried with sparkpost with no result

SMTP_SERVER=smtp.sparkpostmail.com
SMTP_PORT=587
SMTP_LOGIN=SMTP_Injection
SMTP_PASSWORD=myapikey
SMTP_FROM_ADDRESS=piscolabis.me
SMTP_AUTH_METHOD=AUTH LOGIN
```


# All SMTP details, Mailgun and Sparkpost have free tiers
SMTP_SERVER=
SMTP_PORT=
SMTP_LOGIN=
SMTP_PASSWORD=
SMTP_FROM_ADDRESS=


Host	smtp.sparkpostmail.com
Port	587
Alternative Port: 2525
Authentication	AUTH LOGIN
Encryption	STARTTLS
Username	SMTP_Injection
Password d81494450fcacfa28304ca6f7abd7fac0b10c495
