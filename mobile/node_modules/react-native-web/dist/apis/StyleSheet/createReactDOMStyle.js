var _expandStyle=require('./expandStyle');var _expandStyle2=_interopRequireDefault(_expandStyle);
var _i18nStyle=require('./i18nStyle');var _i18nStyle2=_interopRequireDefault(_i18nStyle);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var createReactDOMStyle=function createReactDOMStyle(flattenedReactNativeStyle){return(
(0,_expandStyle2.default)((0,_i18nStyle2.default)(flattenedReactNativeStyle)));};

module.exports=createReactDOMStyle;