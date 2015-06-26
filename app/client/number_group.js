var _ = require('underscore')
var Events = require('ampersand-events');

var NumberGroup = function(size){
  this.size = size || 1;
  this.groupOptions = this.calcGroupOptions();
  this.currentStructure = _.last(this.groupOptions);
}

_.extend(NumberGroup.prototype, Events, {
  calcGroupOptions: function(){
    var numbers = [];
    for (var i = 1; i <= 100; i++) {
       numbers.push(i);
    }
    var factors = numbers.filter(function(number){
      return this.size%number == 0;
    }, this)

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
    this.trigger('change');
  }
});

module.exports = NumberGroup;
