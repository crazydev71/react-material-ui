var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _TextStylePropTypes=require('../Text/TextStylePropTypes');var _TextStylePropTypes2=_interopRequireDefault(_TextStylePropTypes);
var _react=require('react');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var

oneOf=_react.PropTypes.oneOf;

var TextInputOnlyStylePropTypes={

resize:oneOf(['none','vertical','horizontal','both'])};


module.exports=_extends({},_TextStylePropTypes2.default,

TextInputOnlyStylePropTypes);