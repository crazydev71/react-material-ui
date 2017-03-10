var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _BaseComponentPropTypes=require('../../propTypes/BaseComponentPropTypes');var _BaseComponentPropTypes2=_interopRequireDefault(_BaseComponentPropTypes);
var _EdgeInsetsPropType=require('../../propTypes/EdgeInsetsPropType');var _EdgeInsetsPropType2=_interopRequireDefault(_EdgeInsetsPropType);
var _StyleSheetPropType=require('../../propTypes/StyleSheetPropType');var _StyleSheetPropType2=_interopRequireDefault(_StyleSheetPropType);
var _ViewStylePropTypes=require('./ViewStylePropTypes');var _ViewStylePropTypes2=_interopRequireDefault(_ViewStylePropTypes);
var _react=require('react');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var ViewPropTypes=_extends({},_BaseComponentPropTypes2.default,{

children:_react.PropTypes.any,
collapsable:_react.PropTypes.bool,
hitSlop:_EdgeInsetsPropType2.default,
onClick:_react.PropTypes.func,
onClickCapture:_react.PropTypes.func,
onLayout:_react.PropTypes.func,
onMoveShouldSetResponder:_react.PropTypes.func,
onMoveShouldSetResponderCapture:_react.PropTypes.func,
onResponderGrant:_react.PropTypes.func,
onResponderMove:_react.PropTypes.func,
onResponderReject:_react.PropTypes.func,
onResponderRelease:_react.PropTypes.func,
onResponderTerminate:_react.PropTypes.func,
onResponderTerminationRequest:_react.PropTypes.func,
onStartShouldSetResponder:_react.PropTypes.func,
onStartShouldSetResponderCapture:_react.PropTypes.func,
onTouchCancel:_react.PropTypes.func,
onTouchCancelCapture:_react.PropTypes.func,
onTouchEnd:_react.PropTypes.func,
onTouchEndCapture:_react.PropTypes.func,
onTouchMove:_react.PropTypes.func,
onTouchMoveCapture:_react.PropTypes.func,
onTouchStart:_react.PropTypes.func,
onTouchStartCapture:_react.PropTypes.func,
pointerEvents:_react.PropTypes.oneOf(['auto','box-none','box-only','none']),
style:(0,_StyleSheetPropType2.default)(_ViewStylePropTypes2.default)});


module.exports=ViewPropTypes;