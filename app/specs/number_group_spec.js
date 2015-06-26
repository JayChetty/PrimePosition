var assert = require("assert");
var expect = require("chai").expect;
var NumberGroup = require("../client/number_group")

it('should have a size', function(){
  var ng = new NumberGroup(3);
  expect(ng.size).to.equal(3);
})

it('size should default to 1', function(){
  var ng = new NumberGroup();
  expect(ng.size).to.equal(1);
})

it('should give out simple prime group for prime', function(){
  var ng = new NumberGroup(3);
  console.log('ng', ng)
  expect(ng.groupOptions).to.deep.equal( [ {numGroups:3,sizeGroup:1}, {numGroups:1,sizeGroup:3} ] ) 
})

it('should give prime group breakdown for composite', function(){
  var ng = new NumberGroup(4);
  expect(ng.groupOptions).to.deep.equal([{numGroups:4,sizeGroup:1},{numGroups:2,sizeGroup:2}, {numGroups:1,sizeGroup:4}]);
})

it('should give multiple for those with options', function(){
  var ng = new NumberGroup(10);
  expect(ng.groupOptions).to.deep.equal([{numGroups:10,sizeGroup:1},{numGroups:5,sizeGroup:2},{numGroups:2,sizeGroup:5}, {numGroups:1,sizeGroup:10}]);
})