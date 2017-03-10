var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var defaultOffset={height:0,width:0};

var resolveTextShadow=function resolveTextShadow(resolvedStyle,style){var _ref=
style.textShadowOffset||defaultOffset,height=_ref.height,width=_ref.width;
var offsetX=(0,_normalizeValue2.default)(null,width);
var offsetY=(0,_normalizeValue2.default)(null,height);
var blurRadius=(0,_normalizeValue2.default)(null,style.textShadowRadius||0);
var color=style.textShadowColor||'currentcolor';

resolvedStyle.textShadow=offsetX+' '+offsetY+' '+blurRadius+' '+color;
};

module.exports=resolveTextShadow;