var _asap=require('asap');var _asap2=_interopRequireDefault(_asap);
var _CSSPropertyOperations=require('react-dom/lib/CSSPropertyOperations');var _CSSPropertyOperations2=_interopRequireDefault(_CSSPropertyOperations);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var getRect=function getRect(node){
var height=node.offsetHeight;
var width=node.offsetWidth;
var left=0;
var top=0;
while(node&&node.nodeType===1){
left+=node.offsetLeft;
top+=node.offsetTop;
node=node.offsetParent;
}
return{height:height,left:left,top:top,width:width};
};

var _measureLayout=function _measureLayout(node,relativeToNativeNode,callback){
(0,_asap2.default)(function(){
var relativeNode=relativeToNativeNode||node.parentNode;
var relativeRect=getRect(relativeNode);var _getRect=
getRect(node),height=_getRect.height,left=_getRect.left,top=_getRect.top,width=_getRect.width;
var x=left-relativeRect.left;
var y=top-relativeRect.top;
callback(x,y,width,height,left,top);
});
};

var UIManager={
blur:function blur(node){
try{
node.blur();
}catch(err){}
},

focus:function focus(node){
try{
node.focus();
}catch(err){}
},

measure:function measure(node,callback){
_measureLayout(node,null,callback);
},

measureInWindow:function measureInWindow(node,callback){var _getRect2=
getRect(node),height=_getRect2.height,left=_getRect2.left,top=_getRect2.top,width=_getRect2.width;
callback(left,top,width,height);
},

measureLayout:function measureLayout(node,relativeToNativeNode,onFail,onSuccess){
var relativeTo=relativeToNativeNode||node.parentNode;
_measureLayout(node,relativeTo,onSuccess);
},

updateView:function updateView(node,props,component){
for(var prop in props){
if(!Object.prototype.hasOwnProperty.call(props,prop)){
continue;
}

var value=props[prop];
switch(prop){
case'style':{
_CSSPropertyOperations2.default.setValueForStyles(node,value,component._reactInternalInstance);
break;
}
case'class':
case'className':{
node.setAttribute('class',value);
break;
}
case'text':
case'value':

node.value=value;
break;
default:
node.setAttribute(prop,value);}

}
}};


module.exports=UIManager;