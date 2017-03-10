Object.defineProperty(exports,"__esModule",{value:true});

var _ExecutionEnvironment=require('fbjs/lib/ExecutionEnvironment');
















var modality=function modality(){
if(!_ExecutionEnvironment.canUseDOM){
return;
}




var proto=window.Element.prototype;
var matcher=proto.matches||
proto.mozMatchesSelector||
proto.msMatchesSelector||
proto.webkitMatchesSelector;
var keyboardModalityWhitelist=[
'input:not([type])',
'input[type=text]',
'input[type=number]',
'input[type=date]',
'input[type=time]',
'input[type=datetime]',
'textarea',
'[role=textbox]',

'[supports-modality=keyboard]'].
join(',');

var focusTriggersKeyboardModality=function focusTriggersKeyboardModality(el){
if(matcher){
return matcher.call(el,keyboardModalityWhitelist)&&matcher.call(el,':not([readonly])');
}else{
return false;
}
};




var id='react-native-modality';
var styleElement=document.getElementById(id);
if(!styleElement){
var style='<style id="'+id+'">:focus { outline: none; }</style>';
document.head.insertAdjacentHTML('afterbegin',style);
styleElement=document.getElementById(id);
}

var disableFocus=function disableFocus(){
if(styleElement){
styleElement.disabled=false;
}
};

var enableFocus=function enableFocus(){
if(styleElement){
styleElement.disabled=true;
}
};




var keyboardTimer=void 0;
var hadKeyboardEvent=false;


document.body.addEventListener(
'keydown',
function(){
hadKeyboardEvent=true;
if(keyboardTimer){
clearTimeout(keyboardTimer);
}
keyboardTimer=setTimeout(
function(){
hadKeyboardEvent=false;
},
100);

},
true);



document.body.addEventListener(
'focus',
function(e){
if(hadKeyboardEvent||focusTriggersKeyboardModality(e.target)){
enableFocus();
}
},
true);



document.body.addEventListener(
'blur',
function(){
if(!hadKeyboardEvent){
disableFocus();
}
},
true);

};exports.default=

modality;