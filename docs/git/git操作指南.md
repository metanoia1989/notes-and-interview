# 免密码 git push
Github获取远程库时，有ssh方式和https方式，使用ssh时保存密钥对以后可以不再输入帐号密码，而https却不能。

改变remote远程url
```bash
git remote rm origin  
git remote add origin git@github.com:itmyhome2013/blog.git 
```

# git reset
取消缓存：git reset HEAD <file>
git状态剪短信息：git status -s

# remote
查看远程仓库 git remote show [remote-name]
重命名引用 git remote rename pb paul
移除一个远程仓库 git remote rm
从远程仓库中抓取 git fetch [remote-name]
推送到远程仓库 git push [remote-name] [branch-name]
添加远程仓库 git remote add <shortname> <url>

# 缓存区
将文件从缓存区移除 git rm
将缓存区恢复为我们做出修改之前的样子 git reset HEAD
自动将在提交前将已记录、修改的文件放入缓存区 git commit -a 

参考手册
https://git-scm.com/docs 
https://git-scm.com/book/zh/v2
http://gitref.justjavac.com/basic/ 