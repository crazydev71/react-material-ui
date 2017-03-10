var _react=require('react');var
array=_react.PropTypes.array,bool=_react.PropTypes.bool,number=_react.PropTypes.number,object=_react.PropTypes.object,oneOf=_react.PropTypes.oneOf,oneOfType=_react.PropTypes.oneOfType,string=_react.PropTypes.string;

var BaseComponentPropTypes={
accessibilityLabel:string,
accessibilityLiveRegion:oneOf(['assertive','off','polite']),
accessibilityRole:string,
accessible:bool,
style:oneOfType([array,number,object]),
testID:string};


module.exports=BaseComponentPropTypes;