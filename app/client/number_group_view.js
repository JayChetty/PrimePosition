var NumberGroupView = function(options){
  var options = options || {};
  this.model = options.model;
  this.texture = options.texture;
  this.stage = options.stage;
  this.startY = options.startY || 10;

  this.sprites = [];
  this.sprite_groups = [];
  this.spacing = 20;

  //add sprites
  for(var i=0;i<this.model.size;i++){
    var sprite = new PIXI.Sprite(this.texture)
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.interactive = true;
    sprite.number = i + 1;
    this.sprites.push(sprite)
    console.log('adding sprite to stage', this.stage, sprite)
    this.stage.addChild(sprite);
  }
  //set listener to sprites
  // sprites.forEach(function(sprite){
  //   sprite.mousedown = function(data){
  //     this.setStructure(sprite.number)
  //   }.bind(this)
  // }.bind(this))
  
  this.groupSprites();//set inital grouping
  this.basePosition();//go to base position

}

NumberGroupView.prototype = {
  setStructure: function(structureSize){
    this.model.setStructureSize(structureSize);
  },

  groupSprites:function(){
    var sprite_number = 0
    this.sprite_groups = []
    for(var i=0;i<this.model.currentStructure.numGroups;i++){
      var group = [];
      group.id = i;
      this.sprite_groups.push(group);
      for(var j=0;j<this.model.currentStructure.sizeGroup;j++){
        group.push(this.sprites[sprite_number]);
        sprite_number++;
      }  
    }    
  },

  basePosition:function(){
    this.sprite_groups.forEach(function(group,i){
      group.forEach(function(sprite,j){
        sprite.position.y = this.startY;
        var moveIndex = (group.id*this.model.currentStructure.sizeGroup) + j;
        sprite.position.x = 200 + (this.spacing*moveIndex);;
      },this)
    },this);
  },
}

module.exports = NumberGroupView;