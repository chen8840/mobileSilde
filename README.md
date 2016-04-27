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
	body,html {
		height: 100%;
	}
	ul {
		height: 200px;
	}
	li {
		line-height: 200px;
		text-align: center;
		font-size: 80px;
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
	</style>
</head>
<body>
	<ul id="slide1">
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	<ul id="slide2">
		<li>1</li>
		<li>2</li>
		<li>3</li>
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
	<script>
		window.onload = function() {
			mobileSlide(document.getElementById('slide1'));
			mobileSlide(document.getElementById('slide2'));
			mobileSlide(document.getElementById('slide3'));
			mobileSlide(document.getElementById('slide4'));
		}
		
	</script>
</body>
</html>
```
## [DEMO](http://chen8840.github.io/mobileSilde/)
