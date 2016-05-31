# mobileSilde
slide for mobile device,support tencent x5,translate touch event to mouse event if in desktop environment

## How to use
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width" />
	<script src="src/mobileSlide.js"></script>
	<style>
	* {
		padding: 0;
		margin: 0;
	}
	ul {
		height: 200px;
	}
	li {
		line-height: 200px;
		text-align: center;
		font-size: 80px;
		-webkit-user-select:none;
		-moz-user-select:none;
		-o-user-select:none;
		user-select:none;
	}
	li:nth-child(1) {
		background-color: #eee;
	}
	li:nth-child(2) {
		background-color: #aaa;
	}
	li:nth-child(3) {
		background-color: #bbb;
	}
	#showIndex {
		text-align: center;
	}
	</style>
</head>
<body>
	<ul id="slide1">
		<li>1</li>
	</ul>
	<ul id="slide2">
		<li>1</li>
		<li>2</li>
	</ul>
	<ul id="slide3">
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	<ul id="slide4">
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	<div id="showIndex">
	</div>
	<script>
		window.onload = function() {
			var div = document.getElementById('showIndex');
			function instructSlide(index,total) {
				div.innerText = (index+1) + "/" + total;
			}
			mobileSlide(document.getElementById('slide1'));
			mobileSlide(document.getElementById('slide2'));
			mobileSlide(document.getElementById('slide3'), {
				direction: 'vertical'
			});
			mobileSlide(document.getElementById('slide4'), {
				afterTransitionFunc: instructSlide
			});
		}
		
	</script>
</body>
</html>
```
## [DEMO](http://chen8840.github.io/mobileSilde/)
