几篇中文参考，加快部署
使用Github Pages建独立博客以及disqus评论系统 http://beiyuu.com/github-pages
jekyll站点列表 https://github.com/jekyll/jekyll/wiki/sites 
Creating and Hosting a Personal Site on GitHub

 http://jmcglone.com/guides/github-pages/
有个问题关于github仓库上 jekyll博客的目录结构
原来是把jekyll的源码直接推送上去就可以了。或者我理解错了，需要参考官方的部署教程。github page支持jekyll自动生成。 
_sites是通过 _post自动生成的，可以在本地预览。

默认的是jekyll当前目录为博客页面

- [github page](#github-page)
- [环境搭建](#%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA)
- [Basic Usage](#basic-usage)
- [jekyll help](#jekyll-help)
- [Quick-start guide](#quick-start-guide)
- [Directory structure](#directory-structure)
- [Configuration](#configuration)
    - [Global Configuration](#global-configuration)
    - [Build Command OptionsPermalink](#build-command-optionspermalink)
    - [Serve Command Options](#serve-command-options)
    - [Default Configuration](#default-configuration)
- [Front Matter 头信息](#front-matter-%E5%A4%B4%E4%BF%A1%E6%81%AF)
    - [Predefined Global Variables](#predefined-global-variables)
    - [Predefined Variables for Posts](#predefined-variables-for-posts)
- [Writing posts 写博客](#writing-posts-%E5%86%99%E5%8D%9A%E5%AE%A2)
    - [文章索引](#%E6%96%87%E7%AB%A0%E7%B4%A2%E5%BC%95)
    - [显示分类和标签下的文章](#%E6%98%BE%E7%A4%BA%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE%E4%B8%8B%E7%9A%84%E6%96%87%E7%AB%A0)
    - [典型文章内容结构](#%E5%85%B8%E5%9E%8B%E6%96%87%E7%AB%A0%E5%86%85%E5%AE%B9%E7%BB%93%E6%9E%84)
    - [文章摘要](#%E6%96%87%E7%AB%A0%E6%91%98%E8%A6%81)
    - [高亮代码片段](#%E9%AB%98%E4%BA%AE%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5)
- [Working with drafts 使用草稿](#working-with-drafts-%E4%BD%BF%E7%94%A8%E8%8D%89%E7%A8%BF)
- [Creating pages 创建页面](#creating-pages-%E5%88%9B%E5%BB%BA%E9%A1%B5%E9%9D%A2)
- [Static Files 静态文件](#static-files-%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6)
- [Variables 常用变量](#variables-%E5%B8%B8%E7%94%A8%E5%8F%98%E9%87%8F)
    - [全局(Global)变量](#%E5%85%A8%E5%B1%80global%E5%8F%98%E9%87%8F)
    - [Site Variables 全站(site)变量](#site-variables-%E5%85%A8%E7%AB%99site%E5%8F%98%E9%87%8F)
    - [Page Variables 页面(page)变量](#page-variables-%E9%A1%B5%E9%9D%A2page%E5%8F%98%E9%87%8F)
    - [Paginator  分页器(Paginator)](#paginator-%E5%88%86%E9%A1%B5%E5%99%A8paginator)
- [collections](#collections)
- [Data Files 数据文件](#data-files-%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)
- [博客迁移](#%E5%8D%9A%E5%AE%A2%E8%BF%81%E7%A7%BB)

github page部署，个人主页的master分支，项目主页的master分支的docs目录或gh-pages分支，或者master分支都可以在page选项设定，通过username.github.io/project 访问



# github page
README - 映射项目到子域名
index.html readme.md 首页
.gitignore git add时指定忽略的目录

# 环境搭建
Jekyll是基于ruby的，linux默认安装了ruby和gem。安装jekyll遇到一个错误，没有头文件。
```shell
sudo apt-get install ruby-dev
```
开始安装Jeykll
```shell
gem install jekyll bundler
```
运行jekyll new myblog的时候说找不到minima，jekyll-feed，安装。
```shell
gem install minima jekyll-feed
```
启动，在浏览器里打开localhost:4000就看到了主页
```shell
jekyll serve
```

创建新主题
```shell
$ jekyll new-theme my-theme
```

升级及检测
```
jekyll --version
gem list jekyll
bundle update jekyll
gem update jekyll
```

# Basic Usage
jekyll编译纯文本为html
```sh
jekyll build
# => The current folder will be generated into ./_site

jekyll build --destination <destination>
# => The current folder will be generated into <destination>

jekyll build --source <source> --destination <destination>
# => The <source> folder will be generated into <destination>

jekyll build --watch
# => The current folder will be generated into ./_site,
#    watched for changes, and regenerated automatically.
```
build子命令，默认构建当前目录的纯文本，html目录为_site，所以推送的时候把 _site推动到github上，或者纯文本为一个分支，编译文本为一个分支。

Jekyll also comes with a built-in development server that will allow you to preview what the generated site will look like in your browser locally.
内建的web服务，-d后台运行
```sh
jekyll serve
# => A development server will run at http://localhost:4000/
# Auto-regeneration: enabled. Use `--no-watch` to disable.

jekyll serve --detach
# => Same as `jekyll serve` but will detach from the current terminal.
#    If you need to kill the server, you can `kill -9 1234` where "1234" is the PID.
#    If you cannot find the PID, then do, `ps aux | grep jekyll` and kill the instance.

jekyll serve --no-watch
# => Same as `jekyll serve` but will not watch for changes.
```

The help command is always here to remind you of all available options and usage, and also works with the build, serve and new subcommands, e.g jekyll help new or jekyll help build. 


# jekyll help
```
jekyll 3.5.1 -- Jekyll is a blog-aware, static site generator in Ruby

Usage:

  jekyll <subcommand> [options]

Options:
        -s, --source [DIR]  Source directory (defaults to ./)
        -d, --destination [DIR]  Destination directory (defaults to ./_site)
            --safe         Safe mode (defaults to false)
        -p, --plugins PLUGINS_DIR1[,PLUGINS_DIR2[,...]]  Plugins directory (defaults to ./_plugins)
            --layouts DIR  Layouts directory (defaults to ./_layouts)
            --profile      Generate a Liquid rendering profile
        -h, --help         Show this message
        -v, --version      Print the name and version
        -t, --trace        Show the full backtrace when an error occurs

Subcommands:
  docs                  
  import                
  build, b              Build your site
  clean                 Clean the site (removes site output and metadata file) without building.
  doctor, hyde          Search site and print specific deprecation warnings
  help                  Show the help message, optionally for a given subcommand.
  new                   Creates a new Jekyll site scaffold in PATH
  new-theme             Creates a new Jekyll theme scaffold
  serve, server, s      Serve your site locally
```

# Quick-start guide
creating a new site with Jekyll
```
jekyll new <PATH>
jekyll new .
jekyll new . --force
```

jekyll new automatically initiates bundle install to install the dependencies required. (If you don’t want Bundler to install the gems, use `jekyll new myblog --skip-bundle`.)

We recommend setting up Jekyll with a gem-based theme but if you want to start with a blank slate, use `jekyll new myblog --blank`

# Directory structure
```
.
├── _config.yml
├── _data
|   └── members.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.md
|   └── on-simplicity-in-technology.md
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
|   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
|   ├── _base.scss
|   └── _layout.scss
├── _site
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid YAML Frontmatter
```
Directory structure of Jekyll sites using gem-based themes

This results in a lighter default directory structure : `_layouts`, `_includes` and `_sass` are stored in the theme-gem, by default. 

minima is the current default theme, and `bundle show minima` will show you where minima theme's files are stored on your computer. 

- _config.yml : Stores configuration data. 
- _drafts Drafts : are unpublished posts.
- _includes : These are the partials that can be mixed and matched by your layouts and posts to facilitate reuse. The liquid tag {% include file.ext %} can be used to include the partial in _includes/file.ext. 
- _layouts : These are the templates that wrap posts. Layouts are chosen on a post-by-post basis in the YAML Front Matter,
- _posts : Your dynamic content, so to speak. The naming convention of these files is important, and must follow the format: YEAR-MONTH-DAY-title.MARKUP. The permalinks can be customized for each post, but the date and markup language are determined solely by the file name. 
- _data : Well-formatted site data should be placed here. The Jekyll engine will autoload all data files (using either the .yml, .yaml, .json or .csv formats and extensions) in this directory, and they will be accessible via `site.data`.
- _sass : These are sass partials that can be imported into your main.scss which will then be processed into a single stylesheet main.css that defines the styles to be used by your site. 
- _site : his is where the generated site will be placed (by default) once Jekyll is done transforming it. It’s probably a good idea to add this to your .gitignore file. 
- .jekyll-metadata : This helps Jekyll keep track of which files have not been modified since the site was last built, and which files will need to be regenerated on the next build. This file will not be included in the generated site. It’s probably a good idea to add this to your .gitignore file. 
- index.html or index.md : Provided that the file has a YAML Front Matter section, it will be transformed by Jekyll. The same will happen for any .html, .markdown, .md, or .textile file in your site’s root directory or directories not listed above. 
- Other Files/Folders : Every other directory and file except for those listed above—such as css and images folders, favicon.ico files, and so forth—will be copied verbatim to the generated site. There are plenty of sites already using Jekyll if you’re curious to see how they’re laid out. 

# Configuration
The powerful and flexible configuration options that this is possible. These options can either be specified in a _config.yml file placed in your site’s root directory, or can be specified as flags for the jekyll executable in the terminal.

Creating and Hosting a Personal Site on GitHub http://jmcglone.com/guides/github-pages/
A step-by-step beginner's guide to creating a personal website and blog using Jekyll and hosting it for free using GitHub Pages.

## Global Configuration
|Setting|Options and Flags|
|---|---|
|Site Source|source: DIR  -s, --source DIR|
|Site Destination|destination: DIR  -d, --destination DIR|
|Include|include: [DIR, FILE, ...]|
|Exclude|exclude: [DIR, FILE, ...]|
|Keep files|keep_files: [DIR, FILE, ...]|
|Time Zone|timezone: Asia/Shanghai  PRC|
|Encoding|encoding: utf-8|
|Defaults|YAML Front Matter |

The contents of <destination> are automatically cleaned, by default, when the site is built. Files or folders that are not created by your site will be removed. Some files could be retained by specifying them within the <keep_files> configuration directive. 

## Build Command OptionsPermalink
```
Regeneration  -w, --[no-]watch
Enable auto-regeneration of the site when files are modified.

Configuration   --config FILE1[,FILE2,...]
Specify config files instead of using _config.yml automatically. Settings in later files override settings in earlier files.

Drafts    show_drafts: BOOL   --drafts
Process and render draft posts.

Environment   JEKYLL_ENV=production
Use a specific environment value in the build.

Future  future: BOOL  --future
Publish posts or collection documents with a future date.

Unpublished   unpublished: BOOL   --unpublished
Render posts that were marked as unpublished.

LSI   lsi: BOOL   --lsi
Produce an index for related posts. Requires the classifier-reborn plugin.

Limit Posts   limit\_posts: NUM  --limit_posts NUM
Limit the number of posts to parse and publish.

Force polling   --force_polling
Force watch to use polling.

Verbose output    -V, --verbose
Print verbose output.

Silence Output    -q, --quiet
Silence the normal output from Jekyll during a build

Incremental build   incremental: BOOL -I, --incremental
Enable the experimental incremental build feature. Incremental build only re-builds posts and pages that have changed, resulting in significant performance improvements for large sites, but may also break site generation in certain cases. 

Strict Front Matter   strict\_front_matter: BOOL     --strict_front_matter
Cause a build to fail if there is a YAML syntax error in a page's front matter. 
```

## Serve Command Options
```
Local Server Port   port: PORT    --port PORT
Listen on the given port.

Local Server Hostname     host: HOSTNAME    --host HOSTNAME
Listen at the given hostname.

Base URL    baseurl: URL    --baseurl URL
Serve the website from the given base URL

Detach    detach: BOOL    -B, --detach
Detach the server from the terminal

Skips the initial site build.   --skip-initial-build
Skips the initial site build which occurs before the server is started.

X.509 (SSL) Private Key   --ssl-key
SSL Private Key.

X.509 (SSL) Certificate   --ssl-cert
SSL Public certificate.
```

> Do not use tabs in configuration files.
> This will either lead to parsing errors, or Jekyll will revert to the default settings. Use spaces instead.

## Default Configuration
```
# Where things are
source:          .
destination:     ./_site
collections_dir: .
plugins_dir:     _plugins
layouts_dir:     _layouts
data_dir:        _data
includes_dir:    _includes
collections:
  posts:
    output:   true

# Handling Reading
safe:                 false
include:              [".htaccess"]
exclude:              ["Gemfile", "Gemfile.lock", "node_modules", "vendor/bundle/", "vendor/cache/", "vendor/gems/", "vendor/ruby/"]
keep_files:           [".git", ".svn"]
encoding:             "utf-8"
markdown_ext:         "markdown,mkdown,mkdn,mkd,md"
strict_front_matter: false

# Filtering Content
show_drafts: null
limit_posts: 0
future:      false
unpublished: false

# Plugins
whitelist: []
plugins:   []

# Conversion
markdown:    kramdown
highlighter: rouge
lsi:         false
excerpt_separator: "\n\n"
incremental: false

# Serving
detach:  false
port:    4000
host:    127.0.0.1
baseurl: "" # does not include hostname
show_dir_listing: false

# Outputting
permalink:     date
paginate_path: /page:num
timezone:      null

quiet:    false
verbose:  false
defaults: []

liquid:
  error_mode: warn

# Markdown Processors
rdiscount:
  extensions: []

redcarpet:
  extensions: []

kramdown:
  auto_ids:       true
  entity_output:  as_char
  toc_levels:     1..6
  smart_quotes:   lsquo,rsquo,ldquo,rdquo
  input:          GFM
  hard_wrap:      false
  footnote_nr:    1
```

With both fenced code blocks and highlighter enabled, this will statically highlight the code; without any syntax highlighter, it will add a class="LANGUAGE" attribute to the `<code>` element.


# Front Matter 头信息
Any file that contains a YAML front matter block will be processed by Jekyll as a special file. 

```
---
layout: post
title: Blogging Like a Hacker
---
```

Between these triple-dashed lines, you can set predefined variables (see below for a reference) or even create custom ones of your own. 

文件头部的 yaml 配置被称作 Front Matter。可以使用 defaults 设置一个路径下 Front Matter 默认值。
```yml
defaults:
  - scope:
      path: ""
      type: weekly
    values:
      layout: weekly
      title: 技术周刊
```

## Predefined Global Variables 
- layout ： If set, this specifies the layout file to use. Use the layout file name without the file extension. Layout files must be placed in the _layouts directory. 
- permalink : If you need your processed blog post URLs to be something other than the site-wide style (default /year/month/day/title.html), then you can set this variable and it will be used as the final URL. 
- published : Set to false if you don’t want a specific post to show up when the site is generated.  

## Predefined Variables for Posts
These are available out-of-the-box to be used in the front matter for a post.

- date ： A date here overrides the date from the name of the post. This can be used to ensure correct sorting of posts. A date is specified in the format YYYY-MM-DD HH:MM:SS +/-TTTT; hours, minutes, seconds, and timezone offset are optional. 
- category,categories : Instead of placing posts inside of folders, you can specify one or more categories that the post belongs to.
- tags : Similar to categories, one or multiple tags can be added to a post.


# Writing posts 写博客
**The Posts Folder**, As explained on the directory structure page, the _posts folder is where your blog posts will live. These files are generally Markdown or HTML.

默认目录 `_posts`

文件名格式：YEAR-MONTH-DAY-title.MARKUP

##包含图片和资源：新建assets文件夹，
```ruby
# 使用 absolute_url filter
![展示截图]({{ "/assets/screenshot.jpg" | absolute_url }})
[获取pdf文件]({{ "/assets/mydoc.pdf" | absolute_url }}) directly.
# 利用 site.url 变量
![有帮助的截图]({{ site.url }}/assets/screenshot.jpg)
你可以直接 [下载 PDF]({{ site.url }}/assets/mydoc.pdf).
```

模板语言 Liquid

## 文章索引
```html
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
```
请注意，post 变量仅在 for 循环中存在。如果你希望使用当前呈现的页面/博文中的变量（在 for 循环中的博文/页面的变量），请使用 page 变量来替代它。

## 显示分类和标签下的文章
在 _layouts 目录下新建 category.html
```
---
layout: page
---

{% for post in site.categories[page.category] %}
    <a href="{{ post.url | absolute_url }}">
      {{ post.title }}
    </a>
{% endfor %}
```
然后在根目录创建 category 目录，然后该目录下创建与分类对应的文件，如php分类：
```
文件 php.html
---
layout: category
title: php
category: php
---
```
这个分类目录的链接为：{baseurl}/category/php.html


## 典型文章内容结构
```markdown
---
layout: post
title:  "Welcome to Jekyll!"
date:   2015-11-17 16:16:01 -0600
categories: jekyll update
---

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `bundle exec jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.
```

## 文章摘要
Jekyll 会自动取每篇文章从开头到第一次出现 excerpt_separator 的地方作为文章的摘要，并将此内容保存到变量 post.excerpt 中。

拿上面生成文章列表的例子，你可能想在每个标题下给出文章内容的提示，你可以在每篇文章的第一段加上如下的代码：
```
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
```
关闭摘要设置excerpt_separator 为 ""

## 高亮代码片段
Jekyll 自带语法高亮功能，你可以选择使用 Pygments 或 Rouge 两种工具中的一种。在文章中插入一段高亮代码非常容易，只需使用下面的 Liquid 标记：
```ruby
{% highlight ruby %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}
```
你可以在代码片段中增加关键字 linenos 来显示行数。这样完整的高亮开始标记将会是: {% highlight ruby linenos %}。 

# Working with drafts 使用草稿
在网站根目录下创建一个名为 _drafts 的文件夹，并新建你的第一份草稿
```
|-- _drafts/
|   |-- a-draft-post.md
```
To preview your site with drafts, simply run jekyll serve or jekyll build with the --drafts switch. 

此两种方法皆会将该草稿的修改时间赋值给草稿文章，作为其发布日期，所以你将看到当前编辑的草稿文章作为最新文章被生成。

# Creating pages 创建页面
作为写文章的补充，Jekyll 还可以创建静态页面。

像任何网站的配置一样，需要按约定在站点的根目录下找到 index.html 文件，这个文件将被做为主页显示出来。除非你的站点设置了其它的文件作为默认文件，这个文件就将是你的 Jekyll 生成站点的主页。

一般来说，一个站点下通常会有：主页 (homepage), 关于 (about), 和一个联系 (contact) 页。

将为页面准备的命名好的 HTML 文件或者 Markdown 文件放在站点的根目录下。
```
.
|-- _config.yml
|-- _includes/
|-- _layouts/
|-- _posts/
|-- _site/
|-- about.html    # => http://example.com/about.html
|-- index.html    # => http://example.com/
|-- other.md      # => http://example.com/other.html
└── contact.html  # => http://example.com/contact.html
```

在站点的根目录下为每一个页面创建一个文件夹，并把 index.html 文件或者 index.md 放在每个文件夹里。
```
.
├── _config.yml
├── _includes/
├── _layouts/
├── _posts/
├── _site/
├── about/
|   └── index.html  # => http://example.com/about/
├── contact/
|   └── index.html  # => http://example.com/contact/
|── other/
|   └── index.md    # => http://example.com/other/
└── index.html      # => http://example.com/
```

使用头信息变量　permalink
干净的 URLs 也可以通过在头信息中定义　permalink　实现。就上边的第一个例子而言，在 other.md 文件的头信息中定义：permalink: /other，你就能得到 URL http://example.com/other
```
---
layout: page
title: other
permalink: other.html
permalink: /other
```

# Static Files 静态文件
除了用于渲染和转换的内容之外，我们还可以使用静态文件。静态文件不包含任何 YAML 头信息，譬如图片、PDF 和其他不必渲染的内容。

在 Liquid 中可以通过 site.static_files 访问.
- file.path   文件的相对路径，如：/assets/img/image.jpg
- file.modified_time  文件的最后修改时间，如：2016-04-01 16:35:26 +0200
- file.name   文件名称（带扩展名），如：文件image.jpg对应image.jpg
- file.basename   文件名称（不带扩展名） 如：文件image.jpg对应image
- file.extname    文件的扩展名，如 image.jpg 中的 .jpg

In your _config.yml file, add the following values to the defaults property:
```
defaults:
  - scope:
      path: "assets/img"
    values:
      image: true
```

列出assetts/img下所有图片
```
四格缩进在markdown会被视为代码块
{% assign image_files = site.static_files | where: "image", true %}
{% for myImage in image_files %}
<img src="{{ myImage.path }}">
{% endfor  %}
```

# Variables 常用变量 
Jekyll 会遍历你的网站搜寻要处理的文件。任何有 YAML 头信息的文件都是要处理的对象。对于每一个这样的文件，Jekyll 都会通过 Liquid 模板工具来生成一系列的数据。

## 全局(Global)变量
- site 来自_config.yml文件，全站范围的信息+配置。
- page  页面专属的信息 + YAML 头文件信息。通过 YAML 头文件自定义的信息都可以在这里被获取。
- layout  Layout specific information + the YAML front matter. 
- content   被 layout 包裹的那些 Post 或者 Page 渲染生成的内容。但是又没定义在 Post 或者 Page 文件中的变量。 
- paginator   每当 paginate 配置选项被设置了的时候，这个变量就可用了。

## Site Variables 全站(site)变量
- site.time   当前时间（运行jekyll这个命令的时间点）。 
- site.pages  所有 Pages 的清单。 
- site.posts  一个按照时间倒序的所有 Posts 的清单。 
- site.related_posts    如果当前被处理的页面是一个 Post，这个变量就会包含最多10个相关的 Post。默认的情况下，相关性是低质量的，但是能被很快的计算出来。如果你需要高相关性，就要消耗更多的时间来计算。用 jekyll 这个命令带上 --lsi (latent semantic indexing) 选项来计算高相关性的 Post。注意，GitHub 在生成站点时不支持　lsi。 
- site.static\_files   静态文件的列表 (此外的文件不会被 Jekyll 和 Liquid 处理。)。每个文件都具有三个属性： path， modified_time 以及 extname。 
- site.html_pages   ‘site.pages’的子集，存储以‘.html’结尾的部分。 
- site.html\_files   	‘site.static_files’的子集，存储以‘.html’结尾的部分。 
- site.collections    一个所有集合（collection）的清单。 
- site.data   一个存储了 _data 目录下的YAML文件数据的清单。 
- site.documents     	每一个集合（collection）中的全部文件的清单。 
- site.categories.CATEGORY    所有的在 CATEGORY 类别下的帖子。 
- site.tags.TAG    	所有的在 TAG 标签下的帖子。 
- site.[CONFIGURATION_DATA]   所有的通过命令行和 _config.yml 设置的变量都会存到这个 site 里面。 举例来说，如果你设置了 url: http://mysite.com 在你的配置文件中，那么在你的 Posts 和 Pages 里面，这个变量就被存储在了 site.url。Jekyll 并不会把对 _config.yml 做的改动放到 watch 模式，所以你每次都要重启 Jekyll 来让你的变动生效。

## Page Variables 页面(page)变量
- page.content  页面内容的源码。 
- page.title  页面的标题。
- page.excerpt   	页面摘要的源码。 
- page.url  帖子以斜线打头的相对路径，例子： /2008/12/14/my-post.html。
- page.date   帖子的日期。日期的可以在帖子的头信息中通过用以下格式 YYYY-MM-DD HH:MM:SS (假设是 UTC), 或者 YYYY-MM-DD HH:MM:SS +/-TTTT ( 用于声明不同于 UTC 的时区， 比如 2008-12-14 10:30:00 +0900) 来显示声明其他 日期/时间 的方式被改写， 
- page.id   帖子的唯一标识码（在RSS源里非常有用），比如 /2008/12/14/my-post
- page.categories   这个帖子所属的 Categories。Categories 是从这个帖子的 \_posts 以上 的目录结构中提取的。举例来说, 一个在 /work/code/_posts/2008-12-24-closures.md 目录下的 Post，这个属性就会被设置成 ['work', 'code']。不过 Categories 也能在 YAML 头文件信息 中被设置。 
- page.tags   这个 Post 所属的所有 tags。Tags 是在YAML 头文件信息中被定义的。 
- page.path   Post 或者 Page 的源文件地址。举例来说，一个页面在 GitHub 上的源文件地址。
- page.next   当前文章在site.posts中的位置对应的下一篇文章。若当前文章为最后一篇文章，返回nil
- page.previous    	当前文章在site.posts中的位置对应的上一篇文章。若当前文章为第一篇文章，返回nil 

使用自定义的头信息

任何你自定义的头文件信息都会在 page 中可用。 举例来说，如果你在一个 Page 的头文件中设置了 custom\_css: true， 这个变量就可以这样被取到 page.custom_css。

If you specify front matter in a layout, access that via layout. For example, if you specify class: full_page in a page’s front matter, that value will be available as layout.class in the layout and its parents. 

## Paginator  分页器(Paginator)
- paginator.per_page    Number of Posts per page.
- paginator.posts   这一页可用的 Posts。
- paginator.total_posts Posts 的总数。
- paginator.total_pages    	Pages 的总数。
- paginator.page     	当前页号
- paginator.previous_page   前一页的页号
- paginator.previous\_page_path  前一页的地址
- paginator.next_page   下一页的页号
- paginator.next\_page_path   下一页的地址

分页器变量的可用性，这些变量仅在首页文件中可用，不过他们也会存在于子目录中，就像 /blog/index.html。

# collections
https://alligator.io/jekyll/collections/
https://www.sitepoint.com/getting-started-jekyll-collections/
https://ben.balter.com/2015/02/20/jekyll-collections/

并非所有的都会是文章或页面。也许您想要记录您开源项目中涉及的各种解决方案，团队成员，或是某次会议记录。集合（Collection）允许您定义一种新的文档类型，它既可以像页面和文章那样工作，也可以拥有它们特有的属性和命名空间。

第一步：让 Jekyll 读取您的集合
修改 _config.yml 文件，加入集合，加入具体的元数据
```yml
# 集合
collections:
- my_collection
# 加入元数据
collections:
  my_collection:
    foo: bar
```

第二步：加入您的内容
创建对应的文件夹（如 <source>/_my_collection）并添加文件。若 YAML 头信息存在，他将被作为数据读入，并且其后的任何信息都将被保存在文档的content 属性中。如果没有任何 YAML 头信息存在， Jekyll 将不会在您的集合中生成任何文件。

文件夹名称必须和你在\_config.yml中定义的集合名称完全一致，包括前缀的_字符

第三步：选择性渲染你的集合文件为独立文件
如果你希望 Jekyll 对每一个你集合中的文件，都创建一个公开的，渲染后的版本，请在_config.yml中，将你集合的元数据中将output键设置为true：
```yml
collections:
  my_collection:
    output: true
    # 设置了 Permalinks 属性   
    permalink: /awesome/:path/
```
```html
{% for item in site.my_collection %}
  <h2>{{ item.title }}</h2>
  <p>{{ item.description }}</p>
  <p><a href="{{ item.url }}">{{ item.title }}</a></p>
{% endfor %}
```

不要忘记添加 YAML 头，没有头信息的文件将被视为静态文件，它们仅会被简单拷贝到目的路径下，而不会被处理。

集合变量
- collection    所包含集合的标签
- path    文档相对于集合文件夹的路径
- name    文档的基本文件名，任何空格和非字母数字的字符将被替换为连字符
- title   文档的小写字母标题（在 头信息中定义），任何空格和非字母数字的字符将被替换为连字符。如果title在头信息中未定义，该值等同于name。
- output_ext  输出文件的文件扩展名

> 并不是每个页面都是独立“页面”和以日期为顺序的“博文”，因此 Jekyll 引入了 Collection。Collection 可以根据路径定义一类具有相同属性的页面集合。Collection 也可以通过 Front Matter 设定默认值。

集合是页面的集合吗？

# Data Files 数据文件
除了 Jekyll 的内建变量之外，你还可以指定用于 Liquid 模板系统 的自定义数据。
Jekyll 支持从 _data 目录下的 YAML、JSON 和 CSV 载入数据，注意 CSV 文件必须包含表头行。

插件和主题也可以通过数据文件来配置变量。

数据目录 _data 用于存储供 Jekyll 生成网站的附加数据。这些文件可以使用 .yml、.yaml、.json、csv 扩展名，并可通过 site.data 访问。

Data 相当于动态页面中的数据库，Jekyll Data 支持 yaml, json, CSV 三种格式，可以通过 site.data 直接访问。

团队成员有 Fa, Li, Zhang 三人，于是我们在默认路径 _data 创建一个数据文件 member.yml
```yml
- name: Fa
- name: Li
- name: Zhang
```
```html
{% for member in site.data.member %}
<ul>
  <li>{{ member.name }}</li>
</ul>
{% endfor %}
```

# 博客迁移
jekyll提供了import jekyll工具，可以快速的从其他博客系统迁移到jekyll下。

Most methods listed on this page require read access to the database from your old system to generate posts for Jekyll. Each method generates .markdown posts in the _posts directory based on the entries in the foreign system.

Install : `$ gem install jekyll-import`
Usage : 
```sh
$ ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::MyImporter.run({
      # options for this importer
    })'
```
Where MyImporter is the name of the specific importer.

支持迁移的博客 WordPress, Tumblr, CSV, Blogger

http://import.jekyllrb.com/
