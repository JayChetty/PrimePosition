var primes = require('./primes')

var Team = function(size){
  this.size = size || 1;
}

Team.prototype = {
  groupOptions: function(){
    
    // var baseGroup =  [ { numGroups:1, sizeGroup:this.size } ] ;
    // if(isPrime){//quick exit if prime
    //   return baseGroup;
    // }

    var primeFactors = primes.filter(function(prime){
      return this.size%prime == 0;
    }, this)

    var factors = [1].concat(primeFactors)

    console.log('primefactors', factors)
    var isPrime = primes.indexOf(this.size) > -1;
    if(!isPrime){factors.push(this.size)}

    var groups = factors.map(function(primeFactor){
      return { numGroups:(this.size/primeFactor),sizeGroup:primeFactor }
    }, this)

    console.log('groups', groups)

    // console.log('basegroup', baseGroup.concat(groups));

    // return baseGroup.concat(groups);
    return groups

  }
}

module.exports = Team;


