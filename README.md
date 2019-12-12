# iconfont 批量添加购物车chrome插件

## 起因

iconfont非常好用，但是如果要批量的添加icon到自己的购物车简直就是噩梦，一个一个点击太扯蛋，只有自己想办法了。

## 思路

打开列表详情页，例如[随便一个包](https://www.iconfont.cn/collections/detail?&cid=19238, "随便一个包"), 右键-> 开发者工具 -> console
运行如下代码,选取所有icon下的购物车按钮，触发点击。

```
document.querySelectorAll('.icon-gouwuche1').forEach(item=>item.click());
```

这里iconfont网站有个bug，超过一定数量（MACPRO chrome 400+）的icon添加到购物车后，点击下载就会报错。所以建议还是够用就好，没有必要选那种太多的包。
因为一次性出发了好多click的事件，而且是异步非阻塞并行触发，有可能会造成浏览器短暂的无响应，不用担心，最多一分钟就恢复。

## 转化成chrome插件

给小白准备，也是自己简化操作和学习chrome插件的开发

本插件就做了一个事情，只在https://www.iconfont.cn/collections/detail?* 网站模式下生效。在中部的主要功能区按钮区添加一个批量添加按钮

github上传的图片显示不出来，只能用blog上传的图片进行引用了。

添加前
![ORIGINAL](https://images.cnblogs.com/cnblogs_com/jingyingggong/1611724/o_Screen%20Shot%202019-12-12%20at%209.45.59%20AM.png, "NO BATCH")

添加后
![BATCH](https://images.cnblogs.com/cnblogs_com/jingyingggong/1611724/o_Screen%20Shot%202019-12-12%20at%209.49.08%20AM.png, "NO BATCH")

给全选按钮添加click相应事件，同上console内容。

## 技术实现 

manifest.json

```
{
  "name": "iconFontBatchCollector",
  ....
  "content_scripts": [{
    "matches": ["https://www.iconfont.cn/collections/detail*", "https://www.iconfont.cn/collections/detail*"],
    "js": ["scripts/collect.js"],
    "run_at": "document_end"
  }]
}
```

`matches` 实现了特定域名+路径下生效的限制

`js` 是表示真实要运行js引用。

`run_at` 页面加载完再运行。

collect.js

```
(function(){
  var timeout = null;
  function init() {
    var bar = document.querySelector(".block-bar-right .block-radius-btn-group");
    if(!bar) {
      tryToDetect();
      return;
    } else {
      clearTimeout(timeout);
    }

    var btn = document.createElement('span');
    btn.className = 'radius-btn radius-btn-like';
    btn.title = "全选";
    btn.style.backgroundColor="mediumpurple";
    btn.innerHTML = `<svg class="icon" style="width: 0.6em; height: 0.6em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35710"><path d="M102.4 302.08c5.12 5.12 15.36 10.24 25.6 10.24s15.36-5.12 25.6-10.24l174.08-174.08c5.12-5.12 10.24-15.36 10.24-25.6s-5.12-15.36-10.24-25.6c-20.48-5.12-40.96-5.12-51.2 10.24l-148.48 153.6-71.68-76.8C51.2 158.72 40.96 158.72 35.84 158.72c-10.24 0-15.36 5.12-25.6 10.24-5.12 5.12-10.24 10.24-10.24 20.48s5.12 15.36 10.24 25.6L102.4 302.08zM276.48 409.6l-148.48 153.6-71.68-71.68C51.2 486.4 40.96 481.28 35.84 481.28c-10.24 0-15.36 5.12-25.6 10.24-5.12 10.24-10.24 15.36-10.24 25.6s5.12 15.36 10.24 25.6L102.4 629.76c5.12 5.12 15.36 10.24 25.6 10.24s15.36-5.12 25.6-10.24L322.56 460.8c5.12-5.12 10.24-15.36 10.24-25.6s-5.12-15.36-10.24-25.6c-10.24-10.24-30.72-10.24-46.08 0z m0 327.68l-148.48 153.6L56.32 819.2c-5.12-5.12-15.36-10.24-25.6-10.24s-15.36 5.12-25.6 10.24c0 5.12-5.12 15.36-5.12 25.6s5.12 15.36 10.24 25.6L102.4 957.44c5.12 5.12 15.36 10.24 25.6 10.24h5.12c10.24 0 15.36-5.12 25.6-10.24l174.08-174.08c5.12-5.12 10.24-15.36 10.24-25.6s-5.12-15.36-10.24-25.6c-25.6-5.12-40.96-5.12-56.32 5.12zM1024 153.6c0 30.72-25.6 56.32-56.32 56.32h-460.8c-30.72 0-61.44-25.6-61.44-56.32 0-30.72 25.6-56.32 56.32-56.32h455.68c35.84-5.12 66.56 20.48 66.56 56.32z m0 358.4c0 30.72-25.6 56.32-56.32 56.32h-460.8c-30.72 0-56.32-25.6-56.32-56.32s25.6-56.32 56.32-56.32h455.68c35.84 0 61.44 25.6 61.44 56.32z m-5.12 358.4c0 30.72-25.6 56.32-56.32 56.32h-460.8c-30.72 0-56.32-25.6-56.32-56.32 0-30.72 25.6-56.32 56.32-56.32h455.68c35.84 0 61.44 25.6 61.44 56.32z m0 0" fill="#ffffff" p-id="LoganGongPlugin"></path></svg>`;
    btn.addEventListener('click', function(){
      document.querySelectorAll('.icon-gouwuche1').forEach(item=>item.click());
    }, false);

    bar.appendChild(btn);
  }
  function tryToDetect() {
    timeout = setTimeout(init, 1000);
  }

  tryToDetect();

})();

```

基本思路：

1. 闭包保持变量不会和页面变量冲突。

2. timeout 递归调用检查页面按钮元素是否加载完，因为那块内容是异步加载的，所以只能不断检测。

3. 动态添加一个按钮到功能按钮区。

4. 为全选按钮添加全选逻辑。
