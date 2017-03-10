var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _BorderPropTypes=require('../../propTypes/BorderPropTypes');var _BorderPropTypes2=_interopRequireDefault(_BorderPropTypes);
var _ColorPropType=require('../../propTypes/ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);
var _ImageResizeMode=require('./ImageResizeMode');var _ImageResizeMode2=_interopRequireDefault(_ImageResizeMode);
var _LayoutPropTypes=require('../../propTypes/LayoutPropTypes');var _LayoutPropTypes2=_interopRequireDefault(_LayoutPropTypes);
var _react=require('react');
var _ShadowPropTypes=require('../../propTypes/ShadowPropTypes');var _ShadowPropTypes2=_interopRequireDefault(_ShadowPropTypes);
var _TransformPropTypes=require('../../propTypes/TransformPropTypes');var _TransformPropTypes2=_interopRequireDefault(_TransformPropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var

number=_react.PropTypes.number,oneOf=_react.PropTypes.oneOf,string=_react.PropTypes.string;
var hiddenOrVisible=oneOf(['hidden','visible']);

module.exports=_extends({},_BorderPropTypes2.default,_LayoutPropTypes2.default,_ShadowPropTypes2.default,_TransformPropTypes2.default,{




backfaceVisibility:hiddenOrVisible,
backgroundColor:_ColorPropType2.default,
opacity:number,
overflow:hiddenOrVisible,
resizeMode:oneOf(Object.keys(_ImageResizeMode2.default)),



overlayColor:string,
tintColor:_ColorPropType2.default,



boxShadow:string,
visibility:hiddenOrVisible});