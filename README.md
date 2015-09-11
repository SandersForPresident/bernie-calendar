# Bernie Calendar

## To install


#### 1. Install the bower package
```
bower install git@github.com:SandersForPresident/bernie-calendar.git
```
*note: this will later be updated to bernie-calendar*

#### 2. Link the files to the project and their dependencies
```html
<link rel="stylesheet" type="text/css" href="bower_components/fullcalendar/dist/fullcalendar.css" />
<link rel="stylesheet" type="text/css" href="bower_components/bernie-calendar/dist/bernie-calendar.css" />
<script type="text/javascript" src="bower_components/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="bower_components/lodash/lodash.js"></script>
<script type="text/javascript" src="bower_components/moment/moment.js"></script>
<script type="text/javascript" src="bower_components/fullcalendar/dist/fullcalendar.js"></script>
<script type="text/javascript" src="bower_components/bernie-calendar/dist/bernie-calendar.js"></script>
```

#### 3. Try it out
```html
<div id="calendar"></div>
<script type="text/javascript">
$(document).ready(function () {
  $('#calendar').bernieCalendar();
});
</script>
```

## Options
```js
{
  maxEvents: Integer
}
```
#### options.maxEvents
The maximum number of events to display on a given calendar day

*note: more options coming soon*

## To build

#### Install the dependencies
```
bower install
npm install
```

#### To compile
```
gulp build
```
