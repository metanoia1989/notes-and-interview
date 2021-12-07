ruby gem 换源 https://gems.ruby-china.org/ 
- 显示当前使用的sources：gem sources 或 gem sources -l
- 添加ruby-china：gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
- 更新缓存：gem sources -u

使用 Gemfile 和 Bundler
> $ bundle config mirror.https://rubygems.org https://gems.ruby-china.org 