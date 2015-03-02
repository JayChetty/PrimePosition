var Team = require('./team')

var TeamView = require('./team_view')

window.onload = function(){
  var stage = new PIXI.Stage(0x66FF99);

  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(800, 800);
  var team = new Team(15);
  var texture = PIXI.Texture.fromImage("blob2.png");
  var firstGroup = new TeamView(stage, team, texture);
  $('body').append(firstGroup.render().el)

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame( animate );

  // create a texture from an image path
  

  // var structure = team.groupOptions()[0]
  // var groups =[];
  // var spacing = 20;
  
  // create a new Sprite using the texture
  //set in line
  // for(var i=0;i<structure.numGroups;i++){
  //   var group = [];
  //   group.id = i;
  //   groups.push(group)
  //   for(var j=0;j<structure.sizeGroup;j++){
  //     console.log('adding group member', j)
  //     blob =  new PIXI.Sprite(texture)
  //     blob.anchor.x = 0.5;
  //     blob.anchor.y = 0.5;
  //     var moveIndex = (i*structure.sizeGroup) + j;
  //     blob.position.x = 200 + (spacing*moveIndex);
  //     blob.position.y = 150;
  //     group.push(blob);
  //     stage.addChild(blob);
  //   }  
  // }


  // var steps = 0;
  // var numSteps = 60;
  // var groupLength = spacing * structure.sizeGroup;
  function animate() {

      requestAnimationFrame( animate );

      // just for fun, lets rotate mr rabbit a little
      // blob.rotation += 0.1;7

      firstGroup.changeFormation(); 
      //move the parts to change formation

      // if (steps < numSteps){
      //   groups.forEach(function(group){
      //     group.forEach(function(blob){
      //       blob.position.y = blob.position.y + (0.5*group.id);
      //       var xMoveAmount = (groupLength * group.id)/numSteps; 
      //       blob.position.x = blob.position.x - xMoveAmount;
      //     })
      //   });
      //   steps++;
      // }


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

