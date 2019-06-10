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

// You can create a timetables instance with options to set configuration.
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
