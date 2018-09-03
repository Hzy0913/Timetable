
## Timetables
日程表插件，在线预览 [demo1](http://preview.binlive.cn/Timetables/index.html "demo1") 、[demo2](http://preview.binlive.cn/Timetables/example.html "demo1")

![Timetables1](https://github.com/Hzy0913/hanlibrary/blob/master/Timetables1.png "Timetables1")![Timetables](https://github.com/Hzy0913/hanlibrary/blob/master/Timetables.png "Timetables")


## 安装

```
npm install timetables
```
##### 直接引入
或者直接引入该地址下[Timetables.min.js](https://github.com/Hzy0913/Timetable/tree/master/exampel/Timetables.min.js "Timetables.min.js")
## 使用

```js
import Timetables from 'timetablestim';

let Timetable;

// 在可以获取到真实dom节点到周期里进行实例化
var courseList = [
        ['语文','语文','英语','物理','语文','数学','英语','物理','物理','数学','英语','物理'],
        ['数学','语文','物理','物理','语文','语文','语文','物理','数学','语文','语文','体育'],
        ['语文','数学','英语','物理','语文','数学','英语','物理','语文','数学','英语','物理'],
        ['数学','语文','物理','物理','语文','语文','语文','英语','数学','语文','语文','体育'],
        ['语文','数学','英语','物理','语文','数学','英语','物理','语文','数学','英语','物理'],
 ];
Timetable = new Timetables({
    el: '#coursesTable',
    timetables: courseList,
    week: ['一', '二', '三', '四', '五'],
    timetableType: [
        ['上午', 4],
        ['下午', 4],
        ['晚上', 4]
    ],
});
```

## 参数及方法

| 参数or方法	  |  类型  | 说明   |
| ------------ | ------------ | ------------ |
| el  | String(必传)   | 绑定dom节点的id('#id')  |
| timetables  | Array(必传)   | 日程表内容,格式为二维数组  |
| week  | Array(必传)   | 日程表头部周,格式为二维数组  |
| timetableType  | Array(必传)   | 日程表左侧分类,格式为二维数组  |
| highlightWeek  | Number  | 传入表头当天的索引,为日程表头部高亮某周增加一个class(可自定义样式)  |
| styles  | Object   | 日程表内容样式，具体使用见下文  |
| merge  | Boolean   | 是否合并一天内临近的相同日程(默认为true)  |
| gridOnClick  | Function   | 单元格点击触发事件,方法参数中可获取到该格的信息 |
| setOption  | Function   | 实例化上的方法, 重新设置参数渲染表格,参数同上(没有el参数) |


#### 参数示例
```javascript
var timetables = [
        ['大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修'],
        ['','','信号与系统@11302','信号与系统@11302','模拟电子技术基础@16204','模拟电子技术基础@16204','','','','','',''],
        ['大学体育(Ⅳ)','大学体育(Ⅳ)','形势与政策(Ⅳ)@15208','形势与政策(Ⅳ)@15208','','','电路、信号与系统实验','电路、信号与系统实验','','','',''],
        ['','','','','电装实习@11301','电装实习@11301','','','','大学体育','大学体育',''],
        ['','','数据结构与算法分析','数据结构与算法分析','','','','','信号与系统','信号与系统','',''],
];
var timetableType = [
        [{index: '1',name: '8:30'}, 1],
        [{index: '2',name: '9:30'}, 1],
        [{index: '3',name: '10:30'}, 1],
        [{index: '4',name: '11:30'}, 1],
        [{index: '5',name: '12:30'}, 1],
        [{index: '6',name: '14:30'}, 1],
        [{index: '7',name: '15:30'}, 1],
        [{index: '8',name: '16:30'}, 1],
        [{index: '9',name: '17:30'}, 1],
        [{index: '10',name: '18:30'}, 1],
        [{index: '11',name: '19:30'}, 1],
        [{index: '12',name: '20:30'}, 1]
];
var week =  ['周一', '周二', '周三', '周四', '周五'];
var highlightWeek = new Date().getDay();
var styles = {
    Gheight: 50,
    leftHandWidth: 50,
    palette: ['#ff6633', '#eeeeee']
};

// 实例化(初始化课表)
var Timetable = new Timetables({
    el: '#coursesTable',
    timetables: timetables,
    week: week,
    timetableType: timetableType,
    highlightWeek: highlightWeek,
    gridOnClick: function (e) {
      alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
      console.log(e)
    },
    styles: styles
});

//重新设置参数 渲染
function onChange() {
  Timetable.setOption({
    timetables: courseListOther,
    week: ['一', '二', '三', '四', '五', '六', '日'],
    styles:{
      palette: ['#dedcda', '#ff4081']
    },
    timetableType:courseType,
    gridOnClick: function (e) {
      console.log(e)
    }})
};
```
 - `timetables` 参数为表格内容项,格式为二维数组,数组第二维中每项长度需要和`timetableType `中每一项的长度的累计总和一致, 长度不足时会自动以空字符串追加补全。<br/>同一天内临近的日程相同时会自动合并为一格展示(设置**merge**参数为false时不自动合并)。
 - `timetableType` 参数可以将表格内容分类,数组内的每一项为该行标签,用于分隔行。<br/>每项中第一项可以是字符串或者一个对象,当为对象时会自动生成多项dom节点。<br/>第二项为要分类的长度，所有长度累计总和应该与`timetables`参数中每一项的保持长度一致。
 - `week` 参数为表格列名,将内容依次分隔为相应列数
 - `highlightWeek` 参数为数字索引(从1开始),索引对应你上面`week`参数里的项,传入索引后会在表格头对应节点加上一个class
 - `styles` 参数为表格表格样式:<br/> **Gheight** 为表格内每一个单元格高度(number)单位为'px' <br/>  **leftHandWidth** 为表格左侧日程分类样式宽带度(number)单位为'px'<br/>**palette** 为合并相同课程单元格后颜色调色盘,默认有15种颜色,可以传入颜色数组自定义(传入的颜色会与默认颜色合并,并优先使用自定义颜色)
 - `setOption` 在实例化对象上可以使用**setOption**方法重新渲染表格。参数使用同上,不需要再传入el参数绑定dom,默认使用实例化时候的dom节点
 - 日程表没有过多进行样式装饰,可以根据已有的css类自行美化
## 作者

See [飞翔的荷兰人](https://github.com/Hzy0913 "飞翔的荷兰人").
