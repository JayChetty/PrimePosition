var primes = require('./primes')
var _ = require('underscore')
var Events = require('ampersand-events');

var NumberGroup = function(size){
  this.size = size || 1;
  this.groupOptions = this.calcGroupOptions();
  this.currentStructure = _.last(this.groupOptions);
}

_.extend(NumberGroup.prototype, Events, {
  calcGroupOptions: function(){
    var primeFactors = primes.filter(function(prime){
      return this.size%prime == 0;
    }, this)
    var factors = [1].concat(primeFactors)

    var isPrime = primes.indexOf(this.size) > -1;
    if(!isPrime){factors.push(this.size)}

    var groups = factors.map(function(primeFactor){
      return { numGroups:(this.size/primeFactor),sizeGroup:primeFactor }
    }, this)
    console.log('calcgroupsoptions', groups)
    return groups
  },

  setStructureSize: function(structureSize){
    var index = _.findIndex(this.groupOptions, function(option){
      return option.sizeGroup === structureSize;
    })
    if(index < 0){return false;}
    this.currentStructure = this.groupOptions[index];
  }
});

module.exports = NumberGroup;
