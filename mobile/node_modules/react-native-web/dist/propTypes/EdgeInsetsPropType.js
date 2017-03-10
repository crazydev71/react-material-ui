











'use strict';

var PropTypes=require('react').PropTypes;

var EdgeInsetsPropType=require('./createStrictShapeTypeChecker')({
top:PropTypes.number,
left:PropTypes.number,
bottom:PropTypes.number,
right:PropTypes.number});


module.exports=EdgeInsetsPropType;