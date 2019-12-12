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




