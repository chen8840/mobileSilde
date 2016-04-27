(function() {
	'use strict';
	window.mobileSlide = function(ul, options) {
		if(ul.nodeType != 1 || ul.tagName.toLowerCase() != 'ul') {
			console.warn('mobileSlide\'s param is not a HTML UL Element.');
			return;
		}
		if(ul.children.length <= 1) {
			console.warn('ul > li\'s number must > 1.');
			return;
		}
		//set style
		ul.style.overflow = 'hidden';
		ul.style.position = 'relative';
		for(var i = 0; i < ul.children.length; i++) {
			ul.children[i].style.listStyle = 'none';
			ul.children[i].style.position = 'relative';
			if(i !== 0) ul.children[i].style.display = 'none';
		}
		//add event
		(function() {
			var startx,starty,prevLi,nextLi,curLi,delx,dely,transitionFlag;
			createTouchEvent(ul,'touchstart',function(e, x, y) {
				//for QQ X5
				if(is_weixin()) {
					e.preventDefault();
				}
				if(options && options.stopPropagation) {
					e.stopPropagation();
				}
				if(isInTransition()) return;
				var index = getActiveIndex(ul);
				startx = x;
				starty = y;
				curLi = ul.children[index];
				prevLi = index <= 0 ? ul.children[ul.children.length - 1] : ul.children[index - 1];
				nextLi = index >= (ul.children.length - 1) ? ul.children[0] : ul.children[index + 1];
			});
			createTouchEvent(ul,'touchmove',function(e, x, y) {
				if(options && options.stopPropagation) {
					e.stopPropagation();
				}
				if(isInTransition()) return;
				delx = x - startx;
				dely = y - starty;
				if(delx > 0 && Math.abs(delx) <= ul.clientWidth) {
					if(nextLi !== prevLi) {
						hideNext(nextLi);
					}
					if(prevLi.style.display == 'none') {
						showPrev(prevLi);
					}
					prevLi.style.left = (-prevLi.offsetWidth + delx) + 'px';
					curLi.style.left = delx + 'px';
				} else if(delx < 0 && Math.abs(delx) <= ul.clientWidth) {
					if(nextLi !== prevLi) {
						hidePrev(prevLi);
					}
					if(nextLi.style.display == 'none') {
						showNext(nextLi);
					}
					nextLi.style.left = (nextLi.offsetWidth + delx) + 'px';
					curLi.style.left = delx + 'px';
				}
			});
			createTouchEvent(ul,'touchend',function(e, x, y) {
				if(options && options.stopPropagation) {
					e.stopPropagation();
				}
				if(isInTransition()) return;
				if(Math.abs(delx) > 0) {
					setTransitionFlag();
					if( delx > 0 ){
						prevMove(ul,prevLi,curLi,delx, function() {
							clearTransitionFlag();
							startx = starty = prevLi = nextLi = curLi = delx = dely = transitionFlag = undefined;
						});
					} else if(delx < 0) {
						nextMove(ul,nextLi,curLi,delx, function() {
							clearTransitionFlag();
							startx = starty = prevLi = nextLi = curLi = delx = dely = transitionFlag = undefined;
						});
					}
				} else {
					startx = starty = prevLi = nextLi = curLi = delx = dely = transitionFlag = undefined;
				}
			});
			function setTransitionFlag() {
				transitionFlag = true;
			}
			function clearTransitionFlag() {
				transitionFlag = false;
			}
			function isInTransition() {
				return !!transitionFlag;
			}
		})();
	};

	function prevMove(ul, pLi, cLi, lx, callback) {
		pLi.style.transition = cLi.style.transition = pLi.style.webkitTransition = cLi.style.webkitTransition = '.6s ease all';
		var willRestore = lx <= ul.clientWidth * 0.2;
		if(!willRestore) {
			pLi.style.left = '0px';
			cLi.style.left = ul.clientWidth + 'px';
		} else {
			pLi.style.left = -ul.clientWidth + 'px';
			cLi.style.left = '0px';
		}

		addOneTransitionendEvent(pLi,function() {
			pLi.style.transition = pLi.style.webkitTransition = '';
			if(!willRestore) {
				hidePrev(pLi);
				pLi.style.display = 'block';
				pLi.style.position = 'relative';
			} else {
				hidePrev(pLi);
			}
			if(callback) callback();
		});
		addOneTransitionendEvent(cLi,function() {
			cLi.style.transition = cLi.style.webkitTransition = '';
			if(!willRestore) {
				hideNext(cLi);
			} else {
				cLi.style.left = '';
			}
			if(callback) callback();
		});
	}
	function nextMove(ul, nLi, cLi, lx, callback) {
		nLi.style.transition = cLi.style.transition = nLi.style.webkitTransition = cLi.style.webkitTransition = '0.6s ease left';
		var willRestore = -lx <= ul.clientWidth * 0.2;
		if(!willRestore) {
			nLi.style.left = '0px';
			cLi.style.left = -ul.clientWidth + 'px';
		} else {
			nLi.style.left = ul.clientWidth + 'px';
			cLi.style.left = '0px';
		}
		addOneTransitionendEvent(nLi,function() {
			nLi.style.transition = nLi.style.webkitTransition = '';
			if(!willRestore) {
				hideNext(nLi);
				nLi.style.display = 'block';
				nLi.style.position = 'relative';
			} else {
				hideNext(nLi);
			}
			if(callback) callback();
		});
		addOneTransitionendEvent(cLi,function() {
			cLi.style.transition = cLi.style.webkitTransition = '';
			if(!willRestore) {
				hidePrev(cLi);
			} else {
				cLi.style.left = '';
			}
			if(callback) callback();
		});
	}
	function addOneTransitionendEvent(el, handle) {
		function _handle(event) {
			handle(event);
			el.removeEventListener('webkitTransitionEnd', _handle, false);
			el.removeEventListener('mozTransitionEnd', _handle, false);
			el.removeEventListener('MSTransitionEnd', _handle, false);
			el.removeEventListener('otransitionend', _handle, false);
			el.removeEventListener('transitionend', _handle, false);
		}
		el.addEventListener('webkitTransitionEnd', _handle, false);
		el.addEventListener('mozTransitionEnd', _handle, false);
		el.addEventListener('MSTransitionEnd', _handle, false);
		el.addEventListener('otransitionend', _handle, false);
		el.addEventListener('transitionend', _handle, false);
	}
	function showPrev(li) {
		li.style.display = 'block';
		li.style.position = 'absolute';
		li.style.top = '0';
		li.style.width = '100%';
		li.style.left = '-100%';
	}
	function hidePrev(li) {
		li.style.display = 'none';
		li.style.position = 'relative';
		li.style.top = '';
		li.style.width = '';
		li.style.left = '';
	}
	function showNext(li) {
		li.style.display = 'block';
		li.style.position = 'absolute';
		li.style.top = '0';
		li.style.width = '100%';
		li.style.left = '100%';
	}
	function hideNext(li) {
		li.style.display = 'none';
		li.style.position = 'relative';
		li.style.top = '';
		li.style.width = '';
		li.style.left = '';
	}
	function getActiveIndex(ul) {
		for(var i = 0; i < ul.children.length; i++) {
			if(ul.children[i].style.display != 'none' && ul.children[i].style.position == 'relative') {
				return i;
			}
		}
		return undefined;
	}
	function createTouchEvent(el,touchEventName,callback) {
		(function(e, name, func) {
			if('ontouchend' in document) {
				switch(name) {
					case 'touchstart':
					e.addEventListener('touchstart', function(event) {func(event,event.touches[0].clientX,event.touches[0].clientY);}, false);
					break;
					case 'touchmove':
					e.addEventListener('touchmove', function(event) {func(event,event.touches[0].clientX,event.touches[0].clientY);}, false);
					break;
					case 'touchend':
					e.addEventListener('touchend', function(event) {
						func(event,undefined,undefined);
					}, false);
					break;
				}
			} else {
				switch(name) {
					case 'touchstart':
					e.addEventListener('mousedown', function(event) {e._mousedown = true;func(event,event.clientX,event.clientY);}, false);
					break;
					case 'touchmove':
					e.addEventListener('mousemove', function(event) {if(e._mousedown) func(event,event.clientX,event.clientY);}, false);
					break;
					case 'touchend':
					e.addEventListener('mouseup', function(event) {e._mousedown = false;func(event,event.clientX,event.clientY);}, false);
					e.addEventListener('mouseout', function(event) {e._mousedown = false;func(event,event.clientX,event.clientY);}, false);
					break;
				}
			}
		})(el,touchEventName,callback);
	}
	function is_weixin(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
	 	} else {
			return false;
		}
	}

	if ( typeof define === "function" && define.amd ) {
		define('mobileSlide', [], function() {
			return window.mobileSlide;
		});
	}
})();