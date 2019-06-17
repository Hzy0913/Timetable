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

let Timetable;

var timetableList = [
  ['English','English','Physics','Science','English','Maths','Physics','Science','Science','Maths','Physics','Science'],
  ['Maths','English','Science','Science','English','English','English','Science','Maths','English','English','History'],
  ['English','Maths','Physics','Science','English','Maths','Physics','Science','English','Maths','Physics','Science'],
  ['Maths','English','Science','Science','English','English','English','Physics','Maths','English','English','History'],
  ['English','Maths','Physics','Science','English','Maths','Physics','Science','English','Maths','Physics','Science'],
];

// You can create a timetable instance with options to set configuration.
Timetable = new Timetables({
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
| merge  | Boolean   | Merge the same content that are approaching in one day(defualt is true)  |
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

 - `timetables` Set content of timetable，option is two-dimensional array type，subitem arrya
