# 基于jq和css3多列的长文本自动分页
(Chrome手机模式下测试）

### usage

1. 引入jq和pagination.js(jq在前);
2. 使用
```
$('选择器').Pagination(options)
```
options支持配置项：
- height 页高
- width 页宽
- fadeSpeed 翻页过渡时间
- fontSize 文本字体大小
- lineHeight 行间距
- onPageChange 左滑，右滑翻页时触发的函数
