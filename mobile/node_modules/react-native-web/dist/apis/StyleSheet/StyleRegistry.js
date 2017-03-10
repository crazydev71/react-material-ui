var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



var _createReactDOMStyle=require('./createReactDOMStyle');var _createReactDOMStyle2=_interopRequireDefault(_createReactDOMStyle);
var _flattenArray=require('../../modules/flattenArray');var _flattenArray2=_interopRequireDefault(_flattenArray);
var _flattenStyle=require('./flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);
var _I18nManager=require('../I18nManager');var _I18nManager2=_interopRequireDefault(_I18nManager);
var _mapKeyValue=require('../../modules/mapKeyValue');var _mapKeyValue2=_interopRequireDefault(_mapKeyValue);
var _prefixInlineStyles=require('./prefixInlineStyles');var _prefixInlineStyles2=_interopRequireDefault(_prefixInlineStyles);
var _ReactNativePropRegistry=require('../../modules/ReactNativePropRegistry');var _ReactNativePropRegistry2=_interopRequireDefault(_ReactNativePropRegistry);
var _StyleManager=require('./StyleManager');var _StyleManager2=_interopRequireDefault(_StyleManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var createCacheKey=function createCacheKey(id){
var prefix=_I18nManager2.default.isRTL?'rtl':'ltr';
return prefix+'-'+id;
};

var classListToString=function classListToString(list){return list.join(' ').trim();};var

StyleRegistry=function(){
function StyleRegistry(){_classCallCheck(this,StyleRegistry);
this.cache={};
this.styleManager=new _StyleManager2.default();
}_createClass(StyleRegistry,[{key:'getStyleSheetHtml',value:function getStyleSheetHtml()

{
return this.styleManager.getStyleSheetHtml();
}},{key:'register',value:function register(




flatStyle){var _this=this;
var id=_ReactNativePropRegistry2.default.register(flatStyle);
var key=createCacheKey(id);
var style=(0,_createReactDOMStyle2.default)(flatStyle);
var classList=(0,_mapKeyValue2.default)(style,function(prop,value){
if(value!=null){
return _this.styleManager.setDeclaration(prop,value);
}
});
var className=classList.join(' ').trim();
this.cache[key]={classList:classList,className:className};
return id;
}},{key:'resolve',value:function resolve(




reactNativeStyle){
if(!reactNativeStyle){
return undefined;
}


if(typeof reactNativeStyle==='number'){
var _key=createCacheKey(reactNativeStyle);
return this._resolveStyleIfNeeded(_key,reactNativeStyle);
}


if(!Array.isArray(reactNativeStyle)){
return this._resolveStyle(reactNativeStyle);
}




var flatArray=(0,_flattenArray2.default)(reactNativeStyle);
var isArrayOfNumbers=true;
for(var i=0;i<flatArray.length;i++){
if(typeof flatArray[i]!=='number'){
isArrayOfNumbers=false;
break;
}
}
var key=isArrayOfNumbers?createCacheKey(flatArray.join('-')):null;
return this._resolveStyleIfNeeded(key,flatArray);
}},{key:'resolveStateful',value:function resolveStateful(





reactNativeStyle,domClassList){var _this2=this;
var previousReactNativeStyle={};
var preservedClassNames=[];



domClassList.forEach(function(className){var _styleManager$getDecl=
_this2.styleManager.getDeclaration(className),prop=_styleManager$getDecl.prop,value=_styleManager$getDecl.value;
if(prop){
previousReactNativeStyle[prop]=value;
}else{
preservedClassNames.push(className);
}
});var _resolve=


this.resolve([previousReactNativeStyle,reactNativeStyle]),classList=_resolve.classList,_resolve$style=_resolve.style,style=_resolve$style===undefined?{}:_resolve$style;



classList.forEach(function(className){var _styleManager$getDecl2=
_this2.styleManager.getDeclaration(className),prop=_styleManager$getDecl2.prop;
style[prop]=null;
});

classList.push(preservedClassNames);

var className=classListToString(classList);
return{className:className,style:style};
}},{key:'_resolveStyle',value:function _resolveStyle(




reactNativeStyle){var _this3=this;
var domStyle=(0,_createReactDOMStyle2.default)((0,_flattenStyle2.default)(reactNativeStyle));

var props=Object.keys(domStyle).reduce(function(props,styleProp){
var value=domStyle[styleProp];
if(value!=null){
var className=_this3.styleManager.getClassName(styleProp,value);
if(className){
props.classList.push(className);
}else{

props.style[styleProp]=value;
}
}
return props;
},{classList:[],style:{}});

var style=(0,_prefixInlineStyles2.default)(props.style);
props.className=classListToString(props.classList);
props.style=style;
return props;
}},{key:'_resolveStyleIfNeeded',value:function _resolveStyleIfNeeded(




key,style){
if(key){
if(!this.cache[key]){

this.cache[key]=this._resolveStyle(style);
}
return this.cache[key];
}
return this._resolveStyle(style);
}}]);return StyleRegistry;}();


module.exports=StyleRegistry;