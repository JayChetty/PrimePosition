var primes = require('./primes')

var Team = function(size){
  this.size = size || 1;
}

Team.prototype = {
  groupOptions: function(){
    var primeIndex  = primes.indexOf(this.size)
    var isPrime = primeIndex > -1;
    if(isPrime){//quick exit if prime
      return [ { numGroups:1, sizeGroup:this.size } ];
    }

    var primeFactors = primes.filter(function(prime){
      return this.size%prime == 0;
    }, this)

    return primeFactors.map(function(primeFactor){
      return {numGroups:(this.size/primeFactor),sizeGroup:primeFactor}
    }, this)

  }
}

module.exports = Team;


