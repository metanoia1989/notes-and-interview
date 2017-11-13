Mastodon 是一个分布式社交网络服务，提供给用户类似 Twitter（中文推特）的社交体验，同时它还有着一些 Twitter 所不具备的东西。比如：对每条嘟文进行单独的隐私设置，无广告，嘟文字数限制为 500 字（Twitter为 140 个字）。

Mastodon（长毛象） - 分布式社交网络服务 https://24dian30.com/world/expo/1450.html


clone项目之后docker-compose build && docker-compose up -d 就好。
加上反向代理和SSL。 SSL的话用Letsencrypt即可。

Running-Mastodon/Docker-Guide.md https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Docker-Guide.md 

Mastodon 生产部署指南 https://segmentfault.com/a/1190000011606391

Getting started with Mastodon!
https://wogan.blog/2017/04/09/getting-started-with-mastodon/

## Setting up
安装docker-compose
https://github.com/docker/compose/releases/tag/latest
```sh
curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

Clone Mastodon's repository.
```
git clone https://github.com/tootsuite/mastodon
cd mastodon
```

Review the settings in docker-compose.yml, uncomment the volumes directive 

fill in the .env.production, need to fill in, at least: `LOCAL_DOMAIN`, `LOCAL_HTTPS`, and the `SMTP_*` settings.
```sh
cp .env.production.sample .env.production
nano .env.production
```

## Building the app
```
docker-compose build
```

or use prebuilt images on Docker Hub, just comment out all build keys in docker-compose.yml and continue.
```
gargron/mastodon
```

PAPERCLIP_SECRET, SECRET_KEY_BASE, and OTP_SECRET
```
docker-compose run --rm web rake secret
3d70ea48b64b82621d8b84951266919b611e2ade0f825e402da347cf129d8018c3d0d9166b1ee65faa353cba1dec606ccb09bca211c6d91a93170d79103f76cd
d7d56a9193cca81dd183fc6f1c6c9c178913ba8ae0a3b8a335bf721c0cf5afd5928cf41cc37d0a84021303d00a20475d2352f2e799e61a3afdb291c37eb2bafe
0fa9524e58d4122b04aa7611a61813a618782abb7433aa456f37a0186016ded89bfae5ddb38399ddb0643821918c0878d7e1cbab846e29007f5156c6566ffef5
```

VAPID_PRIVATE_KEY and VAPID_PUBLIC_KEY
```
docker-compose run --rm web rake db:migrate
VAPID_PRIVATE_KEY=9_1kA8UJ2B9OPphSVAwioMt0wTNgnjiorUGaglh-VyA=
VAPID_PUBLIC_KEY=BOfG0W_Rc7DKqTKI2Hyt80tNFlmY8rZraIsrQMwuaKC6GkL2KZ8Z8l0eUiO8mnVvZ-YI8irqu7J5eVc3bt8Z2Wg=
```