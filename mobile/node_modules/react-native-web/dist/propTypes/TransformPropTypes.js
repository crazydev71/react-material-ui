






var _react=require('react');var

arrayOf=_react.PropTypes.arrayOf,number=_react.PropTypes.number,oneOfType=_react.PropTypes.oneOfType,shape=_react.PropTypes.shape,string=_react.PropTypes.string;
var numberOrString=oneOfType([number,string]);

var TransformPropTypes={
transform:arrayOf(
oneOfType([
shape({perspective:numberOrString}),
shape({rotate:string}),
shape({rotateX:string}),
shape({rotateY:string}),
shape({rotateZ:string}),
shape({scale:number}),
shape({scaleX:number}),
shape({scaleY:number}),
shape({skewX:string}),
shape({skewY:string}),
shape({translateX:numberOrString}),
shape({translateY:numberOrString}),
shape({translateZ:numberOrString}),
shape({translate3d:string})])),


transformOrigin:string};


module.exports=TransformPropTypes;