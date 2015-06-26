var Team = require('./team')

var TeamView = require('./team_view')

window.onload = function(){
  var stage = new PIXI.Stage(0x66FF99);


  // stage.mousedown = function(data){
  //   console.log('mousedown', data);
  //   console.log('mousedown x', data.originalEvent.x);
  //   console.log('mousedown y', data.originalEvent.y);
  // }.bind(this)

  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(800, 800);
  var team = new Team(10);
  // var team2 = new Team(10);
  var texture = PIXI.Texture.fromImage("blob2.png");
  var firstGroup = new TeamView(stage, team, texture);
  // var secondGroup = new TeamView(stage, team2, texture, 500);
  $('body').append(firstGroup.render().el)
  // $('body').append(secondGroup.render().el)

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame( animate );

  function animate() {
      requestAnimationFrame( animate );
      firstGroup.changeFormation();  
      renderer.render(stage);
  }
}

