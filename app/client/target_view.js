var TargetView = function(options){
  this.myContainer = new PIXI.DisplayObjectContainer();
  this.x = 3;
  this.y = 3;
  this.stage = options.stage;
  this.anchorX = options.anchorX || 200;
  this.anchorY = options.anchorY || 200;
  this.texture = options.texture;
  this.xOffset = 2;
  this.yOffset = 76;

  this.spacing = 20;

  this.sprites = []

  for(var i=0;i<this.x;i++){
    var groupSprites = []
    for(var j=0;j<this.y;j++){      
      var sprite = new PIXI.Sprite(this.texture)
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.interactive = true;
      // sprite.number = i + 1;
      this.myContainer.addChild(sprite);
      sprite.filled = false;

      sprite.position.y = this.anchorY + (this.spacing*i);
      sprite.position.x = this.anchorX + (this.spacing*j);
      groupSprites.push(sprite)
    }
    this.sprites.push(groupSprites);
  }

  this.stage.addChild(this.myContainer);

}

TargetView.prototype = {
  inRange:function(x,y){
    console.log('checking range', x, y)
    return(x > (this.anchorX + this.xOffset) && y > (this.anchorY + this.yOffset))
  },
  attemptFill:function(x,y,numberGroup){
    console.log("they trying to fill me", x, y, numberGroup);
    if(!this.inRange){return false;}
    var position = this.getDroppedPosition(x,y);
    console.log('position', position);
    var fillXLength = numberGroup.sizeGroup;
    var fillYLength = numberGroup.numGroups;
    var fitsX = fillXLength < (this.X - position.xPosition)
    var fitsY = fillYLength < (this.Y - position.YPosition)
    if(!fitsX || !fitsY){return false}
    //place group
    //get those that are covered by group
    //mark as filled and show in change of texture
    for(var i=y; i<( y + fillYLength ); i++){
      for(var j=x;j<( x+ fillXLength ) ;j++){
        var sprite = this.sprites[y][x]
        sprite.filled = true
        // sprite.texture = something
      }
    }
    return true  
  },



  getDroppedPosition:function(x,y){

    var xPosition = Math.floor((x - this.anchorX - this.xOffset) / this.spacing);
    var yPosition = Math.floor((y - this.anchorY- this.yOffset) / this.spacing);
    return {xPosition, yPosition}
  }
}


module.exports = TargetView


