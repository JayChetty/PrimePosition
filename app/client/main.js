window.onload = function(){
  var stage = new PIXI.Stage(0x66FF99);

  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(400, 300);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame( animate );

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage("blob2.png");
  var num = 6
  var blobs =[]
  // create a new Sprite using the texture

  for(var i=0;i<num;i++){
    blob =  new PIXI.Sprite(texture)
    blob.anchor.x = 0.5;
    blob.anchor.y = 0.5;
    var move = 20*i
    blob.position.x = 200 + (20*i);
    blob.position.y = 150;
    blobs.push(blob);
    stage.addChild(blob);
  }

  stage.addChild(blob);

  function animate() {

      requestAnimationFrame( animate );

      // just for fun, lets rotate mr rabbit a little
      // blob.rotation += 0.1;

      // render the stage   
      renderer.render(stage);
  }
}

