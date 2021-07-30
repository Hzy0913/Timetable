## timetables

timetable plugin, preview [demo1](http://preview.binlive.cn/Timetables/index.html "demo1") 、[demo2](http://preview.binlive.cn/Timetables/example.html "demo1")

![Timetables1](https://github.com/Hzy0913/hanlibrary/blob/master/Timetables1.png "Timetables1")![Timetables](https://github.com/Hzy0913/hanlibrary/blob/master/Timetables.png "Timetables")


## Install

```
npm install timetables
```
#### Download Source Files
- [Download min file](https://github.com/Hzy0913/Timetable/blob/master/exampel/Timetables.min.js "Download min file")

## Usage
```js
import Timetables from 'timetables';

let timetable;

var timetableList = [
  ['English','English','Physics','Science','English','Maths','Physics','Science','Science','Maths','Physics','Science'],
  ['Maths','English','Science','Science','English','English','English','Science','Maths','English','English','History'],
  ['English','Maths','Physics','Science','English','Maths','Physics','Science','English','Maths','Physics','Science'],
  ['Maths','English','Science','Science','English','English','English','Physics','Maths','English','English','History'],
  ['English','Maths','Physics','Science','English','Maths','Physics','Science','English','Maths','Physics','Science'],
];

// You can create a timetable instance with options to set configuration.
timetable = new Timetables({
  el: '#coursesTable',
  timetables: timetableList,
  week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  timetableType: [
    ['Morning', 4],
    ['Afternoon', 4],
    ['Night', 4]
  ],
});
```
## options & methods

| Option or Method	  |  Type  | Description   |
| ------------ | ------------ | ------------ |
| el  | String(required)   | The container dom element id ('#id')  |
| timetables  | Array(required)   | The content of timetable (two-dimensional array)  |
| week  | Array(required)   | Head week of timetable (two-dimensional array)  |
| timetableType  | Array(required)   | The left side classification of timetable (two-dimensional array)   |
| highlightWeek  | Number  | Set head week highligh, pass in the index of this day, it's will be generate a className(you can custom style)  |
| styles  | Object   | The grid's style of timetable, more description see below   |
| merge  | Boolean   | Merge the same content that are approaching on the same day(default is true)  |
| gridOnClick  | Function   |  Cell click trigger event, method parameters can get the information of the this cell  |
| setOption  | Function   | The instance method, use the new options reset and render timetable, options same as above (no have `el` option) |

#### Use example
```javascript
var timetables = [
  ['College English(Ⅳ)@10203', 'College English(Ⅳ)@10203', '', '', '', '', 'Physical@14208', 'Physical@14208', '', '', '', 'Elective course'],
  ['', '', 'Operating System@11302', 'Operating System@11302', 'Computer Principle @16204', 'Computer Principle @16204', '', '', '', '', '', ''],
  ['College Sports(Ⅳ)', 'College Sports(Ⅳ)', 'Algorithm(Ⅳ)@15208', 'Algorithm(Ⅳ)@15208', '', '', 'Operating System', 'Operating System', '', '', '', ''],
  ['', '', '', '', 'Art lessons@11301', 'Art lessons@11301', '', '', '', 'College Sports', 'College Sports', ''],
  ['', '', 'Data Structure and Algorithms', 'Data Structure and Algorithms', '', '', '', '', 'Computer Principle', 'Computer Principle', '', ''],
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
var week =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var highlightWeek = new Date().getDay();
var styles = {
    Gheight: 50,
    leftHandWidth: 50,
    palette: ['#ff6633', '#eeeeee']
};

// Instantiate(init timetable)
var Timetable = new Timetables({
    el: '#coursesTable',
    timetables: timetables,
    week: week,
    timetableType: timetableType,
    highlightWeek: highlightWeek,
    gridOnClick: function (e) {
      alert('name:' + e.name + ' week:' + e.week + ' index:' + e.index + 'length: ' + e.length)
      console.log(e)
    },
    styles: styles
});

//reset options
function onChange() {
  Timetable.setOption({
    timetables: courseListOther,
    week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Saturday'],
    styles:{
      palette: ['#dedcda', '#ff4081']
    },
    timetableType:courseType,
    gridOnClick: function (e) {
      console.log(e)
    }})
};
```

 - `timetables` Set content of timetable, option is two-dimensional array type, the subitem of this array need to be the same as length of `timetableType` option. It's will be auto filling by empty string when length of subitem is not enough. In the subitem, the same and approached content will be merge(set **merge** option is `false`, merger will not take effect)
 - `timetableType` The option can categorize `timetables` contents, it's two-dimensional array type. <br/> The first item in the subitem of this array can be a `string` or `object`, if it's a object, each value all will be create Dom, and key of object will be ClassName of this Dom. <br/> The second item in the subitem is a number type, it's means length of this classification. The sum of all lengths should be equal to subitem length of `timetables` option
 - `week` The option is used to set table head column name
 - `highlightWeek` This option is number of index(start from 1). The index corresponds to `week` option contents, it will be add a `highlight-week` className of table head.
 - `styles` Set style of timetable: <br/> **Gheight** Set height of grid for timetable (number type, pixel unit)   <br/>  **leftHandWidth** Set width of left classification for timetable (number type, pixel unit) <br/>**palette** After merged the same course, cells will be set background color, and color from `palette`. There are 15 colors by default, you can also set custom color arrays(The custom colors will be merged with the default colors, and custom colors will be priority use). When set this is **false**, don't add background color for cell of timetable.
