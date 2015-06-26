var NumberGroupView = function(options){
  var options = options || {};
  this.model = options.model;
  this.texture = options.texture;
  this.stage = options.stage;
  this.startY = options.startY || 10;

  this.sprites = [];
  this.sprite_groups = [];
  this.nextStructure = {};
  this.resetting = false;
  this.step = 0;

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
    console.log('adding sprite to stage', this.stage, sprite)
    this.stage.addChild(sprite);
  }

  this.sprites.forEach(function(sprite){
    sprite.mousedown = function(data){
      console.log('mousedown yo')
      this.setStructure(sprite.number)
    }.bind(this)
  }.bind(this))
  
  this.groupSprites();//set inital grouping
  this.basePosition();//go to base position

  this.model.on('change', function(){
    console.log('structure has changed')
    //out of position so regroup
    if(this.model.currentStructure.sizeGroup != this.model.size){
      this.resetting = true;
    }
  }.bind(this))

}

NumberGroupView.prototype = {
  setStructure: function(structureSize){
    console.log('setting structure size', structureSize)
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

  // //moving
  // changeFormation:function(){
  //   if (this.resetting){
  //     this.backToLine()
  //   } else {
  //     this.intoFormation();
  //   }
  // },

  // backToLine: function(){
  //   if (this.step < this.moveSteps){
  //     // var groupLength = this.spacing * this.structure.sizeGroup;
  //     this.groups.forEach(function(group){
  //       group.forEach(function(blob){
  //         blob.position.y = blob.position.y - (0.5*group.id);
  //         var xMoveAmount = (group.length * group.id)/this.moveSteps;
  //         blob.position.x = blob.position.x + xMoveAmount;
  //       },this)
  //     },this);
  //     this.step++;
  //   } else{//reset now go to the positin you 
  //     console.log('reset now going back to position')
  //     this.groupSprites();
  //     // this.structure = this.nextStructure;
  //     // this.addBlobs();
  //     this.basePosition(); 
  //     this.step = 0;
  //     this.resetting = false; 
  //   }
  // },  

  // intoFormation: function(){   
  //   if (this.step < this.moveSteps){
  //     var groupLength = this.spacing * this.structure.sizeGroup;
  //     this.groups.forEach(function(group){
  //       group.forEach(function(blob){
  //         blob.position.y = blob.position.y + (0.5*group.id);
  //         var xMoveAmount = (groupLength * group.id)/this.moveSteps;
  //         blob.position.x = blob.position.x - xMoveAmount;
  //       },this)
  //     },this);
  //     this.step++;
  //   }
  // },



}

module.exports = NumberGroupView;