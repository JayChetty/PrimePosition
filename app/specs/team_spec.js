var assert = require("assert");
var expect = require("chai").expect;
var Team = require("../client/team")

it('should have a size', function(){
  var team = new Team(3);
  expect(team.size).to.equal(3);
})

it('size should default to 1', function(){
  var team = new Team();
  expect(team.size).to.equal(1);
})

it('should give out simple prime group for prime', function(){
  var team = new Team(3);
  expect(team.groupOptions()).to.deep.equal([{numGroups:1,sizeGroup:3}]);
})

it('should give prime group breakdown for composite', function(){
  var team = new Team(4);
  expect(team.groupOptions()).to.deep.equal([{numGroups:2,sizeGroup:2}]);
})

it('should give multiple for those with options', function(){
  var team = new Team(10);
  expect(team.groupOptions()).to.deep.equal([{numGroups:5,sizeGroup:2},{numGroups:2,sizeGroup:5}]);
})