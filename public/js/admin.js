/*!
 * perfect-scrollbar v1.4.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.PerfectScrollbar=e()}(this,function(){"use strict";function t(t){return getComputedStyle(t)}function e(t,e){for(var i in e){var r=e[i];"number"==typeof r&&(r+="px"),t.style[i]=r}return t}function i(t){var e=document.createElement("div");return e.className=t,e}function r(t,e){if(!v)throw new Error("No element matching method supported");return v.call(t,e)}function l(t){t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)}function n(t,e){return Array.prototype.filter.call(t.children,function(t){return r(t,e)})}function o(t,e){var i=t.element.classList,r=m.state.scrolling(e);i.contains(r)?clearTimeout(Y[e]):i.add(r)}function s(t,e){Y[e]=setTimeout(function(){return t.isAlive&&t.element.classList.remove(m.state.scrolling(e))},t.settings.scrollingThreshold)}function a(t,e){o(t,e),s(t,e)}function c(t){if("function"==typeof window.CustomEvent)return new CustomEvent(t);var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,void 0),e}function h(t,e,i,r,l){var n=i[0],o=i[1],s=i[2],h=i[3],u=i[4],d=i[5];void 0===r&&(r=!0),void 0===l&&(l=!1);var f=t.element;t.reach[h]=null,f[s]<1&&(t.reach[h]="start"),f[s]>t[n]-t[o]-1&&(t.reach[h]="end"),e&&(f.dispatchEvent(c("ps-scroll-"+h)),e<0?f.dispatchEvent(c("ps-scroll-"+u)):e>0&&f.dispatchEvent(c("ps-scroll-"+d)),r&&a(t,h)),t.reach[h]&&(e||l)&&f.dispatchEvent(c("ps-"+h+"-reach-"+t.reach[h]))}function u(t){return parseInt(t,10)||0}function d(t){return r(t,"input,[contenteditable]")||r(t,"select,[contenteditable]")||r(t,"textarea,[contenteditable]")||r(t,"button,[contenteditable]")}function f(e){var i=t(e);return u(i.width)+u(i.paddingLeft)+u(i.paddingRight)+u(i.borderLeftWidth)+u(i.borderRightWidth)}function p(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function b(t,i){var r={width:i.railXWidth},l=Math.floor(t.scrollTop);i.isRtl?r.left=i.negativeScrollAdjustment+t.scrollLeft+i.containerWidth-i.contentWidth:r.left=t.scrollLeft,i.isScrollbarXUsingBottom?r.bottom=i.scrollbarXBottom-l:r.top=i.scrollbarXTop+l,e(i.scrollbarXRail,r);var n={top:l,height:i.railYHeight};i.isScrollbarYUsingRight?i.isRtl?n.right=i.contentWidth-(i.negativeScrollAdjustment+t.scrollLeft)-i.scrollbarYRight-i.scrollbarYOuterWidth:n.right=i.scrollbarYRight-t.scrollLeft:i.isRtl?n.left=i.negativeScrollAdjustment+t.scrollLeft+2*i.containerWidth-i.contentWidth-i.scrollbarYLeft-i.scrollbarYOuterWidth:n.left=i.scrollbarYLeft+t.scrollLeft,e(i.scrollbarYRail,n),e(i.scrollbarX,{left:i.scrollbarXLeft,width:i.scrollbarXWidth-i.railBorderXWidth}),e(i.scrollbarY,{top:i.scrollbarYTop,height:i.scrollbarYHeight-i.railBorderYWidth})}function g(t,e){function i(e){b[d]=g+Y*(e[a]-v),o(t,f),R(t),e.stopPropagation(),e.preventDefault()}function r(){s(t,f),t[p].classList.remove(m.state.clicking),t.event.unbind(t.ownerDocument,"mousemove",i)}var l=e[0],n=e[1],a=e[2],c=e[3],h=e[4],u=e[5],d=e[6],f=e[7],p=e[8],b=t.element,g=null,v=null,Y=null;t.event.bind(t[h],"mousedown",function(e){g=b[d],v=e[a],Y=(t[n]-t[l])/(t[c]-t[u]),t.event.bind(t.ownerDocument,"mousemove",i),t.event.once(t.ownerDocument,"mouseup",r),t[p].classList.add(m.state.clicking),e.stopPropagation(),e.preventDefault()})}var v="undefined"!=typeof Element&&(Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector),m={main:"ps",element:{thumb:function(t){return"ps__thumb-"+t},rail:function(t){return"ps__rail-"+t},consuming:"ps__child--consume"},state:{focus:"ps--focus",clicking:"ps--clicking",active:function(t){return"ps--active-"+t},scrolling:function(t){return"ps--scrolling-"+t}}},Y={x:null,y:null},X=function(t){this.element=t,this.handlers={}},w={isEmpty:{configurable:!0}};X.prototype.bind=function(t,e){void 0===this.handlers[t]&&(this.handlers[t]=[]),this.handlers[t].push(e),this.element.addEventListener(t,e,!1)},X.prototype.unbind=function(t,e){var i=this;this.handlers[t]=this.handlers[t].filter(function(r){return!(!e||r===e)||(i.element.removeEventListener(t,r,!1),!1)})},X.prototype.unbindAll=function(){var t=this;for(var e in t.handlers)t.unbind(e)},w.isEmpty.get=function(){var t=this;return Object.keys(this.handlers).every(function(e){return 0===t.handlers[e].length})},Object.defineProperties(X.prototype,w);var y=function(){this.eventElements=[]};y.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return e||(e=new X(t),this.eventElements.push(e)),e},y.prototype.bind=function(t,e,i){this.eventElement(t).bind(e,i)},y.prototype.unbind=function(t,e,i){var r=this.eventElement(t);r.unbind(e,i),r.isEmpty&&this.eventElements.splice(this.eventElements.indexOf(r),1)},y.prototype.unbindAll=function(){this.eventElements.forEach(function(t){return t.unbindAll()}),this.eventElements=[]},y.prototype.once=function(t,e,i){var r=this.eventElement(t),l=function(t){r.unbind(e,l),i(t)};r.bind(e,l)};var W=function(t,e,i,r,l){void 0===r&&(r=!0),void 0===l&&(l=!1);var n;if("top"===e)n=["contentHeight","containerHeight","scrollTop","y","up","down"];else{if("left"!==e)throw new Error("A proper axis should be provided");n=["contentWidth","containerWidth","scrollLeft","x","left","right"]}h(t,i,n,r,l)},L={isWebKit:"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style,supportsTouch:"undefined"!=typeof window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),supportsIePointer:"undefined"!=typeof navigator&&navigator.msMaxTouchPoints,isChrome:"undefined"!=typeof navigator&&/Chrome/i.test(navigator&&navigator.userAgent)},R=function(t){var e=t.element,i=Math.floor(e.scrollTop);t.containerWidth=e.clientWidth,t.containerHeight=e.clientHeight,t.contentWidth=e.scrollWidth,t.contentHeight=e.scrollHeight,e.contains(t.scrollbarXRail)||(n(e,m.element.rail("x")).forEach(function(t){return l(t)}),e.appendChild(t.scrollbarXRail)),e.contains(t.scrollbarYRail)||(n(e,m.element.rail("y")).forEach(function(t){return l(t)}),e.appendChild(t.scrollbarYRail)),!t.settings.suppressScrollX&&t.containerWidth+t.settings.scrollXMarginOffset<t.contentWidth?(t.scrollbarXActive=!0,t.railXWidth=t.containerWidth-t.railXMarginWidth,t.railXRatio=t.containerWidth/t.railXWidth,t.scrollbarXWidth=p(t,u(t.railXWidth*t.containerWidth/t.contentWidth)),t.scrollbarXLeft=u((t.negativeScrollAdjustment+e.scrollLeft)*(t.railXWidth-t.scrollbarXWidth)/(t.contentWidth-t.containerWidth))):t.scrollbarXActive=!1,!t.settings.suppressScrollY&&t.containerHeight+t.settings.scrollYMarginOffset<t.contentHeight?(t.scrollbarYActive=!0,t.railYHeight=t.containerHeight-t.railYMarginHeight,t.railYRatio=t.containerHeight/t.railYHeight,t.scrollbarYHeight=p(t,u(t.railYHeight*t.containerHeight/t.contentHeight)),t.scrollbarYTop=u(i*(t.railYHeight-t.scrollbarYHeight)/(t.contentHeight-t.containerHeight))):t.scrollbarYActive=!1,t.scrollbarXLeft>=t.railXWidth-t.scrollbarXWidth&&(t.scrollbarXLeft=t.railXWidth-t.scrollbarXWidth),t.scrollbarYTop>=t.railYHeight-t.scrollbarYHeight&&(t.scrollbarYTop=t.railYHeight-t.scrollbarYHeight),b(e,t),t.scrollbarXActive?e.classList.add(m.state.active("x")):(e.classList.remove(m.state.active("x")),t.scrollbarXWidth=0,t.scrollbarXLeft=0,e.scrollLeft=0),t.scrollbarYActive?e.classList.add(m.state.active("y")):(e.classList.remove(m.state.active("y")),t.scrollbarYHeight=0,t.scrollbarYTop=0,e.scrollTop=0)},T={"click-rail":function(t){t.event.bind(t.scrollbarY,"mousedown",function(t){return t.stopPropagation()}),t.event.bind(t.scrollbarYRail,"mousedown",function(e){var i=e.pageY-window.pageYOffset-t.scrollbarYRail.getBoundingClientRect().top>t.scrollbarYTop?1:-1;t.element.scrollTop+=i*t.containerHeight,R(t),e.stopPropagation()}),t.event.bind(t.scrollbarX,"mousedown",function(t){return t.stopPropagation()}),t.event.bind(t.scrollbarXRail,"mousedown",function(e){var i=e.pageX-window.pageXOffset-t.scrollbarXRail.getBoundingClientRect().left>t.scrollbarXLeft?1:-1;t.element.scrollLeft+=i*t.containerWidth,R(t),e.stopPropagation()})},"drag-thumb":function(t){g(t,["containerWidth","contentWidth","pageX","railXWidth","scrollbarX","scrollbarXWidth","scrollLeft","x","scrollbarXRail"]),g(t,["containerHeight","contentHeight","pageY","railYHeight","scrollbarY","scrollbarYHeight","scrollTop","y","scrollbarYRail"])},keyboard:function(t){function e(e,r){var l=Math.floor(i.scrollTop);if(0===e){if(!t.scrollbarYActive)return!1;if(0===l&&r>0||l>=t.contentHeight-t.containerHeight&&r<0)return!t.settings.wheelPropagation}var n=i.scrollLeft;if(0===r){if(!t.scrollbarXActive)return!1;if(0===n&&e<0||n>=t.contentWidth-t.containerWidth&&e>0)return!t.settings.wheelPropagation}return!0}var i=t.element,l=function(){return r(i,":hover")},n=function(){return r(t.scrollbarX,":focus")||r(t.scrollbarY,":focus")};t.event.bind(t.ownerDocument,"keydown",function(r){if(!(r.isDefaultPrevented&&r.isDefaultPrevented()||r.defaultPrevented)&&(l()||n())){var o=document.activeElement?document.activeElement:t.ownerDocument.activeElement;if(o){if("IFRAME"===o.tagName)o=o.contentDocument.activeElement;else for(;o.shadowRoot;)o=o.shadowRoot.activeElement;if(d(o))return}var s=0,a=0;switch(r.which){case 37:s=r.metaKey?-t.contentWidth:r.altKey?-t.containerWidth:-30;break;case 38:a=r.metaKey?t.contentHeight:r.altKey?t.containerHeight:30;break;case 39:s=r.metaKey?t.contentWidth:r.altKey?t.containerWidth:30;break;case 40:a=r.metaKey?-t.contentHeight:r.altKey?-t.containerHeight:-30;break;case 32:a=r.shiftKey?t.containerHeight:-t.containerHeight;break;case 33:a=t.containerHeight;break;case 34:a=-t.containerHeight;break;case 36:a=t.contentHeight;break;case 35:a=-t.contentHeight;break;default:return}t.settings.suppressScrollX&&0!==s||t.settings.suppressScrollY&&0!==a||(i.scrollTop-=a,i.scrollLeft+=s,R(t),e(s,a)&&r.preventDefault())}})},wheel:function(e){function i(t,i){var r=Math.floor(o.scrollTop),l=0===o.scrollTop,n=r+o.offsetHeight===o.scrollHeight,s=0===o.scrollLeft,a=o.scrollLeft+o.offsetWidth===o.scrollWidth;return!(Math.abs(i)>Math.abs(t)?l||n:s||a)||!e.settings.wheelPropagation}function r(t){var e=t.deltaX,i=-1*t.deltaY;return void 0!==e&&void 0!==i||(e=-1*t.wheelDeltaX/6,i=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,i*=10),e!==e&&i!==i&&(e=0,i=t.wheelDelta),t.shiftKey?[-i,-e]:[e,i]}function l(e,i,r){if(!L.isWebKit&&o.querySelector("select:focus"))return!0;if(!o.contains(e))return!1;for(var l=e;l&&l!==o;){if(l.classList.contains(m.element.consuming))return!0;var n=t(l);if([n.overflow,n.overflowX,n.overflowY].join("").match(/(scroll|auto)/)){var s=l.scrollHeight-l.clientHeight;if(s>0&&!(0===l.scrollTop&&r>0||l.scrollTop===s&&r<0))return!0;var a=l.scrollWidth-l.clientWidth;if(a>0&&!(0===l.scrollLeft&&i<0||l.scrollLeft===a&&i>0))return!0}l=l.parentNode}return!1}function n(t){var n=r(t),s=n[0],a=n[1];if(!l(t.target,s,a)){var c=!1;e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(a?o.scrollTop-=a*e.settings.wheelSpeed:o.scrollTop+=s*e.settings.wheelSpeed,c=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(s?o.scrollLeft+=s*e.settings.wheelSpeed:o.scrollLeft-=a*e.settings.wheelSpeed,c=!0):(o.scrollTop-=a*e.settings.wheelSpeed,o.scrollLeft+=s*e.settings.wheelSpeed),R(e),(c=c||i(s,a))&&!t.ctrlKey&&(t.stopPropagation(),t.preventDefault())}}var o=e.element;void 0!==window.onwheel?e.event.bind(o,"wheel",n):void 0!==window.onmousewheel&&e.event.bind(o,"mousewheel",n)},touch:function(e){function i(t,i){var r=Math.floor(h.scrollTop),l=h.scrollLeft,n=Math.abs(t),o=Math.abs(i);if(o>n){if(i<0&&r===e.contentHeight-e.containerHeight||i>0&&0===r)return 0===window.scrollY&&i>0&&L.isChrome}else if(n>o&&(t<0&&l===e.contentWidth-e.containerWidth||t>0&&0===l))return!0;return!0}function r(t,i){h.scrollTop-=i,h.scrollLeft-=t,R(e)}function l(t){return t.targetTouches?t.targetTouches[0]:t}function n(t){return!(t.pointerType&&"pen"===t.pointerType&&0===t.buttons||(!t.targetTouches||1!==t.targetTouches.length)&&(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE))}function o(t){if(n(t)){var e=l(t);u.pageX=e.pageX,u.pageY=e.pageY,d=(new Date).getTime(),null!==p&&clearInterval(p)}}function s(e,i,r){if(!h.contains(e))return!1;for(var l=e;l&&l!==h;){if(l.classList.contains(m.element.consuming))return!0;var n=t(l);if([n.overflow,n.overflowX,n.overflowY].join("").match(/(scroll|auto)/)){var o=l.scrollHeight-l.clientHeight;if(o>0&&!(0===l.scrollTop&&r>0||l.scrollTop===o&&r<0))return!0;var s=l.scrollLeft-l.clientWidth;if(s>0&&!(0===l.scrollLeft&&i<0||l.scrollLeft===s&&i>0))return!0}l=l.parentNode}return!1}function a(t){if(n(t)){var e=l(t),o={pageX:e.pageX,pageY:e.pageY},a=o.pageX-u.pageX,c=o.pageY-u.pageY;if(s(t.target,a,c))return;r(a,c),u=o;var h=(new Date).getTime(),p=h-d;p>0&&(f.x=a/p,f.y=c/p,d=h),i(a,c)&&t.preventDefault()}}function c(){e.settings.swipeEasing&&(clearInterval(p),p=setInterval(function(){e.isInitialized?clearInterval(p):f.x||f.y?Math.abs(f.x)<.01&&Math.abs(f.y)<.01?clearInterval(p):(r(30*f.x,30*f.y),f.x*=.8,f.y*=.8):clearInterval(p)},10))}if(L.supportsTouch||L.supportsIePointer){var h=e.element,u={},d=0,f={},p=null;L.supportsTouch?(e.event.bind(h,"touchstart",o),e.event.bind(h,"touchmove",a),e.event.bind(h,"touchend",c)):L.supportsIePointer&&(window.PointerEvent?(e.event.bind(h,"pointerdown",o),e.event.bind(h,"pointermove",a),e.event.bind(h,"pointerup",c)):window.MSPointerEvent&&(e.event.bind(h,"MSPointerDown",o),e.event.bind(h,"MSPointerMove",a),e.event.bind(h,"MSPointerUp",c)))}}},H=function(r,l){var n=this;if(void 0===l&&(l={}),"string"==typeof r&&(r=document.querySelector(r)),!r||!r.nodeName)throw new Error("no element is specified to initialize PerfectScrollbar");this.element=r,r.classList.add(m.main),this.settings={handlers:["click-rail","drag-thumb","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollingThreshold:1e3,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipeEasing:!0,useBothWheelAxes:!1,wheelPropagation:!0,wheelSpeed:1};for(var o in l)n.settings[o]=l[o];this.containerWidth=null,this.containerHeight=null,this.contentWidth=null,this.contentHeight=null;var s=function(){return r.classList.add(m.state.focus)},a=function(){return r.classList.remove(m.state.focus)};this.isRtl="rtl"===t(r).direction,this.isNegativeScroll=function(){var t=r.scrollLeft,e=null;return r.scrollLeft=-1,e=r.scrollLeft<0,r.scrollLeft=t,e}(),this.negativeScrollAdjustment=this.isNegativeScroll?r.scrollWidth-r.clientWidth:0,this.event=new y,this.ownerDocument=r.ownerDocument||document,this.scrollbarXRail=i(m.element.rail("x")),r.appendChild(this.scrollbarXRail),this.scrollbarX=i(m.element.thumb("x")),this.scrollbarXRail.appendChild(this.scrollbarX),this.scrollbarX.setAttribute("tabindex",0),this.event.bind(this.scrollbarX,"focus",s),this.event.bind(this.scrollbarX,"blur",a),this.scrollbarXActive=null,this.scrollbarXWidth=null,this.scrollbarXLeft=null;var c=t(this.scrollbarXRail);this.scrollbarXBottom=parseInt(c.bottom,10),isNaN(this.scrollbarXBottom)?(this.isScrollbarXUsingBottom=!1,this.scrollbarXTop=u(c.top)):this.isScrollbarXUsingBottom=!0,this.railBorderXWidth=u(c.borderLeftWidth)+u(c.borderRightWidth),e(this.scrollbarXRail,{display:"block"}),this.railXMarginWidth=u(c.marginLeft)+u(c.marginRight),e(this.scrollbarXRail,{display:""}),this.railXWidth=null,this.railXRatio=null,this.scrollbarYRail=i(m.element.rail("y")),r.appendChild(this.scrollbarYRail),this.scrollbarY=i(m.element.thumb("y")),this.scrollbarYRail.appendChild(this.scrollbarY),this.scrollbarY.setAttribute("tabindex",0),this.event.bind(this.scrollbarY,"focus",s),this.event.bind(this.scrollbarY,"blur",a),this.scrollbarYActive=null,this.scrollbarYHeight=null,this.scrollbarYTop=null;var h=t(this.scrollbarYRail);this.scrollbarYRight=parseInt(h.right,10),isNaN(this.scrollbarYRight)?(this.isScrollbarYUsingRight=!1,this.scrollbarYLeft=u(h.left)):this.isScrollbarYUsingRight=!0,this.scrollbarYOuterWidth=this.isRtl?f(this.scrollbarY):null,this.railBorderYWidth=u(h.borderTopWidth)+u(h.borderBottomWidth),e(this.scrollbarYRail,{display:"block"}),this.railYMarginHeight=u(h.marginTop)+u(h.marginBottom),e(this.scrollbarYRail,{display:""}),this.railYHeight=null,this.railYRatio=null,this.reach={x:r.scrollLeft<=0?"start":r.scrollLeft>=this.contentWidth-this.containerWidth?"end":null,y:r.scrollTop<=0?"start":r.scrollTop>=this.contentHeight-this.containerHeight?"end":null},this.isAlive=!0,this.settings.handlers.forEach(function(t){return T[t](n)}),this.lastScrollTop=Math.floor(r.scrollTop),this.lastScrollLeft=r.scrollLeft,this.event.bind(this.element,"scroll",function(t){return n.onScroll(t)}),R(this)};return H.prototype.update=function(){this.isAlive&&(this.negativeScrollAdjustment=this.isNegativeScroll?this.element.scrollWidth-this.element.clientWidth:0,e(this.scrollbarXRail,{display:"block"}),e(this.scrollbarYRail,{display:"block"}),this.railXMarginWidth=u(t(this.scrollbarXRail).marginLeft)+u(t(this.scrollbarXRail).marginRight),this.railYMarginHeight=u(t(this.scrollbarYRail).marginTop)+u(t(this.scrollbarYRail).marginBottom),e(this.scrollbarXRail,{display:"none"}),e(this.scrollbarYRail,{display:"none"}),R(this),W(this,"top",0,!1,!0),W(this,"left",0,!1,!0),e(this.scrollbarXRail,{display:""}),e(this.scrollbarYRail,{display:""}))},H.prototype.onScroll=function(t){this.isAlive&&(R(this),W(this,"top",this.element.scrollTop-this.lastScrollTop),W(this,"left",this.element.scrollLeft-this.lastScrollLeft),this.lastScrollTop=Math.floor(this.element.scrollTop),this.lastScrollLeft=this.element.scrollLeft)},H.prototype.destroy=function(){this.isAlive&&(this.event.unbindAll(),l(this.scrollbarX),l(this.scrollbarY),l(this.scrollbarXRail),l(this.scrollbarYRail),this.removePsClasses(),this.element=null,this.scrollbarX=null,this.scrollbarY=null,this.scrollbarXRail=null,this.scrollbarYRail=null,this.isAlive=!1)},H.prototype.removePsClasses=function(){this.element.className=this.element.className.split(" ").filter(function(t){return!t.match(/^ps([-_].+|)$/)}).join(" ")},H});
/*!
* screenfull
* v3.3.3 - 2018-09-04
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();

/*!
 DataTables 1.10.19
 ©2008-2018 SpryMedia Ltd - datatables.net/license
*/
(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(E){return h(E,window,document)}):"object"===typeof exports?module.exports=function(E,H){E||(E=window);H||(H="undefined"!==typeof window?require("jquery"):require("jquery")(E));return h(H,E,E.document)}:h(jQuery,window,document)})(function(h,E,H,k){function Z(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&Z(a[e])});a._hungarianMap=d}function J(a,b,c){a._hungarianMap||Z(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),J(a[d],b[d],c)):b[d]=b[e]})}function Ca(a){var b=n.defaults.oLanguage,c=b.sDecimal;c&&Da(c);if(a){var d=a.sZeroRecords;!a.sEmptyTable&&(d&&"No data available in table"===b.sEmptyTable)&&F(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(d&&"Loading..."===b.sLoadingRecords)&&F(a,
a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&c!==a&&Da(a)}}function fb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":
"");"boolean"===typeof a.scrollX&&(a.scrollX=a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&J(n.models.oSearch,a[b])}function gb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;"number"===typeof b&&!h.isArray(b)&&(a.aDataSort=[b])}function hb(a){if(!n.__browser){var b={};n.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:-1*h(E).scrollLeft(),height:1,width:1,
overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,n.__browser);a.oScroll.iBarWidth=n.__browser.barWidth}
function ib(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ea(a,b){var c=n.defaults.column,d=a.aoColumns.length,c=h.extend({},n.models.oColumn,c,{nTh:b?b:H.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},n.models.oSearch,c[d]);ka(a,d,h(b).data())}function ka(a,b,c){var b=a.aoColumns[b],
d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(gb(c),J(n.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),c.sClass&&e.addClass(c.sClass),h.extend(b,c),F(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),F(b,c,"aDataSort"));var g=b.mData,j=S(g),i=b.mRender?
S(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return N(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,
b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function $(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Fa(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&la(a);r(a,null,"column-sizing",[a])}function aa(a,b){var c=ma(a,"bVisible");return"number"===
typeof c[b]?c[b]:null}function ba(a,b){var c=ma(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function V(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function ma(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ga(a){var b=a.aoColumns,c=a.aoData,d=n.ext.type.detect,e,f,g,j,i,h,l,q,t;e=0;for(f=b.length;e<f;e++)if(l=b[e],t=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=d.length;g<
j;g++){i=0;for(h=c.length;i<h;i++){t[i]===k&&(t[i]=B(a,i,e,"type"));q=d[g](t[i],a);if(!q&&g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function jb(a,b,c,d){var e,f,g,j,i,m,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){m=b[e];var q=m.targets!==k?m.targets:m.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ea(a);d(q[f],m)}else if("number"===typeof q[f]&&0>q[f])d(l.length+q[f],m);else if("string"===
typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&d(j,m)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function O(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},n.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ha(a,e,c,d);return e}function na(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,
e){c=Ia(a,e);return O(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(K(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===i&&"display"==d?"":i}function kb(a,
b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}function Ja(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\\./g,".")})}function S(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=S(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||
-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ja(f);for(var i=0,m=j.length;i<m;i++){f=j[i].match(ca);g=j[i].match(W);if(f){j[i]=j[i].replace(ca,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(h.isArray(a)){i=0;for(m=a.length;i<m;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(W,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}
function N(a){if(h.isPlainObject(a))return N(a._);if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=Ja(e),f;f=e[e.length-1];for(var g,j,i=0,m=e.length-1;i<m;i++){g=e[i].match(ca);j=e[i].match(W);if(g){e[i]=e[i].replace(ca,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(h.isArray(d)){j=0;for(m=d.length;j<m;j++)f={},b(f,d[j],g),
a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(W,""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(W))a[f.replace(W,"")](d);else a[f.replace(ca,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ka(a){return D(a.aoData,"_aData")}function oa(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0;a.aIds={}}function pa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,
1)}function da(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ia(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;La(a,e)}}function Ia(a,b,c,d){var e=[],f=b.firstChild,g,
j,i=0,m,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],t=function(a,b){if("string"===typeof a){var c=a.indexOf("@");-1!==c&&(c=a.substring(c+1),N(a)(d,b.getAttribute(c)))}},G=function(a){if(c===k||c===i)j=l[i],m=h.trim(a.innerHTML),j&&j._bAttrSrc?(N(j.mData._)(d,m),t(j.mData.sort,a),t(j.mData.type,a),t(j.mData.filter,a)):q?(j._setter||(j._setter=N(j.mData)),j._setter(d,m)):d[i]=m;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)G(f),e.push(f);f=f.nextSibling}else{e=b.anCells;
f=0;for(g=e.length;f<g;f++)G(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&N(a.rowId)(d,b);return{data:d,cells:e}}function Ha(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,m,l,q;if(null===e.nTr){j=c||H.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;La(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){m=a.aoColumns[l];i=c?d[l]:H.createElement(m.sCellType);i._DT_CellIndex={row:b,column:l};g.push(i);if((!c||m.mRender||m.mData!==l)&&(!h.isPlainObject(m.mData)||m.mData._!==l+".display"))i.innerHTML=
B(a,b,l,"display");m.sClass&&(i.className+=" "+m.sClass);m.bVisible&&!c?j.appendChild(i):!m.bVisible&&c&&i.parentNode.removeChild(i);m.fnCreatedCell&&m.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}r(a,"aoRowCreatedCallback",null,[j,f,b,g])}e.nTr.setAttribute("role","row")}function La(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?qa(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function lb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,m=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Ma(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Na(a,"header")(a,d,
f,m);i&&ea(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(m.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(m.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function fa(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,m;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=
0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(m=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+m]!==k&&g[d][f].cell==g[d][f+m].cell;){for(c=0;c<i;c++)j[d+c][f+m]=1;m++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",m)}}}}function P(a){var b=r(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=
d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,m=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!mb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:m;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ha(a,l);var t=q.nTr;if(0!==e){var G=d[c%e];q._sRowStripe!=G&&(h(t).removeClass(q._sRowStripe).addClass(G),
q._sRowStripe=G)}r(a,"aoRowCallback",null,[t,q._aData,c,j,l]);b.push(t);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:V(a),"class":a.oClasses.sRowEmpty}).html(c))[0];r(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ka(a),g,m,i]);r(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ka(a),g,m,i]);d=h(a.nTBody);d.children().detach();
d.append(h(b));r(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;c.bSort&&nb(a);d?ga(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;P(a);a._drawHold=!1}function ob(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=
a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,m,l,q,k=0;k<f.length;k++){g=null;j=f[k];if("<"==j){i=h("<div/>")[0];m=f[k+1];if("'"==m||'"'==m){l="";for(q=2;f[k+q]!=m;)l+=f[k+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(m=l.split("."),i.id=m[0].substr(1,m[0].length-1),i.className=m[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;k+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=pb(a);else if("f"==j&&
d.bFilter)g=qb(a);else if("r"==j&&d.bProcessing)g=rb(a);else if("t"==j)g=sb(a);else if("i"==j&&d.bInfo)g=tb(a);else if("p"==j&&d.bPaginate)g=ub(a);else if(0!==n.ext.feature.length){i=n.ext.feature;q=0;for(m=i.length;q<m;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function ea(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,m,l,q,k;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<
i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;m=g;k=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][m+j]={cell:e,unique:k},a[f+g].nTr=d}e=e.nextSibling}}}function ra(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],ea(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||
!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function sa(a,b,c){r(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,i=function(b){r(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var m="function"===typeof f?f(b,a):f,b="function"===typeof f&&m?m:h.extend(!0,b,m);delete g.data}m={data:b,success:function(b){var c=
b.error||b.sError;c&&K(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=r(a,null,"xhr",[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?K(a,0,"Invalid JSON response",1):4===b.readyState&&K(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;r(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(m,{url:g||a.sAjaxSource})):
"function"===typeof g?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(m,g)),g.data=f)}function mb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,!0),sa(a,vb(a),function(b){wb(a,b)}),!1):!0}function vb(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,m,l,k=X(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var t=function(a,b){j.push({name:a,value:b})};t("sEcho",a.iDraw);t("iColumns",c);t("sColumns",D(b,"sName").join(","));t("iDisplayStart",g);t("iDisplayLength",
i);var G={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)m=b[g],l=f[g],i="function"==typeof m.mData?"function":m.mData,G.columns.push({data:i,name:m.sName,searchable:m.bSearchable,orderable:m.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),t("mDataProp_"+g,i),d.bFilter&&(t("sSearch_"+g,l.sSearch),t("bRegex_"+g,l.bRegex),t("bSearchable_"+g,m.bSearchable)),d.bSort&&t("bSortable_"+g,m.bSortable);d.bFilter&&(t("sSearch",e.sSearch),t("bRegex",
e.bRegex));d.bSort&&(h.each(k,function(a,b){G.order.push({column:b.col,dir:b.dir});t("iSortCol_"+a,b.col);t("sSortDir_"+a,b.dir)}),t("iSortingCols",k.length));b=n.ext.legacy.ajax;return null===b?a.sAjaxSource?j:G:b?j:G}function wb(a,b){var c=ta(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d){if(1*d<a.iDraw)return;a.iDraw=1*d}oa(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,
10);d=0;for(e=c.length;d<e;d++)O(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;P(a);a._bInitComplete||ua(a,b);a.bAjaxDataGet=!0;C(a,!1)}function ta(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?S(c)(b):b}function qb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",
g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?"":this.value;b!=e.sSearch&&(ga(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,P(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",g?Oa(f,g):f).on("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",
c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==H.activeElement&&i.val(e.sSearch)}catch(d){}});return b[0]}function ga(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ga(a);if("ssp"!=y(a)){xb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)yb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,
e[b].bSmart,e[b].bCaseInsensitive);zb(a)}else f(b);a.bFiltered=!0;r(a,null,"search",[a])}function zb(a){for(var b=n.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,m=c.length;i<m;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function yb(a,b,c,d,e,f){if(""!==b){for(var g=[],j=a.aiDisplay,d=Pa(b,d,e,f),e=0;e<j.length;e++)b=a.aoData[j[e]]._aFilterData[c],d.test(b)&&g.push(j[e]);a.aiDisplay=g}}function xb(a,b,c,d,e,f){var d=Pa(b,
d,e,f),f=a.oPreviousSearch.sSearch,g=a.aiDisplayMaster,j,e=[];0!==n.ext.search.length&&(c=!0);j=Ab(a);if(0>=b.length)a.aiDisplay=g.slice();else{if(j||c||f.length>b.length||0!==b.indexOf(f)||a.bSorted)a.aiDisplay=g.slice();b=a.aiDisplay;for(c=0;c<b.length;c++)d.test(a.aoData[b[c]]._sFilterRow)&&e.push(b[c]);a.aiDisplay=e}}function Pa(a,b,c,d){a=b?a:Qa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',
"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function Ab(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=n.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(va.innerHTML=i,i=Wb?va.textContent:va.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);
h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Bb(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function Cb(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function tb(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Db,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",
b+"_info"));return d[0]}function Db(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Eb(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Eb(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,
c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ha(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){ob(a);lb(a);fa(a,a.aoHeader);fa(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Fa(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=v(f.sWidth));r(a,null,"preInit",[a]);T(a);e=
y(a);if("ssp"!=e||g)"ajax"==e?sa(a,[],function(c){var f=ta(a,c);for(b=0;b<f.length;b++)O(a,f[b]);a.iInitDisplayStart=d;T(a);C(a,!1);ua(a,c)},a):(C(a,!1),ua(a))}else setTimeout(function(){ha(a)},200)}function ua(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&$(a);r(a,null,"plugin-init",[a,b]);r(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);r(a,null,"length",[a,c])}function pb(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=
e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option("number"===typeof d[g]?a.fnFormatNumber(d[g]):d[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).on("change.DT",function(){Ra(a,h(this).val());P(a)});h(a.nTable).on("length.dt.DT",function(b,c,d){a===
c&&h("select",i).val(d)});return i[0]}function ub(a){var b=a.sPaginationType,c=n.ext.pager[b],d="function"===typeof c,e=function(a){P(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Na(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,
e)},sName:"pagination"}));return b}function Ta(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:K(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(r(a,null,"page",[a]),c&&P(a));return b}function rb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}
function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");r(a,null,"processing",[a,b])}function sb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),m=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",
position:"relative",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:v(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",
{"class":f.sScrollFootInner}).append(m.removeAttr("id").css("margin-left",0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=i.children(),k=b[0],f=b[1],t=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(t.scrollLeft=a)});h(f).css(e&&c.bCollapse?"max-height":"height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=t;a.aoDrawCallback.push({fn:la,sName:"scrolling"});return i[0]}function la(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,
f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,m=j.children("table"),j=a.nScrollBody,l=h(j),q=j.style,t=h(a.nScrollFoot).children("div"),n=t.children("table"),o=h(a.nTHead),p=h(a.nTable),s=p[0],r=s.style,u=a.nTFoot?h(a.nTFoot):null,x=a.oBrowser,U=x.bScrollOversize,Xb=D(a.aoColumns,"nTh"),Q,L,R,w,Ua=[],y=[],z=[],A=[],B,C=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};L=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==
L&&a.scrollBarVis!==k)a.scrollBarVis=L,$(a);else{a.scrollBarVis=L;p.children("thead, tfoot").remove();u&&(R=u.clone().prependTo(p),Q=u.find("tr"),R=R.find("tr"));w=o.clone().prependTo(p);o=o.find("tr");L=w.find("tr");w.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(ra(a,w),function(b,c){B=aa(a,b);c.style.width=a.aoColumns[B].sWidth});u&&I(function(a){a.style.width=""},R);f=p.outerWidth();if(""===c){r.width="100%";if(U&&(p.find("tbody").height()>j.offsetHeight||
"scroll"==l.css("overflow-y")))r.width=v(p.outerWidth()-b);f=p.outerWidth()}else""!==d&&(r.width=v(d),f=p.outerWidth());I(C,L);I(function(a){z.push(a.innerHTML);Ua.push(v(h(a).css("width")))},L);I(function(a,b){if(h.inArray(a,Xb)!==-1)a.style.width=Ua[b]},o);h(L).height(0);u&&(I(C,R),I(function(a){A.push(a.innerHTML);y.push(v(h(a).css("width")))},R),I(function(a,b){a.style.width=y[b]},Q),h(R).height(0));I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+z[b]+"</div>";a.childNodes[0].style.height=
"0";a.childNodes[0].style.overflow="hidden";a.style.width=Ua[b]},L);u&&I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+A[b]+"</div>";a.childNodes[0].style.height="0";a.childNodes[0].style.overflow="hidden";a.style.width=y[b]},R);if(p.outerWidth()<f){Q=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(U&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=v(Q-b);(""===c||""!==d)&&K(a,1,"Possible column misalignment",6)}else Q="100%";q.width=v(Q);
g.width=v(Q);u&&(a.nScrollFoot.style.width=v(Q));!e&&U&&(q.height=v(s.offsetHeight+b));c=p.outerWidth();m[0].style.width=v(c);i.width=v(c);d=p.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+(x.bScrollbarLeft?"Left":"Right");i[e]=d?b+"px":"0px";u&&(n[0].style.width=v(c),t[0].style.width=v(c),t[0].style[e]=d?b+"px":"0px");p.children("colgroup").insertBefore(p.children("thead"));l.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function I(a,b,c){for(var d=0,e=0,
f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Fa(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,j=c.length,i=ma(a,"bVisible"),m=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,t=!1,n,o,p=a.oBrowser,d=p.bScrollOversize;(n=b.style.width)&&-1!==n.indexOf("%")&&(l=n);for(n=0;n<i.length;n++)o=c[i[n]],null!==o.sWidth&&(o.sWidth=Fb(o.sWidthOrig,k),t=!0);if(d||
!t&&!f&&!e&&j==V(a)&&j==m.length)for(n=0;n<j;n++)i=aa(a,n),null!==i&&(c[i].sWidth=v(m.eq(n).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var s=h("<tr/>").appendTo(j.find("tbody"));j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");m=ra(a,j.find("thead")[0]);for(n=0;n<i.length;n++)o=c[i[n]],m[n].style.width=null!==o.sWidthOrig&&""!==o.sWidthOrig?v(o.sWidthOrig):
"",o.sWidthOrig&&f&&h(m[n]).append(h("<div/>").css({width:o.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(n=0;n<i.length;n++)t=i[n],o=c[t],h(Gb(a,t)).clone(!1).append(o.sContentPadding).appendTo(s);h("[name]",j).removeAttr("name");o=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):
l&&j.width(l);for(n=e=0;n<i.length;n++)k=h(m[n]),g=k.outerWidth()-k.width(),k=p.bBounding?Math.ceil(m[n].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[n]].sWidth=v(k-g);b.style.width=v(e);o.remove()}l&&(b.style.width=v(l));if((l||f)&&!a._reszEvt)b=function(){h(E).on("resize.DT-"+a.sInstance,Oa(function(){$(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Fb(a,b){if(!a)return 0;var c=h("<div/>").css("width",v(a)).appendTo(b||H.body),d=c[0].offsetWidth;c.remove();return d}function Gb(a,
b){var c=Hb(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Hb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace(Yb,""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function v(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function X(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var m=[];f=function(a){a.length&&
!h.isArray(a[0])?m.push(a):h.merge(m,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<m.length;a++){i=m[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||"string",m[a]._idx===k&&(m[a]._idx=h.inArray(m[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:m[a][1],index:m[a]._idx,type:j,formatter:n.ext.type.order[j+"-pre"]})}return d}function nb(a){var b,c,d=[],e=n.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ga(a);h=X(a);b=0;for(c=h.length;b<
c;b++)j=h[b],j.formatter&&g++,Ib(a,j.col);if("ssp"!=y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,n=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=k[j.col],e=n[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,n=f[a]._aSortData,o=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=n[i.col],g=o[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],
c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Jb(a){for(var b,c,d=a.aoColumns,e=X(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Va(a,
b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,D(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==
typeof d&&d(a)}function Ma(a,b,c,d){var e=a.aoColumns[c];Wa(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Va(a,c,b.shiftKey,d);"ssp"!==y(a)&&C(a,!1)},0)):Va(a,c,b.shiftKey,d))})}function wa(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=X(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(D(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(D(a.aoData,"anCells",g)).addClass(c+
(2>e?e+1:3))}a.aLastSort=d}function Ib(a,b){var c=a.aoColumns[b],d=n.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,ba(a,b)));for(var f,g=n.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function xa(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Bb(a.oPreviousSearch),
columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:Bb(a.aoPreSearchCols[d])}})};r(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Kb(a,b,c){var d,e,f=a.aoColumns,b=function(b){if(b&&b.time){var g=r(a,"aoStateLoadParams","stateLoadParams",[a,b]);if(-1===h.inArray(!1,g)&&(g=a.iStateDuration,!(0<g&&b.time<+new Date-1E3*g)&&!(b.columns&&f.length!==b.columns.length))){a.oLoadedState=h.extend(!0,{},b);b.start!==k&&
(a._iDisplayStart=b.start,a.iInitDisplayStart=b.start);b.length!==k&&(a._iDisplayLength=b.length);b.order!==k&&(a.aaSorting=[],h.each(b.order,function(b,c){a.aaSorting.push(c[0]>=f.length?[0,c[1]]:c)}));b.search!==k&&h.extend(a.oPreviousSearch,Cb(b.search));if(b.columns){d=0;for(e=b.columns.length;d<e;d++)g=b.columns[d],g.visible!==k&&(f[d].bVisible=g.visible),g.search!==k&&h.extend(a.aoPreSearchCols[d],Cb(g.search))}r(a,"aoStateLoaded","stateLoaded",[a,b])}}c()};if(a.oFeatures.bStateSave){var g=
a.fnStateLoadCallback.call(a.oInstance,a,b);g!==k&&b(g)}else c()}function ya(a){var b=n.settings,a=h.inArray(a,D(b,"nTable"));return-1!==a?b[a]:null}function K(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+d);if(b)E.console&&console.log&&console.log(c);else if(b=n.ext,b=b.sErrMode||b.errMode,a&&r(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==
typeof b&&b(a,d,c)}}function F(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?F(a,b,d[0],d[1]):F(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Xa(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==e&&h.isArray(d)?d.slice():d);return a}function Wa(a,b,c){h(a).on("click.DT",b,function(b){h(a).blur();c(b)}).on("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).on("selectstart.DT",
function(){return!1})}function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function r(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Sa(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Na(a,b){var c=a.renderer,d=n.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===
typeof c?d[c]||d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ia(a,b){var c=[],c=Lb.numbers_length,d=Math.floor(c/2);b<=c?c=Y(0,b):a<=d?(c=Y(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=Y(b-(c-2),b):(c=Y(a-d+2,a+d-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function Da(a){h.each({num:function(b){return za(b,a)},"num-fmt":function(b){return za(b,a,Ya)},"html-num":function(b){return za(b,
a,Aa)},"html-num-fmt":function(b){return za(b,a,Aa,Ya)}},function(b,c){x.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(x.type.search[b+a]=x.type.search.html)})}function Mb(a){return function(){var b=[ya(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return n.ext.internal[a].apply(this,b)}}var n=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new s(ya(this[x.iApiIndex])):new s(this)};
this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):(""!==d.sX||""!==d.sY)&&la(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,
b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():
c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};
this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return ya(this[x.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();
(d===k||d)&&h.draw();return 0};this.fnVersionCheck=x.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=x.internal;for(var e in n.ext.internal)e&&(this[e]=Mb(e));this.each(function(){var e={},g=1<d?Xa(e,a,!0):a,j=0,i,e=this.getAttribute("id"),m=!1,l=n.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())K(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{fb(l);gb(l.column);J(l,l,!0);J(l.column,l.column,!0);J(l,h.extend(g,q.data()));var t=n.settings,
j=0;for(i=t.length;j<i;j++){var o=t[j];if(o.nTable==this||o.nTHead&&o.nTHead.parentNode==this||o.nTFoot&&o.nTFoot.parentNode==this){var s=g.bRetrieve!==k?g.bRetrieve:l.bRetrieve;if(c||s)return o.oInstance;if(g.bDestroy!==k?g.bDestroy:l.bDestroy){o.oInstance.fnDestroy();break}else{K(o,0,"Cannot reinitialise DataTable",3);return}}if(o.sTableId==this.id){t.splice(j,1);break}}if(null===e||""===e)this.id=e="DataTables_Table_"+n.ext._unique++;var p=h.extend(!0,{},n.models.oSettings,{sDestroyWidth:q[0].style.width,
sInstance:e,sTableId:e});p.nTable=this;p.oApi=b.internal;p.oInit=g;t.push(p);p.oInstance=1===b.length?b:q.dataTable();fb(g);Ca(g.oLanguage);g.aLengthMenu&&!g.iDisplayLength&&(g.iDisplayLength=h.isArray(g.aLengthMenu[0])?g.aLengthMenu[0][0]:g.aLengthMenu[0]);g=Xa(h.extend(!0,{},l),g);F(p.oFeatures,g,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));F(p,g,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod",
"aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]);F(p.oScroll,g,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);F(p.oLanguage,g,"fnInfoCallback");
z(p,"aoDrawCallback",g.fnDrawCallback,"user");z(p,"aoServerParams",g.fnServerParams,"user");z(p,"aoStateSaveParams",g.fnStateSaveParams,"user");z(p,"aoStateLoadParams",g.fnStateLoadParams,"user");z(p,"aoStateLoaded",g.fnStateLoaded,"user");z(p,"aoRowCallback",g.fnRowCallback,"user");z(p,"aoRowCreatedCallback",g.fnCreatedRow,"user");z(p,"aoHeaderCallback",g.fnHeaderCallback,"user");z(p,"aoFooterCallback",g.fnFooterCallback,"user");z(p,"aoInitComplete",g.fnInitComplete,"user");z(p,"aoPreDrawCallback",
g.fnPreDrawCallback,"user");p.rowIdFn=S(g.rowId);hb(p);var u=p.oClasses;h.extend(u,n.ext.classes,g.oClasses);q.addClass(u.sTable);p.iInitDisplayStart===k&&(p.iInitDisplayStart=g.iDisplayStart,p._iDisplayStart=g.iDisplayStart);null!==g.iDeferLoading&&(p.bDeferLoading=!0,e=h.isArray(g.iDeferLoading),p._iRecordsDisplay=e?g.iDeferLoading[0]:g.iDeferLoading,p._iRecordsTotal=e?g.iDeferLoading[1]:g.iDeferLoading);var v=p.oLanguage;h.extend(!0,v,g.oLanguage);v.sUrl&&(h.ajax({dataType:"json",url:v.sUrl,success:function(a){Ca(a);
J(l.oLanguage,a);h.extend(true,v,a);ha(p)},error:function(){ha(p)}}),m=!0);null===g.asStripeClasses&&(p.asStripeClasses=[u.sStripeOdd,u.sStripeEven]);var e=p.asStripeClasses,x=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(e,function(a){return x.hasClass(a)}))&&(h("tbody tr",this).removeClass(e.join(" ")),p.asDestroyStripes=e.slice());e=[];t=this.getElementsByTagName("thead");0!==t.length&&(ea(p.aoHeader,t[0]),e=ra(p));if(null===g.aoColumns){t=[];j=0;for(i=e.length;j<i;j++)t.push(null)}else t=
g.aoColumns;j=0;for(i=t.length;j<i;j++)Ea(p,e?e[j]:null);jb(p,g.aoColumnDefs,t,function(a,b){ka(p,a,b)});if(x.length){var w=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(x[0]).children("th, td").each(function(a,b){var c=p.aoColumns[a];if(c.mData===a){var d=w(b,"sort")||w(b,"order"),e=w(b,"filter")||w(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ka(p,a)}}})}var U=p.oFeatures,
e=function(){if(g.aaSorting===k){var a=p.aaSorting;j=0;for(i=a.length;j<i;j++)a[j][1]=p.aoColumns[j].asSorting[0]}wa(p);U.bSort&&z(p,"aoDrawCallback",function(){if(p.bSorted){var a=X(p),b={};h.each(a,function(a,c){b[c.src]=c.dir});r(p,null,"order",[p,a,b]);Jb(p)}});z(p,"aoDrawCallback",function(){(p.bSorted||y(p)==="ssp"||U.bDeferRender)&&wa(p)},"sc");var a=q.children("caption").each(function(){this._captionSide=h(this).css("caption-side")}),b=q.children("thead");b.length===0&&(b=h("<thead/>").appendTo(q));
p.nTHead=b[0];b=q.children("tbody");b.length===0&&(b=h("<tbody/>").appendTo(q));p.nTBody=b[0];b=q.children("tfoot");if(b.length===0&&a.length>0&&(p.oScroll.sX!==""||p.oScroll.sY!==""))b=h("<tfoot/>").appendTo(q);if(b.length===0||b.children().length===0)q.addClass(u.sNoFooter);else if(b.length>0){p.nTFoot=b[0];ea(p.aoFooter,p.nTFoot)}if(g.aaData)for(j=0;j<g.aaData.length;j++)O(p,g.aaData[j]);else(p.bDeferLoading||y(p)=="dom")&&na(p,h(p.nTBody).children("tr"));p.aiDisplay=p.aiDisplayMaster.slice();
p.bInitialised=true;m===false&&ha(p)};g.bStateSave?(U.bStateSave=!0,z(p,"aoDrawCallback",xa,"state_save"),Kb(p,g,e)):e()}});b=null;return this},x,s,o,u,Za={},Nb=/[\r\n]/g,Aa=/<.*?>/g,Zb=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,$b=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Ya=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Ob=function(a){var b=parseInt(a,10);return!isNaN(b)&&
isFinite(a)?b:null},Pb=function(a,b){Za[b]||(Za[b]=RegExp(Qa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace(Za[b],"."):a},$a=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Pb(a,b));c&&d&&(a=a.replace(Ya,""));return!isNaN(parseFloat(a))&&isFinite(a)},Qb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:$a(a.replace(Aa,""),b,c)?!0:null},D=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<
f;e++)a[e]&&d.push(a[e][b]);return d},ja=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},Y=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Rb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},qa=function(a){var b;a:{if(!(2>a.length)){b=a.slice().sort();for(var c=b[0],d=1,e=b.length;d<e;d++){if(b[d]===c){b=!1;break a}c=b[d]}}b=!0}if(b)return a.slice();
b=[];var e=a.length,f,g=0,d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b};n.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=this,g=+new Date,j=arguments;d&&g<d+c?(clearTimeout(e),e=setTimeout(function(){d=k;a.apply(b,j)},c)):(d=g,a.apply(b,j))}},escapeRegex:function(a){return a.replace($b,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ca=/\[.*?\]$/,W=/\(\)$/,Qa=n.util.escapeRegex,va=h("<div>")[0],Wb=va.textContent!==k,Yb=
/<.*?>/g,Oa=n.util.throttle,Sb=[],w=Array.prototype,ac=function(a){var b,c,d=n.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};s=function(a,b){if(!(this instanceof
s))return new s(a,b);var c=[],d=function(a){(a=ac(a))&&(c=c.concat(a))};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=qa(c);b&&h.merge(this,b);this.selector={rows:null,cols:null,opts:null};s.extend(this,this,Sb)};n.Api=s;h.extend(s.prototype,{any:function(){return 0!==this.count()},concat:w.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=
this.context;return b.length>a?new s(b[a],this[a]):null},filter:function(a){var b=[];if(w.filter)b=w.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new s(this.context,b)},flatten:function(){var a=[];return new s(this.context,a.concat.apply(a,this.toArray()))},join:w.join,indexOf:w.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,j,h,m,l=this.context,
n,o,u=this.selector;"string"===typeof a&&(d=c,c=b,b=a,a=!1);g=0;for(j=l.length;g<j;g++){var r=new s(l[g]);if("table"===b)f=c.call(r,l[g],g),f!==k&&e.push(f);else if("columns"===b||"rows"===b)f=c.call(r,l[g],this[g],g),f!==k&&e.push(f);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b){o=this[g];"column-rows"===b&&(n=Ba(l[g],u.opts));h=0;for(m=o.length;h<m;h++)f=o[h],f="cell"===b?c.call(r,l[g],f.row,f.column,g,h):c.call(r,l[g],f,g,h,n),f!==k&&e.push(f)}}return e.length||d?(a=new s(l,a?
e.concat.apply([],e):e),b=a.selector,b.rows=u.rows,b.cols=u.cols,b.opts=u.opts,a):this},lastIndexOf:w.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(w.map)b=w.map.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new s(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:w.pop,push:w.push,reduce:w.reduce||function(a,b){return ib(this,a,b,0,this.length,
1)},reduceRight:w.reduceRight||function(a,b){return ib(this,a,b,this.length-1,-1,-1)},reverse:w.reverse,selector:null,shift:w.shift,slice:function(){return new s(this.context,this)},sort:w.sort,splice:w.splice,toArray:function(){return w.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new s(this.context,qa(this))},unshift:w.unshift});s.extend=function(a,b,c){if(c.length&&b&&(b instanceof s||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=
b.apply(a,arguments);s.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,s.extend(a,b[f.name],f.propExt)}};s.register=o=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<d;c++)s.register(a[c],b);else for(var e=a.split("."),f=Sb,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var m=f.length;i<m;i++)if(f[i].name===g){i=
f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:i.propExt}};s.registerPlural=u=function(a,b,c){s.register(a,c);s.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof s?a.length?h.isArray(a[0])?new s(a.context,a[0]):a[0]:k:a})};o("tables()",function(a){var b;if(a){b=s;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,
d);return c[a]}).toArray();b=new b(a)}else b=this;return b});o("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new s(b[0]):a});u("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});u("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)});u("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});u("tables().footer()",
"table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});u("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});o("draw()",function(a){return this.iterator("table",function(b){"page"===a?P(b):("string"===typeof a&&(a="full-hold"===a?!1:!0),T(b,!1===a))})});o("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});o("page.info()",function(){if(0===
this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,serverSide:"ssp"===y(a)}});o("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ra(b,a)})});var Tb=function(a,b,c){if(c){var d=new s(a);
d.one("draw",function(){c(d.ajax.json())})}if("ssp"==y(a))T(a,b);else{C(a,!0);var e=a.jqXHR;e&&4!==e.readyState&&e.abort();sa(a,[],function(c){oa(a);for(var c=ta(a,c),d=0,e=c.length;d<e;d++)O(a,c[d]);T(a,b);C(a,!1)})}};o("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});o("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});o("ajax.reload()",function(a,b){return this.iterator("table",function(c){Tb(c,!1===b,a)})});o("ajax.url()",function(a){var b=
this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});o("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Tb(c,!1===b,a)})});var ab=function(a,b,c,d,e){var f=[],g,j,i,m,l,n;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(m=b.length;i<m;i++){j=b[i]&&b[i].split&&!b[i].match(/[\[\(:]/)?b[i].split(","):
[b[i]];l=0;for(n=j.length;l<n;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&(f=f.concat(g))}a=x.selector[a];if(a.length){i=0;for(m=a.length;i<m;i++)f=a[i](d,e,f)}return qa(f)},bb=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",page:"all"},a)},cb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ba=function(a,b){var c,
d,e,f=[],g=a.aiDisplay;e=a.aiDisplayMaster;var j=b.search;c=b.order;d=b.page;if("ssp"==y(a))return"removed"===j?[]:Y(0,e.length);if("current"==d){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==c||"applied"==c)if("none"==j)f=e.slice();else if("applied"==j)f=g.slice();else{if("removed"==j){var i={};c=0;for(d=g.length;c<d;c++)i[g[c]]=null;f=h.map(e,function(a){return!i.hasOwnProperty(a)?a:null})}}else if("index"==c||"original"==c){c=0;for(d=a.aoData.length;c<d;c++)"none"==
j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};o("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=b,f;return ab("row",a,function(a){var b=Ob(a),i=c.aoData;if(b!==null&&!e)return[b];f||(f=Ba(c,e));if(b!==null&&h.inArray(b,f)!==-1)return[b];if(a===null||a===k||a==="")return f;if(typeof a==="function")return h.map(f,function(b){var c=i[b];return a(b,c._aData,c.nTr)?b:null});if(a.nodeName){var b=
a._DT_RowIndex,m=a._DT_CellIndex;if(b!==k)return i[b]&&i[b].nTr===a?[b]:[];if(m)return i[m.row]&&i[m.row].nTr===a?[m.row]:[];b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){b=c.aIds[a.replace(/^#/,"")];if(b!==k)return[b.idx]}b=Rb(ja(c.aoData,f,"nTr"));return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});o("rows().nodes()",function(){return this.iterator("row",
function(a,b){return a.aoData[b].nTr||k},1)});o("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ja(a.aoData,b,"_aData")},1)});u("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)});u("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){da(b,c,a)})});u("rows().indexes()","row().index()",function(){return this.iterator("row",
function(a,b){return b},1)});u("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0===a?"#":"")+h)}return new s(c,b)});u("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,m,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++)if(i=e[g],l=i.anCells,null!==i.nTr&&(i.nTr._DT_RowIndex=g),null!==l){i=0;for(m=
l.length;i<m;i++)l[i]._DT_CellIndex.row=g}pa(b.aiDisplayMaster,c);pa(b.aiDisplay,c);pa(a[d],c,!1);0<b._iRecordsDisplay&&b._iRecordsDisplay--;Sa(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});o("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(na(b,c)[0]):h.push(O(b,c));return h},
1),c=this.rows(-1);c.pop();h.merge(c,b);return c});o("row()",function(a,b){return cb(this.rows(a,b))});o("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;var c=b[0].aoData[this[0]];c._aData=a;h.isArray(a)&&c.nTr.id&&N(b[0].rowId)(a,c.nTr.id);da(b[0],this[0],"data");return this});o("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});o("row.add()",function(a){a instanceof h&&
a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?na(b,a)[0]:O(b,a)});return this.row(b[0])});var db=function(a,b){var c=a.context;if(c.length&&(c=c[0].aoData[b!==k?b:a[0]])&&c._details)c._details.remove(),c._detailsShow=k,c._details=k},Ub=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();var e=c[0],f=new s(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
0<D(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=V(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&db(f,c)}))}}};o("row().child()",function(a,b){var c=
this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)db(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?e.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=V(d),e.push(c[0]))};f(a,b);c._details&&c._details.detach();c._details=h(e);
c._detailsShow&&c._details.insertAfter(c.nTr)}return this});o(["row().child.show()","row().child().show()"],function(){Ub(this,!0);return this});o(["row().child.hide()","row().child().hide()"],function(){Ub(this,!1);return this});o(["row().child.remove()","row().child().remove()"],function(){db(this);return this});o("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var bc=/^([^:]+):(name|visIdx|visible)$/,Vb=function(a,b,
c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));return c};o("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,j=D(g,"sName"),i=D(g,"nTh");return ab("column",e,function(a){var b=Ob(a);if(a==="")return Y(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=Ba(c,f);return h.map(g,function(b,f){return a(f,Vb(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(bc):
"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var n=h.map(g,function(a,b){return a.bVisible?b:null});return[n[n.length+b]]}return[aa(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},
1);c.selector.cols=a;c.selector.opts=b;return c});u("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});u("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});u("columns().data()","column().data()",function(){return this.iterator("column-rows",Vb,1)});u("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},
1)});u("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ja(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});u("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ja(a.aoData,e,"anCells",b)},1)});u("columns().visible()","column().visible()",function(a,b){var c=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var f=b.aoColumns,g=f[c],j=b.aoData,
i,m,l;if(a!==k&&g.bVisible!==a){if(a){var n=h.inArray(!0,D(f,"bVisible"),c+1);i=0;for(m=j.length;i<m;i++)l=j[i].nTr,f=j[i].anCells,l&&l.insertBefore(f[c],f[n]||null)}else h(D(b.aoData,"anCells",c)).detach();g.bVisible=a;fa(b,b.aoHeader);fa(b,b.aoFooter);b.aiDisplay.length||h(b.nTBody).find("td[colspan]").attr("colspan",V(b));xa(b)}});a!==k&&(this.iterator("column",function(c,e){r(c,null,"column-visibility",[c,e,a,b])}),(b===k||b)&&this.columns.adjust());return c});u("columns().indexes()","column().index()",
function(a){return this.iterator("column",function(b,c){return"visible"===a?ba(b,c):c},1)});o("columns.adjust()",function(){return this.iterator("table",function(a){$(a)},1)});o("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return aa(c,b);if("fromData"===a||"toVisible"===a)return ba(c,b)}});o("column()",function(a,b){return cb(this.columns(a,b))});o("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));
h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=bb(c),f=b.aoData,g=Ba(b,e),j=Rb(ja(f,g,"anCells")),i=h([].concat.apply([],j)),l,m=b.aoColumns.length,n,o,u,s,r,v;return ab("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){n=[];o=0;for(u=g.length;o<u;o++){l=g[o];for(s=0;s<m;s++){r={row:l,column:s};if(c){v=f[l];a(r,B(b,l,s),v.anCells?v.anCells[s]:null)&&n.push(r)}else n.push(r)}}return n}if(h.isPlainObject(a))return a.column!==
k&&a.row!==k&&h.inArray(a.row,g)!==-1?[a]:[];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||!a.nodeName)return c;v=h(a).closest("*[data-dt-row]");return v.length?[{row:v.data("dt-row"),column:v.data("dt-column")}]:[]},b,e)});var d=this.columns(b),e=this.rows(a),f,g,j,i,m;this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(m=d[b].length;i<m;i++)f.push({row:e[b][g],column:d[b][i]})}},1);var l=this.cells(f,
c);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});u("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&a.anCells?a.anCells[c]:k},1)});o("cells().data()",function(){return this.iterator("cell",function(a,b,c){return B(a,b,c)},1)});u("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});u("cells().render()","cell().render()",
function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});u("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:ba(a,c)}},1)});u("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){da(b,c,a,d)})});o("cell()",function(a,b,c){return cb(this.cells(a,b,c))});o("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],
c[0].row,c[0].column):k;kb(b[0],c[0].row,c[0].column,a);da(b[0],c[0].row,"data",c[0].column);return this});o("order()",function(a,b){var c=this.context;if(a===k)return 0!==c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:a.length&&!h.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});o("order.listener()",function(a,b,c){return this.iterator("table",function(d){Ma(d,a,b,c)})});o("order.fixed()",function(a){if(!a){var b=
this.context,b=b.length?b[0].aaSortingFixed:k;return h.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(!0,{},a)})});o(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});o("search()",function(a,b,c,d){var e=this.context;return a===k?0!==e.length?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&ga(e,
h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),1)})});u("columns().search()","column().search()",function(a,b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),ga(e,e.oPreviousSearch,1))})});o("state()",function(){return this.context.length?this.context[0].oSavedState:
null});o("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});o("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});o("state.save()",function(){return this.iterator("table",function(a){xa(a)})});n.versionCheck=n.fnVersionCheck=function(a){for(var b=n.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};n.isDataTable=
n.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;if(a instanceof n.Api)return!0;h.each(n.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:null;if(e.nTable===b||f===b||g===b)c=!0});return c};n.tables=n.fnTables=function(a){var b=!1;h.isPlainObject(a)&&(b=a.api,a=a.visible);var c=h.map(n.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new s(c):c};n.camelToHungarian=J;o("$()",function(a,b){var c=
this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){o(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0]=h.map(a[0].split(/\s/),function(a){return!a.match(/\.dt\b/)?a+".dt":a}).join(" ");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});o("clear()",function(){return this.iterator("table",function(a){oa(a)})});o("settings()",function(){return new s(this.context,this.context)});o("init()",function(){var a=
this.context;return a.length?a[0].oInit:null});o("data()",function(){return this.iterator("table",function(a){return D(a.aoData,"_aData")}).flatten()});o("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),o;b.bDestroying=!0;r(b,"aoDestroyCallback","destroy",[b]);a||(new s(b)).columns().visible(!0);k.off(".DT").find(":not(tbody *)").off(".DT");
h(E).off(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));b.aaSorting=[];b.aaSortingFixed=[];wa(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();!a&&c&&(c.insertBefore(e,b.nTableReinsertBefore),i.css("width",b.sDestroyWidth).removeClass(d.sTable),
(o=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%o])}));c=h.inArray(b,n.settings);-1!==c&&n.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){o(b+"s().every()",function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,m){a.call(e[b](g,"cell"===b?h:d,"cell"===b?d:k),g,h,i,m)})})});o("i18n()",function(a,b,c){var d=this.context[0],a=S(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:
a._);return a.replace("%d",c)});n.version="1.10.19";n.settings=[];n.models={};n.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};n.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};n.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,
sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};n.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,
bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+
a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},
oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},
n.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};Z(n.defaults);n.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};
Z(n.defaults.column);n.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],
aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",
iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==y(this)?1*this._iRecordsTotal:
this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==y(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};n.ext=x={buttons:{},
classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:n.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:n.version};h.extend(x,{afnFiltering:x.search,aTypes:x.type.detect,ofnSearch:x.type.search,oSort:x.type.order,afnSortData:x.order,aoFeatures:x.feature,oApi:x.internal,oStdClasses:x.classes,oPagination:x.pager});
h.extend(n.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",
sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",
sJUIHeader:"",sJUIFooter:""});var Lb=n.ext.pager;h.extend(Lb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ia(a,b)]},simple_numbers:function(a,b){return["previous",ia(a,b),"next"]},full_numbers:function(a,b){return["first","previous",ia(a,b),"next","last"]},first_last_numbers:function(a,b){return["first",ia(a,b),"last"]},_numbers:ia,numbers_length:7});h.extend(!0,n.ext.renderer,{pageButton:{_:function(a,b,c,d,e,
f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},m,l,n=0,o=function(b,d){var k,s,u,r,v=function(b){Ta(a,b.data.action,true)};k=0;for(s=d.length;k<s;k++){r=d[k];if(h.isArray(r)){u=h("<"+(r.DT_el||"div")+"/>").appendTo(b);o(u,r)}else{m=null;l="";switch(r){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":m=j.sFirst;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":m=j.sPrevious;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "next":m=
j.sNext;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":m=j.sLast;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:m=r+1;l=e===r?g.sPageButtonActive:""}if(m!==null){u=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"aria-label":i[r],"data-dt-idx":n,tabindex:a.iTabIndex,id:c===0&&typeof r==="string"?a.sTableId+"_"+r:null}).html(m).appendTo(b);Wa(u,{action:r},v);n++}}}},s;try{s=h(b).find(H.activeElement).data("dt-idx")}catch(u){}o(h(b).empty(),d);s!==k&&h(b).find("[data-dt-idx="+
s+"]").focus()}}});h.extend(n.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&!Zb.test(a))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||M(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Qb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Qb(a,c,!0)?"html-num-fmt"+c:null},function(a){return M(a)||
"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(n.ext.type.search,{html:function(a){return M(a)?a:"string"===typeof a?a.replace(Nb," ").replace(Aa,""):""},string:function(a){return M(a)?a:"string"===typeof a?a.replace(Nb," "):a}});var za=function(a,b,c,d){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Pb(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(x.type.order,{"date-pre":function(a){a=Date.parse(a);return isNaN(a)?-Infinity:a},"html-pre":function(a){return M(a)?
"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>b?-1:0}});Da("");h.extend(!0,n.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:
c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]==
"asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var eb=function(a){return"string"===typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):a};n.render={number:function(a,b,c,d,e){return{display:function(f){if("number"!==typeof f&&"string"!==typeof f)return f;var g=0>f?"-":"",h=parseFloat(f);if(isNaN(h))return eb(f);h=h.toFixed(c);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
a)+f+(e||"")}}},text:function(){return{display:eb,filter:eb}}};h.extend(n.ext.internal,{_fnExternApiFunc:Mb,_fnBuildAjax:sa,_fnAjaxUpdate:mb,_fnAjaxParameters:vb,_fnAjaxUpdateDraw:wb,_fnAjaxDataSrc:ta,_fnAddColumn:Ea,_fnColumnOptions:ka,_fnAdjustColumnSizing:$,_fnVisibleToColumnIndex:aa,_fnColumnIndexToVisible:ba,_fnVisbleColumns:V,_fnGetColumns:ma,_fnColumnTypes:Ga,_fnApplyColumnDefs:jb,_fnHungarianMap:Z,_fnCamelToHungarian:J,_fnLanguageCompat:Ca,_fnBrowserDetect:hb,_fnAddData:O,_fnAddTr:na,_fnNodeToDataIndex:function(a,
b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:kb,_fnSplitObjNotation:Ja,_fnGetObjectDataFn:S,_fnSetObjectDataFn:N,_fnGetDataMaster:Ka,_fnClearTable:oa,_fnDeleteIndex:pa,_fnInvalidate:da,_fnGetRowElements:Ia,_fnCreateTr:Ha,_fnBuildHead:lb,_fnDrawHead:fa,_fnDraw:P,_fnReDraw:T,_fnAddOptionsHtml:ob,_fnDetectHeader:ea,_fnGetUniqueThs:ra,_fnFeatureHtmlFilter:qb,_fnFilterComplete:ga,_fnFilterCustom:zb,
_fnFilterColumn:yb,_fnFilter:xb,_fnFilterCreateSearch:Pa,_fnEscapeRegex:Qa,_fnFilterData:Ab,_fnFeatureHtmlInfo:tb,_fnUpdateInfo:Db,_fnInfoMacros:Eb,_fnInitialise:ha,_fnInitComplete:ua,_fnLengthChange:Ra,_fnFeatureHtmlLength:pb,_fnFeatureHtmlPaginate:ub,_fnPageChange:Ta,_fnFeatureHtmlProcessing:rb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:sb,_fnScrollDraw:la,_fnApplyToChildren:I,_fnCalculateColumnWidths:Fa,_fnThrottle:Oa,_fnConvertToWidth:Fb,_fnGetWidestNode:Gb,_fnGetMaxLenString:Hb,_fnStringToCss:v,
_fnSortFlatten:X,_fnSort:nb,_fnSortAria:Jb,_fnSortListener:Va,_fnSortAttachListener:Ma,_fnSortingClasses:wa,_fnSortData:Ib,_fnSaveState:xa,_fnLoadState:Kb,_fnSettingsFromNode:ya,_fnLog:K,_fnMap:F,_fnBindAction:Wa,_fnCallbackReg:z,_fnCallbackFire:r,_fnLengthOverflow:Sa,_fnRenderer:Na,_fnDataSource:y,_fnRowAttributes:La,_fnExtend:Xa,_fnCalculateEnd:function(){}});h.fn.dataTable=n;n.$=h;h.fn.dataTableSettings=n.settings;h.fn.dataTableExt=n.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};
h.each(n,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});

/*!
 DataTables Bootstrap 4 integration
 ©2011-2017 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,d){a||(a=window);if(!d||!d.fn.dataTable)d=require("datatables.net")(a,d).$;return b(d,a,a.document)}:b(jQuery,window,document)})(function(b,a,d,m){var f=b.fn.dataTable;b.extend(!0,f.defaults,{dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
renderer:"bootstrap"});b.extend(f.ext.classes,{sWrapper:"dataTables_wrapper dt-bootstrap4",sFilterInput:"form-control form-control-sm",sLengthSelect:"custom-select custom-select-sm form-control form-control-sm",sProcessing:"dataTables_processing card",sPageButton:"paginate_button page-item"});f.ext.renderer.pageButton.bootstrap=function(a,h,r,s,j,n){var o=new f.Api(a),t=a.oClasses,k=a.oLanguage.oPaginate,u=a.oLanguage.oAria.paginate||{},e,g,p=0,q=function(d,f){var l,h,i,c,m=function(a){a.preventDefault();
!b(a.currentTarget).hasClass("disabled")&&o.page()!=a.data.action&&o.page(a.data.action).draw("page")};l=0;for(h=f.length;l<h;l++)if(c=f[l],b.isArray(c))q(d,c);else{g=e="";switch(c){case "ellipsis":e="&#x2026;";g="disabled";break;case "first":e=k.sFirst;g=c+(0<j?"":" disabled");break;case "previous":e=k.sPrevious;g=c+(0<j?"":" disabled");break;case "next":e=k.sNext;g=c+(j<n-1?"":" disabled");break;case "last":e=k.sLast;g=c+(j<n-1?"":" disabled");break;default:e=c+1,g=j===c?"active":""}e&&(i=b("<li>",
{"class":t.sPageButton+" "+g,id:0===r&&"string"===typeof c?a.sTableId+"_"+c:null}).append(b("<a>",{href:"#","aria-controls":a.sTableId,"aria-label":u[c],"data-dt-idx":p,tabindex:a.iTabIndex,"class":"page-link"}).html(e)).appendTo(d),a.oApi._fnBindAction(i,{action:c},m),p++)}},i;try{i=b(h).find(d.activeElement).data("dt-idx")}catch(v){}q(b(h).empty().html('<ul class="pagination"/>').children("ul"),s);i!==m&&b(h).find("[data-dt-idx="+i+"]").focus()};return f});

/*!
 Responsive 2.2.3
 2014-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(l){return d(l,window,document)}):"object"===typeof exports?module.exports=function(l,j){l||(l=window);if(!j||!j.fn.dataTable)j=require("datatables.net")(l,j).$;return d(j,l,l.document)}:d(jQuery,window,document)})(function(d,l,j,q){function t(a,b,c){var e=b+"-"+c;if(n[e])return n[e];for(var d=[],a=a.cell(b,c).node().childNodes,b=0,c=a.length;b<c;b++)d.push(a[b]);return n[e]=d}function r(a,b,d){var e=b+
"-"+d;if(n[e]){for(var a=a.cell(b,d).node(),d=n[e][0].parentNode.childNodes,b=[],f=0,g=d.length;f<g;f++)b.push(d[f]);d=0;for(f=b.length;d<f;d++)a.appendChild(b[d]);n[e]=q}}var o=d.fn.dataTable,i=function(a,b){if(!o.versionCheck||!o.versionCheck("1.10.10"))throw"DataTables Responsive requires DataTables 1.10.10 or newer";this.s={dt:new o.Api(a),columns:[],current:[]};this.s.dt.settings()[0].responsive||(b&&"string"===typeof b.details?b.details={type:b.details}:b&&!1===b.details?b.details={type:!1}:
b&&!0===b.details&&(b.details={type:"inline"}),this.c=d.extend(!0,{},i.defaults,o.defaults.responsive,b),a.responsive=this,this._constructor())};d.extend(i.prototype,{_constructor:function(){var a=this,b=this.s.dt,c=b.settings()[0],e=d(l).width();b.settings()[0]._responsive=this;d(l).on("resize.dtr orientationchange.dtr",o.util.throttle(function(){var b=d(l).width();b!==e&&(a._resize(),e=b)}));c.oApi._fnCallbackReg(c,"aoRowCreatedCallback",function(e){-1!==d.inArray(!1,a.s.current)&&d(">td, >th",
e).each(function(e){e=b.column.index("toData",e);!1===a.s.current[e]&&d(this).css("display","none")})});b.on("destroy.dtr",function(){b.off(".dtr");d(b.table().body()).off(".dtr");d(l).off("resize.dtr orientationchange.dtr");d.each(a.s.current,function(b,e){!1===e&&a._setColumnVis(b,!0)})});this.c.breakpoints.sort(function(a,b){return a.width<b.width?1:a.width>b.width?-1:0});this._classLogic();this._resizeAuto();c=this.c.details;!1!==c.type&&(a._detailsInit(),b.on("column-visibility.dtr",function(){a._timer&&
clearTimeout(a._timer);a._timer=setTimeout(function(){a._timer=null;a._classLogic();a._resizeAuto();a._resize();a._redrawChildren()},100)}),b.on("draw.dtr",function(){a._redrawChildren()}),d(b.table().node()).addClass("dtr-"+c.type));b.on("column-reorder.dtr",function(){a._classLogic();a._resizeAuto();a._resize()});b.on("column-sizing.dtr",function(){a._resizeAuto();a._resize()});b.on("preXhr.dtr",function(){var e=[];b.rows().every(function(){this.child.isShown()&&e.push(this.id(true))});b.one("draw.dtr",
function(){a._resizeAuto();a._resize();b.rows(e).every(function(){a._detailsDisplay(this,false)})})});b.on("init.dtr",function(){a._resizeAuto();a._resize();d.inArray(false,a.s.current)&&b.columns.adjust()});this._resize()},_columnsVisiblity:function(a){var b=this.s.dt,c=this.s.columns,e,f,g=c.map(function(a,b){return{columnIdx:b,priority:a.priority}}).sort(function(a,b){return a.priority!==b.priority?a.priority-b.priority:a.columnIdx-b.columnIdx}),h=d.map(c,function(e,c){return!1===b.column(c).visible()?
"not-visible":e.auto&&null===e.minWidth?!1:!0===e.auto?"-":-1!==d.inArray(a,e.includeIn)}),m=0;e=0;for(f=h.length;e<f;e++)!0===h[e]&&(m+=c[e].minWidth);e=b.settings()[0].oScroll;e=e.sY||e.sX?e.iBarWidth:0;m=b.table().container().offsetWidth-e-m;e=0;for(f=h.length;e<f;e++)c[e].control&&(m-=c[e].minWidth);var s=!1;e=0;for(f=g.length;e<f;e++){var k=g[e].columnIdx;"-"===h[k]&&(!c[k].control&&c[k].minWidth)&&(s||0>m-c[k].minWidth?(s=!0,h[k]=!1):h[k]=!0,m-=c[k].minWidth)}g=!1;e=0;for(f=c.length;e<f;e++)if(!c[e].control&&
!c[e].never&&!1===h[e]){g=!0;break}e=0;for(f=c.length;e<f;e++)c[e].control&&(h[e]=g),"not-visible"===h[e]&&(h[e]=!1);-1===d.inArray(!0,h)&&(h[0]=!0);return h},_classLogic:function(){var a=this,b=this.c.breakpoints,c=this.s.dt,e=c.columns().eq(0).map(function(a){var b=this.column(a),e=b.header().className,a=c.settings()[0].aoColumns[a].responsivePriority;a===q&&(b=d(b.header()).data("priority"),a=b!==q?1*b:1E4);return{className:e,includeIn:[],auto:!1,control:!1,never:e.match(/\bnever\b/)?!0:!1,priority:a}}),
f=function(a,b){var c=e[a].includeIn;-1===d.inArray(b,c)&&c.push(b)},g=function(d,c,g,k){if(g)if("max-"===g){k=a._find(c).width;c=0;for(g=b.length;c<g;c++)b[c].width<=k&&f(d,b[c].name)}else if("min-"===g){k=a._find(c).width;c=0;for(g=b.length;c<g;c++)b[c].width>=k&&f(d,b[c].name)}else{if("not-"===g){c=0;for(g=b.length;c<g;c++)-1===b[c].name.indexOf(k)&&f(d,b[c].name)}}else e[d].includeIn.push(c)};e.each(function(a,e){for(var c=a.className.split(" "),f=!1,i=0,l=c.length;i<l;i++){var j=d.trim(c[i]);
if("all"===j){f=!0;a.includeIn=d.map(b,function(a){return a.name});return}if("none"===j||a.never){f=!0;return}if("control"===j){f=!0;a.control=!0;return}d.each(b,function(a,b){var d=b.name.split("-"),c=j.match(RegExp("(min\\-|max\\-|not\\-)?("+d[0]+")(\\-[_a-zA-Z0-9])?"));c&&(f=!0,c[2]===d[0]&&c[3]==="-"+d[1]?g(e,b.name,c[1],c[2]+c[3]):c[2]===d[0]&&!c[3]&&g(e,b.name,c[1],c[2]))})}f||(a.auto=!0)});this.s.columns=e},_detailsDisplay:function(a,b){var c=this,e=this.s.dt,f=this.c.details;if(f&&!1!==f.type){var g=
f.display(a,b,function(){return f.renderer(e,a[0],c._detailsObj(a[0]))});(!0===g||!1===g)&&d(e.table().node()).triggerHandler("responsive-display.dt",[e,a,g,b])}},_detailsInit:function(){var a=this,b=this.s.dt,c=this.c.details;"inline"===c.type&&(c.target="td:first-child, th:first-child");b.on("draw.dtr",function(){a._tabIndexes()});a._tabIndexes();d(b.table().body()).on("keyup.dtr","td, th",function(a){a.keyCode===13&&d(this).data("dtr-keyboard")&&d(this).click()});var e=c.target;d(b.table().body()).on("click.dtr mousedown.dtr mouseup.dtr",
"string"===typeof e?e:"td, th",function(c){if(d(b.table().node()).hasClass("collapsed")&&d.inArray(d(this).closest("tr").get(0),b.rows().nodes().toArray())!==-1){if(typeof e==="number"){var g=e<0?b.columns().eq(0).length+e:e;if(b.cell(this).index().column!==g)return}g=b.row(d(this).closest("tr"));c.type==="click"?a._detailsDisplay(g,false):c.type==="mousedown"?d(this).css("outline","none"):c.type==="mouseup"&&d(this).blur().css("outline","")}})},_detailsObj:function(a){var b=this,c=this.s.dt;return d.map(this.s.columns,
function(e,d){if(!e.never&&!e.control)return{title:c.settings()[0].aoColumns[d].sTitle,data:c.cell(a,d).render(b.c.orthogonal),hidden:c.column(d).visible()&&!b.s.current[d],columnIndex:d,rowIndex:a}})},_find:function(a){for(var b=this.c.breakpoints,c=0,e=b.length;c<e;c++)if(b[c].name===a)return b[c]},_redrawChildren:function(){var a=this,b=this.s.dt;b.rows({page:"current"}).iterator("row",function(c,e){b.row(e);a._detailsDisplay(b.row(e),!0)})},_resize:function(){var a=this,b=this.s.dt,c=d(l).width(),
e=this.c.breakpoints,f=e[0].name,g=this.s.columns,h,m=this.s.current.slice();for(h=e.length-1;0<=h;h--)if(c<=e[h].width){f=e[h].name;break}var i=this._columnsVisiblity(f);this.s.current=i;e=!1;h=0;for(c=g.length;h<c;h++)if(!1===i[h]&&!g[h].never&&!g[h].control&&!1===!b.column(h).visible()){e=!0;break}d(b.table().node()).toggleClass("collapsed",e);var k=!1,j=0;b.columns().eq(0).each(function(b,c){!0===i[c]&&j++;i[c]!==m[c]&&(k=!0,a._setColumnVis(b,i[c]))});k&&(this._redrawChildren(),d(b.table().node()).trigger("responsive-resize.dt",
[b,this.s.current]),0===b.page.info().recordsDisplay&&d("td",b.table().body()).eq(0).attr("colspan",j))},_resizeAuto:function(){var a=this.s.dt,b=this.s.columns;if(this.c.auto&&-1!==d.inArray(!0,d.map(b,function(a){return a.auto}))){d.isEmptyObject(n)||d.each(n,function(b){b=b.split("-");r(a,1*b[0],1*b[1])});a.table().node();var c=a.table().node().cloneNode(!1),e=d(a.table().header().cloneNode(!1)).appendTo(c),f=d(a.table().body()).clone(!1,!1).empty().appendTo(c),g=a.columns().header().filter(function(b){return a.column(b).visible()}).to$().clone(!1).css("display",
"table-cell").css("min-width",0);d(f).append(d(a.rows({page:"current"}).nodes()).clone(!1)).find("th, td").css("display","");if(f=a.table().footer()){var f=d(f.cloneNode(!1)).appendTo(c),h=a.columns().footer().filter(function(b){return a.column(b).visible()}).to$().clone(!1).css("display","table-cell");d("<tr/>").append(h).appendTo(f)}d("<tr/>").append(g).appendTo(e);"inline"===this.c.details.type&&d(c).addClass("dtr-inline collapsed");d(c).find("[name]").removeAttr("name");d(c).css("position","relative");
c=d("<div/>").css({width:1,height:1,overflow:"hidden",clear:"both"}).append(c);c.insertBefore(a.table().node());g.each(function(c){c=a.column.index("fromVisible",c);b[c].minWidth=this.offsetWidth||0});c.remove()}},_setColumnVis:function(a,b){var c=this.s.dt,e=b?"":"none";d(c.column(a).header()).css("display",e);d(c.column(a).footer()).css("display",e);c.column(a).nodes().to$().css("display",e);d.isEmptyObject(n)||c.cells(null,a).indexes().each(function(a){r(c,a.row,a.column)})},_tabIndexes:function(){var a=
this.s.dt,b=a.cells({page:"current"}).nodes().to$(),c=a.settings()[0],e=this.c.details.target;b.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");"number"===typeof e?a.cells(null,e,{page:"current"}).nodes().to$().attr("tabIndex",c.iTabIndex).data("dtr-keyboard",1):("td:first-child, th:first-child"===e&&(e=">td:first-child, >th:first-child"),d(e,a.rows({page:"current"}).nodes()).attr("tabIndex",c.iTabIndex).data("dtr-keyboard",1))}});i.breakpoints=[{name:"desktop",width:Infinity},{name:"tablet-l",
width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}];i.display={childRow:function(a,b,c){if(b){if(d(a.node()).hasClass("parent"))return a.child(c(),"child").show(),!0}else{if(a.child.isShown())return a.child(!1),d(a.node()).removeClass("parent"),!1;a.child(c(),"child").show();d(a.node()).addClass("parent");return!0}},childRowImmediate:function(a,b,c){if(!b&&a.child.isShown()||!a.responsive.hasHidden())return a.child(!1),d(a.node()).removeClass("parent"),
!1;a.child(c(),"child").show();d(a.node()).addClass("parent");return!0},modal:function(a){return function(b,c,e){if(c)d("div.dtr-modal-content").empty().append(e());else{var f=function(){g.remove();d(j).off("keypress.dtr")},g=d('<div class="dtr-modal"/>').append(d('<div class="dtr-modal-display"/>').append(d('<div class="dtr-modal-content"/>').append(e())).append(d('<div class="dtr-modal-close">&times;</div>').click(function(){f()}))).append(d('<div class="dtr-modal-background"/>').click(function(){f()})).appendTo("body");
d(j).on("keyup.dtr",function(a){27===a.keyCode&&(a.stopPropagation(),f())})}a&&a.header&&d("div.dtr-modal-content").prepend("<h2>"+a.header(b)+"</h2>")}}};var n={};i.renderer={listHiddenNodes:function(){return function(a,b,c){var e=d('<ul data-dtr-index="'+b+'" class="dtr-details"/>'),f=!1;d.each(c,function(b,c){c.hidden&&(d('<li data-dtr-index="'+c.columnIndex+'" data-dt-row="'+c.rowIndex+'" data-dt-column="'+c.columnIndex+'"><span class="dtr-title">'+c.title+"</span> </li>").append(d('<span class="dtr-data"/>').append(t(a,
c.rowIndex,c.columnIndex))).appendTo(e),f=!0)});return f?e:!1}},listHidden:function(){return function(a,b,c){return(a=d.map(c,function(a){return a.hidden?'<li data-dtr-index="'+a.columnIndex+'" data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><span class="dtr-title">'+a.title+'</span> <span class="dtr-data">'+a.data+"</span></li>":""}).join(""))?d('<ul data-dtr-index="'+b+'" class="dtr-details"/>').append(a):!1}},tableAll:function(a){a=d.extend({tableClass:""},a);return function(b,
c,e){b=d.map(e,function(a){return'<tr data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><td>'+a.title+":</td> <td>"+a.data+"</td></tr>"}).join("");return d('<table class="'+a.tableClass+' dtr-details" width="100%"/>').append(b)}}};i.defaults={breakpoints:i.breakpoints,auto:!0,details:{display:i.display.childRow,renderer:i.renderer.listHidden(),target:0,type:"inline"},orthogonal:"display"};var p=d.fn.dataTable.Api;p.register("responsive()",function(){return this});p.register("responsive.index()",
function(a){a=d(a);return{column:a.data("dtr-index"),row:a.parent().data("dtr-index")}});p.register("responsive.rebuild()",function(){return this.iterator("table",function(a){a._responsive&&a._responsive._classLogic()})});p.register("responsive.recalc()",function(){return this.iterator("table",function(a){a._responsive&&(a._responsive._resizeAuto(),a._responsive._resize())})});p.register("responsive.hasHidden()",function(){var a=this.context[0];return a._responsive?-1!==d.inArray(!1,a._responsive.s.current):
!1});p.registerPlural("columns().responsiveHidden()","column().responsiveHidden()",function(){return this.iterator("column",function(a,b){return a._responsive?a._responsive.s.current[b]:!1},1)});i.version="2.2.3";d.fn.dataTable.Responsive=i;d.fn.DataTable.Responsive=i;d(j).on("preInit.dt.dtr",function(a,b){if("dt"===a.namespace&&(d(b.nTable).hasClass("responsive")||d(b.nTable).hasClass("dt-responsive")||b.oInit.responsive||o.defaults.responsive)){var c=b.oInit.responsive;!1!==c&&new i(b,d.isPlainObject(c)?
c:{})}});return i});

/*!
 Bootstrap 4 integration for DataTables' Responsive
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-responsive"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-bs4")(a,b).$;b.fn.dataTable.Responsive||require("datatables.net-responsive")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){var a=c.fn.dataTable,b=a.Responsive.display,g=b.modal,e=c('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"/></div></div></div>');
b.modal=function(a){return function(b,d,f){if(c.fn.modal){if(!d){if(a&&a.header){var d=e.find("div.modal-header"),h=d.find("button").detach();d.empty().append('<h4 class="modal-title">'+a.header(b)+"</h4>").append(h)}e.find("div.modal-body").empty().append(f());e.appendTo("body").modal()}}else g(b,d,f)}};return a.Responsive});

!function($){var apiParams={set:{colors:1,values:1,backgroundColor:1,scaleColors:1,normalizeFunction:1,focus:1},get:{selectedRegions:1,selectedMarkers:1,mapObject:1,regionName:1}};$.fn.vectorMap=function(options){var map,methodName,map=this.children(".jvectormap-container").data("mapObject");if("addMap"===options)jvm.Map.maps[arguments[1]]=arguments[2];else{if(("set"===options||"get"===options)&&apiParams[options][arguments[1]])return methodName=arguments[1].charAt(0).toUpperCase()+arguments[1].substr(1),map[options+methodName].apply(map,Array.prototype.slice.call(arguments,2));options=options||{},options.container=this,map=new jvm.Map(options)}return this}}(jQuery),function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof exports?module.exports=factory:factory(jQuery)}(function($){function handler(event){var orgEvent=event||window.event,args=slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0;if(event=$.event.fix(orgEvent),event.type="mousewheel","detail"in orgEvent&&(deltaY=-1*orgEvent.detail),"wheelDelta"in orgEvent&&(deltaY=orgEvent.wheelDelta),"wheelDeltaY"in orgEvent&&(deltaY=orgEvent.wheelDeltaY),"wheelDeltaX"in orgEvent&&(deltaX=-1*orgEvent.wheelDeltaX),"axis"in orgEvent&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS&&(deltaX=-1*deltaY,deltaY=0),delta=0===deltaY?deltaX:deltaY,"deltaY"in orgEvent&&(deltaY=-1*orgEvent.deltaY,delta=deltaY),"deltaX"in orgEvent&&(deltaX=orgEvent.deltaX,0===deltaY&&(delta=-1*deltaX)),0!==deltaY||0!==deltaX){if(1===orgEvent.deltaMode){var lineHeight=$.data(this,"mousewheel-line-height");delta*=lineHeight,deltaY*=lineHeight,deltaX*=lineHeight}else if(2===orgEvent.deltaMode){var pageHeight=$.data(this,"mousewheel-page-height");delta*=pageHeight,deltaY*=pageHeight,deltaX*=pageHeight}return absDelta=Math.max(Math.abs(deltaY),Math.abs(deltaX)),(!lowestDelta||lowestDelta>absDelta)&&(lowestDelta=absDelta,shouldAdjustOldDeltas(orgEvent,absDelta)&&(lowestDelta/=40)),shouldAdjustOldDeltas(orgEvent,absDelta)&&(delta/=40,deltaX/=40,deltaY/=40),delta=Math[delta>=1?"floor":"ceil"](delta/lowestDelta),deltaX=Math[deltaX>=1?"floor":"ceil"](deltaX/lowestDelta),deltaY=Math[deltaY>=1?"floor":"ceil"](deltaY/lowestDelta),event.deltaX=deltaX,event.deltaY=deltaY,event.deltaFactor=lowestDelta,event.deltaMode=0,args.unshift(event,delta,deltaX,deltaY),nullLowestDeltaTimeout&&clearTimeout(nullLowestDeltaTimeout),nullLowestDeltaTimeout=setTimeout(nullLowestDelta,200),($.event.dispatch||$.event.handle).apply(this,args)}}function nullLowestDelta(){lowestDelta=null}function shouldAdjustOldDeltas(orgEvent,absDelta){return special.settings.adjustOldDeltas&&"mousewheel"===orgEvent.type&&absDelta%120===0}var nullLowestDeltaTimeout,lowestDelta,toFix=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],toBind="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],slice=Array.prototype.slice;if($.event.fixHooks)for(var i=toFix.length;i;)$.event.fixHooks[toFix[--i]]=$.event.mouseHooks;var special=$.event.special.mousewheel={version:"3.1.9",setup:function(){if(this.addEventListener)for(var i=toBind.length;i;)this.addEventListener(toBind[--i],handler,!1);else this.onmousewheel=handler;$.data(this,"mousewheel-line-height",special.getLineHeight(this)),$.data(this,"mousewheel-page-height",special.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var i=toBind.length;i;)this.removeEventListener(toBind[--i],handler,!1);else this.onmousewheel=null},getLineHeight:function(elem){return parseInt($(elem)["offsetParent"in $.fn?"offsetParent":"parent"]().css("fontSize"),10)},getPageHeight:function(elem){return $(elem).height()},settings:{adjustOldDeltas:!0}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}})});var jvm={inherits:function(child,parent){function temp(){}temp.prototype=parent.prototype,child.prototype=new temp,child.prototype.constructor=child,child.parentClass=parent},mixin:function(target,source){var prop;for(prop in source.prototype)source.prototype.hasOwnProperty(prop)&&(target.prototype[prop]=source.prototype[prop])},min:function(values){var i,min=Number.MAX_VALUE;if(values instanceof Array)for(i=0;i<values.length;i++)values[i]<min&&(min=values[i]);else for(i in values)values[i]<min&&(min=values[i]);return min},max:function(values){var i,max=Number.MIN_VALUE;if(values instanceof Array)for(i=0;i<values.length;i++)values[i]>max&&(max=values[i]);else for(i in values)values[i]>max&&(max=values[i]);return max},keys:function(object){var key,keys=[];for(key in object)keys.push(key);return keys},values:function(object){var key,i,values=[];for(i=0;i<arguments.length;i++){object=arguments[i];for(key in object)values.push(object[key])}return values},whenImageLoaded:function(url){var deferred=new jvm.$.Deferred,img=jvm.$("<img/>");return img.error(function(){deferred.reject()}).load(function(){deferred.resolve(img)}),img.attr("src",url),deferred},isImageUrl:function(s){return/\.\w{3,4}$/.test(s)}};jvm.$=jQuery,Array.prototype.indexOf||(Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(null==this)throw new TypeError('"this" is null or not defined');var O=Object(this),len=O.length>>>0;if(0===len)return-1;var n=+fromIndex||0;if(Math.abs(n)===1/0&&(n=0),n>=len)return-1;for(k=Math.max(n>=0?n:len-Math.abs(n),0);len>k;){if(k in O&&O[k]===searchElement)return k;k++}return-1}),jvm.AbstractElement=function(name,config){this.node=this.createElement(name),this.name=name,this.properties={},config&&this.set(config)},jvm.AbstractElement.prototype.set=function(property,value){var key;if("object"==typeof property)for(key in property)this.properties[key]=property[key],this.applyAttr(key,property[key]);else this.properties[property]=value,this.applyAttr(property,value)},jvm.AbstractElement.prototype.get=function(property){return this.properties[property]},jvm.AbstractElement.prototype.applyAttr=function(property,value){this.node.setAttribute(property,value)},jvm.AbstractElement.prototype.remove=function(){jvm.$(this.node).remove()},jvm.AbstractCanvasElement=function(container,width,height){this.container=container,this.setSize(width,height),this.rootElement=new jvm[this.classPrefix+"GroupElement"],this.node.appendChild(this.rootElement.node),this.container.appendChild(this.node)},jvm.AbstractCanvasElement.prototype.add=function(element,group){group=group||this.rootElement,group.add(element),element.canvas=this},jvm.AbstractCanvasElement.prototype.addPath=function(config,style,group){var el=new jvm[this.classPrefix+"PathElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addCircle=function(config,style,group){var el=new jvm[this.classPrefix+"CircleElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addImage=function(config,style,group){var el=new jvm[this.classPrefix+"ImageElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addText=function(config,style,group){var el=new jvm[this.classPrefix+"TextElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addGroup=function(parentGroup){var el=new jvm[this.classPrefix+"GroupElement"];return parentGroup?parentGroup.node.appendChild(el.node):this.node.appendChild(el.node),el.canvas=this,el},jvm.AbstractShapeElement=function(name,config,style){this.style=style||{},this.style.current=this.style.current||{},this.isHovered=!1,this.isSelected=!1,this.updateStyle()},jvm.AbstractShapeElement.prototype.setStyle=function(property,value){var styles={};"object"==typeof property?styles=property:styles[property]=value,jvm.$.extend(this.style.current,styles),this.updateStyle()},jvm.AbstractShapeElement.prototype.updateStyle=function(){var attrs={};jvm.AbstractShapeElement.mergeStyles(attrs,this.style.initial),jvm.AbstractShapeElement.mergeStyles(attrs,this.style.current),this.isHovered&&jvm.AbstractShapeElement.mergeStyles(attrs,this.style.hover),this.isSelected&&(jvm.AbstractShapeElement.mergeStyles(attrs,this.style.selected),this.isHovered&&jvm.AbstractShapeElement.mergeStyles(attrs,this.style.selectedHover)),this.set(attrs)},jvm.AbstractShapeElement.mergeStyles=function(styles,newStyles){var key;newStyles=newStyles||{};for(key in newStyles)null===newStyles[key]?delete styles[key]:styles[key]=newStyles[key]},jvm.SVGElement=function(){jvm.SVGElement.parentClass.apply(this,arguments)},jvm.inherits(jvm.SVGElement,jvm.AbstractElement),jvm.SVGElement.svgns="http://www.w3.org/2000/svg",jvm.SVGElement.prototype.createElement=function(tagName){return document.createElementNS(jvm.SVGElement.svgns,tagName)},jvm.SVGElement.prototype.addClass=function(className){this.node.setAttribute("class",className)},jvm.SVGElement.prototype.getElementCtr=function(ctr){return jvm["SVG"+ctr]},jvm.SVGElement.prototype.getBBox=function(){return this.node.getBBox()},jvm.SVGGroupElement=function(){jvm.SVGGroupElement.parentClass.call(this,"g")},jvm.inherits(jvm.SVGGroupElement,jvm.SVGElement),jvm.SVGGroupElement.prototype.add=function(element){this.node.appendChild(element.node)},jvm.SVGCanvasElement=function(){this.classPrefix="SVG",jvm.SVGCanvasElement.parentClass.call(this,"svg"),this.defsElement=new jvm.SVGElement("defs"),this.node.appendChild(this.defsElement.node),jvm.AbstractCanvasElement.apply(this,arguments)},jvm.inherits(jvm.SVGCanvasElement,jvm.SVGElement),jvm.mixin(jvm.SVGCanvasElement,jvm.AbstractCanvasElement),jvm.SVGCanvasElement.prototype.setSize=function(width,height){this.width=width,this.height=height,this.node.setAttribute("width",width),this.node.setAttribute("height",height)},jvm.SVGCanvasElement.prototype.applyTransformParams=function(scale,transX,transY){this.scale=scale,this.transX=transX,this.transY=transY,this.rootElement.node.setAttribute("transform","scale("+scale+") translate("+transX+", "+transY+")")},jvm.SVGShapeElement=function(name,config){jvm.SVGShapeElement.parentClass.call(this,name,config),jvm.AbstractShapeElement.apply(this,arguments)},jvm.inherits(jvm.SVGShapeElement,jvm.SVGElement),jvm.mixin(jvm.SVGShapeElement,jvm.AbstractShapeElement),jvm.SVGShapeElement.prototype.applyAttr=function(attr,value){var patternEl,imageEl,that=this;"fill"===attr&&jvm.isImageUrl(value)?jvm.SVGShapeElement.images[value]?this.applyAttr("fill","url(#image"+jvm.SVGShapeElement.images[value]+")"):jvm.whenImageLoaded(value).then(function(img){imageEl=new jvm.SVGElement("image"),imageEl.node.setAttributeNS("http://www.w3.org/1999/xlink","href",value),imageEl.applyAttr("x","0"),imageEl.applyAttr("y","0"),imageEl.applyAttr("width",img[0].width),imageEl.applyAttr("height",img[0].height),patternEl=new jvm.SVGElement("pattern"),patternEl.applyAttr("id","image"+jvm.SVGShapeElement.imageCounter),patternEl.applyAttr("x",0),patternEl.applyAttr("y",0),patternEl.applyAttr("width",img[0].width/2),patternEl.applyAttr("height",img[0].height/2),patternEl.applyAttr("viewBox","0 0 "+img[0].width+" "+img[0].height),patternEl.applyAttr("patternUnits","userSpaceOnUse"),patternEl.node.appendChild(imageEl.node),that.canvas.defsElement.node.appendChild(patternEl.node),jvm.SVGShapeElement.images[value]=jvm.SVGShapeElement.imageCounter++,that.applyAttr("fill","url(#image"+jvm.SVGShapeElement.images[value]+")")}):jvm.SVGShapeElement.parentClass.prototype.applyAttr.apply(this,arguments)},jvm.SVGShapeElement.imageCounter=1,jvm.SVGShapeElement.images={},jvm.SVGPathElement=function(config,style){jvm.SVGPathElement.parentClass.call(this,"path",config,style),this.node.setAttribute("fill-rule","evenodd")},jvm.inherits(jvm.SVGPathElement,jvm.SVGShapeElement),jvm.SVGCircleElement=function(config,style){jvm.SVGCircleElement.parentClass.call(this,"circle",config,style)},jvm.inherits(jvm.SVGCircleElement,jvm.SVGShapeElement),jvm.SVGImageElement=function(config,style){jvm.SVGImageElement.parentClass.call(this,"image",config,style)},jvm.inherits(jvm.SVGImageElement,jvm.SVGShapeElement),jvm.SVGImageElement.prototype.applyAttr=function(attr,value){var that=this;"image"==attr?jvm.whenImageLoaded(value).then(function(img){that.node.setAttributeNS("http://www.w3.org/1999/xlink","href",value),that.width=img[0].width,that.height=img[0].height,that.applyAttr("width",that.width),that.applyAttr("height",that.height),that.applyAttr("x",that.cx-that.width/2),that.applyAttr("y",that.cy-that.height/2),jvm.$(that.node).trigger("imageloaded",[img])}):"cx"==attr?(this.cx=value,this.width&&this.applyAttr("x",value-this.width/2)):"cy"==attr?(this.cy=value,this.height&&this.applyAttr("y",value-this.height/2)):jvm.SVGImageElement.parentClass.prototype.applyAttr.apply(this,arguments)},jvm.SVGTextElement=function(config,style){jvm.SVGTextElement.parentClass.call(this,"text",config,style)},jvm.inherits(jvm.SVGTextElement,jvm.SVGShapeElement),jvm.SVGTextElement.prototype.applyAttr=function(attr,value){"text"===attr?this.node.textContent=value:jvm.SVGTextElement.parentClass.prototype.applyAttr.apply(this,arguments)},jvm.VMLElement=function(){jvm.VMLElement.VMLInitialized||jvm.VMLElement.initializeVML(),jvm.VMLElement.parentClass.apply(this,arguments)},jvm.inherits(jvm.VMLElement,jvm.AbstractElement),jvm.VMLElement.VMLInitialized=!1,jvm.VMLElement.initializeVML=function(){try{document.namespaces.rvml||document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),jvm.VMLElement.prototype.createElement=function(tagName){return document.createElement("<rvml:"+tagName+' class="rvml">')}}catch(e){jvm.VMLElement.prototype.createElement=function(tagName){return document.createElement("<"+tagName+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"),jvm.VMLElement.VMLInitialized=!0},jvm.VMLElement.prototype.getElementCtr=function(ctr){return jvm["VML"+ctr]},jvm.VMLElement.prototype.addClass=function(className){jvm.$(this.node).addClass(className)},jvm.VMLElement.prototype.applyAttr=function(attr,value){this.node[attr]=value},jvm.VMLElement.prototype.getBBox=function(){var node=jvm.$(this.node);return{x:node.position().left/this.canvas.scale,y:node.position().top/this.canvas.scale,width:node.width()/this.canvas.scale,height:node.height()/this.canvas.scale}},jvm.VMLGroupElement=function(){jvm.VMLGroupElement.parentClass.call(this,"group"),this.node.style.left="0px",this.node.style.top="0px",this.node.coordorigin="0 0"},jvm.inherits(jvm.VMLGroupElement,jvm.VMLElement),jvm.VMLGroupElement.prototype.add=function(element){this.node.appendChild(element.node)},jvm.VMLCanvasElement=function(){this.classPrefix="VML",jvm.VMLCanvasElement.parentClass.call(this,"group"),jvm.AbstractCanvasElement.apply(this,arguments),this.node.style.position="absolute"},jvm.inherits(jvm.VMLCanvasElement,jvm.VMLElement),jvm.mixin(jvm.VMLCanvasElement,jvm.AbstractCanvasElement),jvm.VMLCanvasElement.prototype.setSize=function(width,height){var paths,groups,i,l;if(this.width=width,this.height=height,this.node.style.width=width+"px",this.node.style.height=height+"px",this.node.coordsize=width+" "+height,this.node.coordorigin="0 0",this.rootElement){for(paths=this.rootElement.node.getElementsByTagName("shape"),i=0,l=paths.length;l>i;i++)paths[i].coordsize=width+" "+height,paths[i].style.width=width+"px",paths[i].style.height=height+"px";for(groups=this.node.getElementsByTagName("group"),i=0,l=groups.length;l>i;i++)groups[i].coordsize=width+" "+height,groups[i].style.width=width+"px",groups[i].style.height=height+"px"}},jvm.VMLCanvasElement.prototype.applyTransformParams=function(scale,transX,transY){this.scale=scale,this.transX=transX,this.transY=transY,this.rootElement.node.coordorigin=this.width-transX-this.width/100+","+(this.height-transY-this.height/100),this.rootElement.node.coordsize=this.width/scale+","+this.height/scale},jvm.VMLShapeElement=function(name,config){jvm.VMLShapeElement.parentClass.call(this,name,config),this.fillElement=new jvm.VMLElement("fill"),this.strokeElement=new jvm.VMLElement("stroke"),this.node.appendChild(this.fillElement.node),this.node.appendChild(this.strokeElement.node),this.node.stroked=!1,jvm.AbstractShapeElement.apply(this,arguments)},jvm.inherits(jvm.VMLShapeElement,jvm.VMLElement),jvm.mixin(jvm.VMLShapeElement,jvm.AbstractShapeElement),jvm.VMLShapeElement.prototype.applyAttr=function(attr,value){switch(attr){case"fill":this.node.fillcolor=value;break;case"fill-opacity":this.fillElement.node.opacity=Math.round(100*value)+"%";break;case"stroke":this.node.stroked="none"===value?!1:!0,this.node.strokecolor=value;break;case"stroke-opacity":this.strokeElement.node.opacity=Math.round(100*value)+"%";break;case"stroke-width":this.node.stroked=0===parseInt(value,10)?!1:!0,this.node.strokeweight=value;break;case"d":this.node.path=jvm.VMLPathElement.pathSvgToVml(value);break;default:jvm.VMLShapeElement.parentClass.prototype.applyAttr.apply(this,arguments)}},jvm.VMLPathElement=function(config,style){var scale=new jvm.VMLElement("skew");jvm.VMLPathElement.parentClass.call(this,"shape",config,style),this.node.coordorigin="0 0",scale.node.on=!0,scale.node.matrix="0.01,0,0,0.01,0,0",scale.node.offset="0,0",this.node.appendChild(scale.node)},jvm.inherits(jvm.VMLPathElement,jvm.VMLShapeElement),jvm.VMLPathElement.prototype.applyAttr=function(attr,value){"d"===attr?this.node.path=jvm.VMLPathElement.pathSvgToVml(value):jvm.VMLShapeElement.prototype.applyAttr.call(this,attr,value)},jvm.VMLPathElement.pathSvgToVml=function(path){var ctrlx,ctrly,cx=0,cy=0;return path=path.replace(/(-?\d+)e(-?\d+)/g,"0"),path.replace(/([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g,function(segment,letter,coords){coords=coords.replace(/(\d)-/g,"$1,-").replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s+/g,",").split(","),coords[0]||coords.shift();for(var i=0,l=coords.length;l>i;i++)coords[i]=Math.round(100*coords[i]);switch(letter){case"m":return cx+=coords[0],cy+=coords[1],"t"+coords.join(",");case"M":return cx=coords[0],cy=coords[1],"m"+coords.join(",");case"l":return cx+=coords[0],cy+=coords[1],"r"+coords.join(",");case"L":return cx=coords[0],cy=coords[1],"l"+coords.join(",");case"h":return cx+=coords[0],"r"+coords[0]+",0";case"H":return cx=coords[0],"l"+cx+","+cy;case"v":return cy+=coords[0],"r0,"+coords[0];case"V":return cy=coords[0],"l"+cx+","+cy;case"c":return ctrlx=cx+coords[coords.length-4],ctrly=cy+coords[coords.length-3],cx+=coords[coords.length-2],cy+=coords[coords.length-1],"v"+coords.join(",");case"C":return ctrlx=coords[coords.length-4],ctrly=coords[coords.length-3],cx=coords[coords.length-2],cy=coords[coords.length-1],"c"+coords.join(",");case"s":return coords.unshift(cy-ctrly),coords.unshift(cx-ctrlx),ctrlx=cx+coords[coords.length-4],ctrly=cy+coords[coords.length-3],cx+=coords[coords.length-2],cy+=coords[coords.length-1],"v"+coords.join(",");case"S":return coords.unshift(cy+cy-ctrly),coords.unshift(cx+cx-ctrlx),ctrlx=coords[coords.length-4],ctrly=coords[coords.length-3],cx=coords[coords.length-2],cy=coords[coords.length-1],"c"+coords.join(",")}return""}).replace(/z/g,"e")},jvm.VMLCircleElement=function(config,style){jvm.VMLCircleElement.parentClass.call(this,"oval",config,style)},jvm.inherits(jvm.VMLCircleElement,jvm.VMLShapeElement),jvm.VMLCircleElement.prototype.applyAttr=function(attr,value){switch(attr){case"r":this.node.style.width=2*value+"px",this.node.style.height=2*value+"px",this.applyAttr("cx",this.get("cx")||0),this.applyAttr("cy",this.get("cy")||0);break;case"cx":if(!value)return;this.node.style.left=value-(this.get("r")||0)+"px";break;case"cy":if(!value)return;this.node.style.top=value-(this.get("r")||0)+"px";break;default:jvm.VMLCircleElement.parentClass.prototype.applyAttr.call(this,attr,value)}},jvm.VectorCanvas=function(container,width,height){return this.mode=window.SVGAngle?"svg":"vml",this.impl="svg"==this.mode?new jvm.SVGCanvasElement(container,width,height):new jvm.VMLCanvasElement(container,width,height),this.impl.mode=this.mode,this.impl},jvm.SimpleScale=function(scale){this.scale=scale},jvm.SimpleScale.prototype.getValue=function(value){return value},jvm.OrdinalScale=function(scale){this.scale=scale},jvm.OrdinalScale.prototype.getValue=function(value){return this.scale[value]},jvm.OrdinalScale.prototype.getTicks=function(){var key,ticks=[];for(key in this.scale)ticks.push({label:key,value:this.scale[key]});return ticks},jvm.NumericScale=function(scale,normalizeFunction,minValue,maxValue){this.scale=[],normalizeFunction=normalizeFunction||"linear",scale&&this.setScale(scale),normalizeFunction&&this.setNormalizeFunction(normalizeFunction),"undefined"!=typeof minValue&&this.setMin(minValue),"undefined"!=typeof maxValue&&this.setMax(maxValue)},jvm.NumericScale.prototype={setMin:function(min){this.clearMinValue=min,this.minValue="function"==typeof this.normalize?this.normalize(min):min},setMax:function(max){this.clearMaxValue=max,this.maxValue="function"==typeof this.normalize?this.normalize(max):max},setScale:function(scale){var i;for(this.scale=[],i=0;i<scale.length;i++)this.scale[i]=[scale[i]]},setNormalizeFunction:function(f){"polynomial"===f?this.normalize=function(value){return Math.pow(value,.2)}:"linear"===f?delete this.normalize:this.normalize=f,this.setMin(this.clearMinValue),this.setMax(this.clearMaxValue)},getValue:function(value){var l,c,lengthes=[],fullLength=0,i=0;for("function"==typeof this.normalize&&(value=this.normalize(value)),i=0;i<this.scale.length-1;i++)l=this.vectorLength(this.vectorSubtract(this.scale[i+1],this.scale[i])),lengthes.push(l),fullLength+=l;for(c=(this.maxValue-this.minValue)/fullLength,i=0;i<lengthes.length;i++)lengthes[i]*=c;for(i=0,value-=this.minValue;value-lengthes[i]>=0;)value-=lengthes[i],i++;return value=this.vectorToNum(i==this.scale.length-1?this.scale[i]:this.vectorAdd(this.scale[i],this.vectorMult(this.vectorSubtract(this.scale[i+1],this.scale[i]),value/lengthes[i])))},vectorToNum:function(vector){var i,num=0;for(i=0;i<vector.length;i++)num+=Math.round(vector[i])*Math.pow(256,vector.length-i-1);return num},vectorSubtract:function(vector1,vector2){var i,vector=[];for(i=0;i<vector1.length;i++)vector[i]=vector1[i]-vector2[i];return vector},vectorAdd:function(vector1,vector2){var i,vector=[];for(i=0;i<vector1.length;i++)vector[i]=vector1[i]+vector2[i];return vector},vectorMult:function(vector,num){var i,result=[];for(i=0;i<vector.length;i++)result[i]=vector[i]*num;return result},vectorLength:function(vector){var i,result=0;for(i=0;i<vector.length;i++)result+=vector[i]*vector[i];return Math.sqrt(result)},getTicks:function(){var tick,v,m=5,extent=[this.clearMinValue,this.clearMaxValue],span=extent[1]-extent[0],step=Math.pow(10,Math.floor(Math.log(span/m)/Math.LN10)),err=m/span*step,ticks=[];for(.15>=err?step*=10:.35>=err?step*=5:.75>=err&&(step*=2),extent[0]=Math.floor(extent[0]/step)*step,extent[1]=Math.ceil(extent[1]/step)*step,tick=extent[0];tick<=extent[1];)v=tick==extent[0]?this.clearMinValue:tick==extent[1]?this.clearMaxValue:tick,ticks.push({label:tick,value:this.getValue(v)}),tick+=step;return ticks}},jvm.ColorScale=function(){jvm.ColorScale.parentClass.apply(this,arguments)},jvm.inherits(jvm.ColorScale,jvm.NumericScale),jvm.ColorScale.prototype.setScale=function(scale){var i;for(i=0;i<scale.length;i++)this.scale[i]=jvm.ColorScale.rgbToArray(scale[i])},jvm.ColorScale.prototype.getValue=function(value){return jvm.ColorScale.numToRgb(jvm.ColorScale.parentClass.prototype.getValue.call(this,value))},jvm.ColorScale.arrayToRgb=function(ar){var d,i,rgb="#";for(i=0;i<ar.length;i++)d=ar[i].toString(16),rgb+=1==d.length?"0"+d:d;return rgb},jvm.ColorScale.numToRgb=function(num){for(num=num.toString(16);num.length<6;)num="0"+num;return"#"+num},jvm.ColorScale.rgbToArray=function(rgb){return rgb=rgb.substr(1),[parseInt(rgb.substr(0,2),16),parseInt(rgb.substr(2,2),16),parseInt(rgb.substr(4,2),16)]},jvm.Legend=function(params){this.params=params||{},this.map=this.params.map,this.series=this.params.series,this.body=jvm.$("<div/>"),this.body.addClass("jvectormap-legend"),this.params.cssClass&&this.body.addClass(this.params.cssClass),params.vertical?this.map.legendCntVertical.append(this.body):this.map.legendCntHorizontal.append(this.body),this.render()},jvm.Legend.prototype.render=function(){var i,tick,sample,label,ticks=this.series.scale.getTicks(),inner=jvm.$("<div/>").addClass("jvectormap-legend-inner");for(this.body.html(""),this.params.title&&this.body.append(jvm.$("<div/>").addClass("jvectormap-legend-title").html(this.params.title)),this.body.append(inner),i=0;i<ticks.length;i++){switch(tick=jvm.$("<div/>").addClass("jvectormap-legend-tick"),sample=jvm.$("<div/>").addClass("jvectormap-legend-tick-sample"),this.series.params.attribute){case"fill":jvm.isImageUrl(ticks[i].value)?sample.css("background","url("+ticks[i].value+")"):sample.css("background",ticks[i].value);break;case"stroke":sample.css("background",ticks[i].value);break;case"image":sample.css("background","url("+ticks[i].value+") no-repeat center center");break;case"r":jvm.$("<div/>").css({"border-radius":ticks[i].value,border:this.map.params.markerStyle.initial["stroke-width"]+"px "+this.map.params.markerStyle.initial.stroke+" solid",width:2*ticks[i].value+"px",height:2*ticks[i].value+"px",background:this.map.params.markerStyle.initial.fill}).appendTo(sample)}tick.append(sample),label=ticks[i].label,this.params.labelRender&&(label=this.params.labelRender(label)),tick.append(jvm.$("<div>"+label+" </div>").addClass("jvectormap-legend-tick-text")),inner.append(tick)}inner.append(jvm.$("<div/>").css("clear","both"))},jvm.DataSeries=function(params,elements,map){var scaleConstructor;params=params||{},params.attribute=params.attribute||"fill",this.elements=elements,this.params=params,this.map=map,params.attributes&&this.setAttributes(params.attributes),jvm.$.isArray(params.scale)?(scaleConstructor="fill"===params.attribute||"stroke"===params.attribute?jvm.ColorScale:jvm.NumericScale,this.scale=new scaleConstructor(params.scale,params.normalizeFunction,params.min,params.max)):this.scale=params.scale?new jvm.OrdinalScale(params.scale):new jvm.SimpleScale(params.scale),this.values=params.values||{},this.setValues(this.values),this.params.legend&&(this.legend=new jvm.Legend($.extend({map:this.map,series:this},this.params.legend)))},jvm.DataSeries.prototype={setAttributes:function(key,attr){var code,attrs=key;if("string"==typeof key)this.elements[key]&&this.elements[key].setStyle(this.params.attribute,attr);else for(code in attrs)this.elements[code]&&this.elements[code].element.setStyle(this.params.attribute,attrs[code])},setValues:function(values){var val,cc,max=-Number.MAX_VALUE,min=Number.MAX_VALUE,attrs={};if(this.scale instanceof jvm.OrdinalScale||this.scale instanceof jvm.SimpleScale)for(cc in values)attrs[cc]=values[cc]?this.scale.getValue(values[cc]):this.elements[cc].element.style.initial[this.params.attribute];else{if("undefined"==typeof this.params.min||"undefined"==typeof this.params.max)for(cc in values)val=parseFloat(values[cc]),val>max&&(max=val),min>val&&(min=val);"undefined"==typeof this.params.min?(this.scale.setMin(min),this.params.min=min):this.scale.setMin(this.params.min),"undefined"==typeof this.params.max?(this.scale.setMax(max),this.params.max=max):this.scale.setMax(this.params.max);for(cc in values)"indexOf"!=cc&&(val=parseFloat(values[cc]),attrs[cc]=isNaN(val)?this.elements[cc].element.style.initial[this.params.attribute]:this.scale.getValue(val))}this.setAttributes(attrs),jvm.$.extend(this.values,values)},clear:function(){var key,attrs={};for(key in this.values)this.elements[key]&&(attrs[key]=this.elements[key].element.shape.style.initial[this.params.attribute]);this.setAttributes(attrs),this.values={}},setScale:function(scale){this.scale.setScale(scale),this.values&&this.setValues(this.values)},setNormalizeFunction:function(f){this.scale.setNormalizeFunction(f),this.values&&this.setValues(this.values)}},jvm.Proj={degRad:180/Math.PI,radDeg:Math.PI/180,radius:6381372,sgn:function(n){return n>0?1:0>n?-1:n},mill:function(lat,lng,c){return{x:this.radius*(lng-c)*this.radDeg,y:-this.radius*Math.log(Math.tan((45+.4*lat)*this.radDeg))/.8}},mill_inv:function(x,y,c){return{lat:(2.5*Math.atan(Math.exp(.8*y/this.radius))-5*Math.PI/8)*this.degRad,lng:(c*this.radDeg+x/this.radius)*this.degRad}},merc:function(lat,lng,c){return{x:this.radius*(lng-c)*this.radDeg,y:-this.radius*Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))}},merc_inv:function(x,y,c){return{lat:(2*Math.atan(Math.exp(y/this.radius))-Math.PI/2)*this.degRad,lng:(c*this.radDeg+x/this.radius)*this.degRad}},aea:function(lat,lng,c){var fi0=0,lambda0=c*this.radDeg,fi1=29.5*this.radDeg,fi2=45.5*this.radDeg,fi=lat*this.radDeg,lambda=lng*this.radDeg,n=(Math.sin(fi1)+Math.sin(fi2))/2,C=Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),theta=n*(lambda-lambda0),ro=Math.sqrt(C-2*n*Math.sin(fi))/n,ro0=Math.sqrt(C-2*n*Math.sin(fi0))/n;return{x:ro*Math.sin(theta)*this.radius,y:-(ro0-ro*Math.cos(theta))*this.radius}},aea_inv:function(xCoord,yCoord,c){var x=xCoord/this.radius,y=yCoord/this.radius,fi0=0,lambda0=c*this.radDeg,fi1=29.5*this.radDeg,fi2=45.5*this.radDeg,n=(Math.sin(fi1)+Math.sin(fi2))/2,C=Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),ro0=Math.sqrt(C-2*n*Math.sin(fi0))/n,ro=Math.sqrt(x*x+(ro0-y)*(ro0-y)),theta=Math.atan(x/(ro0-y));return{lat:Math.asin((C-ro*ro*n*n)/(2*n))*this.degRad,lng:(lambda0+theta/n)*this.degRad}},lcc:function(lat,lng,c){var fi0=0,lambda0=c*this.radDeg,lambda=lng*this.radDeg,fi1=33*this.radDeg,fi2=45*this.radDeg,fi=lat*this.radDeg,n=Math.log(Math.cos(fi1)*(1/Math.cos(fi2)))/Math.log(Math.tan(Math.PI/4+fi2/2)*(1/Math.tan(Math.PI/4+fi1/2))),F=Math.cos(fi1)*Math.pow(Math.tan(Math.PI/4+fi1/2),n)/n,ro=F*Math.pow(1/Math.tan(Math.PI/4+fi/2),n),ro0=F*Math.pow(1/Math.tan(Math.PI/4+fi0/2),n);return{x:ro*Math.sin(n*(lambda-lambda0))*this.radius,y:-(ro0-ro*Math.cos(n*(lambda-lambda0)))*this.radius}},lcc_inv:function(xCoord,yCoord,c){var x=xCoord/this.radius,y=yCoord/this.radius,fi0=0,lambda0=c*this.radDeg,fi1=33*this.radDeg,fi2=45*this.radDeg,n=Math.log(Math.cos(fi1)*(1/Math.cos(fi2)))/Math.log(Math.tan(Math.PI/4+fi2/2)*(1/Math.tan(Math.PI/4+fi1/2))),F=Math.cos(fi1)*Math.pow(Math.tan(Math.PI/4+fi1/2),n)/n,ro0=F*Math.pow(1/Math.tan(Math.PI/4+fi0/2),n),ro=this.sgn(n)*Math.sqrt(x*x+(ro0-y)*(ro0-y)),theta=Math.atan(x/(ro0-y));return{lat:(2*Math.atan(Math.pow(F/ro,1/n))-Math.PI/2)*this.degRad,lng:(lambda0+theta/n)*this.degRad}}},jvm.MapObject=function(){},jvm.MapObject.prototype.getLabelText=function(key){var text;return text=this.config.label?"function"==typeof this.config.label.render?this.config.label.render(key):key:null},jvm.MapObject.prototype.getLabelOffsets=function(key){var offsets;return this.config.label&&("function"==typeof this.config.label.offsets?offsets=this.config.label.offsets(key):"object"==typeof this.config.label.offsets&&(offsets=this.config.label.offsets[key])),offsets||[0,0]},jvm.MapObject.prototype.setHovered=function(isHovered){this.isHovered!==isHovered&&(this.isHovered=isHovered,this.shape.isHovered=isHovered,this.shape.updateStyle(),this.label&&(this.label.isHovered=isHovered,this.label.updateStyle()))},jvm.MapObject.prototype.setSelected=function(isSelected){this.isSelected!==isSelected&&(this.isSelected=isSelected,this.shape.isSelected=isSelected,this.shape.updateStyle(),this.label&&(this.label.isSelected=isSelected,this.label.updateStyle()),jvm.$(this.shape).trigger("selected",[isSelected]))},jvm.MapObject.prototype.setStyle=function(){this.shape.setStyle.apply(this.shape,arguments)},jvm.MapObject.prototype.remove=function(){this.shape.remove(),this.label&&this.label.remove()},jvm.Region=function(config){var bbox,text,offsets;this.config=config,this.map=this.config.map,this.shape=config.canvas.addPath({d:config.path,"data-code":config.code},config.style,config.canvas.rootElement),this.shape.addClass("jvectormap-region jvectormap-element"),bbox=this.shape.getBBox(),text=this.getLabelText(config.code),
this.config.label&&text&&(offsets=this.getLabelOffsets(config.code),this.labelX=bbox.x+bbox.width/2+offsets[0],this.labelY=bbox.y+bbox.height/2+offsets[1],this.label=config.canvas.addText({text:text,"text-anchor":"middle","alignment-baseline":"central",x:this.labelX,y:this.labelY,"data-code":config.code},config.labelStyle,config.labelsGroup),this.label.addClass("jvectormap-region jvectormap-element"))},jvm.inherits(jvm.Region,jvm.MapObject),jvm.Region.prototype.updateLabelPosition=function(){this.label&&this.label.set({x:this.labelX*this.map.scale+this.map.transX*this.map.scale,y:this.labelY*this.map.scale+this.map.transY*this.map.scale})},jvm.Marker=function(config){var text;this.config=config,this.map=this.config.map,this.isImage=!!this.config.style.initial.image,this.createShape(),text=this.getLabelText(config.index),this.config.label&&text&&(this.offsets=this.getLabelOffsets(config.index),this.labelX=config.cx/this.map.scale-this.map.transX,this.labelY=config.cy/this.map.scale-this.map.transY,this.label=config.canvas.addText({text:text,"data-index":config.index,dy:"0.6ex",x:this.labelX,y:this.labelY},config.labelStyle,config.labelsGroup),this.label.addClass("jvectormap-marker jvectormap-element"))},jvm.inherits(jvm.Marker,jvm.MapObject),jvm.Marker.prototype.createShape=function(){var that=this;this.shape&&this.shape.remove(),this.shape=this.config.canvas[this.isImage?"addImage":"addCircle"]({"data-index":this.config.index,cx:this.config.cx,cy:this.config.cy},this.config.style,this.config.group),this.shape.addClass("jvectormap-marker jvectormap-element"),this.isImage&&jvm.$(this.shape.node).on("imageloaded",function(){that.updateLabelPosition()})},jvm.Marker.prototype.updateLabelPosition=function(){this.label&&this.label.set({x:this.labelX*this.map.scale+this.offsets[0]+this.map.transX*this.map.scale+5+(this.isImage?(this.shape.width||0)/2:this.shape.properties.r),y:this.labelY*this.map.scale+this.map.transY*this.map.scale+this.offsets[1]})},jvm.Marker.prototype.setStyle=function(property){var isImage;jvm.Marker.parentClass.prototype.setStyle.apply(this,arguments),"r"===property&&this.updateLabelPosition(),isImage=!!this.shape.get("image"),isImage!=this.isImage&&(this.isImage=isImage,this.config.style=jvm.$.extend(!0,{},this.shape.style),this.createShape())},jvm.Map=function(params){var e,map=this;if(this.params=jvm.$.extend(!0,{},jvm.Map.defaultParams,params),!jvm.Map.maps[this.params.map])throw new Error("Attempt to use map which was not loaded: "+this.params.map);this.mapData=jvm.Map.maps[this.params.map],this.markers={},this.regions={},this.regionsColors={},this.regionsData={},this.container=jvm.$("<div>").addClass("jvectormap-container"),this.params.container&&this.params.container.append(this.container),this.container.data("mapObject",this),this.defaultWidth=this.mapData.width,this.defaultHeight=this.mapData.height,this.setBackgroundColor(this.params.backgroundColor),this.onResize=function(){map.updateSize()},jvm.$(window).resize(this.onResize);for(e in jvm.Map.apiEvents)this.params[e]&&this.container.bind(jvm.Map.apiEvents[e]+".jvectormap",this.params[e]);this.canvas=new jvm.VectorCanvas(this.container[0],this.width,this.height),this.params.bindTouchEvents&&("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch?this.bindContainerTouchEvents():window.MSGesture&&this.bindContainerPointerEvents()),this.bindContainerEvents(),this.bindElementEvents(),this.createTip(),this.params.zoomButtons&&this.bindZoomButtons(),this.createRegions(),this.createMarkers(this.params.markers||{}),this.updateSize(),this.params.focusOn&&("string"==typeof this.params.focusOn?this.params.focusOn={region:this.params.focusOn}:jvm.$.isArray(this.params.focusOn)&&(this.params.focusOn={regions:this.params.focusOn}),this.setFocus(this.params.focusOn)),this.params.selectedRegions&&this.setSelectedRegions(this.params.selectedRegions),this.params.selectedMarkers&&this.setSelectedMarkers(this.params.selectedMarkers),this.legendCntHorizontal=jvm.$("<div/>").addClass("jvectormap-legend-cnt jvectormap-legend-cnt-h"),this.legendCntVertical=jvm.$("<div/>").addClass("jvectormap-legend-cnt jvectormap-legend-cnt-v"),this.container.append(this.legendCntHorizontal),this.container.append(this.legendCntVertical),this.params.series&&this.createSeries()},jvm.Map.prototype={transX:0,transY:0,scale:1,baseTransX:0,baseTransY:0,baseScale:1,width:0,height:0,setBackgroundColor:function(backgroundColor){this.container.css("background-color",backgroundColor)},resize:function(){var curBaseScale=this.baseScale;this.width/this.height>this.defaultWidth/this.defaultHeight?(this.baseScale=this.height/this.defaultHeight,this.baseTransX=Math.abs(this.width-this.defaultWidth*this.baseScale)/(2*this.baseScale)):(this.baseScale=this.width/this.defaultWidth,this.baseTransY=Math.abs(this.height-this.defaultHeight*this.baseScale)/(2*this.baseScale)),this.scale*=this.baseScale/curBaseScale,this.transX*=this.baseScale/curBaseScale,this.transY*=this.baseScale/curBaseScale},updateSize:function(){this.width=this.container.width(),this.height=this.container.height(),this.resize(),this.canvas.setSize(this.width,this.height),this.applyTransform()},reset:function(){var key,i;for(key in this.series)for(i=0;i<this.series[key].length;i++)this.series[key][i].clear();this.scale=this.baseScale,this.transX=this.baseTransX,this.transY=this.baseTransY,this.applyTransform()},applyTransform:function(){var maxTransX,maxTransY,minTransX,minTransY;this.defaultWidth*this.scale<=this.width?(maxTransX=(this.width-this.defaultWidth*this.scale)/(2*this.scale),minTransX=(this.width-this.defaultWidth*this.scale)/(2*this.scale)):(maxTransX=0,minTransX=(this.width-this.defaultWidth*this.scale)/this.scale),this.defaultHeight*this.scale<=this.height?(maxTransY=(this.height-this.defaultHeight*this.scale)/(2*this.scale),minTransY=(this.height-this.defaultHeight*this.scale)/(2*this.scale)):(maxTransY=0,minTransY=(this.height-this.defaultHeight*this.scale)/this.scale),this.transY>maxTransY?this.transY=maxTransY:this.transY<minTransY&&(this.transY=minTransY),this.transX>maxTransX?this.transX=maxTransX:this.transX<minTransX&&(this.transX=minTransX),this.canvas.applyTransformParams(this.scale,this.transX,this.transY),this.markers&&this.repositionMarkers(),this.repositionLabels(),this.container.trigger("viewportChange",[this.scale/this.baseScale,this.transX,this.transY])},bindContainerEvents:function(){var oldPageX,oldPageY,mouseDown=!1,map=this;this.params.panOnDrag&&(this.container.mousemove(function(e){return mouseDown&&(map.transX-=(oldPageX-e.pageX)/map.scale,map.transY-=(oldPageY-e.pageY)/map.scale,map.applyTransform(),oldPageX=e.pageX,oldPageY=e.pageY),!1}).mousedown(function(e){return mouseDown=!0,oldPageX=e.pageX,oldPageY=e.pageY,!1}),this.onContainerMouseUp=function(){mouseDown=!1},jvm.$("body").mouseup(this.onContainerMouseUp)),this.params.zoomOnScroll&&this.container.mousewheel(function(event){var offset=jvm.$(map.container).offset(),centerX=event.pageX-offset.left,centerY=event.pageY-offset.top,zoomStep=Math.pow(1+map.params.zoomOnScrollSpeed/1e3,event.deltaFactor*event.deltaY);map.tip.hide(),map.setScale(map.scale*zoomStep,centerX,centerY),event.preventDefault()})},bindContainerTouchEvents:function(){var touchStartScale,touchStartDistance,touchX,touchY,centerTouchX,centerTouchY,lastTouchesLength,map=this,handleTouchEvent=function(e){var offset,scale,transXOld,transYOld,touches=e.originalEvent.touches;"touchstart"==e.type&&(lastTouchesLength=0),1==touches.length?(1==lastTouchesLength&&(transXOld=map.transX,transYOld=map.transY,map.transX-=(touchX-touches[0].pageX)/map.scale,map.transY-=(touchY-touches[0].pageY)/map.scale,map.applyTransform(),map.tip.hide(),(transXOld!=map.transX||transYOld!=map.transY)&&e.preventDefault()),touchX=touches[0].pageX,touchY=touches[0].pageY):2==touches.length&&(2==lastTouchesLength?(scale=Math.sqrt(Math.pow(touches[0].pageX-touches[1].pageX,2)+Math.pow(touches[0].pageY-touches[1].pageY,2))/touchStartDistance,map.setScale(touchStartScale*scale,centerTouchX,centerTouchY),map.tip.hide(),e.preventDefault()):(offset=jvm.$(map.container).offset(),centerTouchX=touches[0].pageX>touches[1].pageX?touches[1].pageX+(touches[0].pageX-touches[1].pageX)/2:touches[0].pageX+(touches[1].pageX-touches[0].pageX)/2,centerTouchY=touches[0].pageY>touches[1].pageY?touches[1].pageY+(touches[0].pageY-touches[1].pageY)/2:touches[0].pageY+(touches[1].pageY-touches[0].pageY)/2,centerTouchX-=offset.left,centerTouchY-=offset.top,touchStartScale=map.scale,touchStartDistance=Math.sqrt(Math.pow(touches[0].pageX-touches[1].pageX,2)+Math.pow(touches[0].pageY-touches[1].pageY,2)))),lastTouchesLength=touches.length};jvm.$(this.container).bind("touchstart",handleTouchEvent),jvm.$(this.container).bind("touchmove",handleTouchEvent)},bindContainerPointerEvents:function(){var map=this,gesture=new MSGesture,element=this.container[0],handlePointerDownEvent=function(e){gesture.addPointer(e.pointerId)},handleGestureEvent=function(e){var transXOld,transYOld;(0!=e.translationX||0!=e.translationY)&&(transXOld=map.transX,transYOld=map.transY,map.transX+=e.translationX/map.scale,map.transY+=e.translationY/map.scale,map.applyTransform(),map.tip.hide(),(transXOld!=map.transX||transYOld!=map.transY)&&e.preventDefault()),1!=e.scale&&(map.setScale(map.scale*e.scale,e.offsetX,e.offsetY),map.tip.hide(),e.preventDefault())};gesture.target=element,element.addEventListener("MSGestureChange",handleGestureEvent,!1),element.addEventListener("pointerdown",handlePointerDownEvent,!1)},bindElementEvents:function(){var pageX,pageY,mouseMoved,map=this;this.container.mousemove(function(e){Math.abs(pageX-e.pageX)+Math.abs(pageY-e.pageY)>2&&(mouseMoved=!0)}),this.container.delegate("[class~='jvectormap-element']","mouseover mouseout",function(e){var baseVal=jvm.$(this).attr("class").baseVal||jvm.$(this).attr("class"),type=-1===baseVal.indexOf("jvectormap-region")?"marker":"region",code=jvm.$(this).attr("region"==type?"data-code":"data-index"),element="region"==type?map.regions[code].element:map.markers[code].element,tipText="region"==type?map.mapData.paths[code].name:map.markers[code].config.name||"",tipShowEvent=jvm.$.Event(type+"TipShow.jvectormap"),overEvent=jvm.$.Event(type+"Over.jvectormap");"mouseover"==e.type?(map.container.trigger(overEvent,[code]),overEvent.isDefaultPrevented()||element.setHovered(!0),map.tip.text(tipText),map.container.trigger(tipShowEvent,[map.tip,code]),tipShowEvent.isDefaultPrevented()||(map.tip.show(),map.tipWidth=map.tip.width(),map.tipHeight=map.tip.height())):(element.setHovered(!1),map.tip.hide(),map.container.trigger(type+"Out.jvectormap",[code]))}),this.container.delegate("[class~='jvectormap-element']","mousedown",function(e){pageX=e.pageX,pageY=e.pageY,mouseMoved=!1}),this.container.delegate("[class~='jvectormap-element']","mouseup",function(){var baseVal=jvm.$(this).attr("class").baseVal?jvm.$(this).attr("class").baseVal:jvm.$(this).attr("class"),type=-1===baseVal.indexOf("jvectormap-region")?"marker":"region",code=jvm.$(this).attr("region"==type?"data-code":"data-index"),clickEvent=jvm.$.Event(type+"Click.jvectormap"),element="region"==type?map.regions[code].element:map.markers[code].element;mouseMoved||(map.container.trigger(clickEvent,[code]),("region"===type&&map.params.regionsSelectable||"marker"===type&&map.params.markersSelectable)&&(clickEvent.isDefaultPrevented()||(map.params[type+"sSelectableOne"]&&map.clearSelected(type+"s"),element.setSelected(!element.isSelected))))})},bindZoomButtons:function(){var map=this;jvm.$("<div/>").addClass("jvectormap-zoomin").text("+").appendTo(this.container),jvm.$("<div/>").addClass("jvectormap-zoomout").html("&#x2212;").appendTo(this.container),this.container.find(".jvectormap-zoomin").click(function(){map.setScale(map.scale*map.params.zoomStep,map.width/2,map.height/2,!1,map.params.zoomAnimate)}),this.container.find(".jvectormap-zoomout").click(function(){map.setScale(map.scale/map.params.zoomStep,map.width/2,map.height/2,!1,map.params.zoomAnimate)})},createTip:function(){var map=this;this.tip=jvm.$("<div/>").addClass("jvectormap-tip").appendTo(jvm.$("body")),this.container.mousemove(function(e){var left=e.pageX-15-map.tipWidth,top=e.pageY-15-map.tipHeight;5>left&&(left=e.pageX+15),5>top&&(top=e.pageY+15),map.tip.css({left:left,top:top})})},setScale:function(scale,anchorX,anchorY,isCentered,animate){var interval,scaleStart,scaleDiff,transXStart,transXDiff,transYStart,transYDiff,transX,transY,viewportChangeEvent=jvm.$.Event("zoom.jvectormap"),that=this,i=0,count=Math.abs(Math.round(60*(scale-this.scale)/Math.max(scale,this.scale))),deferred=new jvm.$.Deferred;return scale>this.params.zoomMax*this.baseScale?scale=this.params.zoomMax*this.baseScale:scale<this.params.zoomMin*this.baseScale&&(scale=this.params.zoomMin*this.baseScale),"undefined"!=typeof anchorX&&"undefined"!=typeof anchorY&&(zoomStep=scale/this.scale,isCentered?(transX=anchorX+this.defaultWidth*(this.width/(this.defaultWidth*scale))/2,transY=anchorY+this.defaultHeight*(this.height/(this.defaultHeight*scale))/2):(transX=this.transX-(zoomStep-1)/scale*anchorX,transY=this.transY-(zoomStep-1)/scale*anchorY)),animate&&count>0?(scaleStart=this.scale,scaleDiff=(scale-scaleStart)/count,transXStart=this.transX*this.scale,transYStart=this.transY*this.scale,transXDiff=(transX*scale-transXStart)/count,transYDiff=(transY*scale-transYStart)/count,interval=setInterval(function(){i+=1,that.scale=scaleStart+scaleDiff*i,that.transX=(transXStart+transXDiff*i)/that.scale,that.transY=(transYStart+transYDiff*i)/that.scale,that.applyTransform(),i==count&&(clearInterval(interval),that.container.trigger(viewportChangeEvent,[scale/that.baseScale]),deferred.resolve())},10)):(this.transX=transX,this.transY=transY,this.scale=scale,this.applyTransform(),this.container.trigger(viewportChangeEvent,[scale/this.baseScale]),deferred.resolve()),deferred},setFocus:function(config){var bbox,itemBbox,newBbox,codes,i,point;if(config=config||{},config.region?codes=[config.region]:config.regions&&(codes=config.regions),codes){for(i=0;i<codes.length;i++)this.regions[codes[i]]&&(itemBbox=this.regions[codes[i]].element.shape.getBBox(),itemBbox&&("undefined"==typeof bbox?bbox=itemBbox:(newBbox={x:Math.min(bbox.x,itemBbox.x),y:Math.min(bbox.y,itemBbox.y),width:Math.max(bbox.x+bbox.width,itemBbox.x+itemBbox.width)-Math.min(bbox.x,itemBbox.x),height:Math.max(bbox.y+bbox.height,itemBbox.y+itemBbox.height)-Math.min(bbox.y,itemBbox.y)},bbox=newBbox)));return this.setScale(Math.min(this.width/bbox.width,this.height/bbox.height),-(bbox.x+bbox.width/2),-(bbox.y+bbox.height/2),!0,config.animate)}return config.lat&&config.lng?(point=this.latLngToPoint(config.lat,config.lng),config.x=this.transX-point.x/this.scale,config.y=this.transY-point.y/this.scale):config.x&&config.y&&(config.x*=-this.defaultWidth,config.y*=-this.defaultHeight),this.setScale(config.scale*this.baseScale,config.x,config.y,!0,config.animate)},getSelected:function(type){var key,selected=[];for(key in this[type])this[type][key].element.isSelected&&selected.push(key);return selected},getSelectedRegions:function(){return this.getSelected("regions")},getSelectedMarkers:function(){return this.getSelected("markers")},setSelected:function(type,keys){var i;if("object"!=typeof keys&&(keys=[keys]),jvm.$.isArray(keys))for(i=0;i<keys.length;i++)this[type][keys[i]].element.setSelected(!0);else for(i in keys)this[type][i].element.setSelected(!!keys[i])},setSelectedRegions:function(keys){this.setSelected("regions",keys)},setSelectedMarkers:function(keys){this.setSelected("markers",keys)},clearSelected:function(type){var i,select={},selected=this.getSelected(type);for(i=0;i<selected.length;i++)select[selected[i]]=!1;this.setSelected(type,select)},clearSelectedRegions:function(){this.clearSelected("regions")},clearSelectedMarkers:function(){this.clearSelected("markers")},getMapObject:function(){return this},getRegionName:function(code){return this.mapData.paths[code].name},createRegions:function(){var key,region,map=this;this.regionLabelsGroup=this.regionLabelsGroup||this.canvas.addGroup();for(key in this.mapData.paths)region=new jvm.Region({map:this,path:this.mapData.paths[key].path,code:key,style:jvm.$.extend(!0,{},this.params.regionStyle),labelStyle:jvm.$.extend(!0,{},this.params.regionLabelStyle),canvas:this.canvas,labelsGroup:this.regionLabelsGroup,label:"vml"!=this.canvas.mode?this.params.labels&&this.params.labels.regions:null}),jvm.$(region.shape).bind("selected",function(e,isSelected){map.container.trigger("regionSelected.jvectormap",[jvm.$(this.node).attr("data-code"),isSelected,map.getSelectedRegions()])}),this.regions[key]={element:region,config:this.mapData.paths[key]}},createMarkers:function(markers){var i,marker,point,markerConfig,markersArray,map=this;if(this.markersGroup=this.markersGroup||this.canvas.addGroup(),this.markerLabelsGroup=this.markerLabelsGroup||this.canvas.addGroup(),jvm.$.isArray(markers))for(markersArray=markers.slice(),markers={},i=0;i<markersArray.length;i++)markers[i]=markersArray[i];for(i in markers)markerConfig=markers[i]instanceof Array?{latLng:markers[i]}:markers[i],point=this.getMarkerPosition(markerConfig),point!==!1&&(marker=new jvm.Marker({map:this,style:jvm.$.extend(!0,{},this.params.markerStyle,{initial:markerConfig.style||{}}),labelStyle:jvm.$.extend(!0,{},this.params.markerLabelStyle),index:i,cx:point.x,cy:point.y,group:this.markersGroup,canvas:this.canvas,labelsGroup:this.markerLabelsGroup,label:"vml"!=this.canvas.mode?this.params.labels&&this.params.labels.markers:null}),jvm.$(marker.shape).bind("selected",function(e,isSelected){map.container.trigger("markerSelected.jvectormap",[jvm.$(this.node).attr("data-index"),isSelected,map.getSelectedMarkers()])}),this.markers[i]&&this.removeMarkers([i]),this.markers[i]={element:marker,config:markerConfig})},repositionMarkers:function(){var i,point;for(i in this.markers)point=this.getMarkerPosition(this.markers[i].config),point!==!1&&this.markers[i].element.setStyle({cx:point.x,cy:point.y})},repositionLabels:function(){var key;for(key in this.regions)this.regions[key].element.updateLabelPosition();for(key in this.markers)this.markers[key].element.updateLabelPosition()},getMarkerPosition:function(markerConfig){return jvm.Map.maps[this.params.map].projection?this.latLngToPoint.apply(this,markerConfig.latLng||[0,0]):{x:markerConfig.coords[0]*this.scale+this.transX*this.scale,y:markerConfig.coords[1]*this.scale+this.transY*this.scale}},addMarker:function(key,marker,seriesData){var values,i,markers={},data=[],seriesData=seriesData||[];for(markers[key]=marker,i=0;i<seriesData.length;i++)values={},"undefined"!=typeof seriesData[i]&&(values[key]=seriesData[i]),data.push(values);this.addMarkers(markers,data)},addMarkers:function(markers,seriesData){var i;for(seriesData=seriesData||[],this.createMarkers(markers),i=0;i<seriesData.length;i++)this.series.markers[i].setValues(seriesData[i]||{})},removeMarkers:function(markers){var i;for(i=0;i<markers.length;i++)this.markers[markers[i]].element.remove(),delete this.markers[markers[i]]},removeAllMarkers:function(){var i,markers=[];for(i in this.markers)markers.push(i);this.removeMarkers(markers)},latLngToPoint:function(lat,lng){var point,inset,bbox,proj=jvm.Map.maps[this.params.map].projection,centralMeridian=proj.centralMeridian;return-180+centralMeridian>lng&&(lng+=360),point=jvm.Proj[proj.type](lat,lng,centralMeridian),inset=this.getInsetForPoint(point.x,point.y),inset?(bbox=inset.bbox,point.x=(point.x-bbox[0].x)/(bbox[1].x-bbox[0].x)*inset.width*this.scale,point.y=(point.y-bbox[0].y)/(bbox[1].y-bbox[0].y)*inset.height*this.scale,{x:point.x+this.transX*this.scale+inset.left*this.scale,y:point.y+this.transY*this.scale+inset.top*this.scale}):!1},pointToLatLng:function(x,y){var i,inset,bbox,nx,ny,proj=jvm.Map.maps[this.params.map].projection,centralMeridian=proj.centralMeridian,insets=jvm.Map.maps[this.params.map].insets;for(i=0;i<insets.length;i++)if(inset=insets[i],bbox=inset.bbox,nx=x-(this.transX*this.scale+inset.left*this.scale),ny=y-(this.transY*this.scale+inset.top*this.scale),nx=nx/(inset.width*this.scale)*(bbox[1].x-bbox[0].x)+bbox[0].x,ny=ny/(inset.height*this.scale)*(bbox[1].y-bbox[0].y)+bbox[0].y,nx>bbox[0].x&&nx<bbox[1].x&&ny>bbox[0].y&&ny<bbox[1].y)return jvm.Proj[proj.type+"_inv"](nx,-ny,centralMeridian);return!1},getInsetForPoint:function(x,y){var i,bbox,insets=jvm.Map.maps[this.params.map].insets;for(i=0;i<insets.length;i++)if(bbox=insets[i].bbox,x>bbox[0].x&&x<bbox[1].x&&y>bbox[0].y&&y<bbox[1].y)return insets[i]},createSeries:function(){var i,key;this.series={markers:[],regions:[]};for(key in this.params.series)for(i=0;i<this.params.series[key].length;i++)this.series[key][i]=new jvm.DataSeries(this.params.series[key][i],this[key],this)},remove:function(){this.tip.remove(),this.container.remove(),jvm.$(window).unbind("resize",this.onResize),jvm.$("body").unbind("mouseup",this.onContainerMouseUp)}},jvm.Map.maps={},jvm.Map.defaultParams={map:"world_mill_en",backgroundColor:"#505050",zoomButtons:!0,zoomOnScroll:!0,zoomOnScrollSpeed:3,panOnDrag:!0,zoomMax:8,zoomMin:1,zoomStep:1.6,zoomAnimate:!0,regionsSelectable:!1,markersSelectable:!1,bindTouchEvents:!0,regionStyle:{initial:{fill:"white","fill-opacity":1,stroke:"none","stroke-width":0,"stroke-opacity":1},hover:{"fill-opacity":.8,cursor:"pointer"},selected:{fill:"yellow"},selectedHover:{}},regionLabelStyle:{initial:{"font-family":"Verdana","font-size":"12","font-weight":"bold",cursor:"default",fill:"black"},hover:{cursor:"pointer"}},markerStyle:{initial:{fill:"grey",stroke:"#505050","fill-opacity":1,"stroke-width":1,"stroke-opacity":1,r:5},hover:{stroke:"black","stroke-width":2,cursor:"pointer"},selected:{fill:"blue"},selectedHover:{}},markerLabelStyle:{initial:{"font-family":"Verdana","font-size":"12","font-weight":"bold",cursor:"default",fill:"black"},hover:{cursor:"pointer"}}},jvm.Map.apiEvents={onRegionTipShow:"regionTipShow",onRegionOver:"regionOver",onRegionOut:"regionOut",onRegionClick:"regionClick",onRegionSelected:"regionSelected",onMarkerTipShow:"markerTipShow",onMarkerOver:"markerOver",onMarkerOut:"markerOut",onMarkerClick:"markerClick",onMarkerSelected:"markerSelected",onViewportChange:"viewportChange"},jvm.MultiMap=function(params){var that=this;this.maps={},this.params=jvm.$.extend(!0,{},jvm.MultiMap.defaultParams,params),this.params.maxLevel=this.params.maxLevel||Number.MAX_VALUE,this.params.main=this.params.main||{},this.params.main.multiMapLevel=0,this.history=[this.addMap(this.params.main.map,this.params.main)],this.defaultProjection=this.history[0].mapData.projection.type,this.mapsLoaded={},this.params.container.css({position:"relative"}),this.backButton=jvm.$("<div/>").addClass("jvectormap-goback").text("Back").appendTo(this.params.container),this.backButton.hide(),this.backButton.click(function(){that.goBack()}),this.spinner=jvm.$("<div/>").addClass("jvectormap-spinner").appendTo(this.params.container),this.spinner.hide()},jvm.MultiMap.prototype={addMap:function(name,config){var cnt=jvm.$("<div/>").css({width:"100%",height:"100%"});return this.params.container.append(cnt),this.maps[name]=new jvm.Map(jvm.$.extend(config,{container:cnt})),this.params.maxLevel>config.multiMapLevel&&this.maps[name].container.on("regionClick.jvectormap",{scope:this},function(e,code){var multimap=e.data.scope,mapName=multimap.params.mapNameByCode(code,multimap);multimap.drillDownPromise&&"pending"===multimap.drillDownPromise.state()||multimap.drillDown(mapName,code)}),this.maps[name]},downloadMap:function(code){var that=this,deferred=jvm.$.Deferred();return this.mapsLoaded[code]?deferred.resolve():jvm.$.get(this.params.mapUrlByCode(code,this)).then(function(){that.mapsLoaded[code]=!0,deferred.resolve()},function(){deferred.reject()}),deferred},drillDown:function(name,code){var currentMap=this.history[this.history.length-1],that=this,focusPromise=currentMap.setFocus({region:code,animate:!0}),downloadPromise=this.downloadMap(code);focusPromise.then(function(){"pending"===downloadPromise.state()&&that.spinner.show()}),downloadPromise.always(function(){that.spinner.hide()}),this.drillDownPromise=jvm.$.when(downloadPromise,focusPromise),this.drillDownPromise.then(function(){currentMap.params.container.hide(),that.maps[name]?that.maps[name].params.container.show():that.addMap(name,{map:name,multiMapLevel:currentMap.params.multiMapLevel+1}),that.history.push(that.maps[name]),that.backButton.show()})},goBack:function(){var currentMap=this.history.pop(),prevMap=this.history[this.history.length-1],that=this;currentMap.setFocus({scale:1,x:.5,y:.5,animate:!0}).then(function(){currentMap.params.container.hide(),prevMap.params.container.show(),prevMap.updateSize(),1===that.history.length&&that.backButton.hide(),prevMap.setFocus({scale:1,x:.5,y:.5,animate:!0})})}},jvm.MultiMap.defaultParams={mapNameByCode:function(code,multiMap){return code.toLowerCase()+"_"+multiMap.defaultProjection+"_en"},mapUrlByCode:function(code,multiMap){return"jquery-jvectormap-data-"+code.toLowerCase()+"-"+multiMap.defaultProjection+"-en.js"}};
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays :
                this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.22.2';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'YYYY-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/*@preserve
 * Tempus Dominus Bootstrap4 v5.1.2 (https://tempusdominus.github.io/bootstrap-4/)
 * Copyright 2016-2018 Jonathan Peterson
 * Licensed under MIT (https://github.com/tempusdominus/bootstrap-3/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Tempus Dominus Bootstrap4's requires jQuery. jQuery must be included before Tempus Dominus Bootstrap4's JavaScript.");if(+function(a){var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1===b[0]&&9===b[1]&&b[2]<1||b[0]>=4)throw new Error("Tempus Dominus Bootstrap4's requires at least jQuery v3.0.0 but less than v4.0.0")}(jQuery),"undefined"==typeof moment)throw new Error("Tempus Dominus Bootstrap4's requires moment.js. Moment.js must be included before Tempus Dominus Bootstrap4's JavaScript.");var version=moment.version.split(".");if(version[0]<=2&&version[1]<17||version[0]>=3)throw new Error("Tempus Dominus Bootstrap4's requires at least moment.js v2.17.0 but less than v3.0.0");+function(){function a(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function b(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(a,b){var d="datetimepicker",f=""+d,g="."+f,h=".data-api",i={DATA_TOGGLE:'[data-toggle="'+f+'"]'},j={INPUT:d+"-input"},k={CHANGE:"change"+g,BLUR:"blur"+g,KEYUP:"keyup"+g,KEYDOWN:"keydown"+g,FOCUS:"focus"+g,CLICK_DATA_API:"click"+g+h,UPDATE:"update"+g,ERROR:"error"+g,HIDE:"hide"+g,SHOW:"show"+g},l=[{CLASS_NAME:"days",NAV_FUNCTION:"M",NAV_STEP:1},{CLASS_NAME:"months",NAV_FUNCTION:"y",NAV_STEP:1},{CLASS_NAME:"years",NAV_FUNCTION:"y",NAV_STEP:10},{CLASS_NAME:"decades",NAV_FUNCTION:"y",NAV_STEP:100}],m={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t",delete:46,46:"delete"},n=["times","days","months","years","decades"],o={},p={},q={timeZone:"",format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:b.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"fa fa-clock-o",date:"fa fa-calendar",up:"fa fa-arrow-up",down:"fa fa-arrow-down",previous:"fa fa-chevron-left",next:"fa fa-chevron-right",today:"fa fa-calendar-check-o",clear:"fa fa-delete",close:"fa fa-times"},tooltips:{today:"Go to today",clear:"Clear selection",close:"Close the picker",selectMonth:"Select Month",prevMonth:"Previous Month",nextMonth:"Next Month",selectYear:"Select Year",prevYear:"Previous Year",nextYear:"Next Year",selectDecade:"Select Decade",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevCentury:"Previous Century",nextCentury:"Next Century",pickHour:"Pick Hour",incrementHour:"Increment Hour",decrementHour:"Decrement Hour",pickMinute:"Pick Minute",incrementMinute:"Increment Minute",decrementMinute:"Decrement Minute",pickSecond:"Pick Second",incrementSecond:"Increment Second",decrementSecond:"Decrement Second",togglePeriod:"Toggle Period",selectTime:"Select Time",selectDate:"Select Date"},useStrict:!1,sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",buttons:{showToday:!1,showClear:!1,showClose:!1},widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,keyBinds:{up:function(){if(!this.widget)return!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")?this.date(a.clone().subtract(7,"d")):this.date(a.clone().add(this.stepping(),"m")),!0},down:function(){if(!this.widget)return this.show(),!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")?this.date(a.clone().add(7,"d")):this.date(a.clone().subtract(this.stepping(),"m")),!0},"control up":function(){if(!this.widget)return!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")?this.date(a.clone().subtract(1,"y")):this.date(a.clone().add(1,"h")),!0},"control down":function(){if(!this.widget)return!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")?this.date(a.clone().add(1,"y")):this.date(a.clone().subtract(1,"h")),!0},left:function(){if(!this.widget)return!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")&&this.date(a.clone().subtract(1,"d")),!0},right:function(){if(!this.widget)return!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")&&this.date(a.clone().add(1,"d")),!0},pageUp:function(){if(!this.widget)return!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")&&this.date(a.clone().subtract(1,"M")),!0},pageDown:function(){if(!this.widget)return!1;var a=this._dates[0]||this.getMoment();return this.widget.find(".datepicker").is(":visible")&&this.date(a.clone().add(1,"M")),!0},enter:function(){return!!this.widget&&(this.hide(),!0)},escape:function(){return!!this.widget&&(this.hide(),!0)},"control space":function(){return!!this.widget&&(this.widget.find(".timepicker").is(":visible")&&this.widget.find('.btn[data-action="togglePeriod"]').click(),!0)},t:function(){return!!this.widget&&(this.date(this.getMoment()),!0)},delete:function(){return!!this.widget&&(this.clear(),!0)}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1,allowMultidate:!1,multidateSeparator:","},r=function(){function r(a,b){c(this,r),this._options=this._getOptions(b),this._element=a,this._dates=[],this._datesFormatted=[],this._viewDate=null,this.unset=!0,this.component=!1,this.widget=!1,this.use24Hours=null,this.actualFormat=null,this.parseFormats=null,this.currentViewMode=null,this.MinViewModeNumber=0,this._int()}return r.prototype._int=function(){var b=this._element.data("target-input");this._element.is("input")?this.input=this._element:void 0!==b&&("nearest"===b?this.input=this._element.find("input"):this.input=a(b)),this._dates=[],this._dates[0]=this.getMoment(),this._viewDate=this.getMoment().clone(),a.extend(!0,this._options,this._dataToOptions()),this.options(this._options),this._initFormatting(),void 0!==this.input&&this.input.is("input")&&0!==this.input.val().trim().length?this._setValue(this._parseInputDate(this.input.val().trim()),0):this._options.defaultDate&&void 0!==this.input&&void 0===this.input.attr("placeholder")&&this._setValue(this._options.defaultDate,0),this._options.inline&&this.show()},r.prototype._update=function(){this.widget&&(this._fillDate(),this._fillTime())},r.prototype._setValue=function(a,b){var c=this.unset?null:this._dates[b],d="";if(!a)return this._options.allowMultidate&&1!==this._dates.length?(d=this._element.data("date")+",",d=d.replace(c.format(this.actualFormat)+",","").replace(",,","").replace(/,\s*$/,""),this._dates.splice(b,1),this._datesFormatted.splice(b,1)):(this.unset=!0,this._dates=[],this._datesFormatted=[]),void 0!==this.input&&(this.input.val(d),this.input.trigger("input")),this._element.data("date",d),this._notifyEvent({type:r.Event.CHANGE,date:!1,oldDate:c}),void this._update();if(a=a.clone().locale(this._options.locale),this._hasTimeZone()&&a.tz(this._options.timeZone),1!==this._options.stepping&&a.minutes(Math.round(a.minutes()/this._options.stepping)*this._options.stepping).seconds(0),this._isValid(a)){if(this._dates[b]=a,this._datesFormatted[b]=a.format("YYYY-MM-DD"),this._viewDate=a.clone(),this._options.allowMultidate&&this._dates.length>1){for(var e=0;e<this._dates.length;e++)d+=""+this._dates[e].format(this.actualFormat)+this._options.multidateSeparator;d=d.replace(/,\s*$/,"")}else d=this._dates[b].format(this.actualFormat);void 0!==this.input&&(this.input.val(d),this.input.trigger("input")),this._element.data("date",d),this.unset=!1,this._update(),this._notifyEvent({type:r.Event.CHANGE,date:this._dates[b].clone(),oldDate:c})}else this._options.keepInvalid?this._notifyEvent({type:r.Event.CHANGE,date:a,oldDate:c}):void 0!==this.input&&(this.input.val(""+(this.unset?"":this._dates[b].format(this.actualFormat))),this.input.trigger("input")),this._notifyEvent({type:r.Event.ERROR,date:a,oldDate:c})},r.prototype._change=function(b){var c=a(b.target).val().trim(),d=c?this._parseInputDate(c):null;return this._setValue(d),b.stopImmediatePropagation(),!1},r.prototype._getOptions=function(b){return b=a.extend(!0,{},q,b)},r.prototype._hasTimeZone=function(){return void 0!==b.tz&&void 0!==this._options.timeZone&&null!==this._options.timeZone&&""!==this._options.timeZone},r.prototype._isEnabled=function(a){if("string"!=typeof a||a.length>1)throw new TypeError("isEnabled expects a single character string parameter");switch(a){case"y":return this.actualFormat.indexOf("Y")!==-1;case"M":return this.actualFormat.indexOf("M")!==-1;case"d":return this.actualFormat.toLowerCase().indexOf("d")!==-1;case"h":case"H":return this.actualFormat.toLowerCase().indexOf("h")!==-1;case"m":return this.actualFormat.indexOf("m")!==-1;case"s":return this.actualFormat.indexOf("s")!==-1;case"a":case"A":return this.actualFormat.toLowerCase().indexOf("a")!==-1;default:return!1}},r.prototype._hasTime=function(){return this._isEnabled("h")||this._isEnabled("m")||this._isEnabled("s")},r.prototype._hasDate=function(){return this._isEnabled("y")||this._isEnabled("M")||this._isEnabled("d")},r.prototype._dataToOptions=function(){var b=this._element.data(),c={};return b.dateOptions&&b.dateOptions instanceof Object&&(c=a.extend(!0,c,b.dateOptions)),a.each(this._options,function(a){var d="date"+a.charAt(0).toUpperCase()+a.slice(1);void 0!==b[d]?c[a]=b[d]:delete c[a]}),c},r.prototype._notifyEvent=function(a){a.type===r.Event.CHANGE&&(a.date&&a.date.isSame(a.oldDate))||!a.date&&!a.oldDate||this._element.trigger(a)},r.prototype._viewUpdate=function(a){"y"===a&&(a="YYYY"),this._notifyEvent({type:r.Event.UPDATE,change:a,viewDate:this._viewDate.clone()})},r.prototype._showMode=function(a){this.widget&&(a&&(this.currentViewMode=Math.max(this.MinViewModeNumber,Math.min(3,this.currentViewMode+a))),this.widget.find(".datepicker > div").hide().filter(".datepicker-"+l[this.currentViewMode].CLASS_NAME).show())},r.prototype._isInDisabledDates=function(a){return this._options.disabledDates[a.format("YYYY-MM-DD")]===!0},r.prototype._isInEnabledDates=function(a){return this._options.enabledDates[a.format("YYYY-MM-DD")]===!0},r.prototype._isInDisabledHours=function(a){return this._options.disabledHours[a.format("H")]===!0},r.prototype._isInEnabledHours=function(a){return this._options.enabledHours[a.format("H")]===!0},r.prototype._isValid=function(b,c){if(!b.isValid())return!1;if(this._options.disabledDates&&"d"===c&&this._isInDisabledDates(b))return!1;if(this._options.enabledDates&&"d"===c&&!this._isInEnabledDates(b))return!1;if(this._options.minDate&&b.isBefore(this._options.minDate,c))return!1;if(this._options.maxDate&&b.isAfter(this._options.maxDate,c))return!1;if(this._options.daysOfWeekDisabled&&"d"===c&&this._options.daysOfWeekDisabled.indexOf(b.day())!==-1)return!1;if(this._options.disabledHours&&("h"===c||"m"===c||"s"===c)&&this._isInDisabledHours(b))return!1;if(this._options.enabledHours&&("h"===c||"m"===c||"s"===c)&&!this._isInEnabledHours(b))return!1;if(this._options.disabledTimeIntervals&&("h"===c||"m"===c||"s"===c)){var d=!1;if(a.each(this._options.disabledTimeIntervals,function(){if(b.isBetween(this[0],this[1]))return d=!0,!1}),d)return!1}return!0},r.prototype._parseInputDate=function(a){return void 0===this._options.parseInputDate?b.isMoment(a)||(a=this.getMoment(a)):a=this._options.parseInputDate(a),a},r.prototype._keydown=function(a){var b=null,c=void 0,d=void 0,e=void 0,f=void 0,g=[],h={},i=a.which,j="p";o[i]=j;for(c in o)o.hasOwnProperty(c)&&o[c]===j&&(g.push(c),parseInt(c,10)!==i&&(h[c]=!0));for(c in this._options.keyBinds)if(this._options.keyBinds.hasOwnProperty(c)&&"function"==typeof this._options.keyBinds[c]&&(e=c.split(" "),e.length===g.length&&m[i]===e[e.length-1])){for(f=!0,d=e.length-2;d>=0;d--)if(!(m[e[d]]in h)){f=!1;break}if(f){b=this._options.keyBinds[c];break}}b&&b.call(this)&&(a.stopPropagation(),a.preventDefault())},r.prototype._keyup=function(a){o[a.which]="r",p[a.which]&&(p[a.which]=!1,a.stopPropagation(),a.preventDefault())},r.prototype._indexGivenDates=function(b){var c={},d=this;return a.each(b,function(){var a=d._parseInputDate(this);a.isValid()&&(c[a.format("YYYY-MM-DD")]=!0)}),!!Object.keys(c).length&&c},r.prototype._indexGivenHours=function(b){var c={};return a.each(b,function(){c[this]=!0}),!!Object.keys(c).length&&c},r.prototype._initFormatting=function(){var a=this._options.format||"L LT",b=this;this.actualFormat=a.replace(/(\[[^\[]*])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){return b._dates[0].localeData().longDateFormat(a)||a}),this.parseFormats=this._options.extraFormats?this._options.extraFormats.slice():[],this.parseFormats.indexOf(a)<0&&this.parseFormats.indexOf(this.actualFormat)<0&&this.parseFormats.push(this.actualFormat),this.use24Hours=this.actualFormat.toLowerCase().indexOf("a")<1&&this.actualFormat.replace(/\[.*?]/g,"").indexOf("h")<1,this._isEnabled("y")&&(this.MinViewModeNumber=2),this._isEnabled("M")&&(this.MinViewModeNumber=1),this._isEnabled("d")&&(this.MinViewModeNumber=0),this.currentViewMode=Math.max(this.MinViewModeNumber,this.currentViewMode),this.unset||this._setValue(this._dates[0],0)},r.prototype._getLastPickedDate=function(){return this._dates[this._getLastPickedDateIndex()]},r.prototype._getLastPickedDateIndex=function(){return this._dates.length-1},r.prototype.getMoment=function(a){var c=void 0;return c=void 0===a||null===a?b():this._hasTimeZone()?b.tz(a,this.parseFormats,this._options.locale,this._options.useStrict,this._options.timeZone):b(a,this.parseFormats,this._options.locale,this._options.useStrict),this._hasTimeZone()&&c.tz(this._options.timeZone),c},r.prototype.toggle=function(){return this.widget?this.hide():this.show()},r.prototype.ignoreReadonly=function(a){if(0===arguments.length)return this._options.ignoreReadonly;if("boolean"!=typeof a)throw new TypeError("ignoreReadonly () expects a boolean parameter");this._options.ignoreReadonly=a},r.prototype.options=function(b){if(0===arguments.length)return a.extend(!0,{},this._options);if(!(b instanceof Object))throw new TypeError("options() this.options parameter should be an object");a.extend(!0,this._options,b);var c=this;a.each(this._options,function(a,b){void 0!==c[a]&&c[a](b)})},r.prototype.date=function(a,c){if(c=c||0,0===arguments.length)return this.unset?null:this._options.allowMultidate?this._dates.join(this._options.multidateSeparator):this._dates[c].clone();if(!(null===a||"string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");this._setValue(null===a?null:this._parseInputDate(a),c)},r.prototype.format=function(a){if(0===arguments.length)return this._options.format;if("string"!=typeof a&&("boolean"!=typeof a||a!==!1))throw new TypeError("format() expects a string or boolean:false parameter "+a);this._options.format=a,this.actualFormat&&this._initFormatting()},r.prototype.timeZone=function(a){if(0===arguments.length)return this._options.timeZone;if("string"!=typeof a)throw new TypeError("newZone() expects a string parameter");this._options.timeZone=a},r.prototype.dayViewHeaderFormat=function(a){if(0===arguments.length)return this._options.dayViewHeaderFormat;if("string"!=typeof a)throw new TypeError("dayViewHeaderFormat() expects a string parameter");this._options.dayViewHeaderFormat=a},r.prototype.extraFormats=function(a){if(0===arguments.length)return this._options.extraFormats;if(a!==!1&&!(a instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");this._options.extraFormats=a,this.parseFormats&&this._initFormatting()},r.prototype.disabledDates=function(b){if(0===arguments.length)return this._options.disabledDates?a.extend({},this._options.disabledDates):this._options.disabledDates;if(!b)return this._options.disabledDates=!1,this._update(),!0;if(!(b instanceof Array))throw new TypeError("disabledDates() expects an array parameter");this._options.disabledDates=this._indexGivenDates(b),this._options.enabledDates=!1,this._update()},r.prototype.enabledDates=function(b){if(0===arguments.length)return this._options.enabledDates?a.extend({},this._options.enabledDates):this._options.enabledDates;if(!b)return this._options.enabledDates=!1,this._update(),!0;if(!(b instanceof Array))throw new TypeError("enabledDates() expects an array parameter");this._options.enabledDates=this._indexGivenDates(b),this._options.disabledDates=!1,this._update()},r.prototype.daysOfWeekDisabled=function(a){if(0===arguments.length)return this._options.daysOfWeekDisabled.splice(0);if("boolean"==typeof a&&!a)return this._options.daysOfWeekDisabled=!1,this._update(),!0;if(!(a instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");if(this._options.daysOfWeekDisabled=a.reduce(function(a,b){return b=parseInt(b,10),b>6||b<0||isNaN(b)?a:(a.indexOf(b)===-1&&a.push(b),a)},[]).sort(),this._options.useCurrent&&!this._options.keepInvalid)for(var b=0;b<this._dates.length;b++){for(var c=0;!this._isValid(this._dates[b],"d");){if(this._dates[b].add(1,"d"),31===c)throw"Tried 31 times to find a valid date";c++}this._setValue(this._dates[b],b)}this._update()},r.prototype.maxDate=function(a){if(0===arguments.length)return this._options.maxDate?this._options.maxDate.clone():this._options.maxDate;if("boolean"==typeof a&&a===!1)return this._options.maxDate=!1,this._update(),!0;"string"==typeof a&&("now"!==a&&"moment"!==a||(a=this.getMoment()));var b=this._parseInputDate(a);if(!b.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+a);if(this._options.minDate&&b.isBefore(this._options.minDate))throw new TypeError("maxDate() date parameter is before this.options.minDate: "+b.format(this.actualFormat));this._options.maxDate=b;for(var c=0;c<this._dates.length;c++)this._options.useCurrent&&!this._options.keepInvalid&&this._dates[c].isAfter(a)&&this._setValue(this._options.maxDate,c);this._viewDate.isAfter(b)&&(this._viewDate=b.clone().subtract(this._options.stepping,"m")),this._update()},r.prototype.minDate=function(a){if(0===arguments.length)return this._options.minDate?this._options.minDate.clone():this._options.minDate;if("boolean"==typeof a&&a===!1)return this._options.minDate=!1,this._update(),!0;"string"==typeof a&&("now"!==a&&"moment"!==a||(a=this.getMoment()));var b=this._parseInputDate(a);if(!b.isValid())throw new TypeError("minDate() Could not parse date parameter: "+a);if(this._options.maxDate&&b.isAfter(this._options.maxDate))throw new TypeError("minDate() date parameter is after this.options.maxDate: "+b.format(this.actualFormat));this._options.minDate=b;for(var c=0;c<this._dates.length;c++)this._options.useCurrent&&!this._options.keepInvalid&&this._dates[c].isBefore(a)&&this._setValue(this._options.minDate,c);this._viewDate.isBefore(b)&&(this._viewDate=b.clone().add(this._options.stepping,"m")),this._update()},r.prototype.defaultDate=function(a){if(0===arguments.length)return this._options.defaultDate?this._options.defaultDate.clone():this._options.defaultDate;if(!a)return this._options.defaultDate=!1,!0;"string"==typeof a&&(a="now"===a||"moment"===a?this.getMoment():this.getMoment(a));var b=this._parseInputDate(a);if(!b.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+a);if(!this._isValid(b))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");this._options.defaultDate=b,(this._options.defaultDate&&this._options.inline||void 0!==this.input&&""===this.input.val().trim())&&this._setValue(this._options.defaultDate,0)},r.prototype.locale=function(a){if(0===arguments.length)return this._options.locale;if(!b.localeData(a))throw new TypeError("locale() locale "+a+" is not loaded from moment locales!");this._options.locale=a;for(var c=0;c<this._dates.length;c++)this._dates[c].locale(this._options.locale);this._viewDate.locale(this._options.locale),this.actualFormat&&this._initFormatting(),this.widget&&(this.hide(),this.show())},r.prototype.stepping=function(a){return 0===arguments.length?this._options.stepping:(a=parseInt(a,10),(isNaN(a)||a<1)&&(a=1),void(this._options.stepping=a))},r.prototype.useCurrent=function(a){var b=["year","month","day","hour","minute"];if(0===arguments.length)return this._options.useCurrent;if("boolean"!=typeof a&&"string"!=typeof a)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"==typeof a&&b.indexOf(a.toLowerCase())===-1)throw new TypeError("useCurrent() expects a string parameter of "+b.join(", "));this._options.useCurrent=a},r.prototype.collapse=function(a){if(0===arguments.length)return this._options.collapse;if("boolean"!=typeof a)throw new TypeError("collapse() expects a boolean parameter");return this._options.collapse===a||(this._options.collapse=a,void(this.widget&&(this.hide(),this.show())))},r.prototype.icons=function(b){if(0===arguments.length)return a.extend({},this._options.icons);if(!(b instanceof Object))throw new TypeError("icons() expects parameter to be an Object");a.extend(this._options.icons,b),this.widget&&(this.hide(),this.show())},r.prototype.tooltips=function(b){if(0===arguments.length)return a.extend({},this._options.tooltips);if(!(b instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");a.extend(this._options.tooltips,b),this.widget&&(this.hide(),this.show())},r.prototype.useStrict=function(a){if(0===arguments.length)return this._options.useStrict;if("boolean"!=typeof a)throw new TypeError("useStrict() expects a boolean parameter");this._options.useStrict=a},r.prototype.sideBySide=function(a){if(0===arguments.length)return this._options.sideBySide;if("boolean"!=typeof a)throw new TypeError("sideBySide() expects a boolean parameter");this._options.sideBySide=a,this.widget&&(this.hide(),this.show())},r.prototype.viewMode=function(a){if(0===arguments.length)return this._options.viewMode;if("string"!=typeof a)throw new TypeError("viewMode() expects a string parameter");if(r.ViewModes.indexOf(a)===-1)throw new TypeError("viewMode() parameter must be one of ("+r.ViewModes.join(", ")+") value");this._options.viewMode=a,this.currentViewMode=Math.max(r.ViewModes.indexOf(a)-1,this.MinViewModeNumber),this._showMode()},r.prototype.calendarWeeks=function(a){if(0===arguments.length)return this._options.calendarWeeks;if("boolean"!=typeof a)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");this._options.calendarWeeks=a,this._update()},r.prototype.buttons=function(b){if(0===arguments.length)return a.extend({},this._options.buttons);if(!(b instanceof Object))throw new TypeError("buttons() expects parameter to be an Object");if(a.extend(this._options.buttons,b),"boolean"!=typeof this._options.buttons.showToday)throw new TypeError("buttons.showToday expects a boolean parameter");if("boolean"!=typeof this._options.buttons.showClear)throw new TypeError("buttons.showClear expects a boolean parameter");if("boolean"!=typeof this._options.buttons.showClose)throw new TypeError("buttons.showClose expects a boolean parameter");this.widget&&(this.hide(),this.show())},r.prototype.keepOpen=function(a){if(0===arguments.length)return this._options.keepOpen;if("boolean"!=typeof a)throw new TypeError("keepOpen() expects a boolean parameter");this._options.keepOpen=a},r.prototype.focusOnShow=function(a){if(0===arguments.length)return this._options.focusOnShow;if("boolean"!=typeof a)throw new TypeError("focusOnShow() expects a boolean parameter");this._options.focusOnShow=a},r.prototype.inline=function(a){if(0===arguments.length)return this._options.inline;if("boolean"!=typeof a)throw new TypeError("inline() expects a boolean parameter");this._options.inline=a},r.prototype.clear=function(){this._setValue(null)},r.prototype.keyBinds=function(a){return 0===arguments.length?this._options.keyBinds:void(this._options.keyBinds=a)},r.prototype.debug=function(a){if("boolean"!=typeof a)throw new TypeError("debug() expects a boolean parameter");this._options.debug=a},r.prototype.allowInputToggle=function(a){if(0===arguments.length)return this._options.allowInputToggle;if("boolean"!=typeof a)throw new TypeError("allowInputToggle() expects a boolean parameter");this._options.allowInputToggle=a},r.prototype.keepInvalid=function(a){if(0===arguments.length)return this._options.keepInvalid;if("boolean"!=typeof a)throw new TypeError("keepInvalid() expects a boolean parameter");this._options.keepInvalid=a},r.prototype.datepickerInput=function(a){if(0===arguments.length)return this._options.datepickerInput;if("string"!=typeof a)throw new TypeError("datepickerInput() expects a string parameter");this._options.datepickerInput=a},r.prototype.parseInputDate=function(a){if(0===arguments.length)return this._options.parseInputDate;if("function"!=typeof a)throw new TypeError("parseInputDate() should be as function");this._options.parseInputDate=a},r.prototype.disabledTimeIntervals=function(b){if(0===arguments.length)return this._options.disabledTimeIntervals?a.extend({},this._options.disabledTimeIntervals):this._options.disabledTimeIntervals;if(!b)return this._options.disabledTimeIntervals=!1,this._update(),!0;if(!(b instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");this._options.disabledTimeIntervals=b,this._update()},r.prototype.disabledHours=function(b){if(0===arguments.length)return this._options.disabledHours?a.extend({},this._options.disabledHours):this._options.disabledHours;if(!b)return this._options.disabledHours=!1,this._update(),!0;if(!(b instanceof Array))throw new TypeError("disabledHours() expects an array parameter");if(this._options.disabledHours=this._indexGivenHours(b),this._options.enabledHours=!1,this._options.useCurrent&&!this._options.keepInvalid)for(var c=0;c<this._dates.length;c++){for(var d=0;!this._isValid(this._dates[c],"h");){if(this._dates[c].add(1,"h"),24===d)throw"Tried 24 times to find a valid date";d++}this._setValue(this._dates[c],c)}this._update()},r.prototype.enabledHours=function(b){if(0===arguments.length)return this._options.enabledHours?a.extend({},this._options.enabledHours):this._options.enabledHours;if(!b)return this._options.enabledHours=!1,this._update(),!0;if(!(b instanceof Array))throw new TypeError("enabledHours() expects an array parameter");if(this._options.enabledHours=this._indexGivenHours(b),this._options.disabledHours=!1,this._options.useCurrent&&!this._options.keepInvalid)for(var c=0;c<this._dates.length;c++){for(var d=0;!this._isValid(this._dates[c],"h");){if(this._dates[c].add(1,"h"),24===d)throw"Tried 24 times to find a valid date";d++}this._setValue(this._dates[c],c)}this._update()},r.prototype.viewDate=function(a){if(0===arguments.length)return this._viewDate.clone();if(!a)return this._viewDate=(this._dates[0]||this.getMoment()).clone(),!0;if(!("string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");this._viewDate=this._parseInputDate(a),this._viewUpdate()},r.prototype.allowMultidate=function(a){if("boolean"!=typeof a)throw new TypeError("allowMultidate() expects a boolean parameter");this._options.allowMultidate=a},r.prototype.multidateSeparator=function(a){if(0===arguments.length)return this._options.multidateSeparator;if("string"!=typeof a||a.length>1)throw new TypeError("multidateSeparator expects a single character string parameter");this._options.multidateSeparator=a},e(r,null,[{key:"NAME",get:function(){return d}},{key:"DATA_KEY",get:function(){return f}},{key:"EVENT_KEY",get:function(){return g}},{key:"DATA_API_KEY",get:function(){return h}},{key:"DatePickerModes",get:function(){return l}},{key:"ViewModes",get:function(){return n}},{key:"Event",get:function(){return k}},{key:"Selector",get:function(){return i}},{key:"Default",get:function(){return q},set:function(a){q=a}},{key:"ClassName",get:function(){return j}}]),r}();return r}(jQuery,moment);(function(e){var g=e.fn[f.NAME],h=["top","bottom","auto"],i=["left","right","auto"],j=["default","top","bottom"],k=function(a){var b=a.data("target"),c=void 0;return b||(b=a.attr("href")||"",b=/^#[a-z]/i.test(b)?b:null),c=e(b),0===c.length?c:(c.data(f.DATA_KEY)||e.extend({},c.data(),e(this).data()),c)},l=function(g){function k(b,d){c(this,k);var e=a(this,g.call(this,b,d));return e._init(),e}return b(k,g),k.prototype._init=function(){if(this._element.hasClass("input-group")){var a=this._element.find(".datepickerbutton");0===a.length?this.component=this._element.find('[data-toggle="datetimepicker"]'):this.component=a}},k.prototype._getDatePickerTemplate=function(){var a=e("<thead>").append(e("<tr>").append(e("<th>").addClass("prev").attr("data-action","previous").append(e("<span>").addClass(this._options.icons.previous))).append(e("<th>").addClass("picker-switch").attr("data-action","pickerSwitch").attr("colspan",""+(this._options.calendarWeeks?"6":"5"))).append(e("<th>").addClass("next").attr("data-action","next").append(e("<span>").addClass(this._options.icons.next)))),b=e("<tbody>").append(e("<tr>").append(e("<td>").attr("colspan",""+(this._options.calendarWeeks?"8":"7"))));return[e("<div>").addClass("datepicker-days").append(e("<table>").addClass("table table-sm").append(a).append(e("<tbody>"))),e("<div>").addClass("datepicker-months").append(e("<table>").addClass("table-condensed").append(a.clone()).append(b.clone())),e("<div>").addClass("datepicker-years").append(e("<table>").addClass("table-condensed").append(a.clone()).append(b.clone())),e("<div>").addClass("datepicker-decades").append(e("<table>").addClass("table-condensed").append(a.clone()).append(b.clone()))]},k.prototype._getTimePickerMainTemplate=function(){var a=e("<tr>"),b=e("<tr>"),c=e("<tr>");return this._isEnabled("h")&&(a.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:this._options.tooltips.incrementHour}).addClass("btn").attr("data-action","incrementHours").append(e("<span>").addClass(this._options.icons.up)))),b.append(e("<td>").append(e("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:this._options.tooltips.pickHour}).attr("data-action","showHours"))),c.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:this._options.tooltips.decrementHour}).addClass("btn").attr("data-action","decrementHours").append(e("<span>").addClass(this._options.icons.down))))),this._isEnabled("m")&&(this._isEnabled("h")&&(a.append(e("<td>").addClass("separator")),b.append(e("<td>").addClass("separator").html(":")),c.append(e("<td>").addClass("separator"))),a.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:this._options.tooltips.incrementMinute}).addClass("btn").attr("data-action","incrementMinutes").append(e("<span>").addClass(this._options.icons.up)))),b.append(e("<td>").append(e("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",title:this._options.tooltips.pickMinute}).attr("data-action","showMinutes"))),c.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:this._options.tooltips.decrementMinute
}).addClass("btn").attr("data-action","decrementMinutes").append(e("<span>").addClass(this._options.icons.down))))),this._isEnabled("s")&&(this._isEnabled("m")&&(a.append(e("<td>").addClass("separator")),b.append(e("<td>").addClass("separator").html(":")),c.append(e("<td>").addClass("separator"))),a.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:this._options.tooltips.incrementSecond}).addClass("btn").attr("data-action","incrementSeconds").append(e("<span>").addClass(this._options.icons.up)))),b.append(e("<td>").append(e("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:this._options.tooltips.pickSecond}).attr("data-action","showSeconds"))),c.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:this._options.tooltips.decrementSecond}).addClass("btn").attr("data-action","decrementSeconds").append(e("<span>").addClass(this._options.icons.down))))),this.use24Hours||(a.append(e("<td>").addClass("separator")),b.append(e("<td>").append(e("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",tabindex:"-1",title:this._options.tooltips.togglePeriod}))),c.append(e("<td>").addClass("separator"))),e("<div>").addClass("timepicker-picker").append(e("<table>").addClass("table-condensed").append([a,b,c]))},k.prototype._getTimePickerTemplate=function(){var a=e("<div>").addClass("timepicker-hours").append(e("<table>").addClass("table-condensed")),b=e("<div>").addClass("timepicker-minutes").append(e("<table>").addClass("table-condensed")),c=e("<div>").addClass("timepicker-seconds").append(e("<table>").addClass("table-condensed")),d=[this._getTimePickerMainTemplate()];return this._isEnabled("h")&&d.push(a),this._isEnabled("m")&&d.push(b),this._isEnabled("s")&&d.push(c),d},k.prototype._getToolbar=function(){var a=[];if(this._options.buttons.showToday&&a.push(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1","data-action":"today",title:this._options.tooltips.today}).append(e("<span>").addClass(this._options.icons.today)))),!this._options.sideBySide&&this._hasDate()&&this._hasTime()){var b=void 0,c=void 0;"times"===this._options.viewMode?(b=this._options.tooltips.selectDate,c=this._options.icons.date):(b=this._options.tooltips.selectTime,c=this._options.icons.time),a.push(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1","data-action":"togglePicker",title:b}).append(e("<span>").addClass(c))))}return this._options.buttons.showClear&&a.push(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1","data-action":"clear",title:this._options.tooltips.clear}).append(e("<span>").addClass(this._options.icons.clear)))),this._options.buttons.showClose&&a.push(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1","data-action":"close",title:this._options.tooltips.close}).append(e("<span>").addClass(this._options.icons.close)))),0===a.length?"":e("<table>").addClass("table-condensed").append(e("<tbody>").append(e("<tr>").append(a)))},k.prototype._getTemplate=function(){var a=e("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),b=e("<div>").addClass("datepicker").append(this._getDatePickerTemplate()),c=e("<div>").addClass("timepicker").append(this._getTimePickerTemplate()),d=e("<ul>").addClass("list-unstyled"),f=e("<li>").addClass("picker-switch"+(this._options.collapse?" accordion-toggle":"")).append(this._getToolbar());return this._options.inline&&a.removeClass("dropdown-menu"),this.use24Hours&&a.addClass("usetwentyfour"),this._isEnabled("s")&&!this.use24Hours&&a.addClass("wider"),this._options.sideBySide&&this._hasDate()&&this._hasTime()?(a.addClass("timepicker-sbs"),"top"===this._options.toolbarPlacement&&a.append(f),a.append(e("<div>").addClass("row").append(b.addClass("col-md-6")).append(c.addClass("col-md-6"))),"bottom"!==this._options.toolbarPlacement&&"default"!==this._options.toolbarPlacement||a.append(f),a):("top"===this._options.toolbarPlacement&&d.append(f),this._hasDate()&&d.append(e("<li>").addClass(this._options.collapse&&this._hasTime()?"collapse":"").addClass(this._options.collapse&&this._hasTime()&&"times"===this._options.viewMode?"":"show").append(b)),"default"===this._options.toolbarPlacement&&d.append(f),this._hasTime()&&d.append(e("<li>").addClass(this._options.collapse&&this._hasDate()?"collapse":"").addClass(this._options.collapse&&this._hasDate()&&"times"===this._options.viewMode?"show":"").append(c)),"bottom"===this._options.toolbarPlacement&&d.append(f),a.append(d))},k.prototype._place=function(a){var b=a&&a.data&&a.data.picker||this,c=b._options.widgetPositioning.vertical,d=b._options.widgetPositioning.horizontal,f=void 0,g=(b.component&&b.component.length?b.component:b._element).position(),h=(b.component&&b.component.length?b.component:b._element).offset();if(b._options.widgetParent)f=b._options.widgetParent.append(b.widget);else if(b._element.is("input"))f=b._element.after(b.widget).parent();else{if(b._options.inline)return void(f=b._element.append(b.widget));f=b._element,b._element.children().first().after(b.widget)}if("auto"===c&&(c=h.top+1.5*b.widget.height()>=e(window).height()+e(window).scrollTop()&&b.widget.height()+b._element.outerHeight()<h.top?"top":"bottom"),"auto"===d&&(d=f.width()<h.left+b.widget.outerWidth()/2&&h.left+b.widget.outerWidth()>e(window).width()?"right":"left"),"top"===c?b.widget.addClass("top").removeClass("bottom"):b.widget.addClass("bottom").removeClass("top"),"right"===d?b.widget.addClass("float-right"):b.widget.removeClass("float-right"),"relative"!==f.css("position")&&(f=f.parents().filter(function(){return"relative"===e(this).css("position")}).first()),0===f.length)throw new Error("datetimepicker component should be placed within a relative positioned container");b.widget.css({top:"top"===c?"auto":g.top+b._element.outerHeight()+"px",bottom:"top"===c?f.outerHeight()-(f===b._element?0:g.top)+"px":"auto",left:"left"===d?(f===b._element?0:g.left)+"px":"auto",right:"left"===d?"auto":f.outerWidth()-b._element.outerWidth()-(f===b._element?0:g.left)+"px"})},k.prototype._fillDow=function(){var a=e("<tr>"),b=this._viewDate.clone().startOf("w").startOf("d");for(this._options.calendarWeeks===!0&&a.append(e("<th>").addClass("cw").text("#"));b.isBefore(this._viewDate.clone().endOf("w"));)a.append(e("<th>").addClass("dow").text(b.format("dd"))),b.add(1,"d");this.widget.find(".datepicker-days thead").append(a)},k.prototype._fillMonths=function(){for(var a=[],b=this._viewDate.clone().startOf("y").startOf("d");b.isSame(this._viewDate,"y");)a.push(e("<span>").attr("data-action","selectMonth").addClass("month").text(b.format("MMM"))),b.add(1,"M");this.widget.find(".datepicker-months td").empty().append(a)},k.prototype._updateMonths=function(){var a=this.widget.find(".datepicker-months"),b=a.find("th"),c=a.find("tbody").find("span"),d=this;b.eq(0).find("span").attr("title",this._options.tooltips.prevYear),b.eq(1).attr("title",this._options.tooltips.selectYear),b.eq(2).find("span").attr("title",this._options.tooltips.nextYear),a.find(".disabled").removeClass("disabled"),this._isValid(this._viewDate.clone().subtract(1,"y"),"y")||b.eq(0).addClass("disabled"),b.eq(1).text(this._viewDate.year()),this._isValid(this._viewDate.clone().add(1,"y"),"y")||b.eq(2).addClass("disabled"),c.removeClass("active"),this._getLastPickedDate().isSame(this._viewDate,"y")&&!this.unset&&c.eq(this._getLastPickedDate().month()).addClass("active"),c.each(function(a){d._isValid(d._viewDate.clone().month(a),"M")||e(this).addClass("disabled")})},k.prototype._getStartEndYear=function(a,b){var c=a/10,d=Math.floor(b/a)*a,e=d+9*c,f=Math.floor(b/c)*c;return[d,e,f]},k.prototype._updateYears=function(){var a=this.widget.find(".datepicker-years"),b=a.find("th"),c=this._getStartEndYear(10,this._viewDate.year()),d=this._viewDate.clone().year(c[0]),e=this._viewDate.clone().year(c[1]),f="";for(b.eq(0).find("span").attr("title",this._options.tooltips.prevDecade),b.eq(1).attr("title",this._options.tooltips.selectDecade),b.eq(2).find("span").attr("title",this._options.tooltips.nextDecade),a.find(".disabled").removeClass("disabled"),this._options.minDate&&this._options.minDate.isAfter(d,"y")&&b.eq(0).addClass("disabled"),b.eq(1).text(d.year()+"-"+e.year()),this._options.maxDate&&this._options.maxDate.isBefore(e,"y")&&b.eq(2).addClass("disabled"),f+='<span data-action="selectYear" class="year old'+(this._isValid(d,"y")?"":" disabled")+'">'+(d.year()-1)+"</span>";!d.isAfter(e,"y");)f+='<span data-action="selectYear" class="year'+(d.isSame(this._getLastPickedDate(),"y")&&!this.unset?" active":"")+(this._isValid(d,"y")?"":" disabled")+'">'+d.year()+"</span>",d.add(1,"y");f+='<span data-action="selectYear" class="year old'+(this._isValid(d,"y")?"":" disabled")+'">'+d.year()+"</span>",a.find("td").html(f)},k.prototype._updateDecades=function(){var a=this.widget.find(".datepicker-decades"),b=a.find("th"),c=this._getStartEndYear(100,this._viewDate.year()),d=this._viewDate.clone().year(c[0]),e=this._viewDate.clone().year(c[1]),f=!1,g=!1,h=void 0,i="";for(b.eq(0).find("span").attr("title",this._options.tooltips.prevCentury),b.eq(2).find("span").attr("title",this._options.tooltips.nextCentury),a.find(".disabled").removeClass("disabled"),(0===d.year()||this._options.minDate&&this._options.minDate.isAfter(d,"y"))&&b.eq(0).addClass("disabled"),b.eq(1).text(d.year()+"-"+e.year()),this._options.maxDate&&this._options.maxDate.isBefore(e,"y")&&b.eq(2).addClass("disabled"),i+=d.year()-10<0?"<span>&nbsp;</span>":'<span data-action="selectDecade" class="decade old" data-selection="'+(d.year()+6)+'">'+(d.year()-10)+"</span>";!d.isAfter(e,"y");)h=d.year()+11,f=this._options.minDate&&this._options.minDate.isAfter(d,"y")&&this._options.minDate.year()<=h,g=this._options.maxDate&&this._options.maxDate.isAfter(d,"y")&&this._options.maxDate.year()<=h,i+='<span data-action="selectDecade" class="decade'+(this._getLastPickedDate().isAfter(d)&&this._getLastPickedDate().year()<=h?" active":"")+(this._isValid(d,"y")||f||g?"":" disabled")+'" data-selection="'+(d.year()+6)+'">'+d.year()+"</span>",d.add(10,"y");i+='<span data-action="selectDecade" class="decade old" data-selection="'+(d.year()+6)+'">'+d.year()+"</span>",a.find("td").html(i)},k.prototype._fillDate=function(){var a=this.widget.find(".datepicker-days"),b=a.find("th"),c=[],d=void 0,f=void 0,g=void 0,h=void 0;if(this._hasDate()){for(b.eq(0).find("span").attr("title",this._options.tooltips.prevMonth),b.eq(1).attr("title",this._options.tooltips.selectMonth),b.eq(2).find("span").attr("title",this._options.tooltips.nextMonth),a.find(".disabled").removeClass("disabled"),b.eq(1).text(this._viewDate.format(this._options.dayViewHeaderFormat)),this._isValid(this._viewDate.clone().subtract(1,"M"),"M")||b.eq(0).addClass("disabled"),this._isValid(this._viewDate.clone().add(1,"M"),"M")||b.eq(2).addClass("disabled"),d=this._viewDate.clone().startOf("M").startOf("w").startOf("d"),h=0;h<42;h++){if(0===d.weekday()&&(f=e("<tr>"),this._options.calendarWeeks&&f.append('<td class="cw">'+d.week()+"</td>"),c.push(f)),g="",d.isBefore(this._viewDate,"M")&&(g+=" old"),d.isAfter(this._viewDate,"M")&&(g+=" new"),this._options.allowMultidate){var i=this._datesFormatted.indexOf(d.format("YYYY-MM-DD"));i!==-1&&d.isSame(this._datesFormatted[i],"d")&&!this.unset&&(g+=" active")}else d.isSame(this._getLastPickedDate(),"d")&&!this.unset&&(g+=" active");this._isValid(d,"d")||(g+=" disabled"),d.isSame(this.getMoment(),"d")&&(g+=" today"),0!==d.day()&&6!==d.day()||(g+=" weekend"),f.append('<td data-action="selectDay" data-day="'+d.format("L")+'" class="day'+g+'">'+d.date()+"</td>"),d.add(1,"d")}a.find("tbody").empty().append(c),this._updateMonths(),this._updateYears(),this._updateDecades()}},k.prototype._fillHours=function(){var a=this.widget.find(".timepicker-hours table"),b=this._viewDate.clone().startOf("d"),c=[],d=e("<tr>");for(this._viewDate.hour()>11&&!this.use24Hours&&b.hour(12);b.isSame(this._viewDate,"d")&&(this.use24Hours||this._viewDate.hour()<12&&b.hour()<12||this._viewDate.hour()>11);)b.hour()%4===0&&(d=e("<tr>"),c.push(d)),d.append('<td data-action="selectHour" class="hour'+(this._isValid(b,"h")?"":" disabled")+'">'+b.format(this.use24Hours?"HH":"hh")+"</td>"),b.add(1,"h");a.empty().append(c)},k.prototype._fillMinutes=function(){for(var a=this.widget.find(".timepicker-minutes table"),b=this._viewDate.clone().startOf("h"),c=[],d=1===this._options.stepping?5:this._options.stepping,f=e("<tr>");this._viewDate.isSame(b,"h");)b.minute()%(4*d)===0&&(f=e("<tr>"),c.push(f)),f.append('<td data-action="selectMinute" class="minute'+(this._isValid(b,"m")?"":" disabled")+'">'+b.format("mm")+"</td>"),b.add(d,"m");a.empty().append(c)},k.prototype._fillSeconds=function(){for(var a=this.widget.find(".timepicker-seconds table"),b=this._viewDate.clone().startOf("m"),c=[],d=e("<tr>");this._viewDate.isSame(b,"m");)b.second()%20===0&&(d=e("<tr>"),c.push(d)),d.append('<td data-action="selectSecond" class="second'+(this._isValid(b,"s")?"":" disabled")+'">'+b.format("ss")+"</td>"),b.add(5,"s");a.empty().append(c)},k.prototype._fillTime=function(){var a=void 0,b=void 0,c=this.widget.find(".timepicker span[data-time-component]");this.use24Hours||(a=this.widget.find(".timepicker [data-action=togglePeriod]"),b=this._getLastPickedDate().clone().add(this._getLastPickedDate().hours()>=12?-12:12,"h"),a.text(this._getLastPickedDate().format("A")),this._isValid(b,"h")?a.removeClass("disabled"):a.addClass("disabled")),c.filter("[data-time-component=hours]").text(this._getLastPickedDate().format(""+(this.use24Hours?"HH":"hh"))),c.filter("[data-time-component=minutes]").text(this._getLastPickedDate().format("mm")),c.filter("[data-time-component=seconds]").text(this._getLastPickedDate().format("ss")),this._fillHours(),this._fillMinutes(),this._fillSeconds()},k.prototype._doAction=function(a,b){var c=this._getLastPickedDate();if(e(a.currentTarget).is(".disabled"))return!1;switch(b=b||e(a.currentTarget).data("action")){case"next":var d=f.DatePickerModes[this.currentViewMode].NAV_FUNCTION;this._viewDate.add(f.DatePickerModes[this.currentViewMode].NAV_STEP,d),this._fillDate(),this._viewUpdate(d);break;case"previous":var g=f.DatePickerModes[this.currentViewMode].NAV_FUNCTION;this._viewDate.subtract(f.DatePickerModes[this.currentViewMode].NAV_STEP,g),this._fillDate(),this._viewUpdate(g);break;case"pickerSwitch":this._showMode(1);break;case"selectMonth":var h=e(a.target).closest("tbody").find("span").index(e(a.target));this._viewDate.month(h),this.currentViewMode===this.MinViewModeNumber?(this._setValue(c.clone().year(this._viewDate.year()).month(this._viewDate.month()),this._getLastPickedDateIndex()),this._options.inline||this.hide()):(this._showMode(-1),this._fillDate()),this._viewUpdate("M");break;case"selectYear":var i=parseInt(e(a.target).text(),10)||0;this._viewDate.year(i),this.currentViewMode===this.MinViewModeNumber?(this._setValue(c.clone().year(this._viewDate.year()),this._getLastPickedDateIndex()),this._options.inline||this.hide()):(this._showMode(-1),this._fillDate()),this._viewUpdate("YYYY");break;case"selectDecade":var j=parseInt(e(a.target).data("selection"),10)||0;this._viewDate.year(j),this.currentViewMode===this.MinViewModeNumber?(this._setValue(c.clone().year(this._viewDate.year()),this._getLastPickedDateIndex()),this._options.inline||this.hide()):(this._showMode(-1),this._fillDate()),this._viewUpdate("YYYY");break;case"selectDay":var k=this._viewDate.clone();e(a.target).is(".old")&&k.subtract(1,"M"),e(a.target).is(".new")&&k.add(1,"M");var l=k.date(parseInt(e(a.target).text(),10)),m=0;this._options.allowMultidate?(m=this._datesFormatted.indexOf(l.format("YYYY-MM-DD")),m!==-1?this._setValue(null,m):this._setValue(l,this._getLastPickedDateIndex()+1)):this._setValue(l,this._getLastPickedDateIndex()),this._hasTime()||this._options.keepOpen||this._options.inline||this._options.allowMultidate||this.hide();break;case"incrementHours":var n=c.clone().add(1,"h");this._isValid(n,"h")&&this._setValue(n,this._getLastPickedDateIndex());break;case"incrementMinutes":var o=c.clone().add(this._options.stepping,"m");this._isValid(o,"m")&&this._setValue(o,this._getLastPickedDateIndex());break;case"incrementSeconds":var p=c.clone().add(1,"s");this._isValid(p,"s")&&this._setValue(p,this._getLastPickedDateIndex());break;case"decrementHours":var q=c.clone().subtract(1,"h");this._isValid(q,"h")&&this._setValue(q,this._getLastPickedDateIndex());break;case"decrementMinutes":var r=c.clone().subtract(this._options.stepping,"m");this._isValid(r,"m")&&this._setValue(r,this._getLastPickedDateIndex());break;case"decrementSeconds":var s=c.clone().subtract(1,"s");this._isValid(s,"s")&&this._setValue(s,this._getLastPickedDateIndex());break;case"togglePeriod":this._setValue(c.clone().add(c.hours()>=12?-12:12,"h"),this._getLastPickedDateIndex());break;case"togglePicker":var t=e(a.target),u=t.closest("a"),v=t.closest("ul"),w=v.find(".show"),x=v.find(".collapse:not(.show)"),y=t.is("span")?t:t.find("span"),z=void 0;if(w&&w.length){if(z=w.data("collapse"),z&&z.transitioning)return!0;w.collapse?(w.collapse("hide"),x.collapse("show")):(w.removeClass("show"),x.addClass("show")),y.toggleClass(this._options.icons.time+" "+this._options.icons.date),y.hasClass(this._options.icons.date)?u.attr("title",this._options.tooltips.selectDate):u.attr("title",this._options.tooltips.selectTime)}break;case"showPicker":this.widget.find(".timepicker > div:not(.timepicker-picker)").hide(),this.widget.find(".timepicker .timepicker-picker").show();break;case"showHours":this.widget.find(".timepicker .timepicker-picker").hide(),this.widget.find(".timepicker .timepicker-hours").show();break;case"showMinutes":this.widget.find(".timepicker .timepicker-picker").hide(),this.widget.find(".timepicker .timepicker-minutes").show();break;case"showSeconds":this.widget.find(".timepicker .timepicker-picker").hide(),this.widget.find(".timepicker .timepicker-seconds").show();break;case"selectHour":var A=parseInt(e(a.target).text(),10);this.use24Hours||(c.hours()>=12?12!==A&&(A+=12):12===A&&(A=0)),this._setValue(c.clone().hours(A),this._getLastPickedDateIndex()),this._isEnabled("a")||this._isEnabled("m")||this._options.keepOpen||this._options.inline?this._doAction(a,"showPicker"):this.hide();break;case"selectMinute":this._setValue(c.clone().minutes(parseInt(e(a.target).text(),10)),this._getLastPickedDateIndex()),this._isEnabled("a")||this._isEnabled("s")||this._options.keepOpen||this._options.inline?this._doAction(a,"showPicker"):this.hide();break;case"selectSecond":this._setValue(c.clone().seconds(parseInt(e(a.target).text(),10)),this._getLastPickedDateIndex()),this._isEnabled("a")||this._options.keepOpen||this._options.inline?this._doAction(a,"showPicker"):this.hide();break;case"clear":this.clear();break;case"close":this.hide();break;case"today":var B=this.getMoment();this._isValid(B,"d")&&this._setValue(B,this._getLastPickedDateIndex())}return!1},k.prototype.hide=function(){var a=!1;this.widget&&(this.widget.find(".collapse").each(function(){var b=e(this).data("collapse");return!b||!b.transitioning||(a=!0,!1)}),a||(this.component&&this.component.hasClass("btn")&&this.component.toggleClass("active"),this.widget.hide(),e(window).off("resize",this._place()),this.widget.off("click","[data-action]"),this.widget.off("mousedown",!1),this.widget.remove(),this.widget=!1,this._notifyEvent({type:f.Event.HIDE,date:this._getLastPickedDate().clone()}),void 0!==this.input&&this.input.blur(),this._viewDate=this._getLastPickedDate().clone()))},k.prototype.show=function(){var a=void 0,b={year:function(a){return a.month(0).date(1).hours(0).seconds(0).minutes(0)},month:function(a){return a.date(1).hours(0).seconds(0).minutes(0)},day:function(a){return a.hours(0).seconds(0).minutes(0)},hour:function(a){return a.seconds(0).minutes(0)},minute:function(a){return a.seconds(0)}};if(void 0!==this.input){if(this.input.prop("disabled")||!this._options.ignoreReadonly&&this.input.prop("readonly")||this.widget)return;void 0!==this.input.val()&&0!==this.input.val().trim().length?this._setValue(this._parseInputDate(this.input.val().trim()),0):this.unset&&this._options.useCurrent&&(a=this.getMoment(),"string"==typeof this._options.useCurrent&&(a=b[this._options.useCurrent](a)),this._setValue(a,0))}else this.unset&&this._options.useCurrent&&(a=this.getMoment(),"string"==typeof this._options.useCurrent&&(a=b[this._options.useCurrent](a)),this._setValue(a,0));this.widget=this._getTemplate(),this._fillDow(),this._fillMonths(),this.widget.find(".timepicker-hours").hide(),this.widget.find(".timepicker-minutes").hide(),this.widget.find(".timepicker-seconds").hide(),this._update(),this._showMode(),e(window).on("resize",{picker:this},this._place),this.widget.on("click","[data-action]",e.proxy(this._doAction,this)),this.widget.on("mousedown",!1),this.component&&this.component.hasClass("btn")&&this.component.toggleClass("active"),this._place(),this.widget.show(),void 0!==this.input&&this._options.focusOnShow&&!this.input.is(":focus")&&this.input.focus(),this._notifyEvent({type:f.Event.SHOW})},k.prototype.destroy=function(){this.hide(),this._element.removeData(f.DATA_KEY),this._element.removeData("date")},k.prototype.disable=function(){this.hide(),this.component&&this.component.hasClass("btn")&&this.component.addClass("disabled"),void 0!==this.input&&this.input.prop("disabled",!0)},k.prototype.enable=function(){this.component&&this.component.hasClass("btn")&&this.component.removeClass("disabled"),void 0!==this.input&&this.input.prop("disabled",!1)},k.prototype.toolbarPlacement=function(a){if(0===arguments.length)return this._options.toolbarPlacement;if("string"!=typeof a)throw new TypeError("toolbarPlacement() expects a string parameter");if(j.indexOf(a)===-1)throw new TypeError("toolbarPlacement() parameter must be one of ("+j.join(", ")+") value");this._options.toolbarPlacement=a,this.widget&&(this.hide(),this.show())},k.prototype.widgetPositioning=function(a){if(0===arguments.length)return e.extend({},this._options.widgetPositioning);if("[object Object]"!=={}.toString.call(a))throw new TypeError("widgetPositioning() expects an object variable");if(a.horizontal){if("string"!=typeof a.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");if(a.horizontal=a.horizontal.toLowerCase(),i.indexOf(a.horizontal)===-1)throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+i.join(", ")+")");this._options.widgetPositioning.horizontal=a.horizontal}if(a.vertical){if("string"!=typeof a.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");if(a.vertical=a.vertical.toLowerCase(),h.indexOf(a.vertical)===-1)throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+h.join(", ")+")");this._options.widgetPositioning.vertical=a.vertical}this._update()},k.prototype.widgetParent=function(a){if(0===arguments.length)return this._options.widgetParent;if("string"==typeof a&&(a=e(a)),null!==a&&"string"!=typeof a&&!(a instanceof e))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");this._options.widgetParent=a,this.widget&&(this.hide(),this.show())},k._jQueryHandleThis=function(a,b,c){var g=e(a).data(f.DATA_KEY);if("object"===("undefined"==typeof b?"undefined":d(b))&&e.extend({},f.Default,b),g||(g=new k(e(a),b),e(a).data(f.DATA_KEY,g)),"string"==typeof b){if(void 0===g[b])throw new Error('No method named "'+b+'"');return void 0===c?g[b]():g[b](c)}},k._jQueryInterface=function(a,b){return 1===this.length?k._jQueryHandleThis(this[0],a,b):this.each(function(){k._jQueryHandleThis(this,a,b)})},k}(f);return e(document).on(f.Event.CLICK_DATA_API,f.Selector.DATA_TOGGLE,function(){var a=k(e(this));0!==a.length&&l._jQueryInterface.call(a,"toggle")}).on(f.Event.CHANGE,"."+f.ClassName.INPUT,function(a){var b=k(e(this));0!==b.length&&l._jQueryInterface.call(b,"_change",a)}).on(f.Event.BLUR,"."+f.ClassName.INPUT,function(a){var b=k(e(this)),c=b.data(f.DATA_KEY);0!==b.length&&(c._options.debug||window.debug||l._jQueryInterface.call(b,"hide",a))}).on(f.Event.KEYDOWN,"."+f.ClassName.INPUT,function(a){var b=k(e(this));0!==b.length&&l._jQueryInterface.call(b,"_keydown",a)}).on(f.Event.KEYUP,"."+f.ClassName.INPUT,function(a){var b=k(e(this));0!==b.length&&l._jQueryInterface.call(b,"_keyup",a)}).on(f.Event.FOCUS,"."+f.ClassName.INPUT,function(a){var b=k(e(this)),c=b.data(f.DATA_KEY);0!==b.length&&c._options.allowInputToggle&&l._jQueryInterface.call(b,"show",a)}),e.fn[f.NAME]=l._jQueryInterface,e.fn[f.NAME].Constructor=l,e.fn[f.NAME].noConflict=function(){return e.fn[f.NAME]=g,l._jQueryInterface},l})(jQuery)}();
// https://d3js.org v5.7.0 Copyright 2018 Mike Bostock
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})}(this,function(t){"use strict";function n(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function e(t){var e;return 1===t.length&&(e=t,t=function(t,r){return n(e(t),r)}),{left:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)<0?r=o+1:i=o}return r},right:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)>0?i=o:r=o+1}return r}}}var r=e(n),i=r.right,o=r.left;function a(t,n){return[t,n]}function u(t){return null===t?NaN:+t}function f(t,n){var e,r,i=t.length,o=0,a=-1,f=0,c=0;if(null==n)for(;++a<i;)isNaN(e=u(t[a]))||(c+=(r=e-f)*(e-(f+=r/++o)));else for(;++a<i;)isNaN(e=u(n(t[a],a,t)))||(c+=(r=e-f)*(e-(f+=r/++o)));if(o>1)return c/(o-1)}function c(t,n){var e=f(t,n);return e?Math.sqrt(e):e}function s(t,n){var e,r,i,o=t.length,a=-1;if(null==n){for(;++a<o;)if(null!=(e=t[a])&&e>=e)for(r=i=e;++a<o;)null!=(e=t[a])&&(r>e&&(r=e),i<e&&(i=e))}else for(;++a<o;)if(null!=(e=n(t[a],a,t))&&e>=e)for(r=i=e;++a<o;)null!=(e=n(t[a],a,t))&&(r>e&&(r=e),i<e&&(i=e));return[r,i]}var l=Array.prototype,h=l.slice,d=l.map;function p(t){return function(){return t}}function v(t){return t}function g(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(i);++r<i;)o[r]=t+r*e;return o}var y=Math.sqrt(50),_=Math.sqrt(10),b=Math.sqrt(2);function m(t,n,e){var r,i,o,a,u=-1;if(e=+e,(t=+t)===(n=+n)&&e>0)return[t];if((r=n<t)&&(i=t,t=n,n=i),0===(a=x(t,n,e))||!isFinite(a))return[];if(a>0)for(t=Math.ceil(t/a),n=Math.floor(n/a),o=new Array(i=Math.ceil(n-t+1));++u<i;)o[u]=(t+u)*a;else for(t=Math.floor(t*a),n=Math.ceil(n*a),o=new Array(i=Math.ceil(t-n+1));++u<i;)o[u]=(t-u)/a;return r&&o.reverse(),o}function x(t,n,e){var r=(n-t)/Math.max(0,e),i=Math.floor(Math.log(r)/Math.LN10),o=r/Math.pow(10,i);return i>=0?(o>=y?10:o>=_?5:o>=b?2:1)*Math.pow(10,i):-Math.pow(10,-i)/(o>=y?10:o>=_?5:o>=b?2:1)}function w(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i;return o>=y?i*=10:o>=_?i*=5:o>=b&&(i*=2),n<t?-i:i}function M(t){return Math.ceil(Math.log(t.length)/Math.LN2)+1}function A(t,n,e){if(null==e&&(e=u),r=t.length){if((n=+n)<=0||r<2)return+e(t[0],0,t);if(n>=1)return+e(t[r-1],r-1,t);var r,i=(r-1)*n,o=Math.floor(i),a=+e(t[o],o,t);return a+(+e(t[o+1],o+1,t)-a)*(i-o)}}function T(t,n){var e,r,i=t.length,o=-1;if(null==n){for(;++o<i;)if(null!=(e=t[o])&&e>=e)for(r=e;++o<i;)null!=(e=t[o])&&e>r&&(r=e)}else for(;++o<i;)if(null!=(e=n(t[o],o,t))&&e>=e)for(r=e;++o<i;)null!=(e=n(t[o],o,t))&&e>r&&(r=e);return r}function N(t){for(var n,e,r,i=t.length,o=-1,a=0;++o<i;)a+=t[o].length;for(e=new Array(a);--i>=0;)for(n=(r=t[i]).length;--n>=0;)e[--a]=r[n];return e}function S(t,n){var e,r,i=t.length,o=-1;if(null==n){for(;++o<i;)if(null!=(e=t[o])&&e>=e)for(r=e;++o<i;)null!=(e=t[o])&&r>e&&(r=e)}else for(;++o<i;)if(null!=(e=n(t[o],o,t))&&e>=e)for(r=e;++o<i;)null!=(e=n(t[o],o,t))&&r>e&&(r=e);return r}function E(t){if(!(i=t.length))return[];for(var n=-1,e=S(t,k),r=new Array(e);++n<e;)for(var i,o=-1,a=r[n]=new Array(i);++o<i;)a[o]=t[o][n];return r}function k(t){return t.length}var C=Array.prototype.slice;function P(t){return t}var z=1,R=2,L=3,D=4,U=1e-6;function q(t){return"translate("+(t+.5)+",0)"}function O(t){return"translate(0,"+(t+.5)+")"}function Y(){return!this.__axis}function B(t,n){var e=[],r=null,i=null,o=6,a=6,u=3,f=t===z||t===D?-1:1,c=t===D||t===R?"x":"y",s=t===z||t===L?q:O;function l(l){var h=null==r?n.ticks?n.ticks.apply(n,e):n.domain():r,d=null==i?n.tickFormat?n.tickFormat.apply(n,e):P:i,p=Math.max(o,0)+u,v=n.range(),g=+v[0]+.5,y=+v[v.length-1]+.5,_=(n.bandwidth?function(t){var n=Math.max(0,t.bandwidth()-1)/2;return t.round()&&(n=Math.round(n)),function(e){return+t(e)+n}}:function(t){return function(n){return+t(n)}})(n.copy()),b=l.selection?l.selection():l,m=b.selectAll(".domain").data([null]),x=b.selectAll(".tick").data(h,n).order(),w=x.exit(),M=x.enter().append("g").attr("class","tick"),A=x.select("line"),T=x.select("text");m=m.merge(m.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),x=x.merge(M),A=A.merge(M.append("line").attr("stroke","currentColor").attr(c+"2",f*o)),T=T.merge(M.append("text").attr("fill","currentColor").attr(c,f*p).attr("dy",t===z?"0em":t===L?"0.71em":"0.32em")),l!==b&&(m=m.transition(l),x=x.transition(l),A=A.transition(l),T=T.transition(l),w=w.transition(l).attr("opacity",U).attr("transform",function(t){return isFinite(t=_(t))?s(t):this.getAttribute("transform")}),M.attr("opacity",U).attr("transform",function(t){var n=this.parentNode.__axis;return s(n&&isFinite(n=n(t))?n:_(t))})),w.remove(),m.attr("d",t===D||t==R?a?"M"+f*a+","+g+"H0.5V"+y+"H"+f*a:"M0.5,"+g+"V"+y:a?"M"+g+","+f*a+"V0.5H"+y+"V"+f*a:"M"+g+",0.5H"+y),x.attr("opacity",1).attr("transform",function(t){return s(_(t))}),A.attr(c+"2",f*o),T.attr(c,f*p).text(d),b.filter(Y).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===R?"start":t===D?"end":"middle"),b.each(function(){this.__axis=_})}return l.scale=function(t){return arguments.length?(n=t,l):n},l.ticks=function(){return e=C.call(arguments),l},l.tickArguments=function(t){return arguments.length?(e=null==t?[]:C.call(t),l):e.slice()},l.tickValues=function(t){return arguments.length?(r=null==t?null:C.call(t),l):r&&r.slice()},l.tickFormat=function(t){return arguments.length?(i=t,l):i},l.tickSize=function(t){return arguments.length?(o=a=+t,l):o},l.tickSizeInner=function(t){return arguments.length?(o=+t,l):o},l.tickSizeOuter=function(t){return arguments.length?(a=+t,l):a},l.tickPadding=function(t){return arguments.length?(u=+t,l):u},l}var F={value:function(){}};function I(){for(var t,n=0,e=arguments.length,r={};n<e;++n){if(!(t=arguments[n]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}return new H(r)}function H(t){this._=t}function j(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function X(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=F,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}H.prototype=I.prototype={constructor:H,on:function(t,n){var e,r,i=this._,o=(r=i,(t+"").trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");if(e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),t&&!r.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:n}})),a=-1,u=o.length;if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++a<u;)if(e=(t=o[a]).type)i[e]=X(i[e],t.name,n);else if(null==n)for(e in i)i[e]=X(i[e],t.name,null);return this}for(;++a<u;)if((e=(t=o[a]).type)&&(e=j(i[e],t.name)))return e},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new H(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=0,e=(r=this._[t]).length;o<e;++o)r[o].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}};var G="http://www.w3.org/1999/xhtml",V={svg:"http://www.w3.org/2000/svg",xhtml:G,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function $(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),V.hasOwnProperty(n)?{space:V[n],local:t}:t}function W(t){var n=$(t);return(n.local?function(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}:function(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===G&&n.documentElement.namespaceURI===G?n.createElement(t):n.createElementNS(e,t)}})(n)}function Z(){}function Q(t){return null==t?Z:function(){return this.querySelector(t)}}function J(){return[]}function K(t){return null==t?J:function(){return this.querySelectorAll(t)}}var tt=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var nt=document.documentElement;if(!nt.matches){var et=nt.webkitMatchesSelector||nt.msMatchesSelector||nt.mozMatchesSelector||nt.oMatchesSelector;tt=function(t){return function(){return et.call(this,t)}}}}var rt=tt;function it(t){return new Array(t.length)}function ot(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}ot.prototype={constructor:ot,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var at="$";function ut(t,n,e,r,i,o){for(var a,u=0,f=n.length,c=o.length;u<c;++u)(a=n[u])?(a.__data__=o[u],r[u]=a):e[u]=new ot(t,o[u]);for(;u<f;++u)(a=n[u])&&(i[u]=a)}function ft(t,n,e,r,i,o,a){var u,f,c,s={},l=n.length,h=o.length,d=new Array(l);for(u=0;u<l;++u)(f=n[u])&&(d[u]=c=at+a.call(f,f.__data__,u,n),c in s?i[u]=f:s[c]=f);for(u=0;u<h;++u)(f=s[c=at+a.call(t,o[u],u,o)])?(r[u]=f,f.__data__=o[u],s[c]=null):e[u]=new ot(t,o[u]);for(u=0;u<l;++u)(f=n[u])&&s[d[u]]===f&&(i[u]=f)}function ct(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function st(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function lt(t,n){return t.style.getPropertyValue(n)||st(t).getComputedStyle(t,null).getPropertyValue(n)}function ht(t){return t.trim().split(/^|\s+/)}function dt(t){return t.classList||new pt(t)}function pt(t){this._node=t,this._names=ht(t.getAttribute("class")||"")}function vt(t,n){for(var e=dt(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function gt(t,n){for(var e=dt(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function yt(){this.textContent=""}function _t(){this.innerHTML=""}function bt(){this.nextSibling&&this.parentNode.appendChild(this)}function mt(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function xt(){return null}function wt(){var t=this.parentNode;t&&t.removeChild(this)}function Mt(){return this.parentNode.insertBefore(this.cloneNode(!1),this.nextSibling)}function At(){return this.parentNode.insertBefore(this.cloneNode(!0),this.nextSibling)}pt.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var Tt={};(t.event=null,"undefined"!=typeof document)&&("onmouseenter"in document.documentElement||(Tt={mouseenter:"mouseover",mouseleave:"mouseout"}));function Nt(t,n,e){return t=St(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function St(n,e,r){return function(i){var o=t.event;t.event=i;try{n.call(this,this.__data__,e,r)}finally{t.event=o}}}function Et(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function kt(t,n,e){var r=Tt.hasOwnProperty(t.type)?Nt:St;return function(i,o,a){var u,f=this.__on,c=r(n,o,a);if(f)for(var s=0,l=f.length;s<l;++s)if((u=f[s]).type===t.type&&u.name===t.name)return this.removeEventListener(u.type,u.listener,u.capture),this.addEventListener(u.type,u.listener=c,u.capture=e),void(u.value=n);this.addEventListener(t.type,c,e),u={type:t.type,name:t.name,value:n,listener:c,capture:e},f?f.push(u):this.__on=[u]}}function Ct(n,e,r,i){var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{t.event=o}}function Pt(t,n,e){var r=st(t),i=r.CustomEvent;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}var zt=[null];function Rt(t,n){this._groups=t,this._parents=n}function Lt(){return new Rt([[document.documentElement]],zt)}function Dt(t){return"string"==typeof t?new Rt([[document.querySelector(t)]],[document.documentElement]):new Rt([[t]],zt)}Rt.prototype=Lt.prototype={constructor:Rt,select:function(t){"function"!=typeof t&&(t=Q(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a,u=n[i],f=u.length,c=r[i]=new Array(f),s=0;s<f;++s)(o=u[s])&&(a=t.call(o,o.__data__,s,u))&&("__data__"in o&&(a.__data__=o.__data__),c[s]=a);return new Rt(r,this._parents)},selectAll:function(t){"function"!=typeof t&&(t=K(t));for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var a,u=n[o],f=u.length,c=0;c<f;++c)(a=u[c])&&(r.push(t.call(a,a.__data__,c,u)),i.push(a));return new Rt(r,i)},filter:function(t){"function"!=typeof t&&(t=rt(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a=n[i],u=a.length,f=r[i]=[],c=0;c<u;++c)(o=a[c])&&t.call(o,o.__data__,c,a)&&f.push(o);return new Rt(r,this._parents)},data:function(t,n){if(!t)return p=new Array(this.size()),s=-1,this.each(function(t){p[++s]=t}),p;var e,r=n?ft:ut,i=this._parents,o=this._groups;"function"!=typeof t&&(e=t,t=function(){return e});for(var a=o.length,u=new Array(a),f=new Array(a),c=new Array(a),s=0;s<a;++s){var l=i[s],h=o[s],d=h.length,p=t.call(l,l&&l.__data__,s,i),v=p.length,g=f[s]=new Array(v),y=u[s]=new Array(v);r(l,h,g,y,c[s]=new Array(d),p,n);for(var _,b,m=0,x=0;m<v;++m)if(_=g[m]){for(m>=x&&(x=m+1);!(b=y[x])&&++x<v;);_._next=b||null}}return(u=new Rt(u,i))._enter=f,u._exit=c,u},enter:function(){return new Rt(this._enter||this._groups.map(it),this._parents)},exit:function(){return new Rt(this._exit||this._groups.map(it),this._parents)},merge:function(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var f,c=n[u],s=e[u],l=c.length,h=a[u]=new Array(l),d=0;d<l;++d)(f=c[d]||s[d])&&(h[d]=f);for(;u<r;++u)a[u]=n[u];return new Rt(a,this._parents)},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,a=i[o];--o>=0;)(r=i[o])&&(a&&a!==r.nextSibling&&a.parentNode.insertBefore(r,a),a=r);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=ct);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var a,u=e[o],f=u.length,c=i[o]=new Array(f),s=0;s<f;++s)(a=u[s])&&(c[s]=a);c.sort(n)}return new Rt(i,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var a=r[i];if(a)return a}return null},size:function(){var t=0;return this.each(function(){++t}),t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],a=0,u=o.length;a<u;++a)(i=o[a])&&t.call(i,i.__data__,a,o);return this},attr:function(t,n){var e=$(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?function(t){return function(){this.removeAttributeNS(t.space,t.local)}}:function(t){return function(){this.removeAttribute(t)}}:"function"==typeof n?e.local?function(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}:function(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}:e.local?function(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}:function(t,n){return function(){this.setAttribute(t,n)}})(e,n))},style:function(t,n,e){return arguments.length>1?this.each((null==n?function(t){return function(){this.style.removeProperty(t)}}:"function"==typeof n?function(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}:function(t,n,e){return function(){this.style.setProperty(t,n,e)}})(t,n,null==e?"":e)):lt(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?function(t){return function(){delete this[t]}}:"function"==typeof n?function(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}:function(t,n){return function(){this[t]=n}})(t,n)):this.node()[t]},classed:function(t,n){var e=ht(t+"");if(arguments.length<2){for(var r=dt(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?function(t,n){return function(){(n.apply(this,arguments)?vt:gt)(this,t)}}:n?function(t){return function(){vt(this,t)}}:function(t){return function(){gt(this,t)}})(e,n))},text:function(t){return arguments.length?this.each(null==t?yt:("function"==typeof t?function(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}:function(t){return function(){this.textContent=t}})(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?_t:("function"==typeof t?function(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}:function(t){return function(){this.innerHTML=t}})(t)):this.node().innerHTML},raise:function(){return this.each(bt)},lower:function(){return this.each(mt)},append:function(t){var n="function"==typeof t?t:W(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})},insert:function(t,n){var e="function"==typeof t?t:W(t),r=null==n?xt:"function"==typeof n?n:Q(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})},remove:function(){return this.each(wt)},clone:function(t){return this.select(t?At:Mt)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,e){var r,i,o=function(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}(t+""),a=o.length;if(!(arguments.length<2)){for(u=n?kt:Et,null==e&&(e=!1),r=0;r<a;++r)this.each(u(o[r],n,e));return this}var u=this.node().__on;if(u)for(var f,c=0,s=u.length;c<s;++c)for(r=0,f=u[c];r<a;++r)if((i=o[r]).type===f.type&&i.name===f.name)return f.value},dispatch:function(t,n){return this.each(("function"==typeof n?function(t,n){return function(){return Pt(this,t,n.apply(this,arguments))}}:function(t,n){return function(){return Pt(this,t,n)}})(t,n))}};var Ut=0;function qt(){return new Ot}function Ot(){this._="@"+(++Ut).toString(36)}function Yt(){for(var n,e=t.event;n=e.sourceEvent;)e=n;return e}function Bt(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,[(r=r.matrixTransform(t.getScreenCTM().inverse())).x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}function Ft(t){var n=Yt();return n.changedTouches&&(n=n.changedTouches[0]),Bt(t,n)}function It(t,n,e){arguments.length<3&&(e=n,n=Yt().changedTouches);for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return Bt(t,r);return null}function Ht(){t.event.stopImmediatePropagation()}function jt(){t.event.preventDefault(),t.event.stopImmediatePropagation()}function Xt(t){var n=t.document.documentElement,e=Dt(t).on("dragstart.drag",jt,!0);"onselectstart"in n?e.on("selectstart.drag",jt,!0):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")}function Gt(t,n){var e=t.document.documentElement,r=Dt(t).on("dragstart.drag",null);n&&(r.on("click.drag",jt,!0),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function Vt(t){return function(){return t}}function $t(t,n,e,r,i,o,a,u,f,c){this.target=t,this.type=n,this.subject=e,this.identifier=r,this.active=i,this.x=o,this.y=a,this.dx=u,this.dy=f,this._=c}function Wt(){return!t.event.button}function Zt(){return this.parentNode}function Qt(n){return null==n?{x:t.event.x,y:t.event.y}:n}function Jt(){return"ontouchstart"in this}function Kt(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function tn(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function nn(){}Ot.prototype=qt.prototype={constructor:Ot,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}},$t.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};var en="\\s*([+-]?\\d+)\\s*",rn="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",on="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",an=/^#([0-9a-f]{3})$/,un=/^#([0-9a-f]{6})$/,fn=new RegExp("^rgb\\("+[en,en,en]+"\\)$"),cn=new RegExp("^rgb\\("+[on,on,on]+"\\)$"),sn=new RegExp("^rgba\\("+[en,en,en,rn]+"\\)$"),ln=new RegExp("^rgba\\("+[on,on,on,rn]+"\\)$"),hn=new RegExp("^hsl\\("+[rn,on,on]+"\\)$"),dn=new RegExp("^hsla\\("+[rn,on,on,rn]+"\\)$"),pn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function vn(t){var n;return t=(t+"").trim().toLowerCase(),(n=an.exec(t))?new mn((n=parseInt(n[1],16))>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):(n=un.exec(t))?gn(parseInt(n[1],16)):(n=fn.exec(t))?new mn(n[1],n[2],n[3],1):(n=cn.exec(t))?new mn(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=sn.exec(t))?yn(n[1],n[2],n[3],n[4]):(n=ln.exec(t))?yn(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=hn.exec(t))?wn(n[1],n[2]/100,n[3]/100,1):(n=dn.exec(t))?wn(n[1],n[2]/100,n[3]/100,n[4]):pn.hasOwnProperty(t)?gn(pn[t]):"transparent"===t?new mn(NaN,NaN,NaN,0):null}function gn(t){return new mn(t>>16&255,t>>8&255,255&t,1)}function yn(t,n,e,r){return r<=0&&(t=n=e=NaN),new mn(t,n,e,r)}function _n(t){return t instanceof nn||(t=vn(t)),t?new mn((t=t.rgb()).r,t.g,t.b,t.opacity):new mn}function bn(t,n,e,r){return 1===arguments.length?_n(t):new mn(t,n,e,null==r?1:r)}function mn(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function xn(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}function wn(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new An(t,n,e,r)}function Mn(t,n,e,r){return 1===arguments.length?function(t){if(t instanceof An)return new An(t.h,t.s,t.l,t.opacity);if(t instanceof nn||(t=vn(t)),!t)return new An;if(t instanceof An)return t;var n=(t=t.rgb()).r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),a=NaN,u=o-i,f=(o+i)/2;return u?(a=n===o?(e-r)/u+6*(e<r):e===o?(r-n)/u+2:(n-e)/u+4,u/=f<.5?o+i:2-o-i,a*=60):u=f>0&&f<1?0:a,new An(a,u,f,t.opacity)}(t):new An(t,n,e,null==r?1:r)}function An(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function Tn(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}Kt(nn,vn,{displayable:function(){return this.rgb().displayable()},hex:function(){return this.rgb().hex()},toString:function(){return this.rgb()+""}}),Kt(mn,bn,tn(nn,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new mn(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new mn(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},hex:function(){return"#"+xn(this.r)+xn(this.g)+xn(this.b)},toString:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),Kt(An,Mn,tn(nn,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new An(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new An(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new mn(Tn(t>=240?t-240:t+120,i,r),Tn(t,i,r),Tn(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var Nn=Math.PI/180,Sn=180/Math.PI,En=.96422,kn=1,Cn=.82521,Pn=4/29,zn=6/29,Rn=3*zn*zn,Ln=zn*zn*zn;function Dn(t){if(t instanceof qn)return new qn(t.l,t.a,t.b,t.opacity);if(t instanceof jn){if(isNaN(t.h))return new qn(t.l,0,0,t.opacity);var n=t.h*Nn;return new qn(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t instanceof mn||(t=_n(t));var e,r,i=Fn(t.r),o=Fn(t.g),a=Fn(t.b),u=On((.2225045*i+.7168786*o+.0606169*a)/kn);return i===o&&o===a?e=r=u:(e=On((.4360747*i+.3850649*o+.1430804*a)/En),r=On((.0139322*i+.0971045*o+.7141733*a)/Cn)),new qn(116*u-16,500*(e-u),200*(u-r),t.opacity)}function Un(t,n,e,r){return 1===arguments.length?Dn(t):new qn(t,n,e,null==r?1:r)}function qn(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function On(t){return t>Ln?Math.pow(t,1/3):t/Rn+Pn}function Yn(t){return t>zn?t*t*t:Rn*(t-Pn)}function Bn(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Fn(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function In(t){if(t instanceof jn)return new jn(t.h,t.c,t.l,t.opacity);if(t instanceof qn||(t=Dn(t)),0===t.a&&0===t.b)return new jn(NaN,0,t.l,t.opacity);var n=Math.atan2(t.b,t.a)*Sn;return new jn(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function Hn(t,n,e,r){return 1===arguments.length?In(t):new jn(t,n,e,null==r?1:r)}function jn(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}Kt(qn,Un,tn(nn,{brighter:function(t){return new qn(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new qn(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return new mn(Bn(3.1338561*(n=En*Yn(n))-1.6168667*(t=kn*Yn(t))-.4906146*(e=Cn*Yn(e))),Bn(-.9787684*n+1.9161415*t+.033454*e),Bn(.0719453*n-.2289914*t+1.4052427*e),this.opacity)}})),Kt(jn,Hn,tn(nn,{brighter:function(t){return new jn(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new jn(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return Dn(this).rgb()}}));var Xn=-.14861,Gn=1.78277,Vn=-.29227,$n=-.90649,Wn=1.97294,Zn=Wn*$n,Qn=Wn*Gn,Jn=Gn*Vn-$n*Xn;function Kn(t,n,e,r){return 1===arguments.length?function(t){if(t instanceof te)return new te(t.h,t.s,t.l,t.opacity);t instanceof mn||(t=_n(t));var n=t.r/255,e=t.g/255,r=t.b/255,i=(Jn*r+Zn*n-Qn*e)/(Jn+Zn-Qn),o=r-i,a=(Wn*(e-i)-Vn*o)/$n,u=Math.sqrt(a*a+o*o)/(Wn*i*(1-i)),f=u?Math.atan2(a,o)*Sn-120:NaN;return new te(f<0?f+360:f,u,i,t.opacity)}(t):new te(t,n,e,null==r?1:r)}function te(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function ne(t,n,e,r,i){var o=t*t,a=o*t;return((1-3*t+3*o-a)*n+(4-6*o+3*a)*e+(1+3*t+3*o-3*a)*r+a*i)/6}function ee(t){var n=t.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),i=t[r],o=t[r+1],a=r>0?t[r-1]:2*i-o,u=r<n-1?t[r+2]:2*o-i;return ne((e-r/n)*n,a,i,o,u)}}function re(t){var n=t.length;return function(e){var r=Math.floor(((e%=1)<0?++e:e)*n),i=t[(r+n-1)%n],o=t[r%n],a=t[(r+1)%n],u=t[(r+2)%n];return ne((e-r/n)*n,i,o,a,u)}}function ie(t){return function(){return t}}function oe(t,n){return function(e){return t+e*n}}function ae(t,n){var e=n-t;return e?oe(t,e>180||e<-180?e-360*Math.round(e/360):e):ie(isNaN(t)?n:t)}function ue(t){return 1==(t=+t)?fe:function(n,e){return e-n?function(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}(n,e,t):ie(isNaN(n)?e:n)}}function fe(t,n){var e=n-t;return e?oe(t,e):ie(isNaN(t)?n:t)}Kt(te,Kn,tn(nn,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new te(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new te(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*Nn,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t);return new mn(255*(n+e*(Xn*r+Gn*i)),255*(n+e*(Vn*r+$n*i)),255*(n+e*(Wn*r)),this.opacity)}}));var ce=function t(n){var e=ue(n);function r(t,n){var r=e((t=bn(t)).r,(n=bn(n)).r),i=e(t.g,n.g),o=e(t.b,n.b),a=fe(t.opacity,n.opacity);return function(n){return t.r=r(n),t.g=i(n),t.b=o(n),t.opacity=a(n),t+""}}return r.gamma=t,r}(1);function se(t){return function(n){var e,r,i=n.length,o=new Array(i),a=new Array(i),u=new Array(i);for(e=0;e<i;++e)r=bn(n[e]),o[e]=r.r||0,a[e]=r.g||0,u[e]=r.b||0;return o=t(o),a=t(a),u=t(u),r.opacity=1,function(t){return r.r=o(t),r.g=a(t),r.b=u(t),r+""}}}var le=se(ee),he=se(re);function de(t,n){var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,o=new Array(i),a=new Array(r);for(e=0;e<i;++e)o[e]=me(t[e],n[e]);for(;e<r;++e)a[e]=n[e];return function(t){for(e=0;e<i;++e)a[e]=o[e](t);return a}}function pe(t,n){var e=new Date;return n-=t=+t,function(r){return e.setTime(t+n*r),e}}function ve(t,n){return n-=t=+t,function(e){return t+n*e}}function ge(t,n){var e,r={},i={};for(e in null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={}),n)e in t?r[e]=me(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t);return i}}var ye=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,_e=new RegExp(ye.source,"g");function be(t,n){var e,r,i,o=ye.lastIndex=_e.lastIndex=0,a=-1,u=[],f=[];for(t+="",n+="";(e=ye.exec(t))&&(r=_e.exec(n));)(i=r.index)>o&&(i=n.slice(o,i),u[a]?u[a]+=i:u[++a]=i),(e=e[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,f.push({i:a,x:ve(e,r)})),o=_e.lastIndex;return o<n.length&&(i=n.slice(o),u[a]?u[a]+=i:u[++a]=i),u.length<2?f[0]?function(t){return function(n){return t(n)+""}}(f[0].x):function(t){return function(){return t}}(n):(n=f.length,function(t){for(var e,r=0;r<n;++r)u[(e=f[r]).i]=e.x(t);return u.join("")})}function me(t,n){var e,r=typeof n;return null==n||"boolean"===r?ie(n):("number"===r?ve:"string"===r?(e=vn(n))?(n=e,ce):be:n instanceof vn?ce:n instanceof Date?pe:Array.isArray(n)?de:"function"!=typeof n.valueOf&&"function"!=typeof n.toString||isNaN(n)?ge:ve)(t,n)}function xe(t,n){return n-=t=+t,function(e){return Math.round(t+n*e)}}var we,Me,Ae,Te,Ne=180/Math.PI,Se={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ee(t,n,e,r,i,o){var a,u,f;return(a=Math.sqrt(t*t+n*n))&&(t/=a,n/=a),(f=t*e+n*r)&&(e-=t*f,r-=n*f),(u=Math.sqrt(e*e+r*r))&&(e/=u,r/=u,f/=u),t*r<n*e&&(t=-t,n=-n,f=-f,a=-a),{translateX:i,translateY:o,rotate:Math.atan2(n,t)*Ne,skewX:Math.atan(f)*Ne,scaleX:a,scaleY:u}}function ke(t,n,e,r){function i(t){return t.length?t.pop()+" ":""}return function(o,a){var u=[],f=[];return o=t(o),a=t(a),function(t,r,i,o,a,u){if(t!==i||r!==o){var f=a.push("translate(",null,n,null,e);u.push({i:f-4,x:ve(t,i)},{i:f-2,x:ve(r,o)})}else(i||o)&&a.push("translate("+i+n+o+e)}(o.translateX,o.translateY,a.translateX,a.translateY,u,f),function(t,n,e,o){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),o.push({i:e.push(i(e)+"rotate(",null,r)-2,x:ve(t,n)})):n&&e.push(i(e)+"rotate("+n+r)}(o.rotate,a.rotate,u,f),function(t,n,e,o){t!==n?o.push({i:e.push(i(e)+"skewX(",null,r)-2,x:ve(t,n)}):n&&e.push(i(e)+"skewX("+n+r)}(o.skewX,a.skewX,u,f),function(t,n,e,r,o,a){if(t!==e||n!==r){var u=o.push(i(o)+"scale(",null,",",null,")");a.push({i:u-4,x:ve(t,e)},{i:u-2,x:ve(n,r)})}else 1===e&&1===r||o.push(i(o)+"scale("+e+","+r+")")}(o.scaleX,o.scaleY,a.scaleX,a.scaleY,u,f),o=a=null,function(t){for(var n,e=-1,r=f.length;++e<r;)u[(n=f[e]).i]=n.x(t);return u.join("")}}}var Ce=ke(function(t){return"none"===t?Se:(we||(we=document.createElement("DIV"),Me=document.documentElement,Ae=document.defaultView),we.style.transform=t,t=Ae.getComputedStyle(Me.appendChild(we),null).getPropertyValue("transform"),Me.removeChild(we),Ee(+(t=t.slice(7,-1).split(","))[0],+t[1],+t[2],+t[3],+t[4],+t[5]))},"px, ","px)","deg)"),Pe=ke(function(t){return null==t?Se:(Te||(Te=document.createElementNS("http://www.w3.org/2000/svg","g")),Te.setAttribute("transform",t),(t=Te.transform.baseVal.consolidate())?Ee((t=t.matrix).a,t.b,t.c,t.d,t.e,t.f):Se)},", ",")",")"),ze=Math.SQRT2,Re=2,Le=4,De=1e-12;function Ue(t){return((t=Math.exp(t))+1/t)/2}function qe(t,n){var e,r,i=t[0],o=t[1],a=t[2],u=n[0],f=n[1],c=n[2],s=u-i,l=f-o,h=s*s+l*l;if(h<De)r=Math.log(c/a)/ze,e=function(t){return[i+t*s,o+t*l,a*Math.exp(ze*t*r)]};else{var d=Math.sqrt(h),p=(c*c-a*a+Le*h)/(2*a*Re*d),v=(c*c-a*a-Le*h)/(2*c*Re*d),g=Math.log(Math.sqrt(p*p+1)-p),y=Math.log(Math.sqrt(v*v+1)-v);r=(y-g)/ze,e=function(t){var n,e=t*r,u=Ue(g),f=a/(Re*d)*(u*(n=ze*e+g,((n=Math.exp(2*n))-1)/(n+1))-function(t){return((t=Math.exp(t))-1/t)/2}(g));return[i+f*s,o+f*l,a*u/Ue(ze*e+g)]}}return e.duration=1e3*r,e}function Oe(t){return function(n,e){var r=t((n=Mn(n)).h,(e=Mn(e)).h),i=fe(n.s,e.s),o=fe(n.l,e.l),a=fe(n.opacity,e.opacity);return function(t){return n.h=r(t),n.s=i(t),n.l=o(t),n.opacity=a(t),n+""}}}var Ye=Oe(ae),Be=Oe(fe);function Fe(t){return function(n,e){var r=t((n=Hn(n)).h,(e=Hn(e)).h),i=fe(n.c,e.c),o=fe(n.l,e.l),a=fe(n.opacity,e.opacity);return function(t){return n.h=r(t),n.c=i(t),n.l=o(t),n.opacity=a(t),n+""}}}var Ie=Fe(ae),He=Fe(fe);function je(t){return function n(e){function r(n,r){var i=t((n=Kn(n)).h,(r=Kn(r)).h),o=fe(n.s,r.s),a=fe(n.l,r.l),u=fe(n.opacity,r.opacity);return function(t){return n.h=i(t),n.s=o(t),n.l=a(Math.pow(t,e)),n.opacity=u(t),n+""}}return e=+e,r.gamma=n,r}(1)}var Xe=je(ae),Ge=je(fe);var Ve,$e,We=0,Ze=0,Qe=0,Je=1e3,Ke=0,tr=0,nr=0,er="object"==typeof performance&&performance.now?performance:Date,rr="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function ir(){return tr||(rr(or),tr=er.now()+nr)}function or(){tr=0}function ar(){this._call=this._time=this._next=null}function ur(t,n,e){var r=new ar;return r.restart(t,n,e),r}function fr(){ir(),++We;for(var t,n=Ve;n;)(t=tr-n._time)>=0&&n._call.call(null,t),n=n._next;--We}function cr(){tr=(Ke=er.now())+nr,We=Ze=0;try{fr()}finally{We=0,function(){var t,n,e=Ve,r=1/0;for(;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:Ve=n);$e=t,lr(r)}(),tr=0}}function sr(){var t=er.now(),n=t-Ke;n>Je&&(nr-=n,Ke=t)}function lr(t){We||(Ze&&(Ze=clearTimeout(Ze)),t-tr>24?(t<1/0&&(Ze=setTimeout(cr,t-er.now()-nr)),Qe&&(Qe=clearInterval(Qe))):(Qe||(Ke=er.now(),Qe=setInterval(sr,Je)),We=1,rr(cr)))}function hr(t,n,e){var r=new ar;return n=null==n?0:+n,r.restart(function(e){r.stop(),t(e+n)},n,e),r}ar.prototype=ur.prototype={constructor:ar,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?ir():+e)+(null==n?0:+n),this._next||$e===this||($e?$e._next=this:Ve=this,$e=this),this._call=t,this._time=e,lr()},stop:function(){this._call&&(this._call=null,this._time=1/0,lr())}};var dr=I("start","end","interrupt"),pr=[],vr=0,gr=1,yr=2,_r=3,br=4,mr=5,xr=6;function wr(t,n,e,r,i,o){var a=t.__transition;if(a){if(e in a)return}else t.__transition={};!function(t,n,e){var r,i=t.__transition;function o(f){var c,s,l,h;if(e.state!==gr)return u();for(c in i)if((h=i[c]).name===e.name){if(h.state===_r)return hr(o);h.state===br?(h.state=xr,h.timer.stop(),h.on.call("interrupt",t,t.__data__,h.index,h.group),delete i[c]):+c<n&&(h.state=xr,h.timer.stop(),delete i[c])}if(hr(function(){e.state===_r&&(e.state=br,e.timer.restart(a,e.delay,e.time),a(f))}),e.state=yr,e.on.call("start",t,t.__data__,e.index,e.group),e.state===yr){for(e.state=_r,r=new Array(l=e.tween.length),c=0,s=-1;c<l;++c)(h=e.tween[c].value.call(t,t.__data__,e.index,e.group))&&(r[++s]=h);r.length=s+1}}function a(n){for(var i=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(u),e.state=mr,1),o=-1,a=r.length;++o<a;)r[o].call(null,i);e.state===mr&&(e.on.call("end",t,t.__data__,e.index,e.group),u())}function u(){for(var r in e.state=xr,e.timer.stop(),delete i[n],i)return;delete t.__transition}i[n]=e,e.timer=ur(function(t){e.state=gr,e.timer.restart(o,e.delay,e.time),e.delay<=t&&o(t-e.delay)},0,e.time)}(t,e,{name:n,index:r,group:i,on:dr,tween:pr,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:vr})}function Mr(t,n){var e=Tr(t,n);if(e.state>vr)throw new Error("too late; already scheduled");return e}function Ar(t,n){var e=Tr(t,n);if(e.state>yr)throw new Error("too late; already started");return e}function Tr(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("transition not found");return e}function Nr(t,n){var e,r,i,o=t.__transition,a=!0;if(o){for(i in n=null==n?null:n+"",o)(e=o[i]).name===n?(r=e.state>yr&&e.state<mr,e.state=xr,e.timer.stop(),r&&e.on.call("interrupt",t,t.__data__,e.index,e.group),delete o[i]):a=!1;a&&delete t.__transition}}function Sr(t,n,e){var r=t._id;return t.each(function(){var t=Ar(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)}),function(t){return Tr(t,r).value[n]}}function Er(t,n){var e;return("number"==typeof n?ve:n instanceof vn?ce:(e=vn(n))?(n=e,ce):be)(t,n)}var kr=Lt.prototype.constructor;var Cr=0;function Pr(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function zr(t){return Lt().transition(t)}function Rr(){return++Cr}var Lr=Lt.prototype;function Dr(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}function Ur(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}Pr.prototype=zr.prototype={constructor:Pr,select:function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=Q(t));for(var r=this._groups,i=r.length,o=new Array(i),a=0;a<i;++a)for(var u,f,c=r[a],s=c.length,l=o[a]=new Array(s),h=0;h<s;++h)(u=c[h])&&(f=t.call(u,u.__data__,h,c))&&("__data__"in u&&(f.__data__=u.__data__),l[h]=f,wr(l[h],n,e,h,l,Tr(u,e)));return new Pr(o,this._parents,n,e)},selectAll:function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=K(t));for(var r=this._groups,i=r.length,o=[],a=[],u=0;u<i;++u)for(var f,c=r[u],s=c.length,l=0;l<s;++l)if(f=c[l]){for(var h,d=t.call(f,f.__data__,l,c),p=Tr(f,e),v=0,g=d.length;v<g;++v)(h=d[v])&&wr(h,n,e,v,d,p);o.push(d),a.push(f)}return new Pr(o,a,n,e)},filter:function(t){"function"!=typeof t&&(t=rt(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a=n[i],u=a.length,f=r[i]=[],c=0;c<u;++c)(o=a[c])&&t.call(o,o.__data__,c,a)&&f.push(o);return new Pr(r,this._parents,this._name,this._id)},merge:function(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var f,c=n[u],s=e[u],l=c.length,h=a[u]=new Array(l),d=0;d<l;++d)(f=c[d]||s[d])&&(h[d]=f);for(;u<r;++u)a[u]=n[u];return new Pr(a,this._parents,this._name,this._id)},selection:function(){return new kr(this._groups,this._parents)},transition:function(){for(var t=this._name,n=this._id,e=Rr(),r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],f=u.length,c=0;c<f;++c)if(a=u[c]){var s=Tr(a,n);wr(a,t,e,c,u,{time:s.time+s.delay+s.duration,delay:0,duration:s.duration,ease:s.ease})}return new Pr(r,this._parents,t,e)},call:Lr.call,nodes:Lr.nodes,node:Lr.node,size:Lr.size,empty:Lr.empty,each:Lr.each,on:function(t,n){var e=this._id;return arguments.length<2?Tr(this.node(),e).on.on(t):this.each(function(t,n,e){var r,i,o=function(t){return(t+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t})}(n)?Mr:Ar;return function(){var a=o(this,t),u=a.on;u!==r&&(i=(r=u).copy()).on(n,e),a.on=i}}(e,t,n))},attr:function(t,n){var e=$(t),r="transform"===e?Pe:Er;return this.attrTween(t,"function"==typeof n?(e.local?function(t,n,e){var r,i,o;return function(){var a,u=e(this);if(null!=u)return(a=this.getAttributeNS(t.space,t.local))===u?null:a===r&&u===i?o:o=n(r=a,i=u);this.removeAttributeNS(t.space,t.local)}}:function(t,n,e){var r,i,o;return function(){var a,u=e(this);if(null!=u)return(a=this.getAttribute(t))===u?null:a===r&&u===i?o:o=n(r=a,i=u);this.removeAttribute(t)}})(e,r,Sr(this,"attr."+t,n)):null==n?(e.local?function(t){return function(){this.removeAttributeNS(t.space,t.local)}}:function(t){return function(){this.removeAttribute(t)}})(e):(e.local?function(t,n,e){var r,i;return function(){var o=this.getAttributeNS(t.space,t.local);return o===e?null:o===r?i:i=n(r=o,e)}}:function(t,n,e){var r,i;return function(){var o=this.getAttribute(t);return o===e?null:o===r?i:i=n(r=o,e)}})(e,r,n+""))},attrTween:function(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error;var r=$(t);return this.tween(e,(r.local?function(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttributeNS(t.space,t.local,r(n))}}return e._value=n,e}:function(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttribute(t,r(n))}}return e._value=n,e})(r,n))},style:function(t,n,e){var r="transform"==(t+="")?Ce:Er;return null==n?this.styleTween(t,function(t,n){var e,r,i;return function(){var o=lt(this,t),a=(this.style.removeProperty(t),lt(this,t));return o===a?null:o===e&&a===r?i:i=n(e=o,r=a)}}(t,r)).on("end.style."+t,function(t){return function(){this.style.removeProperty(t)}}(t)):this.styleTween(t,"function"==typeof n?function(t,n,e){var r,i,o;return function(){var a=lt(this,t),u=e(this);return null==u&&(this.style.removeProperty(t),u=lt(this,t)),a===u?null:a===r&&u===i?o:o=n(r=a,i=u)}}(t,r,Sr(this,"style."+t,n)):function(t,n,e){var r,i;return function(){var o=lt(this,t);return o===e?null:o===r?i:i=n(r=o,e)}}(t,r,n+""),e)},styleTween:function(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,function(t,n,e){function r(){var r=this,i=n.apply(r,arguments);return i&&function(n){r.style.setProperty(t,i(n),e)}}return r._value=n,r}(t,n,null==e?"":e))},text:function(t){return this.tween("text","function"==typeof t?function(t){return function(){var n=t(this);this.textContent=null==n?"":n}}(Sr(this,"text",t)):function(t){return function(){this.textContent=t}}(null==t?"":t+""))},remove:function(){return this.on("end.remove",(t=this._id,function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}));var t},tween:function(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r,i=Tr(this.node(),e).tween,o=0,a=i.length;o<a;++o)if((r=i[o]).name===t)return r.value;return null}return this.each((null==n?function(t,n){var e,r;return function(){var i=Ar(this,t),o=i.tween;if(o!==e)for(var a=0,u=(r=e=o).length;a<u;++a)if(r[a].name===n){(r=r.slice()).splice(a,1);break}i.tween=r}}:function(t,n,e){var r,i;if("function"!=typeof e)throw new Error;return function(){var o=Ar(this,t),a=o.tween;if(a!==r){i=(r=a).slice();for(var u={name:n,value:e},f=0,c=i.length;f<c;++f)if(i[f].name===n){i[f]=u;break}f===c&&i.push(u)}o.tween=i}})(e,t,n))},delay:function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?function(t,n){return function(){Mr(this,t).delay=+n.apply(this,arguments)}}:function(t,n){return n=+n,function(){Mr(this,t).delay=n}})(n,t)):Tr(this.node(),n).delay},duration:function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?function(t,n){return function(){Ar(this,t).duration=+n.apply(this,arguments)}}:function(t,n){return n=+n,function(){Ar(this,t).duration=n}})(n,t)):Tr(this.node(),n).duration},ease:function(t){var n=this._id;return arguments.length?this.each(function(t,n){if("function"!=typeof n)throw new Error;return function(){Ar(this,t).ease=n}}(n,t)):Tr(this.node(),n).ease}};var qr=function t(n){function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e}(3),Or=function t(n){function e(t){return 1-Math.pow(1-t,n)}return n=+n,e.exponent=t,e}(3),Yr=function t(n){function e(t){return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e}(3),Br=Math.PI,Fr=Br/2;function Ir(t){return(1-Math.cos(Br*t))/2}function Hr(t){return((t*=2)<=1?Math.pow(2,10*t-10):2-Math.pow(2,10-10*t))/2}function jr(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}var Xr=4/11,Gr=6/11,Vr=8/11,$r=.75,Wr=9/11,Zr=10/11,Qr=.9375,Jr=21/22,Kr=63/64,ti=1/Xr/Xr;function ni(t){return(t=+t)<Xr?ti*t*t:t<Vr?ti*(t-=Gr)*t+$r:t<Zr?ti*(t-=Wr)*t+Qr:ti*(t-=Jr)*t+Kr}var ei=function t(n){function e(t){return t*t*((n+1)*t-n)}return n=+n,e.overshoot=t,e}(1.70158),ri=function t(n){function e(t){return--t*t*((n+1)*t+n)+1}return n=+n,e.overshoot=t,e}(1.70158),ii=function t(n){function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}return n=+n,e.overshoot=t,e}(1.70158),oi=2*Math.PI,ai=function t(n,e){var r=Math.asin(1/(n=Math.max(1,n)))*(e/=oi);function i(t){return n*Math.pow(2,10*--t)*Math.sin((r-t)/e)}return i.amplitude=function(n){return t(n,e*oi)},i.period=function(e){return t(n,e)},i}(1,.3),ui=function t(n,e){var r=Math.asin(1/(n=Math.max(1,n)))*(e/=oi);function i(t){return 1-n*Math.pow(2,-10*(t=+t))*Math.sin((t+r)/e)}return i.amplitude=function(n){return t(n,e*oi)},i.period=function(e){return t(n,e)},i}(1,.3),fi=function t(n,e){var r=Math.asin(1/(n=Math.max(1,n)))*(e/=oi);function i(t){return((t=2*t-1)<0?n*Math.pow(2,10*t)*Math.sin((r-t)/e):2-n*Math.pow(2,-10*t)*Math.sin((r+t)/e))/2}return i.amplitude=function(n){return t(n,e*oi)},i.period=function(e){return t(n,e)},i}(1,.3),ci={time:null,delay:0,duration:250,ease:Ur};function si(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return ci.time=ir(),ci;return e}Lt.prototype.interrupt=function(t){return this.each(function(){Nr(this,t)})},Lt.prototype.transition=function(t){var n,e;t instanceof Pr?(n=t._id,t=t._name):(n=Rr(),(e=ci).time=ir(),t=null==t?null:t+"");for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],f=u.length,c=0;c<f;++c)(a=u[c])&&wr(a,t,n,c,u,e||si(a,n));return new Pr(r,this._parents,t,n)};var li=[null];function hi(t){return function(){return t}}function di(t,n,e){this.target=t,this.type=n,this.selection=e}function pi(){t.event.stopImmediatePropagation()}function vi(){t.event.preventDefault(),t.event.stopImmediatePropagation()}var gi={name:"drag"},yi={name:"space"},_i={name:"handle"},bi={name:"center"},mi={name:"x",handles:["e","w"].map(Ei),input:function(t,n){return t&&[[t[0],n[0][1]],[t[1],n[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},xi={name:"y",handles:["n","s"].map(Ei),input:function(t,n){return t&&[[n[0][0],t[0]],[n[1][0],t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},wi={name:"xy",handles:["n","e","s","w","nw","ne","se","sw"].map(Ei),input:function(t){return t},output:function(t){return t}},Mi={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Ai={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},Ti={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},Ni={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},Si={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};function Ei(t){return{type:t}}function ki(){return!t.event.button}function Ci(){var t=this.ownerSVGElement||this;return[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function Pi(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function zi(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function Ri(n){var e,r=Ci,i=ki,o=I(u,"start","brush","end"),a=6;function u(t){var e=t.property("__brush",h).selectAll(".overlay").data([Ei("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",Mi.overlay).merge(e).each(function(){var t=Pi(this).extent;Dt(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])}),t.selectAll(".selection").data([Ei("selection")]).enter().append("rect").attr("class","selection").attr("cursor",Mi.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var r=t.selectAll(".handle").data(n.handles,function(t){return t.type});r.exit().remove(),r.enter().append("rect").attr("class",function(t){return"handle handle--"+t.type}).attr("cursor",function(t){return Mi[t.type]}),t.each(f).attr("fill","none").attr("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush touchstart.brush",l)}function f(){var t=Dt(this),n=Pi(this).selection;n?(t.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),t.selectAll(".handle").style("display",null).attr("x",function(t){return"e"===t.type[t.type.length-1]?n[1][0]-a/2:n[0][0]-a/2}).attr("y",function(t){return"s"===t.type[0]?n[1][1]-a/2:n[0][1]-a/2}).attr("width",function(t){return"n"===t.type||"s"===t.type?n[1][0]-n[0][0]+a:a}).attr("height",function(t){return"e"===t.type||"w"===t.type?n[1][1]-n[0][1]+a:a})):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function c(t,n){return t.__brush.emitter||new s(t,n)}function s(t,n){this.that=t,this.args=n,this.state=t.__brush,this.active=0}function l(){if(t.event.touches){if(t.event.changedTouches.length<t.event.touches.length)return vi()}else if(e)return;if(i.apply(this,arguments)){var r,o,a,u,s,l,h,d,p,v,g,y,_,b=this,m=t.event.target.__data__.type,x="selection"===(t.event.metaKey?m="overlay":m)?gi:t.event.altKey?bi:_i,w=n===xi?null:Ni[m],M=n===mi?null:Si[m],A=Pi(b),T=A.extent,N=A.selection,S=T[0][0],E=T[0][1],k=T[1][0],C=T[1][1],P=w&&M&&t.event.shiftKey,z=Ft(b),R=z,L=c(b,arguments).beforestart();"overlay"===m?A.selection=N=[[r=n===xi?S:z[0],a=n===mi?E:z[1]],[s=n===xi?k:r,h=n===mi?C:a]]:(r=N[0][0],a=N[0][1],s=N[1][0],h=N[1][1]),o=r,u=a,l=s,d=h;var D=Dt(b).attr("pointer-events","none"),U=D.selectAll(".overlay").attr("cursor",Mi[m]);if(t.event.touches)D.on("touchmove.brush",O,!0).on("touchend.brush touchcancel.brush",B,!0);else{var q=Dt(t.event.view).on("keydown.brush",function(){switch(t.event.keyCode){case 16:P=w&&M;break;case 18:x===_i&&(w&&(s=l-p*w,r=o+p*w),M&&(h=d-v*M,a=u+v*M),x=bi,Y());break;case 32:x!==_i&&x!==bi||(w<0?s=l-p:w>0&&(r=o-p),M<0?h=d-v:M>0&&(a=u-v),x=yi,U.attr("cursor",Mi.selection),Y());break;default:return}vi()},!0).on("keyup.brush",function(){switch(t.event.keyCode){case 16:P&&(y=_=P=!1,Y());break;case 18:x===bi&&(w<0?s=l:w>0&&(r=o),M<0?h=d:M>0&&(a=u),x=_i,Y());break;case 32:x===yi&&(t.event.altKey?(w&&(s=l-p*w,r=o+p*w),M&&(h=d-v*M,a=u+v*M),x=bi):(w<0?s=l:w>0&&(r=o),M<0?h=d:M>0&&(a=u),x=_i),U.attr("cursor",Mi[m]),Y());break;default:return}vi()},!0).on("mousemove.brush",O,!0).on("mouseup.brush",B,!0);Xt(t.event.view)}pi(),Nr(b),f.call(b),L.start()}function O(){var t=Ft(b);!P||y||_||(Math.abs(t[0]-R[0])>Math.abs(t[1]-R[1])?_=!0:y=!0),R=t,g=!0,vi(),Y()}function Y(){var t;switch(p=R[0]-z[0],v=R[1]-z[1],x){case yi:case gi:w&&(p=Math.max(S-r,Math.min(k-s,p)),o=r+p,l=s+p),M&&(v=Math.max(E-a,Math.min(C-h,v)),u=a+v,d=h+v);break;case _i:w<0?(p=Math.max(S-r,Math.min(k-r,p)),o=r+p,l=s):w>0&&(p=Math.max(S-s,Math.min(k-s,p)),o=r,l=s+p),M<0?(v=Math.max(E-a,Math.min(C-a,v)),u=a+v,d=h):M>0&&(v=Math.max(E-h,Math.min(C-h,v)),u=a,d=h+v);break;case bi:w&&(o=Math.max(S,Math.min(k,r-p*w)),l=Math.max(S,Math.min(k,s+p*w))),M&&(u=Math.max(E,Math.min(C,a-v*M)),d=Math.max(E,Math.min(C,h+v*M)))}l<o&&(w*=-1,t=r,r=s,s=t,t=o,o=l,l=t,m in Ai&&U.attr("cursor",Mi[m=Ai[m]])),d<u&&(M*=-1,t=a,a=h,h=t,t=u,u=d,d=t,m in Ti&&U.attr("cursor",Mi[m=Ti[m]])),A.selection&&(N=A.selection),y&&(o=N[0][0],l=N[1][0]),_&&(u=N[0][1],d=N[1][1]),N[0][0]===o&&N[0][1]===u&&N[1][0]===l&&N[1][1]===d||(A.selection=[[o,u],[l,d]],f.call(b),L.brush())}function B(){if(pi(),t.event.touches){if(t.event.touches.length)return;e&&clearTimeout(e),e=setTimeout(function(){e=null},500),D.on("touchmove.brush touchend.brush touchcancel.brush",null)}else Gt(t.event.view,g),q.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);D.attr("pointer-events","all"),U.attr("cursor",Mi.overlay),A.selection&&(N=A.selection),zi(N)&&(A.selection=null,f.call(b)),L.end()}}function h(){var t=this.__brush||{selection:null};return t.extent=r.apply(this,arguments),t.dim=n,t}return u.move=function(t,e){t.selection?t.on("start.brush",function(){c(this,arguments).beforestart().start()}).on("interrupt.brush end.brush",function(){c(this,arguments).end()}).tween("brush",function(){var t=this,r=t.__brush,i=c(t,arguments),o=r.selection,a=n.input("function"==typeof e?e.apply(this,arguments):e,r.extent),u=me(o,a);function s(n){r.selection=1===n&&zi(a)?null:u(n),f.call(t),i.brush()}return o&&a?s:s(1)}):t.each(function(){var t=arguments,r=this.__brush,i=n.input("function"==typeof e?e.apply(this,t):e,r.extent),o=c(this,t).beforestart();Nr(this),r.selection=null==i||zi(i)?null:i,f.call(this),o.start().brush().end()})},s.prototype={beforestart:function(){return 1==++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(){return this.starting&&(this.starting=!1,this.emit("start")),this},brush:function(){return this.emit("brush"),this},end:function(){return 0==--this.active&&(delete this.state.emitter,this.emit("end")),this},emit:function(t){Ct(new di(u,t,n.output(this.state.selection)),o.apply,o,[t,this.that,this.args])}},u.extent=function(t){return arguments.length?(r="function"==typeof t?t:hi([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),u):r},u.filter=function(t){return arguments.length?(i="function"==typeof t?t:hi(!!t),u):i},u.handleSize=function(t){return arguments.length?(a=+t,u):a},u.on=function(){var t=o.on.apply(o,arguments);return t===o?u:t},u}var Li=Math.cos,Di=Math.sin,Ui=Math.PI,qi=Ui/2,Oi=2*Ui,Yi=Math.max;var Bi=Array.prototype.slice;function Fi(t){return function(){return t}}var Ii=Math.PI,Hi=2*Ii,ji=Hi-1e-6;function Xi(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function Gi(){return new Xi}function Vi(t){return t.source}function $i(t){return t.target}function Wi(t){return t.radius}function Zi(t){return t.startAngle}function Qi(t){return t.endAngle}Xi.prototype=Gi.prototype={constructor:Xi,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,e,r){this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+r)},bezierCurveTo:function(t,n,e,r,i,o){this._+="C"+ +t+","+ +n+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+o)},arcTo:function(t,n,e,r,i){t=+t,n=+n,e=+e,r=+r,i=+i;var o=this._x1,a=this._y1,u=e-t,f=r-n,c=o-t,s=a-n,l=c*c+s*s;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(l>1e-6)if(Math.abs(s*u-f*c)>1e-6&&i){var h=e-o,d=r-a,p=u*u+f*f,v=h*h+d*d,g=Math.sqrt(p),y=Math.sqrt(l),_=i*Math.tan((Ii-Math.acos((p+l-v)/(2*g*y)))/2),b=_/y,m=_/g;Math.abs(b-1)>1e-6&&(this._+="L"+(t+b*c)+","+(n+b*s)),this._+="A"+i+","+i+",0,0,"+ +(s*h>c*d)+","+(this._x1=t+m*u)+","+(this._y1=n+m*f)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,e,r,i,o){t=+t,n=+n;var a=(e=+e)*Math.cos(r),u=e*Math.sin(r),f=t+a,c=n+u,s=1^o,l=o?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+f+","+c:(Math.abs(this._x1-f)>1e-6||Math.abs(this._y1-c)>1e-6)&&(this._+="L"+f+","+c),e&&(l<0&&(l=l%Hi+Hi),l>ji?this._+="A"+e+","+e+",0,1,"+s+","+(t-a)+","+(n-u)+"A"+e+","+e+",0,1,"+s+","+(this._x1=f)+","+(this._y1=c):l>1e-6&&(this._+="A"+e+","+e+",0,"+ +(l>=Ii)+","+s+","+(this._x1=t+e*Math.cos(i))+","+(this._y1=n+e*Math.sin(i))))},rect:function(t,n,e,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +r+"h"+-e+"Z"},toString:function(){return this._}};function Ji(){}function Ki(t,n){var e=new Ji;if(t instanceof Ji)t.each(function(t,n){e.set(n,t)});else if(Array.isArray(t)){var r,i=-1,o=t.length;if(null==n)for(;++i<o;)e.set(i,t[i]);else for(;++i<o;)e.set(n(r=t[i],i,t),r)}else if(t)for(var a in t)e.set(a,t[a]);return e}function to(){return{}}function no(t,n,e){t[n]=e}function eo(){return Ki()}function ro(t,n,e){t.set(n,e)}function io(){}Ji.prototype=Ki.prototype={constructor:Ji,has:function(t){return"$"+t in this},get:function(t){return this["$"+t]},set:function(t,n){return this["$"+t]=n,this},remove:function(t){var n="$"+t;return n in this&&delete this[n]},clear:function(){for(var t in this)"$"===t[0]&&delete this[t]},keys:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(n.slice(1));return t},values:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(this[n]);return t},entries:function(){var t=[];for(var n in this)"$"===n[0]&&t.push({key:n.slice(1),value:this[n]});return t},size:function(){var t=0;for(var n in this)"$"===n[0]&&++t;return t},empty:function(){for(var t in this)if("$"===t[0])return!1;return!0},each:function(t){for(var n in this)"$"===n[0]&&t(this[n],n.slice(1),this)}};var oo=Ki.prototype;function ao(t,n){var e=new io;if(t instanceof io)t.each(function(t){e.add(t)});else if(t){var r=-1,i=t.length;if(null==n)for(;++r<i;)e.add(t[r]);else for(;++r<i;)e.add(n(t[r],r,t))}return e}io.prototype=ao.prototype={constructor:io,has:oo.has,add:function(t){return this["$"+(t+="")]=t,this},remove:oo.remove,clear:oo.clear,values:oo.keys,size:oo.size,empty:oo.empty,each:oo.each};var uo=Array.prototype.slice;function fo(t,n){return t-n}function co(t){return function(){return t}}function so(t,n){for(var e,r=-1,i=n.length;++r<i;)if(e=lo(t,n[r]))return e;return 0}function lo(t,n){for(var e=n[0],r=n[1],i=-1,o=0,a=t.length,u=a-1;o<a;u=o++){var f=t[o],c=f[0],s=f[1],l=t[u],h=l[0],d=l[1];if(ho(f,l,n))return 0;s>r!=d>r&&e<(h-c)*(r-s)/(d-s)+c&&(i=-i)}return i}function ho(t,n,e){var r,i,o,a;return function(t,n,e){return(n[0]-t[0])*(e[1]-t[1])==(e[0]-t[0])*(n[1]-t[1])}(t,n,e)&&(i=t[r=+(t[0]===n[0])],o=e[r],a=n[r],i<=o&&o<=a||a<=o&&o<=i)}function po(){}var vo=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function go(){var t=1,n=1,e=M,r=u;function i(t){var n=e(t);if(Array.isArray(n))n=n.slice().sort(fo);else{var r=s(t),i=r[0],a=r[1];n=w(i,a,n),n=g(Math.floor(i/n)*n,Math.floor(a/n)*n,n)}return n.map(function(n){return o(t,n)})}function o(e,i){var o=[],u=[];return function(e,r,i){var o,u,f,c,s,l,h=new Array,d=new Array;o=u=-1,c=e[0]>=r,vo[c<<1].forEach(p);for(;++o<t-1;)f=c,c=e[o+1]>=r,vo[f|c<<1].forEach(p);vo[c<<0].forEach(p);for(;++u<n-1;){for(o=-1,c=e[u*t+t]>=r,s=e[u*t]>=r,vo[c<<1|s<<2].forEach(p);++o<t-1;)f=c,c=e[u*t+t+o+1]>=r,l=s,s=e[u*t+o+1]>=r,vo[f|c<<1|s<<2|l<<3].forEach(p);vo[c|s<<3].forEach(p)}o=-1,s=e[u*t]>=r,vo[s<<2].forEach(p);for(;++o<t-1;)l=s,s=e[u*t+o+1]>=r,vo[s<<2|l<<3].forEach(p);function p(t){var n,e,r=[t[0][0]+o,t[0][1]+u],f=[t[1][0]+o,t[1][1]+u],c=a(r),s=a(f);(n=d[c])?(e=h[s])?(delete d[n.end],delete h[e.start],n===e?(n.ring.push(f),i(n.ring)):h[n.start]=d[e.end]={start:n.start,end:e.end,ring:n.ring.concat(e.ring)}):(delete d[n.end],n.ring.push(f),d[n.end=s]=n):(n=h[s])?(e=d[c])?(delete h[n.start],delete d[e.end],n===e?(n.ring.push(f),i(n.ring)):h[e.start]=d[n.end]={start:e.start,end:n.end,ring:e.ring.concat(n.ring)}):(delete h[n.start],n.ring.unshift(r),h[n.start=c]=n):h[c]=d[s]={start:c,end:s,ring:[r,f]}}vo[s<<3].forEach(p)}(e,i,function(t){r(t,e,i),function(t){for(var n=0,e=t.length,r=t[e-1][1]*t[0][0]-t[e-1][0]*t[0][1];++n<e;)r+=t[n-1][1]*t[n][0]-t[n-1][0]*t[n][1];return r}(t)>0?o.push([t]):u.push(t)}),u.forEach(function(t){for(var n,e=0,r=o.length;e<r;++e)if(-1!==so((n=o[e])[0],t))return void n.push(t)}),{type:"MultiPolygon",value:i,coordinates:o}}function a(n){return 2*n[0]+n[1]*(t+1)*4}function u(e,r,i){e.forEach(function(e){var o,a=e[0],u=e[1],f=0|a,c=0|u,s=r[c*t+f];a>0&&a<t&&f===a&&(o=r[c*t+f-1],e[0]=a+(i-o)/(s-o)-.5),u>0&&u<n&&c===u&&(o=r[(c-1)*t+f],e[1]=u+(i-o)/(s-o)-.5)})}return i.contour=o,i.size=function(e){if(!arguments.length)return[t,n];var r=Math.ceil(e[0]),o=Math.ceil(e[1]);if(!(r>0&&o>0))throw new Error("invalid size");return t=r,n=o,i},i.thresholds=function(t){return arguments.length?(e="function"==typeof t?t:Array.isArray(t)?co(uo.call(t)):co(t),i):e},i.smooth=function(t){return arguments.length?(r=t?u:po,i):r===u},i}function yo(t,n,e){for(var r=t.width,i=t.height,o=1+(e<<1),a=0;a<i;++a)for(var u=0,f=0;u<r+e;++u)u<r&&(f+=t.data[u+a*r]),u>=e&&(u>=o&&(f-=t.data[u-o+a*r]),n.data[u-e+a*r]=f/Math.min(u+1,r-1+o-u,o))}function _o(t,n,e){for(var r=t.width,i=t.height,o=1+(e<<1),a=0;a<r;++a)for(var u=0,f=0;u<i+e;++u)u<i&&(f+=t.data[a+u*r]),u>=e&&(u>=o&&(f-=t.data[a+(u-o)*r]),n.data[a+(u-e)*r]=f/Math.min(u+1,i-1+o-u,o))}function bo(t){return t[0]}function mo(t){return t[1]}function xo(){return 1}var wo={},Mo={},Ao=34,To=10,No=13;function So(t){return new Function("d","return {"+t.map(function(t,n){return JSON.stringify(t)+": d["+n+"]"}).join(",")+"}")}function Eo(t){var n=new RegExp('["'+t+"\n\r]"),e=t.charCodeAt(0);function r(t,n){var r,i=[],o=t.length,a=0,u=0,f=o<=0,c=!1;function s(){if(f)return Mo;if(c)return c=!1,wo;var n,r,i=a;if(t.charCodeAt(i)===Ao){for(;a++<o&&t.charCodeAt(a)!==Ao||t.charCodeAt(++a)===Ao;);return(n=a)>=o?f=!0:(r=t.charCodeAt(a++))===To?c=!0:r===No&&(c=!0,t.charCodeAt(a)===To&&++a),t.slice(i+1,n-1).replace(/""/g,'"')}for(;a<o;){if((r=t.charCodeAt(n=a++))===To)c=!0;else if(r===No)c=!0,t.charCodeAt(a)===To&&++a;else if(r!==e)continue;return t.slice(i,n)}return f=!0,t.slice(i,o)}for(t.charCodeAt(o-1)===To&&--o,t.charCodeAt(o-1)===No&&--o;(r=s())!==Mo;){for(var l=[];r!==wo&&r!==Mo;)l.push(r),r=s();n&&null==(l=n(l,u++))||i.push(l)}return i}function i(n){return n.map(o).join(t)}function o(t){return null==t?"":n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:function(t,n){var e,i,o=r(t,function(t,r){if(e)return e(t,r-1);i=t,e=n?function(t,n){var e=So(t);return function(r,i){return n(e(r),i,t)}}(t,n):So(t)});return o.columns=i||[],o},parseRows:r,format:function(n,e){return null==e&&(e=function(t){var n=Object.create(null),e=[];return t.forEach(function(t){for(var r in t)r in n||e.push(n[r]=r)}),e}(n)),[e.map(o).join(t)].concat(n.map(function(n){return e.map(function(t){return o(n[t])}).join(t)})).join("\n")},formatRows:function(t){return t.map(i).join("\n")}}}var ko=Eo(","),Co=ko.parse,Po=ko.parseRows,zo=ko.format,Ro=ko.formatRows,Lo=Eo("\t"),Do=Lo.parse,Uo=Lo.parseRows,qo=Lo.format,Oo=Lo.formatRows;function Yo(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.blob()}function Bo(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.arrayBuffer()}function Fo(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.text()}function Io(t,n){return fetch(t,n).then(Fo)}function Ho(t){return function(n,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=void 0),Io(n,e).then(function(n){return t(n,r)})}}var jo=Ho(Co),Xo=Ho(Do);function Go(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.json()}function Vo(t){return function(n,e){return Io(n,e).then(function(n){return(new DOMParser).parseFromString(n,t)})}}var $o=Vo("application/xml"),Wo=Vo("text/html"),Zo=Vo("image/svg+xml");function Qo(t){return function(){return t}}function Jo(){return 1e-6*(Math.random()-.5)}function Ko(t,n,e,r){if(isNaN(n)||isNaN(e))return t;var i,o,a,u,f,c,s,l,h,d=t._root,p={data:r},v=t._x0,g=t._y0,y=t._x1,_=t._y1;if(!d)return t._root=p,t;for(;d.length;)if((c=n>=(o=(v+y)/2))?v=o:y=o,(s=e>=(a=(g+_)/2))?g=a:_=a,i=d,!(d=d[l=s<<1|c]))return i[l]=p,t;if(u=+t._x.call(null,d.data),f=+t._y.call(null,d.data),n===u&&e===f)return p.next=d,i?i[l]=p:t._root=p,t;do{i=i?i[l]=new Array(4):t._root=new Array(4),(c=n>=(o=(v+y)/2))?v=o:y=o,(s=e>=(a=(g+_)/2))?g=a:_=a}while((l=s<<1|c)==(h=(f>=a)<<1|u>=o));return i[h]=d,i[l]=p,t}function ta(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i}function na(t){return t[0]}function ea(t){return t[1]}function ra(t,n,e){var r=new ia(null==n?na:n,null==e?ea:e,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function ia(t,n,e,r,i,o){this._x=t,this._y=n,this._x0=e,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function oa(t){for(var n={data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}var aa=ra.prototype=ia.prototype;function ua(t){return t.x+t.vx}function fa(t){return t.y+t.vy}function ca(t){return t.index}function sa(t,n){var e=t.get(n);if(!e)throw new Error("missing: "+n);return e}function la(t){return t.x}function ha(t){return t.y}aa.copy=function(){var t,n,e=new ia(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=oa(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,target:r.target[i]=new Array(4)}):r.target[i]=oa(n));return e},aa.add=function(t){var n=+this._x.call(null,t),e=+this._y.call(null,t);return Ko(this.cover(n,e),n,e,t)},aa.addAll=function(t){var n,e,r,i,o=t.length,a=new Array(o),u=new Array(o),f=1/0,c=1/0,s=-1/0,l=-1/0;for(e=0;e<o;++e)isNaN(r=+this._x.call(null,n=t[e]))||isNaN(i=+this._y.call(null,n))||(a[e]=r,u[e]=i,r<f&&(f=r),r>s&&(s=r),i<c&&(c=i),i>l&&(l=i));for(s<f&&(f=this._x0,s=this._x1),l<c&&(c=this._y0,l=this._y1),this.cover(f,c).cover(s,l),e=0;e<o;++e)Ko(this,a[e],u[e],t[e]);return this},aa.cover=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var e=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(e))i=(e=Math.floor(t))+1,o=(r=Math.floor(n))+1;else{if(!(e>t||t>i||r>n||n>o))return this;var a,u,f=i-e,c=this._root;switch(u=(n<(r+o)/2)<<1|t<(e+i)/2){case 0:do{(a=new Array(4))[u]=c,c=a}while(o=r+(f*=2),t>(i=e+f)||n>o);break;case 1:do{(a=new Array(4))[u]=c,c=a}while(o=r+(f*=2),(e=i-f)>t||n>o);break;case 2:do{(a=new Array(4))[u]=c,c=a}while(r=o-(f*=2),t>(i=e+f)||r>n);break;case 3:do{(a=new Array(4))[u]=c,c=a}while(r=o-(f*=2),(e=i-f)>t||r>n)}this._root&&this._root.length&&(this._root=c)}return this._x0=e,this._y0=r,this._x1=i,this._y1=o,this},aa.data=function(){var t=[];return this.visit(function(n){if(!n.length)do{t.push(n.data)}while(n=n.next)}),t},aa.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},aa.find=function(t,n,e){var r,i,o,a,u,f,c,s=this._x0,l=this._y0,h=this._x1,d=this._y1,p=[],v=this._root;for(v&&p.push(new ta(v,s,l,h,d)),null==e?e=1/0:(s=t-e,l=n-e,h=t+e,d=n+e,e*=e);f=p.pop();)if(!(!(v=f.node)||(i=f.x0)>h||(o=f.y0)>d||(a=f.x1)<s||(u=f.y1)<l))if(v.length){var g=(i+a)/2,y=(o+u)/2;p.push(new ta(v[3],g,y,a,u),new ta(v[2],i,y,g,u),new ta(v[1],g,o,a,y),new ta(v[0],i,o,g,y)),(c=(n>=y)<<1|t>=g)&&(f=p[p.length-1],p[p.length-1]=p[p.length-1-c],p[p.length-1-c]=f)}else{var _=t-+this._x.call(null,v.data),b=n-+this._y.call(null,v.data),m=_*_+b*b;if(m<e){var x=Math.sqrt(e=m);s=t-x,l=n-x,h=t+x,d=n+x,r=v.data}}return r},aa.remove=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(a=+this._y.call(null,t)))return this;var n,e,r,i,o,a,u,f,c,s,l,h,d=this._root,p=this._x0,v=this._y0,g=this._x1,y=this._y1;if(!d)return this;if(d.length)for(;;){if((c=o>=(u=(p+g)/2))?p=u:g=u,(s=a>=(f=(v+y)/2))?v=f:y=f,n=d,!(d=d[l=s<<1|c]))return this;if(!d.length)break;(n[l+1&3]||n[l+2&3]||n[l+3&3])&&(e=n,h=l)}for(;d.data!==t;)if(r=d,!(d=d.next))return this;return(i=d.next)&&delete d.next,r?(i?r.next=i:delete r.next,this):n?(i?n[l]=i:delete n[l],(d=n[0]||n[1]||n[2]||n[3])&&d===(n[3]||n[2]||n[1]||n[0])&&!d.length&&(e?e[h]=d:this._root=d),this):(this._root=i,this)},aa.removeAll=function(t){for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this},aa.root=function(){return this._root},aa.size=function(){var t=0;return this.visit(function(n){if(!n.length)do{++t}while(n=n.next)}),t},aa.visit=function(t){var n,e,r,i,o,a,u=[],f=this._root;for(f&&u.push(new ta(f,this._x0,this._y0,this._x1,this._y1));n=u.pop();)if(!t(f=n.node,r=n.x0,i=n.y0,o=n.x1,a=n.y1)&&f.length){var c=(r+o)/2,s=(i+a)/2;(e=f[3])&&u.push(new ta(e,c,s,o,a)),(e=f[2])&&u.push(new ta(e,r,s,c,a)),(e=f[1])&&u.push(new ta(e,c,i,o,s)),(e=f[0])&&u.push(new ta(e,r,i,c,s))}return this},aa.visitAfter=function(t){var n,e=[],r=[];for(this._root&&e.push(new ta(this._root,this._x0,this._y0,this._x1,this._y1));n=e.pop();){var i=n.node;if(i.length){var o,a=n.x0,u=n.y0,f=n.x1,c=n.y1,s=(a+f)/2,l=(u+c)/2;(o=i[0])&&e.push(new ta(o,a,u,s,l)),(o=i[1])&&e.push(new ta(o,s,u,f,l)),(o=i[2])&&e.push(new ta(o,a,l,s,c)),(o=i[3])&&e.push(new ta(o,s,l,f,c))}r.push(n)}for(;n=r.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this},aa.x=function(t){return arguments.length?(this._x=t,this):this._x},aa.y=function(t){return arguments.length?(this._y=t,this):this._y};var da=10,pa=Math.PI*(3-Math.sqrt(5));function va(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]}function ga(t){return(t=va(Math.abs(t)))?t[1]:NaN}var ya,_a=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function ba(t){return new ma(t)}function ma(t){if(!(n=_a.exec(t)))throw new Error("invalid format: "+t);var n;this.fill=n[1]||" ",this.align=n[2]||">",this.sign=n[3]||"-",this.symbol=n[4]||"",this.zero=!!n[5],this.width=n[6]&&+n[6],this.comma=!!n[7],this.precision=n[8]&&+n[8].slice(1),this.trim=!!n[9],this.type=n[10]||""}function xa(t,n){var e=va(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}ba.prototype=ma.prototype,ma.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var wa={"%":function(t,n){return(100*t).toFixed(n)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,n){return t.toExponential(n)},f:function(t,n){return t.toFixed(n)},g:function(t,n){return t.toPrecision(n)},o:function(t){return Math.round(t).toString(8)},p:function(t,n){return xa(100*t,n)},r:xa,s:function(t,n){var e=va(t,n);if(!e)return t+"";var r=e[0],i=e[1],o=i-(ya=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,a=r.length;return o===a?r:o>a?r+new Array(o-a+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+va(t,Math.max(0,n+o-1))[0]},X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}};function Ma(t){return t}var Aa,Ta=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Na(t){var n,e,r=t.grouping&&t.thousands?(n=t.grouping,e=t.thousands,function(t,r){for(var i=t.length,o=[],a=0,u=n[0],f=0;i>0&&u>0&&(f+u+1>r&&(u=Math.max(1,r-f)),o.push(t.substring(i-=u,i+u)),!((f+=u+1)>r));)u=n[a=(a+1)%n.length];return o.reverse().join(e)}):Ma,i=t.currency,o=t.decimal,a=t.numerals?function(t){return function(n){return n.replace(/[0-9]/g,function(n){return t[+n]})}}(t.numerals):Ma,u=t.percent||"%";function f(t){var n=(t=ba(t)).fill,e=t.align,f=t.sign,c=t.symbol,s=t.zero,l=t.width,h=t.comma,d=t.precision,p=t.trim,v=t.type;"n"===v?(h=!0,v="g"):wa[v]||(null==d&&(d=12),p=!0,v="g"),(s||"0"===n&&"="===e)&&(s=!0,n="0",e="=");var g="$"===c?i[0]:"#"===c&&/[boxX]/.test(v)?"0"+v.toLowerCase():"",y="$"===c?i[1]:/[%p]/.test(v)?u:"",_=wa[v],b=/[defgprs%]/.test(v);function m(t){var i,u,c,m=g,x=y;if("c"===v)x=_(t)+x,t="";else{var w=(t=+t)<0;if(t=_(Math.abs(t),d),p&&(t=function(t){t:for(var n,e=t.length,r=1,i=-1;r<e;++r)switch(t[r]){case".":i=n=r;break;case"0":0===i&&(i=r),n=r;break;default:if(i>0){if(!+t[r])break t;i=0}}return i>0?t.slice(0,i)+t.slice(n+1):t}(t)),w&&0==+t&&(w=!1),m=(w?"("===f?f:"-":"-"===f||"("===f?"":f)+m,x=("s"===v?Ta[8+ya/3]:"")+x+(w&&"("===f?")":""),b)for(i=-1,u=t.length;++i<u;)if(48>(c=t.charCodeAt(i))||c>57){x=(46===c?o+t.slice(i+1):t.slice(i))+x,t=t.slice(0,i);break}}h&&!s&&(t=r(t,1/0));var M=m.length+t.length+x.length,A=M<l?new Array(l-M+1).join(n):"";switch(h&&s&&(t=r(A+t,A.length?l-x.length:1/0),A=""),e){case"<":t=m+t+x+A;break;case"=":t=m+A+t+x;break;case"^":t=A.slice(0,M=A.length>>1)+m+t+x+A.slice(M);break;default:t=A+m+t+x}return a(t)}return d=null==d?6:/[gprs]/.test(v)?Math.max(1,Math.min(21,d)):Math.max(0,Math.min(20,d)),m.toString=function(){return t+""},m}return{format:f,formatPrefix:function(t,n){var e=f(((t=ba(t)).type="f",t)),r=3*Math.max(-8,Math.min(8,Math.floor(ga(n)/3))),i=Math.pow(10,-r),o=Ta[8+r/3];return function(t){return e(i*t)+o}}}}function Sa(n){return Aa=Na(n),t.format=Aa.format,t.formatPrefix=Aa.formatPrefix,Aa}function Ea(t){return Math.max(0,-ga(Math.abs(t)))}function ka(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(ga(n)/3)))-ga(Math.abs(t)))}function Ca(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,ga(n)-ga(t))+1}function Pa(){return new za}function za(){this.reset()}Sa({decimal:".",thousands:",",grouping:[3],currency:["$",""]}),za.prototype={constructor:za,reset:function(){this.s=this.t=0},add:function(t){La(Ra,t,this.t),La(this,Ra.s,this.s),this.s?this.t+=Ra.t:this.s=Ra.t},valueOf:function(){return this.s}};var Ra=new za;function La(t,n,e){var r=t.s=n+e,i=r-n,o=r-i;t.t=n-o+(e-i)}var Da=1e-6,Ua=1e-12,qa=Math.PI,Oa=qa/2,Ya=qa/4,Ba=2*qa,Fa=180/qa,Ia=qa/180,Ha=Math.abs,ja=Math.atan,Xa=Math.atan2,Ga=Math.cos,Va=Math.ceil,$a=Math.exp,Wa=Math.log,Za=Math.pow,Qa=Math.sin,Ja=Math.sign||function(t){return t>0?1:t<0?-1:0},Ka=Math.sqrt,tu=Math.tan;function nu(t){return t>1?0:t<-1?qa:Math.acos(t)}function eu(t){return t>1?Oa:t<-1?-Oa:Math.asin(t)}function ru(t){return(t=Qa(t/2))*t}function iu(){}function ou(t,n){t&&uu.hasOwnProperty(t.type)&&uu[t.type](t,n)}var au={Feature:function(t,n){ou(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)ou(e[r].geometry,n)}},uu={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)t=e[r],n.point(t[0],t[1],t[2])},LineString:function(t,n){fu(t.coordinates,n,0)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)fu(e[r],n,0)},Polygon:function(t,n){cu(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)cu(e[r],n)},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)ou(e[r],n)}};function fu(t,n,e){var r,i=-1,o=t.length-e;for(n.lineStart();++i<o;)r=t[i],n.point(r[0],r[1],r[2]);n.lineEnd()}function cu(t,n){var e=-1,r=t.length;for(n.polygonStart();++e<r;)fu(t[e],n,1);n.polygonEnd()}function su(t,n){t&&au.hasOwnProperty(t.type)?au[t.type](t,n):ou(t,n)}var lu,hu,du,pu,vu,gu=Pa(),yu=Pa(),_u={point:iu,lineStart:iu,lineEnd:iu,polygonStart:function(){gu.reset(),_u.lineStart=bu,_u.lineEnd=mu},polygonEnd:function(){var t=+gu;yu.add(t<0?Ba+t:t),this.lineStart=this.lineEnd=this.point=iu},sphere:function(){yu.add(Ba)}};function bu(){_u.point=xu}function mu(){wu(lu,hu)}function xu(t,n){_u.point=wu,lu=t,hu=n,du=t*=Ia,pu=Ga(n=(n*=Ia)/2+Ya),vu=Qa(n)}function wu(t,n){var e=(t*=Ia)-du,r=e>=0?1:-1,i=r*e,o=Ga(n=(n*=Ia)/2+Ya),a=Qa(n),u=vu*a,f=pu*o+u*Ga(i),c=u*r*Qa(i);gu.add(Xa(c,f)),du=t,pu=o,vu=a}function Mu(t){return[Xa(t[1],t[0]),eu(t[2])]}function Au(t){var n=t[0],e=t[1],r=Ga(e);return[r*Ga(n),r*Qa(n),Qa(e)]}function Tu(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function Nu(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function Su(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function Eu(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function ku(t){var n=Ka(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}var Cu,Pu,zu,Ru,Lu,Du,Uu,qu,Ou,Yu,Bu,Fu,Iu,Hu,ju,Xu,Gu,Vu,$u,Wu,Zu,Qu,Ju,Ku,tf,nf,ef=Pa(),rf={point:of,lineStart:uf,lineEnd:ff,polygonStart:function(){rf.point=cf,rf.lineStart=sf,rf.lineEnd=lf,ef.reset(),_u.polygonStart()},polygonEnd:function(){_u.polygonEnd(),rf.point=of,rf.lineStart=uf,rf.lineEnd=ff,gu<0?(Cu=-(zu=180),Pu=-(Ru=90)):ef>Da?Ru=90:ef<-Da&&(Pu=-90),Yu[0]=Cu,Yu[1]=zu}};function of(t,n){Ou.push(Yu=[Cu=t,zu=t]),n<Pu&&(Pu=n),n>Ru&&(Ru=n)}function af(t,n){var e=Au([t*Ia,n*Ia]);if(qu){var r=Nu(qu,e),i=Nu([r[1],-r[0],0],r);ku(i),i=Mu(i);var o,a=t-Lu,u=a>0?1:-1,f=i[0]*Fa*u,c=Ha(a)>180;c^(u*Lu<f&&f<u*t)?(o=i[1]*Fa)>Ru&&(Ru=o):c^(u*Lu<(f=(f+360)%360-180)&&f<u*t)?(o=-i[1]*Fa)<Pu&&(Pu=o):(n<Pu&&(Pu=n),n>Ru&&(Ru=n)),c?t<Lu?hf(Cu,t)>hf(Cu,zu)&&(zu=t):hf(t,zu)>hf(Cu,zu)&&(Cu=t):zu>=Cu?(t<Cu&&(Cu=t),t>zu&&(zu=t)):t>Lu?hf(Cu,t)>hf(Cu,zu)&&(zu=t):hf(t,zu)>hf(Cu,zu)&&(Cu=t)}else Ou.push(Yu=[Cu=t,zu=t]);n<Pu&&(Pu=n),n>Ru&&(Ru=n),qu=e,Lu=t}function uf(){rf.point=af}function ff(){Yu[0]=Cu,Yu[1]=zu,rf.point=of,qu=null}function cf(t,n){if(qu){var e=t-Lu;ef.add(Ha(e)>180?e+(e>0?360:-360):e)}else Du=t,Uu=n;_u.point(t,n),af(t,n)}function sf(){_u.lineStart()}function lf(){cf(Du,Uu),_u.lineEnd(),Ha(ef)>Da&&(Cu=-(zu=180)),Yu[0]=Cu,Yu[1]=zu,qu=null}function hf(t,n){return(n-=t)<0?n+360:n}function df(t,n){return t[0]-n[0]}function pf(t,n){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var vf={sphere:iu,point:gf,lineStart:_f,lineEnd:xf,polygonStart:function(){vf.lineStart=wf,vf.lineEnd=Mf},polygonEnd:function(){vf.lineStart=_f,vf.lineEnd=xf}};function gf(t,n){t*=Ia;var e=Ga(n*=Ia);yf(e*Ga(t),e*Qa(t),Qa(n))}function yf(t,n,e){Iu+=(t-Iu)/++Bu,Hu+=(n-Hu)/Bu,ju+=(e-ju)/Bu}function _f(){vf.point=bf}function bf(t,n){t*=Ia;var e=Ga(n*=Ia);Ku=e*Ga(t),tf=e*Qa(t),nf=Qa(n),vf.point=mf,yf(Ku,tf,nf)}function mf(t,n){t*=Ia;var e=Ga(n*=Ia),r=e*Ga(t),i=e*Qa(t),o=Qa(n),a=Xa(Ka((a=tf*o-nf*i)*a+(a=nf*r-Ku*o)*a+(a=Ku*i-tf*r)*a),Ku*r+tf*i+nf*o);Fu+=a,Xu+=a*(Ku+(Ku=r)),Gu+=a*(tf+(tf=i)),Vu+=a*(nf+(nf=o)),yf(Ku,tf,nf)}function xf(){vf.point=gf}function wf(){vf.point=Af}function Mf(){Tf(Qu,Ju),vf.point=gf}function Af(t,n){Qu=t,Ju=n,t*=Ia,n*=Ia,vf.point=Tf;var e=Ga(n);Ku=e*Ga(t),tf=e*Qa(t),nf=Qa(n),yf(Ku,tf,nf)}function Tf(t,n){t*=Ia;var e=Ga(n*=Ia),r=e*Ga(t),i=e*Qa(t),o=Qa(n),a=tf*o-nf*i,u=nf*r-Ku*o,f=Ku*i-tf*r,c=Ka(a*a+u*u+f*f),s=eu(c),l=c&&-s/c;$u+=l*a,Wu+=l*u,Zu+=l*f,Fu+=s,Xu+=s*(Ku+(Ku=r)),Gu+=s*(tf+(tf=i)),Vu+=s*(nf+(nf=o)),yf(Ku,tf,nf)}function Nf(t){return function(){return t}}function Sf(t,n){function e(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(e.invert=function(e,r){return(e=n.invert(e,r))&&t.invert(e[0],e[1])}),e}function Ef(t,n){return[t>qa?t-Ba:t<-qa?t+Ba:t,n]}function kf(t,n,e){return(t%=Ba)?n||e?Sf(Pf(t),zf(n,e)):Pf(t):n||e?zf(n,e):Ef}function Cf(t){return function(n,e){return[(n+=t)>qa?n-Ba:n<-qa?n+Ba:n,e]}}function Pf(t){var n=Cf(t);return n.invert=Cf(-t),n}function zf(t,n){var e=Ga(t),r=Qa(t),i=Ga(n),o=Qa(n);function a(t,n){var a=Ga(n),u=Ga(t)*a,f=Qa(t)*a,c=Qa(n),s=c*e+u*r;return[Xa(f*i-s*o,u*e-c*r),eu(s*i+f*o)]}return a.invert=function(t,n){var a=Ga(n),u=Ga(t)*a,f=Qa(t)*a,c=Qa(n),s=c*i-f*o;return[Xa(f*i+c*o,u*e+s*r),eu(s*e-u*r)]},a}function Rf(t){function n(n){return(n=t(n[0]*Ia,n[1]*Ia))[0]*=Fa,n[1]*=Fa,n}return t=kf(t[0]*Ia,t[1]*Ia,t.length>2?t[2]*Ia:0),n.invert=function(n){return(n=t.invert(n[0]*Ia,n[1]*Ia))[0]*=Fa,n[1]*=Fa,n},n}function Lf(t,n,e,r,i,o){if(e){var a=Ga(n),u=Qa(n),f=r*e;null==i?(i=n+r*Ba,o=n-f/2):(i=Df(a,i),o=Df(a,o),(r>0?i<o:i>o)&&(i+=r*Ba));for(var c,s=i;r>0?s>o:s<o;s-=f)c=Mu([a,-u*Ga(s),-u*Qa(s)]),t.point(c[0],c[1])}}function Df(t,n){(n=Au(n))[0]-=t,ku(n);var e=nu(-n[1]);return((-n[2]<0?-e:e)+Ba-Da)%Ba}function Uf(){var t,n=[];return{point:function(n,e){t.push([n,e])},lineStart:function(){n.push(t=[])},lineEnd:iu,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function qf(t,n){return Ha(t[0]-n[0])<Da&&Ha(t[1]-n[1])<Da}function Of(t,n,e,r){this.x=t,this.z=n,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Yf(t,n,e,r,i){var o,a,u=[],f=[];if(t.forEach(function(t){if(!((n=t.length-1)<=0)){var n,e,r=t[0],a=t[n];if(qf(r,a)){for(i.lineStart(),o=0;o<n;++o)i.point((r=t[o])[0],r[1]);i.lineEnd()}else u.push(e=new Of(r,t,null,!0)),f.push(e.o=new Of(r,null,e,!1)),u.push(e=new Of(a,t,null,!1)),f.push(e.o=new Of(a,null,e,!0))}}),u.length){for(f.sort(n),Bf(u),Bf(f),o=0,a=f.length;o<a;++o)f[o].e=e=!e;for(var c,s,l=u[0];;){for(var h=l,d=!0;h.v;)if((h=h.n)===l)return;c=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){if(d)for(o=0,a=c.length;o<a;++o)i.point((s=c[o])[0],s[1]);else r(h.x,h.n.x,1,i);h=h.n}else{if(d)for(c=h.p.z,o=c.length-1;o>=0;--o)i.point((s=c[o])[0],s[1]);else r(h.x,h.p.x,-1,i);h=h.p}c=(h=h.o).z,d=!d}while(!h.v);i.lineEnd()}}}function Bf(t){if(n=t.length){for(var n,e,r=0,i=t[0];++r<n;)i.n=e=t[r],e.p=i,i=e;i.n=e=t[0],e.p=i}}Ef.invert=Ef;var Ff=Pa();function If(t,n){var e=n[0],r=n[1],i=Qa(r),o=[Qa(e),-Ga(e),0],a=0,u=0;Ff.reset(),1===i?r=Oa+Da:-1===i&&(r=-Oa-Da);for(var f=0,c=t.length;f<c;++f)if(l=(s=t[f]).length)for(var s,l,h=s[l-1],d=h[0],p=h[1]/2+Ya,v=Qa(p),g=Ga(p),y=0;y<l;++y,d=b,v=x,g=w,h=_){var _=s[y],b=_[0],m=_[1]/2+Ya,x=Qa(m),w=Ga(m),M=b-d,A=M>=0?1:-1,T=A*M,N=T>qa,S=v*x;if(Ff.add(Xa(S*A*Qa(T),g*w+S*Ga(T))),a+=N?M+A*Ba:M,N^d>=e^b>=e){var E=Nu(Au(h),Au(_));ku(E);var k=Nu(o,E);ku(k);var C=(N^M>=0?-1:1)*eu(k[2]);(r>C||r===C&&(E[0]||E[1]))&&(u+=N^M>=0?1:-1)}}return(a<-Da||a<Da&&Ff<-Da)^1&u}function Hf(t,n,e,r){return function(i){var o,a,u,f=n(i),c=Uf(),s=n(c),l=!1,h={point:d,lineStart:v,lineEnd:g,polygonStart:function(){h.point=y,h.lineStart=_,h.lineEnd=b,a=[],o=[]},polygonEnd:function(){h.point=d,h.lineStart=v,h.lineEnd=g,a=N(a);var t=If(o,r);a.length?(l||(i.polygonStart(),l=!0),Yf(a,Xf,t,e,i)):t&&(l||(i.polygonStart(),l=!0),i.lineStart(),e(null,null,1,i),i.lineEnd()),l&&(i.polygonEnd(),l=!1),a=o=null},sphere:function(){i.polygonStart(),i.lineStart(),e(null,null,1,i),i.lineEnd(),i.polygonEnd()}};function d(n,e){t(n,e)&&i.point(n,e)}function p(t,n){f.point(t,n)}function v(){h.point=p,f.lineStart()}function g(){h.point=d,f.lineEnd()}function y(t,n){u.push([t,n]),s.point(t,n)}function _(){s.lineStart(),u=[]}function b(){y(u[0][0],u[0][1]),s.lineEnd();var t,n,e,r,f=s.clean(),h=c.result(),d=h.length;if(u.pop(),o.push(u),u=null,d)if(1&f){if((n=(e=h[0]).length-1)>0){for(l||(i.polygonStart(),l=!0),i.lineStart(),t=0;t<n;++t)i.point((r=e[t])[0],r[1]);i.lineEnd()}}else d>1&&2&f&&h.push(h.pop().concat(h.shift())),a.push(h.filter(jf))}return h}}function jf(t){return t.length>1}function Xf(t,n){return((t=t.x)[0]<0?t[1]-Oa-Da:Oa-t[1])-((n=n.x)[0]<0?n[1]-Oa-Da:Oa-n[1])}var Gf=Hf(function(){return!0},function(t){var n,e=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),n=1},point:function(o,a){var u=o>0?qa:-qa,f=Ha(o-e);Ha(f-qa)<Da?(t.point(e,r=(r+a)/2>0?Oa:-Oa),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),t.point(o,r),n=0):i!==u&&f>=qa&&(Ha(e-i)<Da&&(e-=i*Da),Ha(o-u)<Da&&(o-=u*Da),r=function(t,n,e,r){var i,o,a=Qa(t-e);return Ha(a)>Da?ja((Qa(n)*(o=Ga(r))*Qa(e)-Qa(r)*(i=Ga(n))*Qa(t))/(i*o*a)):(n+r)/2}(e,r,o,a),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),n=0),t.point(e=o,r=a),i=u},lineEnd:function(){t.lineEnd(),e=r=NaN},clean:function(){return 2-n}}},function(t,n,e,r){var i;if(null==t)i=e*Oa,r.point(-qa,i),r.point(0,i),r.point(qa,i),r.point(qa,0),r.point(qa,-i),r.point(0,-i),r.point(-qa,-i),r.point(-qa,0),r.point(-qa,i);else if(Ha(t[0]-n[0])>Da){var o=t[0]<n[0]?qa:-qa;i=e*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(n[0],n[1])},[-qa,-Oa]);function Vf(t){var n=Ga(t),e=6*Ia,r=n>0,i=Ha(n)>Da;function o(t,e){return Ga(t)*Ga(e)>n}function a(t,e,r){var i=[1,0,0],o=Nu(Au(t),Au(e)),a=Tu(o,o),u=o[0],f=a-u*u;if(!f)return!r&&t;var c=n*a/f,s=-n*u/f,l=Nu(i,o),h=Eu(i,c);Su(h,Eu(o,s));var d=l,p=Tu(h,d),v=Tu(d,d),g=p*p-v*(Tu(h,h)-1);if(!(g<0)){var y=Ka(g),_=Eu(d,(-p-y)/v);if(Su(_,h),_=Mu(_),!r)return _;var b,m=t[0],x=e[0],w=t[1],M=e[1];x<m&&(b=m,m=x,x=b);var A=x-m,T=Ha(A-qa)<Da;if(!T&&M<w&&(b=w,w=M,M=b),T||A<Da?T?w+M>0^_[1]<(Ha(_[0]-m)<Da?w:M):w<=_[1]&&_[1]<=M:A>qa^(m<=_[0]&&_[0]<=x)){var N=Eu(d,(-p+y)/v);return Su(N,h),[_,Mu(N)]}}}function u(n,e){var i=r?t:qa-t,o=0;return n<-i?o|=1:n>i&&(o|=2),e<-i?o|=4:e>i&&(o|=8),o}return Hf(o,function(t){var n,e,f,c,s;return{lineStart:function(){c=f=!1,s=1},point:function(l,h){var d,p=[l,h],v=o(l,h),g=r?v?0:u(l,h):v?u(l+(l<0?qa:-qa),h):0;if(!n&&(c=f=v)&&t.lineStart(),v!==f&&(!(d=a(n,p))||qf(n,d)||qf(p,d))&&(p[0]+=Da,p[1]+=Da,v=o(p[0],p[1])),v!==f)s=0,v?(t.lineStart(),d=a(p,n),t.point(d[0],d[1])):(d=a(n,p),t.point(d[0],d[1]),t.lineEnd()),n=d;else if(i&&n&&r^v){var y;g&e||!(y=a(p,n,!0))||(s=0,r?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),t.lineEnd()):(t.point(y[1][0],y[1][1]),t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1])))}!v||n&&qf(n,p)||t.point(p[0],p[1]),n=p,f=v,e=g},lineEnd:function(){f&&t.lineEnd(),n=null},clean:function(){return s|(c&&f)<<1}}},function(n,r,i,o){Lf(o,t,e,i,n,r)},r?[0,-t]:[-qa,t-qa])}var $f=1e9,Wf=-$f;function Zf(t,n,e,r){function i(i,o){return t<=i&&i<=e&&n<=o&&o<=r}function o(i,o,u,c){var s=0,l=0;if(null==i||(s=a(i,u))!==(l=a(o,u))||f(i,o)<0^u>0)do{c.point(0===s||3===s?t:e,s>1?r:n)}while((s=(s+u+4)%4)!==l);else c.point(o[0],o[1])}function a(r,i){return Ha(r[0]-t)<Da?i>0?0:3:Ha(r[0]-e)<Da?i>0?2:1:Ha(r[1]-n)<Da?i>0?1:0:i>0?3:2}function u(t,n){return f(t.x,n.x)}function f(t,n){var e=a(t,1),r=a(n,1);return e!==r?e-r:0===e?n[1]-t[1]:1===e?t[0]-n[0]:2===e?t[1]-n[1]:n[0]-t[0]}return function(a){var f,c,s,l,h,d,p,v,g,y,_,b=a,m=Uf(),x={point:w,lineStart:function(){x.point=M,c&&c.push(s=[]);y=!0,g=!1,p=v=NaN},lineEnd:function(){f&&(M(l,h),d&&g&&m.rejoin(),f.push(m.result()));x.point=w,g&&b.lineEnd()},polygonStart:function(){b=m,f=[],c=[],_=!0},polygonEnd:function(){var n=function(){for(var n=0,e=0,i=c.length;e<i;++e)for(var o,a,u=c[e],f=1,s=u.length,l=u[0],h=l[0],d=l[1];f<s;++f)o=h,a=d,l=u[f],h=l[0],d=l[1],a<=r?d>r&&(h-o)*(r-a)>(d-a)*(t-o)&&++n:d<=r&&(h-o)*(r-a)<(d-a)*(t-o)&&--n;return n}(),e=_&&n,i=(f=N(f)).length;(e||i)&&(a.polygonStart(),e&&(a.lineStart(),o(null,null,1,a),a.lineEnd()),i&&Yf(f,u,n,o,a),a.polygonEnd());b=a,f=c=s=null}};function w(t,n){i(t,n)&&b.point(t,n)}function M(o,a){var u=i(o,a);if(c&&s.push([o,a]),y)l=o,h=a,d=u,y=!1,u&&(b.lineStart(),b.point(o,a));else if(u&&g)b.point(o,a);else{var f=[p=Math.max(Wf,Math.min($f,p)),v=Math.max(Wf,Math.min($f,v))],m=[o=Math.max(Wf,Math.min($f,o)),a=Math.max(Wf,Math.min($f,a))];!function(t,n,e,r,i,o){var a,u=t[0],f=t[1],c=0,s=1,l=n[0]-u,h=n[1]-f;if(a=e-u,l||!(a>0)){if(a/=l,l<0){if(a<c)return;a<s&&(s=a)}else if(l>0){if(a>s)return;a>c&&(c=a)}if(a=i-u,l||!(a<0)){if(a/=l,l<0){if(a>s)return;a>c&&(c=a)}else if(l>0){if(a<c)return;a<s&&(s=a)}if(a=r-f,h||!(a>0)){if(a/=h,h<0){if(a<c)return;a<s&&(s=a)}else if(h>0){if(a>s)return;a>c&&(c=a)}if(a=o-f,h||!(a<0)){if(a/=h,h<0){if(a>s)return;a>c&&(c=a)}else if(h>0){if(a<c)return;a<s&&(s=a)}return c>0&&(t[0]=u+c*l,t[1]=f+c*h),s<1&&(n[0]=u+s*l,n[1]=f+s*h),!0}}}}}(f,m,t,n,e,r)?u&&(b.lineStart(),b.point(o,a),_=!1):(g||(b.lineStart(),b.point(f[0],f[1])),b.point(m[0],m[1]),u||b.lineEnd(),_=!1)}p=o,v=a,g=u}return x}}var Qf,Jf,Kf,tc=Pa(),nc={sphere:iu,point:iu,lineStart:function(){nc.point=rc,nc.lineEnd=ec},lineEnd:iu,polygonStart:iu,polygonEnd:iu};function ec(){nc.point=nc.lineEnd=iu}function rc(t,n){Qf=t*=Ia,Jf=Qa(n*=Ia),Kf=Ga(n),nc.point=ic}function ic(t,n){t*=Ia;var e=Qa(n*=Ia),r=Ga(n),i=Ha(t-Qf),o=Ga(i),a=r*Qa(i),u=Kf*e-Jf*r*o,f=Jf*e+Kf*r*o;tc.add(Xa(Ka(a*a+u*u),f)),Qf=t,Jf=e,Kf=r}function oc(t){return tc.reset(),su(t,nc),+tc}var ac=[null,null],uc={type:"LineString",coordinates:ac};function fc(t,n){return ac[0]=t,ac[1]=n,oc(uc)}var cc={Feature:function(t,n){return lc(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)if(lc(e[r].geometry,n))return!0;return!1}},sc={Sphere:function(){return!0},Point:function(t,n){return hc(t.coordinates,n)},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(hc(e[r],n))return!0;return!1},LineString:function(t,n){return dc(t.coordinates,n)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(dc(e[r],n))return!0;return!1},Polygon:function(t,n){return pc(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(pc(e[r],n))return!0;return!1},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)if(lc(e[r],n))return!0;return!1}};function lc(t,n){return!(!t||!sc.hasOwnProperty(t.type))&&sc[t.type](t,n)}function hc(t,n){return 0===fc(t,n)}function dc(t,n){var e=fc(t[0],t[1]);return fc(t[0],n)+fc(n,t[1])<=e+Da}function pc(t,n){return!!If(t.map(vc),gc(n))}function vc(t){return(t=t.map(gc)).pop(),t}function gc(t){return[t[0]*Ia,t[1]*Ia]}function yc(t,n,e){var r=g(t,n-Da,e).concat(n);return function(t){return r.map(function(n){return[t,n]})}}function _c(t,n,e){var r=g(t,n-Da,e).concat(n);return function(t){return r.map(function(n){return[n,t]})}}function bc(){var t,n,e,r,i,o,a,u,f,c,s,l,h=10,d=h,p=90,v=360,y=2.5;function _(){return{type:"MultiLineString",coordinates:b()}}function b(){return g(Va(r/p)*p,e,p).map(s).concat(g(Va(u/v)*v,a,v).map(l)).concat(g(Va(n/h)*h,t,h).filter(function(t){return Ha(t%p)>Da}).map(f)).concat(g(Va(o/d)*d,i,d).filter(function(t){return Ha(t%v)>Da}).map(c))}return _.lines=function(){return b().map(function(t){return{type:"LineString",coordinates:t}})},_.outline=function(){return{type:"Polygon",coordinates:[s(r).concat(l(a).slice(1),s(e).reverse().slice(1),l(u).reverse().slice(1))]}},_.extent=function(t){return arguments.length?_.extentMajor(t).extentMinor(t):_.extentMinor()},_.extentMajor=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],u=+t[0][1],a=+t[1][1],r>e&&(t=r,r=e,e=t),u>a&&(t=u,u=a,a=t),_.precision(y)):[[r,u],[e,a]]},_.extentMinor=function(e){return arguments.length?(n=+e[0][0],t=+e[1][0],o=+e[0][1],i=+e[1][1],n>t&&(e=n,n=t,t=e),o>i&&(e=o,o=i,i=e),_.precision(y)):[[n,o],[t,i]]},_.step=function(t){return arguments.length?_.stepMajor(t).stepMinor(t):_.stepMinor()},_.stepMajor=function(t){return arguments.length?(p=+t[0],v=+t[1],_):[p,v]},_.stepMinor=function(t){return arguments.length?(h=+t[0],d=+t[1],_):[h,d]},_.precision=function(h){return arguments.length?(y=+h,f=yc(o,i,90),c=_c(n,t,y),s=yc(u,a,90),l=_c(r,e,y),_):y},_.extentMajor([[-180,-90+Da],[180,90-Da]]).extentMinor([[-180,-80-Da],[180,80+Da]])}function mc(t){return t}var xc,wc,Mc,Ac,Tc=Pa(),Nc=Pa(),Sc={point:iu,lineStart:iu,lineEnd:iu,polygonStart:function(){Sc.lineStart=Ec,Sc.lineEnd=Pc},polygonEnd:function(){Sc.lineStart=Sc.lineEnd=Sc.point=iu,Tc.add(Ha(Nc)),Nc.reset()},result:function(){var t=Tc/2;return Tc.reset(),t}};function Ec(){Sc.point=kc}function kc(t,n){Sc.point=Cc,xc=Mc=t,wc=Ac=n}function Cc(t,n){Nc.add(Ac*t-Mc*n),Mc=t,Ac=n}function Pc(){Cc(xc,wc)}var zc=1/0,Rc=zc,Lc=-zc,Dc=Lc,Uc={point:function(t,n){t<zc&&(zc=t);t>Lc&&(Lc=t);n<Rc&&(Rc=n);n>Dc&&(Dc=n)},lineStart:iu,lineEnd:iu,polygonStart:iu,polygonEnd:iu,result:function(){var t=[[zc,Rc],[Lc,Dc]];return Lc=Dc=-(Rc=zc=1/0),t}};var qc,Oc,Yc,Bc,Fc=0,Ic=0,Hc=0,jc=0,Xc=0,Gc=0,Vc=0,$c=0,Wc=0,Zc={point:Qc,lineStart:Jc,lineEnd:ns,polygonStart:function(){Zc.lineStart=es,Zc.lineEnd=rs},polygonEnd:function(){Zc.point=Qc,Zc.lineStart=Jc,Zc.lineEnd=ns},result:function(){var t=Wc?[Vc/Wc,$c/Wc]:Gc?[jc/Gc,Xc/Gc]:Hc?[Fc/Hc,Ic/Hc]:[NaN,NaN];return Fc=Ic=Hc=jc=Xc=Gc=Vc=$c=Wc=0,t}};function Qc(t,n){Fc+=t,Ic+=n,++Hc}function Jc(){Zc.point=Kc}function Kc(t,n){Zc.point=ts,Qc(Yc=t,Bc=n)}function ts(t,n){var e=t-Yc,r=n-Bc,i=Ka(e*e+r*r);jc+=i*(Yc+t)/2,Xc+=i*(Bc+n)/2,Gc+=i,Qc(Yc=t,Bc=n)}function ns(){Zc.point=Qc}function es(){Zc.point=is}function rs(){os(qc,Oc)}function is(t,n){Zc.point=os,Qc(qc=Yc=t,Oc=Bc=n)}function os(t,n){var e=t-Yc,r=n-Bc,i=Ka(e*e+r*r);jc+=i*(Yc+t)/2,Xc+=i*(Bc+n)/2,Gc+=i,Vc+=(i=Bc*t-Yc*n)*(Yc+t),$c+=i*(Bc+n),Wc+=3*i,Qc(Yc=t,Bc=n)}function as(t){this._context=t}as.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._context.moveTo(t,n),this._point=1;break;case 1:this._context.lineTo(t,n);break;default:this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,Ba)}},result:iu};var us,fs,cs,ss,ls,hs=Pa(),ds={point:iu,lineStart:function(){ds.point=ps},lineEnd:function(){us&&vs(fs,cs),ds.point=iu},polygonStart:function(){us=!0},polygonEnd:function(){us=null},result:function(){var t=+hs;return hs.reset(),t}};function ps(t,n){ds.point=vs,fs=ss=t,cs=ls=n}function vs(t,n){ss-=t,ls-=n,hs.add(Ka(ss*ss+ls*ls)),ss=t,ls=n}function gs(){this._string=[]}function ys(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function _s(t){return function(n){var e=new bs;for(var r in t)e[r]=t[r];return e.stream=n,e}}function bs(){}function ms(t,n,e){var r=t.clipExtent&&t.clipExtent();return t.scale(150).translate([0,0]),null!=r&&t.clipExtent(null),su(e,t.stream(Uc)),n(Uc.result()),null!=r&&t.clipExtent(r),t}function xs(t,n,e){return ms(t,function(e){var r=n[1][0]-n[0][0],i=n[1][1]-n[0][1],o=Math.min(r/(e[1][0]-e[0][0]),i/(e[1][1]-e[0][1])),a=+n[0][0]+(r-o*(e[1][0]+e[0][0]))/2,u=+n[0][1]+(i-o*(e[1][1]+e[0][1]))/2;t.scale(150*o).translate([a,u])},e)}function ws(t,n,e){return xs(t,[[0,0],n],e)}function Ms(t,n,e){return ms(t,function(e){var r=+n,i=r/(e[1][0]-e[0][0]),o=(r-i*(e[1][0]+e[0][0]))/2,a=-i*e[0][1];t.scale(150*i).translate([o,a])},e)}function As(t,n,e){return ms(t,function(e){var r=+n,i=r/(e[1][1]-e[0][1]),o=-i*e[0][0],a=(r-i*(e[1][1]+e[0][1]))/2;t.scale(150*i).translate([o,a])},e)}gs.prototype={_radius:4.5,_circle:ys(4.5),pointRadius:function(t){return(t=+t)!==this._radius&&(this._radius=t,this._circle=null),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._string.push("M",t,",",n),this._point=1;break;case 1:this._string.push("L",t,",",n);break;default:null==this._circle&&(this._circle=ys(this._radius)),this._string.push("M",t,",",n,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}return null}},bs.prototype={constructor:bs,point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var Ts=16,Ns=Ga(30*Ia);function Ss(t,n){return+n?function(t,n){function e(r,i,o,a,u,f,c,s,l,h,d,p,v,g){var y=c-r,_=s-i,b=y*y+_*_;if(b>4*n&&v--){var m=a+h,x=u+d,w=f+p,M=Ka(m*m+x*x+w*w),A=eu(w/=M),T=Ha(Ha(w)-1)<Da||Ha(o-l)<Da?(o+l)/2:Xa(x,m),N=t(T,A),S=N[0],E=N[1],k=S-r,C=E-i,P=_*k-y*C;(P*P/b>n||Ha((y*k+_*C)/b-.5)>.3||a*h+u*d+f*p<Ns)&&(e(r,i,o,a,u,f,S,E,T,m/=M,x/=M,w,v,g),g.point(S,E),e(S,E,T,m,x,w,c,s,l,h,d,p,v,g))}}return function(n){var r,i,o,a,u,f,c,s,l,h,d,p,v={point:g,lineStart:y,lineEnd:b,polygonStart:function(){n.polygonStart(),v.lineStart=m},polygonEnd:function(){n.polygonEnd(),v.lineStart=y}};function g(e,r){e=t(e,r),n.point(e[0],e[1])}function y(){s=NaN,v.point=_,n.lineStart()}function _(r,i){var o=Au([r,i]),a=t(r,i);e(s,l,c,h,d,p,s=a[0],l=a[1],c=r,h=o[0],d=o[1],p=o[2],Ts,n),n.point(s,l)}function b(){v.point=g,n.lineEnd()}function m(){y(),v.point=x,v.lineEnd=w}function x(t,n){_(r=t,n),i=s,o=l,a=h,u=d,f=p,v.point=_}function w(){e(s,l,c,h,d,p,i,o,r,a,u,f,Ts,n),v.lineEnd=b,b()}return v}}(t,n):function(t){return _s({point:function(n,e){n=t(n,e),this.stream.point(n[0],n[1])}})}(t)}var Es=_s({point:function(t,n){this.stream.point(t*Ia,n*Ia)}});function ks(t,n,e,r){var i=Ga(r),o=Qa(r),a=i*t,u=o*t,f=i/t,c=o/t,s=(o*e-i*n)/t,l=(o*n+i*e)/t;function h(t,r){return[a*t-u*r+n,e-u*t-a*r]}return h.invert=function(t,n){return[f*t-c*n+s,l-c*t-f*n]},h}function Cs(t){return Ps(function(){return t})()}function Ps(t){var n,e,r,i,o,a,u,f,c,s,l=150,h=480,d=250,p=0,v=0,g=0,y=0,_=0,b=0,m=null,x=Gf,w=null,M=mc,A=.5;function T(t){return f(t[0]*Ia,t[1]*Ia)}function N(t){return(t=f.invert(t[0],t[1]))&&[t[0]*Fa,t[1]*Fa]}function S(){var t=ks(l,0,0,b).apply(null,n(p,v)),r=(b?ks:function(t,n,e){function r(r,i){return[n+t*r,e-t*i]}return r.invert=function(r,i){return[(r-n)/t,(e-i)/t]},r})(l,h-t[0],d-t[1],b);return e=kf(g,y,_),u=Sf(n,r),f=Sf(e,u),a=Ss(u,A),E()}function E(){return c=s=null,T}return T.stream=function(t){return c&&s===t?c:c=Es(function(t){return _s({point:function(n,e){var r=t(n,e);return this.stream.point(r[0],r[1])}})}(e)(x(a(M(s=t)))))},T.preclip=function(t){return arguments.length?(x=t,m=void 0,E()):x},T.postclip=function(t){return arguments.length?(M=t,w=r=i=o=null,E()):M},T.clipAngle=function(t){return arguments.length?(x=+t?Vf(m=t*Ia):(m=null,Gf),E()):m*Fa},T.clipExtent=function(t){return arguments.length?(M=null==t?(w=r=i=o=null,mc):Zf(w=+t[0][0],r=+t[0][1],i=+t[1][0],o=+t[1][1]),E()):null==w?null:[[w,r],[i,o]]},T.scale=function(t){return arguments.length?(l=+t,S()):l},T.translate=function(t){return arguments.length?(h=+t[0],d=+t[1],S()):[h,d]},T.center=function(t){return arguments.length?(p=t[0]%360*Ia,v=t[1]%360*Ia,S()):[p*Fa,v*Fa]},T.rotate=function(t){return arguments.length?(g=t[0]%360*Ia,y=t[1]%360*Ia,_=t.length>2?t[2]%360*Ia:0,S()):[g*Fa,y*Fa,_*Fa]},T.angle=function(t){return arguments.length?(b=t%360*Ia,S()):b*Fa},T.precision=function(t){return arguments.length?(a=Ss(u,A=t*t),E()):Ka(A)},T.fitExtent=function(t,n){return xs(T,t,n)},T.fitSize=function(t,n){return ws(T,t,n)},T.fitWidth=function(t,n){return Ms(T,t,n)},T.fitHeight=function(t,n){return As(T,t,n)},function(){return n=t.apply(this,arguments),T.invert=n.invert&&N,S()}}function zs(t){var n=0,e=qa/3,r=Ps(t),i=r(n,e);return i.parallels=function(t){return arguments.length?r(n=t[0]*Ia,e=t[1]*Ia):[n*Fa,e*Fa]},i}function Rs(t,n){var e=Qa(t),r=(e+Qa(n))/2;if(Ha(r)<Da)return function(t){var n=Ga(t);function e(t,e){return[t*n,Qa(e)/n]}return e.invert=function(t,e){return[t/n,eu(e*n)]},e}(t);var i=1+e*(2*r-e),o=Ka(i)/r;function a(t,n){var e=Ka(i-2*r*Qa(n))/r;return[e*Qa(t*=r),o-e*Ga(t)]}return a.invert=function(t,n){var e=o-n;return[Xa(t,Ha(e))/r*Ja(e),eu((i-(t*t+e*e)*r*r)/(2*r))]},a}function Ls(){return zs(Rs).scale(155.424).center([0,33.6442])}function Ds(){return Ls().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function Us(t){return function(n,e){var r=Ga(n),i=Ga(e),o=t(r*i);return[o*i*Qa(n),o*Qa(e)]}}function qs(t){return function(n,e){var r=Ka(n*n+e*e),i=t(r),o=Qa(i),a=Ga(i);return[Xa(n*o,r*a),eu(r&&e*o/r)]}}var Os=Us(function(t){return Ka(2/(1+t))});Os.invert=qs(function(t){return 2*eu(t/2)});var Ys=Us(function(t){return(t=nu(t))&&t/Qa(t)});function Bs(t,n){return[t,Wa(tu((Oa+n)/2))]}function Fs(t){var n,e,r,i=Cs(t),o=i.center,a=i.scale,u=i.translate,f=i.clipExtent,c=null;function s(){var o=qa*a(),u=i(Rf(i.rotate()).invert([0,0]));return f(null==c?[[u[0]-o,u[1]-o],[u[0]+o,u[1]+o]]:t===Bs?[[Math.max(u[0]-o,c),n],[Math.min(u[0]+o,e),r]]:[[c,Math.max(u[1]-o,n)],[e,Math.min(u[1]+o,r)]])}return i.scale=function(t){return arguments.length?(a(t),s()):a()},i.translate=function(t){return arguments.length?(u(t),s()):u()},i.center=function(t){return arguments.length?(o(t),s()):o()},i.clipExtent=function(t){return arguments.length?(null==t?c=n=e=r=null:(c=+t[0][0],n=+t[0][1],e=+t[1][0],r=+t[1][1]),s()):null==c?null:[[c,n],[e,r]]},s()}function Is(t){return tu((Oa+t)/2)}function Hs(t,n){var e=Ga(t),r=t===n?Qa(t):Wa(e/Ga(n))/Wa(Is(n)/Is(t)),i=e*Za(Is(t),r)/r;if(!r)return Bs;function o(t,n){i>0?n<-Oa+Da&&(n=-Oa+Da):n>Oa-Da&&(n=Oa-Da);var e=i/Za(Is(n),r);return[e*Qa(r*t),i-e*Ga(r*t)]}return o.invert=function(t,n){var e=i-n,o=Ja(r)*Ka(t*t+e*e);return[Xa(t,Ha(e))/r*Ja(e),2*ja(Za(i/o,1/r))-Oa]},o}function js(t,n){return[t,n]}function Xs(t,n){var e=Ga(t),r=t===n?Qa(t):(e-Ga(n))/(n-t),i=e/r+t;if(Ha(r)<Da)return js;function o(t,n){var e=i-n,o=r*t;return[e*Qa(o),i-e*Ga(o)]}return o.invert=function(t,n){var e=i-n;return[Xa(t,Ha(e))/r*Ja(e),i-Ja(r)*Ka(t*t+e*e)]},o}Ys.invert=qs(function(t){return t}),Bs.invert=function(t,n){return[t,2*ja($a(n))-Oa]},js.invert=js;var Gs=1.340264,Vs=-.081106,$s=893e-6,Ws=.003796,Zs=Ka(3)/2;function Qs(t,n){var e=eu(Zs*Qa(n)),r=e*e,i=r*r*r;return[t*Ga(e)/(Zs*(Gs+3*Vs*r+i*(7*$s+9*Ws*r))),e*(Gs+Vs*r+i*($s+Ws*r))]}function Js(t,n){var e=Ga(n),r=Ga(t)*e;return[e*Qa(t)/r,Qa(n)/r]}function Ks(t,n,e,r){return 1===t&&1===n&&0===e&&0===r?mc:_s({point:function(i,o){this.stream.point(i*t+e,o*n+r)}})}function tl(t,n){var e=n*n,r=e*e;return[t*(.8707-.131979*e+r*(r*(.003971*e-.001529*r)-.013791)),n*(1.007226+e*(.015085+r*(.028874*e-.044475-.005916*r)))]}function nl(t,n){return[Ga(n)*Qa(t),Qa(n)]}function el(t,n){var e=Ga(n),r=1+Ga(t)*e;return[e*Qa(t)/r,Qa(n)/r]}function rl(t,n){return[Wa(tu((Oa+n)/2)),-t]}function il(t,n){return t.parent===n.parent?1:2}function ol(t,n){return t+n.x}function al(t,n){return Math.max(t,n.y)}function ul(t){var n=0,e=t.children,r=e&&e.length;if(r)for(;--r>=0;)n+=e[r].value;else n=1;t.value=n}function fl(t,n){var e,r,i,o,a,u=new hl(t),f=+t.value&&(u.value=t.value),c=[u];for(null==n&&(n=cl);e=c.pop();)if(f&&(e.value=+e.data.value),(i=n(e.data))&&(a=i.length))for(e.children=new Array(a),o=a-1;o>=0;--o)c.push(r=e.children[o]=new hl(i[o])),r.parent=e,r.depth=e.depth+1;return u.eachBefore(ll)}function cl(t){return t.children}function sl(t){t.data=t.data.data}function ll(t){var n=0;do{t.height=n}while((t=t.parent)&&t.height<++n)}function hl(t){this.data=t,this.depth=this.height=0,this.parent=null}Qs.invert=function(t,n){for(var e,r=n,i=r*r,o=i*i*i,a=0;a<12&&(o=(i=(r-=e=(r*(Gs+Vs*i+o*($s+Ws*i))-n)/(Gs+3*Vs*i+o*(7*$s+9*Ws*i)))*r)*i*i,!(Ha(e)<Ua));++a);return[Zs*t*(Gs+3*Vs*i+o*(7*$s+9*Ws*i))/Ga(r),eu(Qa(r)/Zs)]},Js.invert=qs(ja),tl.invert=function(t,n){var e,r=n,i=25;do{var o=r*r,a=o*o;r-=e=(r*(1.007226+o*(.015085+a*(.028874*o-.044475-.005916*a)))-n)/(1.007226+o*(.045255+a*(.259866*o-.311325-.005916*11*a)))}while(Ha(e)>Da&&--i>0);return[t/(.8707+(o=r*r)*(o*(o*o*o*(.003971-.001529*o)-.013791)-.131979)),r]},nl.invert=qs(eu),el.invert=qs(function(t){return 2*ja(t)}),rl.invert=function(t,n){return[-n,2*ja($a(t))-Oa]},hl.prototype=fl.prototype={constructor:hl,count:function(){return this.eachAfter(ul)},each:function(t){var n,e,r,i,o=this,a=[o];do{for(n=a.reverse(),a=[];o=n.pop();)if(t(o),e=o.children)for(r=0,i=e.length;r<i;++r)a.push(e[r])}while(a.length);return this},eachAfter:function(t){for(var n,e,r,i=this,o=[i],a=[];i=o.pop();)if(a.push(i),n=i.children)for(e=0,r=n.length;e<r;++e)o.push(n[e]);for(;i=a.pop();)t(i);return this},eachBefore:function(t){for(var n,e,r=this,i=[r];r=i.pop();)if(t(r),n=r.children)for(e=n.length-1;e>=0;--e)i.push(n[e]);return this},sum:function(t){return this.eachAfter(function(n){for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value;n.value=e})},sort:function(t){return this.eachBefore(function(n){n.children&&n.children.sort(t)})},path:function(t){for(var n=this,e=function(t,n){if(t===n)return t;var e=t.ancestors(),r=n.ancestors(),i=null;for(t=e.pop(),n=r.pop();t===n;)i=t,t=e.pop(),n=r.pop();return i}(n,t),r=[n];n!==e;)n=n.parent,r.push(n);for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},descendants:function(){var t=[];return this.each(function(n){t.push(n)}),t},leaves:function(){var t=[];return this.eachBefore(function(n){n.children||t.push(n)}),t},links:function(){var t=this,n=[];return t.each(function(e){e!==t&&n.push({source:e.parent,target:e})}),n},copy:function(){return fl(this).eachBefore(sl)}};var dl=Array.prototype.slice;function pl(t){for(var n,e,r=0,i=(t=function(t){for(var n,e,r=t.length;r;)e=Math.random()*r--|0,n=t[r],t[r]=t[e],t[e]=n;return t}(dl.call(t))).length,o=[];r<i;)n=t[r],e&&yl(e,n)?++r:(e=bl(o=vl(o,n)),r=0);return e}function vl(t,n){var e,r;if(_l(n,t))return[n];for(e=0;e<t.length;++e)if(gl(n,t[e])&&_l(ml(t[e],n),t))return[t[e],n];for(e=0;e<t.length-1;++e)for(r=e+1;r<t.length;++r)if(gl(ml(t[e],t[r]),n)&&gl(ml(t[e],n),t[r])&&gl(ml(t[r],n),t[e])&&_l(xl(t[e],t[r],n),t))return[t[e],t[r],n];throw new Error}function gl(t,n){var e=t.r-n.r,r=n.x-t.x,i=n.y-t.y;return e<0||e*e<r*r+i*i}function yl(t,n){var e=t.r-n.r+1e-6,r=n.x-t.x,i=n.y-t.y;return e>0&&e*e>r*r+i*i}function _l(t,n){for(var e=0;e<n.length;++e)if(!yl(t,n[e]))return!1;return!0}function bl(t){switch(t.length){case 1:return{x:(n=t[0]).x,y:n.y,r:n.r};case 2:return ml(t[0],t[1]);case 3:return xl(t[0],t[1],t[2])}var n}function ml(t,n){var e=t.x,r=t.y,i=t.r,o=n.x,a=n.y,u=n.r,f=o-e,c=a-r,s=u-i,l=Math.sqrt(f*f+c*c);return{x:(e+o+f/l*s)/2,y:(r+a+c/l*s)/2,r:(l+i+u)/2}}function xl(t,n,e){var r=t.x,i=t.y,o=t.r,a=n.x,u=n.y,f=n.r,c=e.x,s=e.y,l=e.r,h=r-a,d=r-c,p=i-u,v=i-s,g=f-o,y=l-o,_=r*r+i*i-o*o,b=_-a*a-u*u+f*f,m=_-c*c-s*s+l*l,x=d*p-h*v,w=(p*m-v*b)/(2*x)-r,M=(v*g-p*y)/x,A=(d*b-h*m)/(2*x)-i,T=(h*y-d*g)/x,N=M*M+T*T-1,S=2*(o+w*M+A*T),E=w*w+A*A-o*o,k=-(N?(S+Math.sqrt(S*S-4*N*E))/(2*N):E/S);return{x:r+w+M*k,y:i+A+T*k,r:k}}function wl(t,n,e){var r,i,o,a,u=t.x-n.x,f=t.y-n.y,c=u*u+f*f;c?(i=n.r+e.r,i*=i,a=t.r+e.r,i>(a*=a)?(r=(c+a-i)/(2*c),o=Math.sqrt(Math.max(0,a/c-r*r)),e.x=t.x-r*u-o*f,e.y=t.y-r*f+o*u):(r=(c+i-a)/(2*c),o=Math.sqrt(Math.max(0,i/c-r*r)),e.x=n.x+r*u-o*f,e.y=n.y+r*f+o*u)):(e.x=n.x+e.r,e.y=n.y)}function Ml(t,n){var e=t.r+n.r-1e-6,r=n.x-t.x,i=n.y-t.y;return e>0&&e*e>r*r+i*i}function Al(t){var n=t._,e=t.next._,r=n.r+e.r,i=(n.x*e.r+e.x*n.r)/r,o=(n.y*e.r+e.y*n.r)/r;return i*i+o*o}function Tl(t){this._=t,this.next=null,this.previous=null}function Nl(t){if(!(i=t.length))return 0;var n,e,r,i,o,a,u,f,c,s,l;if((n=t[0]).x=0,n.y=0,!(i>1))return n.r;if(e=t[1],n.x=-e.r,e.x=n.r,e.y=0,!(i>2))return n.r+e.r;wl(e,n,r=t[2]),n=new Tl(n),e=new Tl(e),r=new Tl(r),n.next=r.previous=e,e.next=n.previous=r,r.next=e.previous=n;t:for(u=3;u<i;++u){wl(n._,e._,r=t[u]),r=new Tl(r),f=e.next,c=n.previous,s=e._.r,l=n._.r;do{if(s<=l){if(Ml(f._,r._)){e=f,n.next=e,e.previous=n,--u;continue t}s+=f._.r,f=f.next}else{if(Ml(c._,r._)){(n=c).next=e,e.previous=n,--u;continue t}l+=c._.r,c=c.previous}}while(f!==c.next);for(r.previous=n,r.next=e,n.next=e.previous=e=r,o=Al(n);(r=r.next)!==e;)(a=Al(r))<o&&(n=r,o=a);e=n.next}for(n=[e._],r=e;(r=r.next)!==e;)n.push(r._);for(r=pl(n),u=0;u<i;++u)(n=t[u]).x-=r.x,n.y-=r.y;return r.r}function Sl(t){if("function"!=typeof t)throw new Error;return t}function El(){return 0}function kl(t){return function(){return t}}function Cl(t){return Math.sqrt(t.value)}function Pl(t){return function(n){n.children||(n.r=Math.max(0,+t(n)||0))}}function zl(t,n){return function(e){if(r=e.children){var r,i,o,a=r.length,u=t(e)*n||0;if(u)for(i=0;i<a;++i)r[i].r+=u;if(o=Nl(r),u)for(i=0;i<a;++i)r[i].r-=u;e.r=o+u}}}function Rl(t){return function(n){var e=n.parent;n.r*=t,e&&(n.x=e.x+t*n.x,n.y=e.y+t*n.y)}}function Ll(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}function Dl(t,n,e,r,i){for(var o,a=t.children,u=-1,f=a.length,c=t.value&&(r-n)/t.value;++u<f;)(o=a[u]).y0=e,o.y1=i,o.x0=n,o.x1=n+=o.value*c}var Ul="$",ql={depth:-1},Ol={};function Yl(t){return t.id}function Bl(t){return t.parentId}function Fl(t,n){return t.parent===n.parent?1:2}function Il(t){var n=t.children;return n?n[0]:t.t}function Hl(t){var n=t.children;return n?n[n.length-1]:t.t}function jl(t,n,e){var r=e/(n.i-t.i);n.c-=r,n.s+=e,t.c+=r,n.z+=e,n.m+=e}function Xl(t,n,e){return t.a.parent===n.parent?t.a:e}function Gl(t,n){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n}function Vl(t,n,e,r,i){for(var o,a=t.children,u=-1,f=a.length,c=t.value&&(i-e)/t.value;++u<f;)(o=a[u]).x0=n,o.x1=r,o.y0=e,o.y1=e+=o.value*c}Gl.prototype=Object.create(hl.prototype);var $l=(1+Math.sqrt(5))/2;function Wl(t,n,e,r,i,o){for(var a,u,f,c,s,l,h,d,p,v,g,y=[],_=n.children,b=0,m=0,x=_.length,w=n.value;b<x;){f=i-e,c=o-r;do{s=_[m++].value}while(!s&&m<x);for(l=h=s,g=s*s*(v=Math.max(c/f,f/c)/(w*t)),p=Math.max(h/g,g/l);m<x;++m){if(s+=u=_[m].value,u<l&&(l=u),u>h&&(h=u),g=s*s*v,(d=Math.max(h/g,g/l))>p){s-=u;break}p=d}y.push(a={value:s,dice:f<c,children:_.slice(b,m)}),a.dice?Dl(a,e,r,i,w?r+=c*s/w:o):Vl(a,e,r,w?e+=f*s/w:i,o),w-=s,b=m}return y}var Zl=function t(n){function e(t,e,r,i,o){Wl(n,t,e,r,i,o)}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}($l);var Ql=function t(n){function e(t,e,r,i,o){if((a=t._squarify)&&a.ratio===n)for(var a,u,f,c,s,l=-1,h=a.length,d=t.value;++l<h;){for(f=(u=a[l]).children,c=u.value=0,s=f.length;c<s;++c)u.value+=f[c].value;u.dice?Dl(u,e,r,i,r+=(o-r)*u.value/d):Vl(u,e,r,e+=(i-e)*u.value/d,o),d-=u.value}else t._squarify=a=Wl(n,t,e,r,i,o),a.ratio=n}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}($l);function Jl(t,n){return t[0]-n[0]||t[1]-n[1]}function Kl(t){for(var n,e,r,i=t.length,o=[0,1],a=2,u=2;u<i;++u){for(;a>1&&(n=t[o[a-2]],e=t[o[a-1]],r=t[u],(e[0]-n[0])*(r[1]-n[1])-(e[1]-n[1])*(r[0]-n[0])<=0);)--a;o[a++]=u}return o.slice(0,a)}function th(){return Math.random()}var nh=function t(n){function e(t,e){return t=null==t?0:+t,e=null==e?1:+e,1===arguments.length?(e=t,t=0):e-=t,function(){return n()*e+t}}return e.source=t,e}(th),eh=function t(n){function e(t,e){var r,i;return t=null==t?0:+t,e=null==e?1:+e,function(){var o;if(null!=r)o=r,r=null;else do{r=2*n()-1,o=2*n()-1,i=r*r+o*o}while(!i||i>1);return t+e*o*Math.sqrt(-2*Math.log(i)/i)}}return e.source=t,e}(th),rh=function t(n){function e(){var t=eh.source(n).apply(this,arguments);return function(){return Math.exp(t())}}return e.source=t,e}(th),ih=function t(n){function e(t){return function(){for(var e=0,r=0;r<t;++r)e+=n();return e}}return e.source=t,e}(th),oh=function t(n){function e(t){var e=ih.source(n)(t);return function(){return e()/t}}return e.source=t,e}(th),ah=function t(n){function e(t){return function(){return-Math.log(1-n())/t}}return e.source=t,e}(th),uh=Array.prototype,fh=uh.map,ch=uh.slice,sh={name:"implicit"};function lh(t){var n=Ki(),e=[],r=sh;function i(i){var o=i+"",a=n.get(o);if(!a){if(r!==sh)return r;n.set(o,a=e.push(i))}return t[(a-1)%t.length]}return t=null==t?[]:ch.call(t),i.domain=function(t){if(!arguments.length)return e.slice();e=[],n=Ki();for(var r,o,a=-1,u=t.length;++a<u;)n.has(o=(r=t[a])+"")||n.set(o,e.push(r));return i},i.range=function(n){return arguments.length?(t=ch.call(n),i):t.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return lh().domain(e).range(t).unknown(r)},i}function hh(){var t,n,e=lh().unknown(void 0),r=e.domain,i=e.range,o=[0,1],a=!1,u=0,f=0,c=.5;function s(){var e=r().length,s=o[1]<o[0],l=o[s-0],h=o[1-s];t=(h-l)/Math.max(1,e-u+2*f),a&&(t=Math.floor(t)),l+=(h-l-t*(e-u))*c,n=t*(1-u),a&&(l=Math.round(l),n=Math.round(n));var d=g(e).map(function(n){return l+t*n});return i(s?d.reverse():d)}return delete e.unknown,e.domain=function(t){return arguments.length?(r(t),s()):r()},e.range=function(t){return arguments.length?(o=[+t[0],+t[1]],s()):o.slice()},e.rangeRound=function(t){return o=[+t[0],+t[1]],a=!0,s()},e.bandwidth=function(){return n},e.step=function(){return t},e.round=function(t){return arguments.length?(a=!!t,s()):a},e.padding=function(t){return arguments.length?(u=f=Math.max(0,Math.min(1,t)),s()):u},e.paddingInner=function(t){return arguments.length?(u=Math.max(0,Math.min(1,t)),s()):u},e.paddingOuter=function(t){return arguments.length?(f=Math.max(0,Math.min(1,t)),s()):f},e.align=function(t){return arguments.length?(c=Math.max(0,Math.min(1,t)),s()):c},e.copy=function(){return hh().domain(r()).range(o).round(a).paddingInner(u).paddingOuter(f).align(c)},s()}function dh(t){return function(){return t}}function ph(t){return+t}var vh=[0,1];function gh(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:dh(n)}function yh(t,n,e,r){var i=t[0],o=t[1],a=n[0],u=n[1];return o<i?(i=e(o,i),a=r(u,a)):(i=e(i,o),a=r(a,u)),function(t){return a(i(t))}}function _h(t,n,e,r){var o=Math.min(t.length,n.length)-1,a=new Array(o),u=new Array(o),f=-1;for(t[o]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++f<o;)a[f]=e(t[f],t[f+1]),u[f]=r(n[f],n[f+1]);return function(n){var e=i(t,n,1,o)-1;return u[e](a[e](n))}}function bh(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())}function mh(t,n){var e,r,i,o=vh,a=vh,u=me,f=!1;function c(){return e=Math.min(o.length,a.length)>2?_h:yh,r=i=null,s}function s(n){return(r||(r=e(o,a,f?function(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=n?0:t>=e?1:r(t)}}}(t):t,u)))(+n)}return s.invert=function(t){return(i||(i=e(a,o,gh,f?function(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=0?n:t>=1?e:r(t)}}}(n):n)))(+t)},s.domain=function(t){return arguments.length?(o=fh.call(t,ph),c()):o.slice()},s.range=function(t){return arguments.length?(a=ch.call(t),c()):a.slice()},s.rangeRound=function(t){return a=ch.call(t),u=xe,c()},s.clamp=function(t){return arguments.length?(f=!!t,c()):f},s.interpolate=function(t){return arguments.length?(u=t,c()):u},c()}function xh(n){var e=n.domain;return n.ticks=function(t){var n=e();return m(n[0],n[n.length-1],null==t?10:t)},n.tickFormat=function(n,r){return function(n,e,r){var i,o=n[0],a=n[n.length-1],u=w(o,a,null==e?10:e);switch((r=ba(null==r?",f":r)).type){case"s":var f=Math.max(Math.abs(o),Math.abs(a));return null!=r.precision||isNaN(i=ka(u,f))||(r.precision=i),t.formatPrefix(r,f);case"":case"e":case"g":case"p":case"r":null!=r.precision||isNaN(i=Ca(u,Math.max(Math.abs(o),Math.abs(a))))||(r.precision=i-("e"===r.type));break;case"f":case"%":null!=r.precision||isNaN(i=Ea(u))||(r.precision=i-2*("%"===r.type))}return t.format(r)}(e(),n,r)},n.nice=function(t){null==t&&(t=10);var r,i=e(),o=0,a=i.length-1,u=i[o],f=i[a];return f<u&&(r=u,u=f,f=r,r=o,o=a,a=r),(r=x(u,f,t))>0?r=x(u=Math.floor(u/r)*r,f=Math.ceil(f/r)*r,t):r<0&&(r=x(u=Math.ceil(u*r)/r,f=Math.floor(f*r)/r,t)),r>0?(i[o]=Math.floor(u/r)*r,i[a]=Math.ceil(f/r)*r,e(i)):r<0&&(i[o]=Math.ceil(u*r)/r,i[a]=Math.floor(f*r)/r,e(i)),n},n}function wh(t,n){var e,r=0,i=(t=t.slice()).length-1,o=t[r],a=t[i];return a<o&&(e=r,r=i,i=e,e=o,o=a,a=e),t[r]=n.floor(o),t[i]=n.ceil(a),t}function Mh(t,n){return(n=Math.log(n/t))?function(e){return Math.log(e/t)/n}:dh(n)}function Ah(t,n){return t<0?function(e){return-Math.pow(-n,e)*Math.pow(-t,1-e)}:function(e){return Math.pow(n,e)*Math.pow(t,1-e)}}function Th(t){return isFinite(t)?+("1e"+t):t<0?0:t}function Nh(t){return 10===t?Th:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}}function Sh(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(n){return Math.log(n)/t})}function Eh(t){return function(n){return-t(-n)}}function kh(t,n){return t<0?-Math.pow(-t,n):Math.pow(t,n)}function Ch(){var t=1,n=mh(function(n,e){return(e=kh(e,t)-(n=kh(n,t)))?function(r){return(kh(r,t)-n)/e}:dh(e)},function(n,e){return e=kh(e,t)-(n=kh(n,t)),function(r){return kh(n+e*r,1/t)}}),e=n.domain;return n.exponent=function(n){return arguments.length?(t=+n,e(e())):t},n.copy=function(){return bh(n,Ch().exponent(t))},xh(n)}var Ph=new Date,zh=new Date;function Rh(t,n,e,r){function i(n){return t(n=new Date(+n)),n}return i.floor=i,i.ceil=function(e){return t(e=new Date(e-1)),n(e,1),t(e),e},i.round=function(t){var n=i(t),e=i.ceil(t);return t-n<e-t?n:e},i.offset=function(t,e){return n(t=new Date(+t),null==e?1:Math.floor(e)),t},i.range=function(e,r,o){var a,u=[];if(e=i.ceil(e),o=null==o?1:Math.floor(o),!(e<r&&o>0))return u;do{u.push(a=new Date(+e)),n(e,o),t(e)}while(a<e&&e<r);return u},i.filter=function(e){return Rh(function(n){if(n>=n)for(;t(n),!e(n);)n.setTime(n-1)},function(t,r){if(t>=t)if(r<0)for(;++r<=0;)for(;n(t,-1),!e(t););else for(;--r>=0;)for(;n(t,1),!e(t););})},e&&(i.count=function(n,r){return Ph.setTime(+n),zh.setTime(+r),t(Ph),t(zh),Math.floor(e(Ph,zh))},i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(n){return r(n)%t==0}:function(n){return i.count(0,n)%t==0}):i:null}),i}var Lh=Rh(function(){},function(t,n){t.setTime(+t+n)},function(t,n){return n-t});Lh.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Rh(function(n){n.setTime(Math.floor(n/t)*t)},function(n,e){n.setTime(+n+e*t)},function(n,e){return(e-n)/t}):Lh:null};var Dh=Lh.range,Uh=6e4,qh=6048e5,Oh=Rh(function(t){t.setTime(1e3*Math.floor(t/1e3))},function(t,n){t.setTime(+t+1e3*n)},function(t,n){return(n-t)/1e3},function(t){return t.getUTCSeconds()}),Yh=Oh.range,Bh=Rh(function(t){t.setTime(Math.floor(t/Uh)*Uh)},function(t,n){t.setTime(+t+n*Uh)},function(t,n){return(n-t)/Uh},function(t){return t.getMinutes()}),Fh=Bh.range,Ih=Rh(function(t){var n=t.getTimezoneOffset()*Uh%36e5;n<0&&(n+=36e5),t.setTime(36e5*Math.floor((+t-n)/36e5)+n)},function(t,n){t.setTime(+t+36e5*n)},function(t,n){return(n-t)/36e5},function(t){return t.getHours()}),Hh=Ih.range,jh=Rh(function(t){t.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Uh)/864e5},function(t){return t.getDate()-1}),Xh=jh.range;function Gh(t){return Rh(function(n){n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+7*n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Uh)/qh})}var Vh=Gh(0),$h=Gh(1),Wh=Gh(2),Zh=Gh(3),Qh=Gh(4),Jh=Gh(5),Kh=Gh(6),td=Vh.range,nd=$h.range,ed=Wh.range,rd=Zh.range,id=Qh.range,od=Jh.range,ad=Kh.range,ud=Rh(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,n){t.setMonth(t.getMonth()+n)},function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())},function(t){return t.getMonth()}),fd=ud.range,cd=Rh(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n)},function(t,n){return n.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});cd.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Rh(function(n){n.setFullYear(Math.floor(n.getFullYear()/t)*t),n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,e){n.setFullYear(n.getFullYear()+e*t)}):null};var sd=cd.range,ld=Rh(function(t){t.setUTCSeconds(0,0)},function(t,n){t.setTime(+t+n*Uh)},function(t,n){return(n-t)/Uh},function(t){return t.getUTCMinutes()}),hd=ld.range,dd=Rh(function(t){t.setUTCMinutes(0,0,0)},function(t,n){t.setTime(+t+36e5*n)},function(t,n){return(n-t)/36e5},function(t){return t.getUTCHours()}),pd=dd.range,vd=Rh(function(t){t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+n)},function(t,n){return(n-t)/864e5},function(t){return t.getUTCDate()-1}),gd=vd.range;function yd(t){return Rh(function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+7*n)},function(t,n){return(n-t)/qh})}var _d=yd(0),bd=yd(1),md=yd(2),xd=yd(3),wd=yd(4),Md=yd(5),Ad=yd(6),Td=_d.range,Nd=bd.range,Sd=md.range,Ed=xd.range,kd=wd.range,Cd=Md.range,Pd=Ad.range,zd=Rh(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCMonth(t.getUTCMonth()+n)},function(t,n){return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()}),Rd=zd.range,Ld=Rh(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n)},function(t,n){return n.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});Ld.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Rh(function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e*t)}):null};var Dd=Ld.range;function Ud(t){if(0<=t.y&&t.y<100){var n=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function qd(t){if(0<=t.y&&t.y<100){var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return n.setUTCFullYear(t.y),n}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function Od(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}function Yd(t){var n=t.dateTime,e=t.date,r=t.time,i=t.periods,o=t.days,a=t.shortDays,u=t.months,f=t.shortMonths,c=Vd(i),s=$d(i),l=Vd(o),h=$d(o),d=Vd(a),p=$d(a),v=Vd(u),g=$d(u),y=Vd(f),_=$d(f),b={a:function(t){return a[t.getDay()]},A:function(t){return o[t.getDay()]},b:function(t){return f[t.getMonth()]},B:function(t){return u[t.getMonth()]},c:null,d:pp,e:pp,f:bp,H:vp,I:gp,j:yp,L:_p,m:mp,M:xp,p:function(t){return i[+(t.getHours()>=12)]},Q:Wp,s:Zp,S:wp,u:Mp,U:Ap,V:Tp,w:Np,W:Sp,x:null,X:null,y:Ep,Y:kp,Z:Cp,"%":$p},m={a:function(t){return a[t.getUTCDay()]},A:function(t){return o[t.getUTCDay()]},b:function(t){return f[t.getUTCMonth()]},B:function(t){return u[t.getUTCMonth()]},c:null,d:Pp,e:Pp,f:Up,H:zp,I:Rp,j:Lp,L:Dp,m:qp,M:Op,p:function(t){return i[+(t.getUTCHours()>=12)]},Q:Wp,s:Zp,S:Yp,u:Bp,U:Fp,V:Ip,w:Hp,W:jp,x:null,X:null,y:Xp,Y:Gp,Z:Vp,"%":$p},x={a:function(t,n,e){var r=d.exec(n.slice(e));return r?(t.w=p[r[0].toLowerCase()],e+r[0].length):-1},A:function(t,n,e){var r=l.exec(n.slice(e));return r?(t.w=h[r[0].toLowerCase()],e+r[0].length):-1},b:function(t,n,e){var r=y.exec(n.slice(e));return r?(t.m=_[r[0].toLowerCase()],e+r[0].length):-1},B:function(t,n,e){var r=v.exec(n.slice(e));return r?(t.m=g[r[0].toLowerCase()],e+r[0].length):-1},c:function(t,e,r){return A(t,n,e,r)},d:ip,e:ip,f:sp,H:ap,I:ap,j:op,L:cp,m:rp,M:up,p:function(t,n,e){var r=c.exec(n.slice(e));return r?(t.p=s[r[0].toLowerCase()],e+r[0].length):-1},Q:hp,s:dp,S:fp,u:Zd,U:Qd,V:Jd,w:Wd,W:Kd,x:function(t,n,r){return A(t,e,n,r)},X:function(t,n,e){return A(t,r,n,e)},y:np,Y:tp,Z:ep,"%":lp};function w(t,n){return function(e){var r,i,o,a=[],u=-1,f=0,c=t.length;for(e instanceof Date||(e=new Date(+e));++u<c;)37===t.charCodeAt(u)&&(a.push(t.slice(f,u)),null!=(i=Fd[r=t.charAt(++u)])?r=t.charAt(++u):i="e"===r?" ":"0",(o=n[r])&&(r=o(e,i)),a.push(r),f=u+1);return a.push(t.slice(f,u)),a.join("")}}function M(t,n){return function(e){var r,i,o=Od(1900);if(A(o,t,e+="",0)!=e.length)return null;if("Q"in o)return new Date(o.Q);if("p"in o&&(o.H=o.H%12+12*o.p),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(i=(r=qd(Od(o.y))).getUTCDay(),r=i>4||0===i?bd.ceil(r):bd(r),r=vd.offset(r,7*(o.V-1)),o.y=r.getUTCFullYear(),o.m=r.getUTCMonth(),o.d=r.getUTCDate()+(o.w+6)%7):(i=(r=n(Od(o.y))).getDay(),r=i>4||0===i?$h.ceil(r):$h(r),r=jh.offset(r,7*(o.V-1)),o.y=r.getFullYear(),o.m=r.getMonth(),o.d=r.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),i="Z"in o?qd(Od(o.y)).getUTCDay():n(Od(o.y)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(i+5)%7:o.w+7*o.U-(i+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,qd(o)):n(o)}}function A(t,n,e,r){for(var i,o,a=0,u=n.length,f=e.length;a<u;){if(r>=f)return-1;if(37===(i=n.charCodeAt(a++))){if(i=n.charAt(a++),!(o=x[i in Fd?n.charAt(a++):i])||(r=o(t,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}return b.x=w(e,b),b.X=w(r,b),b.c=w(n,b),m.x=w(e,m),m.X=w(r,m),m.c=w(n,m),{format:function(t){var n=w(t+="",b);return n.toString=function(){return t},n},parse:function(t){var n=M(t+="",Ud);return n.toString=function(){return t},n},utcFormat:function(t){var n=w(t+="",m);return n.toString=function(){return t},n},utcParse:function(t){var n=M(t,qd);return n.toString=function(){return t},n}}}var Bd,Fd={"-":"",_:" ",0:"0"},Id=/^\s*\d+/,Hd=/^%/,jd=/[\\^$*+?|[\]().{}]/g;function Xd(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length;return r+(o<e?new Array(e-o+1).join(n)+i:i)}function Gd(t){return t.replace(jd,"\\$&")}function Vd(t){return new RegExp("^(?:"+t.map(Gd).join("|")+")","i")}function $d(t){for(var n={},e=-1,r=t.length;++e<r;)n[t[e].toLowerCase()]=e;return n}function Wd(t,n,e){var r=Id.exec(n.slice(e,e+1));return r?(t.w=+r[0],e+r[0].length):-1}function Zd(t,n,e){var r=Id.exec(n.slice(e,e+1));return r?(t.u=+r[0],e+r[0].length):-1}function Qd(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.U=+r[0],e+r[0].length):-1}function Jd(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.V=+r[0],e+r[0].length):-1}function Kd(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.W=+r[0],e+r[0].length):-1}function tp(t,n,e){var r=Id.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}function np(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function ep(t,n,e){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e,e+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function rp(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.m=r[0]-1,e+r[0].length):-1}function ip(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}function op(t,n,e){var r=Id.exec(n.slice(e,e+3));return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function ap(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}function up(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.M=+r[0],e+r[0].length):-1}function fp(t,n,e){var r=Id.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}function cp(t,n,e){var r=Id.exec(n.slice(e,e+3));return r?(t.L=+r[0],e+r[0].length):-1}function sp(t,n,e){var r=Id.exec(n.slice(e,e+6));return r?(t.L=Math.floor(r[0]/1e3),e+r[0].length):-1}function lp(t,n,e){var r=Hd.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function hp(t,n,e){var r=Id.exec(n.slice(e));return r?(t.Q=+r[0],e+r[0].length):-1}function dp(t,n,e){var r=Id.exec(n.slice(e));return r?(t.Q=1e3*+r[0],e+r[0].length):-1}function pp(t,n){return Xd(t.getDate(),n,2)}function vp(t,n){return Xd(t.getHours(),n,2)}function gp(t,n){return Xd(t.getHours()%12||12,n,2)}function yp(t,n){return Xd(1+jh.count(cd(t),t),n,3)}function _p(t,n){return Xd(t.getMilliseconds(),n,3)}function bp(t,n){return _p(t,n)+"000"}function mp(t,n){return Xd(t.getMonth()+1,n,2)}function xp(t,n){return Xd(t.getMinutes(),n,2)}function wp(t,n){return Xd(t.getSeconds(),n,2)}function Mp(t){var n=t.getDay();return 0===n?7:n}function Ap(t,n){return Xd(Vh.count(cd(t),t),n,2)}function Tp(t,n){var e=t.getDay();return t=e>=4||0===e?Qh(t):Qh.ceil(t),Xd(Qh.count(cd(t),t)+(4===cd(t).getDay()),n,2)}function Np(t){return t.getDay()}function Sp(t,n){return Xd($h.count(cd(t),t),n,2)}function Ep(t,n){return Xd(t.getFullYear()%100,n,2)}function kp(t,n){return Xd(t.getFullYear()%1e4,n,4)}function Cp(t){var n=t.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+Xd(n/60|0,"0",2)+Xd(n%60,"0",2)}function Pp(t,n){return Xd(t.getUTCDate(),n,2)}function zp(t,n){return Xd(t.getUTCHours(),n,2)}function Rp(t,n){return Xd(t.getUTCHours()%12||12,n,2)}function Lp(t,n){return Xd(1+vd.count(Ld(t),t),n,3)}function Dp(t,n){return Xd(t.getUTCMilliseconds(),n,3)}function Up(t,n){return Dp(t,n)+"000"}function qp(t,n){return Xd(t.getUTCMonth()+1,n,2)}function Op(t,n){return Xd(t.getUTCMinutes(),n,2)}function Yp(t,n){return Xd(t.getUTCSeconds(),n,2)}function Bp(t){var n=t.getUTCDay();return 0===n?7:n}function Fp(t,n){return Xd(_d.count(Ld(t),t),n,2)}function Ip(t,n){var e=t.getUTCDay();return t=e>=4||0===e?wd(t):wd.ceil(t),Xd(wd.count(Ld(t),t)+(4===Ld(t).getUTCDay()),n,2)}function Hp(t){return t.getUTCDay()}function jp(t,n){return Xd(bd.count(Ld(t),t),n,2)}function Xp(t,n){return Xd(t.getUTCFullYear()%100,n,2)}function Gp(t,n){return Xd(t.getUTCFullYear()%1e4,n,4)}function Vp(){return"+0000"}function $p(){return"%"}function Wp(t){return+t}function Zp(t){return Math.floor(+t/1e3)}function Qp(n){return Bd=Yd(n),t.timeFormat=Bd.format,t.timeParse=Bd.parse,t.utcFormat=Bd.utcFormat,t.utcParse=Bd.utcParse,Bd}Qp({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var Jp=Date.prototype.toISOString?function(t){return t.toISOString()}:t.utcFormat("%Y-%m-%dT%H:%M:%S.%LZ");var Kp=+new Date("2000-01-01T00:00:00.000Z")?function(t){var n=new Date(t);return isNaN(n)?null:n}:t.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"),tv=1e3,nv=60*tv,ev=60*nv,rv=24*ev,iv=7*rv,ov=30*rv,av=365*rv;function uv(t){return new Date(t)}function fv(t){return t instanceof Date?+t:+new Date(+t)}function cv(t,n,r,i,o,a,u,f,c){var s=mh(gh,ve),l=s.invert,h=s.domain,d=c(".%L"),p=c(":%S"),v=c("%I:%M"),g=c("%I %p"),y=c("%a %d"),_=c("%b %d"),b=c("%B"),m=c("%Y"),x=[[u,1,tv],[u,5,5*tv],[u,15,15*tv],[u,30,30*tv],[a,1,nv],[a,5,5*nv],[a,15,15*nv],[a,30,30*nv],[o,1,ev],[o,3,3*ev],[o,6,6*ev],[o,12,12*ev],[i,1,rv],[i,2,2*rv],[r,1,iv],[n,1,ov],[n,3,3*ov],[t,1,av]];function M(e){return(u(e)<e?d:a(e)<e?p:o(e)<e?v:i(e)<e?g:n(e)<e?r(e)<e?y:_:t(e)<e?b:m)(e)}function A(n,r,i,o){if(null==n&&(n=10),"number"==typeof n){var a=Math.abs(i-r)/n,u=e(function(t){return t[2]}).right(x,a);u===x.length?(o=w(r/av,i/av,n),n=t):u?(o=(u=x[a/x[u-1][2]<x[u][2]/a?u-1:u])[1],n=u[0]):(o=Math.max(w(r,i,n),1),n=f)}return null==o?n:n.every(o)}return s.invert=function(t){return new Date(l(t))},s.domain=function(t){return arguments.length?h(fh.call(t,fv)):h().map(uv)},s.ticks=function(t,n){var e,r=h(),i=r[0],o=r[r.length-1],a=o<i;return a&&(e=i,i=o,o=e),e=(e=A(t,i,o,n))?e.range(i,o+1):[],a?e.reverse():e},s.tickFormat=function(t,n){return null==n?M:c(n)},s.nice=function(t,n){var e=h();return(t=A(t,e[0],e[e.length-1],n))?h(wh(e,t)):s},s.copy=function(){return bh(s,cv(t,n,r,i,o,a,u,f,c))},s}function sv(t){for(var n=t.length/6|0,e=new Array(n),r=0;r<n;)e[r]="#"+t.slice(6*r,6*++r);return e}var lv=sv("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),hv=sv("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),dv=sv("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"),pv=sv("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"),vv=sv("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),gv=sv("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),yv=sv("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),_v=sv("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),bv=sv("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");function mv(t){return le(t[t.length-1])}var xv=new Array(3).concat("d8b365f5f5f55ab4ac","a6611adfc27d80cdc1018571","a6611adfc27df5f5f580cdc1018571","8c510ad8b365f6e8c3c7eae55ab4ac01665e","8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e","8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e","8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e","5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30","5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(sv),wv=mv(xv),Mv=new Array(3).concat("af8dc3f7f7f77fbf7b","7b3294c2a5cfa6dba0008837","7b3294c2a5cff7f7f7a6dba0008837","762a83af8dc3e7d4e8d9f0d37fbf7b1b7837","762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837","762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837","762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837","40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b","40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(sv),Av=mv(Mv),Tv=new Array(3).concat("e9a3c9f7f7f7a1d76a","d01c8bf1b6dab8e1864dac26","d01c8bf1b6daf7f7f7b8e1864dac26","c51b7de9a3c9fde0efe6f5d0a1d76a4d9221","c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221","c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221","c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221","8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419","8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(sv),Nv=mv(Tv),Sv=new Array(3).concat("998ec3f7f7f7f1a340","5e3c99b2abd2fdb863e66101","5e3c99b2abd2f7f7f7fdb863e66101","542788998ec3d8daebfee0b6f1a340b35806","542788998ec3d8daebf7f7f7fee0b6f1a340b35806","5427888073acb2abd2d8daebfee0b6fdb863e08214b35806","5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806","2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08","2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(sv),Ev=mv(Sv),kv=new Array(3).concat("ef8a62f7f7f767a9cf","ca0020f4a58292c5de0571b0","ca0020f4a582f7f7f792c5de0571b0","b2182bef8a62fddbc7d1e5f067a9cf2166ac","b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac","b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac","b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac","67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061","67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(sv),Cv=mv(kv),Pv=new Array(3).concat("ef8a62ffffff999999","ca0020f4a582bababa404040","ca0020f4a582ffffffbababa404040","b2182bef8a62fddbc7e0e0e09999994d4d4d","b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d","b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d","b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d","67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a","67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(sv),zv=mv(Pv),Rv=new Array(3).concat("fc8d59ffffbf91bfdb","d7191cfdae61abd9e92c7bb6","d7191cfdae61ffffbfabd9e92c7bb6","d73027fc8d59fee090e0f3f891bfdb4575b4","d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4","d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4","d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4","a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695","a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(sv),Lv=mv(Rv),Dv=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(sv),Uv=mv(Dv),qv=new Array(3).concat("fc8d59ffffbf99d594","d7191cfdae61abdda42b83ba","d7191cfdae61ffffbfabdda42b83ba","d53e4ffc8d59fee08be6f59899d5943288bd","d53e4ffc8d59fee08bffffbfe6f59899d5943288bd","d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd","d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd","9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2","9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(sv),Ov=mv(qv),Yv=new Array(3).concat("e5f5f999d8c92ca25f","edf8fbb2e2e266c2a4238b45","edf8fbb2e2e266c2a42ca25f006d2c","edf8fbccece699d8c966c2a42ca25f006d2c","edf8fbccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(sv),Bv=mv(Yv),Fv=new Array(3).concat("e0ecf49ebcda8856a7","edf8fbb3cde38c96c688419d","edf8fbb3cde38c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(sv),Iv=mv(Fv),Hv=new Array(3).concat("e0f3dba8ddb543a2ca","f0f9e8bae4bc7bccc42b8cbe","f0f9e8bae4bc7bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(sv),jv=mv(Hv),Xv=new Array(3).concat("fee8c8fdbb84e34a33","fef0d9fdcc8afc8d59d7301f","fef0d9fdcc8afc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(sv),Gv=mv(Xv),Vv=new Array(3).concat("ece2f0a6bddb1c9099","f6eff7bdc9e167a9cf02818a","f6eff7bdc9e167a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(sv),$v=mv(Vv),Wv=new Array(3).concat("ece7f2a6bddb2b8cbe","f1eef6bdc9e174a9cf0570b0","f1eef6bdc9e174a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(sv),Zv=mv(Wv),Qv=new Array(3).concat("e7e1efc994c7dd1c77","f1eef6d7b5d8df65b0ce1256","f1eef6d7b5d8df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(sv),Jv=mv(Qv),Kv=new Array(3).concat("fde0ddfa9fb5c51b8a","feebe2fbb4b9f768a1ae017e","feebe2fbb4b9f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(sv),tg=mv(Kv),ng=new Array(3).concat("edf8b17fcdbb2c7fb8","ffffcca1dab441b6c4225ea8","ffffcca1dab441b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(sv),eg=mv(ng),rg=new Array(3).concat("f7fcb9addd8e31a354","ffffccc2e69978c679238443","ffffccc2e69978c67931a354006837","ffffccd9f0a3addd8e78c67931a354006837","ffffccd9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(sv),ig=mv(rg),og=new Array(3).concat("fff7bcfec44fd95f0e","ffffd4fed98efe9929cc4c02","ffffd4fed98efe9929d95f0e993404","ffffd4fee391fec44ffe9929d95f0e993404","ffffd4fee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(sv),ag=mv(og),ug=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(sv),fg=mv(ug),cg=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(sv),sg=mv(cg),lg=new Array(3).concat("e5f5e0a1d99b31a354","edf8e9bae4b374c476238b45","edf8e9bae4b374c47631a354006d2c","edf8e9c7e9c0a1d99b74c47631a354006d2c","edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(sv),hg=mv(lg),dg=new Array(3).concat("f0f0f0bdbdbd636363","f7f7f7cccccc969696525252","f7f7f7cccccc969696636363252525","f7f7f7d9d9d9bdbdbd969696636363252525","f7f7f7d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(sv),pg=mv(dg),vg=new Array(3).concat("efedf5bcbddc756bb1","f2f0f7cbc9e29e9ac86a51a3","f2f0f7cbc9e29e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(sv),gg=mv(vg),yg=new Array(3).concat("fee0d2fc9272de2d26","fee5d9fcae91fb6a4acb181d","fee5d9fcae91fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(sv),_g=mv(yg),bg=new Array(3).concat("fee6cefdae6be6550d","feeddefdbe85fd8d3cd94701","feeddefdbe85fd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(sv),mg=mv(bg),xg=Ge(Kn(300,.5,0),Kn(-240,.5,1)),wg=Ge(Kn(-100,.75,.35),Kn(80,1.5,.8)),Mg=Ge(Kn(260,.75,.35),Kn(80,1.5,.8)),Ag=Kn();var Tg=bn(),Ng=Math.PI/3,Sg=2*Math.PI/3;function Eg(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}var kg=Eg(sv("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),Cg=Eg(sv("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),Pg=Eg(sv("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),zg=Eg(sv("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));function Rg(t){return function(){return t}}var Lg=Math.abs,Dg=Math.atan2,Ug=Math.cos,qg=Math.max,Og=Math.min,Yg=Math.sin,Bg=Math.sqrt,Fg=1e-12,Ig=Math.PI,Hg=Ig/2,jg=2*Ig;function Xg(t){return t>=1?Hg:t<=-1?-Hg:Math.asin(t)}function Gg(t){return t.innerRadius}function Vg(t){return t.outerRadius}function $g(t){return t.startAngle}function Wg(t){return t.endAngle}function Zg(t){return t&&t.padAngle}function Qg(t,n,e,r,i,o,a){var u=t-e,f=n-r,c=(a?o:-o)/Bg(u*u+f*f),s=c*f,l=-c*u,h=t+s,d=n+l,p=e+s,v=r+l,g=(h+p)/2,y=(d+v)/2,_=p-h,b=v-d,m=_*_+b*b,x=i-o,w=h*v-p*d,M=(b<0?-1:1)*Bg(qg(0,x*x*m-w*w)),A=(w*b-_*M)/m,T=(-w*_-b*M)/m,N=(w*b+_*M)/m,S=(-w*_+b*M)/m,E=A-g,k=T-y,C=N-g,P=S-y;return E*E+k*k>C*C+P*P&&(A=N,T=S),{cx:A,cy:T,x01:-s,y01:-l,x11:A*(i/x-1),y11:T*(i/x-1)}}function Jg(t){this._context=t}function Kg(t){return new Jg(t)}function ty(t){return t[0]}function ny(t){return t[1]}function ey(){var t=ty,n=ny,e=Rg(!0),r=null,i=Kg,o=null;function a(a){var u,f,c,s=a.length,l=!1;for(null==r&&(o=i(c=Gi())),u=0;u<=s;++u)!(u<s&&e(f=a[u],u,a))===l&&((l=!l)?o.lineStart():o.lineEnd()),l&&o.point(+t(f,u,a),+n(f,u,a));if(c)return o=null,c+""||null}return a.x=function(n){return arguments.length?(t="function"==typeof n?n:Rg(+n),a):t},a.y=function(t){return arguments.length?(n="function"==typeof t?t:Rg(+t),a):n},a.defined=function(t){return arguments.length?(e="function"==typeof t?t:Rg(!!t),a):e},a.curve=function(t){return arguments.length?(i=t,null!=r&&(o=i(r)),a):i},a.context=function(t){return arguments.length?(null==t?r=o=null:o=i(r=t),a):r},a}function ry(){var t=ty,n=null,e=Rg(0),r=ny,i=Rg(!0),o=null,a=Kg,u=null;function f(f){var c,s,l,h,d,p=f.length,v=!1,g=new Array(p),y=new Array(p);for(null==o&&(u=a(d=Gi())),c=0;c<=p;++c){if(!(c<p&&i(h=f[c],c,f))===v)if(v=!v)s=c,u.areaStart(),u.lineStart();else{for(u.lineEnd(),u.lineStart(),l=c-1;l>=s;--l)u.point(g[l],y[l]);u.lineEnd(),u.areaEnd()}v&&(g[c]=+t(h,c,f),y[c]=+e(h,c,f),u.point(n?+n(h,c,f):g[c],r?+r(h,c,f):y[c]))}if(d)return u=null,d+""||null}function c(){return ey().defined(i).curve(a).context(o)}return f.x=function(e){return arguments.length?(t="function"==typeof e?e:Rg(+e),n=null,f):t},f.x0=function(n){return arguments.length?(t="function"==typeof n?n:Rg(+n),f):t},f.x1=function(t){return arguments.length?(n=null==t?null:"function"==typeof t?t:Rg(+t),f):n},f.y=function(t){return arguments.length?(e="function"==typeof t?t:Rg(+t),r=null,f):e},f.y0=function(t){return arguments.length?(e="function"==typeof t?t:Rg(+t),f):e},f.y1=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:Rg(+t),f):r},f.lineX0=f.lineY0=function(){return c().x(t).y(e)},f.lineY1=function(){return c().x(t).y(r)},f.lineX1=function(){return c().x(n).y(e)},f.defined=function(t){return arguments.length?(i="function"==typeof t?t:Rg(!!t),f):i},f.curve=function(t){return arguments.length?(a=t,null!=o&&(u=a(o)),f):a},f.context=function(t){return arguments.length?(null==t?o=u=null:u=a(o=t),f):o},f}function iy(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function oy(t){return t}Jg.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var ay=fy(Kg);function uy(t){this._curve=t}function fy(t){function n(n){return new uy(t(n))}return n._curve=t,n}function cy(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(fy(t)):n()._curve},t}function sy(){return cy(ey().curve(ay))}function ly(){var t=ry().curve(ay),n=t.curve,e=t.lineX0,r=t.lineX1,i=t.lineY0,o=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return cy(e())},delete t.lineX0,t.lineEndAngle=function(){return cy(r())},delete t.lineX1,t.lineInnerRadius=function(){return cy(i())},delete t.lineY0,t.lineOuterRadius=function(){return cy(o())},delete t.lineY1,t.curve=function(t){return arguments.length?n(fy(t)):n()._curve},t}function hy(t,n){return[(n=+n)*Math.cos(t-=Math.PI/2),n*Math.sin(t)]}uy.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var dy=Array.prototype.slice;function py(t){return t.source}function vy(t){return t.target}function gy(t){var n=py,e=vy,r=ty,i=ny,o=null;function a(){var a,u=dy.call(arguments),f=n.apply(this,u),c=e.apply(this,u);if(o||(o=a=Gi()),t(o,+r.apply(this,(u[0]=f,u)),+i.apply(this,u),+r.apply(this,(u[0]=c,u)),+i.apply(this,u)),a)return o=null,a+""||null}return a.source=function(t){return arguments.length?(n=t,a):n},a.target=function(t){return arguments.length?(e=t,a):e},a.x=function(t){return arguments.length?(r="function"==typeof t?t:Rg(+t),a):r},a.y=function(t){return arguments.length?(i="function"==typeof t?t:Rg(+t),a):i},a.context=function(t){return arguments.length?(o=null==t?null:t,a):o},a}function yy(t,n,e,r,i){t.moveTo(n,e),t.bezierCurveTo(n=(n+r)/2,e,n,i,r,i)}function _y(t,n,e,r,i){t.moveTo(n,e),t.bezierCurveTo(n,e=(e+i)/2,r,e,r,i)}function by(t,n,e,r,i){var o=hy(n,e),a=hy(n,e=(e+i)/2),u=hy(r,e),f=hy(r,i);t.moveTo(o[0],o[1]),t.bezierCurveTo(a[0],a[1],u[0],u[1],f[0],f[1])}var my={draw:function(t,n){var e=Math.sqrt(n/Ig);t.moveTo(e,0),t.arc(0,0,e,0,jg)}},xy={draw:function(t,n){var e=Math.sqrt(n/5)/2;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),t.lineTo(e,-3*e),t.lineTo(e,-e),t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}},wy=Math.sqrt(1/3),My=2*wy,Ay={draw:function(t,n){var e=Math.sqrt(n/My),r=e*wy;t.moveTo(0,-e),t.lineTo(r,0),t.lineTo(0,e),t.lineTo(-r,0),t.closePath()}},Ty=Math.sin(Ig/10)/Math.sin(7*Ig/10),Ny=Math.sin(jg/10)*Ty,Sy=-Math.cos(jg/10)*Ty,Ey={draw:function(t,n){var e=Math.sqrt(.8908130915292852*n),r=Ny*e,i=Sy*e;t.moveTo(0,-e),t.lineTo(r,i);for(var o=1;o<5;++o){var a=jg*o/5,u=Math.cos(a),f=Math.sin(a);t.lineTo(f*e,-u*e),t.lineTo(u*r-f*i,f*r+u*i)}t.closePath()}},ky={draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}},Cy=Math.sqrt(3),Py={draw:function(t,n){var e=-Math.sqrt(n/(3*Cy));t.moveTo(0,2*e),t.lineTo(-Cy*e,-e),t.lineTo(Cy*e,-e),t.closePath()}},zy=Math.sqrt(3)/2,Ry=1/Math.sqrt(12),Ly=3*(Ry/2+1),Dy={draw:function(t,n){var e=Math.sqrt(n/Ly),r=e/2,i=e*Ry,o=r,a=e*Ry+e,u=-o,f=a;t.moveTo(r,i),t.lineTo(o,a),t.lineTo(u,f),t.lineTo(-.5*r-zy*i,zy*r+-.5*i),t.lineTo(-.5*o-zy*a,zy*o+-.5*a),t.lineTo(-.5*u-zy*f,zy*u+-.5*f),t.lineTo(-.5*r+zy*i,-.5*i-zy*r),t.lineTo(-.5*o+zy*a,-.5*a-zy*o),t.lineTo(-.5*u+zy*f,-.5*f-zy*u),t.closePath()}},Uy=[my,xy,Ay,ky,Ey,Py,Dy];function qy(){}function Oy(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function Yy(t){this._context=t}function By(t){this._context=t}function Fy(t){this._context=t}function Iy(t,n){this._basis=new Yy(t),this._beta=n}Yy.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:Oy(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:Oy(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},By.prototype={areaStart:qy,areaEnd:qy,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:this._point=3,this._x4=t,this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6);break;default:Oy(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},Fy.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var e=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+n)/6;this._line?this._context.lineTo(e,r):this._context.moveTo(e,r);break;case 3:this._point=4;default:Oy(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},Iy.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,e=t.length-1;if(e>0)for(var r,i=t[0],o=n[0],a=t[e]-i,u=n[e]-o,f=-1;++f<=e;)r=f/e,this._basis.point(this._beta*t[f]+(1-this._beta)*(i+r*a),this._beta*n[f]+(1-this._beta)*(o+r*u));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var Hy=function t(n){function e(t){return 1===n?new Yy(t):new Iy(t,n)}return e.beta=function(n){return t(+n)},e}(.85);function jy(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function Xy(t,n){this._context=t,this._k=(1-n)/6}Xy.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:jy(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:jy(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Gy=function t(n){function e(t){return new Xy(t,n)}return e.tension=function(n){return t(+n)},e}(0);function Vy(t,n){this._context=t,this._k=(1-n)/6}Vy.prototype={areaStart:qy,areaEnd:qy,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:jy(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var $y=function t(n){function e(t){return new Vy(t,n)}return e.tension=function(n){return t(+n)},e}(0);function Wy(t,n){this._context=t,this._k=(1-n)/6}Wy.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:jy(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Zy=function t(n){function e(t){return new Wy(t,n)}return e.tension=function(n){return t(+n)},e}(0);function Qy(t,n,e){var r=t._x1,i=t._y1,o=t._x2,a=t._y2;if(t._l01_a>Fg){var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,f=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/f,i=(i*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/f}if(t._l23_a>Fg){var c=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,s=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*c+t._x1*t._l23_2a-n*t._l12_2a)/s,a=(a*c+t._y1*t._l23_2a-e*t._l12_2a)/s}t._context.bezierCurveTo(r,i,o,a,t._x2,t._y2)}function Jy(t,n){this._context=t,this._alpha=n}Jy.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:Qy(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Ky=function t(n){function e(t){return n?new Jy(t,n):new Xy(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);function t_(t,n){this._context=t,this._alpha=n}t_.prototype={areaStart:qy,areaEnd:qy,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Qy(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var n_=function t(n){function e(t){return n?new t_(t,n):new Vy(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);function e_(t,n){this._context=t,this._alpha=n}e_.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Qy(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var r_=function t(n){function e(t){return n?new e_(t,n):new Wy(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);function i_(t){this._context=t}function o_(t){return t<0?-1:1}function a_(t,n,e){var r=t._x1-t._x0,i=n-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),a=(e-t._y1)/(i||r<0&&-0),u=(o*i+a*r)/(r+i);return(o_(o)+o_(a))*Math.min(Math.abs(o),Math.abs(a),.5*Math.abs(u))||0}function u_(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}function f_(t,n,e){var r=t._x0,i=t._y0,o=t._x1,a=t._y1,u=(o-r)/3;t._context.bezierCurveTo(r+u,i+u*n,o-u,a-u*e,o,a)}function c_(t){this._context=t}function s_(t){this._context=new l_(t)}function l_(t){this._context=t}function h_(t){this._context=t}function d_(t){var n,e,r=t.length-1,i=new Array(r),o=new Array(r),a=new Array(r);for(i[0]=0,o[0]=2,a[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,o[n]=4,a[n]=4*t[n]+2*t[n+1];for(i[r-1]=2,o[r-1]=7,a[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/o[n-1],o[n]-=e,a[n]-=e*a[n-1];for(i[r-1]=a[r-1]/o[r-1],n=r-2;n>=0;--n)i[n]=(a[n]-i[n+1])/o[n];for(o[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)o[n]=2*t[n+1]-i[n+1];return[i,o]}function p_(t,n){this._context=t,this._t=n}function v_(t,n){if((i=t.length)>1)for(var e,r,i,o=1,a=t[n[0]],u=a.length;o<i;++o)for(r=a,a=t[n[o]],e=0;e<u;++e)a[e][1]+=a[e][0]=isNaN(r[e][1])?r[e][0]:r[e][1]}function g_(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e}function y_(t,n){return t[n]}function __(t){var n=t.map(b_);return g_(t).sort(function(t,e){return n[t]-n[e]})}function b_(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n);return e}function m_(t){return function(){return t}}function x_(t){return t[0]}function w_(t){return t[1]}function M_(){this._=null}function A_(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function T_(t,n){var e=n,r=n.R,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function N_(t,n){var e=n,r=n.L,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function S_(t){for(;t.L;)t=t.L;return t}function E_(t,n,e,r){var i=[null,null],o=J_.push(i)-1;return i.left=t,i.right=n,e&&C_(i,t,n,e),r&&C_(i,n,t,r),Z_[t.index].halfedges.push(o),Z_[n.index].halfedges.push(o),i}function k_(t,n,e){var r=[n,e];return r.left=t,r}function C_(t,n,e,r){t[0]||t[1]?t.left===e?t[1]=r:t[0]=r:(t[0]=r,t.left=n,t.right=e)}function P_(t,n,e,r,i){var o,a=t[0],u=t[1],f=a[0],c=a[1],s=0,l=1,h=u[0]-f,d=u[1]-c;if(o=n-f,h||!(o>0)){if(o/=h,h<0){if(o<s)return;o<l&&(l=o)}else if(h>0){if(o>l)return;o>s&&(s=o)}if(o=r-f,h||!(o<0)){if(o/=h,h<0){if(o>l)return;o>s&&(s=o)}else if(h>0){if(o<s)return;o<l&&(l=o)}if(o=e-c,d||!(o>0)){if(o/=d,d<0){if(o<s)return;o<l&&(l=o)}else if(d>0){if(o>l)return;o>s&&(s=o)}if(o=i-c,d||!(o<0)){if(o/=d,d<0){if(o>l)return;o>s&&(s=o)}else if(d>0){if(o<s)return;o<l&&(l=o)}return!(s>0||l<1)||(s>0&&(t[0]=[f+s*h,c+s*d]),l<1&&(t[1]=[f+l*h,c+l*d]),!0)}}}}}function z_(t,n,e,r,i){var o=t[1];if(o)return!0;var a,u,f=t[0],c=t.left,s=t.right,l=c[0],h=c[1],d=s[0],p=s[1],v=(l+d)/2,g=(h+p)/2;if(p===h){if(v<n||v>=r)return;if(l>d){if(f){if(f[1]>=i)return}else f=[v,e];o=[v,i]}else{if(f){if(f[1]<e)return}else f=[v,i];o=[v,e]}}else if(u=g-(a=(l-d)/(p-h))*v,a<-1||a>1)if(l>d){if(f){if(f[1]>=i)return}else f=[(e-u)/a,e];o=[(i-u)/a,i]}else{if(f){if(f[1]<e)return}else f=[(i-u)/a,i];o=[(e-u)/a,e]}else if(h<p){if(f){if(f[0]>=r)return}else f=[n,a*n+u];o=[r,a*r+u]}else{if(f){if(f[0]<n)return}else f=[r,a*r+u];o=[n,a*n+u]}return t[0]=f,t[1]=o,!0}function R_(t,n){var e=t.site,r=n.left,i=n.right;return e===i&&(i=r,r=e),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(e===r?(r=n[1],i=n[0]):(r=n[0],i=n[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function L_(t,n){return n[+(n.left!==t.site)]}function D_(t,n){return n[+(n.left===t.site)]}i_.prototype={areaStart:qy,areaEnd:qy,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){t=+t,n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))}},c_.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:f_(this,this._t0,u_(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var e=NaN;if(n=+n,(t=+t)!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,f_(this,u_(this,e=a_(this,t,n)),e);break;default:f_(this,this._t0,e=a_(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=e}}},(s_.prototype=Object.create(c_.prototype)).point=function(t,n){c_.prototype.point.call(this,n,t)},l_.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,e,r,i,o){this._context.bezierCurveTo(n,t,r,e,o,i)}},h_.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,n=this._y,e=t.length;if(e)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),2===e)this._context.lineTo(t[1],n[1]);else for(var r=d_(t),i=d_(n),o=0,a=1;a<e;++o,++a)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[a],n[a]);(this._line||0!==this._line&&1===e)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}},p_.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}},M_.prototype={constructor:M_,insert:function(t,n){var e,r,i;if(t){if(n.P=t,n.N=t.N,t.N&&(t.N.P=n),t.N=n,t.R){for(t=t.R;t.L;)t=t.L;t.L=n}else t.R=n;e=t}else this._?(t=S_(this._),n.P=null,n.N=t,t.P=t.L=n,e=t):(n.P=n.N=null,this._=n,e=null);for(n.L=n.R=null,n.U=e,n.C=!0,t=n;e&&e.C;)e===(r=e.U).L?(i=r.R)&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.R&&(T_(this,e),e=(t=e).U),e.C=!1,r.C=!0,N_(this,r)):(i=r.L)&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.L&&(N_(this,e),e=(t=e).U),e.C=!1,r.C=!0,T_(this,r)),e=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var n,e,r,i=t.U,o=t.L,a=t.R;if(e=o?a?S_(a):o:a,i?i.L===t?i.L=e:i.R=e:this._=e,o&&a?(r=e.C,e.C=t.C,e.L=o,o.U=e,e!==a?(i=e.U,e.U=t.U,t=e.R,i.L=t,e.R=a,a.U=e):(e.U=i,i=e,t=e.R)):(r=t.C,t=e),t&&(t.U=i),!r)if(t&&t.C)t.C=!1;else{do{if(t===this._)break;if(t===i.L){if((n=i.R).C&&(n.C=!1,i.C=!0,T_(this,i),n=i.R),n.L&&n.L.C||n.R&&n.R.C){n.R&&n.R.C||(n.L.C=!1,n.C=!0,N_(this,n),n=i.R),n.C=i.C,i.C=n.R.C=!1,T_(this,i),t=this._;break}}else if((n=i.L).C&&(n.C=!1,i.C=!0,N_(this,i),n=i.L),n.L&&n.L.C||n.R&&n.R.C){n.L&&n.L.C||(n.R.C=!1,n.C=!0,T_(this,n),n=i.L),n.C=i.C,i.C=n.L.C=!1,N_(this,i),t=this._;break}n.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}};var U_,q_=[];function O_(){A_(this),this.x=this.y=this.arc=this.site=this.cy=null}function Y_(t){var n=t.P,e=t.N;if(n&&e){var r=n.site,i=t.site,o=e.site;if(r!==o){var a=i[0],u=i[1],f=r[0]-a,c=r[1]-u,s=o[0]-a,l=o[1]-u,h=2*(f*l-c*s);if(!(h>=-tb)){var d=f*f+c*c,p=s*s+l*l,v=(l*d-c*p)/h,g=(f*p-s*d)/h,y=q_.pop()||new O_;y.arc=t,y.site=i,y.x=v+a,y.y=(y.cy=g+u)+Math.sqrt(v*v+g*g),t.circle=y;for(var _=null,b=Q_._;b;)if(y.y<b.y||y.y===b.y&&y.x<=b.x){if(!b.L){_=b.P;break}b=b.L}else{if(!b.R){_=b;break}b=b.R}Q_.insert(_,y),_||(U_=y)}}}}function B_(t){var n=t.circle;n&&(n.P||(U_=n.N),Q_.remove(n),q_.push(n),A_(n),t.circle=null)}var F_=[];function I_(){A_(this),this.edge=this.site=this.circle=null}function H_(t){var n=F_.pop()||new I_;return n.site=t,n}function j_(t){B_(t),W_.remove(t),F_.push(t),A_(t)}function X_(t){var n=t.circle,e=n.x,r=n.cy,i=[e,r],o=t.P,a=t.N,u=[t];j_(t);for(var f=o;f.circle&&Math.abs(e-f.circle.x)<K_&&Math.abs(r-f.circle.cy)<K_;)o=f.P,u.unshift(f),j_(f),f=o;u.unshift(f),B_(f);for(var c=a;c.circle&&Math.abs(e-c.circle.x)<K_&&Math.abs(r-c.circle.cy)<K_;)a=c.N,u.push(c),j_(c),c=a;u.push(c),B_(c);var s,l=u.length;for(s=1;s<l;++s)c=u[s],f=u[s-1],C_(c.edge,f.site,c.site,i);f=u[0],(c=u[l-1]).edge=E_(f.site,c.site,null,i),Y_(f),Y_(c)}function G_(t){for(var n,e,r,i,o=t[0],a=t[1],u=W_._;u;)if((r=V_(u,a)-o)>K_)u=u.L;else{if(!((i=o-$_(u,a))>K_)){r>-K_?(n=u.P,e=u):i>-K_?(n=u,e=u.N):n=e=u;break}if(!u.R){n=u;break}u=u.R}!function(t){Z_[t.index]={site:t,halfedges:[]}}(t);var f=H_(t);if(W_.insert(n,f),n||e){if(n===e)return B_(n),e=H_(n.site),W_.insert(f,e),f.edge=e.edge=E_(n.site,f.site),Y_(n),void Y_(e);if(e){B_(n),B_(e);var c=n.site,s=c[0],l=c[1],h=t[0]-s,d=t[1]-l,p=e.site,v=p[0]-s,g=p[1]-l,y=2*(h*g-d*v),_=h*h+d*d,b=v*v+g*g,m=[(g*_-d*b)/y+s,(h*b-v*_)/y+l];C_(e.edge,c,p,m),f.edge=E_(c,t,null,m),e.edge=E_(t,p,null,m),Y_(n),Y_(e)}else f.edge=E_(n.site,f.site)}}function V_(t,n){var e=t.site,r=e[0],i=e[1],o=i-n;if(!o)return r;var a=t.P;if(!a)return-1/0;var u=(e=a.site)[0],f=e[1],c=f-n;if(!c)return u;var s=u-r,l=1/o-1/c,h=s/c;return l?(-h+Math.sqrt(h*h-2*l*(s*s/(-2*c)-f+c/2+i-o/2)))/l+r:(r+u)/2}function $_(t,n){var e=t.N;if(e)return V_(e,n);var r=t.site;return r[1]===n?r[0]:1/0}var W_,Z_,Q_,J_,K_=1e-6,tb=1e-12;function nb(t,n){return n[1]-t[1]||n[0]-t[0]}function eb(t,n){var e,r,i,o=t.sort(nb).pop();for(J_=[],Z_=new Array(t.length),W_=new M_,Q_=new M_;;)if(i=U_,o&&(!i||o[1]<i.y||o[1]===i.y&&o[0]<i.x))o[0]===e&&o[1]===r||(G_(o),e=o[0],r=o[1]),o=t.pop();else{if(!i)break;X_(i.arc)}if(function(){for(var t,n,e,r,i=0,o=Z_.length;i<o;++i)if((t=Z_[i])&&(r=(n=t.halfedges).length)){var a=new Array(r),u=new Array(r);for(e=0;e<r;++e)a[e]=e,u[e]=R_(t,J_[n[e]]);for(a.sort(function(t,n){return u[n]-u[t]}),e=0;e<r;++e)u[e]=n[a[e]];for(e=0;e<r;++e)n[e]=u[e]}}(),n){var a=+n[0][0],u=+n[0][1],f=+n[1][0],c=+n[1][1];!function(t,n,e,r){for(var i,o=J_.length;o--;)z_(i=J_[o],t,n,e,r)&&P_(i,t,n,e,r)&&(Math.abs(i[0][0]-i[1][0])>K_||Math.abs(i[0][1]-i[1][1])>K_)||delete J_[o]}(a,u,f,c),function(t,n,e,r){var i,o,a,u,f,c,s,l,h,d,p,v,g=Z_.length,y=!0;for(i=0;i<g;++i)if(o=Z_[i]){for(a=o.site,u=(f=o.halfedges).length;u--;)J_[f[u]]||f.splice(u,1);for(u=0,c=f.length;u<c;)p=(d=D_(o,J_[f[u]]))[0],v=d[1],l=(s=L_(o,J_[f[++u%c]]))[0],h=s[1],(Math.abs(p-l)>K_||Math.abs(v-h)>K_)&&(f.splice(u,0,J_.push(k_(a,d,Math.abs(p-t)<K_&&r-v>K_?[t,Math.abs(l-t)<K_?h:r]:Math.abs(v-r)<K_&&e-p>K_?[Math.abs(h-r)<K_?l:e,r]:Math.abs(p-e)<K_&&v-n>K_?[e,Math.abs(l-e)<K_?h:n]:Math.abs(v-n)<K_&&p-t>K_?[Math.abs(h-n)<K_?l:t,n]:null))-1),++c);c&&(y=!1)}if(y){var _,b,m,x=1/0;for(i=0,y=null;i<g;++i)(o=Z_[i])&&(m=(_=(a=o.site)[0]-t)*_+(b=a[1]-n)*b)<x&&(x=m,y=o);if(y){var w=[t,n],M=[t,r],A=[e,r],T=[e,n];y.halfedges.push(J_.push(k_(a=y.site,w,M))-1,J_.push(k_(a,M,A))-1,J_.push(k_(a,A,T))-1,J_.push(k_(a,T,w))-1)}}for(i=0;i<g;++i)(o=Z_[i])&&(o.halfedges.length||delete Z_[i])}(a,u,f,c)}this.edges=J_,this.cells=Z_,W_=Q_=J_=Z_=null}function rb(t){return function(){return t}}function ib(t,n,e){this.target=t,this.type=n,this.transform=e}function ob(t,n,e){this.k=t,this.x=n,this.y=e}eb.prototype={constructor:eb,polygons:function(){var t=this.edges;return this.cells.map(function(n){var e=n.halfedges.map(function(e){return L_(n,t[e])});return e.data=n.site.data,e})},triangles:function(){var t=[],n=this.edges;return this.cells.forEach(function(e,r){if(o=(i=e.halfedges).length)for(var i,o,a,u,f,c,s=e.site,l=-1,h=n[i[o-1]],d=h.left===s?h.right:h.left;++l<o;)a=d,d=(h=n[i[l]]).left===s?h.right:h.left,a&&d&&r<a.index&&r<d.index&&(f=a,c=d,((u=s)[0]-c[0])*(f[1]-u[1])-(u[0]-f[0])*(c[1]-u[1])<0)&&t.push([s.data,a.data,d.data])}),t},links:function(){return this.edges.filter(function(t){return t.right}).map(function(t){return{source:t.left.data,target:t.right.data}})},find:function(t,n,e){for(var r,i,o=this,a=o._found||0,u=o.cells.length;!(i=o.cells[a]);)if(++a>=u)return null;var f=t-i.site[0],c=n-i.site[1],s=f*f+c*c;do{i=o.cells[r=a],a=null,i.halfedges.forEach(function(e){var r=o.edges[e],u=r.left;if(u!==i.site&&u||(u=r.right)){var f=t-u[0],c=n-u[1],l=f*f+c*c;l<s&&(s=l,a=u.index)}})}while(null!==a);return o._found=r,null==e||s<=e*e?i.site:null}},ob.prototype={constructor:ob,scale:function(t){return 1===t?this:new ob(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new ob(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var ab=new ob(1,0,0);function ub(t){return t.__zoom||ab}function fb(){t.event.stopImmediatePropagation()}function cb(){t.event.preventDefault(),t.event.stopImmediatePropagation()}function sb(){return!t.event.button}function lb(){var t,n,e=this;return e instanceof SVGElement?(t=(e=e.ownerSVGElement||e).width.baseVal.value,n=e.height.baseVal.value):(t=e.clientWidth,n=e.clientHeight),[[0,0],[t,n]]}function hb(){return this.__zoom||ab}function db(){return-t.event.deltaY*(t.event.deltaMode?120:1)/500}function pb(){return"ontouchstart"in this}function vb(t,n,e){var r=t.invertX(n[0][0])-e[0][0],i=t.invertX(n[1][0])-e[1][0],o=t.invertY(n[0][1])-e[0][1],a=t.invertY(n[1][1])-e[1][1];return t.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),a>o?(o+a)/2:Math.min(0,o)||Math.max(0,a))}ub.prototype=ob.prototype,t.version="5.7.0",t.bisect=i,t.bisectRight=i,t.bisectLeft=o,t.ascending=n,t.bisector=e,t.cross=function(t,n,e){var r,i,o,u,f=t.length,c=n.length,s=new Array(f*c);for(null==e&&(e=a),r=o=0;r<f;++r)for(u=t[r],i=0;i<c;++i,++o)s[o]=e(u,n[i]);return s},t.descending=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},t.deviation=c,t.extent=s,t.histogram=function(){var t=v,n=s,e=M;function r(r){var o,a,u=r.length,f=new Array(u);for(o=0;o<u;++o)f[o]=t(r[o],o,r);var c=n(f),s=c[0],l=c[1],h=e(f,s,l);Array.isArray(h)||(h=w(s,l,h),h=g(Math.ceil(s/h)*h,l,h));for(var d=h.length;h[0]<=s;)h.shift(),--d;for(;h[d-1]>l;)h.pop(),--d;var p,v=new Array(d+1);for(o=0;o<=d;++o)(p=v[o]=[]).x0=o>0?h[o-1]:s,p.x1=o<d?h[o]:l;for(o=0;o<u;++o)s<=(a=f[o])&&a<=l&&v[i(h,a,0,d)].push(r[o]);return v}return r.value=function(n){return arguments.length?(t="function"==typeof n?n:p(n),r):t},r.domain=function(t){return arguments.length?(n="function"==typeof t?t:p([t[0],t[1]]),r):n},r.thresholds=function(t){return arguments.length?(e="function"==typeof t?t:Array.isArray(t)?p(h.call(t)):p(t),r):e},r},t.thresholdFreedmanDiaconis=function(t,e,r){return t=d.call(t,u).sort(n),Math.ceil((r-e)/(2*(A(t,.75)-A(t,.25))*Math.pow(t.length,-1/3)))},t.thresholdScott=function(t,n,e){return Math.ceil((e-n)/(3.5*c(t)*Math.pow(t.length,-1/3)))},t.thresholdSturges=M,t.max=T,t.mean=function(t,n){var e,r=t.length,i=r,o=-1,a=0;if(null==n)for(;++o<r;)isNaN(e=u(t[o]))?--i:a+=e;else for(;++o<r;)isNaN(e=u(n(t[o],o,t)))?--i:a+=e;if(i)return a/i},t.median=function(t,e){var r,i=t.length,o=-1,a=[];if(null==e)for(;++o<i;)isNaN(r=u(t[o]))||a.push(r);else for(;++o<i;)isNaN(r=u(e(t[o],o,t)))||a.push(r);return A(a.sort(n),.5)},t.merge=N,t.min=S,t.pairs=function(t,n){null==n&&(n=a);for(var e=0,r=t.length-1,i=t[0],o=new Array(r<0?0:r);e<r;)o[e]=n(i,i=t[++e]);return o},t.permute=function(t,n){for(var e=n.length,r=new Array(e);e--;)r[e]=t[n[e]];return r},t.quantile=A,t.range=g,t.scan=function(t,e){if(r=t.length){var r,i,o=0,a=0,u=t[a];for(null==e&&(e=n);++o<r;)(e(i=t[o],u)<0||0!==e(u,u))&&(u=i,a=o);return 0===e(u,u)?a:void 0}},t.shuffle=function(t,n,e){for(var r,i,o=(null==e?t.length:e)-(n=null==n?0:+n);o;)i=Math.random()*o--|0,r=t[o+n],t[o+n]=t[i+n],t[i+n]=r;return t},t.sum=function(t,n){var e,r=t.length,i=-1,o=0;if(null==n)for(;++i<r;)(e=+t[i])&&(o+=e);else for(;++i<r;)(e=+n(t[i],i,t))&&(o+=e);return o},t.ticks=m,t.tickIncrement=x,t.tickStep=w,t.transpose=E,t.variance=f,t.zip=function(){return E(arguments)},t.axisTop=function(t){return B(z,t)},t.axisRight=function(t){return B(R,t)},t.axisBottom=function(t){return B(L,t)},t.axisLeft=function(t){return B(D,t)},t.brush=function(){return Ri(wi)},t.brushX=function(){return Ri(mi)},t.brushY=function(){return Ri(xi)},t.brushSelection=function(t){var n=t.__brush;return n?n.dim.output(n.selection):null},t.chord=function(){var t=0,n=null,e=null,r=null;function i(i){var o,a,u,f,c,s,l=i.length,h=[],d=g(l),p=[],v=[],y=v.groups=new Array(l),_=new Array(l*l);for(o=0,c=-1;++c<l;){for(a=0,s=-1;++s<l;)a+=i[c][s];h.push(a),p.push(g(l)),o+=a}for(n&&d.sort(function(t,e){return n(h[t],h[e])}),e&&p.forEach(function(t,n){t.sort(function(t,r){return e(i[n][t],i[n][r])})}),f=(o=Yi(0,Oi-t*l)/o)?t:Oi/l,a=0,c=-1;++c<l;){for(u=a,s=-1;++s<l;){var b=d[c],m=p[b][s],x=i[b][m],w=a,M=a+=x*o;_[m*l+b]={index:b,subindex:m,startAngle:w,endAngle:M,value:x}}y[b]={index:b,startAngle:u,endAngle:a,value:h[b]},a+=f}for(c=-1;++c<l;)for(s=c-1;++s<l;){var A=_[s*l+c],T=_[c*l+s];(A.value||T.value)&&v.push(A.value<T.value?{source:T,target:A}:{source:A,target:T})}return r?v.sort(r):v}return i.padAngle=function(n){return arguments.length?(t=Yi(0,n),i):t},i.sortGroups=function(t){return arguments.length?(n=t,i):n},i.sortSubgroups=function(t){return arguments.length?(e=t,i):e},i.sortChords=function(t){return arguments.length?(null==t?r=null:(n=t,r=function(t,e){return n(t.source.value+t.target.value,e.source.value+e.target.value)})._=t,i):r&&r._;var n},i},t.ribbon=function(){var t=Vi,n=$i,e=Wi,r=Zi,i=Qi,o=null;function a(){var a,u=Bi.call(arguments),f=t.apply(this,u),c=n.apply(this,u),s=+e.apply(this,(u[0]=f,u)),l=r.apply(this,u)-qi,h=i.apply(this,u)-qi,d=s*Li(l),p=s*Di(l),v=+e.apply(this,(u[0]=c,u)),g=r.apply(this,u)-qi,y=i.apply(this,u)-qi;if(o||(o=a=Gi()),o.moveTo(d,p),o.arc(0,0,s,l,h),l===g&&h===y||(o.quadraticCurveTo(0,0,v*Li(g),v*Di(g)),o.arc(0,0,v,g,y)),o.quadraticCurveTo(0,0,d,p),o.closePath(),a)return o=null,a+""||null}return a.radius=function(t){return arguments.length?(e="function"==typeof t?t:Fi(+t),a):e},a.startAngle=function(t){return arguments.length?(r="function"==typeof t?t:Fi(+t),a):r},a.endAngle=function(t){return arguments.length?(i="function"==typeof t?t:Fi(+t),a):i},a.source=function(n){return arguments.length?(t=n,a):t},a.target=function(t){return arguments.length?(n=t,a):n},a.context=function(t){return arguments.length?(o=null==t?null:t,a):o},a},t.nest=function(){var t,n,e,r=[],i=[];function o(e,i,a,u){if(i>=r.length)return null!=t&&e.sort(t),null!=n?n(e):e;for(var f,c,s,l=-1,h=e.length,d=r[i++],p=Ki(),v=a();++l<h;)(s=p.get(f=d(c=e[l])+""))?s.push(c):p.set(f,[c]);return p.each(function(t,n){u(v,n,o(t,i,a,u))}),v}return e={object:function(t){return o(t,0,to,no)},map:function(t){return o(t,0,eo,ro)},entries:function(t){return function t(e,o){if(++o>r.length)return e;var a,u=i[o-1];return null!=n&&o>=r.length?a=e.entries():(a=[],e.each(function(n,e){a.push({key:e,values:t(n,o)})})),null!=u?a.sort(function(t,n){return u(t.key,n.key)}):a}(o(t,0,eo,ro),0)},key:function(t){return r.push(t),e},sortKeys:function(t){return i[r.length-1]=t,e},sortValues:function(n){return t=n,e},rollup:function(t){return n=t,e}}},t.set=ao,t.map=Ki,t.keys=function(t){var n=[];for(var e in t)n.push(e);return n},t.values=function(t){var n=[];for(var e in t)n.push(t[e]);return n},t.entries=function(t){var n=[];for(var e in t)n.push({key:e,value:t[e]});return n},t.color=vn,t.rgb=bn,t.hsl=Mn,t.lab=Un,t.hcl=Hn,t.lch=function(t,n,e,r){return 1===arguments.length?In(t):new jn(e,n,t,null==r?1:r)},t.gray=function(t,n){return new qn(t,0,0,null==n?1:n)},t.cubehelix=Kn,t.contours=go,t.contourDensity=function(){var t=bo,n=mo,e=xo,r=960,i=500,o=20,a=2,u=3*o,f=r+2*u>>a,c=i+2*u>>a,s=co(20);function l(r){var i=new Float32Array(f*c),l=new Float32Array(f*c);r.forEach(function(r,o,s){var l=+t(r,o,s)+u>>a,h=+n(r,o,s)+u>>a,d=+e(r,o,s);l>=0&&l<f&&h>=0&&h<c&&(i[l+h*f]+=d)}),yo({width:f,height:c,data:i},{width:f,height:c,data:l},o>>a),_o({width:f,height:c,data:l},{width:f,height:c,data:i},o>>a),yo({width:f,height:c,data:i},{width:f,height:c,data:l},o>>a),_o({width:f,height:c,data:l},{width:f,height:c,data:i},o>>a),yo({width:f,height:c,data:i},{width:f,height:c,data:l},o>>a),_o({width:f,height:c,data:l},{width:f,height:c,data:i},o>>a);var d=s(i);if(!Array.isArray(d)){var p=T(i);d=w(0,p,d),(d=g(0,Math.floor(p/d)*d,d)).shift()}return go().thresholds(d).size([f,c])(i).map(h)}function h(t){return t.value*=Math.pow(2,-2*a),t.coordinates.forEach(d),t}function d(t){t.forEach(p)}function p(t){t.forEach(v)}function v(t){t[0]=t[0]*Math.pow(2,a)-u,t[1]=t[1]*Math.pow(2,a)-u}function y(){return f=r+2*(u=3*o)>>a,c=i+2*u>>a,l}return l.x=function(n){return arguments.length?(t="function"==typeof n?n:co(+n),l):t},l.y=function(t){return arguments.length?(n="function"==typeof t?t:co(+t),l):n},l.weight=function(t){return arguments.length?(e="function"==typeof t?t:co(+t),l):e},l.size=function(t){if(!arguments.length)return[r,i];var n=Math.ceil(t[0]),e=Math.ceil(t[1]);if(!(n>=0||n>=0))throw new Error("invalid size");return r=n,i=e,y()},l.cellSize=function(t){if(!arguments.length)return 1<<a;if(!((t=+t)>=1))throw new Error("invalid cell size");return a=Math.floor(Math.log(t)/Math.LN2),y()},l.thresholds=function(t){return arguments.length?(s="function"==typeof t?t:Array.isArray(t)?co(uo.call(t)):co(t),l):s},l.bandwidth=function(t){if(!arguments.length)return Math.sqrt(o*(o+1));if(!((t=+t)>=0))throw new Error("invalid bandwidth");return o=Math.round((Math.sqrt(4*t*t+1)-1)/2),y()},l},t.dispatch=I,t.drag=function(){var n,e,r,i,o=Wt,a=Zt,u=Qt,f=Jt,c={},s=I("start","drag","end"),l=0,h=0;function d(t){t.on("mousedown.drag",p).filter(f).on("touchstart.drag",y).on("touchmove.drag",_).on("touchend.drag touchcancel.drag",b).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function p(){if(!i&&o.apply(this,arguments)){var u=m("mouse",a.apply(this,arguments),Ft,this,arguments);u&&(Dt(t.event.view).on("mousemove.drag",v,!0).on("mouseup.drag",g,!0),Xt(t.event.view),Ht(),r=!1,n=t.event.clientX,e=t.event.clientY,u("start"))}}function v(){if(jt(),!r){var i=t.event.clientX-n,o=t.event.clientY-e;r=i*i+o*o>h}c.mouse("drag")}function g(){Dt(t.event.view).on("mousemove.drag mouseup.drag",null),Gt(t.event.view,r),jt(),c.mouse("end")}function y(){if(o.apply(this,arguments)){var n,e,r=t.event.changedTouches,i=a.apply(this,arguments),u=r.length;for(n=0;n<u;++n)(e=m(r[n].identifier,i,It,this,arguments))&&(Ht(),e("start"))}}function _(){var n,e,r=t.event.changedTouches,i=r.length;for(n=0;n<i;++n)(e=c[r[n].identifier])&&(jt(),e("drag"))}function b(){var n,e,r=t.event.changedTouches,o=r.length;for(i&&clearTimeout(i),i=setTimeout(function(){i=null},500),n=0;n<o;++n)(e=c[r[n].identifier])&&(Ht(),e("end"))}function m(n,e,r,i,o){var a,f,h,p=r(e,n),v=s.copy();if(Ct(new $t(d,"beforestart",a,n,l,p[0],p[1],0,0,v),function(){return null!=(t.event.subject=a=u.apply(i,o))&&(f=a.x-p[0]||0,h=a.y-p[1]||0,!0)}))return function t(u){var s,g=p;switch(u){case"start":c[n]=t,s=l++;break;case"end":delete c[n],--l;case"drag":p=r(e,n),s=l}Ct(new $t(d,u,a,n,s,p[0]+f,p[1]+h,p[0]-g[0],p[1]-g[1],v),v.apply,v,[u,i,o])}}return d.filter=function(t){return arguments.length?(o="function"==typeof t?t:Vt(!!t),d):o},d.container=function(t){return arguments.length?(a="function"==typeof t?t:Vt(t),d):a},d.subject=function(t){return arguments.length?(u="function"==typeof t?t:Vt(t),d):u},d.touchable=function(t){return arguments.length?(f="function"==typeof t?t:Vt(!!t),d):f},d.on=function(){var t=s.on.apply(s,arguments);return t===s?d:t},d.clickDistance=function(t){return arguments.length?(h=(t=+t)*t,d):Math.sqrt(h)},d},t.dragDisable=Xt,t.dragEnable=Gt,t.dsvFormat=Eo,t.csvParse=Co,t.csvParseRows=Po,t.csvFormat=zo,t.csvFormatRows=Ro,t.tsvParse=Do,t.tsvParseRows=Uo,t.tsvFormat=qo,t.tsvFormatRows=Oo,t.easeLinear=function(t){return+t},t.easeQuad=Dr,t.easeQuadIn=function(t){return t*t},t.easeQuadOut=function(t){return t*(2-t)},t.easeQuadInOut=Dr,t.easeCubic=Ur,t.easeCubicIn=function(t){return t*t*t},t.easeCubicOut=function(t){return--t*t*t+1},t.easeCubicInOut=Ur,t.easePoly=Yr,t.easePolyIn=qr,t.easePolyOut=Or,t.easePolyInOut=Yr,t.easeSin=Ir,t.easeSinIn=function(t){return 1-Math.cos(t*Fr)},t.easeSinOut=function(t){return Math.sin(t*Fr)},t.easeSinInOut=Ir,t.easeExp=Hr,t.easeExpIn=function(t){return Math.pow(2,10*t-10)},t.easeExpOut=function(t){return 1-Math.pow(2,-10*t)},t.easeExpInOut=Hr,t.easeCircle=jr,t.easeCircleIn=function(t){return 1-Math.sqrt(1-t*t)},t.easeCircleOut=function(t){return Math.sqrt(1- --t*t)},t.easeCircleInOut=jr,t.easeBounce=ni,t.easeBounceIn=function(t){return 1-ni(1-t)},t.easeBounceOut=ni,t.easeBounceInOut=function(t){return((t*=2)<=1?1-ni(1-t):ni(t-1)+1)/2},t.easeBack=ii,t.easeBackIn=ei,t.easeBackOut=ri,t.easeBackInOut=ii,t.easeElastic=ui,t.easeElasticIn=ai,t.easeElasticOut=ui,t.easeElasticInOut=fi,t.blob=function(t,n){return fetch(t,n).then(Yo)},t.buffer=function(t,n){return fetch(t,n).then(Bo)},t.dsv=function(t,n,e,r){3===arguments.length&&"function"==typeof e&&(r=e,e=void 0);var i=Eo(t);return Io(n,e).then(function(t){return i.parse(t,r)})},t.csv=jo,t.tsv=Xo,t.image=function(t,n){return new Promise(function(e,r){var i=new Image;for(var o in n)i[o]=n[o];i.onerror=r,i.onload=function(){e(i)},i.src=t})},t.json=function(t,n){return fetch(t,n).then(Go)},t.text=Io,t.xml=$o,t.html=Wo,t.svg=Zo,t.forceCenter=function(t,n){var e;function r(){var r,i,o=e.length,a=0,u=0;for(r=0;r<o;++r)a+=(i=e[r]).x,u+=i.y;for(a=a/o-t,u=u/o-n,r=0;r<o;++r)(i=e[r]).x-=a,i.y-=u}return null==t&&(t=0),null==n&&(n=0),r.initialize=function(t){e=t},r.x=function(n){return arguments.length?(t=+n,r):t},r.y=function(t){return arguments.length?(n=+t,r):n},r},t.forceCollide=function(t){var n,e,r=1,i=1;function o(){for(var t,o,u,f,c,s,l,h=n.length,d=0;d<i;++d)for(o=ra(n,ua,fa).visitAfter(a),t=0;t<h;++t)u=n[t],s=e[u.index],l=s*s,f=u.x+u.vx,c=u.y+u.vy,o.visit(p);function p(t,n,e,i,o){var a=t.data,h=t.r,d=s+h;if(!a)return n>f+d||i<f-d||e>c+d||o<c-d;if(a.index>u.index){var p=f-a.x-a.vx,v=c-a.y-a.vy,g=p*p+v*v;g<d*d&&(0===p&&(g+=(p=Jo())*p),0===v&&(g+=(v=Jo())*v),g=(d-(g=Math.sqrt(g)))/g*r,u.vx+=(p*=g)*(d=(h*=h)/(l+h)),u.vy+=(v*=g)*d,a.vx-=p*(d=1-d),a.vy-=v*d)}}}function a(t){if(t.data)return t.r=e[t.data.index];for(var n=t.r=0;n<4;++n)t[n]&&t[n].r>t.r&&(t.r=t[n].r)}function u(){if(n){var r,i,o=n.length;for(e=new Array(o),r=0;r<o;++r)i=n[r],e[i.index]=+t(i,r,n)}}return"function"!=typeof t&&(t=Qo(null==t?1:+t)),o.initialize=function(t){n=t,u()},o.iterations=function(t){return arguments.length?(i=+t,o):i},o.strength=function(t){return arguments.length?(r=+t,o):r},o.radius=function(n){return arguments.length?(t="function"==typeof n?n:Qo(+n),u(),o):t},o},t.forceLink=function(t){var n,e,r,i,o,a=ca,u=function(t){return 1/Math.min(i[t.source.index],i[t.target.index])},f=Qo(30),c=1;function s(r){for(var i=0,a=t.length;i<c;++i)for(var u,f,s,l,h,d,p,v=0;v<a;++v)f=(u=t[v]).source,l=(s=u.target).x+s.vx-f.x-f.vx||Jo(),h=s.y+s.vy-f.y-f.vy||Jo(),l*=d=((d=Math.sqrt(l*l+h*h))-e[v])/d*r*n[v],h*=d,s.vx-=l*(p=o[v]),s.vy-=h*p,f.vx+=l*(p=1-p),f.vy+=h*p}function l(){if(r){var u,f,c=r.length,s=t.length,l=Ki(r,a);for(u=0,i=new Array(c);u<s;++u)(f=t[u]).index=u,"object"!=typeof f.source&&(f.source=sa(l,f.source)),"object"!=typeof f.target&&(f.target=sa(l,f.target)),i[f.source.index]=(i[f.source.index]||0)+1,i[f.target.index]=(i[f.target.index]||0)+1;for(u=0,o=new Array(s);u<s;++u)f=t[u],o[u]=i[f.source.index]/(i[f.source.index]+i[f.target.index]);n=new Array(s),h(),e=new Array(s),d()}}function h(){if(r)for(var e=0,i=t.length;e<i;++e)n[e]=+u(t[e],e,t)}function d(){if(r)for(var n=0,i=t.length;n<i;++n)e[n]=+f(t[n],n,t)}return null==t&&(t=[]),s.initialize=function(t){r=t,l()},s.links=function(n){return arguments.length?(t=n,l(),s):t},s.id=function(t){return arguments.length?(a=t,s):a},s.iterations=function(t){return arguments.length?(c=+t,s):c},s.strength=function(t){return arguments.length?(u="function"==typeof t?t:Qo(+t),h(),s):u},s.distance=function(t){return arguments.length?(f="function"==typeof t?t:Qo(+t),d(),s):f},s},t.forceManyBody=function(){var t,n,e,r,i=Qo(-30),o=1,a=1/0,u=.81;function f(r){var i,o=t.length,a=ra(t,la,ha).visitAfter(s);for(e=r,i=0;i<o;++i)n=t[i],a.visit(l)}function c(){if(t){var n,e,o=t.length;for(r=new Array(o),n=0;n<o;++n)e=t[n],r[e.index]=+i(e,n,t)}}function s(t){var n,e,i,o,a,u=0,f=0;if(t.length){for(i=o=a=0;a<4;++a)(n=t[a])&&(e=Math.abs(n.value))&&(u+=n.value,f+=e,i+=e*n.x,o+=e*n.y);t.x=i/f,t.y=o/f}else{(n=t).x=n.data.x,n.y=n.data.y;do{u+=r[n.data.index]}while(n=n.next)}t.value=u}function l(t,i,f,c){if(!t.value)return!0;var s=t.x-n.x,l=t.y-n.y,h=c-i,d=s*s+l*l;if(h*h/u<d)return d<a&&(0===s&&(d+=(s=Jo())*s),0===l&&(d+=(l=Jo())*l),d<o&&(d=Math.sqrt(o*d)),n.vx+=s*t.value*e/d,n.vy+=l*t.value*e/d),!0;if(!(t.length||d>=a)){(t.data!==n||t.next)&&(0===s&&(d+=(s=Jo())*s),0===l&&(d+=(l=Jo())*l),d<o&&(d=Math.sqrt(o*d)));do{t.data!==n&&(h=r[t.data.index]*e/d,n.vx+=s*h,n.vy+=l*h)}while(t=t.next)}}return f.initialize=function(n){t=n,c()},f.strength=function(t){return arguments.length?(i="function"==typeof t?t:Qo(+t),c(),f):i},f.distanceMin=function(t){return arguments.length?(o=t*t,f):Math.sqrt(o)},f.distanceMax=function(t){return arguments.length?(a=t*t,f):Math.sqrt(a)},f.theta=function(t){return arguments.length?(u=t*t,f):Math.sqrt(u)},f},t.forceRadial=function(t,n,e){var r,i,o,a=Qo(.1);function u(t){for(var a=0,u=r.length;a<u;++a){var f=r[a],c=f.x-n||1e-6,s=f.y-e||1e-6,l=Math.sqrt(c*c+s*s),h=(o[a]-l)*i[a]*t/l;f.vx+=c*h,f.vy+=s*h}}function f(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)o[n]=+t(r[n],n,r),i[n]=isNaN(o[n])?0:+a(r[n],n,r)}}return"function"!=typeof t&&(t=Qo(+t)),null==n&&(n=0),null==e&&(e=0),u.initialize=function(t){r=t,f()},u.strength=function(t){return arguments.length?(a="function"==typeof t?t:Qo(+t),f(),u):a},u.radius=function(n){return arguments.length?(t="function"==typeof n?n:Qo(+n),f(),u):t},u.x=function(t){return arguments.length?(n=+t,u):n},u.y=function(t){return arguments.length?(e=+t,u):e},u},t.forceSimulation=function(t){var n,e=1,r=.001,i=1-Math.pow(r,1/300),o=0,a=.6,u=Ki(),f=ur(s),c=I("tick","end");function s(){l(),c.call("tick",n),e<r&&(f.stop(),c.call("end",n))}function l(){var n,r,f=t.length;for(e+=(o-e)*i,u.each(function(t){t(e)}),n=0;n<f;++n)null==(r=t[n]).fx?r.x+=r.vx*=a:(r.x=r.fx,r.vx=0),null==r.fy?r.y+=r.vy*=a:(r.y=r.fy,r.vy=0)}function h(){for(var n,e=0,r=t.length;e<r;++e){if((n=t[e]).index=e,isNaN(n.x)||isNaN(n.y)){var i=da*Math.sqrt(e),o=e*pa;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}function d(n){return n.initialize&&n.initialize(t),n}return null==t&&(t=[]),h(),n={tick:l,restart:function(){return f.restart(s),n},stop:function(){return f.stop(),n},nodes:function(e){return arguments.length?(t=e,h(),u.each(d),n):t},alpha:function(t){return arguments.length?(e=+t,n):e},alphaMin:function(t){return arguments.length?(r=+t,n):r},alphaDecay:function(t){return arguments.length?(i=+t,n):+i},alphaTarget:function(t){return arguments.length?(o=+t,n):o},velocityDecay:function(t){return arguments.length?(a=1-t,n):1-a},force:function(t,e){return arguments.length>1?(null==e?u.remove(t):u.set(t,d(e)),n):u.get(t)},find:function(n,e,r){var i,o,a,u,f,c=0,s=t.length;for(null==r?r=1/0:r*=r,c=0;c<s;++c)(a=(i=n-(u=t[c]).x)*i+(o=e-u.y)*o)<r&&(f=u,r=a);return f},on:function(t,e){return arguments.length>1?(c.on(t,e),n):c.on(t)}}},t.forceX=function(t){var n,e,r,i=Qo(.1);function o(t){for(var i,o=0,a=n.length;o<a;++o)(i=n[o]).vx+=(r[o]-i.x)*e[o]*t}function a(){if(n){var o,a=n.length;for(e=new Array(a),r=new Array(a),o=0;o<a;++o)e[o]=isNaN(r[o]=+t(n[o],o,n))?0:+i(n[o],o,n)}}return"function"!=typeof t&&(t=Qo(null==t?0:+t)),o.initialize=function(t){n=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:Qo(+t),a(),o):i},o.x=function(n){return arguments.length?(t="function"==typeof n?n:Qo(+n),a(),o):t},o},t.forceY=function(t){var n,e,r,i=Qo(.1);function o(t){for(var i,o=0,a=n.length;o<a;++o)(i=n[o]).vy+=(r[o]-i.y)*e[o]*t}function a(){if(n){var o,a=n.length;for(e=new Array(a),r=new Array(a),o=0;o<a;++o)e[o]=isNaN(r[o]=+t(n[o],o,n))?0:+i(n[o],o,n)}}return"function"!=typeof t&&(t=Qo(null==t?0:+t)),o.initialize=function(t){n=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:Qo(+t),a(),o):i},o.y=function(n){return arguments.length?(t="function"==typeof n?n:Qo(+n),a(),o):t},o},t.formatDefaultLocale=Sa,t.formatLocale=Na,t.formatSpecifier=ba,t.precisionFixed=Ea,t.precisionPrefix=ka,t.precisionRound=Ca,t.geoArea=function(t){return yu.reset(),su(t,_u),2*yu},t.geoBounds=function(t){var n,e,r,i,o,a,u;if(Ru=zu=-(Cu=Pu=1/0),Ou=[],su(t,rf),e=Ou.length){for(Ou.sort(df),n=1,o=[r=Ou[0]];n<e;++n)pf(r,(i=Ou[n])[0])||pf(r,i[1])?(hf(r[0],i[1])>hf(r[0],r[1])&&(r[1]=i[1]),hf(i[0],r[1])>hf(r[0],r[1])&&(r[0]=i[0])):o.push(r=i);for(a=-1/0,n=0,r=o[e=o.length-1];n<=e;r=i,++n)i=o[n],(u=hf(r[1],i[0]))>a&&(a=u,Cu=i[0],zu=r[1])}return Ou=Yu=null,Cu===1/0||Pu===1/0?[[NaN,NaN],[NaN,NaN]]:[[Cu,Pu],[zu,Ru]]},t.geoCentroid=function(t){Bu=Fu=Iu=Hu=ju=Xu=Gu=Vu=$u=Wu=Zu=0,su(t,vf);var n=$u,e=Wu,r=Zu,i=n*n+e*e+r*r;return i<Ua&&(n=Xu,e=Gu,r=Vu,Fu<Da&&(n=Iu,e=Hu,r=ju),(i=n*n+e*e+r*r)<Ua)?[NaN,NaN]:[Xa(e,n)*Fa,eu(r/Ka(i))*Fa]},t.geoCircle=function(){var t,n,e=Nf([0,0]),r=Nf(90),i=Nf(6),o={point:function(e,r){t.push(e=n(e,r)),e[0]*=Fa,e[1]*=Fa}};function a(){var a=e.apply(this,arguments),u=r.apply(this,arguments)*Ia,f=i.apply(this,arguments)*Ia;return t=[],n=kf(-a[0]*Ia,-a[1]*Ia,0).invert,Lf(o,u,f,1),a={type:"Polygon",coordinates:[t]},t=n=null,a}return a.center=function(t){return arguments.length?(e="function"==typeof t?t:Nf([+t[0],+t[1]]),a):e},a.radius=function(t){return arguments.length?(r="function"==typeof t?t:Nf(+t),a):r},a.precision=function(t){return arguments.length?(i="function"==typeof t?t:Nf(+t),a):i},a},t.geoClipAntimeridian=Gf,t.geoClipCircle=Vf,t.geoClipExtent=function(){var t,n,e,r=0,i=0,o=960,a=500;return e={stream:function(e){return t&&n===e?t:t=Zf(r,i,o,a)(n=e)},extent:function(u){return arguments.length?(r=+u[0][0],i=+u[0][1],o=+u[1][0],a=+u[1][1],t=n=null,e):[[r,i],[o,a]]}}},t.geoClipRectangle=Zf,t.geoContains=function(t,n){return(t&&cc.hasOwnProperty(t.type)?cc[t.type]:lc)(t,n)},t.geoDistance=fc,t.geoGraticule=bc,t.geoGraticule10=function(){return bc()()},t.geoInterpolate=function(t,n){var e=t[0]*Ia,r=t[1]*Ia,i=n[0]*Ia,o=n[1]*Ia,a=Ga(r),u=Qa(r),f=Ga(o),c=Qa(o),s=a*Ga(e),l=a*Qa(e),h=f*Ga(i),d=f*Qa(i),p=2*eu(Ka(ru(o-r)+a*f*ru(i-e))),v=Qa(p),g=p?function(t){var n=Qa(t*=p)/v,e=Qa(p-t)/v,r=e*s+n*h,i=e*l+n*d,o=e*u+n*c;return[Xa(i,r)*Fa,Xa(o,Ka(r*r+i*i))*Fa]}:function(){return[e*Fa,r*Fa]};return g.distance=p,g},t.geoLength=oc,t.geoPath=function(t,n){var e,r,i=4.5;function o(t){return t&&("function"==typeof i&&r.pointRadius(+i.apply(this,arguments)),su(t,e(r))),r.result()}return o.area=function(t){return su(t,e(Sc)),Sc.result()},o.measure=function(t){return su(t,e(ds)),ds.result()},o.bounds=function(t){return su(t,e(Uc)),Uc.result()},o.centroid=function(t){return su(t,e(Zc)),Zc.result()},o.projection=function(n){return arguments.length?(e=null==n?(t=null,mc):(t=n).stream,o):t},o.context=function(t){return arguments.length?(r=null==t?(n=null,new gs):new as(n=t),"function"!=typeof i&&r.pointRadius(i),o):n},o.pointRadius=function(t){return arguments.length?(i="function"==typeof t?t:(r.pointRadius(+t),+t),o):i},o.projection(t).context(n)},t.geoAlbers=Ds,t.geoAlbersUsa=function(){var t,n,e,r,i,o,a=Ds(),u=Ls().rotate([154,0]).center([-2,58.5]).parallels([55,65]),f=Ls().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(t,n){o=[t,n]}};function s(t){var n=t[0],a=t[1];return o=null,e.point(n,a),o||(r.point(n,a),o)||(i.point(n,a),o)}function l(){return t=n=null,s}return s.invert=function(t){var n=a.scale(),e=a.translate(),r=(t[0]-e[0])/n,i=(t[1]-e[1])/n;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?u:i>=.166&&i<.234&&r>=-.214&&r<-.115?f:a).invert(t)},s.stream=function(e){return t&&n===e?t:(r=[a.stream(n=e),u.stream(e),f.stream(e)],i=r.length,t={point:function(t,n){for(var e=-1;++e<i;)r[e].point(t,n)},sphere:function(){for(var t=-1;++t<i;)r[t].sphere()},lineStart:function(){for(var t=-1;++t<i;)r[t].lineStart()},lineEnd:function(){for(var t=-1;++t<i;)r[t].lineEnd()},polygonStart:function(){for(var t=-1;++t<i;)r[t].polygonStart()},polygonEnd:function(){for(var t=-1;++t<i;)r[t].polygonEnd()}});var r,i},s.precision=function(t){return arguments.length?(a.precision(t),u.precision(t),f.precision(t),l()):a.precision()},s.scale=function(t){return arguments.length?(a.scale(t),u.scale(.35*t),f.scale(t),s.translate(a.translate())):a.scale()},s.translate=function(t){if(!arguments.length)return a.translate();var n=a.scale(),o=+t[0],s=+t[1];return e=a.translate(t).clipExtent([[o-.455*n,s-.238*n],[o+.455*n,s+.238*n]]).stream(c),r=u.translate([o-.307*n,s+.201*n]).clipExtent([[o-.425*n+Da,s+.12*n+Da],[o-.214*n-Da,s+.234*n-Da]]).stream(c),i=f.translate([o-.205*n,s+.212*n]).clipExtent([[o-.214*n+Da,s+.166*n+Da],[o-.115*n-Da,s+.234*n-Da]]).stream(c),l()},s.fitExtent=function(t,n){return xs(s,t,n)},s.fitSize=function(t,n){return ws(s,t,n)},s.fitWidth=function(t,n){return Ms(s,t,n)},s.fitHeight=function(t,n){return As(s,t,n)},s.scale(1070)},t.geoAzimuthalEqualArea=function(){return Cs(Os).scale(124.75).clipAngle(179.999)},t.geoAzimuthalEqualAreaRaw=Os,t.geoAzimuthalEquidistant=function(){return Cs(Ys).scale(79.4188).clipAngle(179.999)},t.geoAzimuthalEquidistantRaw=Ys,t.geoConicConformal=function(){return zs(Hs).scale(109.5).parallels([30,30])},t.geoConicConformalRaw=Hs,t.geoConicEqualArea=Ls,t.geoConicEqualAreaRaw=Rs,t.geoConicEquidistant=function(){return zs(Xs).scale(131.154).center([0,13.9389])},t.geoConicEquidistantRaw=Xs,t.geoEqualEarth=function(){return Cs(Qs).scale(177.158)},t.geoEqualEarthRaw=Qs,t.geoEquirectangular=function(){return Cs(js).scale(152.63)},t.geoEquirectangularRaw=js,t.geoGnomonic=function(){return Cs(Js).scale(144.049).clipAngle(60)},t.geoGnomonicRaw=Js,t.geoIdentity=function(){var t,n,e,r,i,o,a=1,u=0,f=0,c=1,s=1,l=mc,h=null,d=mc;function p(){return r=i=null,o}return o={stream:function(t){return r&&i===t?r:r=l(d(i=t))},postclip:function(r){return arguments.length?(d=r,h=t=n=e=null,p()):d},clipExtent:function(r){return arguments.length?(d=null==r?(h=t=n=e=null,mc):Zf(h=+r[0][0],t=+r[0][1],n=+r[1][0],e=+r[1][1]),p()):null==h?null:[[h,t],[n,e]]},scale:function(t){return arguments.length?(l=Ks((a=+t)*c,a*s,u,f),p()):a},translate:function(t){return arguments.length?(l=Ks(a*c,a*s,u=+t[0],f=+t[1]),p()):[u,f]},reflectX:function(t){return arguments.length?(l=Ks(a*(c=t?-1:1),a*s,u,f),p()):c<0},reflectY:function(t){return arguments.length?(l=Ks(a*c,a*(s=t?-1:1),u,f),p()):s<0},fitExtent:function(t,n){return xs(o,t,n)},fitSize:function(t,n){return ws(o,t,n)},fitWidth:function(t,n){return Ms(o,t,n)},fitHeight:function(t,n){return As(o,t,n)}}},t.geoProjection=Cs,t.geoProjectionMutator=Ps,t.geoMercator=function(){return Fs(Bs).scale(961/Ba)},t.geoMercatorRaw=Bs,t.geoNaturalEarth1=function(){return Cs(tl).scale(175.295)},t.geoNaturalEarth1Raw=tl,t.geoOrthographic=function(){return Cs(nl).scale(249.5).clipAngle(90+Da)},t.geoOrthographicRaw=nl,t.geoStereographic=function(){return Cs(el).scale(250).clipAngle(142)},t.geoStereographicRaw=el,t.geoTransverseMercator=function(){var t=Fs(rl),n=t.center,e=t.rotate;return t.center=function(t){return arguments.length?n([-t[1],t[0]]):[(t=n())[1],-t[0]]},t.rotate=function(t){return arguments.length?e([t[0],t[1],t.length>2?t[2]+90:90]):[(t=e())[0],t[1],t[2]-90]},e([0,0,90]).scale(159.155)},t.geoTransverseMercatorRaw=rl,t.geoRotation=Rf,t.geoStream=su,t.geoTransform=function(t){return{stream:_s(t)}},t.cluster=function(){var t=il,n=1,e=1,r=!1;function i(i){var o,a=0;i.eachAfter(function(n){var e=n.children;e?(n.x=function(t){return t.reduce(ol,0)/t.length}(e),n.y=function(t){return 1+t.reduce(al,0)}(e)):(n.x=o?a+=t(n,o):0,n.y=0,o=n)});var u=function(t){for(var n;n=t.children;)t=n[0];return t}(i),f=function(t){for(var n;n=t.children;)t=n[n.length-1];return t}(i),c=u.x-t(u,f)/2,s=f.x+t(f,u)/2;return i.eachAfter(r?function(t){t.x=(t.x-i.x)*n,t.y=(i.y-t.y)*e}:function(t){t.x=(t.x-c)/(s-c)*n,t.y=(1-(i.y?t.y/i.y:1))*e})}return i.separation=function(n){return arguments.length?(t=n,i):t},i.size=function(t){return arguments.length?(r=!1,n=+t[0],e=+t[1],i):r?null:[n,e]},i.nodeSize=function(t){return arguments.length?(r=!0,n=+t[0],e=+t[1],i):r?[n,e]:null},i},t.hierarchy=fl,t.pack=function(){var t=null,n=1,e=1,r=El;function i(i){return i.x=n/2,i.y=e/2,t?i.eachBefore(Pl(t)).eachAfter(zl(r,.5)).eachBefore(Rl(1)):i.eachBefore(Pl(Cl)).eachAfter(zl(El,1)).eachAfter(zl(r,i.r/Math.min(n,e))).eachBefore(Rl(Math.min(n,e)/(2*i.r))),i}return i.radius=function(n){return arguments.length?(t=null==(e=n)?null:Sl(e),i):t;var e},i.size=function(t){return arguments.length?(n=+t[0],e=+t[1],i):[n,e]},i.padding=function(t){return arguments.length?(r="function"==typeof t?t:kl(+t),i):r},i},t.packSiblings=function(t){return Nl(t),t},t.packEnclose=pl,t.partition=function(){var t=1,n=1,e=0,r=!1;function i(i){var o=i.height+1;return i.x0=i.y0=e,i.x1=t,i.y1=n/o,i.eachBefore(function(t,n){return function(r){r.children&&Dl(r,r.x0,t*(r.depth+1)/n,r.x1,t*(r.depth+2)/n);var i=r.x0,o=r.y0,a=r.x1-e,u=r.y1-e;a<i&&(i=a=(i+a)/2),u<o&&(o=u=(o+u)/2),r.x0=i,r.y0=o,r.x1=a,r.y1=u}}(n,o)),r&&i.eachBefore(Ll),i}return i.round=function(t){return arguments.length?(r=!!t,i):r},i.size=function(e){return arguments.length?(t=+e[0],n=+e[1],i):[t,n]},i.padding=function(t){return arguments.length?(e=+t,i):e},i},t.stratify=function(){var t=Yl,n=Bl;function e(e){var r,i,o,a,u,f,c,s=e.length,l=new Array(s),h={};for(i=0;i<s;++i)r=e[i],u=l[i]=new hl(r),null!=(f=t(r,i,e))&&(f+="")&&(h[c=Ul+(u.id=f)]=c in h?Ol:u);for(i=0;i<s;++i)if(u=l[i],null!=(f=n(e[i],i,e))&&(f+="")){if(!(a=h[Ul+f]))throw new Error("missing: "+f);if(a===Ol)throw new Error("ambiguous: "+f);a.children?a.children.push(u):a.children=[u],u.parent=a}else{if(o)throw new Error("multiple roots");o=u}if(!o)throw new Error("no root");if(o.parent=ql,o.eachBefore(function(t){t.depth=t.parent.depth+1,--s}).eachBefore(ll),o.parent=null,s>0)throw new Error("cycle");return o}return e.id=function(n){return arguments.length?(t=Sl(n),e):t},e.parentId=function(t){return arguments.length?(n=Sl(t),e):n},e},t.tree=function(){var t=Fl,n=1,e=1,r=null;function i(i){var f=function(t){for(var n,e,r,i,o,a=new Gl(t,0),u=[a];n=u.pop();)if(r=n._.children)for(n.children=new Array(o=r.length),i=o-1;i>=0;--i)u.push(e=n.children[i]=new Gl(r[i],i)),e.parent=n;return(a.parent=new Gl(null,0)).children=[a],a}(i);if(f.eachAfter(o),f.parent.m=-f.z,f.eachBefore(a),r)i.eachBefore(u);else{var c=i,s=i,l=i;i.eachBefore(function(t){t.x<c.x&&(c=t),t.x>s.x&&(s=t),t.depth>l.depth&&(l=t)});var h=c===s?1:t(c,s)/2,d=h-c.x,p=n/(s.x+h+d),v=e/(l.depth||1);i.eachBefore(function(t){t.x=(t.x+d)*p,t.y=t.depth*v})}return i}function o(n){var e=n.children,r=n.parent.children,i=n.i?r[n.i-1]:null;if(e){!function(t){for(var n,e=0,r=0,i=t.children,o=i.length;--o>=0;)(n=i[o]).z+=e,n.m+=e,e+=n.s+(r+=n.c)}(n);var o=(e[0].z+e[e.length-1].z)/2;i?(n.z=i.z+t(n._,i._),n.m=n.z-o):n.z=o}else i&&(n.z=i.z+t(n._,i._));n.parent.A=function(n,e,r){if(e){for(var i,o=n,a=n,u=e,f=o.parent.children[0],c=o.m,s=a.m,l=u.m,h=f.m;u=Hl(u),o=Il(o),u&&o;)f=Il(f),(a=Hl(a)).a=n,(i=u.z+l-o.z-c+t(u._,o._))>0&&(jl(Xl(u,n,r),n,i),c+=i,s+=i),l+=u.m,c+=o.m,h+=f.m,s+=a.m;u&&!Hl(a)&&(a.t=u,a.m+=l-s),o&&!Il(f)&&(f.t=o,f.m+=c-h,r=n)}return r}(n,i,n.parent.A||r[0])}function a(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function u(t){t.x*=n,t.y=t.depth*e}return i.separation=function(n){return arguments.length?(t=n,i):t},i.size=function(t){return arguments.length?(r=!1,n=+t[0],e=+t[1],i):r?null:[n,e]},i.nodeSize=function(t){return arguments.length?(r=!0,n=+t[0],e=+t[1],i):r?[n,e]:null},i},t.treemap=function(){var t=Zl,n=!1,e=1,r=1,i=[0],o=El,a=El,u=El,f=El,c=El;function s(t){return t.x0=t.y0=0,t.x1=e,t.y1=r,t.eachBefore(l),i=[0],n&&t.eachBefore(Ll),t}function l(n){var e=i[n.depth],r=n.x0+e,s=n.y0+e,l=n.x1-e,h=n.y1-e;l<r&&(r=l=(r+l)/2),h<s&&(s=h=(s+h)/2),n.x0=r,n.y0=s,n.x1=l,n.y1=h,n.children&&(e=i[n.depth+1]=o(n)/2,r+=c(n)-e,s+=a(n)-e,(l-=u(n)-e)<r&&(r=l=(r+l)/2),(h-=f(n)-e)<s&&(s=h=(s+h)/2),t(n,r,s,l,h))}return s.round=function(t){return arguments.length?(n=!!t,s):n},s.size=function(t){return arguments.length?(e=+t[0],r=+t[1],s):[e,r]},s.tile=function(n){return arguments.length?(t=Sl(n),s):t},s.padding=function(t){return arguments.length?s.paddingInner(t).paddingOuter(t):s.paddingInner()},s.paddingInner=function(t){return arguments.length?(o="function"==typeof t?t:kl(+t),s):o},s.paddingOuter=function(t){return arguments.length?s.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):s.paddingTop()},s.paddingTop=function(t){return arguments.length?(a="function"==typeof t?t:kl(+t),s):a},s.paddingRight=function(t){return arguments.length?(u="function"==typeof t?t:kl(+t),s):u},s.paddingBottom=function(t){return arguments.length?(f="function"==typeof t?t:kl(+t),s):f},s.paddingLeft=function(t){return arguments.length?(c="function"==typeof t?t:kl(+t),s):c},s},t.treemapBinary=function(t,n,e,r,i){var o,a,u=t.children,f=u.length,c=new Array(f+1);for(c[0]=a=o=0;o<f;++o)c[o+1]=a+=u[o].value;!function t(n,e,r,i,o,a,f){if(n>=e-1){var s=u[n];return s.x0=i,s.y0=o,s.x1=a,void(s.y1=f)}for(var l=c[n],h=r/2+l,d=n+1,p=e-1;d<p;){var v=d+p>>>1;c[v]<h?d=v+1:p=v}h-c[d-1]<c[d]-h&&n+1<d&&--d;var g=c[d]-l,y=r-g;if(a-i>f-o){var _=(i*y+a*g)/r;t(n,d,g,i,o,_,f),t(d,e,y,_,o,a,f)}else{var b=(o*y+f*g)/r;t(n,d,g,i,o,a,b),t(d,e,y,i,b,a,f)}}(0,f,t.value,n,e,r,i)},t.treemapDice=Dl,t.treemapSlice=Vl,t.treemapSliceDice=function(t,n,e,r,i){(1&t.depth?Vl:Dl)(t,n,e,r,i)},t.treemapSquarify=Zl,t.treemapResquarify=Ql,t.interpolate=me,t.interpolateArray=de,t.interpolateBasis=ee,t.interpolateBasisClosed=re,t.interpolateDate=pe,t.interpolateDiscrete=function(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}},t.interpolateHue=function(t,n){var e=ae(+t,+n);return function(t){var n=e(t);return n-360*Math.floor(n/360)}},t.interpolateNumber=ve,t.interpolateObject=ge,t.interpolateRound=xe,t.interpolateString=be,t.interpolateTransformCss=Ce,t.interpolateTransformSvg=Pe,t.interpolateZoom=qe,t.interpolateRgb=ce,t.interpolateRgbBasis=le,t.interpolateRgbBasisClosed=he,t.interpolateHsl=Ye,t.interpolateHslLong=Be,t.interpolateLab=function(t,n){var e=fe((t=Un(t)).l,(n=Un(n)).l),r=fe(t.a,n.a),i=fe(t.b,n.b),o=fe(t.opacity,n.opacity);return function(n){return t.l=e(n),t.a=r(n),t.b=i(n),t.opacity=o(n),t+""}},t.interpolateHcl=Ie,t.interpolateHclLong=He,t.interpolateCubehelix=Xe,t.interpolateCubehelixLong=Ge,t.piecewise=function(t,n){for(var e=0,r=n.length-1,i=n[0],o=new Array(r<0?0:r);e<r;)o[e]=t(i,i=n[++e]);return function(t){var n=Math.max(0,Math.min(r-1,Math.floor(t*=r)));return o[n](t-n)}},t.quantize=function(t,n){for(var e=new Array(n),r=0;r<n;++r)e[r]=t(r/(n-1));return e},t.path=Gi,t.polygonArea=function(t){for(var n,e=-1,r=t.length,i=t[r-1],o=0;++e<r;)n=i,i=t[e],o+=n[1]*i[0]-n[0]*i[1];return o/2},t.polygonCentroid=function(t){for(var n,e,r=-1,i=t.length,o=0,a=0,u=t[i-1],f=0;++r<i;)n=u,u=t[r],f+=e=n[0]*u[1]-u[0]*n[1],o+=(n[0]+u[0])*e,a+=(n[1]+u[1])*e;return[o/(f*=3),a/f]},t.polygonHull=function(t){if((e=t.length)<3)return null;var n,e,r=new Array(e),i=new Array(e);for(n=0;n<e;++n)r[n]=[+t[n][0],+t[n][1],n];for(r.sort(Jl),n=0;n<e;++n)i[n]=[r[n][0],-r[n][1]];var o=Kl(r),a=Kl(i),u=a[0]===o[0],f=a[a.length-1]===o[o.length-1],c=[];for(n=o.length-1;n>=0;--n)c.push(t[r[o[n]][2]]);for(n=+u;n<a.length-f;++n)c.push(t[r[a[n]][2]]);return c},t.polygonContains=function(t,n){for(var e,r,i=t.length,o=t[i-1],a=n[0],u=n[1],f=o[0],c=o[1],s=!1,l=0;l<i;++l)e=(o=t[l])[0],(r=o[1])>u!=c>u&&a<(f-e)*(u-r)/(c-r)+e&&(s=!s),f=e,c=r;return s},t.polygonLength=function(t){for(var n,e,r=-1,i=t.length,o=t[i-1],a=o[0],u=o[1],f=0;++r<i;)n=a,e=u,n-=a=(o=t[r])[0],e-=u=o[1],f+=Math.sqrt(n*n+e*e);return f},t.quadtree=ra,t.randomUniform=nh,t.randomNormal=eh,t.randomLogNormal=rh,t.randomBates=oh,t.randomIrwinHall=ih,t.randomExponential=ah,t.scaleBand=hh,t.scalePoint=function(){return function t(n){var e=n.copy;return n.padding=n.paddingOuter,delete n.paddingInner,delete n.paddingOuter,n.copy=function(){return t(e())},n}(hh().paddingInner(1))},t.scaleIdentity=function t(){var n=[0,1];function e(t){return+t}return e.invert=e,e.domain=e.range=function(t){return arguments.length?(n=fh.call(t,ph),e):n.slice()},e.copy=function(){return t().domain(n)},xh(e)},t.scaleLinear=function t(){var n=mh(gh,ve);return n.copy=function(){return bh(n,t())},xh(n)},t.scaleLog=function n(){var e=mh(Mh,Ah).domain([1,10]),r=e.domain,i=10,o=Sh(10),a=Nh(10);function u(){return o=Sh(i),a=Nh(i),r()[0]<0&&(o=Eh(o),a=Eh(a)),e}return e.base=function(t){return arguments.length?(i=+t,u()):i},e.domain=function(t){return arguments.length?(r(t),u()):r()},e.ticks=function(t){var n,e=r(),u=e[0],f=e[e.length-1];(n=f<u)&&(h=u,u=f,f=h);var c,s,l,h=o(u),d=o(f),p=null==t?10:+t,v=[];if(!(i%1)&&d-h<p){if(h=Math.round(h)-1,d=Math.round(d)+1,u>0){for(;h<d;++h)for(s=1,c=a(h);s<i;++s)if(!((l=c*s)<u)){if(l>f)break;v.push(l)}}else for(;h<d;++h)for(s=i-1,c=a(h);s>=1;--s)if(!((l=c*s)<u)){if(l>f)break;v.push(l)}}else v=m(h,d,Math.min(d-h,p)).map(a);return n?v.reverse():v},e.tickFormat=function(n,r){if(null==r&&(r=10===i?".0e":","),"function"!=typeof r&&(r=t.format(r)),n===1/0)return r;null==n&&(n=10);var u=Math.max(1,i*n/e.ticks().length);return function(t){var n=t/a(Math.round(o(t)));return n*i<i-.5&&(n*=i),n<=u?r(t):""}},e.nice=function(){return r(wh(r(),{floor:function(t){return a(Math.floor(o(t)))},ceil:function(t){return a(Math.ceil(o(t)))}}))},e.copy=function(){return bh(e,n().base(i))},e},t.scaleOrdinal=lh,t.scaleImplicit=sh,t.scalePow=Ch,t.scaleSqrt=function(){return Ch().exponent(.5)},t.scaleQuantile=function t(){var e=[],r=[],o=[];function a(){var t=0,n=Math.max(1,r.length);for(o=new Array(n-1);++t<n;)o[t-1]=A(e,t/n);return u}function u(t){if(!isNaN(t=+t))return r[i(o,t)]}return u.invertExtent=function(t){var n=r.indexOf(t);return n<0?[NaN,NaN]:[n>0?o[n-1]:e[0],n<o.length?o[n]:e[e.length-1]]},u.domain=function(t){if(!arguments.length)return e.slice();e=[];for(var r,i=0,o=t.length;i<o;++i)null==(r=t[i])||isNaN(r=+r)||e.push(r);return e.sort(n),a()},u.range=function(t){return arguments.length?(r=ch.call(t),a()):r.slice()},u.quantiles=function(){return o.slice()},u.copy=function(){return t().domain(e).range(r)},u},t.scaleQuantize=function t(){var n=0,e=1,r=1,o=[.5],a=[0,1];function u(t){if(t<=t)return a[i(o,t,0,r)]}function f(){var t=-1;for(o=new Array(r);++t<r;)o[t]=((t+1)*e-(t-r)*n)/(r+1);return u}return u.domain=function(t){return arguments.length?(n=+t[0],e=+t[1],f()):[n,e]},u.range=function(t){return arguments.length?(r=(a=ch.call(t)).length-1,f()):a.slice()},u.invertExtent=function(t){var i=a.indexOf(t);return i<0?[NaN,NaN]:i<1?[n,o[0]]:i>=r?[o[r-1],e]:[o[i-1],o[i]]},u.copy=function(){return t().domain([n,e]).range(a)},xh(u)},t.scaleThreshold=function t(){var n=[.5],e=[0,1],r=1;function o(t){if(t<=t)return e[i(n,t,0,r)]}return o.domain=function(t){return arguments.length?(n=ch.call(t),r=Math.min(n.length,e.length-1),o):n.slice()},o.range=function(t){return arguments.length?(e=ch.call(t),r=Math.min(n.length,e.length-1),o):e.slice()},o.invertExtent=function(t){var r=e.indexOf(t);return[n[r-1],n[r]]},o.copy=function(){return t().domain(n).range(e)},o},t.scaleTime=function(){return cv(cd,ud,Vh,jh,Ih,Bh,Oh,Lh,t.timeFormat).domain([new Date(2e3,0,1),new Date(2e3,0,2)])},t.scaleUtc=function(){return cv(Ld,zd,_d,vd,dd,ld,Oh,Lh,t.utcFormat).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)])},t.scaleSequential=function t(n){var e=0,r=1,i=1,o=!1;function a(t){var r=(t-e)*i;return n(o?Math.max(0,Math.min(1,r)):r)}return a.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],i=e===r?0:1/(r-e),a):[e,r]},a.clamp=function(t){return arguments.length?(o=!!t,a):o},a.interpolator=function(t){return arguments.length?(n=t,a):n},a.copy=function(){return t(n).domain([e,r]).clamp(o)},xh(a)},t.scaleDiverging=function t(n){var e=0,r=.5,i=1,o=1,a=1,u=!1;function f(t){var e=.5+((t=+t)-r)*(t<r?o:a);return n(u?Math.max(0,Math.min(1,e)):e)}return f.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],i=+t[2],o=e===r?0:.5/(r-e),a=r===i?0:.5/(i-r),f):[e,r,i]},f.clamp=function(t){return arguments.length?(u=!!t,f):u},f.interpolator=function(t){return arguments.length?(n=t,f):n},f.copy=function(){return t(n).domain([e,r,i]).clamp(u)},xh(f)},t.schemeCategory10=lv,t.schemeAccent=hv,t.schemeDark2=dv,t.schemePaired=pv,t.schemePastel1=vv,t.schemePastel2=gv,t.schemeSet1=yv,t.schemeSet2=_v,t.schemeSet3=bv,t.interpolateBrBG=wv,t.schemeBrBG=xv,t.interpolatePRGn=Av,t.schemePRGn=Mv,t.interpolatePiYG=Nv,t.schemePiYG=Tv,t.interpolatePuOr=Ev,t.schemePuOr=Sv,t.interpolateRdBu=Cv,t.schemeRdBu=kv,t.interpolateRdGy=zv,t.schemeRdGy=Pv,t.interpolateRdYlBu=Lv,t.schemeRdYlBu=Rv,t.interpolateRdYlGn=Uv,t.schemeRdYlGn=Dv,t.interpolateSpectral=Ov,t.schemeSpectral=qv,t.interpolateBuGn=Bv,t.schemeBuGn=Yv,t.interpolateBuPu=Iv,t.schemeBuPu=Fv,t.interpolateGnBu=jv,t.schemeGnBu=Hv,t.interpolateOrRd=Gv,t.schemeOrRd=Xv,t.interpolatePuBuGn=$v,t.schemePuBuGn=Vv,t.interpolatePuBu=Zv,t.schemePuBu=Wv,t.interpolatePuRd=Jv,t.schemePuRd=Qv,t.interpolateRdPu=tg,t.schemeRdPu=Kv,t.interpolateYlGnBu=eg,t.schemeYlGnBu=ng,t.interpolateYlGn=ig,t.schemeYlGn=rg,t.interpolateYlOrBr=ag,t.schemeYlOrBr=og,t.interpolateYlOrRd=fg,t.schemeYlOrRd=ug,t.interpolateBlues=sg,t.schemeBlues=cg,t.interpolateGreens=hg,t.schemeGreens=lg,t.interpolateGreys=pg,t.schemeGreys=dg,t.interpolatePurples=gg,t.schemePurples=vg,t.interpolateReds=_g,t.schemeReds=yg,t.interpolateOranges=mg,t.schemeOranges=bg,t.interpolateCubehelixDefault=xg,t.interpolateRainbow=function(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return Ag.h=360*t-100,Ag.s=1.5-1.5*n,Ag.l=.8-.9*n,Ag+""},t.interpolateWarm=wg,t.interpolateCool=Mg,t.interpolateSinebow=function(t){var n;return t=(.5-t)*Math.PI,Tg.r=255*(n=Math.sin(t))*n,Tg.g=255*(n=Math.sin(t+Ng))*n,Tg.b=255*(n=Math.sin(t+Sg))*n,Tg+""},t.interpolateViridis=kg,t.interpolateMagma=Cg,t.interpolateInferno=Pg,t.interpolatePlasma=zg,t.create=function(t){return Dt(W(t).call(document.documentElement))},t.creator=W,t.local=qt,t.matcher=rt,t.mouse=Ft,t.namespace=$,t.namespaces=V,t.clientPoint=Bt,t.select=Dt,t.selectAll=function(t){return"string"==typeof t?new Rt([document.querySelectorAll(t)],[document.documentElement]):new Rt([null==t?[]:t],zt)},t.selection=Lt,t.selector=Q,t.selectorAll=K,t.style=lt,t.touch=It,t.touches=function(t,n){null==n&&(n=Yt().touches);for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=Bt(t,n[e]);return i},t.window=st,t.customEvent=Ct,t.arc=function(){var t=Gg,n=Vg,e=Rg(0),r=null,i=$g,o=Wg,a=Zg,u=null;function f(){var f,c,s,l=+t.apply(this,arguments),h=+n.apply(this,arguments),d=i.apply(this,arguments)-Hg,p=o.apply(this,arguments)-Hg,v=Lg(p-d),g=p>d;if(u||(u=f=Gi()),h<l&&(c=h,h=l,l=c),h>Fg)if(v>jg-Fg)u.moveTo(h*Ug(d),h*Yg(d)),u.arc(0,0,h,d,p,!g),l>Fg&&(u.moveTo(l*Ug(p),l*Yg(p)),u.arc(0,0,l,p,d,g));else{var y,_,b=d,m=p,x=d,w=p,M=v,A=v,T=a.apply(this,arguments)/2,N=T>Fg&&(r?+r.apply(this,arguments):Bg(l*l+h*h)),S=Og(Lg(h-l)/2,+e.apply(this,arguments)),E=S,k=S;if(N>Fg){var C=Xg(N/l*Yg(T)),P=Xg(N/h*Yg(T));(M-=2*C)>Fg?(x+=C*=g?1:-1,w-=C):(M=0,x=w=(d+p)/2),(A-=2*P)>Fg?(b+=P*=g?1:-1,m-=P):(A=0,b=m=(d+p)/2)}var z=h*Ug(b),R=h*Yg(b),L=l*Ug(w),D=l*Yg(w);if(S>Fg){var U=h*Ug(m),q=h*Yg(m),O=l*Ug(x),Y=l*Yg(x);if(v<Ig){var B=M>Fg?function(t,n,e,r,i,o,a,u){var f=e-t,c=r-n,s=a-i,l=u-o,h=(s*(n-o)-l*(t-i))/(l*f-s*c);return[t+h*f,n+h*c]}(z,R,O,Y,U,q,L,D):[L,D],F=z-B[0],I=R-B[1],H=U-B[0],j=q-B[1],X=1/Yg(((s=(F*H+I*j)/(Bg(F*F+I*I)*Bg(H*H+j*j)))>1?0:s<-1?Ig:Math.acos(s))/2),G=Bg(B[0]*B[0]+B[1]*B[1]);E=Og(S,(l-G)/(X-1)),k=Og(S,(h-G)/(X+1))}}A>Fg?k>Fg?(y=Qg(O,Y,z,R,h,k,g),_=Qg(U,q,L,D,h,k,g),u.moveTo(y.cx+y.x01,y.cy+y.y01),k<S?u.arc(y.cx,y.cy,k,Dg(y.y01,y.x01),Dg(_.y01,_.x01),!g):(u.arc(y.cx,y.cy,k,Dg(y.y01,y.x01),Dg(y.y11,y.x11),!g),u.arc(0,0,h,Dg(y.cy+y.y11,y.cx+y.x11),Dg(_.cy+_.y11,_.cx+_.x11),!g),u.arc(_.cx,_.cy,k,Dg(_.y11,_.x11),Dg(_.y01,_.x01),!g))):(u.moveTo(z,R),u.arc(0,0,h,b,m,!g)):u.moveTo(z,R),l>Fg&&M>Fg?E>Fg?(y=Qg(L,D,U,q,l,-E,g),_=Qg(z,R,O,Y,l,-E,g),u.lineTo(y.cx+y.x01,y.cy+y.y01),E<S?u.arc(y.cx,y.cy,E,Dg(y.y01,y.x01),Dg(_.y01,_.x01),!g):(u.arc(y.cx,y.cy,E,Dg(y.y01,y.x01),Dg(y.y11,y.x11),!g),u.arc(0,0,l,Dg(y.cy+y.y11,y.cx+y.x11),Dg(_.cy+_.y11,_.cx+_.x11),g),u.arc(_.cx,_.cy,E,Dg(_.y11,_.x11),Dg(_.y01,_.x01),!g))):u.arc(0,0,l,w,x,g):u.lineTo(L,D)}else u.moveTo(0,0);if(u.closePath(),f)return u=null,f+""||null}return f.centroid=function(){var e=(+t.apply(this,arguments)+ +n.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +o.apply(this,arguments))/2-Ig/2;return[Ug(r)*e,Yg(r)*e]},f.innerRadius=function(n){return arguments.length?(t="function"==typeof n?n:Rg(+n),f):t},f.outerRadius=function(t){return arguments.length?(n="function"==typeof t?t:Rg(+t),f):n},f.cornerRadius=function(t){return arguments.length?(e="function"==typeof t?t:Rg(+t),f):e},f.padRadius=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:Rg(+t),f):r},f.startAngle=function(t){return arguments.length?(i="function"==typeof t?t:Rg(+t),f):i},f.endAngle=function(t){return arguments.length?(o="function"==typeof t?t:Rg(+t),f):o},f.padAngle=function(t){return arguments.length?(a="function"==typeof t?t:Rg(+t),f):a},f.context=function(t){return arguments.length?(u=null==t?null:t,f):u},f},t.area=ry,t.line=ey,t.pie=function(){var t=oy,n=iy,e=null,r=Rg(0),i=Rg(jg),o=Rg(0);function a(a){var u,f,c,s,l,h=a.length,d=0,p=new Array(h),v=new Array(h),g=+r.apply(this,arguments),y=Math.min(jg,Math.max(-jg,i.apply(this,arguments)-g)),_=Math.min(Math.abs(y)/h,o.apply(this,arguments)),b=_*(y<0?-1:1);for(u=0;u<h;++u)(l=v[p[u]=u]=+t(a[u],u,a))>0&&(d+=l);for(null!=n?p.sort(function(t,e){return n(v[t],v[e])}):null!=e&&p.sort(function(t,n){return e(a[t],a[n])}),u=0,c=d?(y-h*b)/d:0;u<h;++u,g=s)f=p[u],s=g+((l=v[f])>0?l*c:0)+b,v[f]={data:a[f],index:u,value:l,startAngle:g,endAngle:s,padAngle:_};return v}return a.value=function(n){return arguments.length?(t="function"==typeof n?n:Rg(+n),a):t},a.sortValues=function(t){return arguments.length?(n=t,e=null,a):n},a.sort=function(t){return arguments.length?(e=t,n=null,a):e},a.startAngle=function(t){return arguments.length?(r="function"==typeof t?t:Rg(+t),a):r},a.endAngle=function(t){return arguments.length?(i="function"==typeof t?t:Rg(+t),a):i},a.padAngle=function(t){return arguments.length?(o="function"==typeof t?t:Rg(+t),a):o},a},t.areaRadial=ly,t.radialArea=ly,t.lineRadial=sy,t.radialLine=sy,t.pointRadial=hy,t.linkHorizontal=function(){return gy(yy)},t.linkVertical=function(){return gy(_y)},t.linkRadial=function(){var t=gy(by);return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t},t.symbol=function(){var t=Rg(my),n=Rg(64),e=null;function r(){var r;if(e||(e=r=Gi()),t.apply(this,arguments).draw(e,+n.apply(this,arguments)),r)return e=null,r+""||null}return r.type=function(n){return arguments.length?(t="function"==typeof n?n:Rg(n),r):t},r.size=function(t){return arguments.length?(n="function"==typeof t?t:Rg(+t),r):n},r.context=function(t){return arguments.length?(e=null==t?null:t,r):e},r},t.symbols=Uy,t.symbolCircle=my,t.symbolCross=xy,t.symbolDiamond=Ay,t.symbolSquare=ky,t.symbolStar=Ey,t.symbolTriangle=Py,t.symbolWye=Dy,t.curveBasisClosed=function(t){return new By(t)},t.curveBasisOpen=function(t){return new Fy(t)},t.curveBasis=function(t){return new Yy(t)},t.curveBundle=Hy,t.curveCardinalClosed=$y,t.curveCardinalOpen=Zy,t.curveCardinal=Gy,t.curveCatmullRomClosed=n_,t.curveCatmullRomOpen=r_,t.curveCatmullRom=Ky,t.curveLinearClosed=function(t){return new i_(t)},t.curveLinear=Kg,t.curveMonotoneX=function(t){return new c_(t)},t.curveMonotoneY=function(t){return new s_(t)},t.curveNatural=function(t){return new h_(t)},t.curveStep=function(t){return new p_(t,.5)},t.curveStepAfter=function(t){return new p_(t,1)},t.curveStepBefore=function(t){return new p_(t,0)},t.stack=function(){var t=Rg([]),n=g_,e=v_,r=y_;function i(i){var o,a,u=t.apply(this,arguments),f=i.length,c=u.length,s=new Array(c);for(o=0;o<c;++o){for(var l,h=u[o],d=s[o]=new Array(f),p=0;p<f;++p)d[p]=l=[0,+r(i[p],h,p,i)],l.data=i[p];d.key=h}for(o=0,a=n(s);o<c;++o)s[a[o]].index=o;return e(s,a),s}return i.keys=function(n){return arguments.length?(t="function"==typeof n?n:Rg(dy.call(n)),i):t},i.value=function(t){return arguments.length?(r="function"==typeof t?t:Rg(+t),i):r},i.order=function(t){return arguments.length?(n=null==t?g_:"function"==typeof t?t:Rg(dy.call(t)),i):n},i.offset=function(t){return arguments.length?(e=null==t?v_:t,i):e},i},t.stackOffsetExpand=function(t,n){if((r=t.length)>0){for(var e,r,i,o=0,a=t[0].length;o<a;++o){for(i=e=0;e<r;++e)i+=t[e][o][1]||0;if(i)for(e=0;e<r;++e)t[e][o][1]/=i}v_(t,n)}},t.stackOffsetDiverging=function(t,n){if((u=t.length)>1)for(var e,r,i,o,a,u,f=0,c=t[n[0]].length;f<c;++f)for(o=a=0,e=0;e<u;++e)(i=(r=t[n[e]][f])[1]-r[0])>=0?(r[0]=o,r[1]=o+=i):i<0?(r[1]=a,r[0]=a+=i):r[0]=o},t.stackOffsetNone=v_,t.stackOffsetSilhouette=function(t,n){if((e=t.length)>0){for(var e,r=0,i=t[n[0]],o=i.length;r<o;++r){for(var a=0,u=0;a<e;++a)u+=t[a][r][1]||0;i[r][1]+=i[r][0]=-u/2}v_(t,n)}},t.stackOffsetWiggle=function(t,n){if((i=t.length)>0&&(r=(e=t[n[0]]).length)>0){for(var e,r,i,o=0,a=1;a<r;++a){for(var u=0,f=0,c=0;u<i;++u){for(var s=t[n[u]],l=s[a][1]||0,h=(l-(s[a-1][1]||0))/2,d=0;d<u;++d){var p=t[n[d]];h+=(p[a][1]||0)-(p[a-1][1]||0)}f+=l,c+=h*l}e[a-1][1]+=e[a-1][0]=o,f&&(o-=c/f)}e[a-1][1]+=e[a-1][0]=o,v_(t,n)}},t.stackOrderAscending=__,t.stackOrderDescending=function(t){return __(t).reverse()},t.stackOrderInsideOut=function(t){var n,e,r=t.length,i=t.map(b_),o=g_(t).sort(function(t,n){return i[n]-i[t]}),a=0,u=0,f=[],c=[];for(n=0;n<r;++n)e=o[n],a<u?(a+=i[e],f.push(e)):(u+=i[e],c.push(e));return c.reverse().concat(f)},t.stackOrderNone=g_,t.stackOrderReverse=function(t){return g_(t).reverse()},t.timeInterval=Rh,t.timeMillisecond=Lh,t.timeMilliseconds=Dh,t.utcMillisecond=Lh,t.utcMilliseconds=Dh,t.timeSecond=Oh,t.timeSeconds=Yh,t.utcSecond=Oh,t.utcSeconds=Yh,t.timeMinute=Bh,t.timeMinutes=Fh,t.timeHour=Ih,t.timeHours=Hh,t.timeDay=jh,t.timeDays=Xh,t.timeWeek=Vh,t.timeWeeks=td,t.timeSunday=Vh,t.timeSundays=td,t.timeMonday=$h,t.timeMondays=nd,t.timeTuesday=Wh,t.timeTuesdays=ed,t.timeWednesday=Zh,t.timeWednesdays=rd,t.timeThursday=Qh,t.timeThursdays=id,t.timeFriday=Jh,t.timeFridays=od,t.timeSaturday=Kh,t.timeSaturdays=ad,t.timeMonth=ud,t.timeMonths=fd,t.timeYear=cd,t.timeYears=sd,t.utcMinute=ld,t.utcMinutes=hd,t.utcHour=dd,t.utcHours=pd,t.utcDay=vd,t.utcDays=gd,t.utcWeek=_d,t.utcWeeks=Td,t.utcSunday=_d,t.utcSundays=Td,t.utcMonday=bd,t.utcMondays=Nd,t.utcTuesday=md,t.utcTuesdays=Sd,t.utcWednesday=xd,t.utcWednesdays=Ed,t.utcThursday=wd,t.utcThursdays=kd,t.utcFriday=Md,t.utcFridays=Cd,t.utcSaturday=Ad,t.utcSaturdays=Pd,t.utcMonth=zd,t.utcMonths=Rd,t.utcYear=Ld,t.utcYears=Dd,t.timeFormatDefaultLocale=Qp,t.timeFormatLocale=Yd,t.isoFormat=Jp,t.isoParse=Kp,t.now=ir,t.timer=ur,t.timerFlush=fr,t.timeout=hr,t.interval=function(t,n,e){var r=new ar,i=n;return null==n?(r.restart(t,n,e),r):(n=+n,e=null==e?ir():+e,r.restart(function o(a){a+=i,r.restart(o,i+=n,e),t(a)},n,e),r)},t.transition=zr,t.active=function(t,n){var e,r,i=t.__transition;if(i)for(r in n=null==n?null:n+"",i)if((e=i[r]).state>gr&&e.name===n)return new Pr([[t]],li,n,+r);return null},t.interrupt=Nr,t.voronoi=function(){var t=x_,n=w_,e=null;function r(r){return new eb(r.map(function(e,i){var o=[Math.round(t(e,i,r)/K_)*K_,Math.round(n(e,i,r)/K_)*K_];return o.index=i,o.data=e,o}),e)}return r.polygons=function(t){return r(t).polygons()},r.links=function(t){return r(t).links()},r.triangles=function(t){return r(t).triangles()},r.x=function(n){return arguments.length?(t="function"==typeof n?n:m_(+n),r):t},r.y=function(t){return arguments.length?(n="function"==typeof t?t:m_(+t),r):n},r.extent=function(t){return arguments.length?(e=null==t?null:[[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]],r):e&&[[e[0][0],e[0][1]],[e[1][0],e[1][1]]]},r.size=function(t){return arguments.length?(e=null==t?null:[[0,0],[+t[0],+t[1]]],r):e&&[e[1][0]-e[0][0],e[1][1]-e[0][1]]},r},t.zoom=function(){var n,e,r=sb,i=lb,o=vb,a=db,u=pb,f=[0,1/0],c=[[-1/0,-1/0],[1/0,1/0]],s=250,l=qe,h=[],d=I("start","zoom","end"),p=500,v=150,g=0;function y(t){t.property("__zoom",hb).on("wheel.zoom",A).on("mousedown.zoom",T).on("dblclick.zoom",N).filter(u).on("touchstart.zoom",S).on("touchmove.zoom",E).on("touchend.zoom touchcancel.zoom",k).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function _(t,n){return(n=Math.max(f[0],Math.min(f[1],n)))===t.k?t:new ob(n,t.x,t.y)}function b(t,n,e){var r=n[0]-e[0]*t.k,i=n[1]-e[1]*t.k;return r===t.x&&i===t.y?t:new ob(t.k,r,i)}function m(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function x(t,n,e){t.on("start.zoom",function(){w(this,arguments).start()}).on("interrupt.zoom end.zoom",function(){w(this,arguments).end()}).tween("zoom",function(){var t=arguments,r=w(this,t),o=i.apply(this,t),a=e||m(o),u=Math.max(o[1][0]-o[0][0],o[1][1]-o[0][1]),f=this.__zoom,c="function"==typeof n?n.apply(this,t):n,s=l(f.invert(a).concat(u/f.k),c.invert(a).concat(u/c.k));return function(t){if(1===t)t=c;else{var n=s(t),e=u/n[2];t=new ob(e,a[0]-n[0]*e,a[1]-n[1]*e)}r.zoom(null,t)}})}function w(t,n){for(var e,r=0,i=h.length;r<i;++r)if((e=h[r]).that===t)return e;return new M(t,n)}function M(t,n){this.that=t,this.args=n,this.index=-1,this.active=0,this.extent=i.apply(t,n)}function A(){if(r.apply(this,arguments)){var t=w(this,arguments),n=this.__zoom,e=Math.max(f[0],Math.min(f[1],n.k*Math.pow(2,a.apply(this,arguments)))),i=Ft(this);if(t.wheel)t.mouse[0][0]===i[0]&&t.mouse[0][1]===i[1]||(t.mouse[1]=n.invert(t.mouse[0]=i)),clearTimeout(t.wheel);else{if(n.k===e)return;t.mouse=[i,n.invert(i)],Nr(this),t.start()}cb(),t.wheel=setTimeout(function(){t.wheel=null,t.end()},v),t.zoom("mouse",o(b(_(n,e),t.mouse[0],t.mouse[1]),t.extent,c))}}function T(){if(!e&&r.apply(this,arguments)){var n=w(this,arguments),i=Dt(t.event.view).on("mousemove.zoom",function(){if(cb(),!n.moved){var e=t.event.clientX-u,r=t.event.clientY-f;n.moved=e*e+r*r>g}n.zoom("mouse",o(b(n.that.__zoom,n.mouse[0]=Ft(n.that),n.mouse[1]),n.extent,c))},!0).on("mouseup.zoom",function(){i.on("mousemove.zoom mouseup.zoom",null),Gt(t.event.view,n.moved),cb(),n.end()},!0),a=Ft(this),u=t.event.clientX,f=t.event.clientY;Xt(t.event.view),fb(),n.mouse=[a,this.__zoom.invert(a)],Nr(this),n.start()}}function N(){if(r.apply(this,arguments)){var n=this.__zoom,e=Ft(this),a=n.invert(e),u=n.k*(t.event.shiftKey?.5:2),f=o(b(_(n,u),e,a),i.apply(this,arguments),c);cb(),s>0?Dt(this).transition().duration(s).call(x,f,e):Dt(this).call(y.transform,f)}}function S(){if(r.apply(this,arguments)){var e,i,o,a,u=w(this,arguments),f=t.event.changedTouches,c=f.length;for(fb(),i=0;i<c;++i)a=[a=It(this,f,(o=f[i]).identifier),this.__zoom.invert(a),o.identifier],u.touch0?u.touch1||(u.touch1=a):(u.touch0=a,e=!0);if(n&&(n=clearTimeout(n),!u.touch1))return u.end(),void((a=Dt(this).on("dblclick.zoom"))&&a.apply(this,arguments));e&&(n=setTimeout(function(){n=null},p),Nr(this),u.start())}}function E(){var e,r,i,a,u=w(this,arguments),f=t.event.changedTouches,s=f.length;for(cb(),n&&(n=clearTimeout(n)),e=0;e<s;++e)i=It(this,f,(r=f[e]).identifier),u.touch0&&u.touch0[2]===r.identifier?u.touch0[0]=i:u.touch1&&u.touch1[2]===r.identifier&&(u.touch1[0]=i);if(r=u.that.__zoom,u.touch1){var l=u.touch0[0],h=u.touch0[1],d=u.touch1[0],p=u.touch1[1],v=(v=d[0]-l[0])*v+(v=d[1]-l[1])*v,g=(g=p[0]-h[0])*g+(g=p[1]-h[1])*g;r=_(r,Math.sqrt(v/g)),i=[(l[0]+d[0])/2,(l[1]+d[1])/2],a=[(h[0]+p[0])/2,(h[1]+p[1])/2]}else{if(!u.touch0)return;i=u.touch0[0],a=u.touch0[1]}u.zoom("touch",o(b(r,i,a),u.extent,c))}function k(){var n,r,i=w(this,arguments),o=t.event.changedTouches,a=o.length;for(fb(),e&&clearTimeout(e),e=setTimeout(function(){e=null},p),n=0;n<a;++n)r=o[n],i.touch0&&i.touch0[2]===r.identifier?delete i.touch0:i.touch1&&i.touch1[2]===r.identifier&&delete i.touch1;i.touch1&&!i.touch0&&(i.touch0=i.touch1,delete i.touch1),i.touch0?i.touch0[1]=this.__zoom.invert(i.touch0[0]):i.end()}return y.transform=function(t,n){var e=t.selection?t.selection():t;e.property("__zoom",hb),t!==e?x(t,n):e.interrupt().each(function(){w(this,arguments).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()})},y.scaleBy=function(t,n){y.scaleTo(t,function(){return this.__zoom.k*("function"==typeof n?n.apply(this,arguments):n)})},y.scaleTo=function(t,n){y.transform(t,function(){var t=i.apply(this,arguments),e=this.__zoom,r=m(t),a=e.invert(r),u="function"==typeof n?n.apply(this,arguments):n;return o(b(_(e,u),r,a),t,c)})},y.translateBy=function(t,n,e){y.transform(t,function(){return o(this.__zoom.translate("function"==typeof n?n.apply(this,arguments):n,"function"==typeof e?e.apply(this,arguments):e),i.apply(this,arguments),c)})},y.translateTo=function(t,n,e){y.transform(t,function(){var t=i.apply(this,arguments),r=this.__zoom,a=m(t);return o(ab.translate(a[0],a[1]).scale(r.k).translate("function"==typeof n?-n.apply(this,arguments):-n,"function"==typeof e?-e.apply(this,arguments):-e),t,c)})},M.prototype={start:function(){return 1==++this.active&&(this.index=h.push(this)-1,this.emit("start")),this},zoom:function(t,n){return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),this.that.__zoom=n,this.emit("zoom"),this},end:function(){return 0==--this.active&&(h.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(t){Ct(new ib(y,t,this.that.__zoom),d.apply,d,[t,this.that,this.args])}},y.wheelDelta=function(t){return arguments.length?(a="function"==typeof t?t:rb(+t),y):a},y.filter=function(t){return arguments.length?(r="function"==typeof t?t:rb(!!t),y):r},y.touchable=function(t){return arguments.length?(u="function"==typeof t?t:rb(!!t),y):u},y.extent=function(t){return arguments.length?(i="function"==typeof t?t:rb([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),y):i},y.scaleExtent=function(t){return arguments.length?(f[0]=+t[0],f[1]=+t[1],y):[f[0],f[1]]},y.translateExtent=function(t){return arguments.length?(c[0][0]=+t[0][0],c[1][0]=+t[1][0],c[0][1]=+t[0][1],c[1][1]=+t[1][1],y):[[c[0][0],c[0][1]],[c[1][0],c[1][1]]]},y.constrain=function(t){return arguments.length?(o=t,y):o},y.duration=function(t){return arguments.length?(s=+t,y):s},y.interpolate=function(t){return arguments.length?(l=t,y):l},y.on=function(){var t=d.on.apply(d,arguments);return t===d?y:t},y.clickDistance=function(t){return arguments.length?(g=(t=+t)*t,y):Math.sqrt(g)},y},t.zoomTransform=ub,t.zoomIdentity=ab,Object.defineProperty(t,"__esModule",{value:!0})});

/* @license C3.js v0.6.8 | (c) C3 Team and other contributors | http://c3js.org/ */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.c3=e()}(this,function(){"use strict";function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t){var e=this;e.d3=window.d3?window.d3:"undefined"!=typeof require?require("d3"):void 0,e.api=t,e.config=e.getDefaultConfig(),e.data={},e.cache={},e.axes={}}function n(t){var e=this.internal=new l(this);e.loadConfig(t),e.beforeInit(t),e.init(),e.afterInit(t),function e(i,n,r){Object.keys(i).forEach(function(t){n[t]=i[t].bind(r),0<Object.keys(i[t]).length&&e(i[t],n[t],r)})}(n.prototype,this,this)}function i(t,e){var i=this;i.component=t,i.params=e||{},i.d3=t.d3,i.scale=i.d3.scaleLinear(),i.range,i.orient="bottom",i.innerTickSize=6,i.outerTickSize=this.params.withOuterTick?6:0,i.tickPadding=3,i.tickValues=null,i.tickFormat,i.tickArguments,i.tickOffset=0,i.tickCulling=!0,i.tickCentered,i.tickTextCharSize,i.tickTextRotate=i.params.tickTextRotate,i.tickLength,i.axis=i.generateAxis()}i.prototype.axisX=function(t,e,i){t.attr("transform",function(t){return"translate("+Math.ceil(e(t)+i)+", 0)"})},i.prototype.axisY=function(t,e){t.attr("transform",function(t){return"translate(0,"+Math.ceil(e(t))+")"})},i.prototype.scaleExtent=function(t){var e=t[0],i=t[t.length-1];return e<i?[e,i]:[i,e]},i.prototype.generateTicks=function(t){var e,i,n=[];if(t.ticks)return t.ticks.apply(t,this.tickArguments);for(i=t.domain(),e=Math.ceil(i[0]);e<i[1];e++)n.push(e);return 0<n.length&&0<n[0]&&n.unshift(n[0]-(n[1]-n[0])),n},i.prototype.copyScale=function(){var t,e=this.scale.copy();return this.params.isCategory&&(t=this.scale.domain(),e.domain([t[0],t[1]-1])),e},i.prototype.textFormatted=function(t){var e=this.tickFormat?this.tickFormat(t):t;return void 0!==e?e:""},i.prototype.updateRange=function(){var t=this;return t.range=t.scale.rangeExtent?t.scale.rangeExtent():t.scaleExtent(t.scale.range()),t.range},i.prototype.updateTickTextCharSize=function(t){var a=this;if(a.tickTextCharSize)return a.tickTextCharSize;var o={h:11.5,w:5.5};return t.select("text").text(function(t){return a.textFormatted(t)}).each(function(t){var e=this.getBoundingClientRect(),i=a.textFormatted(t),n=e.height,r=i?e.width/i.length:void 0;n&&r&&(o.h=n,o.w=r)}).text(""),a.tickTextCharSize=o},i.prototype.isVertical=function(){return"left"===this.orient||"right"===this.orient},i.prototype.tspanData=function(t,e,i){var n=this,r=n.params.tickMultiline?n.splitTickText(t,i):[].concat(n.textFormatted(t));return n.params.tickMultiline&&0<n.params.tickMultilineMax&&(r=n.ellipsify(r,n.params.tickMultilineMax)),r.map(function(t){return{index:e,splitted:t,length:r.length}})},i.prototype.splitTickText=function(t,e){var r,a,o,s=this,i=s.textFormatted(t),c=s.params.tickWidth;if("[object Array]"===Object.prototype.toString.call(i))return i;return(!c||c<=0)&&(c=s.isVertical()?95:s.params.isCategory?Math.ceil(e(1)-e(0))-12:110),function t(e,i){a=void 0;for(var n=1;n<i.length;n++)if(" "===i.charAt(n)&&(a=n),r=i.substr(0,n+1),o=s.tickTextCharSize.w*r.length,c<o)return t(e.concat(i.substr(0,a||n)),i.slice(a?a+1:n));return e.concat(i)}([],i+"")},i.prototype.ellipsify=function(t,e){if(t.length<=e)return t;for(var i=t.slice(0,e),n=3,r=e-1;0<=r;r--){var a=i[r].length;if(i[r]=i[r].substr(0,a-n).padEnd(a,"."),(n-=a)<=0)break}return i},i.prototype.updateTickLength=function(){this.tickLength=Math.max(this.innerTickSize,0)+this.tickPadding},i.prototype.lineY2=function(t){var e=this,i=e.scale(t)+(e.tickCentered?0:e.tickOffset);return e.range[0]<i&&i<e.range[1]?e.innerTickSize:0},i.prototype.textY=function(){var t=this.tickTextRotate;return t?11.5-t/15*2.5*(0<t?1:-1):this.tickLength},i.prototype.textTransform=function(){var t=this.tickTextRotate;return t?"rotate("+t+")":""},i.prototype.textTextAnchor=function(){var t=this.tickTextRotate;return t?0<t?"start":"end":"middle"},i.prototype.tspanDx=function(){var t=this.tickTextRotate;return t?8*Math.sin(Math.PI*(t/180)):0},i.prototype.tspanDy=function(t,e){var i=this.tickTextCharSize.h;return 0===e&&(i=this.isVertical()?-((t.length-1)*(this.tickTextCharSize.h/2)-3):".71em"),i},i.prototype.generateAxis=function(){var w=this,v=w.d3,b=w.params;function A(t,m){var S;return t.each(function(){var t,e,i,n=A.g=v.select(this),r=this.__chart__||w.scale,a=this.__chart__=w.copyScale(),o=w.tickValues?w.tickValues:w.generateTicks(a),s=n.selectAll(".tick").data(o,a),c=s.enter().insert("g",".domain").attr("class","tick").style("opacity",1e-6),d=s.exit().remove(),l=s.merge(c);b.isCategory?(w.tickOffset=Math.ceil((a(1)-a(0))/2),e=w.tickCentered?0:w.tickOffset,i=w.tickCentered?w.tickOffset:0):w.tickOffset=e=0,w.updateRange(),w.updateTickLength(),w.updateTickTextCharSize(n.select(".tick"));var u=l.select("line").merge(c.append("line")),h=l.select("text").merge(c.append("text")),g=l.selectAll("text").selectAll("tspan").data(function(t,e){return w.tspanData(t,e,a)}),p=g.enter().append("tspan").merge(g).text(function(t){return t.splitted});g.exit().remove();var f=n.selectAll(".domain").data([0]),_=f.enter().append("path").merge(f).attr("class","domain");switch(w.orient){case"bottom":t=w.axisX,u.attr("x1",e).attr("x2",e).attr("y2",function(t,e){return w.lineY2(t,e)}),h.attr("x",0).attr("y",function(t,e){return w.textY(t,e)}).attr("transform",function(t,e){return w.textTransform(t,e)}).style("text-anchor",function(t,e){return w.textTextAnchor(t,e)}),p.attr("x",0).attr("dy",function(t,e){return w.tspanDy(t,e)}).attr("dx",function(t,e){return w.tspanDx(t,e)}),_.attr("d","M"+w.range[0]+","+w.outerTickSize+"V0H"+w.range[1]+"V"+w.outerTickSize);break;case"top":t=w.axisX,u.attr("x1",e).attr("x2",e).attr("y2",function(t,e){return-1*w.lineY2(t,e)}),h.attr("x",0).attr("y",function(t,e){return-1*w.textY(t,e)-(b.isCategory?2:w.tickLength-2)}).attr("transform",function(t,e){return w.textTransform(t,e)}).style("text-anchor",function(t,e){return w.textTextAnchor(t,e)}),p.attr("x",0).attr("dy",function(t,e){return w.tspanDy(t,e)}).attr("dx",function(t,e){return w.tspanDx(t,e)}),_.attr("d","M"+w.range[0]+","+-w.outerTickSize+"V0H"+w.range[1]+"V"+-w.outerTickSize);break;case"left":t=w.axisY,u.attr("x2",-w.innerTickSize).attr("y1",i).attr("y2",i),h.attr("x",-w.tickLength).attr("y",w.tickOffset).style("text-anchor","end"),p.attr("x",-w.tickLength).attr("dy",function(t,e){return w.tspanDy(t,e)}),_.attr("d","M"+-w.outerTickSize+","+w.range[0]+"H0V"+w.range[1]+"H"+-w.outerTickSize);break;case"right":t=w.axisY,u.attr("x2",w.innerTickSize).attr("y1",i).attr("y2",i),h.attr("x",w.tickLength).attr("y",w.tickOffset).style("text-anchor","start"),p.attr("x",w.tickLength).attr("dy",function(t,e){return w.tspanDy(t,e)}),_.attr("d","M"+w.outerTickSize+","+w.range[0]+"H0V"+w.range[1]+"H"+w.outerTickSize)}if(a.rangeBand){var x=a,y=x.rangeBand()/2;r=a=function(t){return x(t)+y}}else r.rangeBand?r=a:d.call(t,a,w.tickOffset);c.call(t,r,w.tickOffset),S=(m?l.transition(m):l).style("opacity",1).call(t,a,w.tickOffset)}),S}return A.scale=function(t){return arguments.length?(w.scale=t,A):w.scale},A.orient=function(t){return arguments.length?(w.orient=t in{top:1,right:1,bottom:1,left:1}?t+"":"bottom",A):w.orient},A.tickFormat=function(t){return arguments.length?(w.tickFormat=t,A):w.tickFormat},A.tickCentered=function(t){return arguments.length?(w.tickCentered=t,A):w.tickCentered},A.tickOffset=function(){return w.tickOffset},A.tickInterval=function(){var t;return(t=b.isCategory?2*w.tickOffset:(A.g.select("path.domain").node().getTotalLength()-2*w.outerTickSize)/A.g.selectAll("line").size())===1/0?0:t},A.ticks=function(){return arguments.length?(w.tickArguments=arguments,A):w.tickArguments},A.tickCulling=function(t){return arguments.length?(w.tickCulling=t,A):w.tickCulling},A.tickValues=function(t){if("function"==typeof t)w.tickValues=function(){return t(w.scale.domain())};else{if(!arguments.length)return w.tickValues;w.tickValues=t}return A},A};var Y={target:"c3-target",chart:"c3-chart",chartLine:"c3-chart-line",chartLines:"c3-chart-lines",chartBar:"c3-chart-bar",chartBars:"c3-chart-bars",chartText:"c3-chart-text",chartTexts:"c3-chart-texts",chartArc:"c3-chart-arc",chartArcs:"c3-chart-arcs",chartArcsTitle:"c3-chart-arcs-title",chartArcsBackground:"c3-chart-arcs-background",chartArcsGaugeUnit:"c3-chart-arcs-gauge-unit",chartArcsGaugeMax:"c3-chart-arcs-gauge-max",chartArcsGaugeMin:"c3-chart-arcs-gauge-min",selectedCircle:"c3-selected-circle",selectedCircles:"c3-selected-circles",eventRect:"c3-event-rect",eventRects:"c3-event-rects",eventRectsSingle:"c3-event-rects-single",eventRectsMultiple:"c3-event-rects-multiple",zoomRect:"c3-zoom-rect",brush:"c3-brush",dragZoom:"c3-drag-zoom",focused:"c3-focused",defocused:"c3-defocused",region:"c3-region",regions:"c3-regions",title:"c3-title",tooltipContainer:"c3-tooltip-container",tooltip:"c3-tooltip",tooltipName:"c3-tooltip-name",shape:"c3-shape",shapes:"c3-shapes",line:"c3-line",lines:"c3-lines",bar:"c3-bar",bars:"c3-bars",circle:"c3-circle",circles:"c3-circles",arc:"c3-arc",arcLabelLine:"c3-arc-label-line",arcs:"c3-arcs",area:"c3-area",areas:"c3-areas",empty:"c3-empty",text:"c3-text",texts:"c3-texts",gaugeValue:"c3-gauge-value",grid:"c3-grid",gridLines:"c3-grid-lines",xgrid:"c3-xgrid",xgrids:"c3-xgrids",xgridLine:"c3-xgrid-line",xgridLines:"c3-xgrid-lines",xgridFocus:"c3-xgrid-focus",ygrid:"c3-ygrid",ygrids:"c3-ygrids",ygridLine:"c3-ygrid-line",ygridLines:"c3-ygrid-lines",axis:"c3-axis",axisX:"c3-axis-x",axisXLabel:"c3-axis-x-label",axisY:"c3-axis-y",axisYLabel:"c3-axis-y-label",axisY2:"c3-axis-y2",axisY2Label:"c3-axis-y2-label",legendBackground:"c3-legend-background",legendItem:"c3-legend-item",legendItemEvent:"c3-legend-item-event",legendItemTile:"c3-legend-item-tile",legendItemHidden:"c3-legend-item-hidden",legendItemFocused:"c3-legend-item-focused",dragarea:"c3-dragarea",EXPANDED:"_expanded_",SELECTED:"_selected_",INCLUDED:"_included_"},a=function(t){return Math.ceil(t)+.5},r=function(t){return 10*Math.ceil(t/10)},R=function(t){return t[1]-t[0]},N=function(t,e,i){return k(t[e])?t[e]:i},y=function(t){var e=t.getBoundingClientRect(),i=[t.pathSegList.getItem(0),t.pathSegList.getItem(1)];return{x:i[0].x,y:Math.min(i[0].y,i[1].y),width:e.width,height:e.height}},o=function(t){return Array.isArray(t)},k=function(t){return void 0!==t},u=function(t){return null==t||c(t)&&0===t.length||"object"===s(t)&&0===Object.keys(t).length},h=function(t){return"function"==typeof t},c=function(t){return"string"==typeof t},v=function(t){return void 0===t},P=function(t){return t||0===t},C=function(t){return!u(t)},_=function(t){return"string"==typeof t?t.replace(/</g,"&lt;").replace(/>/g,"&gt;"):t},d=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.owner=e,this.d3=e.d3,this.internal=i};d.prototype.init=function(){var t=this.owner,e=t.config,i=t.main;t.axes.x=i.append("g").attr("class",Y.axis+" "+Y.axisX).attr("clip-path",e.axis_x_inner?"":t.clipPathForXAxis).attr("transform",t.getTranslate("x")).style("visibility",e.axis_x_show?"visible":"hidden"),t.axes.x.append("text").attr("class",Y.axisXLabel).attr("transform",e.axis_rotated?"rotate(-90)":"").style("text-anchor",this.textAnchorForXAxisLabel.bind(this)),t.axes.y=i.append("g").attr("class",Y.axis+" "+Y.axisY).attr("clip-path",e.axis_y_inner?"":t.clipPathForYAxis).attr("transform",t.getTranslate("y")).style("visibility",e.axis_y_show?"visible":"hidden"),t.axes.y.append("text").attr("class",Y.axisYLabel).attr("transform",e.axis_rotated?"":"rotate(-90)").style("text-anchor",this.textAnchorForYAxisLabel.bind(this)),t.axes.y2=i.append("g").attr("class",Y.axis+" "+Y.axisY2).attr("transform",t.getTranslate("y2")).style("visibility",e.axis_y2_show?"visible":"hidden"),t.axes.y2.append("text").attr("class",Y.axisY2Label).attr("transform",e.axis_rotated?"":"rotate(-90)").style("text-anchor",this.textAnchorForY2AxisLabel.bind(this))},d.prototype.getXAxis=function(t,e,i,n,r,a,o){var s=this.owner,c=s.config,d={isCategory:s.isCategorized(),withOuterTick:r,tickMultiline:c.axis_x_tick_multiline,tickMultilineMax:c.axis_x_tick_multiline?Number(c.axis_x_tick_multilineMax):0,tickWidth:c.axis_x_tick_width,tickTextRotate:o?0:c.axis_x_tick_rotate,withoutTransition:a},l=new this.internal(this,d).axis.scale(t).orient(e);return s.isTimeSeries()&&n&&"function"!=typeof n&&(n=n.map(function(t){return s.parseDate(t)})),l.tickFormat(i).tickValues(n),s.isCategorized()&&(l.tickCentered(c.axis_x_tick_centered),u(c.axis_x_tick_culling)&&(c.axis_x_tick_culling=!1)),l},d.prototype.updateXAxisTickValues=function(t,e){var i,n=this.owner,r=n.config;return(r.axis_x_tick_fit||r.axis_x_tick_count)&&(i=this.generateTickValues(n.mapTargetsToUniqueXs(t),r.axis_x_tick_count,n.isTimeSeries())),e?e.tickValues(i):(n.xAxis.tickValues(i),n.subXAxis.tickValues(i)),i},d.prototype.getYAxis=function(t,e,i,n,r,a,o){var s=this.owner,c=s.config,d={withOuterTick:r,withoutTransition:a,tickTextRotate:o?0:c.axis_y_tick_rotate},l=new this.internal(this,d).axis.scale(t).orient(e).tickFormat(i);return s.isTimeSeriesY()?l.ticks(c.axis_y_tick_time_type,c.axis_y_tick_time_interval):l.tickValues(n),l},d.prototype.getId=function(t){var e=this.owner.config;return t in e.data_axes?e.data_axes[t]:"y"},d.prototype.getXAxisTickFormat=function(){var e=this.owner,i=e.config,n=e.isTimeSeries()?e.defaultAxisTimeFormat:e.isCategorized()?e.categoryName:function(t){return t};return i.axis_x_tick_format&&(h(i.axis_x_tick_format)?n=i.axis_x_tick_format:e.isTimeSeries()&&(n=function(t){return t?e.axisTimeFormat(i.axis_x_tick_format)(t):""})),h(n)?function(t){return n.call(e,t)}:n},d.prototype.getTickValues=function(t,e){return t||(e?e.tickValues():void 0)},d.prototype.getXAxisTickValues=function(){return this.getTickValues(this.owner.config.axis_x_tick_values,this.owner.xAxis)},d.prototype.getYAxisTickValues=function(){return this.getTickValues(this.owner.config.axis_y_tick_values,this.owner.yAxis)},d.prototype.getY2AxisTickValues=function(){return this.getTickValues(this.owner.config.axis_y2_tick_values,this.owner.y2Axis)},d.prototype.getLabelOptionByAxisId=function(t){var e,i=this.owner.config;return"y"===t?e=i.axis_y_label:"y2"===t?e=i.axis_y2_label:"x"===t&&(e=i.axis_x_label),e},d.prototype.getLabelText=function(t){var e=this.getLabelOptionByAxisId(t);return c(e)?e:e?e.text:null},d.prototype.setLabelText=function(t,e){var i=this.owner.config,n=this.getLabelOptionByAxisId(t);c(n)?"y"===t?i.axis_y_label=e:"y2"===t?i.axis_y2_label=e:"x"===t&&(i.axis_x_label=e):n&&(n.text=e)},d.prototype.getLabelPosition=function(t,e){var i=this.getLabelOptionByAxisId(t),n=i&&"object"===s(i)&&i.position?i.position:e;return{isInner:0<=n.indexOf("inner"),isOuter:0<=n.indexOf("outer"),isLeft:0<=n.indexOf("left"),isCenter:0<=n.indexOf("center"),isRight:0<=n.indexOf("right"),isTop:0<=n.indexOf("top"),isMiddle:0<=n.indexOf("middle"),isBottom:0<=n.indexOf("bottom")}},d.prototype.getXAxisLabelPosition=function(){return this.getLabelPosition("x",this.owner.config.axis_rotated?"inner-top":"inner-right")},d.prototype.getYAxisLabelPosition=function(){return this.getLabelPosition("y",this.owner.config.axis_rotated?"inner-right":"inner-top")},d.prototype.getY2AxisLabelPosition=function(){return this.getLabelPosition("y2",this.owner.config.axis_rotated?"inner-right":"inner-top")},d.prototype.getLabelPositionById=function(t){return"y2"===t?this.getY2AxisLabelPosition():"y"===t?this.getYAxisLabelPosition():this.getXAxisLabelPosition()},d.prototype.textForXAxisLabel=function(){return this.getLabelText("x")},d.prototype.textForYAxisLabel=function(){return this.getLabelText("y")},d.prototype.textForY2AxisLabel=function(){return this.getLabelText("y2")},d.prototype.xForAxisLabel=function(t,e){var i=this.owner;return t?e.isLeft?0:e.isCenter?i.width/2:i.width:e.isBottom?-i.height:e.isMiddle?-i.height/2:0},d.prototype.dxForAxisLabel=function(t,e){return t?e.isLeft?"0.5em":e.isRight?"-0.5em":"0":e.isTop?"-0.5em":e.isBottom?"0.5em":"0"},d.prototype.textAnchorForAxisLabel=function(t,e){return t?e.isLeft?"start":e.isCenter?"middle":"end":e.isBottom?"start":e.isMiddle?"middle":"end"},d.prototype.xForXAxisLabel=function(){return this.xForAxisLabel(!this.owner.config.axis_rotated,this.getXAxisLabelPosition())},d.prototype.xForYAxisLabel=function(){return this.xForAxisLabel(this.owner.config.axis_rotated,this.getYAxisLabelPosition())},d.prototype.xForY2AxisLabel=function(){return this.xForAxisLabel(this.owner.config.axis_rotated,this.getY2AxisLabelPosition())},d.prototype.dxForXAxisLabel=function(){return this.dxForAxisLabel(!this.owner.config.axis_rotated,this.getXAxisLabelPosition())},d.prototype.dxForYAxisLabel=function(){return this.dxForAxisLabel(this.owner.config.axis_rotated,this.getYAxisLabelPosition())},d.prototype.dxForY2AxisLabel=function(){return this.dxForAxisLabel(this.owner.config.axis_rotated,this.getY2AxisLabelPosition())},d.prototype.dyForXAxisLabel=function(){var t=this.owner,e=t.config,i=this.getXAxisLabelPosition();return e.axis_rotated?i.isInner?"1.2em":-25-(t.config.axis_x_inner?0:this.getMaxTickWidth("x")):i.isInner?"-0.5em":e.axis_x_height?e.axis_x_height-10:"3em"},d.prototype.dyForYAxisLabel=function(){var t=this.owner,e=this.getYAxisLabelPosition();return t.config.axis_rotated?e.isInner?"-0.5em":"3em":e.isInner?"1.2em":-10-(t.config.axis_y_inner?0:this.getMaxTickWidth("y")+10)},d.prototype.dyForY2AxisLabel=function(){var t=this.owner,e=this.getY2AxisLabelPosition();return t.config.axis_rotated?e.isInner?"1.2em":"-2.2em":e.isInner?"-0.5em":15+(t.config.axis_y2_inner?0:this.getMaxTickWidth("y2")+15)},d.prototype.textAnchorForXAxisLabel=function(){var t=this.owner;return this.textAnchorForAxisLabel(!t.config.axis_rotated,this.getXAxisLabelPosition())},d.prototype.textAnchorForYAxisLabel=function(){var t=this.owner;return this.textAnchorForAxisLabel(t.config.axis_rotated,this.getYAxisLabelPosition())},d.prototype.textAnchorForY2AxisLabel=function(){var t=this.owner;return this.textAnchorForAxisLabel(t.config.axis_rotated,this.getY2AxisLabelPosition())},d.prototype.getMaxTickWidth=function(t,e){var i,n,r,a,o=this.owner,s=o.config,c=0;return e&&o.currentMaxTickWidths[t]||(o.svg&&(i=o.filterTargetsToShow(o.data.targets),"y"===t?(n=o.y.copy().domain(o.getYDomain(i,"y")),r=this.getYAxis(n,o.yOrient,s.axis_y_tick_format,o.yAxisTickValues,!1,!0,!0)):"y2"===t?(n=o.y2.copy().domain(o.getYDomain(i,"y2")),r=this.getYAxis(n,o.y2Orient,s.axis_y2_tick_format,o.y2AxisTickValues,!1,!0,!0)):(n=o.x.copy().domain(o.getXDomain(i)),r=this.getXAxis(n,o.xOrient,o.xAxisTickFormat,o.xAxisTickValues,!1,!0,!0),this.updateXAxisTickValues(i,r)),(a=o.d3.select("body").append("div").classed("c3",!0)).append("svg").style("visibility","hidden").style("position","fixed").style("top",0).style("left",0).append("g").call(r).each(function(){o.d3.select(this).selectAll("text").each(function(){var t=this.getBoundingClientRect();c<t.width&&(c=t.width)}),a.remove()})),o.currentMaxTickWidths[t]=c<=0?o.currentMaxTickWidths[t]:c),o.currentMaxTickWidths[t]},d.prototype.updateLabels=function(t){var e=this.owner,i=e.main.select("."+Y.axisX+" ."+Y.axisXLabel),n=e.main.select("."+Y.axisY+" ."+Y.axisYLabel),r=e.main.select("."+Y.axisY2+" ."+Y.axisY2Label);(t?i.transition():i).attr("x",this.xForXAxisLabel.bind(this)).attr("dx",this.dxForXAxisLabel.bind(this)).attr("dy",this.dyForXAxisLabel.bind(this)).text(this.textForXAxisLabel.bind(this)),(t?n.transition():n).attr("x",this.xForYAxisLabel.bind(this)).attr("dx",this.dxForYAxisLabel.bind(this)).attr("dy",this.dyForYAxisLabel.bind(this)).text(this.textForYAxisLabel.bind(this)),(t?r.transition():r).attr("x",this.xForY2AxisLabel.bind(this)).attr("dx",this.dxForY2AxisLabel.bind(this)).attr("dy",this.dyForY2AxisLabel.bind(this)).text(this.textForY2AxisLabel.bind(this))},d.prototype.getPadding=function(t,e,i,n){var r="number"==typeof t?t:t[e];return P(r)?"ratio"===t.unit?t[e]*n:this.convertPixelsToAxisPadding(r,n):i},d.prototype.convertPixelsToAxisPadding=function(t,e){var i=this.owner;return e*(t/(i.config.axis_rotated?i.width:i.height))},d.prototype.generateTickValues=function(t,e,i){var n,r,a,o,s,c,d,l=t;if(e)if(1===(n=h(e)?e():e))l=[t[0]];else if(2===n)l=[t[0],t[t.length-1]];else if(2<n){for(o=n-2,r=t[0],s=((a=t[t.length-1])-r)/(o+1),l=[r],c=0;c<o;c++)d=+r+s*(c+1),l.push(i?new Date(d):d);l.push(a)}return i||(l=l.sort(function(t,e){return t-e})),l},d.prototype.generateTransitions=function(t){var e=this.owner.axes;return{axisX:t?e.x.transition().duration(t):e.x,axisY:t?e.y.transition().duration(t):e.y,axisY2:t?e.y2.transition().duration(t):e.y2,axisSubX:t?e.subx.transition().duration(t):e.subx}},d.prototype.redraw=function(t,e){var i=this.owner,n=t?i.d3.transition().duration(t):null;i.axes.x.style("opacity",e?0:1).call(i.xAxis,n),i.axes.y.style("opacity",e?0:1).call(i.yAxis,n),i.axes.y2.style("opacity",e?0:1).call(i.y2Axis,n),i.axes.subx.style("opacity",e?0:1).call(i.subXAxis,n)};var t={version:"0.6.8",chart:{fn:n.prototype,internal:{fn:l.prototype,axis:{fn:d.prototype,internal:{fn:i.prototype}}}},generate:function(t){return new n(t)}};return l.prototype.beforeInit=function(){},l.prototype.afterInit=function(){},l.prototype.init=function(){var t=this,e=t.config;if(t.initParams(),e.data_url)t.convertUrlToData(e.data_url,e.data_mimeType,e.data_headers,e.data_keys,t.initWithData);else if(e.data_json)t.initWithData(t.convertJsonToData(e.data_json,e.data_keys));else if(e.data_rows)t.initWithData(t.convertRowsToData(e.data_rows));else{if(!e.data_columns)throw Error("url or json or rows or columns is required.");t.initWithData(t.convertColumnsToData(e.data_columns))}},l.prototype.initParams=function(){var t=this,e=t.d3,i=t.config;t.clipId="c3-"+ +new Date+"-clip",t.clipIdForXAxis=t.clipId+"-xaxis",t.clipIdForYAxis=t.clipId+"-yaxis",t.clipIdForGrid=t.clipId+"-grid",t.clipIdForSubchart=t.clipId+"-subchart",t.clipPath=t.getClipPath(t.clipId),t.clipPathForXAxis=t.getClipPath(t.clipIdForXAxis),t.clipPathForYAxis=t.getClipPath(t.clipIdForYAxis),t.clipPathForGrid=t.getClipPath(t.clipIdForGrid),t.clipPathForSubchart=t.getClipPath(t.clipIdForSubchart),t.dragStart=null,t.dragging=!1,t.flowing=!1,t.cancelClick=!1,t.mouseover=!1,t.transiting=!1,t.color=t.generateColor(),t.levelColor=t.generateLevelColor(),t.dataTimeParse=(i.data_xLocaltime?e.timeParse:e.utcParse)(t.config.data_xFormat),t.axisTimeFormat=i.axis_x_localtime?e.timeFormat:e.utcFormat,t.defaultAxisTimeFormat=function(t){return t.getMilliseconds()?e.timeFormat(".%L")(t):t.getSeconds()?e.timeFormat(":%S")(t):t.getMinutes()?e.timeFormat("%I:%M")(t):t.getHours()?e.timeFormat("%I %p")(t):t.getDay()&&1!==t.getDate()?e.timeFormat("%-m/%-d")(t):1!==t.getDate()?e.timeFormat("%-m/%-d")(t):t.getMonth()?e.timeFormat("%-m/%-d")(t):e.timeFormat("%Y/%-m/%-d")(t)},t.hiddenTargetIds=[],t.hiddenLegendIds=[],t.focusedTargetIds=[],t.defocusedTargetIds=[],t.xOrient=i.axis_rotated?i.axis_x_inner?"right":"left":i.axis_x_inner?"top":"bottom",t.yOrient=i.axis_rotated?i.axis_y_inner?"top":"bottom":i.axis_y_inner?"right":"left",t.y2Orient=i.axis_rotated?i.axis_y2_inner?"bottom":"top":i.axis_y2_inner?"left":"right",t.subXOrient=i.axis_rotated?"left":"bottom",t.isLegendRight="right"===i.legend_position,t.isLegendInset="inset"===i.legend_position,t.isLegendTop="top-left"===i.legend_inset_anchor||"top-right"===i.legend_inset_anchor,t.isLegendLeft="top-left"===i.legend_inset_anchor||"bottom-left"===i.legend_inset_anchor,t.legendStep=0,t.legendItemWidth=0,t.legendItemHeight=0,t.currentMaxTickWidths={x:0,y:0,y2:0},t.rotated_padding_left=30,t.rotated_padding_right=i.axis_rotated&&!i.axis_x_show?0:30,t.rotated_padding_top=5,t.withoutFadeIn={},t.intervalForObserveInserted=void 0,t.axes.subx=e.selectAll([])},l.prototype.initChartElements=function(){this.initBar&&this.initBar(),this.initLine&&this.initLine(),this.initArc&&this.initArc(),this.initGauge&&this.initGauge(),this.initText&&this.initText()},l.prototype.initWithData=function(t){var e,i,n=this,r=n.d3,a=n.config,o=!0;n.axis=new d(n),a.bindto?"function"==typeof a.bindto.node?n.selectChart=a.bindto:n.selectChart=r.select(a.bindto):n.selectChart=r.selectAll([]),n.selectChart.empty()&&(n.selectChart=r.select(document.createElement("div")).style("opacity",0),n.observeInserted(n.selectChart),o=!1),n.selectChart.html("").classed("c3",!0),n.data.xs={},n.data.targets=n.convertDataToTargets(t),a.data_filter&&(n.data.targets=n.data.targets.filter(a.data_filter)),a.data_hide&&n.addHiddenTargetIds(!0===a.data_hide?n.mapToIds(n.data.targets):a.data_hide),a.legend_hide&&n.addHiddenLegendIds(!0===a.legend_hide?n.mapToIds(n.data.targets):a.legend_hide),n.updateSizes(),n.updateScales(),n.x.domain(r.extent(n.getXDomain(n.data.targets))),n.y.domain(n.getYDomain(n.data.targets,"y")),n.y2.domain(n.getYDomain(n.data.targets,"y2")),n.subX.domain(n.x.domain()),n.subY.domain(n.y.domain()),n.subY2.domain(n.y2.domain()),n.orgXDomain=n.x.domain(),n.svg=n.selectChart.append("svg").style("overflow","hidden").on("mouseenter",function(){return a.onmouseover.call(n)}).on("mouseleave",function(){return a.onmouseout.call(n)}),n.config.svg_classname&&n.svg.attr("class",n.config.svg_classname),e=n.svg.append("defs"),n.clipChart=n.appendClip(e,n.clipId),n.clipXAxis=n.appendClip(e,n.clipIdForXAxis),n.clipYAxis=n.appendClip(e,n.clipIdForYAxis),n.clipGrid=n.appendClip(e,n.clipIdForGrid),n.clipSubchart=n.appendClip(e,n.clipIdForSubchart),n.updateSvgSize(),i=n.main=n.svg.append("g").attr("transform",n.getTranslate("main")),n.initPie&&n.initPie(),n.initDragZoom&&n.initDragZoom(),n.initSubchart&&n.initSubchart(),n.initTooltip&&n.initTooltip(),n.initLegend&&n.initLegend(),n.initTitle&&n.initTitle(),n.initZoom&&n.initZoom(),n.initSubchartBrush&&n.initSubchartBrush(),i.append("text").attr("class",Y.text+" "+Y.empty).attr("text-anchor","middle").attr("dominant-baseline","middle"),n.initRegion(),n.initGrid(),i.append("g").attr("clip-path",n.clipPath).attr("class",Y.chart),a.grid_lines_front&&n.initGridLines(),n.initEventRect(),n.initChartElements(),n.axis.init(),n.updateTargets(n.data.targets),a.axis_x_selection&&n.brush.selectionAsValue(n.getDefaultSelection()),o&&(n.updateDimension(),n.config.oninit.call(n),n.redraw({withTransition:!1,withTransform:!0,withUpdateXDomain:!0,withUpdateOrgXDomain:!0,withTransitionForAxis:!1})),n.bindResize(),n.api.element=n.selectChart.node()},l.prototype.smoothLines=function(t,e){var a=this;"grid"===e&&t.each(function(){var t=a.d3.select(this),e=t.attr("x1"),i=t.attr("x2"),n=t.attr("y1"),r=t.attr("y2");t.attr({x1:Math.ceil(e),x2:Math.ceil(i),y1:Math.ceil(n),y2:Math.ceil(r)})})},l.prototype.updateSizes=function(){var t=this,e=t.config,i=t.legend?t.getLegendHeight():0,n=t.legend?t.getLegendWidth():0,r=t.isLegendRight||t.isLegendInset?0:i,a=t.hasArcType(),o=e.axis_rotated||a?0:t.getHorizontalAxisHeight("x"),s=e.subchart_show&&!a?e.subchart_size_height+o:0;t.currentWidth=t.getCurrentWidth(),t.currentHeight=t.getCurrentHeight(),t.margin=e.axis_rotated?{top:t.getHorizontalAxisHeight("y2")+t.getCurrentPaddingTop(),right:a?0:t.getCurrentPaddingRight(),bottom:t.getHorizontalAxisHeight("y")+r+t.getCurrentPaddingBottom(),left:s+(a?0:t.getCurrentPaddingLeft())}:{top:4+t.getCurrentPaddingTop(),right:a?0:t.getCurrentPaddingRight(),bottom:o+s+r+t.getCurrentPaddingBottom(),left:a?0:t.getCurrentPaddingLeft()},t.margin2=e.axis_rotated?{top:t.margin.top,right:NaN,bottom:20+r,left:t.rotated_padding_left}:{top:t.currentHeight-s-r,right:NaN,bottom:o+r,left:t.margin.left},t.margin3={top:0,right:NaN,bottom:0,left:0},t.updateSizeForLegend&&t.updateSizeForLegend(i,n),t.width=t.currentWidth-t.margin.left-t.margin.right,t.height=t.currentHeight-t.margin.top-t.margin.bottom,t.width<0&&(t.width=0),t.height<0&&(t.height=0),t.width2=e.axis_rotated?t.margin.left-t.rotated_padding_left-t.rotated_padding_right:t.width,t.height2=e.axis_rotated?t.height:t.currentHeight-t.margin2.top-t.margin2.bottom,t.width2<0&&(t.width2=0),t.height2<0&&(t.height2=0),t.arcWidth=t.width-(t.isLegendRight?n+10:0),t.arcHeight=t.height-(t.isLegendRight?0:10),t.hasType("gauge")&&!e.gauge_fullCircle&&(t.arcHeight+=t.height-t.getGaugeLabelHeight()),t.updateRadius&&t.updateRadius(),t.isLegendRight&&a&&(t.margin3.left=t.arcWidth/2+1.1*t.radiusExpanded)},l.prototype.updateTargets=function(t){var e=this;e.updateTargetsForText(t),e.updateTargetsForBar(t),e.updateTargetsForLine(t),e.hasArcType()&&e.updateTargetsForArc&&e.updateTargetsForArc(t),e.updateTargetsForSubchart&&e.updateTargetsForSubchart(t),e.showTargets()},l.prototype.showTargets=function(){var e=this;e.svg.selectAll("."+Y.target).filter(function(t){return e.isTargetToShow(t.id)}).transition().duration(e.config.transition_duration).style("opacity",1)},l.prototype.redraw=function(t,e){var i,n,r,a,o,s,c,d,l,u,h,g,p,f,_,x,y,m,S,w,v,b,A,T,P,C,L,V,G,E,I,O=this,R=O.main,k=O.d3,D=O.config,F=O.getShapeIndices(O.isAreaType),X=O.getShapeIndices(O.isBarType),M=O.getShapeIndices(O.isLineType),z=O.hasArcType(),H=O.filterTargetsToShow(O.data.targets),B=O.xv.bind(O);if(i=N(t=t||{},"withY",!0),n=N(t,"withSubchart",!0),r=N(t,"withTransition",!0),s=N(t,"withTransform",!1),c=N(t,"withUpdateXDomain",!1),d=N(t,"withUpdateOrgXDomain",!1),l=N(t,"withTrimXDomain",!0),p=N(t,"withUpdateXAxis",c),u=N(t,"withLegend",!1),h=N(t,"withEventRect",!0),g=N(t,"withDimension",!0),a=N(t,"withTransitionForExit",r),o=N(t,"withTransitionForAxis",r),S=r?D.transition_duration:0,w=a?S:0,v=o?S:0,e=e||O.axis.generateTransitions(v),u&&D.legend_show?O.updateLegend(O.mapToIds(O.data.targets),t,e):g&&O.updateDimension(!0),O.isCategorized()&&0===H.length&&O.x.domain([0,O.axes.x.selectAll(".tick").size()]),H.length?(O.updateXDomain(H,c,d,l),D.axis_x_tick_values||(C=O.axis.updateXAxisTickValues(H))):(O.xAxis.tickValues([]),O.subXAxis.tickValues([])),D.zoom_rescale&&!t.flow&&(G=O.x.orgDomain()),O.y.domain(O.getYDomain(H,"y",G)),O.y2.domain(O.getYDomain(H,"y2",G)),!D.axis_y_tick_values&&D.axis_y_tick_count&&O.yAxis.tickValues(O.axis.generateTickValues(O.y.domain(),D.axis_y_tick_count)),!D.axis_y2_tick_values&&D.axis_y2_tick_count&&O.y2Axis.tickValues(O.axis.generateTickValues(O.y2.domain(),D.axis_y2_tick_count)),O.axis.redraw(v,z),O.axis.updateLabels(r),(c||p)&&H.length)if(D.axis_x_tick_culling&&C){for(L=1;L<C.length;L++)if(C.length/L<D.axis_x_tick_culling_max){V=L;break}O.svg.selectAll("."+Y.axisX+" .tick text").each(function(t){var e=C.indexOf(t);0<=e&&k.select(this).style("display",e%V?"none":"block")})}else O.svg.selectAll("."+Y.axisX+" .tick text").style("display","block");f=O.generateDrawArea?O.generateDrawArea(F,!1):void 0,_=O.generateDrawBar?O.generateDrawBar(X):void 0,x=O.generateDrawLine?O.generateDrawLine(M,!1):void 0,y=O.generateXYForText(F,X,M,!0),m=O.generateXYForText(F,X,M,!1),O.updateCircleY(),E=(O.config.axis_rotated?O.circleY:O.circleX).bind(O),I=(O.config.axis_rotated?O.circleX:O.circleY).bind(O),i&&(O.subY.domain(O.getYDomain(H,"y")),O.subY2.domain(O.getYDomain(H,"y2"))),O.updateXgridFocus(),R.select("text."+Y.text+"."+Y.empty).attr("x",O.width/2).attr("y",O.height/2).text(D.data_empty_label_text).transition().style("opacity",H.length?0:1),h&&O.redrawEventRect(),O.updateGrid(S),O.updateRegion(S),O.updateBar(w),O.updateLine(w),O.updateArea(w),O.updateCircle(E,I),O.hasDataLabel()&&O.updateText(y,m,w),O.redrawTitle&&O.redrawTitle(),O.redrawArc&&O.redrawArc(S,w,s),O.redrawSubchart&&O.redrawSubchart(n,e,S,w,F,X,M),R.selectAll("."+Y.selectedCircles).filter(O.isBarType.bind(O)).selectAll("circle").remove(),t.flow&&(T=O.generateFlow({targets:H,flow:t.flow,duration:t.flow.duration,drawBar:_,drawLine:x,drawArea:f,cx:E,cy:I,xv:B,xForText:y,yForText:m})),O.isTabVisible()&&(S?(P=k.transition().duration(S),b=[],[O.redrawBar(_,!0,P),O.redrawLine(x,!0,P),O.redrawArea(f,!0,P),O.redrawCircle(E,I,!0,P),O.redrawText(y,m,t.flow,!0,P),O.redrawRegion(!0,P),O.redrawGrid(!0,P)].forEach(function(t){t.forEach(function(t){b.push(t)})}),A=O.generateWait(),b.forEach(function(t){A.add(t)}),A(function(){T&&T(),D.onrendered&&D.onrendered.call(O)})):(O.redrawBar(_),O.redrawLine(x),O.redrawArea(f),O.redrawCircle(E,I),O.redrawText(y,m,t.flow),O.redrawRegion(),O.redrawGrid(),T&&T(),D.onrendered&&D.onrendered.call(O))),O.mapToIds(O.data.targets).forEach(function(t){O.withoutFadeIn[t]=!0})},l.prototype.updateAndRedraw=function(t){var e,i=this,n=i.config;(t=t||{}).withTransition=N(t,"withTransition",!0),t.withTransform=N(t,"withTransform",!1),t.withLegend=N(t,"withLegend",!1),t.withUpdateXDomain=N(t,"withUpdateXDomain",!0),t.withUpdateOrgXDomain=N(t,"withUpdateOrgXDomain",!0),t.withTransitionForExit=!1,t.withTransitionForTransform=N(t,"withTransitionForTransform",t.withTransition),i.updateSizes(),t.withLegend&&n.legend_show||(e=i.axis.generateTransitions(t.withTransitionForAxis?n.transition_duration:0),i.updateScales(),i.updateSvgSize(),i.transformAll(t.withTransitionForTransform,e)),i.redraw(t,e)},l.prototype.redrawWithoutRescale=function(){this.redraw({withY:!1,withSubchart:!1,withEventRect:!1,withTransitionForAxis:!1})},l.prototype.isTimeSeries=function(){return"timeseries"===this.config.axis_x_type},l.prototype.isCategorized=function(){return 0<=this.config.axis_x_type.indexOf("categor")},l.prototype.isCustomX=function(){var t=this.config;return!this.isTimeSeries()&&(t.data_x||C(t.data_xs))},l.prototype.isTimeSeriesY=function(){return"timeseries"===this.config.axis_y_type},l.prototype.getTranslate=function(t){var e,i,n=this,r=n.config;return"main"===t?(e=a(n.margin.left),i=a(n.margin.top)):"context"===t?(e=a(n.margin2.left),i=a(n.margin2.top)):"legend"===t?(e=n.margin3.left,i=n.margin3.top):"x"===t?(e=0,i=r.axis_rotated?0:n.height):"y"===t?(e=0,i=r.axis_rotated?n.height:0):"y2"===t?(e=r.axis_rotated?0:n.width,i=r.axis_rotated?1:0):"subx"===t?(e=0,i=r.axis_rotated?0:n.height2):"arc"===t&&(e=n.arcWidth/2,i=n.arcHeight/2-(n.hasType("gauge")?6:0)),"translate("+e+","+i+")"},l.prototype.initialOpacity=function(t){return null!==t.value&&this.withoutFadeIn[t.id]?1:0},l.prototype.initialOpacityForCircle=function(t){return null!==t.value&&this.withoutFadeIn[t.id]?this.opacityForCircle(t):0},l.prototype.opacityForCircle=function(t){var e=(h(this.config.point_show)?this.config.point_show(t):this.config.point_show)?1:0;return P(t.value)?this.isScatterType(t)?.5:e:0},l.prototype.opacityForText=function(){return this.hasDataLabel()?1:0},l.prototype.xx=function(t){return t?this.x(t.x):null},l.prototype.xv=function(t){var e=this,i=t.value;return e.isTimeSeries()?i=e.parseDate(t.value):e.isCategorized()&&"string"==typeof t.value&&(i=e.config.axis_x_categories.indexOf(t.value)),Math.ceil(e.x(i))},l.prototype.yv=function(t){var e=t.axis&&"y2"===t.axis?this.y2:this.y;return Math.ceil(e(t.value))},l.prototype.subxx=function(t){return t?this.subX(t.x):null},l.prototype.transformMain=function(t,e){var i,n,r,a=this;e&&e.axisX?i=e.axisX:(i=a.main.select("."+Y.axisX),t&&(i=i.transition())),e&&e.axisY?n=e.axisY:(n=a.main.select("."+Y.axisY),t&&(n=n.transition())),e&&e.axisY2?r=e.axisY2:(r=a.main.select("."+Y.axisY2),t&&(r=r.transition())),(t?a.main.transition():a.main).attr("transform",a.getTranslate("main")),i.attr("transform",a.getTranslate("x")),n.attr("transform",a.getTranslate("y")),r.attr("transform",a.getTranslate("y2")),a.main.select("."+Y.chartArcs).attr("transform",a.getTranslate("arc"))},l.prototype.transformAll=function(t,e){var i=this;i.transformMain(t,e),i.config.subchart_show&&i.transformContext(t,e),i.legend&&i.transformLegend(t)},l.prototype.updateSvgSize=function(){var t=this,e=t.svg.select(".c3-brush .overlay");t.svg.attr("width",t.currentWidth).attr("height",t.currentHeight),t.svg.selectAll(["#"+t.clipId,"#"+t.clipIdForGrid]).select("rect").attr("width",t.width).attr("height",t.height),t.svg.select("#"+t.clipIdForXAxis).select("rect").attr("x",t.getXAxisClipX.bind(t)).attr("y",t.getXAxisClipY.bind(t)).attr("width",t.getXAxisClipWidth.bind(t)).attr("height",t.getXAxisClipHeight.bind(t)),t.svg.select("#"+t.clipIdForYAxis).select("rect").attr("x",t.getYAxisClipX.bind(t)).attr("y",t.getYAxisClipY.bind(t)).attr("width",t.getYAxisClipWidth.bind(t)).attr("height",t.getYAxisClipHeight.bind(t)),t.svg.select("#"+t.clipIdForSubchart).select("rect").attr("width",t.width).attr("height",e.size()?e.attr("height"):0),t.selectChart.style("max-height",t.currentHeight+"px")},l.prototype.updateDimension=function(t){var e=this;t||(e.config.axis_rotated?(e.axes.x.call(e.xAxis),e.axes.subx.call(e.subXAxis)):(e.axes.y.call(e.yAxis),e.axes.y2.call(e.y2Axis))),e.updateSizes(),e.updateScales(),e.updateSvgSize(),e.transformAll(!1)},l.prototype.observeInserted=function(e){var i,n=this;"undefined"!=typeof MutationObserver?(i=new MutationObserver(function(t){t.forEach(function(t){"childList"===t.type&&t.previousSibling&&(i.disconnect(),n.intervalForObserveInserted=window.setInterval(function(){e.node().parentNode&&(window.clearInterval(n.intervalForObserveInserted),n.updateDimension(),n.brush&&n.brush.update(),n.config.oninit.call(n),n.redraw({withTransform:!0,withUpdateXDomain:!0,withUpdateOrgXDomain:!0,withTransition:!1,withTransitionForTransform:!1,withLegend:!0}),e.transition().style("opacity",1))},10))})})).observe(e.node(),{attributes:!0,childList:!0,characterData:!0}):window.console.error("MutationObserver not defined.")},l.prototype.bindResize=function(){var t=this,e=t.config;if(t.resizeFunction=t.generateResize(),t.resizeFunction.add(function(){e.onresize.call(t)}),e.resize_auto&&t.resizeFunction.add(function(){void 0!==t.resizeTimeout&&window.clearTimeout(t.resizeTimeout),t.resizeTimeout=window.setTimeout(function(){delete t.resizeTimeout,t.updateAndRedraw({withUpdateXDomain:!1,withUpdateOrgXDomain:!1,withTransition:!1,withTransitionForTransform:!1,withLegend:!0}),t.brush&&t.brush.update()},100)}),t.resizeFunction.add(function(){e.onresized.call(t)}),t.resizeIfElementDisplayed=function(){null!=t.api&&t.api.element.offsetParent&&t.resizeFunction()},window.attachEvent)window.attachEvent("onresize",t.resizeIfElementDisplayed);else if(window.addEventListener)window.addEventListener("resize",t.resizeIfElementDisplayed,!1);else{var i=window.onresize;i?i.add&&i.remove||(i=t.generateResize()).add(window.onresize):i=t.generateResize(),i.add(t.resizeFunction),window.onresize=function(){t.api.element.offsetParent&&i()}}},l.prototype.generateResize=function(){var i=[];function t(){i.forEach(function(t){t()})}return t.add=function(t){i.push(t)},t.remove=function(t){for(var e=0;e<i.length;e++)if(i[e]===t){i.splice(e,1);break}},t},l.prototype.endall=function(t,e){var i=0;t.each(function(){++i}).on("end",function(){--i||e.apply(this,arguments)})},l.prototype.generateWait=function(){var n=[],t=function(t){var i=setInterval(function(){var e=0;n.forEach(function(t){if(t.empty())e+=1;else try{t.transition()}catch(t){e+=1}}),e===n.length&&(clearInterval(i),t&&t())},50)};return t.add=function(t){n.push(t)},t},l.prototype.parseDate=function(t){var e;return t instanceof Date?e=t:"string"==typeof t?e=this.dataTimeParse(t):"object"===s(t)?e=new Date(+t):"number"!=typeof t||isNaN(t)||(e=new Date(+t)),e&&!isNaN(+e)||window.console.error("Failed to parse x '"+t+"' to Date object"),e},l.prototype.isTabVisible=function(){var t;return void 0!==document.hidden?t="hidden":void 0!==document.mozHidden?t="mozHidden":void 0!==document.msHidden?t="msHidden":void 0!==document.webkitHidden&&(t="webkitHidden"),!document[t]},l.prototype.getPathBox=y,l.prototype.CLASS=Y,"SVGPathSeg"in window||(window.SVGPathSeg=function(t,e,i){this.pathSegType=t,this.pathSegTypeAsLetter=e,this._owningPathSegList=i},window.SVGPathSeg.prototype.classname="SVGPathSeg",window.SVGPathSeg.PATHSEG_UNKNOWN=0,window.SVGPathSeg.PATHSEG_CLOSEPATH=1,window.SVGPathSeg.PATHSEG_MOVETO_ABS=2,window.SVGPathSeg.PATHSEG_MOVETO_REL=3,window.SVGPathSeg.PATHSEG_LINETO_ABS=4,window.SVGPathSeg.PATHSEG_LINETO_REL=5,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS=6,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL=7,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS=8,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL=9,window.SVGPathSeg.PATHSEG_ARC_ABS=10,window.SVGPathSeg.PATHSEG_ARC_REL=11,window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS=12,window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL=13,window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS=14,window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL=15,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS=16,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL=17,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS=18,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL=19,window.SVGPathSeg.prototype._segmentChanged=function(){this._owningPathSegList&&this._owningPathSegList.segmentChanged(this)},window.SVGPathSegClosePath=function(t){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CLOSEPATH,"z",t)},window.SVGPathSegClosePath.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegClosePath.prototype.toString=function(){return"[object SVGPathSegClosePath]"},window.SVGPathSegClosePath.prototype._asPathString=function(){return this.pathSegTypeAsLetter},window.SVGPathSegClosePath.prototype.clone=function(){return new window.SVGPathSegClosePath(void 0)},window.SVGPathSegMovetoAbs=function(t,e,i){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_MOVETO_ABS,"M",t),this._x=e,this._y=i},window.SVGPathSegMovetoAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegMovetoAbs.prototype.toString=function(){return"[object SVGPathSegMovetoAbs]"},window.SVGPathSegMovetoAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x+" "+this._y},window.SVGPathSegMovetoAbs.prototype.clone=function(){return new window.SVGPathSegMovetoAbs(void 0,this._x,this._y)},Object.defineProperty(window.SVGPathSegMovetoAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegMovetoAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegMovetoRel=function(t,e,i){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_MOVETO_REL,"m",t),this._x=e,this._y=i},window.SVGPathSegMovetoRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegMovetoRel.prototype.toString=function(){return"[object SVGPathSegMovetoRel]"},window.SVGPathSegMovetoRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x+" "+this._y},window.SVGPathSegMovetoRel.prototype.clone=function(){return new window.SVGPathSegMovetoRel(void 0,this._x,this._y)},Object.defineProperty(window.SVGPathSegMovetoRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegMovetoRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegLinetoAbs=function(t,e,i){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_LINETO_ABS,"L",t),this._x=e,this._y=i},window.SVGPathSegLinetoAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegLinetoAbs.prototype.toString=function(){return"[object SVGPathSegLinetoAbs]"},window.SVGPathSegLinetoAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x+" "+this._y},window.SVGPathSegLinetoAbs.prototype.clone=function(){return new window.SVGPathSegLinetoAbs(void 0,this._x,this._y)},Object.defineProperty(window.SVGPathSegLinetoAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegLinetoAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegLinetoRel=function(t,e,i){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_LINETO_REL,"l",t),this._x=e,this._y=i},window.SVGPathSegLinetoRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegLinetoRel.prototype.toString=function(){return"[object SVGPathSegLinetoRel]"},window.SVGPathSegLinetoRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x+" "+this._y},window.SVGPathSegLinetoRel.prototype.clone=function(){return new window.SVGPathSegLinetoRel(void 0,this._x,this._y)},Object.defineProperty(window.SVGPathSegLinetoRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegLinetoRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoCubicAbs=function(t,e,i,n,r,a,o){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS,"C",t),this._x=e,this._y=i,this._x1=n,this._y1=r,this._x2=a,this._y2=o},window.SVGPathSegCurvetoCubicAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoCubicAbs.prototype.toString=function(){return"[object SVGPathSegCurvetoCubicAbs]"},window.SVGPathSegCurvetoCubicAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x1+" "+this._y1+" "+this._x2+" "+this._y2+" "+this._x+" "+this._y},window.SVGPathSegCurvetoCubicAbs.prototype.clone=function(){return new window.SVGPathSegCurvetoCubicAbs(void 0,this._x,this._y,this._x1,this._y1,this._x2,this._y2)},Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype,"x1",{get:function(){return this._x1},set:function(t){this._x1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype,"y1",{get:function(){return this._y1},set:function(t){this._y1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype,"x2",{get:function(){return this._x2},set:function(t){this._x2=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype,"y2",{get:function(){return this._y2},set:function(t){this._y2=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoCubicRel=function(t,e,i,n,r,a,o){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL,"c",t),this._x=e,this._y=i,this._x1=n,this._y1=r,this._x2=a,this._y2=o},window.SVGPathSegCurvetoCubicRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoCubicRel.prototype.toString=function(){return"[object SVGPathSegCurvetoCubicRel]"},window.SVGPathSegCurvetoCubicRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x1+" "+this._y1+" "+this._x2+" "+this._y2+" "+this._x+" "+this._y},window.SVGPathSegCurvetoCubicRel.prototype.clone=function(){return new window.SVGPathSegCurvetoCubicRel(void 0,this._x,this._y,this._x1,this._y1,this._x2,this._y2)},Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype,"x1",{get:function(){return this._x1},set:function(t){this._x1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype,"y1",{get:function(){return this._y1},set:function(t){this._y1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype,"x2",{get:function(){return this._x2},set:function(t){this._x2=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype,"y2",{get:function(){return this._y2},set:function(t){this._y2=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoQuadraticAbs=function(t,e,i,n,r){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS,"Q",t),this._x=e,this._y=i,this._x1=n,this._y1=r},window.SVGPathSegCurvetoQuadraticAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoQuadraticAbs.prototype.toString=function(){return"[object SVGPathSegCurvetoQuadraticAbs]"},window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x1+" "+this._y1+" "+this._x+" "+this._y},window.SVGPathSegCurvetoQuadraticAbs.prototype.clone=function(){return new window.SVGPathSegCurvetoQuadraticAbs(void 0,this._x,this._y,this._x1,this._y1)},Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype,"x1",{get:function(){return this._x1},set:function(t){this._x1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype,"y1",{get:function(){return this._y1},set:function(t){this._y1=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoQuadraticRel=function(t,e,i,n,r){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL,"q",t),this._x=e,this._y=i,this._x1=n,this._y1=r},window.SVGPathSegCurvetoQuadraticRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoQuadraticRel.prototype.toString=function(){return"[object SVGPathSegCurvetoQuadraticRel]"},window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x1+" "+this._y1+" "+this._x+" "+this._y},window.SVGPathSegCurvetoQuadraticRel.prototype.clone=function(){return new window.SVGPathSegCurvetoQuadraticRel(void 0,this._x,this._y,this._x1,this._y1)},Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype,"x1",{get:function(){return this._x1},set:function(t){this._x1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype,"y1",{get:function(){return this._y1},set:function(t){this._y1=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegArcAbs=function(t,e,i,n,r,a,o,s){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_ARC_ABS,"A",t),this._x=e,this._y=i,this._r1=n,this._r2=r,this._angle=a,this._largeArcFlag=o,this._sweepFlag=s},window.SVGPathSegArcAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegArcAbs.prototype.toString=function(){return"[object SVGPathSegArcAbs]"},window.SVGPathSegArcAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._r1+" "+this._r2+" "+this._angle+" "+(this._largeArcFlag?"1":"0")+" "+(this._sweepFlag?"1":"0")+" "+this._x+" "+this._y},window.SVGPathSegArcAbs.prototype.clone=function(){return new window.SVGPathSegArcAbs(void 0,this._x,this._y,this._r1,this._r2,this._angle,this._largeArcFlag,this._sweepFlag)},Object.defineProperty(window.SVGPathSegArcAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcAbs.prototype,"r1",{get:function(){return this._r1},set:function(t){this._r1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcAbs.prototype,"r2",{get:function(){return this._r2},set:function(t){this._r2=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcAbs.prototype,"angle",{get:function(){return this._angle},set:function(t){this._angle=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcAbs.prototype,"largeArcFlag",{get:function(){return this._largeArcFlag},set:function(t){this._largeArcFlag=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcAbs.prototype,"sweepFlag",{get:function(){return this._sweepFlag},set:function(t){this._sweepFlag=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegArcRel=function(t,e,i,n,r,a,o,s){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_ARC_REL,"a",t),this._x=e,this._y=i,this._r1=n,this._r2=r,this._angle=a,this._largeArcFlag=o,this._sweepFlag=s},window.SVGPathSegArcRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegArcRel.prototype.toString=function(){return"[object SVGPathSegArcRel]"},window.SVGPathSegArcRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._r1+" "+this._r2+" "+this._angle+" "+(this._largeArcFlag?"1":"0")+" "+(this._sweepFlag?"1":"0")+" "+this._x+" "+this._y},window.SVGPathSegArcRel.prototype.clone=function(){return new window.SVGPathSegArcRel(void 0,this._x,this._y,this._r1,this._r2,this._angle,this._largeArcFlag,this._sweepFlag)},Object.defineProperty(window.SVGPathSegArcRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcRel.prototype,"r1",{get:function(){return this._r1},set:function(t){this._r1=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcRel.prototype,"r2",{get:function(){return this._r2},set:function(t){this._r2=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcRel.prototype,"angle",{get:function(){return this._angle},set:function(t){this._angle=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcRel.prototype,"largeArcFlag",{get:function(){return this._largeArcFlag},set:function(t){this._largeArcFlag=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegArcRel.prototype,"sweepFlag",{get:function(){return this._sweepFlag},set:function(t){this._sweepFlag=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegLinetoHorizontalAbs=function(t,e){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS,"H",t),this._x=e},window.SVGPathSegLinetoHorizontalAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegLinetoHorizontalAbs.prototype.toString=function(){return"[object SVGPathSegLinetoHorizontalAbs]"},window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x},window.SVGPathSegLinetoHorizontalAbs.prototype.clone=function(){return new window.SVGPathSegLinetoHorizontalAbs(void 0,this._x)},Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegLinetoHorizontalRel=function(t,e){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL,"h",t),this._x=e},window.SVGPathSegLinetoHorizontalRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegLinetoHorizontalRel.prototype.toString=function(){return"[object SVGPathSegLinetoHorizontalRel]"},window.SVGPathSegLinetoHorizontalRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x},window.SVGPathSegLinetoHorizontalRel.prototype.clone=function(){return new window.SVGPathSegLinetoHorizontalRel(void 0,this._x)},Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegLinetoVerticalAbs=function(t,e){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS,"V",t),this._y=e},window.SVGPathSegLinetoVerticalAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegLinetoVerticalAbs.prototype.toString=function(){return"[object SVGPathSegLinetoVerticalAbs]"},window.SVGPathSegLinetoVerticalAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._y},window.SVGPathSegLinetoVerticalAbs.prototype.clone=function(){return new window.SVGPathSegLinetoVerticalAbs(void 0,this._y)},Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegLinetoVerticalRel=function(t,e){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL,"v",t),this._y=e},window.SVGPathSegLinetoVerticalRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegLinetoVerticalRel.prototype.toString=function(){return"[object SVGPathSegLinetoVerticalRel]"},window.SVGPathSegLinetoVerticalRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._y},window.SVGPathSegLinetoVerticalRel.prototype.clone=function(){return new window.SVGPathSegLinetoVerticalRel(void 0,this._y)},Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoCubicSmoothAbs=function(t,e,i,n,r){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS,"S",t),this._x=e,this._y=i,this._x2=n,this._y2=r},window.SVGPathSegCurvetoCubicSmoothAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString=function(){return"[object SVGPathSegCurvetoCubicSmoothAbs]"},window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x2+" "+this._y2+" "+this._x+" "+this._y},window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone=function(){return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0,this._x,this._y,this._x2,this._y2)},Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype,"x2",{get:function(){return this._x2},set:function(t){this._x2=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype,"y2",{get:function(){return this._y2},set:function(t){this._y2=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoCubicSmoothRel=function(t,e,i,n,r){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL,"s",t),this._x=e,this._y=i,this._x2=n,this._y2=r},window.SVGPathSegCurvetoCubicSmoothRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString=function(){return"[object SVGPathSegCurvetoCubicSmoothRel]"},window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x2+" "+this._y2+" "+this._x+" "+this._y},window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone=function(){return new window.SVGPathSegCurvetoCubicSmoothRel(void 0,this._x,this._y,this._x2,this._y2)},Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype,"x2",{get:function(){return this._x2},set:function(t){this._x2=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype,"y2",{get:function(){return this._y2},set:function(t){this._y2=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoQuadraticSmoothAbs=function(t,e,i){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS,"T",t),this._x=e,this._y=i},window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString=function(){return"[object SVGPathSegCurvetoQuadraticSmoothAbs]"},window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x+" "+this._y},window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone=function(){return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0,this._x,this._y)},Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathSegCurvetoQuadraticSmoothRel=function(t,e,i){window.SVGPathSeg.call(this,window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL,"t",t),this._x=e,this._y=i},window.SVGPathSegCurvetoQuadraticSmoothRel.prototype=Object.create(window.SVGPathSeg.prototype),window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString=function(){return"[object SVGPathSegCurvetoQuadraticSmoothRel]"},window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString=function(){return this.pathSegTypeAsLetter+" "+this._x+" "+this._y},window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone=function(){return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0,this._x,this._y)},Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this._segmentChanged()},enumerable:!0}),Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this._segmentChanged()},enumerable:!0}),window.SVGPathElement.prototype.createSVGPathSegClosePath=function(){return new window.SVGPathSegClosePath(void 0)},window.SVGPathElement.prototype.createSVGPathSegMovetoAbs=function(t,e){return new window.SVGPathSegMovetoAbs(void 0,t,e)},window.SVGPathElement.prototype.createSVGPathSegMovetoRel=function(t,e){return new window.SVGPathSegMovetoRel(void 0,t,e)},window.SVGPathElement.prototype.createSVGPathSegLinetoAbs=function(t,e){return new window.SVGPathSegLinetoAbs(void 0,t,e)},window.SVGPathElement.prototype.createSVGPathSegLinetoRel=function(t,e){return new window.SVGPathSegLinetoRel(void 0,t,e)},window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs=function(t,e,i,n,r,a){return new window.SVGPathSegCurvetoCubicAbs(void 0,t,e,i,n,r,a)},window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel=function(t,e,i,n,r,a){return new window.SVGPathSegCurvetoCubicRel(void 0,t,e,i,n,r,a)},window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs=function(t,e,i,n){return new window.SVGPathSegCurvetoQuadraticAbs(void 0,t,e,i,n)},window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel=function(t,e,i,n){return new window.SVGPathSegCurvetoQuadraticRel(void 0,t,e,i,n)},window.SVGPathElement.prototype.createSVGPathSegArcAbs=function(t,e,i,n,r,a,o){return new window.SVGPathSegArcAbs(void 0,t,e,i,n,r,a,o)},window.SVGPathElement.prototype.createSVGPathSegArcRel=function(t,e,i,n,r,a,o){return new window.SVGPathSegArcRel(void 0,t,e,i,n,r,a,o)},window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs=function(t){return new window.SVGPathSegLinetoHorizontalAbs(void 0,t)},window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel=function(t){return new window.SVGPathSegLinetoHorizontalRel(void 0,t)},window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs=function(t){return new window.SVGPathSegLinetoVerticalAbs(void 0,t)},window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel=function(t){return new window.SVGPathSegLinetoVerticalRel(void 0,t)},window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs=function(t,e,i,n){return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0,t,e,i,n)},window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel=function(t,e,i,n){return new window.SVGPathSegCurvetoCubicSmoothRel(void 0,t,e,i,n)},window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs=function(t,e){return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0,t,e)},window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel=function(t,e){return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0,t,e)},"getPathSegAtLength"in window.SVGPathElement.prototype||(window.SVGPathElement.prototype.getPathSegAtLength=function(t){if(void 0===t||!isFinite(t))throw"Invalid arguments.";var e=document.createElementNS("http://www.w3.org/2000/svg","path");e.setAttribute("d",this.getAttribute("d"));var i=e.pathSegList.numberOfItems-1;if(i<=0)return 0;do{if(e.pathSegList.removeItem(i),t>e.getTotalLength())break;i--}while(0<i);return i})),"SVGPathSegList"in window||(window.SVGPathSegList=function(t){this._pathElement=t,this._list=this._parsePath(this._pathElement.getAttribute("d")),this._mutationObserverConfig={attributes:!0,attributeFilter:["d"]},this._pathElementMutationObserver=new MutationObserver(this._updateListFromPathMutations.bind(this)),this._pathElementMutationObserver.observe(this._pathElement,this._mutationObserverConfig)},window.SVGPathSegList.prototype.classname="SVGPathSegList",Object.defineProperty(window.SVGPathSegList.prototype,"numberOfItems",{get:function(){return this._checkPathSynchronizedToList(),this._list.length},enumerable:!0}),Object.defineProperty(window.SVGPathElement.prototype,"pathSegList",{get:function(){return this._pathSegList||(this._pathSegList=new window.SVGPathSegList(this)),this._pathSegList},enumerable:!0}),Object.defineProperty(window.SVGPathElement.prototype,"normalizedPathSegList",{get:function(){return this.pathSegList},enumerable:!0}),Object.defineProperty(window.SVGPathElement.prototype,"animatedPathSegList",{get:function(){return this.pathSegList},enumerable:!0}),Object.defineProperty(window.SVGPathElement.prototype,"animatedNormalizedPathSegList",{get:function(){return this.pathSegList},enumerable:!0}),window.SVGPathSegList.prototype._checkPathSynchronizedToList=function(){this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords())},window.SVGPathSegList.prototype._updateListFromPathMutations=function(t){if(this._pathElement){var e=!1;t.forEach(function(t){"d"==t.attributeName&&(e=!0)}),e&&(this._list=this._parsePath(this._pathElement.getAttribute("d")))}},window.SVGPathSegList.prototype._writeListToPath=function(){this._pathElementMutationObserver.disconnect(),this._pathElement.setAttribute("d",window.SVGPathSegList._pathSegArrayAsString(this._list)),this._pathElementMutationObserver.observe(this._pathElement,this._mutationObserverConfig)},window.SVGPathSegList.prototype.segmentChanged=function(t){this._writeListToPath()},window.SVGPathSegList.prototype.clear=function(){this._checkPathSynchronizedToList(),this._list.forEach(function(t){t._owningPathSegList=null}),this._list=[],this._writeListToPath()},window.SVGPathSegList.prototype.initialize=function(t){return this._checkPathSynchronizedToList(),this._list=[t],(t._owningPathSegList=this)._writeListToPath(),t},window.SVGPathSegList.prototype._checkValidIndex=function(t){if(isNaN(t)||t<0||t>=this.numberOfItems)throw"INDEX_SIZE_ERR"},window.SVGPathSegList.prototype.getItem=function(t){return this._checkPathSynchronizedToList(),this._checkValidIndex(t),this._list[t]},window.SVGPathSegList.prototype.insertItemBefore=function(t,e){return this._checkPathSynchronizedToList(),e>this.numberOfItems&&(e=this.numberOfItems),t._owningPathSegList&&(t=t.clone()),this._list.splice(e,0,t),(t._owningPathSegList=this)._writeListToPath(),t},window.SVGPathSegList.prototype.replaceItem=function(t,e){return this._checkPathSynchronizedToList(),t._owningPathSegList&&(t=t.clone()),this._checkValidIndex(e),((this._list[e]=t)._owningPathSegList=this)._writeListToPath(),t},window.SVGPathSegList.prototype.removeItem=function(t){this._checkPathSynchronizedToList(),this._checkValidIndex(t);var e=this._list[t];return this._list.splice(t,1),this._writeListToPath(),e},window.SVGPathSegList.prototype.appendItem=function(t){return this._checkPathSynchronizedToList(),t._owningPathSegList&&(t=t.clone()),this._list.push(t),(t._owningPathSegList=this)._writeListToPath(),t},window.SVGPathSegList._pathSegArrayAsString=function(t){var e="",i=!0;return t.forEach(function(t){i?(i=!1,e+=t._asPathString()):e+=" "+t._asPathString()}),e},window.SVGPathSegList.prototype._parsePath=function(t){if(!t||0==t.length)return[];var n=this,e=function(){this.pathSegList=[]};e.prototype.appendSegment=function(t){this.pathSegList.push(t)};var i=function(t){this._string=t,this._currentIndex=0,this._endIndex=this._string.length,this._previousCommand=window.SVGPathSeg.PATHSEG_UNKNOWN,this._skipOptionalSpaces()};i.prototype._isCurrentSpace=function(){var t=this._string[this._currentIndex];return t<=" "&&(" "==t||"\n"==t||"\t"==t||"\r"==t||"\f"==t)},i.prototype._skipOptionalSpaces=function(){for(;this._currentIndex<this._endIndex&&this._isCurrentSpace();)this._currentIndex++;return this._currentIndex<this._endIndex},i.prototype._skipOptionalSpacesOrDelimiter=function(){return!(this._currentIndex<this._endIndex&&!this._isCurrentSpace()&&","!=this._string.charAt(this._currentIndex))&&(this._skipOptionalSpaces()&&this._currentIndex<this._endIndex&&","==this._string.charAt(this._currentIndex)&&(this._currentIndex++,this._skipOptionalSpaces()),this._currentIndex<this._endIndex)},i.prototype.hasMoreData=function(){return this._currentIndex<this._endIndex},i.prototype.peekSegmentType=function(){var t=this._string[this._currentIndex];return this._pathSegTypeFromChar(t)},i.prototype._pathSegTypeFromChar=function(t){switch(t){case"Z":case"z":return window.SVGPathSeg.PATHSEG_CLOSEPATH;case"M":return window.SVGPathSeg.PATHSEG_MOVETO_ABS;case"m":return window.SVGPathSeg.PATHSEG_MOVETO_REL;case"L":return window.SVGPathSeg.PATHSEG_LINETO_ABS;case"l":return window.SVGPathSeg.PATHSEG_LINETO_REL;case"C":return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;case"c":return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;case"Q":return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;case"q":return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;case"A":return window.SVGPathSeg.PATHSEG_ARC_ABS;case"a":return window.SVGPathSeg.PATHSEG_ARC_REL;case"H":return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;case"h":return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;case"V":return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;case"v":return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;case"S":return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;case"s":return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;case"T":return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;case"t":return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;default:return window.SVGPathSeg.PATHSEG_UNKNOWN}},i.prototype._nextCommandHelper=function(t,e){return("+"==t||"-"==t||"."==t||"0"<=t&&t<="9")&&e!=window.SVGPathSeg.PATHSEG_CLOSEPATH?e==window.SVGPathSeg.PATHSEG_MOVETO_ABS?window.SVGPathSeg.PATHSEG_LINETO_ABS:e==window.SVGPathSeg.PATHSEG_MOVETO_REL?window.SVGPathSeg.PATHSEG_LINETO_REL:e:window.SVGPathSeg.PATHSEG_UNKNOWN},i.prototype.initialCommandIsMoveTo=function(){if(!this.hasMoreData())return!0;var t=this.peekSegmentType();return t==window.SVGPathSeg.PATHSEG_MOVETO_ABS||t==window.SVGPathSeg.PATHSEG_MOVETO_REL},i.prototype._parseNumber=function(){var t=0,e=0,i=1,n=0,r=1,a=1,o=this._currentIndex;if(this._skipOptionalSpaces(),this._currentIndex<this._endIndex&&"+"==this._string.charAt(this._currentIndex)?this._currentIndex++:this._currentIndex<this._endIndex&&"-"==this._string.charAt(this._currentIndex)&&(this._currentIndex++,r=-1),!(this._currentIndex==this._endIndex||(this._string.charAt(this._currentIndex)<"0"||"9"<this._string.charAt(this._currentIndex))&&"."!=this._string.charAt(this._currentIndex))){for(var s=this._currentIndex;this._currentIndex<this._endIndex&&"0"<=this._string.charAt(this._currentIndex)&&this._string.charAt(this._currentIndex)<="9";)this._currentIndex++;if(this._currentIndex!=s)for(var c=this._currentIndex-1,d=1;s<=c;)e+=d*(this._string.charAt(c--)-"0"),d*=10;if(this._currentIndex<this._endIndex&&"."==this._string.charAt(this._currentIndex)){if(this._currentIndex++,this._currentIndex>=this._endIndex||this._string.charAt(this._currentIndex)<"0"||"9"<this._string.charAt(this._currentIndex))return;for(;this._currentIndex<this._endIndex&&"0"<=this._string.charAt(this._currentIndex)&&this._string.charAt(this._currentIndex)<="9";)i*=10,n+=(this._string.charAt(this._currentIndex)-"0")/i,this._currentIndex+=1}if(this._currentIndex!=o&&this._currentIndex+1<this._endIndex&&("e"==this._string.charAt(this._currentIndex)||"E"==this._string.charAt(this._currentIndex))&&"x"!=this._string.charAt(this._currentIndex+1)&&"m"!=this._string.charAt(this._currentIndex+1)){if(this._currentIndex++,"+"==this._string.charAt(this._currentIndex)?this._currentIndex++:"-"==this._string.charAt(this._currentIndex)&&(this._currentIndex++,a=-1),this._currentIndex>=this._endIndex||this._string.charAt(this._currentIndex)<"0"||"9"<this._string.charAt(this._currentIndex))return;for(;this._currentIndex<this._endIndex&&"0"<=this._string.charAt(this._currentIndex)&&this._string.charAt(this._currentIndex)<="9";)t*=10,t+=this._string.charAt(this._currentIndex)-"0",this._currentIndex++}var l=e+n;if(l*=r,t&&(l*=Math.pow(10,a*t)),o!=this._currentIndex)return this._skipOptionalSpacesOrDelimiter(),l}},i.prototype._parseArcFlag=function(){if(!(this._currentIndex>=this._endIndex)){var t=!1,e=this._string.charAt(this._currentIndex++);if("0"==e)t=!1;else{if("1"!=e)return;t=!0}return this._skipOptionalSpacesOrDelimiter(),t}},i.prototype.parseSegment=function(){var t=this._string[this._currentIndex],e=this._pathSegTypeFromChar(t);if(e==window.SVGPathSeg.PATHSEG_UNKNOWN){if(this._previousCommand==window.SVGPathSeg.PATHSEG_UNKNOWN)return null;if((e=this._nextCommandHelper(t,this._previousCommand))==window.SVGPathSeg.PATHSEG_UNKNOWN)return null}else this._currentIndex++;switch(this._previousCommand=e){case window.SVGPathSeg.PATHSEG_MOVETO_REL:return new window.SVGPathSegMovetoRel(n,this._parseNumber(),this._parseNumber());case window.SVGPathSeg.PATHSEG_MOVETO_ABS:return new window.SVGPathSegMovetoAbs(n,this._parseNumber(),this._parseNumber());case window.SVGPathSeg.PATHSEG_LINETO_REL:return new window.SVGPathSegLinetoRel(n,this._parseNumber(),this._parseNumber());case window.SVGPathSeg.PATHSEG_LINETO_ABS:return new window.SVGPathSegLinetoAbs(n,this._parseNumber(),this._parseNumber());case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:return new window.SVGPathSegLinetoHorizontalRel(n,this._parseNumber());case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:return new window.SVGPathSegLinetoHorizontalAbs(n,this._parseNumber());case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:return new window.SVGPathSegLinetoVerticalRel(n,this._parseNumber());case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:return new window.SVGPathSegLinetoVerticalAbs(n,this._parseNumber());case window.SVGPathSeg.PATHSEG_CLOSEPATH:return this._skipOptionalSpaces(),new window.SVGPathSegClosePath(n);case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:var i={x1:this._parseNumber(),y1:this._parseNumber(),x2:this._parseNumber(),y2:this._parseNumber(),x:this._parseNumber(),y:this._parseNumber()};return new window.SVGPathSegCurvetoCubicRel(n,i.x,i.y,i.x1,i.y1,i.x2,i.y2);case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:return i={x1:this._parseNumber(),y1:this._parseNumber(),x2:this._parseNumber(),y2:this._parseNumber(),x:this._parseNumber(),y:this._parseNumber()},new window.SVGPathSegCurvetoCubicAbs(n,i.x,i.y,i.x1,i.y1,i.x2,i.y2);case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:return i={x2:this._parseNumber(),y2:this._parseNumber(),x:this._parseNumber(),y:this._parseNumber()},new window.SVGPathSegCurvetoCubicSmoothRel(n,i.x,i.y,i.x2,i.y2);case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:return i={x2:this._parseNumber(),y2:this._parseNumber(),x:this._parseNumber(),y:this._parseNumber()},new window.SVGPathSegCurvetoCubicSmoothAbs(n,i.x,i.y,i.x2,i.y2);case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:return i={x1:this._parseNumber(),y1:this._parseNumber(),x:this._parseNumber(),y:this._parseNumber()},new window.SVGPathSegCurvetoQuadraticRel(n,i.x,i.y,i.x1,i.y1);case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:return i={x1:this._parseNumber(),y1:this._parseNumber(),x:this._parseNumber(),y:this._parseNumber()},new window.SVGPathSegCurvetoQuadraticAbs(n,i.x,i.y,i.x1,i.y1);case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:return new window.SVGPathSegCurvetoQuadraticSmoothRel(n,this._parseNumber(),this._parseNumber());case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:return new window.SVGPathSegCurvetoQuadraticSmoothAbs(n,this._parseNumber(),this._parseNumber());case window.SVGPathSeg.PATHSEG_ARC_REL:return i={x1:this._parseNumber(),y1:this._parseNumber(),arcAngle:this._parseNumber(),arcLarge:this._parseArcFlag(),arcSweep:this._parseArcFlag(),x:this._parseNumber(),y:this._parseNumber()},new window.SVGPathSegArcRel(n,i.x,i.y,i.x1,i.y1,i.arcAngle,i.arcLarge,i.arcSweep);case window.SVGPathSeg.PATHSEG_ARC_ABS:return i={x1:this._parseNumber(),y1:this._parseNumber(),arcAngle:this._parseNumber(),arcLarge:this._parseArcFlag(),arcSweep:this._parseArcFlag(),x:this._parseNumber(),y:this._parseNumber()},new window.SVGPathSegArcAbs(n,i.x,i.y,i.x1,i.y1,i.arcAngle,i.arcLarge,i.arcSweep);default:throw"Unknown path seg type."}};var r=new e,a=new i(t);if(!a.initialCommandIsMoveTo())return[];for(;a.hasMoreData();){var o=a.parseSegment();if(!o)return[];r.appendSegment(o)}return r.pathSegList}),String.prototype.padEnd||(String.prototype.padEnd=function(t,e){return t>>=0,e=String(void 0!==e?e:" "),this.length>t?String(this):((t-=this.length)>e.length&&(e+=e.repeat(t/e.length)),String(this)+e.slice(0,t))}),(n.prototype.axis=function(){}).labels=function(e){var i=this.internal;arguments.length&&(Object.keys(e).forEach(function(t){i.axis.setLabelText(t,e[t])}),i.axis.updateLabels())},n.prototype.axis.max=function(t){var e=this.internal,i=e.config;if(!arguments.length)return{x:i.axis_x_max,y:i.axis_y_max,y2:i.axis_y2_max};"object"===s(t)?(P(t.x)&&(i.axis_x_max=t.x),P(t.y)&&(i.axis_y_max=t.y),P(t.y2)&&(i.axis_y2_max=t.y2)):i.axis_y_max=i.axis_y2_max=t,e.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0})},n.prototype.axis.min=function(t){var e=this.internal,i=e.config;if(!arguments.length)return{x:i.axis_x_min,y:i.axis_y_min,y2:i.axis_y2_min};"object"===s(t)?(P(t.x)&&(i.axis_x_min=t.x),P(t.y)&&(i.axis_y_min=t.y),P(t.y2)&&(i.axis_y2_min=t.y2)):i.axis_y_min=i.axis_y2_min=t,e.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0})},n.prototype.axis.range=function(t){if(!arguments.length)return{max:this.axis.max(),min:this.axis.min()};k(t.max)&&this.axis.max(t.max),k(t.min)&&this.axis.min(t.min)},n.prototype.category=function(t,e){var i=this.internal,n=i.config;return 1<arguments.length&&(n.axis_x_categories[t]=e,i.redraw()),n.axis_x_categories[t]},n.prototype.categories=function(t){var e=this.internal,i=e.config;return arguments.length&&(i.axis_x_categories=t,e.redraw()),i.axis_x_categories},n.prototype.resize=function(t){var e=this.internal.config;e.size_width=t?t.width:null,e.size_height=t?t.height:null,this.flush()},n.prototype.flush=function(){this.internal.updateAndRedraw({withLegend:!0,withTransition:!1,withTransitionForTransform:!1})},n.prototype.destroy=function(){var e=this.internal;if(window.clearInterval(e.intervalForObserveInserted),void 0!==e.resizeTimeout&&window.clearTimeout(e.resizeTimeout),window.detachEvent)window.detachEvent("onresize",e.resizeIfElementDisplayed);else if(window.removeEventListener)window.removeEventListener("resize",e.resizeIfElementDisplayed);else{var t=window.onresize;t&&t.add&&t.remove&&t.remove(e.resizeFunction)}return e.resizeFunction.remove(),e.selectChart.classed("c3",!1).html(""),Object.keys(e).forEach(function(t){e[t]=null}),null},n.prototype.color=function(t){return this.internal.color(t)},(n.prototype.data=function(e){var t=this.internal.data.targets;return void 0===e?t:t.filter(function(t){return 0<=[].concat(e).indexOf(t.id)})}).shown=function(t){return this.internal.filterTargetsToShow(this.data(t))},n.prototype.data.values=function(t){var e,i=null;return t&&(i=(e=this.data(t))[0]?e[0].values.map(function(t){return t.value}):null),i},n.prototype.data.names=function(t){return this.internal.clearLegendItemTextBoxCache(),this.internal.updateDataAttributes("names",t)},n.prototype.data.colors=function(t){return this.internal.updateDataAttributes("colors",t)},n.prototype.data.axes=function(t){return this.internal.updateDataAttributes("axes",t)},n.prototype.flow=function(t){var r,e,i,n,a,o,s,c=this.internal,d=[],l=c.getMaxDataCount(),u=0,h=0;if(t.json)e=c.convertJsonToData(t.json,t.keys);else if(t.rows)e=c.convertRowsToData(t.rows);else{if(!t.columns)return;e=c.convertColumnsToData(t.columns)}r=c.convertDataToTargets(e,!0),c.data.targets.forEach(function(t){var e,i,n=!1;for(e=0;e<r.length;e++)if(t.id===r[e].id){for(n=!0,t.values[t.values.length-1]&&(h=t.values[t.values.length-1].index+1),u=r[e].values.length,i=0;i<u;i++)r[e].values[i].index=h+i,c.isTimeSeries()||(r[e].values[i].x=h+i);t.values=t.values.concat(r[e].values),r.splice(e,1);break}n||d.push(t.id)}),c.data.targets.forEach(function(t){var e,i;for(e=0;e<d.length;e++)if(t.id===d[e])for(h=t.values[t.values.length-1].index+1,i=0;i<u;i++)t.values.push({id:t.id,index:h+i,x:c.isTimeSeries()?c.getOtherTargetX(h+i):h+i,value:null})}),c.data.targets.length&&r.forEach(function(t){var e,i=[];for(e=c.data.targets[0].values[0].index;e<h;e++)i.push({id:t.id,index:e,x:c.isTimeSeries()?c.getOtherTargetX(e):e,value:null});t.values.forEach(function(t){t.index+=h,c.isTimeSeries()||(t.x+=h)}),t.values=i.concat(t.values)}),c.data.targets=c.data.targets.concat(r),c.getMaxDataCount(),a=(n=c.data.targets[0]).values[0],k(t.to)?(u=0,s=c.isTimeSeries()?c.parseDate(t.to):t.to,n.values.forEach(function(t){t.x<s&&u++})):k(t.length)&&(u=t.length),l?1===l&&c.isTimeSeries()&&(o=(n.values[n.values.length-1].x-a.x)/2,i=[new Date(+a.x-o),new Date(+a.x+o)],c.updateXDomain(null,!0,!0,!1,i)):(o=c.isTimeSeries()?1<n.values.length?n.values[n.values.length-1].x-a.x:a.x-c.getXDomain(c.data.targets)[0]:1,i=[a.x-o,a.x],c.updateXDomain(null,!0,!0,!1,i)),c.updateTargets(c.data.targets),c.redraw({flow:{index:a.index,length:u,duration:P(t.duration)?t.duration:c.config.transition_duration,done:t.done,orgDataCount:l},withLegend:!0,withTransition:1<l,withTrimXDomain:!1,withUpdateXAxis:!0})},l.prototype.generateFlow=function(G){var E=this,I=E.config,O=E.d3;return function(){var t,e,n,r,a,o,s,c,d,l,i=G.targets,u=G.flow,h=G.drawBar,g=G.drawLine,p=G.drawArea,f=G.cx,_=G.cy,x=G.xv,y=G.xForText,m=G.yForText,S=G.duration,w=u.index,v=u.length,b=E.getValueOnIndex(E.data.targets[0].values,w),A=E.getValueOnIndex(E.data.targets[0].values,w+v),T=E.x.domain(),P=u.duration||S,C=u.done||function(){},L=E.generateWait();E.flowing=!0,E.data.targets.forEach(function(t){t.values.splice(0,v)}),e=E.updateXDomain(i,!0,!0),E.updateXGrid&&E.updateXGrid(!0),n=E.xgrid||O.selectAll([]),r=E.xgridLines||O.selectAll([]),a=E.mainRegion||O.selectAll([]),o=E.mainText||O.selectAll([]),s=E.mainBar||O.selectAll([]),c=E.mainLine||O.selectAll([]),d=E.mainArea||O.selectAll([]),l=E.mainCircle||O.selectAll([]),t="translate("+(u.orgDataCount?1===u.orgDataCount||(b&&b.x)===(A&&A.x)?E.x(T[0])-E.x(e[0]):E.isTimeSeries()?E.x(T[0])-E.x(e[0]):E.x(b.x)-E.x(A.x):1!==E.data.targets[0].values.length?E.x(T[0])-E.x(e[0]):E.isTimeSeries()?(b=E.getValueOnIndex(E.data.targets[0].values,0),A=E.getValueOnIndex(E.data.targets[0].values,E.data.targets[0].values.length-1),E.x(b.x)-E.x(A.x)):R(e)/2)+",0) scale("+R(T)/R(e)+",1)",E.hideXGridFocus();var V=O.transition().ease(O.easeLinear).duration(P);L.add(E.xAxis(E.axes.x,V)),L.add(s.transition(V).attr("transform",t)),L.add(c.transition(V).attr("transform",t)),L.add(d.transition(V).attr("transform",t)),L.add(l.transition(V).attr("transform",t)),L.add(o.transition(V).attr("transform",t)),L.add(a.filter(E.isRegionOnX).transition(V).attr("transform",t)),L.add(n.transition(V).attr("transform",t)),L.add(r.transition(V).attr("transform",t)),L(function(){var t,e=[],i=[];if(v){for(t=0;t<v;t++)e.push("."+Y.shape+"-"+(w+t)),i.push("."+Y.text+"-"+(w+t));E.svg.selectAll("."+Y.shapes).selectAll(e).remove(),E.svg.selectAll("."+Y.texts).selectAll(i).remove(),E.svg.select("."+Y.xgrid).remove()}n.attr("transform",null).attr("x1",E.xgridAttr.x1).attr("x2",E.xgridAttr.x2).attr("y1",E.xgridAttr.y1).attr("y2",E.xgridAttr.y2).style("opacity",E.xgridAttr.opacity),r.attr("transform",null),r.select("line").attr("x1",I.axis_rotated?0:x).attr("x2",I.axis_rotated?E.width:x),r.select("text").attr("x",I.axis_rotated?E.width:0).attr("y",x),s.attr("transform",null).attr("d",h),c.attr("transform",null).attr("d",g),d.attr("transform",null).attr("d",p),l.attr("transform",null).attr("cx",f).attr("cy",_),o.attr("transform",null).attr("x",y).attr("y",m).style("fill-opacity",E.opacityForText.bind(E)),a.attr("transform",null),a.filter(E.isRegionOnX).attr("x",E.regionX.bind(E)).attr("width",E.regionWidth.bind(E)),C(),E.flowing=!1})}},n.prototype.focus=function(e){var t,i=this.internal;e=i.mapToTargetIds(e),t=i.svg.selectAll(i.selectorTargets(e.filter(i.isTargetToShow,i))),this.revert(),this.defocus(),t.classed(Y.focused,!0).classed(Y.defocused,!1),i.hasArcType()&&i.expandArc(e),i.toggleFocusLegend(e,!0),i.focusedTargetIds=e,i.defocusedTargetIds=i.defocusedTargetIds.filter(function(t){return e.indexOf(t)<0})},n.prototype.defocus=function(e){var t=this.internal;e=t.mapToTargetIds(e),t.svg.selectAll(t.selectorTargets(e.filter(t.isTargetToShow,t))).classed(Y.focused,!1).classed(Y.defocused,!0),t.hasArcType()&&t.unexpandArc(e),t.toggleFocusLegend(e,!1),t.focusedTargetIds=t.focusedTargetIds.filter(function(t){return e.indexOf(t)<0}),t.defocusedTargetIds=e},n.prototype.revert=function(t){var e=this.internal;t=e.mapToTargetIds(t),e.svg.selectAll(e.selectorTargets(t)).classed(Y.focused,!1).classed(Y.defocused,!1),e.hasArcType()&&e.unexpandArc(t),e.config.legend_show&&(e.showLegend(t.filter(e.isLegendToShow.bind(e))),e.legend.selectAll(e.selectorLegends(t)).filter(function(){return e.d3.select(this).classed(Y.legendItemFocused)}).classed(Y.legendItemFocused,!1)),e.focusedTargetIds=[],e.defocusedTargetIds=[]},(n.prototype.xgrids=function(t){var e=this.internal,i=e.config;return t&&(i.grid_x_lines=t,e.redrawWithoutRescale()),i.grid_x_lines}).add=function(t){var e=this.internal;return this.xgrids(e.config.grid_x_lines.concat(t||[]))},n.prototype.xgrids.remove=function(t){this.internal.removeGridLines(t,!0)},(n.prototype.ygrids=function(t){var e=this.internal,i=e.config;return t&&(i.grid_y_lines=t,e.redrawWithoutRescale()),i.grid_y_lines}).add=function(t){var e=this.internal;return this.ygrids(e.config.grid_y_lines.concat(t||[]))},n.prototype.ygrids.remove=function(t){this.internal.removeGridLines(t,!1)},n.prototype.groups=function(t){var e=this.internal,i=e.config;return v(t)||(i.data_groups=t,e.redraw()),i.data_groups},(n.prototype.legend=function(){}).show=function(t){var e=this.internal;e.showLegend(e.mapToTargetIds(t)),e.updateAndRedraw({withLegend:!0})},n.prototype.legend.hide=function(t){var e=this.internal;e.hideLegend(e.mapToTargetIds(t)),e.updateAndRedraw({withLegend:!1})},n.prototype.load=function(e){var t=this.internal,i=t.config;e.xs&&t.addXs(e.xs),"names"in e&&n.prototype.data.names.bind(this)(e.names),"classes"in e&&Object.keys(e.classes).forEach(function(t){i.data_classes[t]=e.classes[t]}),"categories"in e&&t.isCategorized()&&(i.axis_x_categories=e.categories),"axes"in e&&Object.keys(e.axes).forEach(function(t){i.data_axes[t]=e.axes[t]}),"colors"in e&&Object.keys(e.colors).forEach(function(t){i.data_colors[t]=e.colors[t]}),"cacheIds"in e&&t.hasCaches(e.cacheIds)?t.load(t.getCaches(e.cacheIds),e.done):"unload"in e?t.unload(t.mapToTargetIds("boolean"==typeof e.unload&&e.unload?null:e.unload),function(){t.loadFromArgs(e)}):t.loadFromArgs(e)},n.prototype.unload=function(t){var e=this.internal;(t=t||{})instanceof Array?t={ids:t}:"string"==typeof t&&(t={ids:[t]}),e.unload(e.mapToTargetIds(t.ids),function(){e.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0,withLegend:!0}),t.done&&t.done()})},(n.prototype.regions=function(t){var e=this.internal,i=e.config;return t&&(i.regions=t,e.redrawWithoutRescale()),i.regions}).add=function(t){var e=this.internal,i=e.config;return t&&(i.regions=i.regions.concat(t),e.redrawWithoutRescale()),i.regions},n.prototype.regions.remove=function(t){var e,i,n,r=this.internal,a=r.config;return t=t||{},e=r.getOption(t,"duration",a.transition_duration),i=r.getOption(t,"classes",[Y.region]),n=r.main.select("."+Y.regions).selectAll(i.map(function(t){return"."+t})),(e?n.transition().duration(e):n).style("opacity",0).remove(),a.regions=a.regions.filter(function(t){var e=!1;return!t.class||(t.class.split(" ").forEach(function(t){0<=i.indexOf(t)&&(e=!0)}),!e)}),a.regions},n.prototype.selected=function(t){var e=this.internal,i=e.d3;return i.merge(e.main.selectAll("."+Y.shapes+e.getTargetSelectorSuffix(t)).selectAll("."+Y.shape).filter(function(){return i.select(this).classed(Y.SELECTED)}).map(function(t){return t.map(function(t){var e=t.__data__;return e.data?e.data:e})}))},n.prototype.select=function(c,d,l){var u=this.internal,h=u.d3,g=u.config;g.data_selection_enabled&&u.main.selectAll("."+Y.shapes).selectAll("."+Y.shape).each(function(t,e){var i=h.select(this),n=t.data?t.data.id:t.id,r=u.getToggle(this,t).bind(u),a=g.data_selection_grouped||!c||0<=c.indexOf(n),o=!d||0<=d.indexOf(e),s=i.classed(Y.SELECTED);i.classed(Y.line)||i.classed(Y.area)||(a&&o?g.data_selection_isselectable(t)&&!s&&r(!0,i.classed(Y.SELECTED,!0),t,e):k(l)&&l&&s&&r(!1,i.classed(Y.SELECTED,!1),t,e))})},n.prototype.unselect=function(c,d){var l=this.internal,u=l.d3,h=l.config;h.data_selection_enabled&&l.main.selectAll("."+Y.shapes).selectAll("."+Y.shape).each(function(t,e){var i=u.select(this),n=t.data?t.data.id:t.id,r=l.getToggle(this,t).bind(l),a=h.data_selection_grouped||!c||0<=c.indexOf(n),o=!d||0<=d.indexOf(e),s=i.classed(Y.SELECTED);i.classed(Y.line)||i.classed(Y.area)||a&&o&&h.data_selection_isselectable(t)&&s&&r(!1,i.classed(Y.SELECTED,!1),t,e)})},n.prototype.show=function(t,e){var i,n=this.internal;t=n.mapToTargetIds(t),e=e||{},n.removeHiddenTargetIds(t),(i=n.svg.selectAll(n.selectorTargets(t))).transition().style("display","initial","important").style("opacity",1,"important").call(n.endall,function(){i.style("opacity",null).style("opacity",1)}),e.withLegend&&n.showLegend(t),n.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0,withLegend:!0})},n.prototype.hide=function(t,e){var i,n=this.internal;t=n.mapToTargetIds(t),e=e||{},n.addHiddenTargetIds(t),(i=n.svg.selectAll(n.selectorTargets(t))).transition().style("opacity",0,"important").call(n.endall,function(){i.style("opacity",null).style("opacity",0),i.style("display","none")}),e.withLegend&&n.hideLegend(t),n.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0,withLegend:!0})},n.prototype.toggle=function(t,e){var i=this,n=this.internal;n.mapToTargetIds(t).forEach(function(t){n.isTargetToShow(t)?i.hide(t,e):i.show(t,e)})},(n.prototype.tooltip=function(){}).show=function(e){var t,i,n=this.internal,r={};r=e.mouse?e.mouse:(e.data?i=e.data:void 0!==e.x&&(t=e.id?n.data.targets.filter(function(t){return t.id===e.id}):n.data.targets,i=n.filterByX(t,e.x).slice(0,1)[0]),i?n.getMousePosition(i):null),n.dispatchEvent("mousemove",r),n.config.tooltip_onshow.call(n,i)},n.prototype.tooltip.hide=function(){this.internal.dispatchEvent("mouseout",0),this.internal.config.tooltip_onhide.call(this)},n.prototype.transform=function(t,e){var i=this.internal,n=0<=["pie","donut"].indexOf(t)?{withTransform:!0}:null;i.transformTo(e,t,n)},l.prototype.transformTo=function(t,e,i){var n=this,r=!n.hasArcType(),a=i||{withTransitionForAxis:r};a.withTransitionForTransform=!1,n.transiting=!1,n.setTargetType(t,e),n.updateTargets(n.data.targets),n.updateAndRedraw(a)},n.prototype.x=function(t){var e=this.internal;return arguments.length&&(e.updateTargetX(e.data.targets,t),e.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0})),e.data.xs},n.prototype.xs=function(t){var e=this.internal;return arguments.length&&(e.updateTargetXs(e.data.targets,t),e.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0})),e.data.xs},(n.prototype.zoom=function(t){var e=this.internal;return t?(e.isTimeSeries()&&(t=t.map(function(t){return e.parseDate(t)})),e.config.subchart_show?e.brush.selectionAsValue(t,!0):(e.updateXDomain(null,!0,!1,!1,t),e.redraw({withY:e.config.zoom_rescale,withSubchart:!1})),e.config.zoom_onzoom.call(this,e.x.orgDomain()),t):e.x.domain()}).enable=function(t){var e=this.internal;e.config.zoom_enabled=t,e.updateAndRedraw()},n.prototype.unzoom=function(){var t=this.internal;t.config.subchart_show?t.brush.clear():(t.updateXDomain(null,!0,!1,!1,t.subX.domain()),t.redraw({withY:t.config.zoom_rescale,withSubchart:!1}))},n.prototype.zoom.max=function(t){var e=this.internal,i=e.config,n=e.d3;if(0!==t&&!t)return i.zoom_x_max;i.zoom_x_max=n.max([e.orgXDomain[1],t])},n.prototype.zoom.min=function(t){var e=this.internal,i=e.config,n=e.d3;if(0!==t&&!t)return i.zoom_x_min;i.zoom_x_min=n.min([e.orgXDomain[0],t])},n.prototype.zoom.range=function(t){if(!arguments.length)return{max:this.domain.max(),min:this.domain.min()};k(t.max)&&this.domain.max(t.max),k(t.min)&&this.domain.min(t.min)},l.prototype.initPie=function(){var t=this,e=t.d3;t.pie=e.pie().value(function(t){return t.values.reduce(function(t,e){return t+e.value},0)});var i=t.getOrderFunction();if(i&&(t.isOrderAsc()||t.isOrderDesc())){var n=i;i=function(t,e){return-1*n(t,e)}}t.pie.sort(i||null)},l.prototype.updateRadius=function(){var t=this,e=t.config,i=e.gauge_width||e.donut_width,n=t.filterTargetsToShow(t.data.targets).length*t.config.gauge_arcs_minWidth;t.radiusExpanded=Math.min(t.arcWidth,t.arcHeight)/2*(t.hasType("gauge")?.85:1),t.radius=.95*t.radiusExpanded,t.innerRadiusRatio=i?(t.radius-i)/t.radius:.6,t.innerRadius=t.hasType("donut")||t.hasType("gauge")?t.radius*t.innerRadiusRatio:0,t.gaugeArcWidth=i||(n<=t.radius-t.innerRadius?t.radius-t.innerRadius:n<=t.radius?n:t.radius)},l.prototype.updateArc=function(){var t=this;t.svgArc=t.getSvgArc(),t.svgArcExpanded=t.getSvgArcExpanded(),t.svgArcExpandedSub=t.getSvgArcExpanded(.98)},l.prototype.updateAngle=function(e){var t,i,n,r,a=this,o=a.config,s=!1,c=0;return o?(a.pie(a.filterTargetsToShow(a.data.targets)).forEach(function(t){s||t.data.id!==e.data.id||(s=!0,(e=t).index=c),c++}),isNaN(e.startAngle)&&(e.startAngle=0),isNaN(e.endAngle)&&(e.endAngle=e.startAngle),a.isGaugeType(e.data)&&(t=o.gauge_min,i=o.gauge_max,n=Math.PI*(o.gauge_fullCircle?2:1)/(i-t),r=e.value<t?0:e.value<i?e.value-t:i-t,e.startAngle=o.gauge_startingAngle,e.endAngle=e.startAngle+n*r),s?e:null):null},l.prototype.getSvgArc=function(){var n=this,e=n.hasType("gauge"),i=n.gaugeArcWidth/n.filterTargetsToShow(n.data.targets).length,r=n.d3.arc().outerRadius(function(t){return e?n.radius-i*t.index:n.radius}).innerRadius(function(t){return e?n.radius-i*(t.index+1):n.innerRadius}),t=function(t,e){var i;return e?r(t):(i=n.updateAngle(t))?r(i):"M 0 0"};return t.centroid=r.centroid,t},l.prototype.getSvgArcExpanded=function(e){e=e||1;var i=this,n=i.hasType("gauge"),r=i.gaugeArcWidth/i.filterTargetsToShow(i.data.targets).length,a=Math.min(i.radiusExpanded*e-i.radius,.8*r-100*(1-e)),o=i.d3.arc().outerRadius(function(t){return n?i.radius-r*t.index+a:i.radiusExpanded*e}).innerRadius(function(t){return n?i.radius-r*(t.index+1):i.innerRadius});return function(t){var e=i.updateAngle(t);return e?o(e):"M 0 0"}},l.prototype.getArc=function(t,e,i){return i||this.isArcType(t.data)?this.svgArc(t,e):"M 0 0"},l.prototype.transformForArcLabel=function(t){var e,i,n,r,a,o=this,s=o.config,c=o.updateAngle(t),d="",l=o.hasType("gauge");if(c&&!l)e=this.svgArc.centroid(c),i=isNaN(e[0])?0:e[0],n=isNaN(e[1])?0:e[1],r=Math.sqrt(i*i+n*n),d="translate("+i*(a=o.hasType("donut")&&s.donut_label_ratio?h(s.donut_label_ratio)?s.donut_label_ratio(t,o.radius,r):s.donut_label_ratio:o.hasType("pie")&&s.pie_label_ratio?h(s.pie_label_ratio)?s.pie_label_ratio(t,o.radius,r):s.pie_label_ratio:o.radius&&r?(.375<36/o.radius?1.175-36/o.radius:.8)*o.radius/r:0)+","+n*a+")";else if(c&&l&&1<o.filterTargetsToShow(o.data.targets).length){var u=Math.sin(c.endAngle-Math.PI/2);d="translate("+(i=Math.cos(c.endAngle-Math.PI/2)*(o.radiusExpanded+25))+","+(n=u*(o.radiusExpanded+15-Math.abs(10*u))+3)+")"}return d},l.prototype.getArcRatio=function(t){var e=this.config,i=Math.PI*(this.hasType("gauge")&&!e.gauge_fullCircle?1:2);return t?(t.endAngle-t.startAngle)/i:null},l.prototype.convertToArcData=function(t){return this.addName({id:t.data.id,value:t.value,ratio:this.getArcRatio(t),index:t.index})},l.prototype.textForArcLabel=function(t){var e,i,n,r,a,o=this;return o.shouldShowArcLabel()?(i=(e=o.updateAngle(t))?e.value:null,n=o.getArcRatio(e),r=t.data.id,o.hasType("gauge")||o.meetsArcLabelThreshold(n)?(a=o.getArcLabelFormat())?a(i,n,r):o.defaultArcValueFormat(i,n):""):""},l.prototype.textForGaugeMinMax=function(t,e){var i=this.getGaugeLabelExtents();return i?i(t,e):t},l.prototype.expandArc=function(t){var e,i=this;i.transiting?e=window.setInterval(function(){i.transiting||(window.clearInterval(e),0<i.legend.selectAll(".c3-legend-item-focused").size()&&i.expandArc(t))},10):(t=i.mapToTargetIds(t),i.svg.selectAll(i.selectorTargets(t,"."+Y.chartArc)).each(function(t){i.shouldExpand(t.data.id)&&i.d3.select(this).selectAll("path").transition().duration(i.expandDuration(t.data.id)).attr("d",i.svgArcExpanded).transition().duration(2*i.expandDuration(t.data.id)).attr("d",i.svgArcExpandedSub).each(function(t){i.isDonutType(t.data)})}))},l.prototype.unexpandArc=function(t){var e=this;e.transiting||(t=e.mapToTargetIds(t),e.svg.selectAll(e.selectorTargets(t,"."+Y.chartArc)).selectAll("path").transition().duration(function(t){return e.expandDuration(t.data.id)}).attr("d",e.svgArc),e.svg.selectAll("."+Y.arc))},l.prototype.expandDuration=function(t){var e=this.config;return this.isDonutType(t)?e.donut_expand_duration:this.isGaugeType(t)?e.gauge_expand_duration:this.isPieType(t)?e.pie_expand_duration:50},l.prototype.shouldExpand=function(t){var e=this.config;return this.isDonutType(t)&&e.donut_expand||this.isGaugeType(t)&&e.gauge_expand||this.isPieType(t)&&e.pie_expand},l.prototype.shouldShowArcLabel=function(){var t=this.config,e=!0;return this.hasType("donut")?e=t.donut_label_show:this.hasType("pie")&&(e=t.pie_label_show),e},l.prototype.meetsArcLabelThreshold=function(t){var e=this.config;return(this.hasType("donut")?e.donut_label_threshold:e.pie_label_threshold)<=t},l.prototype.getArcLabelFormat=function(){var t=this.config,e=t.pie_label_format;return this.hasType("gauge")?e=t.gauge_label_format:this.hasType("donut")&&(e=t.donut_label_format),e},l.prototype.getGaugeLabelExtents=function(){return this.config.gauge_label_extents},l.prototype.getArcTitle=function(){return this.hasType("donut")?this.config.donut_title:""},l.prototype.updateTargetsForArc=function(t){var e,i=this,n=i.main,r=i.classChartArc.bind(i),a=i.classArcs.bind(i),o=i.classFocus.bind(i);(e=n.select("."+Y.chartArcs).selectAll("."+Y.chartArc).data(i.pie(t)).attr("class",function(t){return r(t)+o(t.data)}).enter().append("g").attr("class",r)).append("g").attr("class",a),e.append("text").attr("dy",i.hasType("gauge")?"-.1em":".35em").style("opacity",0).style("text-anchor","middle").style("pointer-events","none")},l.prototype.initArc=function(){var t=this;t.arcs=t.main.select("."+Y.chart).append("g").attr("class",Y.chartArcs).attr("transform",t.getTranslate("arc")),t.arcs.append("text").attr("class",Y.chartArcsTitle).style("text-anchor","middle").text(t.getArcTitle())},l.prototype.redrawArc=function(t,e,i){var n,r,a,o,l=this,u=l.d3,s=l.config,c=l.main,d=l.hasType("gauge");if(r=(n=c.selectAll("."+Y.arcs).selectAll("."+Y.arc).data(l.arcData.bind(l))).enter().append("path").attr("class",l.classArc.bind(l)).style("fill",function(t){return l.color(t.data)}).style("cursor",function(t){return s.interaction_enabled&&s.data_selection_isselectable(t)?"pointer":null}).each(function(t){l.isGaugeType(t.data)&&(t.startAngle=t.endAngle=s.gauge_startingAngle),this._current=t}).merge(n),d&&(o=(a=c.selectAll("."+Y.arcs).selectAll("."+Y.arcLabelLine).data(l.arcData.bind(l))).enter().append("rect").attr("class",function(t){return Y.arcLabelLine+" "+Y.target+" "+Y.target+"-"+t.data.id}).merge(a),1===l.filterTargetsToShow(l.data.targets).length?o.style("display","none"):o.style("fill",function(t){return 0<s.color_pattern.length?l.levelColor(t.data.values[0].value):l.color(t.data)}).style("display",s.gauge_labelLine_show?"":"none").each(function(t){var e=0,i=0,n=0,r="";if(l.hiddenTargetIds.indexOf(t.data.id)<0){var a=l.updateAngle(t),o=l.gaugeArcWidth/l.filterTargetsToShow(l.data.targets).length*(a.index+1),s=a.endAngle-Math.PI/2,c=l.radius-o,d=s-(0===c?0:1/c);e=l.radiusExpanded-l.radius+o,i=Math.cos(d)*c,n=Math.sin(d)*c,r="rotate("+180*s/Math.PI+", "+i+", "+n+")"}u.select(this).attr("x",i).attr("y",n).attr("width",e).attr("height",2).attr("transform",r).style("stroke-dasharray","0, "+(e+2)+", 0")})),r.attr("transform",function(t){return!l.isGaugeType(t.data)&&i?"scale(0)":""}).on("mouseover",s.interaction_enabled?function(t){var e,i;l.transiting||(e=l.updateAngle(t))&&(i=l.convertToArcData(e),l.expandArc(e.data.id),l.api.focus(e.data.id),l.toggleFocusLegend(e.data.id,!0),l.config.data_onmouseover(i,this))}:null).on("mousemove",s.interaction_enabled?function(t){var e,i=l.updateAngle(t);i&&(e=[l.convertToArcData(i)],l.showTooltip(e,this))}:null).on("mouseout",s.interaction_enabled?function(t){var e,i;l.transiting||(e=l.updateAngle(t))&&(i=l.convertToArcData(e),l.unexpandArc(e.data.id),l.api.revert(),l.revertLegend(),l.hideTooltip(),l.config.data_onmouseout(i,this))}:null).on("click",s.interaction_enabled?function(t,e){var i,n=l.updateAngle(t);n&&(i=l.convertToArcData(n),l.toggleShape&&l.toggleShape(this,i,e),l.config.data_onclick.call(l.api,i,this))}:null).each(function(){l.transiting=!0}).transition().duration(t).attrTween("d",function(i){var n,t=l.updateAngle(i);return t?(isNaN(this._current.startAngle)&&(this._current.startAngle=0),isNaN(this._current.endAngle)&&(this._current.endAngle=this._current.startAngle),n=u.interpolate(this._current,t),this._current=n(0),function(t){var e=n(t);return e.data=i.data,l.getArc(e,!0)}):function(){return"M 0 0"}}).attr("transform",i?"scale(1)":"").style("fill",function(t){return l.levelColor?l.levelColor(t.data.values[0].value):l.color(t.data.id)}).call(l.endall,function(){l.transiting=!1}),n.exit().transition().duration(e).style("opacity",0).remove(),c.selectAll("."+Y.chartArc).select("text").style("opacity",0).attr("class",function(t){return l.isGaugeType(t.data)?Y.gaugeValue:""}).text(l.textForArcLabel.bind(l)).attr("transform",l.transformForArcLabel.bind(l)).style("font-size",function(t){return l.isGaugeType(t.data)&&1===l.filterTargetsToShow(l.data.targets).length?Math.round(l.radius/5)+"px":""}).transition().duration(t).style("opacity",function(t){return l.isTargetToShow(t.data.id)&&l.isArcType(t.data)?1:0}),c.select("."+Y.chartArcsTitle).style("opacity",l.hasType("donut")||d?1:0),d){var h=0,g=l.arcs.select("g."+Y.chartArcsBackground).selectAll("path."+Y.chartArcsBackground).data(l.data.targets);g.enter().append("path").attr("class",function(t,e){return Y.chartArcsBackground+" "+Y.chartArcsBackground+"-"+e}).merge(g).attr("d",function(t){if(0<=l.hiddenTargetIds.indexOf(t.id))return"M 0 0";var e={data:[{value:s.gauge_max}],startAngle:s.gauge_startingAngle,endAngle:-1*s.gauge_startingAngle*(s.gauge_fullCircle?Math.PI:1),index:h++};return l.getArc(e,!0,!0)}),g.exit().remove(),l.arcs.select("."+Y.chartArcsGaugeUnit).attr("dy",".75em").text(s.gauge_label_show?s.gauge_units:""),l.arcs.select("."+Y.chartArcsGaugeMin).attr("dx",-1*(l.innerRadius+(l.radius-l.innerRadius)/(s.gauge_fullCircle?1:2))+"px").attr("dy","1.2em").text(s.gauge_label_show?l.textForGaugeMinMax(s.gauge_min,!1):""),l.arcs.select("."+Y.chartArcsGaugeMax).attr("dx",l.innerRadius+(l.radius-l.innerRadius)/(s.gauge_fullCircle?1:2)+"px").attr("dy","1.2em").text(s.gauge_label_show?l.textForGaugeMinMax(s.gauge_max,!0):"")}},l.prototype.initGauge=function(){var t=this.arcs;this.hasType("gauge")&&(t.append("g").attr("class",Y.chartArcsBackground),t.append("text").attr("class",Y.chartArcsGaugeUnit).style("text-anchor","middle").style("pointer-events","none"),t.append("text").attr("class",Y.chartArcsGaugeMin).style("text-anchor","middle").style("pointer-events","none"),t.append("text").attr("class",Y.chartArcsGaugeMax).style("text-anchor","middle").style("pointer-events","none"))},l.prototype.getGaugeLabelHeight=function(){return this.config.gauge_label_show?20:0},l.prototype.hasCaches=function(t){for(var e=0;e<t.length;e++)if(!(t[e]in this.cache))return!1;return!0},l.prototype.addCache=function(t,e){this.cache[t]=this.cloneTarget(e)},l.prototype.getCaches=function(t){var e,i=[];for(e=0;e<t.length;e++)t[e]in this.cache&&i.push(this.cloneTarget(this.cache[t[e]]));return i},l.prototype.categoryName=function(t){var e=this.config;return t<e.axis_x_categories.length?e.axis_x_categories[t]:t},l.prototype.generateTargetClass=function(t){return t||0===t?("-"+t).replace(/\s/g,"-"):""},l.prototype.generateClass=function(t,e){return" "+t+" "+t+this.generateTargetClass(e)},l.prototype.classText=function(t){return this.generateClass(Y.text,t.index)},l.prototype.classTexts=function(t){return this.generateClass(Y.texts,t.id)},l.prototype.classShape=function(t){return this.generateClass(Y.shape,t.index)},l.prototype.classShapes=function(t){return this.generateClass(Y.shapes,t.id)},l.prototype.classLine=function(t){return this.classShape(t)+this.generateClass(Y.line,t.id)},l.prototype.classLines=function(t){return this.classShapes(t)+this.generateClass(Y.lines,t.id)},l.prototype.classCircle=function(t){return this.classShape(t)+this.generateClass(Y.circle,t.index)},l.prototype.classCircles=function(t){return this.classShapes(t)+this.generateClass(Y.circles,t.id)},l.prototype.classBar=function(t){return this.classShape(t)+this.generateClass(Y.bar,t.index)},l.prototype.classBars=function(t){return this.classShapes(t)+this.generateClass(Y.bars,t.id)},l.prototype.classArc=function(t){return this.classShape(t.data)+this.generateClass(Y.arc,t.data.id)},l.prototype.classArcs=function(t){return this.classShapes(t.data)+this.generateClass(Y.arcs,t.data.id)},l.prototype.classArea=function(t){return this.classShape(t)+this.generateClass(Y.area,t.id)},l.prototype.classAreas=function(t){return this.classShapes(t)+this.generateClass(Y.areas,t.id)},l.prototype.classRegion=function(t,e){return this.generateClass(Y.region,e)+" "+("class"in t?t.class:"")},l.prototype.classEvent=function(t){return this.generateClass(Y.eventRect,t.index)},l.prototype.classTarget=function(t){var e=this.config.data_classes[t],i="";return e&&(i=" "+Y.target+"-"+e),this.generateClass(Y.target,t)+i},l.prototype.classFocus=function(t){return this.classFocused(t)+this.classDefocused(t)},l.prototype.classFocused=function(t){return" "+(0<=this.focusedTargetIds.indexOf(t.id)?Y.focused:"")},l.prototype.classDefocused=function(t){return" "+(0<=this.defocusedTargetIds.indexOf(t.id)?Y.defocused:"")},l.prototype.classChartText=function(t){return Y.chartText+this.classTarget(t.id)},l.prototype.classChartLine=function(t){return Y.chartLine+this.classTarget(t.id)},l.prototype.classChartBar=function(t){return Y.chartBar+this.classTarget(t.id)},l.prototype.classChartArc=function(t){return Y.chartArc+this.classTarget(t.data.id)},l.prototype.getTargetSelectorSuffix=function(t){return this.generateTargetClass(t).replace(/([?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\])/g,"\\$1")},l.prototype.selectorTarget=function(t,e){return(e||"")+"."+Y.target+this.getTargetSelectorSuffix(t)},l.prototype.selectorTargets=function(t,e){var i=this;return(t=t||[]).length?t.map(function(t){return i.selectorTarget(t,e)}):null},l.prototype.selectorLegend=function(t){return"."+Y.legendItem+this.getTargetSelectorSuffix(t)},l.prototype.selectorLegends=function(t){var e=this;return t&&t.length?t.map(function(t){return e.selectorLegend(t)}):null},l.prototype.getClipPath=function(t){return"url("+(0<=window.navigator.appVersion.toLowerCase().indexOf("msie 9.")?"":document.URL.split("#")[0])+"#"+t+")"},l.prototype.appendClip=function(t,e){return t.append("clipPath").attr("id",e).append("rect")},l.prototype.getAxisClipX=function(t){var e=Math.max(30,this.margin.left);return t?-(1+e):-(e-1)},l.prototype.getAxisClipY=function(t){return t?-20:-this.margin.top},l.prototype.getXAxisClipX=function(){return this.getAxisClipX(!this.config.axis_rotated)},l.prototype.getXAxisClipY=function(){return this.getAxisClipY(!this.config.axis_rotated)},l.prototype.getYAxisClipX=function(){return this.config.axis_y_inner?-1:this.getAxisClipX(this.config.axis_rotated)},l.prototype.getYAxisClipY=function(){return this.getAxisClipY(this.config.axis_rotated)},l.prototype.getAxisClipWidth=function(t){var e=Math.max(30,this.margin.left),i=Math.max(30,this.margin.right);return t?this.width+2+e+i:this.margin.left+20},l.prototype.getAxisClipHeight=function(t){return(t?this.margin.bottom:this.margin.top+this.height)+20},l.prototype.getXAxisClipWidth=function(){return this.getAxisClipWidth(!this.config.axis_rotated)},l.prototype.getXAxisClipHeight=function(){return this.getAxisClipHeight(!this.config.axis_rotated)},l.prototype.getYAxisClipWidth=function(){return this.getAxisClipWidth(this.config.axis_rotated)+(this.config.axis_y_inner?20:0)},l.prototype.getYAxisClipHeight=function(){return this.getAxisClipHeight(this.config.axis_rotated)},l.prototype.generateColor=function(){var t=this.config,e=this.d3,n=t.data_colors,r=C(t.color_pattern)?t.color_pattern:e.schemeCategory10,a=t.data_color,o=[];return function(t){var e,i=t.id||t.data&&t.data.id||t;return n[i]instanceof Function?e=n[i](t):n[i]?e=n[i]:(o.indexOf(i)<0&&o.push(i),e=r[o.indexOf(i)%r.length],n[i]=e),a instanceof Function?a(e,t):e}},l.prototype.generateLevelColor=function(){var t=this.config,n=t.color_pattern,e=t.color_threshold,r="value"===e.unit,a=e.values&&e.values.length?e.values:[],o=e.max||100;return C(t.color_threshold)?function(t){var e,i=n[n.length-1];for(e=0;e<a.length;e++)if((r?t:100*t/o)<a[e]){i=n[e];break}return i}:null},l.prototype.getDefaultConfig=function(){var e={bindto:"#chart",svg_classname:void 0,size_width:void 0,size_height:void 0,padding_left:void 0,padding_right:void 0,padding_top:void 0,padding_bottom:void 0,resize_auto:!0,zoom_enabled:!1,zoom_initialRange:void 0,zoom_type:"scroll",zoom_disableDefaultBehavior:!1,zoom_privileged:!1,zoom_rescale:!1,zoom_onzoom:function(){},zoom_onzoomstart:function(){},zoom_onzoomend:function(){},zoom_x_min:void 0,zoom_x_max:void 0,interaction_brighten:!0,interaction_enabled:!0,onmouseover:function(){},onmouseout:function(){},onresize:function(){},onresized:function(){},oninit:function(){},onrendered:function(){},transition_duration:350,data_x:void 0,data_xs:{},data_xFormat:"%Y-%m-%d",data_xLocaltime:!0,data_xSort:!0,data_idConverter:function(t){return t},data_names:{},data_classes:{},data_groups:[],data_axes:{},data_type:void 0,data_types:{},data_labels:{},data_order:"desc",data_regions:{},data_color:void 0,data_colors:{},data_hide:!1,data_filter:void 0,data_selection_enabled:!1,data_selection_grouped:!1,data_selection_isselectable:function(){return!0},data_selection_multiple:!0,data_selection_draggable:!1,data_onclick:function(){},data_onmouseover:function(){},data_onmouseout:function(){},data_onselected:function(){},data_onunselected:function(){},data_url:void 0,data_headers:void 0,data_json:void 0,data_rows:void 0,data_columns:void 0,data_mimeType:void 0,data_keys:void 0,data_empty_label_text:"",subchart_show:!1,subchart_size_height:60,subchart_axis_x_show:!0,subchart_onbrush:function(){},color_pattern:[],color_threshold:{},legend_show:!0,legend_hide:!1,legend_position:"bottom",legend_inset_anchor:"top-left",legend_inset_x:10,legend_inset_y:0,legend_inset_step:void 0,legend_item_onclick:void 0,legend_item_onmouseover:void 0,legend_item_onmouseout:void 0,legend_equally:!1,legend_padding:0,legend_item_tile_width:10,legend_item_tile_height:10,axis_rotated:!1,axis_x_show:!0,axis_x_type:"indexed",axis_x_localtime:!0,axis_x_categories:[],axis_x_tick_centered:!1,axis_x_tick_format:void 0,axis_x_tick_culling:{},axis_x_tick_culling_max:10,axis_x_tick_count:void 0,axis_x_tick_fit:!0,axis_x_tick_values:null,axis_x_tick_rotate:0,axis_x_tick_outer:!0,axis_x_tick_multiline:!0,axis_x_tick_multilineMax:0,axis_x_tick_width:null,axis_x_max:void 0,axis_x_min:void 0,axis_x_padding:{},axis_x_height:void 0,axis_x_selection:void 0,axis_x_label:{},axis_x_inner:void 0,axis_y_show:!0,axis_y_type:void 0,axis_y_max:void 0,axis_y_min:void 0,axis_y_inverted:!1,axis_y_center:void 0,axis_y_inner:void 0,axis_y_label:{},axis_y_tick_format:void 0,axis_y_tick_outer:!0,axis_y_tick_values:null,axis_y_tick_rotate:0,axis_y_tick_count:void 0,axis_y_tick_time_type:void 0,axis_y_tick_time_interval:void 0,axis_y_padding:{},axis_y_default:void 0,axis_y2_show:!1,axis_y2_max:void 0,axis_y2_min:void 0,axis_y2_inverted:!1,axis_y2_center:void 0,axis_y2_inner:void 0,axis_y2_label:{},axis_y2_tick_format:void 0,axis_y2_tick_outer:!0,axis_y2_tick_values:null,axis_y2_tick_count:void 0,axis_y2_padding:{},axis_y2_default:void 0,grid_x_show:!1,grid_x_type:"tick",grid_x_lines:[],grid_y_show:!1,grid_y_lines:[],grid_y_ticks:10,grid_focus_show:!0,grid_lines_front:!0,point_show:!0,point_r:2.5,point_sensitivity:10,point_focus_expand_enabled:!0,point_focus_expand_r:void 0,point_select_r:void 0,line_connectNull:!1,line_step_type:"step",bar_width:void 0,bar_width_ratio:.6,bar_width_max:void 0,bar_zerobased:!0,bar_space:0,area_zerobased:!0,area_above:!1,pie_label_show:!0,pie_label_format:void 0,pie_label_threshold:.05,pie_label_ratio:void 0,pie_expand:{},pie_expand_duration:50,gauge_fullCircle:!1,gauge_label_show:!0,gauge_labelLine_show:!0,gauge_label_format:void 0,gauge_min:0,gauge_max:100,gauge_startingAngle:-1*Math.PI/2,gauge_label_extents:void 0,gauge_units:void 0,gauge_width:void 0,gauge_arcs_minWidth:5,gauge_expand:{},gauge_expand_duration:50,donut_label_show:!0,donut_label_format:void 0,donut_label_threshold:.05,donut_label_ratio:void 0,donut_width:void 0,donut_title:"",donut_expand:{},donut_expand_duration:50,spline_interpolation_type:"cardinal",regions:[],tooltip_show:!0,tooltip_grouped:!0,tooltip_order:void 0,tooltip_format_title:void 0,tooltip_format_name:void 0,tooltip_format_value:void 0,tooltip_position:void 0,tooltip_contents:function(t,e,i,n){return this.getTooltipContent?this.getTooltipContent(t,e,i,n):""},tooltip_init_show:!1,tooltip_init_x:0,tooltip_init_position:{top:"0px",left:"50px"},tooltip_onshow:function(){},tooltip_onhide:function(){},title_text:void 0,title_padding:{top:0,right:0,bottom:0,left:0},title_position:"top-center"};return Object.keys(this.additionalConfig).forEach(function(t){e[t]=this.additionalConfig[t]},this),e},l.prototype.additionalConfig={},l.prototype.loadConfig=function(e){var i,n,r,a=this.config;Object.keys(a).forEach(function(t){i=e,n=t.split("_"),r=function t(){var e=n.shift();return e&&i&&"object"===s(i)&&e in i?(i=i[e],t()):e?void 0:i}(),k(r)&&(a[t]=r)})},l.prototype.convertUrlToData=function(t,e,i,n,r){var a,o,s=this,c=e||"csv";o="json"===c?(a=s.d3.json,s.convertJsonToData):(a="tsv"===c?s.d3.tsv:s.d3.csv,s.convertXsvToData),a(t,i).then(function(t){r.call(s,o.call(s,t,n))}).catch(function(t){throw t})},l.prototype.convertXsvToData=function(t){var e=t.columns;return 0===t.length?{keys:e,rows:[e.reduce(function(t,e){return Object.assign(t,(r=null,(n=e)in(i={})?Object.defineProperty(i,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):i[n]=r,i));var i,n,r},{})]}:{keys:e,rows:[].concat(t)}},l.prototype.convertJsonToData=function(e,t){var r,a=this,o=[];return t?(t.x?(r=t.value.concat(t.x),a.config.data_x=t.x):r=t.value,o.push(r),e.forEach(function(i){var n=[];r.forEach(function(t){var e=a.findValueInJson(i,t);v(e)&&(e=null),n.push(e)}),o.push(n)}),a.convertRowsToData(o)):(Object.keys(e).forEach(function(t){o.push([t].concat(e[t]))}),a.convertColumnsToData(o))},l.prototype.findValueInJson=function(t,e){for(var i=(e=(e=e.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),n=0;n<i.length;++n){var r=i[n];if(!(r in t))return;t=t[r]}return t},l.prototype.convertRowsToData=function(t){for(var e=[],i=t[0],n=1;n<t.length;n++){for(var r={},a=0;a<t[n].length;a++){if(v(t[n][a]))throw new Error("Source data is missing a component at ("+n+","+a+")!");r[i[a]]=t[n][a]}e.push(r)}return{keys:i,rows:e}},l.prototype.convertColumnsToData=function(t){for(var e=[],i=[],n=0;n<t.length;n++){for(var r=t[n][0],a=1;a<t[n].length;a++){if(v(e[a-1])&&(e[a-1]={}),v(t[n][a]))throw new Error("Source data is missing a component at ("+n+","+a+")!");e[a-1][r]=t[n][a]}i.push(r)}return{keys:i,rows:e}},l.prototype.convertDataToTargets=function(t,n){var e,i,r,a,c=this,d=c.config;return o(t)?a=Object.keys(t[0]):(a=t.keys,t=t.rows),i=a.filter(c.isNotX,c),r=a.filter(c.isX,c),i.forEach(function(i){var e=c.getXKey(i);c.isCustomX()||c.isTimeSeries()?0<=r.indexOf(e)?c.data.xs[i]=(n&&c.data.xs[i]?c.data.xs[i]:[]).concat(t.map(function(t){return t[e]}).filter(P).map(function(t,e){return c.generateTargetX(t,i,e)})):d.data_x?c.data.xs[i]=c.getOtherTargetXs():C(d.data_xs)&&(c.data.xs[i]=c.getXValuesOfXKey(e,c.data.targets)):c.data.xs[i]=t.map(function(t,e){return e})}),i.forEach(function(t){if(!c.data.xs[t])throw new Error('x is not defined for id = "'+t+'".')}),(e=i.map(function(a,o){var s=d.data_idConverter(a);return{id:s,id_org:a,values:t.map(function(t,e){var i,n=t[c.getXKey(a)],r=null===t[a]||isNaN(t[a])?null:+t[a];return c.isCustomX()&&c.isCategorized()&&!v(n)?(0===o&&0===e&&(d.axis_x_categories=[]),-1===(i=d.axis_x_categories.indexOf(n))&&(i=d.axis_x_categories.length,d.axis_x_categories.push(n))):i=c.generateTargetX(n,a,e),(v(t[a])||c.data.xs[a].length<=e)&&(i=void 0),{x:i,value:r,id:s}}).filter(function(t){return k(t.x)})}})).forEach(function(t){var e;d.data_xSort&&(t.values=t.values.sort(function(t,e){return(t.x||0===t.x?t.x:1/0)-(e.x||0===e.x?e.x:1/0)})),e=0,t.values.forEach(function(t){t.index=e++}),c.data.xs[t.id].sort(function(t,e){return t-e})}),c.hasNegativeValue=c.hasNegativeValueInTargets(e),c.hasPositiveValue=c.hasPositiveValueInTargets(e),d.data_type&&c.setTargetType(c.mapToIds(e).filter(function(t){return!(t in d.data_types)}),d.data_type),e.forEach(function(t){c.addCache(t.id_org,t)}),e},l.prototype.isX=function(t){var e,i,n,r=this.config;return r.data_x&&t===r.data_x||C(r.data_xs)&&(e=r.data_xs,i=t,n=!1,Object.keys(e).forEach(function(t){e[t]===i&&(n=!0)}),n)},l.prototype.isNotX=function(t){return!this.isX(t)},l.prototype.getXKey=function(t){var e=this.config;return e.data_x?e.data_x:C(e.data_xs)?e.data_xs[t]:null},l.prototype.getXValuesOfXKey=function(e,t){var i,n=this;return(t&&C(t)?n.mapToIds(t):[]).forEach(function(t){n.getXKey(t)===e&&(i=n.data.xs[t])}),i},l.prototype.getXValue=function(t,e){return t in this.data.xs&&this.data.xs[t]&&P(this.data.xs[t][e])?this.data.xs[t][e]:e},l.prototype.getOtherTargetXs=function(){var t=Object.keys(this.data.xs);return t.length?this.data.xs[t[0]]:null},l.prototype.getOtherTargetX=function(t){var e=this.getOtherTargetXs();return e&&t<e.length?e[t]:null},l.prototype.addXs=function(e){var i=this;Object.keys(e).forEach(function(t){i.config.data_xs[t]=e[t]})},l.prototype.addName=function(t){var e;return t&&(e=this.config.data_names[t.id],t.name=void 0!==e?e:t.id),t},l.prototype.getValueOnIndex=function(t,e){var i=t.filter(function(t){return t.index===e});return i.length?i[0]:null},l.prototype.updateTargetX=function(t,n){var r=this;t.forEach(function(i){i.values.forEach(function(t,e){t.x=r.generateTargetX(n[e],i.id,e)}),r.data.xs[i.id]=n})},l.prototype.updateTargetXs=function(t,e){var i=this;t.forEach(function(t){e[t.id]&&i.updateTargetX([t],e[t.id])})},l.prototype.generateTargetX=function(t,e,i){var n=this;return n.isTimeSeries()?t?n.parseDate(t):n.parseDate(n.getXValue(e,i)):n.isCustomX()&&!n.isCategorized()?P(t)?+t:n.getXValue(e,i):i},l.prototype.cloneTarget=function(t){return{id:t.id,id_org:t.id_org,values:t.values.map(function(t){return{x:t.x,value:t.value,id:t.id}})}},l.prototype.getMaxDataCount=function(){return this.d3.max(this.data.targets,function(t){return t.values.length})},l.prototype.mapToIds=function(t){return t.map(function(t){return t.id})},l.prototype.mapToTargetIds=function(t){return t?[].concat(t):this.mapToIds(this.data.targets)},l.prototype.hasTarget=function(t,e){var i,n=this.mapToIds(t);for(i=0;i<n.length;i++)if(n[i]===e)return!0;return!1},l.prototype.isTargetToShow=function(t){return this.hiddenTargetIds.indexOf(t)<0},l.prototype.isLegendToShow=function(t){return this.hiddenLegendIds.indexOf(t)<0},l.prototype.filterTargetsToShow=function(t){var e=this;return t.filter(function(t){return e.isTargetToShow(t.id)})},l.prototype.mapTargetsToUniqueXs=function(t){var e=this.d3.set(this.d3.merge(t.map(function(t){return t.values.map(function(t){return+t.x})}))).values();return(e=this.isTimeSeries()?e.map(function(t){return new Date(+t)}):e.map(function(t){return+t})).sort(function(t,e){return t<e?-1:e<t?1:e<=t?0:NaN})},l.prototype.addHiddenTargetIds=function(t){t=t instanceof Array?t:new Array(t);for(var e=0;e<t.length;e++)this.hiddenTargetIds.indexOf(t[e])<0&&(this.hiddenTargetIds=this.hiddenTargetIds.concat(t[e]))},l.prototype.removeHiddenTargetIds=function(e){this.hiddenTargetIds=this.hiddenTargetIds.filter(function(t){return e.indexOf(t)<0})},l.prototype.addHiddenLegendIds=function(t){t=t instanceof Array?t:new Array(t);for(var e=0;e<t.length;e++)this.hiddenLegendIds.indexOf(t[e])<0&&(this.hiddenLegendIds=this.hiddenLegendIds.concat(t[e]))},l.prototype.removeHiddenLegendIds=function(e){this.hiddenLegendIds=this.hiddenLegendIds.filter(function(t){return e.indexOf(t)<0})},l.prototype.getValuesAsIdKeyed=function(t){var i={};return t.forEach(function(e){i[e.id]=[],e.values.forEach(function(t){i[e.id].push(t.value)})}),i},l.prototype.checkValueInTargets=function(t,e){var i,n,r,a=Object.keys(t);for(i=0;i<a.length;i++)for(r=t[a[i]].values,n=0;n<r.length;n++)if(e(r[n].value))return!0;return!1},l.prototype.hasNegativeValueInTargets=function(t){return this.checkValueInTargets(t,function(t){return t<0})},l.prototype.hasPositiveValueInTargets=function(t){return this.checkValueInTargets(t,function(t){return 0<t})},l.prototype.isOrderDesc=function(){var t=this.config;return"string"==typeof t.data_order&&"desc"===t.data_order.toLowerCase()},l.prototype.isOrderAsc=function(){var t=this.config;return"string"==typeof t.data_order&&"asc"===t.data_order.toLowerCase()},l.prototype.getOrderFunction=function(){var t=this.config,r=this.isOrderAsc(),e=this.isOrderDesc();if(r||e){var a=function(t,e){return t+Math.abs(e.value)};return function(t,e){var i=t.values.reduce(a,0),n=e.values.reduce(a,0);return r?n-i:i-n}}if(h(t.data_order))return t.data_order;if(o(t.data_order)){var i=t.data_order;return function(t,e){return i.indexOf(t.id)-i.indexOf(e.id)}}},l.prototype.orderTargets=function(t){var e=this.getOrderFunction();return e&&t.sort(e),t},l.prototype.filterByX=function(t,e){return this.d3.merge(t.map(function(t){return t.values})).filter(function(t){return t.x-e==0})},l.prototype.filterRemoveNull=function(t){return t.filter(function(t){return P(t.value)})},l.prototype.filterByXDomain=function(t,e){return t.map(function(t){return{id:t.id,id_org:t.id_org,values:t.values.filter(function(t){return e[0]<=t.x&&t.x<=e[1]})}})},l.prototype.hasDataLabel=function(){var t=this.config;return!("boolean"!=typeof t.data_labels||!t.data_labels)||!("object"!==s(t.data_labels)||!C(t.data_labels))},l.prototype.getDataLabelLength=function(t,e,i){var n=this,r=[0,0];return n.selectChart.select("svg").selectAll(".dummy").data([t,e]).enter().append("text").text(function(t){return n.dataLabelFormat(t.id)(t)}).each(function(t,e){r[e]=1.3*this.getBoundingClientRect()[i]}).remove(),r},l.prototype.isNoneArc=function(t){return this.hasTarget(this.data.targets,t.id)},l.prototype.isArc=function(t){return"data"in t&&this.hasTarget(this.data.targets,t.data.id)},l.prototype.findClosestFromTargets=function(t,e){var i,n=this;return i=t.map(function(t){return n.findClosest(t.values,e)}),n.findClosest(i,e)},l.prototype.findClosest=function(t,i){var n,r=this,a=r.config.point_sensitivity;return t.filter(function(t){return t&&r.isBarType(t.id)}).forEach(function(t){var e=r.main.select("."+Y.bars+r.getTargetSelectorSuffix(t.id)+" ."+Y.bar+"-"+t.index).node();!n&&r.isWithinBar(r.d3.mouse(e),e)&&(n=t)}),t.filter(function(t){return t&&!r.isBarType(t.id)}).forEach(function(t){var e=r.dist(t,i);e<a&&(a=e,n=t)}),n},l.prototype.dist=function(t,e){var i=this.config,n=i.axis_rotated?1:0,r=i.axis_rotated?0:1,a=this.circleY(t,t.index),o=this.x(t.x);return Math.sqrt(Math.pow(o-e[n],2)+Math.pow(a-e[r],2))},l.prototype.convertValuesToStep=function(t){var e,i=[].concat(t);if(!this.isCategorized())return t;for(e=t.length+1;0<e;e--)i[e]=i[e-1];return i[0]={x:i[0].x-1,value:i[0].value,id:i[0].id},i[t.length+1]={x:i[t.length].x+1,value:i[t.length].value,id:i[t.length].id},i},l.prototype.updateDataAttributes=function(t,e){var i=this.config["data_"+t];return void 0===e||(Object.keys(e).forEach(function(t){i[t]=e[t]}),this.redraw({withLegend:!0})),i},l.prototype.load=function(i,n){var r=this;i&&(n.filter&&(i=i.filter(n.filter)),(n.type||n.types)&&i.forEach(function(t){var e=n.types&&n.types[t.id]?n.types[t.id]:n.type;r.setTargetType(t.id,e)}),r.data.targets.forEach(function(t){for(var e=0;e<i.length;e++)if(t.id===i[e].id){t.values=i[e].values,i.splice(e,1);break}}),r.data.targets=r.data.targets.concat(i)),r.updateTargets(r.data.targets),r.redraw({withUpdateOrgXDomain:!0,withUpdateXDomain:!0,withLegend:!0}),n.done&&n.done()},l.prototype.loadFromArgs=function(e){var i=this;e.data?i.load(i.convertDataToTargets(e.data),e):e.url?i.convertUrlToData(e.url,e.mimeType,e.headers,e.keys,function(t){i.load(i.convertDataToTargets(t),e)}):e.json?i.load(i.convertDataToTargets(i.convertJsonToData(e.json,e.keys)),e):e.rows?i.load(i.convertDataToTargets(i.convertRowsToData(e.rows)),e):e.columns?i.load(i.convertDataToTargets(i.convertColumnsToData(e.columns)),e):i.load(null,e)},l.prototype.unload=function(t,e){var i=this;e||(e=function(){}),(t=t.filter(function(t){return i.hasTarget(i.data.targets,t)}))&&0!==t.length?(i.svg.selectAll(t.map(function(t){return i.selectorTarget(t)})).transition().style("opacity",0).remove().call(i.endall,e),t.forEach(function(e){i.withoutFadeIn[e]=!1,i.legend&&i.legend.selectAll("."+Y.legendItem+i.getTargetSelectorSuffix(e)).remove(),i.data.targets=i.data.targets.filter(function(t){return t.id!==e})})):e()},l.prototype.getYDomainMin=function(t){var e,i,n,r,a,o,s=this,c=s.config,d=s.mapToIds(t),l=s.getValuesAsIdKeyed(t);if(0<c.data_groups.length)for(o=s.hasNegativeValueInTargets(t),e=0;e<c.data_groups.length;e++)if(0!==(r=c.data_groups[e].filter(function(t){return 0<=d.indexOf(t)})).length)for(n=r[0],o&&l[n]&&l[n].forEach(function(t,e){l[n][e]=t<0?t:0}),i=1;i<r.length;i++)a=r[i],l[a]&&l[a].forEach(function(t,e){s.axis.getId(a)!==s.axis.getId(n)||!l[n]||o&&0<+t||(l[n][e]+=+t)});return s.d3.min(Object.keys(l).map(function(t){return s.d3.min(l[t])}))},l.prototype.getYDomainMax=function(t){var e,i,n,r,a,o,s=this,c=s.config,d=s.mapToIds(t),l=s.getValuesAsIdKeyed(t);if(0<c.data_groups.length)for(o=s.hasPositiveValueInTargets(t),e=0;e<c.data_groups.length;e++)if(0!==(r=c.data_groups[e].filter(function(t){return 0<=d.indexOf(t)})).length)for(n=r[0],o&&l[n]&&l[n].forEach(function(t,e){l[n][e]=0<t?t:0}),i=1;i<r.length;i++)a=r[i],l[a]&&l[a].forEach(function(t,e){s.axis.getId(a)!==s.axis.getId(n)||!l[n]||o&&+t<0||(l[n][e]+=+t)});return s.d3.max(Object.keys(l).map(function(t){return s.d3.max(l[t])}))},l.prototype.getYDomain=function(t,e,i){var n,r,a,o,s,c,d,l,u,h,g=this,p=g.config,f=t.filter(function(t){return g.axis.getId(t.id)===e}),_=i?g.filterByXDomain(f,i):f,x="y2"===e?p.axis_y2_min:p.axis_y_min,y="y2"===e?p.axis_y2_max:p.axis_y_max,m=g.getYDomainMin(_),S=g.getYDomainMax(_),w="y2"===e?p.axis_y2_center:p.axis_y_center,v=g.hasType("bar",_)&&p.bar_zerobased||g.hasType("area",_)&&p.area_zerobased,b="y2"===e?p.axis_y2_inverted:p.axis_y_inverted,A=g.hasDataLabel()&&p.axis_rotated,T=g.hasDataLabel()&&!p.axis_rotated;return m=P(x)?x:P(y)?m<y?m:y-10:m,S=P(y)?y:P(x)?x<S?S:x+10:S,0===_.length?"y2"===e?g.y2.domain():g.y.domain():(isNaN(m)&&(m=0),isNaN(S)&&(S=m),m===S&&(m<0?S=0:m=0),u=0<=m&&0<=S,h=m<=0&&S<=0,(P(x)&&u||P(y)&&h)&&(v=!1),v&&(u&&(m=0),h&&(S=0)),a=o=.1*(r=Math.abs(S-m)),void 0!==w&&(S=w+(s=Math.max(Math.abs(m),Math.abs(S))),m=w-s),A?(c=g.getDataLabelLength(m,S,"width"),d=R(g.y.range()),a+=r*((l=[c[0]/d,c[1]/d])[1]/(1-l[0]-l[1])),o+=r*(l[0]/(1-l[0]-l[1]))):T&&(c=g.getDataLabelLength(m,S,"height"),a+=g.axis.convertPixelsToAxisPadding(c[1],r),o+=g.axis.convertPixelsToAxisPadding(c[0],r)),"y"===e&&C(p.axis_y_padding)&&(a=g.axis.getPadding(p.axis_y_padding,"top",a,r),o=g.axis.getPadding(p.axis_y_padding,"bottom",o,r)),"y2"===e&&C(p.axis_y2_padding)&&(a=g.axis.getPadding(p.axis_y2_padding,"top",a,r),o=g.axis.getPadding(p.axis_y2_padding,"bottom",o,r)),v&&(u&&(o=m),h&&(a=-S)),n=[m-o,S+a],b?n.reverse():n)},l.prototype.getXDomainMin=function(t){var e=this,i=e.config;return k(i.axis_x_min)?e.isTimeSeries()?this.parseDate(i.axis_x_min):i.axis_x_min:e.d3.min(t,function(t){return e.d3.min(t.values,function(t){return t.x})})},l.prototype.getXDomainMax=function(t){var e=this,i=e.config;return k(i.axis_x_max)?e.isTimeSeries()?this.parseDate(i.axis_x_max):i.axis_x_max:e.d3.max(t,function(t){return e.d3.max(t.values,function(t){return t.x})})},l.prototype.getXDomainPadding=function(t){var e,i,n,r,a=this.config,o=t[1]-t[0];return i=this.isCategorized()?0:this.hasType("bar")?1<(e=this.getMaxDataCount())?o/(e-1)/2:.5:.01*o,"object"===s(a.axis_x_padding)&&C(a.axis_x_padding)?(n=P(a.axis_x_padding.left)?a.axis_x_padding.left:i,r=P(a.axis_x_padding.right)?a.axis_x_padding.right:i):n=r="number"==typeof a.axis_x_padding?a.axis_x_padding:i,{left:n,right:r}},l.prototype.getXDomain=function(t){var e=this,i=[e.getXDomainMin(t),e.getXDomainMax(t)],n=i[0],r=i[1],a=e.getXDomainPadding(i),o=0,s=0;return n-r!=0||e.isCategorized()||(r=e.isTimeSeries()?(n=new Date(.5*n.getTime()),new Date(1.5*r.getTime())):(n=0===n?1:.5*n,0===r?-1:1.5*r)),(n||0===n)&&(o=e.isTimeSeries()?new Date(n.getTime()-a.left):n-a.left),(r||0===r)&&(s=e.isTimeSeries()?new Date(r.getTime()+a.right):r+a.right),[o,s]},l.prototype.updateXDomain=function(t,e,i,n,r){var a=this,o=a.config;return i&&(a.x.domain(r||a.d3.extent(a.getXDomain(t))),a.orgXDomain=a.x.domain(),o.zoom_enabled&&a.zoom.update(),a.subX.domain(a.x.domain()),a.brush&&a.brush.updateScale(a.subX)),e&&a.x.domain(r||(!a.brush||a.brush.empty()?a.orgXDomain:a.brush.selectionAsValue())),n&&a.x.domain(a.trimXDomain(a.x.orgDomain())),a.x.domain()},l.prototype.trimXDomain=function(t){var e=this.getZoomDomain(),i=e[0],n=e[1];return t[0]<=i&&(t[1]=+t[1]+(i-t[0]),t[0]=i),n<=t[1]&&(t[0]=+t[0]-(t[1]-n),t[1]=n),t},l.prototype.drag=function(t){var e,i,n,r,h,g,p,f,_=this,a=_.config,o=_.main,x=_.d3;_.hasArcType()||a.data_selection_enabled&&a.data_selection_multiple&&(e=_.dragStart[0],i=_.dragStart[1],n=t[0],r=t[1],h=Math.min(e,n),g=Math.max(e,n),p=a.data_selection_grouped?_.margin.top:Math.min(i,r),f=a.data_selection_grouped?_.height:Math.max(i,r),o.select("."+Y.dragarea).attr("x",h).attr("y",p).attr("width",g-h).attr("height",f-p),o.selectAll("."+Y.shapes).selectAll("."+Y.shape).filter(function(t){return a.data_selection_isselectable(t)}).each(function(t,e){var i,n,r,a,o,s,c=x.select(this),d=c.classed(Y.SELECTED),l=c.classed(Y.INCLUDED),u=!1;if(c.classed(Y.circle))i=1*c.attr("cx"),n=1*c.attr("cy"),o=_.togglePoint,u=h<i&&i<g&&p<n&&n<f;else{if(!c.classed(Y.bar))return;i=(s=y(this)).x,n=s.y,r=s.width,a=s.height,o=_.togglePath,u=!(g<i||i+r<h||f<n||n+a<p)}u^l&&(c.classed(Y.INCLUDED,!l),c.classed(Y.SELECTED,!d),o.call(_,!d,c,t,e))}))},l.prototype.dragstart=function(t){var e=this,i=e.config;e.hasArcType()||i.data_selection_enabled&&(e.dragStart=t,e.main.select("."+Y.chart).append("rect").attr("class",Y.dragarea).style("opacity",.1),e.dragging=!0)},l.prototype.dragend=function(){var t=this,e=t.config;t.hasArcType()||e.data_selection_enabled&&(t.main.select("."+Y.dragarea).transition().duration(100).style("opacity",0).remove(),t.main.selectAll("."+Y.shape).classed(Y.INCLUDED,!1),t.dragging=!1)},l.prototype.getYFormat=function(t){var n=this,r=t&&!n.hasType("gauge")?n.defaultArcValueFormat:n.yFormat,a=t&&!n.hasType("gauge")?n.defaultArcValueFormat:n.y2Format;return function(t,e,i){return("y2"===n.axis.getId(i)?a:r).call(n,t,e)}},l.prototype.yFormat=function(t){var e=this.config;return(e.axis_y_tick_format?e.axis_y_tick_format:this.defaultValueFormat)(t)},l.prototype.y2Format=function(t){var e=this.config;return(e.axis_y2_tick_format?e.axis_y2_tick_format:this.defaultValueFormat)(t)},l.prototype.defaultValueFormat=function(t){return P(t)?+t:""},l.prototype.defaultArcValueFormat=function(t,e){return(100*e).toFixed(1)+"%"},l.prototype.dataLabelFormat=function(t){var e=this.config.data_labels,i=function(t){return P(t)?+t:""};return"function"==typeof e.format?e.format:"object"===s(e.format)?e.format[t]?!0===e.format[t]?i:e.format[t]:function(){return""}:i},l.prototype.initGrid=function(){var t=this,e=t.config,i=t.d3;t.grid=t.main.append("g").attr("clip-path",t.clipPathForGrid).attr("class",Y.grid),e.grid_x_show&&t.grid.append("g").attr("class",Y.xgrids),e.grid_y_show&&t.grid.append("g").attr("class",Y.ygrids),e.grid_focus_show&&t.grid.append("g").attr("class",Y.xgridFocus).append("line").attr("class",Y.xgridFocus),t.xgrid=i.selectAll([]),e.grid_lines_front||t.initGridLines()},l.prototype.initGridLines=function(){var t=this,e=t.d3;t.gridLines=t.main.append("g").attr("clip-path",t.clipPathForGrid).attr("class",Y.grid+" "+Y.gridLines),t.gridLines.append("g").attr("class",Y.xgridLines),t.gridLines.append("g").attr("class",Y.ygridLines),t.xgridLines=e.selectAll([])},l.prototype.updateXGrid=function(t){var e=this,i=e.config,n=e.d3,r=e.generateGridData(i.grid_x_type,e.x),a=e.isCategorized()?e.xAxis.tickOffset():0;e.xgridAttr=i.axis_rotated?{x1:0,x2:e.width,y1:function(t){return e.x(t)-a},y2:function(t){return e.x(t)-a}}:{x1:function(t){return e.x(t)+a},x2:function(t){return e.x(t)+a},y1:0,y2:e.height},e.xgridAttr.opacity=function(){return+n.select(this).attr(i.axis_rotated?"y1":"x1")===(i.axis_rotated?e.height:0)?0:1};var o=e.main.select("."+Y.xgrids).selectAll("."+Y.xgrid).data(r),s=o.enter().append("line").attr("class",Y.xgrid).attr("x1",e.xgridAttr.x1).attr("x2",e.xgridAttr.x2).attr("y1",e.xgridAttr.y1).attr("y2",e.xgridAttr.y2).style("opacity",0);e.xgrid=s.merge(o),t||e.xgrid.attr("x1",e.xgridAttr.x1).attr("x2",e.xgridAttr.x2).attr("y1",e.xgridAttr.y1).attr("y2",e.xgridAttr.y2).style("opacity",e.xgridAttr.opacity),o.exit().remove()},l.prototype.updateYGrid=function(){var t=this,e=t.config,i=t.yAxis.tickValues()||t.y.ticks(e.grid_y_ticks),n=t.main.select("."+Y.ygrids).selectAll("."+Y.ygrid).data(i),r=n.enter().append("line").attr("class",Y.ygrid);t.ygrid=r.merge(n),t.ygrid.attr("x1",e.axis_rotated?t.y:0).attr("x2",e.axis_rotated?t.y:t.width).attr("y1",e.axis_rotated?0:t.y).attr("y2",e.axis_rotated?t.height:t.y),n.exit().remove(),t.smoothLines(t.ygrid,"grid")},l.prototype.gridTextAnchor=function(t){return t.position?t.position:"end"},l.prototype.gridTextDx=function(t){return"start"===t.position?4:"middle"===t.position?0:-4},l.prototype.xGridTextX=function(t){return"start"===t.position?-this.height:"middle"===t.position?-this.height/2:0},l.prototype.yGridTextX=function(t){return"start"===t.position?0:"middle"===t.position?this.width/2:this.width},l.prototype.updateGrid=function(t){var e,i,n,r,a=this,o=a.main,s=a.config,c=a.xv.bind(a),d=a.yv.bind(a),l=a.xGridTextX.bind(a),u=a.yGridTextX.bind(a);a.grid.style("visibility",a.hasArcType()?"hidden":"visible"),o.select("line."+Y.xgridFocus).style("visibility","hidden"),s.grid_x_show&&a.updateXGrid(),(i=(e=o.select("."+Y.xgridLines).selectAll("."+Y.xgridLine).data(s.grid_x_lines)).enter().append("g").attr("class",function(t){return Y.xgridLine+(t.class?" "+t.class:"")})).append("line").attr("x1",s.axis_rotated?0:c).attr("x2",s.axis_rotated?a.width:c).attr("y1",s.axis_rotated?c:0).attr("y2",s.axis_rotated?c:a.height).style("opacity",0),i.append("text").attr("text-anchor",a.gridTextAnchor).attr("transform",s.axis_rotated?"":"rotate(-90)").attr("x",s.axis_rotated?u:l).attr("y",c).attr("dx",a.gridTextDx).attr("dy",-5).style("opacity",0),a.xgridLines=i.merge(e),e.exit().transition().duration(t).style("opacity",0).remove(),s.grid_y_show&&a.updateYGrid(),(r=(n=o.select("."+Y.ygridLines).selectAll("."+Y.ygridLine).data(s.grid_y_lines)).enter().append("g").attr("class",function(t){return Y.ygridLine+(t.class?" "+t.class:"")})).append("line").attr("x1",s.axis_rotated?d:0).attr("x2",s.axis_rotated?d:a.width).attr("y1",s.axis_rotated?0:d).attr("y2",s.axis_rotated?a.height:d).style("opacity",0),r.append("text").attr("text-anchor",a.gridTextAnchor).attr("transform",s.axis_rotated?"rotate(-90)":"").attr("x",s.axis_rotated?l:u).attr("y",d).attr("dx",a.gridTextDx).attr("dy",-5).style("opacity",0),a.ygridLines=r.merge(n),a.ygridLines.select("line").transition().duration(t).attr("x1",s.axis_rotated?d:0).attr("x2",s.axis_rotated?d:a.width).attr("y1",s.axis_rotated?0:d).attr("y2",s.axis_rotated?a.height:d).style("opacity",1),a.ygridLines.select("text").transition().duration(t).attr("x",s.axis_rotated?a.xGridTextX.bind(a):a.yGridTextX.bind(a)).attr("y",d).text(function(t){return t.text}).style("opacity",1),n.exit().transition().duration(t).style("opacity",0).remove()},l.prototype.redrawGrid=function(t,e){var i=this,n=i.config,r=i.xv.bind(i),a=i.xgridLines.select("line"),o=i.xgridLines.select("text");return[(t?a.transition(e):a).attr("x1",n.axis_rotated?0:r).attr("x2",n.axis_rotated?i.width:r).attr("y1",n.axis_rotated?r:0).attr("y2",n.axis_rotated?r:i.height).style("opacity",1),(t?o.transition(e):o).attr("x",n.axis_rotated?i.yGridTextX.bind(i):i.xGridTextX.bind(i)).attr("y",r).text(function(t){return t.text}).style("opacity",1)]},l.prototype.showXGridFocus=function(t){var e=this,i=e.config,n=t.filter(function(t){return t&&P(t.value)}),r=e.main.selectAll("line."+Y.xgridFocus),a=e.xx.bind(e);i.tooltip_show&&(e.hasType("scatter")||e.hasArcType()||(r.style("visibility","visible").data([n[0]]).attr(i.axis_rotated?"y1":"x1",a).attr(i.axis_rotated?"y2":"x2",a),e.smoothLines(r,"grid")))},l.prototype.hideXGridFocus=function(){this.main.select("line."+Y.xgridFocus).style("visibility","hidden")},l.prototype.updateXgridFocus=function(){var t=this.config;this.main.select("line."+Y.xgridFocus).attr("x1",t.axis_rotated?0:-10).attr("x2",t.axis_rotated?this.width:-10).attr("y1",t.axis_rotated?-10:0).attr("y2",t.axis_rotated?-10:this.height)},l.prototype.generateGridData=function(t,e){var i,n,r,a,o=[],s=this.main.select("."+Y.axisX).selectAll(".tick").size();if("year"===t)for(n=(i=this.getXDomain())[0].getFullYear(),r=i[1].getFullYear(),a=n;a<=r;a++)o.push(new Date(a+"-01-01 00:00:00"));else(o=e.ticks(10)).length>s&&(o=o.filter(function(t){return(""+t).indexOf(".")<0}));return o},l.prototype.getGridFilterToRemove=function(t){return t?function(e){var i=!1;return[].concat(t).forEach(function(t){("value"in t&&e.value===t.value||"class"in t&&e.class===t.class)&&(i=!0)}),i}:function(){return!0}},l.prototype.removeGridLines=function(t,e){var i=this.config,n=this.getGridFilterToRemove(t),r=function(t){return!n(t)},a=e?Y.xgridLines:Y.ygridLines,o=e?Y.xgridLine:Y.ygridLine;this.main.select("."+a).selectAll("."+o).filter(n).transition().duration(i.transition_duration).style("opacity",0).remove(),e?i.grid_x_lines=i.grid_x_lines.filter(r):i.grid_y_lines=i.grid_y_lines.filter(r)},l.prototype.initEventRect=function(){var t=this,e=t.config;t.main.select("."+Y.chart).append("g").attr("class",Y.eventRects).style("fill-opacity",0),t.eventRect=t.main.select("."+Y.eventRects).append("rect").attr("class",Y.eventRect),e.zoom_enabled&&t.zoom&&(t.eventRect.call(t.zoom).on("dblclick.zoom",null),e.zoom_initialRange&&t.eventRect.transition().duration(0).call(t.zoom.transform,t.zoomTransform(e.zoom_initialRange)))},l.prototype.redrawEventRect=function(){var t,e,r=this,a=r.d3,o=r.config;function s(){r.svg.select("."+Y.eventRect).style("cursor",null),r.hideXGridFocus(),r.hideTooltip(),r.unexpandCircles(),r.unexpandBars()}t=r.width,e=r.height,r.main.select("."+Y.eventRects).style("cursor",o.zoom_enabled?o.axis_rotated?"ns-resize":"ew-resize":null),r.eventRect.attr("x",0).attr("y",0).attr("width",t).attr("height",e).on("mouseout",o.interaction_enabled?function(){o&&(r.hasArcType()||s())}:null).on("mousemove",o.interaction_enabled?function(){var t,e,i,n;r.dragging||r.hasArcType(t)||(t=r.filterTargetsToShow(r.data.targets),e=a.mouse(this),i=r.findClosestFromTargets(t,e),!r.mouseover||i&&i.id===r.mouseover.id||(o.data_onmouseout.call(r.api,r.mouseover),r.mouseover=void 0),i?(n=(r.isScatterType(i)||!o.tooltip_grouped?[i]:r.filterByX(t,i.x)).map(function(t){return r.addName(t)}),r.showTooltip(n,this),o.point_focus_expand_enabled&&(r.unexpandCircles(),n.forEach(function(t){r.expandCircles(t.index,t.id,!1)})),r.expandBars(i.index,i.id,!0),r.showXGridFocus(n),(r.isBarType(i.id)||r.dist(i,e)<o.point_sensitivity)&&(r.svg.select("."+Y.eventRect).style("cursor","pointer"),r.mouseover||(o.data_onmouseover.call(r.api,i),r.mouseover=i))):s())}:null).on("click",o.interaction_enabled?function(){var t,e,i;r.hasArcType(t)||(t=r.filterTargetsToShow(r.data.targets),e=a.mouse(this),(i=r.findClosestFromTargets(t,e))&&(r.isBarType(i.id)||r.dist(i,e)<o.point_sensitivity)&&(r.isScatterType(i)||!o.data_selection_grouped?[i]:r.filterByX(t,i.x)).forEach(function(t){r.main.selectAll("."+Y.shapes+r.getTargetSelectorSuffix(t.id)).selectAll("."+Y.shape+"-"+t.index).each(function(){(o.data_selection_grouped||r.isWithinShape(this,t))&&(r.toggleShape(this,t,t.index),o.data_onclick.call(r.api,t,this))})}))}:null).call(o.interaction_enabled&&o.data_selection_draggable&&r.drag?a.drag().on("drag",function(){r.drag(a.mouse(this))}).on("start",function(){r.dragstart(a.mouse(this))}).on("end",function(){r.dragend()}):function(){})},l.prototype.getMousePosition=function(t){return[this.x(t.x),this.getYScale(t.id)(t.value)]},l.prototype.dispatchEvent=function(t,e){var i="."+Y.eventRect,n=this.main.select(i).node(),r=n.getBoundingClientRect(),a=r.left+(e?e[0]:0),o=r.top+(e?e[1]:0),s=document.createEvent("MouseEvents");s.initMouseEvent(t,!0,!0,window,0,a,o,a,o,!1,!1,!1,!1,0,null),n.dispatchEvent(s)},l.prototype.initLegend=function(){var t=this;if(t.legendItemTextBox={},t.legendHasRendered=!1,t.legend=t.svg.append("g").attr("transform",t.getTranslate("legend")),!t.config.legend_show)return t.legend.style("visibility","hidden"),void(t.hiddenLegendIds=t.mapToIds(t.data.targets));t.updateLegendWithDefaults()},l.prototype.updateLegendWithDefaults=function(){this.updateLegend(this.mapToIds(this.data.targets),{withTransform:!1,withTransitionForTransform:!1,withTransition:!1})},l.prototype.updateSizeForLegend=function(t,e){var i=this,n=i.config,r={top:i.isLegendTop?i.getCurrentPaddingTop()+n.legend_inset_y+5.5:i.currentHeight-t-i.getCurrentPaddingBottom()-n.legend_inset_y,left:i.isLegendLeft?i.getCurrentPaddingLeft()+n.legend_inset_x+.5:i.currentWidth-e-i.getCurrentPaddingRight()-n.legend_inset_x+.5};i.margin3={top:i.isLegendRight?0:i.isLegendInset?r.top:i.currentHeight-t,right:NaN,bottom:0,left:i.isLegendRight?i.currentWidth-e:i.isLegendInset?r.left:0}},l.prototype.transformLegend=function(t){(t?this.legend.transition():this.legend).attr("transform",this.getTranslate("legend"))},l.prototype.updateLegendStep=function(t){this.legendStep=t},l.prototype.updateLegendItemWidth=function(t){this.legendItemWidth=t},l.prototype.updateLegendItemHeight=function(t){this.legendItemHeight=t},l.prototype.getLegendWidth=function(){var t=this;return t.config.legend_show?t.isLegendRight||t.isLegendInset?t.legendItemWidth*(t.legendStep+1):t.currentWidth:0},l.prototype.getLegendHeight=function(){var t=this,e=0;return t.config.legend_show&&(e=t.isLegendRight?t.currentHeight:Math.max(20,t.legendItemHeight)*(t.legendStep+1)),e},l.prototype.opacityForLegend=function(t){return t.classed(Y.legendItemHidden)?null:1},l.prototype.opacityForUnfocusedLegend=function(t){return t.classed(Y.legendItemHidden)?null:.3},l.prototype.toggleFocusLegend=function(e,t){var i=this;e=i.mapToTargetIds(e),i.legend.selectAll("."+Y.legendItem).filter(function(t){return 0<=e.indexOf(t)}).classed(Y.legendItemFocused,t).transition().duration(100).style("opacity",function(){return(t?i.opacityForLegend:i.opacityForUnfocusedLegend).call(i,i.d3.select(this))})},l.prototype.revertLegend=function(){var t=this,e=t.d3;t.legend.selectAll("."+Y.legendItem).classed(Y.legendItemFocused,!1).transition().duration(100).style("opacity",function(){return t.opacityForLegend(e.select(this))})},l.prototype.showLegend=function(t){var e=this,i=e.config;i.legend_show||(i.legend_show=!0,e.legend.style("visibility","visible"),e.legendHasRendered||e.updateLegendWithDefaults()),e.removeHiddenLegendIds(t),e.legend.selectAll(e.selectorLegends(t)).style("visibility","visible").transition().style("opacity",function(){return e.opacityForLegend(e.d3.select(this))})},l.prototype.hideLegend=function(t){var e=this,i=e.config;i.legend_show&&u(t)&&(i.legend_show=!1,e.legend.style("visibility","hidden")),e.addHiddenLegendIds(t),e.legend.selectAll(e.selectorLegends(t)).style("opacity",0).style("visibility","hidden")},l.prototype.clearLegendItemTextBoxCache=function(){this.legendItemTextBox={}},l.prototype.updateLegend=function(f,t,e){var i,n,r,a,o,s,c,d,l,u,h,g,p,_,x,y,m=this,S=m.config,w=4,v=10,b=0,A=0,T=10,P=S.legend_item_tile_width+5,C=0,L={},V={},G={},E=[0],I={},O=0;function R(t,e,i){var n,r,a,o,s=0===i,c=i===f.length-1,d=(a=t,o=e,m.legendItemTextBox[o]||(m.legendItemTextBox[o]=m.getTextRect(a.textContent,Y.legendItem,a)),m.legendItemTextBox[o]),l=d.width+P+(!c||m.isLegendRight||m.isLegendInset?v:0)+S.legend_padding,u=d.height+w,h=m.isLegendRight||m.isLegendInset?u:l,g=m.isLegendRight||m.isLegendInset?m.getLegendHeight():m.getLegendWidth();function p(t,e){e||(n=(g-C-h)/2)<T&&(n=(g-h)/2,C=0,O++),I[t]=O,E[O]=m.isLegendInset?10:n,L[t]=C,C+=h}s&&(A=b=O=C=0),!S.legend_show||m.isLegendToShow(e)?(V[e]=l,G[e]=u,(!b||b<=l)&&(b=l),(!A||A<=u)&&(A=u),r=m.isLegendRight||m.isLegendInset?A:b,S.legend_equally?(Object.keys(V).forEach(function(t){V[t]=b}),Object.keys(G).forEach(function(t){G[t]=A}),(n=(g-r*f.length)/2)<T?(O=C=0,f.forEach(function(t){p(t)})):p(e,!0)):p(e)):V[e]=G[e]=I[e]=L[e]=0}f=f.filter(function(t){return!k(S.data_names[t])||null!==S.data_names[t]}),h=N(t=t||{},"withTransition",!0),g=N(t,"withTransitionForTransform",!0),m.isLegendInset&&(O=S.legend_inset_step?S.legend_inset_step:f.length,m.updateLegendStep(O)),a=m.isLegendRight?(i=function(t){return b*I[t]},function(t){return E[I[t]]+L[t]}):m.isLegendInset?(i=function(t){return b*I[t]+10},function(t){return E[I[t]]+L[t]}):(i=function(t){return E[I[t]]+L[t]},function(t){return A*I[t]}),n=function(t,e){return i(t,e)+4+S.legend_item_tile_width},o=function(t,e){return a(t,e)+9},r=function(t,e){return i(t,e)},s=function(t,e){return a(t,e)-5},c=function(t,e){return i(t,e)-2},d=function(t,e){return i(t,e)-2+S.legend_item_tile_width},l=function(t,e){return a(t,e)+4},(u=m.legend.selectAll("."+Y.legendItem).data(f).enter().append("g").attr("class",function(t){return m.generateClass(Y.legendItem,t)}).style("visibility",function(t){return m.isLegendToShow(t)?"visible":"hidden"}).style("cursor","pointer").on("click",function(t){S.legend_item_onclick?S.legend_item_onclick.call(m,t):m.d3.event.altKey?(m.api.hide(),m.api.show(t)):(m.api.toggle(t),m.isTargetToShow(t)?m.api.focus(t):m.api.revert())}).on("mouseover",function(t){S.legend_item_onmouseover?S.legend_item_onmouseover.call(m,t):(m.d3.select(this).classed(Y.legendItemFocused,!0),!m.transiting&&m.isTargetToShow(t)&&m.api.focus(t))}).on("mouseout",function(t){S.legend_item_onmouseout?S.legend_item_onmouseout.call(m,t):(m.d3.select(this).classed(Y.legendItemFocused,!1),m.api.revert())})).append("text").text(function(t){return k(S.data_names[t])?S.data_names[t]:t}).each(function(t,e){R(this,t,e)}).style("pointer-events","none").attr("x",m.isLegendRight||m.isLegendInset?n:-200).attr("y",m.isLegendRight||m.isLegendInset?-200:o),u.append("rect").attr("class",Y.legendItemEvent).style("fill-opacity",0).attr("x",m.isLegendRight||m.isLegendInset?r:-200).attr("y",m.isLegendRight||m.isLegendInset?-200:s),u.append("line").attr("class",Y.legendItemTile).style("stroke",m.color).style("pointer-events","none").attr("x1",m.isLegendRight||m.isLegendInset?c:-200).attr("y1",m.isLegendRight||m.isLegendInset?-200:l).attr("x2",m.isLegendRight||m.isLegendInset?d:-200).attr("y2",m.isLegendRight||m.isLegendInset?-200:l).attr("stroke-width",S.legend_item_tile_height),y=m.legend.select("."+Y.legendBackground+" rect"),m.isLegendInset&&0<b&&0===y.size()&&(y=m.legend.insert("g","."+Y.legendItem).attr("class",Y.legendBackground).append("rect")),p=m.legend.selectAll("text").data(f).text(function(t){return k(S.data_names[t])?S.data_names[t]:t}).each(function(t,e){R(this,t,e)}),(h?p.transition():p).attr("x",n).attr("y",o),_=m.legend.selectAll("rect."+Y.legendItemEvent).data(f),(h?_.transition():_).attr("width",function(t){return V[t]}).attr("height",function(t){return G[t]}).attr("x",r).attr("y",s),x=m.legend.selectAll("line."+Y.legendItemTile).data(f),(h?x.transition():x).style("stroke",m.levelColor?function(t){return m.levelColor(m.cache[t].values[0].value)}:m.color).attr("x1",c).attr("y1",l).attr("x2",d).attr("y2",l),y&&(h?y.transition():y).attr("height",m.getLegendHeight()-12).attr("width",b*(O+1)+10),m.legend.selectAll("."+Y.legendItem).classed(Y.legendItemHidden,function(t){return!m.isTargetToShow(t)}),m.updateLegendItemWidth(b),m.updateLegendItemHeight(A),m.updateLegendStep(O),m.updateSizes(),m.updateScales(),m.updateSvgSize(),m.transformAll(g,e),m.legendHasRendered=!0},l.prototype.initRegion=function(){this.region=this.main.append("g").attr("clip-path",this.clipPath).attr("class",Y.regions)},l.prototype.updateRegion=function(t){var e=this,i=e.config;e.region.style("visibility",e.hasArcType()?"hidden":"visible");var n=e.main.select("."+Y.regions).selectAll("."+Y.region).data(i.regions),r=n.enter().append("rect").attr("x",e.regionX.bind(e)).attr("y",e.regionY.bind(e)).attr("width",e.regionWidth.bind(e)).attr("height",e.regionHeight.bind(e)).style("fill-opacity",0);e.mainRegion=r.merge(n).attr("class",e.classRegion.bind(e)),n.exit().transition().duration(t).style("opacity",0).remove()},l.prototype.redrawRegion=function(t,e){var i=this,n=i.mainRegion;return[(t?n.transition(e):n).attr("x",i.regionX.bind(i)).attr("y",i.regionY.bind(i)).attr("width",i.regionWidth.bind(i)).attr("height",i.regionHeight.bind(i)).style("fill-opacity",function(t){return P(t.opacity)?t.opacity:.1})]},l.prototype.regionX=function(t){var e=this,i=e.config,n="y"===t.axis?e.y:e.y2;return"y"===t.axis||"y2"===t.axis?i.axis_rotated&&"start"in t?n(t.start):0:i.axis_rotated?0:"start"in t?e.x(e.isTimeSeries()?e.parseDate(t.start):t.start):0},l.prototype.regionY=function(t){var e=this,i=e.config,n="y"===t.axis?e.y:e.y2;return"y"===t.axis||"y2"===t.axis?i.axis_rotated?0:"end"in t?n(t.end):0:i.axis_rotated&&"start"in t?e.x(e.isTimeSeries()?e.parseDate(t.start):t.start):0},l.prototype.regionWidth=function(t){var e,i=this,n=i.config,r=i.regionX(t),a="y"===t.axis?i.y:i.y2;return(e="y"===t.axis||"y2"===t.axis?n.axis_rotated&&"end"in t?a(t.end):i.width:n.axis_rotated?i.width:"end"in t?i.x(i.isTimeSeries()?i.parseDate(t.end):t.end):i.width)<r?0:e-r},l.prototype.regionHeight=function(t){var e,i=this,n=i.config,r=this.regionY(t),a="y"===t.axis?i.y:i.y2;return(e="y"===t.axis||"y2"===t.axis?n.axis_rotated?i.height:"start"in t?a(t.start):i.height:n.axis_rotated&&"end"in t?i.x(i.isTimeSeries()?i.parseDate(t.end):t.end):i.height)<r?0:e-r},l.prototype.isRegionOnX=function(t){return!t.axis||"x"===t.axis},l.prototype.getScale=function(t,e,i){return(i?this.d3.scaleTime():this.d3.scaleLinear()).range([t,e])},l.prototype.getX=function(t,e,i,n){var r,a=this.getScale(t,e,this.isTimeSeries()),o=i?a.domain(i):a;for(r in a=this.isCategorized()?(n=n||function(){return 0},function(t,e){var i=o(t)+n(t);return e?i:Math.ceil(i)}):function(t,e){var i=o(t);return e?i:Math.ceil(i)},o)a[r]=o[r];return a.orgDomain=function(){return o.domain()},this.isCategorized()&&(a.domain=function(t){return arguments.length?(o.domain(t),a):[(t=this.orgDomain())[0],t[1]+1]}),a},l.prototype.getY=function(t,e,i){var n=this.getScale(t,e,this.isTimeSeriesY());return i&&n.domain(i),n},l.prototype.getYScale=function(t){return"y2"===this.axis.getId(t)?this.y2:this.y},l.prototype.getSubYScale=function(t){return"y2"===this.axis.getId(t)?this.subY2:this.subY},l.prototype.updateScales=function(){var e=this,t=e.config,i=!e.x;e.xMin=t.axis_rotated?1:0,e.xMax=t.axis_rotated?e.height:e.width,e.yMin=t.axis_rotated?0:e.height,e.yMax=t.axis_rotated?e.width:1,e.subXMin=e.xMin,e.subXMax=e.xMax,e.subYMin=t.axis_rotated?0:e.height2,e.subYMax=t.axis_rotated?e.width2:1,e.x=e.getX(e.xMin,e.xMax,i?void 0:e.x.orgDomain(),function(){return e.xAxis.tickOffset()}),e.y=e.getY(e.yMin,e.yMax,i?t.axis_y_default:e.y.domain()),e.y2=e.getY(e.yMin,e.yMax,i?t.axis_y2_default:e.y2.domain()),e.subX=e.getX(e.xMin,e.xMax,e.orgXDomain,function(t){return t%1?0:e.subXAxis.tickOffset()}),e.subY=e.getY(e.subYMin,e.subYMax,i?t.axis_y_default:e.subY.domain()),e.subY2=e.getY(e.subYMin,e.subYMax,i?t.axis_y2_default:e.subY2.domain()),e.xAxisTickFormat=e.axis.getXAxisTickFormat(),e.xAxisTickValues=e.axis.getXAxisTickValues(),e.yAxisTickValues=e.axis.getYAxisTickValues(),e.y2AxisTickValues=e.axis.getY2AxisTickValues(),e.xAxis=e.axis.getXAxis(e.x,e.xOrient,e.xAxisTickFormat,e.xAxisTickValues,t.axis_x_tick_outer),e.subXAxis=e.axis.getXAxis(e.subX,e.subXOrient,e.xAxisTickFormat,e.xAxisTickValues,t.axis_x_tick_outer),e.yAxis=e.axis.getYAxis(e.y,e.yOrient,t.axis_y_tick_format,e.yAxisTickValues,t.axis_y_tick_outer),e.y2Axis=e.axis.getYAxis(e.y2,e.y2Orient,t.axis_y2_tick_format,e.y2AxisTickValues,t.axis_y2_tick_outer),i||e.brush&&e.brush.updateScale(e.subX),e.updateArc&&e.updateArc()},l.prototype.selectPoint=function(t,e,i){var n=this,r=n.config,a=(r.axis_rotated?n.circleY:n.circleX).bind(n),o=(r.axis_rotated?n.circleX:n.circleY).bind(n),s=n.pointSelectR.bind(n);r.data_onselected.call(n.api,e,t.node()),n.main.select("."+Y.selectedCircles+n.getTargetSelectorSuffix(e.id)).selectAll("."+Y.selectedCircle+"-"+i).data([e]).enter().append("circle").attr("class",function(){return n.generateClass(Y.selectedCircle,i)}).attr("cx",a).attr("cy",o).attr("stroke",function(){return n.color(e)}).attr("r",function(t){return 1.4*n.pointSelectR(t)}).transition().duration(100).attr("r",s)},l.prototype.unselectPoint=function(t,e,i){this.config.data_onunselected.call(this.api,e,t.node()),this.main.select("."+Y.selectedCircles+this.getTargetSelectorSuffix(e.id)).selectAll("."+Y.selectedCircle+"-"+i).transition().duration(100).attr("r",0).remove()},l.prototype.togglePoint=function(t,e,i,n){t?this.selectPoint(e,i,n):this.unselectPoint(e,i,n)},l.prototype.selectPath=function(t,e){var i=this;i.config.data_onselected.call(i,e,t.node()),i.config.interaction_brighten&&t.transition().duration(100).style("fill",function(){return i.d3.rgb(i.color(e)).brighter(.75)})},l.prototype.unselectPath=function(t,e){var i=this;i.config.data_onunselected.call(i,e,t.node()),i.config.interaction_brighten&&t.transition().duration(100).style("fill",function(){return i.color(e)})},l.prototype.togglePath=function(t,e,i,n){t?this.selectPath(e,i,n):this.unselectPath(e,i,n)},l.prototype.getToggle=function(t,e){var i;return"circle"===t.nodeName?i=this.isStepType(e)?function(){}:this.togglePoint:"path"===t.nodeName&&(i=this.togglePath),i},l.prototype.toggleShape=function(t,e,i){var n=this,r=n.d3,a=n.config,o=r.select(t),s=o.classed(Y.SELECTED),c=n.getToggle(t,e).bind(n);a.data_selection_enabled&&a.data_selection_isselectable(e)&&(a.data_selection_multiple||n.main.selectAll("."+Y.shapes+(a.data_selection_grouped?n.getTargetSelectorSuffix(e.id):"")).selectAll("."+Y.shape).each(function(t,e){var i=r.select(this);i.classed(Y.SELECTED)&&c(!1,i.classed(Y.SELECTED,!1),t,e)}),o.classed(Y.SELECTED,!s),c(!s,o,e,i))},l.prototype.initBar=function(){this.main.select("."+Y.chart).append("g").attr("class",Y.chartBars)},l.prototype.updateTargetsForBar=function(t){var e=this,i=e.config,n=e.classChartBar.bind(e),r=e.classBars.bind(e),a=e.classFocus.bind(e);e.main.select("."+Y.chartBars).selectAll("."+Y.chartBar).data(t).attr("class",function(t){return n(t)+a(t)}).enter().append("g").attr("class",n).style("pointer-events","none").append("g").attr("class",r).style("cursor",function(t){return i.data_selection_isselectable(t)?"pointer":null})},l.prototype.updateBar=function(t){var e=this,i=e.barData.bind(e),n=e.classBar.bind(e),r=e.initialOpacity.bind(e),a=function(t){return e.color(t.id)},o=e.main.selectAll("."+Y.bars).selectAll("."+Y.bar).data(i),s=o.enter().append("path").attr("class",n).style("stroke",a).style("fill",a);e.mainBar=s.merge(o).style("opacity",r),o.exit().transition().duration(t).style("opacity",0)},l.prototype.redrawBar=function(t,e,i){return[(e?this.mainBar.transition(i):this.mainBar).attr("d",t).style("stroke",this.color).style("fill",this.color).style("opacity",1)]},l.prototype.getBarW=function(t,e){var i=this.config,n="number"==typeof i.bar_width?i.bar_width:e?t.tickInterval()*i.bar_width_ratio/e:0;return i.bar_width_max&&n>i.bar_width_max?i.bar_width_max:n},l.prototype.getBars=function(t,e){return(e?this.main.selectAll("."+Y.bars+this.getTargetSelectorSuffix(e)):this.main).selectAll("."+Y.bar+(P(t)?"-"+t:""))},l.prototype.expandBars=function(t,e,i){i&&this.unexpandBars(),this.getBars(t,e).classed(Y.EXPANDED,!0)},l.prototype.unexpandBars=function(t){this.getBars(t).classed(Y.EXPANDED,!1)},l.prototype.generateDrawBar=function(t,e){var a=this.config,o=this.generateGetBarPoints(t,e);return function(t,e){var i=o(t,e),n=a.axis_rotated?1:0,r=a.axis_rotated?0:1;return"M "+i[0][n]+","+i[0][r]+" L"+i[1][n]+","+i[1][r]+" L"+i[2][n]+","+i[2][r]+" L"+i[3][n]+","+i[3][r]+" z"}},l.prototype.generateGetBarPoints=function(t,e){var o=this,i=e?o.subXAxis:o.xAxis,n=t.__max__+1,s=o.getBarW(i,n),c=o.getShapeX(s,n,t,!!e),d=o.getShapeY(!!e),l=o.getShapeOffset(o.isBarType,t,!!e),u=s*(o.config.bar_space/2),h=e?o.getSubYScale:o.getYScale;return function(t,e){var i=h.call(o,t.id)(0),n=l(t,e)||i,r=c(t),a=d(t);return o.config.axis_rotated&&(0<t.value&&a<i||t.value<0&&i<a)&&(a=i),[[r+u,n],[r+u,a-(i-n)],[r+s-u,a-(i-n)],[r+s-u,n]]}},l.prototype.isWithinBar=function(t,e){var i=e.getBoundingClientRect(),n=e.pathSegList.getItem(0),r=e.pathSegList.getItem(1),a=Math.min(n.x,r.x),o=Math.min(n.y,r.y),s=a+i.width+2,c=o+i.height+2,d=o-2;return a-2<t[0]&&t[0]<s&&d<t[1]&&t[1]<c},l.prototype.getShapeIndices=function(t){var e,i,n=this.config,r={},a=0;return this.filterTargetsToShow(this.data.targets.filter(t,this)).forEach(function(t){for(e=0;e<n.data_groups.length;e++)if(!(n.data_groups[e].indexOf(t.id)<0))for(i=0;i<n.data_groups[e].length;i++)if(n.data_groups[e][i]in r){r[t.id]=r[n.data_groups[e][i]];break}v(r[t.id])&&(r[t.id]=a++)}),r.__max__=a-1,r},l.prototype.getShapeX=function(i,n,r,t){var a=t?this.subX:this.x;return function(t){var e=t.id in r?r[t.id]:0;return t.x||0===t.x?a(t.x)-i*(n/2-e):0}},l.prototype.getShapeY=function(e){var i=this;return function(t){return(e?i.getSubYScale(t.id):i.getYScale(t.id))(t.value)}},l.prototype.getShapeOffset=function(t,s,e){var c=this,d=c.orderTargets(c.filterTargetsToShow(c.data.targets.filter(t,c))),l=d.map(function(t){return t.id});return function(i,n){var r=e?c.getSubYScale(i.id):c.getYScale(i.id),a=r(0),o=a;return d.forEach(function(t){var e=c.isStepType(i)?c.convertValuesToStep(t.values):t.values;t.id!==i.id&&s[t.id]===s[i.id]&&l.indexOf(t.id)<l.indexOf(i.id)&&(void 0!==e[n]&&+e[n].x==+i.x||(n=-1,e.forEach(function(t,e){t.x===i.x&&(n=e)})),n in e&&0<=e[n].value*i.value&&(o+=r(e[n].value)-a))}),o}},l.prototype.isWithinShape=function(t,e){var i,n=this,r=n.d3.select(t);return n.isTargetToShow(e.id)?"circle"===t.nodeName?i=n.isStepType(e)?n.isWithinStep(t,n.getYScale(e.id)(e.value)):n.isWithinCircle(t,1.5*n.pointSelectR(e)):"path"===t.nodeName&&(i=!r.classed(Y.bar)||n.isWithinBar(n.d3.mouse(t),t)):i=!1,i},l.prototype.getInterpolate=function(t){var e=this,i=e.d3,n={linear:i.curveLinear,"linear-closed":i.curveLinearClosed,basis:i.curveBasis,"basis-open":i.curveBasisOpen,"basis-closed":i.curveBasisClosed,bundle:i.curveBundle,cardinal:i.curveCardinal,"cardinal-open":i.curveCardinalOpen,"cardinal-closed":i.curveCardinalClosed,monotone:i.curveMonotoneX,step:i.curveStep,"step-before":i.curveStepBefore,"step-after":i.curveStepAfter};return e.isSplineType(t)?n[e.config.spline_interpolation_type]||n.cardinal:e.isStepType(t)?n[e.config.line_step_type]:n.linear},l.prototype.initLine=function(){this.main.select("."+Y.chart).append("g").attr("class",Y.chartLines)},l.prototype.updateTargetsForLine=function(t){var e,i=this,n=i.config,r=i.classChartLine.bind(i),a=i.classLines.bind(i),o=i.classAreas.bind(i),s=i.classCircles.bind(i),c=i.classFocus.bind(i);(e=i.main.select("."+Y.chartLines).selectAll("."+Y.chartLine).data(t).attr("class",function(t){return r(t)+c(t)}).enter().append("g").attr("class",r).style("opacity",0).style("pointer-events","none")).append("g").attr("class",a),e.append("g").attr("class",o),e.append("g").attr("class",function(t){return i.generateClass(Y.selectedCircles,t.id)}),e.append("g").attr("class",s).style("cursor",function(t){return n.data_selection_isselectable(t)?"pointer":null}),t.forEach(function(e){i.main.selectAll("."+Y.selectedCircles+i.getTargetSelectorSuffix(e.id)).selectAll("."+Y.selectedCircle).each(function(t){t.value=e.values[t.index].value})})},l.prototype.updateLine=function(t){var e=this,i=e.main.selectAll("."+Y.lines).selectAll("."+Y.line).data(e.lineData.bind(e)),n=i.enter().append("path").attr("class",e.classLine.bind(e)).style("stroke",e.color);e.mainLine=n.merge(i).style("opacity",e.initialOpacity.bind(e)).style("shape-rendering",function(t){return e.isStepType(t)?"crispEdges":""}).attr("transform",null),i.exit().transition().duration(t).style("opacity",0)},l.prototype.redrawLine=function(t,e,i){return[(e?this.mainLine.transition(i):this.mainLine).attr("d",t).style("stroke",this.color).style("opacity",1)]},l.prototype.generateDrawLine=function(t,o){var s=this,c=s.config,d=s.d3.line(),i=s.generateGetLinePoints(t,o),l=o?s.getSubYScale:s.getYScale,e=function(t){return(o?s.subxx:s.xx).call(s,t)},n=function(t,e){return 0<c.data_groups.length?i(t,e)[0][1]:l.call(s,t.id)(t.value)};return d=c.axis_rotated?d.x(n).y(e):d.x(e).y(n),c.line_connectNull||(d=d.defined(function(t){return null!=t.value})),function(t){var e=c.line_connectNull?s.filterRemoveNull(t.values):t.values,i=o?s.subX:s.x,n=l.call(s,t.id),r=0,a=0;return(s.isLineType(t)?c.data_regions[t.id]?s.lineWithRegions(e,i,n,c.data_regions[t.id]):(s.isStepType(t)&&(e=s.convertValuesToStep(e)),d.curve(s.getInterpolate(t))(e)):(e[0]&&(r=i(e[0].x),a=n(e[0].value)),c.axis_rotated?"M "+a+" "+r:"M "+r+" "+a))||"M 0 0"}},l.prototype.generateGetLinePoints=function(t,e){var o=this,s=o.config,i=t.__max__+1,c=o.getShapeX(0,i,t,!!e),d=o.getShapeY(!!e),l=o.getShapeOffset(o.isLineType,t,!!e),u=e?o.getSubYScale:o.getYScale;return function(t,e){var i=u.call(o,t.id)(0),n=l(t,e)||i,r=c(t),a=d(t);return s.axis_rotated&&(0<t.value&&a<i||t.value<0&&i<a)&&(a=i),[[r,a-(i-n)],[r,a-(i-n)],[r,a-(i-n)],[r,a-(i-n)]]}},l.prototype.lineWithRegions=function(t,c,d,e){var i,n,r,a,l,o,s,u,h,g,p,f=this,_=f.config,x="M",y=f.isCategorized()?.5:0,m=[];function S(t,e){var i;for(i=0;i<e.length;i++)if(e[i].start<t&&t<=e[i].end)return!0;return!1}if(k(e))for(i=0;i<e.length;i++)m[i]={},v(e[i].start)?m[i].start=t[0].x:m[i].start=f.isTimeSeries()?f.parseDate(e[i].start):e[i].start,v(e[i].end)?m[i].end=t[t.length-1].x:m[i].end=f.isTimeSeries()?f.parseDate(e[i].end):e[i].end;function w(t){return"M"+t[0][0]+" "+t[0][1]+" "+t[1][0]+" "+t[1][1]}for(g=_.axis_rotated?function(t){return d(t.value)}:function(t){return c(t.x)},p=_.axis_rotated?function(t){return c(t.x)}:function(t){return d(t.value)},r=f.isTimeSeries()?function(t,e,i,n){var r=t.x.getTime(),a=e.x-t.x,o=new Date(r+a*i),s=new Date(r+a*(i+n));return w(_.axis_rotated?[[d(l(i)),c(o)],[d(l(i+n)),c(s)]]:[[c(o),d(l(i))],[c(s),d(l(i+n))]])}:function(t,e,i,n){return w(_.axis_rotated?[[d(l(i),!0),c(a(i))],[d(l(i+n),!0),c(a(i+n))]]:[[c(a(i),!0),d(l(i))],[c(a(i+n),!0),d(l(i+n))]])},i=0;i<t.length;i++){if(v(m)||!S(t[i].x,m))x+=" "+g(t[i])+" "+p(t[i]);else for(a=f.getScale(t[i-1].x+y,t[i].x+y,f.isTimeSeries()),l=f.getScale(t[i-1].value,t[i].value),o=c(t[i].x)-c(t[i-1].x),s=d(t[i].value)-d(t[i-1].value),h=2*(u=2/Math.sqrt(Math.pow(o,2)+Math.pow(s,2))),n=u;n<=1;n+=h)x+=r(t[i-1],t[i],n,u);t[i].x}return x},l.prototype.updateArea=function(t){var e=this,i=e.d3,n=e.main.selectAll("."+Y.areas).selectAll("."+Y.area).data(e.lineData.bind(e)),r=n.enter().append("path").attr("class",e.classArea.bind(e)).style("fill",e.color).style("opacity",function(){return e.orgAreaOpacity=+i.select(this).style("opacity"),0});e.mainArea=r.merge(n).style("opacity",e.orgAreaOpacity),n.exit().transition().duration(t).style("opacity",0)},l.prototype.redrawArea=function(t,e,i){return[(e?this.mainArea.transition(i):this.mainArea).attr("d",t).style("fill",this.color).style("opacity",this.orgAreaOpacity)]},l.prototype.generateDrawArea=function(t,e){var r=this,a=r.config,o=r.d3.area(),i=r.generateGetAreaPoints(t,e),n=e?r.getSubYScale:r.getYScale,s=function(t){return(e?r.subxx:r.xx).call(r,t)},c=function(t,e){return 0<a.data_groups.length?i(t,e)[0][1]:n.call(r,t.id)(r.getAreaBaseValue(t.id))},d=function(t,e){return 0<a.data_groups.length?i(t,e)[1][1]:n.call(r,t.id)(t.value)};return o=a.axis_rotated?o.x0(c).x1(d).y(s):o.x(s).y0(a.area_above?0:c).y1(d),a.line_connectNull||(o=o.defined(function(t){return null!==t.value})),function(t){var e=a.line_connectNull?r.filterRemoveNull(t.values):t.values,i=0,n=0;return(r.isAreaType(t)?(r.isStepType(t)&&(e=r.convertValuesToStep(e)),o.curve(r.getInterpolate(t))(e)):(e[0]&&(i=r.x(e[0].x),n=r.getYScale(t.id)(e[0].value)),a.axis_rotated?"M "+n+" "+i:"M "+i+" "+n))||"M 0 0"}},l.prototype.getAreaBaseValue=function(){return 0},l.prototype.generateGetAreaPoints=function(t,e){var o=this,s=o.config,i=t.__max__+1,c=o.getShapeX(0,i,t,!!e),d=o.getShapeY(!!e),l=o.getShapeOffset(o.isAreaType,t,!!e),u=e?o.getSubYScale:o.getYScale;return function(t,e){var i=u.call(o,t.id)(0),n=l(t,e)||i,r=c(t),a=d(t);return s.axis_rotated&&(0<t.value&&a<i||t.value<0&&i<a)&&(a=i),[[r,n],[r,a-(i-n)],[r,a-(i-n)],[r,n]]}},l.prototype.updateCircle=function(t,e){var i=this,n=i.main.selectAll("."+Y.circles).selectAll("."+Y.circle).data(i.lineOrScatterData.bind(i)),r=n.enter().append("circle").attr("class",i.classCircle.bind(i)).attr("cx",t).attr("cy",e).attr("r",i.pointR.bind(i)).style("fill",i.color);i.mainCircle=r.merge(n).style("opacity",i.initialOpacityForCircle.bind(i)),n.exit().style("opacity",0)},l.prototype.redrawCircle=function(t,e,i,n){var r=this,a=r.main.selectAll("."+Y.selectedCircle);return[(i?r.mainCircle.transition(n):r.mainCircle).style("opacity",this.opacityForCircle.bind(r)).style("fill",r.color).attr("cx",t).attr("cy",e),(i?a.transition(n):a).attr("cx",t).attr("cy",e)]},l.prototype.circleX=function(t){return t.x||0===t.x?this.x(t.x):null},l.prototype.updateCircleY=function(){var t,i,e=this;0<e.config.data_groups.length?(t=e.getShapeIndices(e.isLineType),i=e.generateGetLinePoints(t),e.circleY=function(t,e){return i(t,e)[0][1]}):e.circleY=function(t){return e.getYScale(t.id)(t.value)}},l.prototype.getCircles=function(t,e){return(e?this.main.selectAll("."+Y.circles+this.getTargetSelectorSuffix(e)):this.main).selectAll("."+Y.circle+(P(t)?"-"+t:""))},l.prototype.expandCircles=function(t,e,i){var n=this.pointExpandedR.bind(this);i&&this.unexpandCircles(),this.getCircles(t,e).classed(Y.EXPANDED,!0).attr("r",n)},l.prototype.unexpandCircles=function(t){var e=this,i=e.pointR.bind(e);e.getCircles(t).filter(function(){return e.d3.select(this).classed(Y.EXPANDED)}).classed(Y.EXPANDED,!1).attr("r",i)},l.prototype.pointR=function(t){var e=this.config;return this.isStepType(t)?0:h(e.point_r)?e.point_r(t):e.point_r},l.prototype.pointExpandedR=function(t){var e=this.config;return e.point_focus_expand_enabled?h(e.point_focus_expand_r)?e.point_focus_expand_r(t):e.point_focus_expand_r?e.point_focus_expand_r:1.75*this.pointR(t):this.pointR(t)},l.prototype.pointSelectR=function(t){var e=this.config;return h(e.point_select_r)?e.point_select_r(t):e.point_select_r?e.point_select_r:4*this.pointR(t)},l.prototype.isWithinCircle=function(t,e){var i=this.d3,n=i.mouse(t),r=i.select(t),a=+r.attr("cx"),o=+r.attr("cy");return Math.sqrt(Math.pow(a-n[0],2)+Math.pow(o-n[1],2))<e},l.prototype.isWithinStep=function(t,e){return Math.abs(e-this.d3.mouse(t)[1])<30},l.prototype.getCurrentWidth=function(){var t=this.config;return t.size_width?t.size_width:this.getParentWidth()},l.prototype.getCurrentHeight=function(){var t=this.config,e=t.size_height?t.size_height:this.getParentHeight();return 0<e?e:320/(this.hasType("gauge")&&!t.gauge_fullCircle?2:1)},l.prototype.getCurrentPaddingTop=function(){var t=this.config,e=P(t.padding_top)?t.padding_top:0;return this.title&&this.title.node()&&(e+=this.getTitlePadding()),e},l.prototype.getCurrentPaddingBottom=function(){var t=this.config;return P(t.padding_bottom)?t.padding_bottom:0},l.prototype.getCurrentPaddingLeft=function(t){var e=this.config;return P(e.padding_left)?e.padding_left:e.axis_rotated?!e.axis_x_show||e.axis_x_inner?1:Math.max(r(this.getAxisWidthByAxisId("x",t)),40):!e.axis_y_show||e.axis_y_inner?this.axis.getYAxisLabelPosition().isOuter?30:1:r(this.getAxisWidthByAxisId("y",t))},l.prototype.getCurrentPaddingRight=function(){var t=this,e=t.config,i=t.isLegendRight?t.getLegendWidth()+20:0;return P(e.padding_right)?e.padding_right+1:e.axis_rotated?10+i:!e.axis_y2_show||e.axis_y2_inner?2+i+(t.axis.getY2AxisLabelPosition().isOuter?20:0):r(t.getAxisWidthByAxisId("y2"))+i},l.prototype.getParentRectValue=function(e){for(var i,n=this.selectChart.node();n&&"BODY"!==n.tagName;){try{i=n.getBoundingClientRect()[e]}catch(t){"width"===e&&(i=n.offsetWidth)}if(i)break;n=n.parentNode}return i},l.prototype.getParentWidth=function(){return this.getParentRectValue("width")},l.prototype.getParentHeight=function(){var t=this.selectChart.style("height");return 0<t.indexOf("px")?+t.replace("px",""):0},l.prototype.getSvgLeft=function(t){var e=this,i=e.config,n=i.axis_rotated||!i.axis_rotated&&!i.axis_y_inner,r=i.axis_rotated?Y.axisX:Y.axisY,a=e.main.select("."+r).node(),o=a&&n?a.getBoundingClientRect():{right:0},s=e.selectChart.node().getBoundingClientRect(),c=e.hasArcType(),d=o.right-s.left-(c?0:e.getCurrentPaddingLeft(t));return 0<d?d:0},l.prototype.getAxisWidthByAxisId=function(t,e){var i=this.axis.getLabelPositionById(t);return this.axis.getMaxTickWidth(t,e)+(i.isInner?20:40)},l.prototype.getHorizontalAxisHeight=function(t){var e=this,i=e.config,n=30;return"x"!==t||i.axis_x_show?"x"===t&&i.axis_x_height?i.axis_x_height:"y"!==t||i.axis_y_show?"y2"!==t||i.axis_y2_show?("x"===t&&!i.axis_rotated&&i.axis_x_tick_rotate&&(n=30+e.axis.getMaxTickWidth(t)*Math.cos(Math.PI*(90-Math.abs(i.axis_x_tick_rotate))/180)),"y"===t&&i.axis_rotated&&i.axis_y_tick_rotate&&(n=30+e.axis.getMaxTickWidth(t)*Math.cos(Math.PI*(90-Math.abs(i.axis_y_tick_rotate))/180)),n+(e.axis.getLabelPositionById(t).isInner?0:10)+("y2"===t?-10:0)):e.rotated_padding_top:!i.legend_show||e.isLegendRight||e.isLegendInset?1:10:8},l.prototype.initBrush=function(t){var r=this,e=r.d3;return r.brush=(r.config.axis_rotated?e.brushY():e.brushX()).on("brush",function(){var t=e.event.sourceEvent;t&&"zoom"===t.type||r.redrawForBrush()}).on("end",function(){var t=e.event.sourceEvent;t&&"zoom"===t.type||r.brush.empty()&&t&&"end"!==t.type&&r.brush.clear()}),r.brush.updateExtent=function(){var t,e=this.scale.range();return t=r.config.axis_rotated?[[0,e[0]],[r.width2,e[1]]]:[[e[0],0],[e[1],r.height2]],this.extent(t),this},r.brush.updateScale=function(t){return this.scale=t,this},r.brush.update=function(t){this.updateScale(t||r.subX).updateExtent(),r.context.select("."+Y.brush).call(this)},r.brush.clear=function(){r.context.select("."+Y.brush).call(r.brush.move,null)},r.brush.selection=function(){return e.brushSelection(r.context.select("."+Y.brush).node())},r.brush.selectionAsValue=function(t,e){var i,n;return t?(r.context&&(i=[this.scale(t[0]),this.scale(t[1])],n=r.context.select("."+Y.brush),e&&(n=n.transition()),r.brush.move(n,i)),[]):(i=r.brush.selection()||[0,0],[this.scale.invert(i[0]),this.scale.invert(i[1])])},r.brush.empty=function(){var t=r.brush.selection();return!t||t[0]===t[1]},r.brush.updateScale(t)},l.prototype.initSubchart=function(){var t=this,e=t.config,i=t.context=t.svg.append("g").attr("transform",t.getTranslate("context")),n=e.subchart_show?"visible":"hidden";i.style("visibility",n),i.append("g").attr("clip-path",t.clipPathForSubchart).attr("class",Y.chart),i.select("."+Y.chart).append("g").attr("class",Y.chartBars),i.select("."+Y.chart).append("g").attr("class",Y.chartLines),i.append("g").attr("clip-path",t.clipPath).attr("class",Y.brush),t.axes.subx=i.append("g").attr("class",Y.axisX).attr("transform",t.getTranslate("subx")).attr("clip-path",e.axis_rotated?"":t.clipPathForXAxis)},l.prototype.initSubchartBrush=function(){this.initBrush(this.subX).updateExtent(),this.context.select("."+Y.brush).call(this.brush)},l.prototype.updateTargetsForSubchart=function(t){var e,i,n,r,a=this,o=a.context,s=a.config,c=a.classChartBar.bind(a),d=a.classBars.bind(a),l=a.classChartLine.bind(a),u=a.classLines.bind(a),h=a.classAreas.bind(a);s.subchart_show&&((n=(r=o.select("."+Y.chartBars).selectAll("."+Y.chartBar).data(t)).enter().append("g").style("opacity",0)).merge(r).attr("class",c),n.append("g").attr("class",d),(e=(i=o.select("."+Y.chartLines).selectAll("."+Y.chartLine).data(t)).enter().append("g").style("opacity",0)).merge(i).attr("class",l),e.append("g").attr("class",u),e.append("g").attr("class",h),o.selectAll("."+Y.brush+" rect").attr(s.axis_rotated?"width":"height",s.axis_rotated?a.width2:a.height2))},l.prototype.updateBarForSubchart=function(t){var e=this,i=e.context.selectAll("."+Y.bars).selectAll("."+Y.bar).data(e.barData.bind(e)),n=i.enter().append("path").attr("class",e.classBar.bind(e)).style("stroke","none").style("fill",e.color);i.exit().transition().duration(t).style("opacity",0).remove(),e.contextBar=n.merge(i).style("opacity",e.initialOpacity.bind(e))},l.prototype.redrawBarForSubchart=function(t,e,i){(e?this.contextBar.transition(Math.random().toString()).duration(i):this.contextBar).attr("d",t).style("opacity",1)},l.prototype.updateLineForSubchart=function(t){var e=this,i=e.context.selectAll("."+Y.lines).selectAll("."+Y.line).data(e.lineData.bind(e)),n=i.enter().append("path").attr("class",e.classLine.bind(e)).style("stroke",e.color);i.exit().transition().duration(t).style("opacity",0).remove(),e.contextLine=n.merge(i).style("opacity",e.initialOpacity.bind(e))},l.prototype.redrawLineForSubchart=function(t,e,i){(e?this.contextLine.transition(Math.random().toString()).duration(i):this.contextLine).attr("d",t).style("opacity",1)},l.prototype.updateAreaForSubchart=function(t){var e=this,i=e.d3,n=e.context.selectAll("."+Y.areas).selectAll("."+Y.area).data(e.lineData.bind(e)),r=n.enter().append("path").attr("class",e.classArea.bind(e)).style("fill",e.color).style("opacity",function(){return e.orgAreaOpacity=+i.select(this).style("opacity"),0});n.exit().transition().duration(t).style("opacity",0).remove(),e.contextArea=r.merge(n).style("opacity",0)},l.prototype.redrawAreaForSubchart=function(t,e,i){(e?this.contextArea.transition(Math.random().toString()).duration(i):this.contextArea).attr("d",t).style("fill",this.color).style("opacity",this.orgAreaOpacity)},l.prototype.redrawSubchart=function(t,e,i,n,r,a,o){var s,c,d,l=this,u=l.d3,h=l.config;l.context.style("visibility",h.subchart_show?"visible":"hidden"),h.subchart_show&&(u.event&&"zoom"===u.event.type&&l.brush.selectionAsValue(l.x.orgDomain()),t&&(l.brush.empty()||l.brush.selectionAsValue(l.x.orgDomain()),s=l.generateDrawArea(r,!0),c=l.generateDrawBar(a,!0),d=l.generateDrawLine(o,!0),l.updateBarForSubchart(i),l.updateLineForSubchart(i),l.updateAreaForSubchart(i),l.redrawBarForSubchart(c,i,i),l.redrawLineForSubchart(d,i,i),l.redrawAreaForSubchart(s,i,i)))},l.prototype.redrawForBrush=function(){var t,e=this,i=e.x,n=e.d3;e.redraw({withTransition:!1,withY:e.config.zoom_rescale,withSubchart:!1,withUpdateXDomain:!0,withEventRect:!1,withDimension:!1}),t=n.event.selection||e.brush.scale.range(),e.main.select("."+Y.eventRect).call(e.zoom.transform,n.zoomIdentity.scale(e.width/(t[1]-t[0])).translate(-t[0],0)),e.config.subchart_onbrush.call(e.api,i.orgDomain())},l.prototype.transformContext=function(t,e){var i;e&&e.axisSubX?i=e.axisSubX:(i=this.context.select("."+Y.axisX),t&&(i=i.transition())),this.context.attr("transform",this.getTranslate("context")),i.attr("transform",this.getTranslate("subx"))},l.prototype.getDefaultSelection=function(){var t=this,e=t.config,i=h(e.axis_x_selection)?e.axis_x_selection(t.getXDomain(t.data.targets)):e.axis_x_selection;return t.isTimeSeries()&&(i=[t.parseDate(i[0]),t.parseDate(i[1])]),i},l.prototype.initText=function(){this.main.select("."+Y.chart).append("g").attr("class",Y.chartTexts),this.mainText=this.d3.selectAll([])},l.prototype.updateTargetsForText=function(t){var e=this,i=e.classChartText.bind(e),n=e.classTexts.bind(e),r=e.classFocus.bind(e),a=e.main.select("."+Y.chartTexts).selectAll("."+Y.chartText).data(t),o=a.enter().append("g").attr("class",i).style("opacity",0).style("pointer-events","none");o.append("g").attr("class",n),o.merge(a).attr("class",function(t){return i(t)+r(t)})},l.prototype.updateText=function(t,e,i){var n=this,r=n.config,a=n.barOrLineData.bind(n),o=n.classText.bind(n),s=n.main.selectAll("."+Y.texts).selectAll("."+Y.text).data(a),c=s.enter().append("text").attr("class",o).attr("text-anchor",function(t){return r.axis_rotated?t.value<0?"end":"start":"middle"}).style("stroke","none").attr("x",t).attr("y",e).style("fill",function(t){return n.color(t)}).style("fill-opacity",0);n.mainText=c.merge(s).text(function(t,e,i){return n.dataLabelFormat(t.id)(t.value,t.id,e,i)}),s.exit().transition().duration(i).style("fill-opacity",0).remove()},l.prototype.redrawText=function(t,e,i,n,r){return[(n?this.mainText.transition(r):this.mainText).attr("x",t).attr("y",e).style("fill",this.color).style("fill-opacity",i?0:this.opacityForText.bind(this))]},l.prototype.getTextRect=function(t,e,i){var n,r=this.d3.select("body").append("div").classed("c3",!0),a=r.append("svg").style("visibility","hidden").style("position","fixed").style("top",0).style("left",0),o=this.d3.select(i).style("font");return a.selectAll(".dummy").data([t]).enter().append("text").classed(e||"",!0).style("font",o).text(t).each(function(){n=this.getBoundingClientRect()}),r.remove(),n},l.prototype.generateXYForText=function(t,e,i,n){var r=this,a=r.generateGetAreaPoints(t,!1),o=r.generateGetBarPoints(e,!1),s=r.generateGetLinePoints(i,!1),c=n?r.getXForText:r.getYForText;return function(t,e){var i=r.isAreaType(t)?a:r.isBarType(t)?o:s;return c.call(r,i(t,e),t,this)}},l.prototype.getXForText=function(t,e,i){var n,r,a=this,o=i.getBoundingClientRect();return n=a.config.axis_rotated?(r=a.isBarType(e)?4:6,t[2][1]+r*(e.value<0?-1:1)):a.hasType("bar")?(t[2][0]+t[0][0])/2:t[0][0],null===e.value&&(n>a.width?n=a.width-o.width:n<0&&(n=4)),n},l.prototype.getYForText=function(t,e,i){var n,r=this,a=i.getBoundingClientRect();return r.config.axis_rotated?n=(t[0][0]+t[2][0]+.6*a.height)/2:(n=t[2][1],e.value<0||0===e.value&&!r.hasPositiveValue?(n+=a.height,r.isBarType(e)&&r.isSafari()?n-=3:!r.isBarType(e)&&r.isChrome()&&(n+=3)):n+=r.isBarType(e)?-3:-6),null!==e.value||r.config.axis_rotated||(n<a.height?n=a.height:n>this.height&&(n=this.height-4)),n},l.prototype.initTitle=function(){this.title=this.svg.append("text").text(this.config.title_text).attr("class",this.CLASS.title)},l.prototype.redrawTitle=function(){var t=this;t.title.attr("x",t.xForTitle.bind(t)).attr("y",t.yForTitle.bind(t))},l.prototype.xForTitle=function(){var t=this,e=t.config,i=e.title_position||"left";return 0<=i.indexOf("right")?t.currentWidth-t.getTextRect(t.title.node().textContent,t.CLASS.title,t.title.node()).width-e.title_padding.right:0<=i.indexOf("center")?(t.currentWidth-t.getTextRect(t.title.node().textContent,t.CLASS.title,t.title.node()).width)/2:e.title_padding.left},l.prototype.yForTitle=function(){var t=this;return t.config.title_padding.top+t.getTextRect(t.title.node().textContent,t.CLASS.title,t.title.node()).height},l.prototype.getTitlePadding=function(){return this.yForTitle()+this.config.title_padding.bottom},l.prototype.initTooltip=function(){var t,e=this,i=e.config;if(e.tooltip=e.selectChart.style("position","relative").append("div").attr("class",Y.tooltipContainer).style("position","absolute").style("pointer-events","none").style("display","none"),i.tooltip_init_show){if(e.isTimeSeries()&&c(i.tooltip_init_x)){for(i.tooltip_init_x=e.parseDate(i.tooltip_init_x),t=0;t<e.data.targets[0].values.length&&e.data.targets[0].values[t].x-i.tooltip_init_x!=0;t++);i.tooltip_init_x=t}e.tooltip.html(i.tooltip_contents.call(e,e.data.targets.map(function(t){return e.addName(t.values[i.tooltip_init_x])}),e.axis.getXAxisTickFormat(),e.getYFormat(e.hasArcType()),e.color)),e.tooltip.style("top",i.tooltip_init_position.top).style("left",i.tooltip_init_position.left).style("display","block")}},l.prototype.getTooltipSortFunction=function(){var t=this,e=t.config;if(0!==e.data_groups.length&&void 0===e.tooltip_order){var i=t.orderTargets(t.data.targets).map(function(t){return t.id});return(t.isOrderAsc()||t.isOrderDesc())&&(i=i.reverse()),function(t,e){return i.indexOf(t.id)-i.indexOf(e.id)}}var n=e.tooltip_order;void 0===n&&(n=e.data_order);var r=function(t){return t?t.value:null};if(c(n)&&"asc"===n.toLowerCase())return function(t,e){return r(t)-r(e)};if(c(n)&&"desc"===n.toLowerCase())return function(t,e){return r(e)-r(t)};if(h(n)){var a=n;return void 0===e.tooltip_order&&(a=function(t,e){return n(t?{id:t.id,values:[t]}:null,e?{id:e.id,values:[e]}:null)}),a}return o(n)?function(t,e){return n.indexOf(t.id)-n.indexOf(e.id)}:void 0},l.prototype.getTooltipContent=function(t,e,i,n){var r,a,o,s,c,d,l=this,u=l.config,h=u.tooltip_format_title||e,g=u.tooltip_format_name||function(t){return t},p=u.tooltip_format_value||i,f=this.getTooltipSortFunction();for(f&&t.sort(f),a=0;a<t.length;a++)if(t[a]&&(t[a].value||0===t[a].value)&&(r||(o=_(h?h(t[a].x):t[a].x),r="<table class='"+l.CLASS.tooltip+"'>"+(o||0===o?"<tr><th colspan='2'>"+o+"</th></tr>":"")),void 0!==(s=_(p(t[a].value,t[a].ratio,t[a].id,t[a].index,t))))){if(null===t[a].name)continue;c=_(g(t[a].name,t[a].ratio,t[a].id,t[a].index)),d=l.levelColor?l.levelColor(t[a].value):n(t[a].id),r+="<tr class='"+l.CLASS.tooltipName+"-"+l.getTargetSelectorSuffix(t[a].id)+"'>",r+="<td class='name'><span style='background-color:"+d+"'></span>"+c+"</td>",r+="<td class='value'>"+s+"</td>",r+="</tr>"}return r+"</table>"},l.prototype.tooltipPosition=function(t,e,i,n){var r,a,o,s,c,d=this,l=d.config,u=d.d3,h=d.hasArcType(),g=u.mouse(n);return h?(a=(d.width-(d.isLegendRight?d.getLegendWidth():0))/2+g[0],s=(d.hasType("gauge")?d.height:d.height/2)+g[1]+20):(r=d.getSvgLeft(!0),s=l.axis_rotated?(o=(a=r+g[0]+100)+e,c=d.currentWidth-d.getCurrentPaddingRight(),d.x(t[0].x)+20):(o=(a=r+d.getCurrentPaddingLeft(!0)+d.x(t[0].x)+20)+e,c=r+d.currentWidth-d.getCurrentPaddingRight(),g[1]+15),c<o&&(a-=o-c+20),s+i>d.currentHeight&&(s-=i+30)),s<0&&(s=0),{top:s,left:a}},l.prototype.showTooltip=function(t,e){var i,n,r,a=this,o=a.config,s=a.hasArcType(),c=t.filter(function(t){return t&&P(t.value)}),d=o.tooltip_position||l.prototype.tooltipPosition;0!==c.length&&o.tooltip_show&&(a.tooltip.html(o.tooltip_contents.call(a,t,a.axis.getXAxisTickFormat(),a.getYFormat(s),a.color)).style("display","block"),i=a.tooltip.property("offsetWidth"),n=a.tooltip.property("offsetHeight"),r=d.call(this,c,i,n,e),a.tooltip.style("top",r.top+"px").style("left",r.left+"px"))},l.prototype.hideTooltip=function(){this.tooltip.style("display","none")},l.prototype.setTargetType=function(t,e){var i=this,n=i.config;i.mapToTargetIds(t).forEach(function(t){i.withoutFadeIn[t]=e===n.data_types[t],n.data_types[t]=e}),t||(n.data_type=e)},l.prototype.hasType=function(i,t){var n=this.config.data_types,r=!1;return(t=t||this.data.targets)&&t.length?t.forEach(function(t){var e=n[t.id];(e&&0<=e.indexOf(i)||!e&&"line"===i)&&(r=!0)}):Object.keys(n).length?Object.keys(n).forEach(function(t){n[t]===i&&(r=!0)}):r=this.config.data_type===i,r},l.prototype.hasArcType=function(t){return this.hasType("pie",t)||this.hasType("donut",t)||this.hasType("gauge",t)},l.prototype.isLineType=function(t){var e=this.config,i=c(t)?t:t.id;return!e.data_types[i]||0<=["line","spline","area","area-spline","step","area-step"].indexOf(e.data_types[i])},l.prototype.isStepType=function(t){var e=c(t)?t:t.id;return 0<=["step","area-step"].indexOf(this.config.data_types[e])},l.prototype.isSplineType=function(t){var e=c(t)?t:t.id;return 0<=["spline","area-spline"].indexOf(this.config.data_types[e])},l.prototype.isAreaType=function(t){var e=c(t)?t:t.id;return 0<=["area","area-spline","area-step"].indexOf(this.config.data_types[e])},l.prototype.isBarType=function(t){var e=c(t)?t:t.id;return"bar"===this.config.data_types[e]},l.prototype.isScatterType=function(t){var e=c(t)?t:t.id;return"scatter"===this.config.data_types[e]},l.prototype.isPieType=function(t){var e=c(t)?t:t.id;return"pie"===this.config.data_types[e]},l.prototype.isGaugeType=function(t){var e=c(t)?t:t.id;return"gauge"===this.config.data_types[e]},l.prototype.isDonutType=function(t){var e=c(t)?t:t.id;return"donut"===this.config.data_types[e]},l.prototype.isArcType=function(t){return this.isPieType(t)||this.isDonutType(t)||this.isGaugeType(t)},l.prototype.lineData=function(t){return this.isLineType(t)?[t]:[]},l.prototype.arcData=function(t){return this.isArcType(t.data)?[t]:[]},l.prototype.barData=function(t){return this.isBarType(t)?t.values:[]},l.prototype.lineOrScatterData=function(t){return this.isLineType(t)||this.isScatterType(t)?t.values:[]},l.prototype.barOrLineData=function(t){return this.isBarType(t)||this.isLineType(t)?t.values:[]},l.prototype.isSafari=function(){var t=window.navigator.userAgent;return 0<=t.indexOf("Safari")&&t.indexOf("Chrome")<0},l.prototype.isChrome=function(){return 0<=window.navigator.userAgent.indexOf("Chrome")},l.prototype.initZoom=function(){var e,i=this,n=i.d3,r=i.config;return i.zoom=n.zoom().on("start",function(){if("scroll"===r.zoom_type){var t=n.event.sourceEvent;t&&"brush"===t.type||(e=t,r.zoom_onzoomstart.call(i.api,t))}}).on("zoom",function(){if("scroll"===r.zoom_type){var t=n.event.sourceEvent;t&&"brush"===t.type||(i.redrawForZoom(),r.zoom_onzoom.call(i.api,i.x.orgDomain()))}}).on("end",function(){if("scroll"===r.zoom_type){var t=n.event.sourceEvent;t&&"brush"===t.type||t&&e.clientX===t.clientX&&e.clientY===t.clientY||r.zoom_onzoomend.call(i.api,i.x.orgDomain())}}),i.zoom.updateDomain=function(){return n.event&&n.event.transform&&i.x.domain(n.event.transform.rescaleX(i.subX).domain()),this},i.zoom.updateExtent=function(){return this.scaleExtent([1,1/0]).translateExtent([[0,0],[i.width,i.height]]).extent([[0,0],[i.width,i.height]]),this},i.zoom.update=function(){return this.updateExtent().updateDomain()},i.zoom.updateExtent()},l.prototype.zoomTransform=function(t){var e=[this.x(t[0]),this.x(t[1])];return this.d3.zoomIdentity.scale(this.width/(e[1]-e[0])).translate(-e[0],0)},l.prototype.initDragZoom=function(){var e=this,i=e.d3,n=e.config,t=e.context=e.svg,r=e.margin.left+20.5,a=e.margin.top+.5;if("drag"===n.zoom_type&&n.zoom_enabled){var o=function(t){return t&&t.map(function(t){return e.x.invert(t)})},s=e.dragZoomBrush=i.brushX().on("start",function(){e.api.unzoom(),e.svg.select("."+Y.dragZoom).classed("disabled",!1),n.zoom_onzoomstart.call(e.api,i.event.sourceEvent)}).on("brush",function(){n.zoom_onzoom.call(e.api,o(i.event.selection))}).on("end",function(){if(null!=i.event.selection){var t=o(i.event.selection);n.zoom_disableDefaultBehavior||e.api.zoom(t),e.svg.select("."+Y.dragZoom).classed("disabled",!0),n.zoom_onzoomend.call(e.api,t)}});t.append("g").classed(Y.dragZoom,!0).attr("clip-path",e.clipPath).attr("transform","translate("+r+","+a+")").call(s)}},l.prototype.getZoomDomain=function(){var t=this.config,e=this.d3;return[e.min([this.orgXDomain[0],t.zoom_x_min]),e.max([this.orgXDomain[1],t.zoom_x_max])]},l.prototype.redrawForZoom=function(){var t=this,e=t.d3,i=t.config,n=t.zoom,r=t.x;i.zoom_enabled&&0!==t.filterTargetsToShow(t.data.targets).length&&(n.update(),i.zoom_disableDefaultBehavior||(t.isCategorized()&&r.orgDomain()[0]===t.orgXDomain[0]&&r.domain([t.orgXDomain[0]-1e-10,r.orgDomain()[1]]),t.redraw({withTransition:!1,withY:i.zoom_rescale,withSubchart:!1,withEventRect:!1,withDimension:!1}),e.event.sourceEvent&&"mousemove"===e.event.sourceEvent.type&&(t.cancelClick=!0)))},t});
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays :
                this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.22.2';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'YYYY-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

function filterGlobal () {
    $('#advanced_table').DataTable().search(
        $('#global_filter').val()
    ).draw();
}
function filterColumn ( i ) {
    $('#advanced_table').DataTable().column( i ).search(
        $('#col'+i+'_filter').val()
    ).draw();
}
$(document).ready(function() {
    var table = $('#data_table').DataTable({
        responsive: true,
        select: true,
        'aoColumnDefs': [{
            'bSortable': false,
            'aTargets': ['nosort']
        }]
    });
    $('#data_table tbody').on( 'click', 'tr', function() {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $("#advanced_table").DataTable({
        responsive: true,
        select: true,
        'aoColumnDefs': [{
            'bSortable': false,
            'aTargets': ['nosort']
        }]
    });
    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    });
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).attr('data-column') );
    });
});
$(function() {
  'use strict';
  jQuery('#visitfromworld').vectorMap({
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderOpacity: 0,
    borderWidth: 0,
    zoomOnScroll: false,
    color: '#93d5ed',
    regionStyle: {
      initial: {
        fill: '#bce2fb',
        'stroke-width': 1,
        stroke: '#fff'
      }
    },
    markerStyle: {
      initial: {
        r: 5,
        fill: '#93d5ed',
        'fill-opacity': 1,
        stroke: '#93d5ed',
        'stroke-width': 1,
        'stroke-opacity': 1
      }
    },
    enableZoom: true,
    hoverColor: '#79e580',
    markers: [
      {
        latLng: [21.0, 78.0],
        name: 'India : 9347',
        style: { fill: '#2961ff' }
      },
      {
        latLng: [-33.0, 151.0],
        name: 'Australia : 250',
        style: { fill: '#ff821c' }
      },
      {
        latLng: [36.77, -119.41],
        name: 'USA : 250',
        style: { fill: '#40c4ff' }
      },
      {
        latLng: [55.37, -3.41],
        name: 'UK   : 250',
        style: { fill: '#398bf7' }
      },
      {
        latLng: [25.2, 55.27],
        name: 'UAE : 250',
        style: { fill: '#6fc826' }
      }
    ],
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#93d5ed', '#93d5ee'],
    selectedColor: '#c9dfaf',
    selectedRegions: [],
    showTooltip: true,
    onRegionClick: function(element, code, region) {
      var message =
        'You clicked "' +
        region +
        '" which has the code: ' +
        code.toUpperCase();
      alert(message);
    }
  });
  $('#datepickerwidget').datetimepicker({
      inline: true,
      format: 'L'
  });
  var ps = new PerfectScrollbar(".scrollable", {
      wheelSpeed: 10,
      wheelPropagation: true,
      minScrollbarLength: 5
  });
});
(function($) {
  'use strict';
  var c3LineChart = c3.generate({
    bindto: '#c3-line-chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    },
    color: {
      pattern: ['rgba(88,216,163,1)', 'rgba(237,28,36,0.6)', 'rgba(4,189,254,0.6)']
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 30,
      left: 0,
    }
  });

  setTimeout(function() {
    c3LineChart.load({
      columns: [
        ['data1', 230, 190, 300, 500, 300, 400]
      ]
    });
  }, 1000);

  setTimeout(function() {
    c3LineChart.load({
      columns: [
        ['data3', 130, 150, 200, 300, 200, 100]
      ]
    });
  }, 1500);

  setTimeout(function() {
    c3LineChart.unload({
      ids: 'data1'
    });
  }, 2000);

  var c3SplineChart = c3.generate({
    bindto: '#c3-spline-chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 130, 100, 140, 200, 150, 50]
      ],
      type: 'spline'
    },
    color: {
      pattern: ['rgba(88,216,163,1)', 'rgba(237,28,36,0.6)', 'rgba(4,189,254,0.6)']
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 30,
      left: 0,
    }
  });
  var c3BarChart = c3.generate({
    bindto: '#c3-bar-chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 130, 100, 140, 200, 150, 50]
      ],
      type: 'bar'
    },
    color: {
      pattern: ['rgba(88,216,163,1)', 'rgba(4,189,254,0.6)', 'rgba(237,28,36,0.6)']
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 30,
      left: 0,
    },
    bar: {
      width: {
        ratio: 0.7 // this makes bar width 50% of length between ticks
      }
    }
  });

  setTimeout(function() {
    c3BarChart.load({
      columns: [
        ['data3', 130, -150, 200, 300, -200, 100]
      ]
    });
  }, 1000);

  var c3StepChart = c3.generate({
    bindto: '#c3-step-chart',
    data: {
      columns: [
        ['data1', 300, 350, 300, 0, 0, 100],
        ['data2', 130, 100, 140, 200, 150, 50]
      ],
      types: {
        data1: 'step',
        data2: 'area-step'
      }
    },
    color: {
      pattern: ['rgba(88,216,163,1)', 'rgba(4,189,254,0.6)', 'rgba(237,28,36,0.6)']
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 30,
      left: 0,
    }
  });
  var c3PieChart = c3.generate({
    bindto: '#c3-pie-chart',
    data: {
      // iris data from R
      columns: [
        ['data1', 30],
        ['data2', 120],
      ],
      type: 'pie',
      onclick: function(d, i) {
        console.log("onclick", d, i);
      },
      onmouseover: function(d, i) {
        console.log("onmouseover", d, i);
      },
      onmouseout: function(d, i) {
        console.log("onmouseout", d, i);
      }
    },
    color: {
      pattern: ['#6153F9', '#8E97FC', '#A7B3FD']
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 30,
      left: 0,
    }
  });

  setTimeout(function() {
    c3PieChart.load({
      columns: [
        ["Income", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
        ["Outcome", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
        ["Revenue", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
      ]
    });
  }, 1500);

  setTimeout(function() {
    c3PieChart.unload({
      ids: 'data1'
    });
    c3PieChart.unload({
      ids: 'data2'
    });
  }, 2500);
  var c3DonutChart = c3.generate({
    bindto: '#c3-donut-chart',
    data: {
      columns: [
        ['data1', 30],
        ['data2', 120],
      ],
      type: 'donut',
      onclick: function(d, i) {
        console.log("onclick", d, i);
      },
      onmouseover: function(d, i) {
        console.log("onmouseover", d, i);
      },
      onmouseout: function(d, i) {
        console.log("onmouseout", d, i);
      }
    },
    color: {
      pattern: ['rgba(88,216,163,1)', 'rgba(4,189,254,0.6)', 'rgba(237,28,36,0.6)']
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 30,
      left: 0,
    },
    donut: {
      title: "Iris Petal Width"
    }
  });

  setTimeout(function() {
    c3DonutChart.load({
      columns: [
        ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
        ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
        ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
      ]
    });
  }, 1500);

  setTimeout(function() {
    c3DonutChart.unload({
      ids: 'data1'
    });
    c3DonutChart.unload({
      ids: 'data2'
    });
  }, 2500);


})(jQuery);

!function(e,i,t){"use strict";t(i).ready(function(){function a(e,i){e.children(".submenu-content").show().slideUp(200,function(){t(this).css("display",""),t(this).find(".menu-item").removeClass("is-shown"),e.removeClass("open"),i&&i()})}var s=t(".app-sidebar"),n=t(".sidebar-content"),l=t(".wrapper"),o=i.querySelector(".sidebar-content");new PerfectScrollbar(o,{wheelSpeed:10,wheelPropagation:!0,minScrollbarLength:5}),n.on("click",".navigation-main .nav-item a",function(){var e=t(this).parent(".nav-item");if(e.hasClass("has-sub")&&e.hasClass("open"))a(e);else{if(e.hasClass("has-sub")&&function(e,i){var a=e.children(".submenu-content"),s=a.children(".menu-item").addClass("is-hidden");e.addClass("open"),a.hide().slideDown(200,function(){t(this).css("display","")}),setTimeout(function(){s.addClass("is-shown"),s.removeClass("is-hidden")},0)}(e),n.data("collapsible"))return!1;a(e.siblings(".open")),e.siblings(".open").find(".nav-item.open").removeClass("open")}}),t(".nav-toggle").on("click",function(){var e=t(this).find(".toggle-icon");"expanded"===e.attr("data-toggle")?(l.addClass("nav-collapsed"),t(".nav-toggle").find(".toggle-icon").removeClass("ik-toggle-right").addClass("ik-toggle-left"),e.attr("data-toggle","collapsed")):(l.removeClass("nav-collapsed menu-collapsed"),t(".nav-toggle").find(".toggle-icon").removeClass("ik-toggle-left").addClass("ik-toggle-right"),e.attr("data-toggle","expanded"))}),s.on("mouseenter",function(){if(l.hasClass("nav-collapsed")){l.removeClass("menu-collapsed");var e=t(".navigation-main .nav-item.nav-collapsed-open");e.children(".submenu-content").hide().slideDown(300,function(){t(this).css("display","")}),n.find(".nav-item.active").parents(".nav-item").addClass("open"),e.addClass("open").removeClass("nav-collapsed-open")}}).on("mouseleave",function(e){if(l.hasClass("nav-collapsed")){l.addClass("menu-collapsed");var i=t(".navigation-main .nav-item.open"),a=i.children(".submenu-content");i.addClass("nav-collapsed-open"),a.show().slideUp(300,function(){t(this).css("display","")}),i.removeClass("open")}}),t(e).width()<992&&(s.addClass("hide-sidebar"),l.removeClass("nav-collapsed menu-collapsed")),t(e).resize(function(){t(e).width()<992&&(s.addClass("hide-sidebar"),l.removeClass("nav-collapsed menu-collapsed")),t(e).width()>992&&(s.removeClass("hide-sidebar"),"collapsed"===t(".toggle-icon").attr("data-toggle")&&l.not(".nav-collapsed menu-collapsed")&&l.addClass("nav-collapsed menu-collapsed"))}),t(i).on("click",".navigation li:not(.has-sub)",function(){t(e).width()<992&&s.addClass("hide-sidebar")}),t(i).on("click",".logo-text",function(){t(e).width()<992&&s.addClass("hide-sidebar")}),t(".mobile-nav-toggle").on("click",function(e){e.stopPropagation(),s.toggleClass("hide-sidebar")}),t("html").on("click",function(i){t(e).width()<992&&(s.hasClass("hide-sidebar")||0!==s.has(i.target).length||s.addClass("hide-sidebar"))}),t("#sidebarClose").on("click",function(){s.addClass("hide-sidebar")}),t('[data-toggle="tooltip"]').tooltip(),t("#checkbox_select_all").on("click",function(){for(var e=i.getElementsByName("item_checkbox"),a=0;a<e.length;a++)"checkbox"==e[a].type&&(e[a].checked=!0),t(e).parent().parent().addClass("selected")}),t("#checkbox_deselect_all").on("click",function(){for(var e=i.getElementsByName("item_checkbox"),a=0;a<e.length;a++)"checkbox"==e[a].type&&(e[a].checked=!1),t(e).parent().parent().removeClass("selected")}),t("#quick-search").keyup(function(){var e=t(this).val().trim().toLowerCase();t(".app-item").hide().filter(function(){return-1!=t(this).html().trim().toLowerCase().indexOf(e)}).show()}),t(".list-item input:checkbox").change(function(){t(this).is(":checked")?t(this).parent().parent().addClass("selected"):t(this).parent().parent().removeClass("selected")}),t("#navbar-fullscreen").on("click",function(e){"undefined"!=typeof screenfull&&screenfull.enabled&&screenfull.toggle()}),t("#selectall").click(function(){t(this).is(":checked")?t(".select_all_child:checkbox").attr("checked",!0):t(".select_all_child:checkbox").attr("checked",!1)}),t(".list-item-wrap .list-item .list-title a").on("click",function(e){t(".list-item.quick-view-opened").not(this).removeClass("quick-view-opened"),t(this).parents().parent(".list-item").toggleClass("quick-view-opened")}),t(i).on("click",function(e){t(e.target).closest(".list-item").length||t(".list-item").removeClass("quick-view-opened")}),"undefined"!=typeof screenfull&&screenfull.enabled&&t(i).on(screenfull.raw.fullscreenchange,function(){screenfull.isFullscreen?t("#navbar-fullscreen").find("i").toggleClass("ik-minimize ik-maximize"):t("#navbar-fullscreen").find("i").toggleClass("ik-maximize ik-minimize")}),t(".minimize-widget").on("click",function(){var e=t(this),i=t(e.parents(".widget"));t(i).children(".widget-body").slideToggle(),t(this).toggleClass("ik-minus").fadeIn("slow"),t(this).toggleClass("ik-plus").fadeIn("slow")}),t(".remove-widget").on("click",function(){var e=t(this);e.parents(".widget").animate({opacity:"0","-webkit-transform":"scale3d(.3, .3, .3)",transform:"scale3d(.3, .3, .3)"}),setTimeout(function(){e.parents(".widget").remove()},800)}),t(".card-header-right .card-option .action-toggle").on("click",function(){var e=t(this);e.hasClass("ik-chevron-right")?e.parents(".card-option").animate({width:"28px"}):e.parents(".card-option").animate({width:"90px"}),t(this).toggleClass("ik-chevron-right").fadeIn("slow")}),t(".card-header-right .close-card").on("click",function(){var e=t(this);e.parents(".card").animate({opacity:"0","-webkit-transform":"scale3d(.3, .3, .3)",transform:"scale3d(.3, .3, .3)"}),setTimeout(function(){e.parents(".card").remove()},800)}),t(".card-header-right .minimize-card").on("click",function(){var e=t(this),i=t(e.parents(".card"));t(i).children(".card-body").slideToggle(),t(this).toggleClass("ik-minus").fadeIn("slow"),t(this).toggleClass("ik-plus").fadeIn("slow")}),t(".task-list").on("click","li.list",function(){t(this).toggleClass("completed")}),t(".search-btn").on("click",function(){t(".header-search").addClass("open"),t(".header-search .form-control").animate({width:"200px"})}),t(".search-close").on("click",function(){t(".header-search .form-control").animate({width:"0"}),setTimeout(function(){t(".header-search").removeClass("open")},300)});new PerfectScrollbar(".right-sidebar",{wheelSpeed:10,wheelPropagation:!0,minScrollbarLength:5}),new PerfectScrollbar(".messages",{wheelSpeed:10,wheelPropagation:!0,minScrollbarLength:5});$(".right-sidebar-toggle").on("click",function(e){return this.classList.toggle("active"),$(".wrapper").toggleClass("right-sidebar-expand"),!1}),document.addEventListener("click",function(e){var i=document.getElementsByClassName("right-sidebar")[0],t=document.getElementsByClassName("chat-panel")[0];if(!(i.contains(e.target)||t.contains(e.target))){document.body.classList.remove("right-sidebar-expand");for(var a=document.getElementsByClassName("right-sidebar-toggle"),s=0;s<a.length;s++)a[s].classList.remove("active");t.hidden="hidden"}});c=$('[data-plugin="chat-sidebar"]');if(c.length){c.find(".chat-list").each(function(e){var i=$(this);$(this).find(".list-group a").on("click",function(){i.find(".list-group a.active").removeClass("active"),$(this).addClass("active");var e=$(".chat-panel");if(e.length){e.removeAttr("hidden");var t=e.find(".messages");t[0].scrollTop=t[0].scrollHeight,t[0].classList.contains("scrollbar-enabled")&&t.perfectScrollbar("update"),e.find(".user-name").html($(this).data("chat-user"))}})});var c;if((c=$(".chat-panel")).length){c.find(".close").on("click",function(){c.attr("hidden",!0),c.find(".panel-body").removeClass("hide")}),c.find(".minimize").on("click",function(){c.find(".card-block").attr("hidden",!c.find(".card-block").attr("hidden")),"hidden"===c.find(".card-block").attr("hidden")?$(this).find(".material-icons").html("expand_less"):$(this).find(".material-icons").html("expand_more")});var d=$("a.view-grid"),r=$("a.view-thumb"),h=$("a.view-list"),m=($("ul.view-as"),$(".dispaly-option-buttons a"));d.click(function(){$("#layout-wrap .list-item").attr("class","col-xl-3 col-lg-4 col-12 col-sm-6 mb-4 list-item list-item-grid")}),h.click(function(){$("#layout-wrap .list-item").attr("class","col-12 list-item")}),r.click(function(){$("#layout-wrap .list-item").attr("class","col-12 list-item list-item-thumb")}),$(m).on("click",function(){$(m).removeClass("active"),$(this).addClass("active")})}}})}(window,document,jQuery);
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};