











'use strict';

var PropTypes=require('react').PropTypes;

var PointPropType=require('./createStrictShapeTypeChecker')({
x:PropTypes.number,
y:PropTypes.number});


module.exports=PointPropType;