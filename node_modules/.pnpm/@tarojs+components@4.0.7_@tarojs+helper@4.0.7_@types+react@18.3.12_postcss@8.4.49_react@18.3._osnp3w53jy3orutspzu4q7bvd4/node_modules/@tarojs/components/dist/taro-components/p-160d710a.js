var r,n,t=(r=function(r){
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
!function(){var n={}.hasOwnProperty;function t(){for(var r="",n=0;n<arguments.length;n++){var t=arguments[n];t&&(r=o(r,e(t)))}return r}function e(r){if("string"==typeof r||"number"==typeof r)return r;if("object"!=typeof r)return"";if(Array.isArray(r))return t.apply(null,r);if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]"))return r.toString();var e="";for(var u in r)n.call(r,u)&&r[u]&&(e=o(e,u));return e}function o(r,n){return n?r?r+" "+n:r+n:r}r.exports?(t.default=t,r.exports=t):window.classNames=t}()},r(n={path:undefined,exports:{},require:function(){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}}),n.exports);export{t as c}