(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/jay/Programming/JSProjects/PrimePosition/app/client/main.js":[function(require,module,exports){
var Team = require('./team')


window.onload = function(){
  var stage = new PIXI.Stage(0x66FF99);

  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(800, 800);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame( animate );

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage("blob2.png");
  var team = new Team(18);
  var structure = team.groupOptions()[0]
  var groups =[];
  var spacing = 20;
  
  // create a new Sprite using the texture
  //set in line
  for(var i=0;i<structure.numGroups;i++){
    var group = [];
    group.id = i;
    groups.push(group)
    for(var j=0;j<structure.sizeGroup;j++){
      console.log('adding group member', j)
      blob =  new PIXI.Sprite(texture)
      blob.anchor.x = 0.5;
      blob.anchor.y = 0.5;
      var moveIndex = (i*structure.sizeGroup) + j;
      blob.position.x = 200 + (spacing*moveIndex);
      blob.position.y = 150;
      group.push(blob);
      stage.addChild(blob);
    }  
  }


  stage.addChild(blob);

  var steps = 0;
  var numSteps = 60;
  var groupLength = spacing * structure.sizeGroup;
  function animate() {

      requestAnimationFrame( animate );

      // just for fun, lets rotate mr rabbit a little
      // blob.rotation += 0.1;7
      if (steps < numSteps){
        groups.forEach(function(group){
          group.forEach(function(blob){
            blob.position.y = blob.position.y + (0.5*group.id);
            var xMoveAmount = (groupLength * group.id)/numSteps; 
            blob.position.x = blob.position.x - xMoveAmount;
          })
        });
        steps++;
      }
      // if (steps < 40){
      //   for(var i=0;i<structure.numGroups;i++){
      //     console.log('moving group', i);
      //     for(var j=0;j<structure.sizeGroup;j++){
      //       blob = groups[i][j]
      //       // blob.position.x = blob.position.x + 1;
      //       blob.position.y = blob.position.y + 2*;
      //     }  
      //   }
      // }

      // render the stage   
      renderer.render(stage);
  }
}


},{"./team":"/home/jay/Programming/JSProjects/PrimePosition/app/client/team.js"}],"/home/jay/Programming/JSProjects/PrimePosition/app/client/primes.js":[function(require,module,exports){
var primes = [2,3 ,5 ,7 ,11 ,13 ,17 ,19 ,23 ,29 ,31 ,37 ,41 ,43 ,47 ,53 ,59 ,61 ,67 ,71 ,73 ,79 ,83 ,89 ,97,101,103,107,109,113 ,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199]

module.exports = primes
},{}],"/home/jay/Programming/JSProjects/PrimePosition/app/client/team.js":[function(require,module,exports){
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



},{"./primes":"/home/jay/Programming/JSProjects/PrimePosition/app/client/primes.js"}]},{},["/home/jay/Programming/JSProjects/PrimePosition/app/client/main.js"]);
