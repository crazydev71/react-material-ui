var _normalizeCssColor=require('normalize-css-color');var _normalizeCssColor2=_interopRequireDefault(_normalizeCssColor);
var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var defaultOffset={height:0,width:0};

var applyOpacity=function applyOpacity(color){var opacity=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;
var nullableColor=(0,_normalizeCssColor2.default)(color);
var colorInt=nullableColor===null?0x00000000:nullableColor;var _normalizeColor$rgba=
_normalizeCssColor2.default.rgba(colorInt),r=_normalizeColor$rgba.r,g=_normalizeColor$rgba.g,b=_normalizeColor$rgba.b,a=_normalizeColor$rgba.a;
var alpha=a.toFixed(2);
return'rgba('+r+','+g+','+b+','+alpha*opacity+')';
};


var resolveBoxShadow=function resolveBoxShadow(resolvedStyle,style){var _ref=
style.shadowOffset||defaultOffset,height=_ref.height,width=_ref.width;
var offsetX=(0,_normalizeValue2.default)(null,width);
var offsetY=(0,_normalizeValue2.default)(null,height);
var blurRadius=(0,_normalizeValue2.default)(null,style.shadowRadius||0);
var color=applyOpacity(style.shadowColor,style.shadowOpacity);

var boxShadow=offsetX+' '+offsetY+' '+blurRadius+' '+color;
resolvedStyle.boxShadow=style.boxShadow?style.boxShadow+', '+boxShadow:boxShadow;
};

module.exports=resolveBoxShadow;