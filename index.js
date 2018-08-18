(function(global) {
  var Timetable = function(option) {
    this.el = document.querySelector(option.el);
    this.courseList = option.courseList || [];
    this.week = option.week || [];
    this.courseType = option.courseType || [];
    this.leftHandText = [];
    this.deepCopyCourseType = JSON.parse(JSON.stringify(option.courseType));
    this.leftHandWidth = 20;
    this._init();
  };
  Timetable.prototype = {
    _init: function(option) {
      var leftHandWidth = this.leftHandWidth;
      var leftHandText = this.leftHandText;
      var courseWrapper = document.createElement('div');
      courseWrapper.style.position = 'relative';
      courseWrapper.style.paddingLeft = leftHandWidth + 'px';
      courseWrapper.style.border = '1px solid #dbdbdb';
      courseWrapper.style.borderBottomWidth = '0px';

      this.courseType = this.courseType.map(function (item, index) {
        item.unshift(index + 1)
      });

      var leftHand = document.createElement("div");
      leftHand.className = 'Courses-leftHand';
      leftHand.style.position = 'absolute';
      leftHand.style.left = 0;
      leftHand.style.top = 0;
      leftHand.style.width = leftHandWidth + 'px';

      var courseList = this.courseList[0].map(function (v, i) {
        return [];
      });
      courseList.forEach(function (item, index) {
        this.courseList.forEach(function (val, i) {
          courseList[index].push(val[index])
        });
      });

      var head = document.createElement("div");
      head.style.overflow = 'hidden';
      head.id = 'Courses-head';
      this.week.forEach(function (item, index) {
        var weekItem = document.createElement("div");
        weekItem.className = 'Courses-head-' + (index + 1)
        weekItem.innerText = item;
        weekItem.style.cssFloat = 'left'
        weekItem.style.borderLeft = '1px solid #dbdbdb';
        weekItem.style.borderBottom = '1px solid #dbdbdb';
        weekItem.style.width = 100/week.length + '%'
        head.appendChild(weekItem);
      })
      courseWrapper.appendChild(head);


      var courseListContent = document.createElement("div");
      courseListContent.className = 'Courses-content'
      courseList.forEach(function (values, index) {
        var courseItems = document.createElement("ul");
        courseItems.className = 'stage_' + ((this.courseType[0] || [])[0] || 'none');
        -- (this.courseType[0] || [])[2];
        if (!((this.courseType[0] || [])[2])) {
          this.courseType.shift();
        }
        courseItems.style.overflow = 'hidden'
        values.forEach(function (item) {
          var courseItem = document.createElement("li");
          courseItem.style.cssFloat = 'left'
          courseItem.style.width = 100/week.length + '%';
          courseItem.style.borderLeft = '1px solid #dbdbdb';
          courseItem.style.borderBottom = '1px solid #dbdbdb';
          courseItem.innerText = item;
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
      leftHandText.forEach(function (item) {
        var leftHandTextItem = document.createElement("div");
        leftHandTextItem.innerText = item;
        leftHandTextDom.appendChild(leftHandTextItem)
      })
      leftHand.appendChild(leftHandTextDom);

      this.deepCopyCourseType.forEach(function (item, index) {
        var handItem = document.createElement("div");
        handItem.style.height = courseItemDomHeight * item[1] + 'px'
        handItem.style.borderBottom = '1px solid #dbdbdb';
        handItem.innerText = item[0] || '';
        handItem.className = 'left-hand-' + (index + 1);
        leftHand.appendChild(handItem);
      });
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = Timetable;
  if (typeof define === 'function') define(function() { return Timetable; });
  global.Timetable = Timetable;
})(this);
