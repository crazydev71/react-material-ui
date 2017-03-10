var _static=require('inline-style-prefixer/static');var _static2=_interopRequireDefault(_static);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var prefixInlineStyles=function prefixInlineStyles(style){
var prefixedStyles=(0,_static2.default)(style);



Object.keys(prefixedStyles).forEach(function(prop){
var value=prefixedStyles[prop];
if(Array.isArray(value)){
prefixedStyles[prop]=value[value.length-1];
}
});

return prefixedStyles;
};

module.exports=prefixInlineStyles;