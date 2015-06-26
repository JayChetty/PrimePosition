var View = require('ampersand-view');
var _ = require('underscore');

var TeamView = View.extend({
  // template: '<div></div>',

  moveSteps: 60,
  spacing: 20,
  step:0,
  groupLength:60,


  initialize: function (stage, team, texture, startingY) {
    console.log('init', this.moveSteps)
    this.stage = stage;
    this.team = team;
    this.texture = texture;
    this.groups = [];
    this.groupOptions = this.team.groupOptions()
    console.log('groupOptions', this.groupOptions)
    this.structure = this.groupOptions[this.groupOptions.length-1];
    this.resetting = false;
    this.nextStructure;
    this.startingY =  startingY || 10;
    console.log('init', this.team.groupOptions())
  },

  render:function(){
    console.log('rendering')
    // this.renderWithTemplate(this);
    this.addBlobs();
    this.basePosition();
    // this.showStructureOptions();
    return this;
  },

  tryStructure:function(number){
    var structure = _.find(this.groupOptions, function(option){
      return option.sizeGroup === number;
    })

    if(!structure){return false;}
    this.resetting = true;
    this.step = 0;
    //will be used once it has reset
    this.nextStructure = structure;
    return true  
  },

  changeFormation:function(){
    if (this.resetting){
      this.backToLine()
    } else {
      this.intoFormation();
    }
  },

  backToLine: function(){
    if (this.step < this.moveSteps){
      var groupLength = this.spacing * this.structure.sizeGroup;
      this.groups.forEach(function(group){
        group.forEach(function(blob){
          blob.position.y = blob.position.y - (0.5*group.id);
          var xMoveAmount = (groupLength * group.id)/this.moveSteps;
          blob.position.x = blob.position.x + xMoveAmount;
        },this)
      },this);
      this.step++;
    } else{//reset now go back to the position
      console.log('reset now going back to position')
      this.clear();
      this.structure = this.nextStructure;
      this.addBlobs();
      this.basePosition(); 
      this.step = 0;
      this.resetting = false; 
    }
  },  

  intoFormation: function(){   
    if (this.step < this.moveSteps){
      var groupLength = this.spacing * this.structure.sizeGroup;
      this.groups.forEach(function(group){
        group.forEach(function(blob){
          blob.position.y = blob.position.y + (0.5*group.id);
          var xMoveAmount = (groupLength * group.id)/this.moveSteps;
          blob.position.x = blob.position.x - xMoveAmount;
        },this)
      },this);
      this.step++;
    }
  },

  basePosition:function(){
    this.groups.forEach(function(group,i){
      group.forEach(function(blob,j){
        blob.position.y = this.startingY;
        var moveIndex = (group.id*this.structure.sizeGroup) + j;
        blob.position.x = 200 + (this.spacing*moveIndex);;
      },this)
    },this);

  },

  clear:function(){
    this.groups.forEach(function(group,i){
      group.forEach(function(blob,j){
        this.stage.removeChild(blob);
      },this)
    },this);
    this.groups = [];  
  },


  addBlobs:function(){
    this.step = 0;
    blobs = []
    for(var i=0;i<this.structure.numGroups;i++){
      var group = [];
      group.id = i;
      this.groups.push(group);
      for(var j=0;j<this.structure.sizeGroup;j++){
        var blob =  new PIXI.Sprite(this.texture);
        blob.anchor.x = 0.5;
        blob.anchor.y = 0.5;
        blob.interactive = true;
        blob.number = i*this.structure.sizeGroup + j + 1;
        group.push(blob);
        blobs.push(blob)
        this.stage.addChild(blob);
      }  
    }
    //add click listeners
    blobs.forEach(function(blob){
      blob.mousedown = function(data){
        this.tryStructure(blob.number)
      }.bind(this)
    }.bind(this))

  }
})

module.exports = TeamView;