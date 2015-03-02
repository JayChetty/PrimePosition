var Team = require('./team')

var TeamView = require('./team_view')

window.onload = function(){
  var stage = new PIXI.Stage(0x66FF99);

  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(800, 800);
  var team = new Team(30);
  var texture = PIXI.Texture.fromImage("blob2.png");
  var firstGroup = new TeamView(stage, team, texture);
  $('body').append(firstGroup.render().el)

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame( animate );

  function animate() {
      requestAnimationFrame( animate );
      firstGroup.changeFormation();  
      renderer.render(stage);
  }
}

