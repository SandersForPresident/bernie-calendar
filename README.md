# Bernie Calendar

## To install


#### 1. Install the bower package
```
bower install git@github.com:SandersForPresident/bernie-calendar.git
```
*note: this will later be updated to bernie-calendar*

#### 2. Link the files to the project
```html
<link rel="stylesheet" type="text/css" href="bower_components/bernie-calendar/dist/bernie-calendar.css" />
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
