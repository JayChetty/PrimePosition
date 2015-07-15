var TargetView = function(options){
  this.myContainer = new PIXI.DisplayObjectContainer();
  this.x = 3;
  this.y = 3;
  this.stage = options.stage;
  this.anchorX = options.anchorX || 200;
  this.anchorY = options.anchorY || 200;
  this.texture = options.texture;
  this.completeTexture = options.completeTexture
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
  attemptFill:function(x,y,structure){
    console.log("they trying to fill me", x, y, structure);
    if(!this.inRange){return false;}
    var position = this.getDroppedPosition(x,y);
    console.log('position', position);
    var fillXLength = structure.sizeGroup;
    var fillYLength = structure.numGroups;
    console.log('fillXLength', fillXLength)
    console.log('fillYLength', fillYLength)
    console.log('this.x', this.x)
    console.log('this.y', this.y)
    var fitsX = fillXLength < (this.x - position.xPosition)
    var fitsY = fillYLength < (this.y - position.yPosition)
    console.log('fitsX', fitsX)
    console.log('fitsY ', fitsY )
    if(!fitsX || !fitsY){return false}
    console.log('trying to set group')
    //place group
    //get those that are covered by group
    //mark as filled and show in change of texture
    for(var i=position.yPosition; i<( position.yPosition + fillYLength ); i++){
      for(var j=position.xPosition;j<( position.xPosition + fillXLength ) ;j++){
        console.log('i j', i, j)
        var sprite = this.sprites[i][j]
        sprite.filled = true
        sprite.setTexture(this.completeTexture)
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


