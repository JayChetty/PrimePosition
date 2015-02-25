(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function(){
  var stage = new PIXI.Stage(0x66FF99);

  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(400, 300);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame( animate );

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage("bunny.png");
  // create a new Sprite using the texture
  var bunny = new PIXI.Sprite(texture);

  // center the sprites anchor point
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // move the sprite t the center of the screen
  bunny.position.x = 200;
  bunny.position.y = 150;

  stage.addChild(bunny);

  function animate() {

      requestAnimationFrame( animate );

      // just for fun, lets rotate mr rabbit a little
      bunny.rotation += 0.1;

      // render the stage   
      renderer.render(stage);
  }
}


},{}]},{},[1]);
