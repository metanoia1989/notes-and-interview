手动部署：Mastodon 生产部署指南 https://segmentfault.com/a/1190000011606391 
docker 部署：https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Docker-Guide.md 

文档：https://github.com/tootsuite/documentation 

升级docker-compose
下载：https://github.com/docker/compose/releases/latest

依赖问题：an older version of the 'docker-py' package may be polluting the namespace.、
```
# Find out where docker is installed:
python -c "import docker; print(docker.__path__)"
> ['/usr/lib/python2.7/site-packages/docker']
# (Re-)move the directory
sudo trash /usr/lib/python2.7/dist-packages/docker_py-1.9.0.egg-info/
```



## 参阅
1. [Resolve docker-py older version naming conflict](https://gist.github.com/jonatanblue/e6c319aa95673eaf8acc475f92e961d5)