(function(global) {
  var Timetable = function(option) {
    this.el = document.querySelector(option.el);
    this.Timetables = option.timetables || [];
    this.week = option.week || [];
    this.TimetableType = option.timetableType || [];
    this.leftHandText = [];
    this.gridOnClick = typeof option.gridOnClick === 'function' ? option.gridOnClick : undefined;
    var styles = option.styles || {};
    this.leftHandWidth = styles.leftHandWidth || 40;
    this.Gheight = styles.Gheight || 48;
    this.defaultPalette = ['#e070a2', '#48a8e4', '#4adbc3', '#52db9a', '#e6b44e', '#eeddfc', '#48a8e4', '#4adbc3', '#52db9a',];
    this.palette = (styles.palette || []).concat(this.defaultPalette)
    this._init();
  };
  Timetable.prototype = {
    _init: function(option) {
      var option = option || {};
      var style = option.styles || {};
      var gridOnClick = option.gridOnClick || this.gridOnClick;
      var leftHandText = this.leftHandText;
      var leftHandWidth = style.leftHandWidth || this.leftHandWidth;
      var Gheight = style.Gheight || this.Gheight;
      var palettes = style.palette ? (style.palette || []).concat(this.defaultPalette) : this.palette;
      var palette = JSON.parse(JSON.stringify(palettes));

      var Timetables = option.timetables || this.Timetables;
      var week = option.week || this.week;
      var TimetableType = JSON.parse(JSON.stringify(option.timetableType || this.TimetableType));
      var deepCopyTimetableType = option.timetableType || this.TimetableType;

      if (option.setNewOption) {
        this.el.removeChild(this.el.childNodes[0]);
      }
      var courseWrapper = document.createElement('div');
      courseWrapper.id = 'courseWrapper';
      courseWrapper.style.position = 'relative';
      courseWrapper.style.paddingLeft = leftHandWidth + 'px';
      courseWrapper.style.border = '1px solid #dbdbdb';
      courseWrapper.style.borderBottomWidth = '0px';

      TimetableType.forEach(function (item, index) {
        item.unshift(index + 1)
      });

      var leftHand = document.createElement("div");
      leftHand.className = 'Courses-leftHand';
      leftHand.style.position = 'absolute';
      leftHand.style.left = 0;
      leftHand.style.top = 0;
      leftHand.style.width = leftHandWidth + 'px';

      var timetable = Timetables[0].map(function (v, i) {
        return [];
      });
      timetable.forEach(function (item, index) {
        Timetables.forEach(function (val, i) {
          timetable[index].push(val[index])
        });
      });

      //合并课程
      var listMerge = [];
      Timetables.forEach((list, i) => {
        if (!listMerge[i]){
          listMerge[i] = [];
        }
        list.forEach((item, index) => {
          if (!index) {
            return listMerge[i].push({name: item, length: 1})
          }
          if (item === (listMerge[i][index-1] ||{}).name && item) {
            var sameIndex = (listMerge[i][index-1] ||{}).sameIndex;
            if (sameIndex || sameIndex === 0) {
              listMerge[i][sameIndex].length ++;
              return listMerge[i].push({name: item, length: 0, sameIndex: sameIndex})
            }
            listMerge[i][index-1].length ++;
            return listMerge[i].push({name: item, length: 0, sameIndex: index-1})
          } else {
            return listMerge[i].push({name: item, length: 1})
          }
        })
      })


      var head = document.createElement("div");
      head.style.overflow = 'hidden';
      head.id = 'Courses-head';
      week.forEach(function (item, index) {
        var weekItem = document.createElement("div");
        weekItem.className = 'Courses-head-' + (index + 1)
        weekItem.innerText = item;
        weekItem.style.cssFloat = 'left'
        weekItem.style.borderLeft = '1px solid #dbdbdb';
        weekItem.style.borderBottom = '1px solid #dbdbdb';
        weekItem.style.boxSizing = 'border-box';
        weekItem.style.width = 100/week.length + '%'
        head.appendChild(weekItem);
      })
      courseWrapper.appendChild(head);

      var courseListContent = document.createElement("div");
      courseListContent.className = 'Courses-content'
      timetable.forEach(function (values, index) {
        var courseItems = document.createElement("ul");
        courseItems.style.listStyle = 'none'
        courseItems.style.padding = '0px'
        courseItems.style.margin = '0px'
        courseItems.style.minHeight = Gheight + 'px'

        courseItems.className = 'stage_' + ((TimetableType[0] || [])[0] || 'none');
        -- (TimetableType[0] || [])[2];
        if (!((TimetableType[0] || [])[2])) {
          TimetableType.shift();
        }
        values.forEach(function (item, i) {
          if (i > week.length -1) return;
          var courseItem = document.createElement("li");
          courseItem.style.cssFloat = 'left'
          courseItem.style.width = 100/week.length + '%';
          courseItem.style.height = Gheight + 'px';
          courseItem.style.borderLeft = '1px solid #dbdbdb';
          courseItem.style.borderBottom = '1px solid #dbdbdb';
          courseItem.style.boxSizing = 'border-box';
          courseItem.style.position = 'relative'
          if (true && listMerge[i][index].length > 1) {
            var mergeDom = document.createElement("span");
            mergeDom.style.position = 'absolute';
            mergeDom.style.zIndex = 9;
            mergeDom.style.width = '100%';
            mergeDom.style.height = Gheight * listMerge[i][index].length + 'px';
            mergeDom.style.left = 0;
            mergeDom.style.top = 0;
            mergeDom.style.backgroundColor = palette[0];
            palette.shift();
            mergeDom.style.color = '#fff';
            mergeDom.innerText = listMerge[i][index].name
            courseItem.appendChild(mergeDom);
          } else {
            if (listMerge[i][index].length === 0) {
              courseItem.innerText = '';
            } else {
              courseItem.innerText = item || '';
            }
          }

          courseItem.onclick = function (e) {
            var allList = document.querySelectorAll('.Courses-content ul li').forEach(function (v, i) {
              v.classList.remove('grid-active');
            })
            this.className = 'grid-active';
            var info = {
              name:item,
              week:   week[i],
              index: index + 1,
              length: listMerge[i][index].length
            };
            gridOnClick && gridOnClick(info);
          };
          courseItems.appendChild(courseItem);
        });
        courseListContent.appendChild(courseItems);
      })
      courseWrapper.appendChild(courseListContent);
      courseWrapper.appendChild(leftHand);
      this.el.appendChild(courseWrapper);

      var courseItemDomHeight = (document.querySelector('.stage_1 li') || document.querySelector('.stage_none li')).offsetHeight;
      var coursesheadDomHeight = document.querySelector('#Courses-head').offsetHeight;

      var leftHandTextDom = document.createElement("div");
      leftHandTextDom.className = 'left-hand-TextDom'
      leftHandTextDom.style.height = coursesheadDomHeight + 'px';
      leftHandTextDom.style.borderBottom = '1px solid #dbdbdb';
      leftHandTextDom.style.borderBottom = '1px solid #dbdbdb';
      leftHandTextDom.style.boxSizing = 'border-box';

      leftHandText.forEach(function (item) {
        var leftHandTextItem = document.createElement("div");
        leftHandTextItem.innerText = item;
        leftHandTextDom.appendChild(leftHandTextItem)
      })
      leftHand.appendChild(leftHandTextDom);

      deepCopyTimetableType.forEach(function (item, index) {
        var handItem = document.createElement("div");
        handItem.style.width = '100%'
        handItem.style.height = courseItemDomHeight * item[1] + 'px'
        handItem.style.borderBottom = '1px solid #dbdbdb';
        handItem.style.boxSizing = 'border-box';
        if (typeof item[0] === 'object') {
           for (var v in item[0]) {
             var handItemInner = document.createElement('p');
             handItemInner.innerText = item[0][v]
             handItemInner.style.margin = '0px'
             handItemInner.className = 'left-hand-' + v
             handItem.appendChild(handItemInner)
           }
        } else {
          handItem.innerText = item[0] || '';
        }
        handItem.className = 'left-hand-' + (index + 1);
        leftHand.appendChild(handItem);
      });
    },
    setOption: function(option) {
      option.setNewOption = true;
      this._init(option);
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = Timetable;
  if (typeof define === 'function') define(function() { return Timetable; });
  global.Timetable = Timetable;
})(this);