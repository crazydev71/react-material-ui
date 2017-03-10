var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();require('../../modules/injectResponderEventPlugin');

var _applyLayout=require('../../modules/applyLayout');var _applyLayout2=_interopRequireDefault(_applyLayout);
var _applyNativeMethods=require('../../modules/applyNativeMethods');var _applyNativeMethods2=_interopRequireDefault(_applyNativeMethods);
var _createDOMElement=require('../../modules/createDOMElement');var _createDOMElement2=_interopRequireDefault(_createDOMElement);
var _normalizeNativeEvent=require('../../modules/normalizeNativeEvent');var _normalizeNativeEvent2=_interopRequireDefault(_normalizeNativeEvent);
var _StyleSheet=require('../../apis/StyleSheet');var _StyleSheet2=_interopRequireDefault(_StyleSheet);
var _ViewPropTypes=require('./ViewPropTypes');var _ViewPropTypes2=_interopRequireDefault(_ViewPropTypes);
var _react=require('react');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var eventHandlerNames=[
'onClick',
'onClickCapture',
'onMoveShouldSetResponder',
'onMoveShouldSetResponderCapture',
'onResponderGrant',
'onResponderMove',
'onResponderReject',
'onResponderRelease',
'onResponderTerminate',
'onResponderTerminationRequest',
'onStartShouldSetResponder',
'onStartShouldSetResponderCapture',
'onTouchCancel',
'onTouchCancelCapture',
'onTouchEnd',
'onTouchEndCapture',
'onTouchMove',
'onTouchMoveCapture',
'onTouchStart',
'onTouchStartCapture'];


var _normalizeEventForHandler=function _normalizeEventForHandler(handler){return function(e){
e.nativeEvent=(0,_normalizeNativeEvent2.default)(e.nativeEvent);
return handler(e);
};};

var normalizeEventHandlers=function normalizeEventHandlers(props){
eventHandlerNames.forEach(function(handlerName){
var handler=props[handlerName];
if(typeof handler==='function'){
props[handlerName]=_normalizeEventForHandler(handler);
}
});
};var

View=function(_Component){_inherits(View,_Component);function View(){_classCallCheck(this,View);return _possibleConstructorReturn(this,(View.__proto__||Object.getPrototypeOf(View)).apply(this,arguments));}_createClass(View,[{key:'getChildContext',value:function getChildContext()
















{
return{
isInAButtonView:this.props.accessibilityRole==='button'};

}},{key:'render',value:function render()

{var _props=














this.props,pointerEvents=_props.pointerEvents,style=_props.style,accessibilityComponentType=_props.accessibilityComponentType,accessibilityTraits=_props.accessibilityTraits,collapsable=_props.collapsable,hitSlop=_props.hitSlop,onAccessibilityTap=_props.onAccessibilityTap,onLayout=_props.onLayout,onMagicTap=_props.onMagicTap,removeClippedSubviews=_props.removeClippedSubviews,otherProps=_objectWithoutProperties(_props,['pointerEvents','style','accessibilityComponentType','accessibilityTraits','collapsable','hitSlop','onAccessibilityTap','onLayout','onMagicTap','removeClippedSubviews']);

var component=this.context.isInAButtonView?'span':'div';


normalizeEventHandlers(otherProps);

otherProps.style=[styles.initial,style,pointerEvents&&pointerEventStyles[pointerEvents]];

return(0,_createDOMElement2.default)(component,otherProps);
}}]);return View;}(_react.Component);View.displayName='View';View.defaultProps={accessible:true};View.childContextTypes={isInAButtonView:_react.PropTypes.bool};View.contextTypes={isInAButtonView:_react.PropTypes.bool};process.env.NODE_ENV!=="production"?View.propTypes=_ViewPropTypes2.default:void 0;


var styles=_StyleSheet2.default.create({

initial:{
alignItems:'stretch',
borderWidth:0,
borderStyle:'solid',
boxSizing:'border-box',
display:'flex',
flexBasis:'auto',
flexDirection:'column',
margin:0,
padding:0,
position:'relative',

backgroundColor:'transparent',
color:'inherit',
font:'inherit',
textAlign:'inherit',
textDecorationLine:'none',

listStyle:'none',

minHeight:0,
minWidth:0}});



var pointerEventStyles=_StyleSheet2.default.create({
auto:{
pointerEvents:'auto'},

'box-none':{
pointerEvents:'box-none'},

'box-only':{
pointerEvents:'box-only'},

none:{
pointerEvents:'none'}});



module.exports=(0,_applyLayout2.default)((0,_applyNativeMethods2.default)(View));