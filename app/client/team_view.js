var View = require('ampersand-view');

var TeamView = View.extend({
  template: '<div></div>',
  moveSteps: 60,
  spacing: 20,
  step:0,

  groupLength:60,
  events: {
    'click .structure': 'changeStructure'
  },

  initialize: function (stage, team, texture) {
    console.log('init', this.moveSteps)
    this.stage = stage;
    this.team = team;
    this.texture = texture;
    this.groups = [];
    this.structure = this.team.groupOptions()[0];
    this.resetting = false;
    this.nextStructure;
  },
  render:function(){
    this.renderWithTemplate(this);
    this.addBlobs();
    this.basePosition();
    this.showStructureOptions();
    return this;
  },

  changeStructure:function(ev){
    if(ev){
      ev.preventDefault; 
    }
    this.resetting = true;
    this.step = 0;
    index = ev.delegateTarget.dataset.index
    //will be used once it has reset
    this.nextStructure = this.team.groupOptions()[index]     
  },

  showStructureOptions:function(){
    this.team.groupOptions().forEach(function(structure,i){
      console.log('structure', structure)
      link = "<button class='structure' data-index=" + i+ ">" + structure.sizeGroup + "</button>"
      console.log('this.el', this.el)
      $(this.el).append(link);
    },this)
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
      console.log('changing formation size group', this.structure.sizeGroup)
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
      console.log('changing formation size group', this.structure.sizeGroup)
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
        blob.position.y = 150;
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
    for(var i=0;i<this.structure.numGroups;i++){
      var group = [];
      group.id = i;
      this.groups.push(group);
      for(var j=0;j<this.structure.sizeGroup;j++){
        blob =  new PIXI.Sprite(this.texture);
        blob.anchor.x = 0.5;
        blob.anchor.y = 0.5;
        group.push(blob);
        this.stage.addChild(blob);
      }  
    }
  }
})

module.exports = TeamView;