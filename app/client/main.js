var Team = require('./team')
var TeamView = require('./team_view')

var NumberGroup = require('./number_group')
var NumberGroupView = require('./number_group_view')

var TargetGroupView = require('./target_view')

window.onload = function(){
  var stage = new PIXI.Stage(0x66FF99);


  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(800, 800);
  var numberGroup = new NumberGroup(2);
  // var team2 = new Team(10);
  var texture = PIXI.Texture.fromImage("blob2.png");
  var emptyTexture = PIXI.Texture.fromImage("empty_blob.png");
  var targetView = new TargetGroupView({ stage:stage, texture:emptyTexture , completeTexture: texture});
  var numberGroupView = new NumberGroupView({ model:numberGroup, texture:texture, stage:stage, targetView:targetView});
  


  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame( animate );

  function animate() {
      requestAnimationFrame( animate );
      numberGroupView.changeFormation();
      // firstGroup.checkStructureAndReposition()
      renderer.render(stage);
  }
}

