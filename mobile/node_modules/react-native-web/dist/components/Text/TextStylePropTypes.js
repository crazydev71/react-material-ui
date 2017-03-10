var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _ColorPropType=require('../../propTypes/ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);
var _react=require('react');
var _ViewStylePropTypes=require('../View/ViewStylePropTypes');var _ViewStylePropTypes2=_interopRequireDefault(_ViewStylePropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var

number=_react.PropTypes.number,oneOf=_react.PropTypes.oneOf,oneOfType=_react.PropTypes.oneOfType,shape=_react.PropTypes.shape,string=_react.PropTypes.string;
var numberOrString=oneOfType([number,string]);

var ShadowOffsetPropType=shape({width:number,height:number});
var TextAlignPropType=oneOf(['center','inherit','justify','justify-all','left','right']);
var WritingDirectionPropType=oneOf(['auto','ltr','rtl']);

var TextOnlyStylePropTypes={
color:_ColorPropType2.default,
fontFamily:string,
fontFeatureSettings:string,
fontSize:numberOrString,
fontStyle:string,
fontWeight:string,
letterSpacing:numberOrString,
lineHeight:numberOrString,
textAlign:TextAlignPropType,
textAlignVertical:oneOf(['auto','bottom','center','top']),
textDecorationLine:string,
textShadowColor:_ColorPropType2.default,
textShadowOffset:ShadowOffsetPropType,
textShadowRadius:number,
writingDirection:WritingDirectionPropType,

textOverflow:string,
textRendering:oneOf(['auto','geometricPrecision','optimizeLegibility','optimizeSpeed']),
textTransform:oneOf(['capitalize','lowercase','none','uppercase']),
unicodeBidi:oneOf([
'normal',
'bidi-override',
'embed',
'isolate',
'isolate-override',
'plaintext']),

whiteSpace:string,
wordWrap:string,
MozOsxFontSmoothing:string,
WebkitFontSmoothing:string};


module.exports=_extends({},_ViewStylePropTypes2.default,

TextOnlyStylePropTypes);