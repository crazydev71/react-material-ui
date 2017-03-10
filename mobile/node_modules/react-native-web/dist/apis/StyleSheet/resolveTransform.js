var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}



var mapTransform=function mapTransform(transform){
var type=Object.keys(transform)[0];
var value=(0,_normalizeValue2.default)(type,transform[type]);
return type+'('+value+')';
};


var convertTransformMatrix=function convertTransformMatrix(transformMatrix){
var matrix=transformMatrix.join(',');
return'matrix3d('+matrix+')';
};

var resolveTransform=function resolveTransform(resolvedStyle,style){
if(Array.isArray(style.transform)){
var transform=style.transform.map(mapTransform).join(' ');
resolvedStyle.transform=transform;
}else if(style.transformMatrix){
var _transform=convertTransformMatrix(style.transformMatrix);
resolvedStyle.transform=_transform;
}
};

module.exports=resolveTransform;