var NumberGroupView = function(options){
  var options = options || {};
  this.model = options.model;
  this.texture = options.texture;
  this.stage = options.stage;
  this.startY = options.startY || 10;

  this.sprites = [];
  this.sprite_groups = [];
  this.resetting = false;

  this.step = 60;//not moving
  this.moveSteps = 60;
  this.spacing = 20;
  this.groupLength =60;

  //add sprites
  for(var i=0;i<this.model.size;i++){
    var sprite = new PIXI.Sprite(this.texture)
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.interactive = true;
    sprite.number = i + 1;
    this.sprites.push(sprite)
    this.stage.addChild(sprite);
  }

  this.sprites.forEach(function(sprite){
    sprite.mousedown = function(data){
      this.setTargetStructure(sprite.number)
    }.bind(this)
  }.bind(this))
  
  this.groupSprites();//set inital grouping
  this.basePosition();//go to base position

  this.model.on('change', function(){
    //out of position so regroup
    if(this.sprite_groups[0].length != this.model.size){
      this.resetting = true;
    }else{//in position so set it up
      this.groupSprites();
    }
    this.step = 0;
  }.bind(this))

}

NumberGroupView.prototype = {
  setTargetStructure: function(structureSize){
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

  //moving
  changeFormation:function(){
    if (this.resetting){
      this.backToLine()
    } else {
      this.intoFormation();
    }
  },

  backToLine: function(){
    if (this.step < this.moveSteps){
      // var groupLength = this.spacing * this.structure.sizeGroup;
      this.sprite_groups.forEach(function(group){
        var groupLength = this.spacing * group.length ;
        group.forEach(function(blob){
          blob.position.y = blob.position.y - (0.3*group.id);
          var xMoveAmount = (groupLength * group.id)/this.moveSteps;
          blob.position.x = blob.position.x + xMoveAmount;
        },this)
      },this);
      this.step++;
    } else{//reset now go to the positin you 
      this.groupSprites();
      this.basePosition(); 
      this.step = 0;
      this.resetting = false; 
    }
  },  

  intoFormation: function(){
    if(this.step >= this.moveSteps){ return } 
    var groupLength = this.spacing * this.model.currentStructure.sizeGroup;
    this.sprite_groups.forEach(function(group){
      group.forEach(function(blob){
        blob.position.y = blob.position.y + (0.3*group.id);
        var xMoveAmount = (groupLength * group.id)/this.moveSteps;
        blob.position.x = blob.position.x - xMoveAmount;
      },this)
    },this);
    this.step++;

  },



}

module.exports = NumberGroupView;