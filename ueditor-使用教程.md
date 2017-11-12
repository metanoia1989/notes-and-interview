百度编辑器，学PHP教的就是这个，当时只教怎么显示出来，具体的定制以及修改全部要自己看文档。其实如果能自行定制和修改，何必要人家教显示呢？

# grunt打包源代码
随着 nodejs 和 grunt 的火爆，UEditor 采用了 grunt 来作为线下的合并打包工具，支持编码和后台语言指定。

1. 下载　[ueditor](http://ueditor.baidu.com/website/download.html#ueditor)　完整版源码
2. 下载 nodejs 并安装到本地）
3. 进入ueditor源码根目录，执行  `npm install`
- 这个命令会根据 package.json 文件，安装打包需要的 grunt 和 grunt 插件
- 安装结束后，会在ueditor目录下出现一个 node_modules 文件夹
4. 执行打包命令 进入ueditor源码根目录，执行 `grunt`
- 这个命令会根据Gruntfile.js执行打包打包的任务，运行过程 需要java环境 支持
- 命令完成后，ueditor目录下会出现dist/目录，里面有你要的打包好的ueditor文件夹，默认是utf8-php文件夹

执行打包grunt命令时，可以传入编码和后台语言的参数
--encode utf8 (默认编码) gbk
--server php (默认语言) jsp net (代表.net后台) asp

# UEditor创建编辑区域的原理
因为UEditor的编辑区域是使用iframe作为编辑容器的。所以当编辑器创建实例后，先会创建一个iframe元素，然后在iframe元素中写入一些脚本，这些脚本会在iframe元素初始化完成时被调用。脚本的作用主要是为编辑器实例赋值iframe中的body,window,document对象的引用。 看到这里，大家就应该明白UEditor的初始化过程其实是个异步过程。

因为是个异步过程。所以场景中的书写方式就会出现问题了。虽然工厂方法getEditor能正确返回编辑器实例，但同步的代码ue.setContent马上就被执行了，因为setContent是在编辑容器中写内容，这时需要用到body,document等元素，但这些元素的引用赋值却在异步中才做的赋值。所以才会出现直接执行setContent时会出现无效的问题。当然有时不同浏览器的效果会出现不同。一些高级的浏览器比如chrome有时是可以的，但大部分ie浏览器都不行。这主要是因为浏览器的性能所致的。

UEditor为开发者提供了ready接口，他会在编辑器所有的初始化操作都结束时调用。保证你要做的操作能在一个完整的初始化环境中执行。
```js
UE.getEditor('editor').ready(function() {
    //this是当前创建的编辑器实例
    this.setContent('内容')
})
```

因为用的是ifrmae框架，所以嵌入的css，只能在iframe里嵌入才有效果。

# 初步使用
```html
<form action="server.php" method="post">
    <!-- 加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
        这里写你的初始化内容
    </script>
</form>
<!-- 配置文件 -->
<script type="text/javascript" src="ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="ueditor.all.js"></script>
<!-- 实例化编辑器 -->
<script type="text/javascript">
    var ue = UE.getEditor('container');
</script>
```

## 传入自定义的参数
编辑器有很多可自定义的参数项，在实例化的时候可以传入给编辑器
配置项也可以通过 ueditor.config.js 文件修改
```js
var ue = UE.getEditor('container', {
    autoHeight: false
});
```

有用的配置参数
- toolbars  {2d Array}  工具栏上的所有的功能按钮和下拉框
- theme {String} 主题配置项
- isShow  {Boolean} 默认显示编辑器
- focus {Boolean} 初始化时，是否让编辑器获得焦点true或false
- iframeCssUrl {Path String}  [默认值：URL + '/themes/iframe.css']  给编辑器内部引入一个css文件
- indentValue {String}  首行缩进距离，默认是2em
- initialFrameWidth {Number} 初始化编辑器宽度，默认1000
- initialFrameHeight {Number} 初始化编辑器高度，默认320
- readonly {Boolean} 编辑器初始化结束后，编辑区域是否是只读的，默认是false
- enableAutoSave {Boolean} 启用自动保存
- saveInterval {Number} 自动保存间隔时间，单位ms, 默认值：500
- retainOnlyLabelPasted {Boolean} 粘贴只保留标签，去除标签所有属性, 默认值：false
- pasteplain {Boolean} 是否默认为纯文本粘贴
- filterTxtRules {Object} 纯文本粘贴模式下的过滤规则
- rowspacingtop {Array} 段间距 
- lineheight 行内间距
- enableContextMenu {Boolean} 打开右键菜单功能
- contextMenu {Object} 右键菜单的内容
- customstyle [Array]  自定义样式，不支持国际化
- wordCount {Boolean} 是否开启字数统计
- maximumWords {Number} 允许的最大字符数 默认值：10000
- wordCountMsg {String} 字数统计提示 {#count}代表当前字数，{#leave}代表还可以输入多少字符数
- wordOverFlowMsg {String} 超出字数限制提示
- autoHeightEnabled {Boolean} 是否自动长高
- scaleEnabled {Boolean} 是否可以拉伸长高，默认true
- autotypeset {Object} 自动排版参数


## 读取配置项
读取配置项可以通过getOpt方法读取
```js
var lang = ue.getOpt('lang'); //默认返回：zh-cn
```

配置文件在ueditor.config.js 中，有详细清楚的注释

## 设置和读取编辑器的内容
通 getContent 和 setContent 方法可以设置和读取编辑器的内容
```js
var ue = UE.getContent();
//对编辑器的操作最好在编辑器ready之后再做
ue.ready(function() {
    //设置编辑器的内容
    ue.setContent('hello');
    //获取html内容，返回: <p>hello</p>
    var html = ue.getContent();
    //获取纯文本内容，返回: hello
    var txt = ue.getContentTxt();
});
```

# 定制工具栏图标
UEditor 工具栏上的按钮列表可以自定义配置. 
方法一：修改 ueditor.config.js 里面的 toolbars
方法二：实例化编辑器的时候传入 toolbars 参数 
```js
var ue = UE.getEditor('container');
```

简单列表
```js
toolbars: [
    ['fullscreen', 'source', 'undo', 'redo', 'bold']
]
```

多行列表
```js
toolbars: [
    ['fullscreen', 'source', 'undo', 'redo'],
    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
]
```

工具栏按钮分割线
配置项里用竖线 '|' 代表分割线

完整的按钮列表
```js
toolbars: [
    [
        'anchor', //锚点
        'undo', //撤销
        'redo', //重做
        'bold', //加粗
        'indent', //首行缩进
        'snapscreen', //截图
        'italic', //斜体
        'underline', //下划线
        'strikethrough', //删除线
        'subscript', //下标
        'fontborder', //字符边框
        'superscript', //上标
        'formatmatch', //格式刷
        'source', //源代码
        'blockquote', //引用
        'pasteplain', //纯文本粘贴模式
        'selectall', //全选
        'print', //打印
        'preview', //预览
        'horizontal', //分隔线
        'removeformat', //清除格式
        'time', //时间
        'date', //日期
        'unlink', //取消链接
        'insertrow', //前插入行
        'insertcol', //前插入列
        'mergeright', //右合并单元格
        'mergedown', //下合并单元格
        'deleterow', //删除行
        'deletecol', //删除列
        'splittorows', //拆分成行
        'splittocols', //拆分成列
        'splittocells', //完全拆分单元格
        'deletecaption', //删除表格标题
        'inserttitle', //插入标题
        'mergecells', //合并多个单元格
        'deletetable', //删除表格
        'cleardoc', //清空文档
        'insertparagraphbeforetable', //"表格前插入行"
        'insertcode', //代码语言
        'fontfamily', //字体
        'fontsize', //字号
        'paragraph', //段落格式
        'simpleupload', //单图上传
        'insertimage', //多图上传
        'edittable', //表格属性
        'edittd', //单元格属性
        'link', //超链接
        'emotion', //表情
        'spechars', //特殊字符
        'searchreplace', //查询替换
        'map', //Baidu地图
        'gmap', //Google地图
        'insertvideo', //视频
        'help', //帮助
        'justifyleft', //居左对齐
        'justifyright', //居右对齐
        'justifycenter', //居中对齐
        'justifyjustify', //两端对齐
        'forecolor', //字体颜色
        'backcolor', //背景色
        'insertorderedlist', //有序列表
        'insertunorderedlist', //无序列表
        'fullscreen', //全屏
        'directionalityltr', //从左向右输入
        'directionalityrtl', //从右向左输入
        'rowspacingtop', //段前距
        'rowspacingbottom', //段后距
        'pagebreak', //分页
        'insertframe', //插入Iframe
        'imagenone', //默认
        'imageleft', //左浮动
        'imageright', //右浮动
        'attachment', //附件
        'imagecenter', //居中
        'wordimage', //图片转存
        'lineheight', //行间距
        'edittip ', //编辑提示
        'customstyle', //自定义标题
        'autotypeset', //自动排版
        'webapp', //百度应用
        'touppercase', //字母大写
        'tolowercase', //字母小写
        'background', //背景
        'template', //模板
        'scrawl', //涂鸦
        'music', //音乐
        'inserttable', //插入表格
        'drafts', // 从草稿箱加载
        'charts', // 图表
    ]
]
```

# 目录说明
## 部署包目录说明
- dialogs: 弹出对话框对应的资源和JS文件
- lang: 编辑器国际化显示的文件
- php或jsp或asp或net: 涉及到服务器端操作的后台文件
- themes: 样式图片和样式文件
- third-party: 第三方插件(包括代码高亮，源码编辑等组件）
- ueditor.all.js: 开发版代码合并的结果,目录下所有文件的打包文件
- ueditor.all.min.js: ueditor.all.js文件的压缩版，建议在正式部署时采用
- ueditor.config.js: 编辑器的配置文件，建议和编辑器实例化页面置于同一目录
- ueditor.parse.js: 编辑的内容显示页面引用，会自动加载表格、列表、代码高亮等样式,具体看内容展示文档
- ueditor.parse.min.js: ueditor.parse.js文件的压缩版，建议在内容展示页正式部署时采用

## 源码包目录说明
- _doc: 部分markdown格式的文档
- _example: ueditor的使用例子
- _parse: ueditor.parse.js的源码,parse的用途具体看内容展示文档
- _src: ueditor.all.js的源码,打包方法看grunt打包文档
    - _src\core: ueditor核心代码
    - _src\plugins: 插件文件
    - _src\ui: ui相关文件
    - _src\adapter: 桥接层文件,对接ueditor核心和ui代码
- php: php后台文件的目录
    - php\config.json: 后端配置文件,所有前后端相关配置项,都放在这里
    - php\controller.php: 接收所有请求的接口文件,通过它判断action参数,分发具体任务给其他php文件
    - php\action_crawler: 撞去远程文件的代码,转存文件使用
    - php\action_upload: 上传图片、附件、视频的处理代码
    - php\action_list: 列出在线的图片或者是附件
    - php\Upload.class.php: 上传文件使用的类
- changelog.md: 各版本的ueditor更新记录
- Gruntfile.js: grunt执行的任务文件,用来把源码包打包成部署版本,打包方法看grunt打包文档
- LICENSE: 开源协议说明证书,ueditor使用MIT开源协议
- ueditor.config.js: 前端配置文件
- ueditor.parse.js: 还没合并时使用的parse文件,会自动加载_parse里面的文件

# 编辑内容展示
随着编辑器产出内容的增加和复杂化，比如图表展示，代码高亮，自定义的列表标号等等，如果都在最终产出的编辑数据中处理，那势必会导致产出数据带有冗余内容，而且也很大程度上硬编码了展示时定制效果。基于这些问题，uparse产生了。

uparse 基于js的实现机制，在展示页面中，对 UEditor 的产出的编辑数据，进行解析和转换，以呈现不同的效果。为后边的多端（移动端和pc端）展示打下基础。

uparse 它会根据内容展示内容，动态的在你的展示页中加入css代码,比如你的编辑数据中有表格，那就会加入一些表格的css样式,如果有图表数据，会调用相关的js插件，解析数据成为图表等。

1. 在下载包中找到ueditor.parse.js或者uparse.js. 完整版本的包中，ueditor.parse.js是没有打包编译的，需要进行编译。从1.3.5开始，uparse做了重构，将原来的一个文件拆解成了多个插件形式的js,为了适应越来越多的功能需求。
parse.js是核心文件，定了插件的管理机制和一些快捷方法。

其他文件代表的一种数据解析功能，比如insertcode.js是针对的数据里边的代码进行展示时的解析等等。

uparse是需要依赖ueditor项目中的third-party中相关的第三方库的。
2. 根据你的路径加载uparse.js
```html
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <script src="../ueditor.parse.js"></script>
    <title></title>
</head>
```
3. 当加载了uparse.js后，就可以调用uParse这个函数，执行内容解析了。
cssSelector 告诉uParse将编辑数据放到的容器，支持3种格式,tag,id,class，options是个json对象。
```js
//uParse的语法
uParse(cssSelector,[options])
//options
{
    rootPath: '', //ueditor所在的路径，这个要给出，让uparse能找到third-party目录
    //因为需要引入目录下的那些js文件，当然会根据你的编辑数据，按需加载
    liiconpath: 'http://bs.baidu.com/listicon/', //自定义列表标号图片的地址，默认是这个地址
    listDefaultPaddingLeft: '20' //自定义列表标号与文字的横向间距
}
//一般只要给个rootPath就够了，其他的都可以使用默认值
uParse('.content', {
    rootPath: '../'
})
```
```html
<div id="content">
    <p>dsfsdF</p>
    <p>sdsdf</p>
</div>
```
使用uparse来解析展示页中的数据的，当然你也可以给出自己针对某些标签的自定义样式，这个跟uparse是不冲突的.随着可编辑内容的丰富和复杂，展示数据也会变得越来越复杂和难以维护，而且多端展示的需求也越来越强烈。展现数据会变得需要做更多的事情。

这个是解析处理页面内容，方便再显示。

# 后端部署说明
## 配置 serverUrl 参数
UEditor 1.4.2+ 起，推荐使用统一的请求路径，在你部署好前端代码后，你需要修改 ueditor.config.js 里的 serverUrl 参数，改成 URL + 'php/controller.php'

iframe中所有的表单用的都是这个地址来处理的
```html
<form id="edui_form_j9whjf9b" target="edui_iframe_j9whjf9b" method="POST" enctype="multipart/form-data" action="http://h5.metanoia.com/ueditor-utf8-php/php/controller.php" ><input id="edui_input_j9whjf9b" type="file" accept="image/*" name="upfile" 
```

## 检查是否正常加载后台配置项
UEditor 1.4.2+ 起，把前后端相关的配置项都放到后端文件 php/config.json 设置，初始化时会向 serverUrl 发起获取后端配置的请求。
你可以测试你的网站下的路径 ueditor/php/controller.php?action=config 是否正常返回了json格式的后端配置内容。
如果这个请求出错，出现400、500等错误，编辑器上传相关的功能将不能正常使用。

## 检查上传目录是否可读写
php 版本的默认上传目录是域名根目录下的 ueditor/php/upload 文件夹，你需要检查这个文件夹是否可被 php 代码读写。
部分服务器会限制不允许读写超出当前 php 文件所在目录的文件，这种情况需要修改上传路径 imagePathFormat 等，修改位置在 php/config.json 目录下。

## 上传文件大小限制
上传大小配置可通过 php/config.json 文件，里面的 imageMaxSize 参数值（单位为B），控制上传文件大小。当上传超出了大小会向前端包“超出大小”的错误。
由于前端可以拿到后端配置项，也可以判断文件大小，在上传之前就可以控制超出大小的文件，并提示错误信息。
php 服务器需要修改 php.ini 里面的上传大小限制和post表单大小限制。

## 上传文件格式控制
上传文件后缀类型限制，可通过 php/config.json 文件，里面的 imageAllowFiles 参数值，控制上传文件后缀。当上传了不在列表里的后缀名文件，会向前端报 “文件格式不允许” 的错误。

## 给返回路径的添加前缀
通过在 php/config.json 文件，配置 imageUrlPrefix 可以给返回的路径添加指定的前缀。

编辑器和图片地址同域的情况下，可以直接使用后台返回的路径，不需要额外配置前缀。

假如编辑器和图片不在一个域名下，需要给返回路径添加域名前缀，可以设置 imageUrlPrefix 配置项为 "http://img.domain"，这时插入编辑器的图片会是这样：`"http://img.domain/ueditor/php/upload/2014/06/06/123.jpg"`

# 后端配置项说明
前后端的配置统一写在后端(PHP版本的config在php/config.json)，编辑器实例化时，异步读取后端配置信息，覆盖到前端的配置里。

配置优先级: 后端获取的配置项 > 实例化传入的配置项 > ueditor.config.js文件的配置项

读取配置项: `var lang = ue.getOpt('lang');`

实例化的ue对象上有以下几个方法:
- [方法]：loadServerConfig 执行这个方法，会向后端请求config
- [方法]：isServerConfigLoaded 判断是否已加载后端config
- [方法]：afterConfigReady 加载后端配置项结束后会执行回调函数，假如已加载，立即执行该回调函数
- [事件]：serverConfigLoaded 加载后端配置项结束后，会触发这个事件

## 上传图片配置项
- imageActionName {String} [默认值："uploadimage"] //执行上传图片的action名称,
- imageFieldName {String} [默认值："upfile"] //提交的图片表单名称
- imageMaxSize {Number} [默认值：2048000] //上传大小限制，单位B
- imageAllowFiles {String} , //上传图片格式显示
- imageCompressEnable {Boolean} [默认值：true] //是否压缩图片,默认是true
- imageCompressBorder {Number} [默认值：1600] //图片压缩最长边限制
- imageInsertAlign {String} [默认值："none"] //插入的图片浮动方式
- imageUrlPrefix {String} [默认值：""] //图片访问路径前缀
- imagePathFormat {String} [默认值："/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"] //上传保存路径,可以自定义保存路径和文件名格式

## 上传文件配置
- fileActionName {String} [默认值："uploadfile"] //controller里,执行上传视频的action名称
- fileFieldName {String} [默认值："upfile"] //提交的文件表单名称
- filePathFormat {String} [默认值："/ueditor/php/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}"] //上传保存路径,可以自定义保存路径和文件名格式，上传路径配置
- fileUrlPrefix {String} [默认值：""] //文件访问路径前缀
- fileMaxSize {Number} [默认值：51200000] //上传大小限制，单位B，默认50MB，注意修改服务器的大小限制
- fileAllowFiles {Array}, //上传文件格式显示

## 上传视频配置
- videoActionName {String} [默认值："uploadvideo"] //执行上传视频的action名称
- videoFieldName {String} [默认值："upfile"] //提交的视频表单名称
- videoPathFormat {String} [默认值："/ueditor/php/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}"] //上传保存路径,可以自定义保存路径和文件名格式，上传路径配置
- videoUrlPrefix {String} [默认值：""] //视频访问路径前缀
- videoMaxSize {Number} [默认值：102400000] //上传大小限制，单位B，默认100MB，注意修改服务器的大小限制
- videoAllowFiles {Array}, //上传视频格式显示

## 列出指定目录下的图片
- imageManagerActionName {String} [默认值："listimage"] //执行图片管理的action名称
- imageManagerListPath {String} [默认值："/ueditor/php/upload/image/"] //指定要列出图片的目录
- imageManagerListSize {String} [默认值：20] //每次列出文件数量
- imageManagerUrlPrefix {String} [默认值：""] //图片访问路径前缀
- imageManagerInsertAlign {String} [默认值："none"] //插入的图片浮动方式
- imageManagerAllowFiles {Array}, //列出的文件类型

## 列出指定目录下的文件
- fileManagerActionName {String} [默认值："listfile"] //执行文件管理的action名称
- fileManagerListPath {String} [默认值："/ueditor/php/upload/file/"] //指定要列出文件的目录
- fileManagerUrlPrefix {String} [默认值：""] //文件访问路径前缀
- fileManagerListSize {String} [默认值：20] //每次列出文件数量
- fileManagerAllowFiles {Array} //列出的文件类型