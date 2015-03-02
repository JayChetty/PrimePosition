var View = require('ampersand-view');

var TeamView = View.extend({
  template: '<div> </div>',
  moveSteps: 60,
  spacing: 20,
  step:0,

  groupLength:60,

  initialize: function (stage, team, texture) {
    console.log('init', this.moveSteps)
    this.stage = stage;
    this.team = team;
    this.texture = texture;
    this.groups = []
    this.structure = this.team.groupOptions()[0]
  },
  render:function(){
    this.renderWithTemplate(this);
    this.basePosition();
    return this;
  },

  changeFormation: function(){   
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
    this.step = 0;
    for(var i=0;i<this.structure.numGroups;i++){
      var group = [];
      group.id = i;
      this.groups.push(group);
      for(var j=0;j<this.structure.sizeGroup;j++){
        blob =  new PIXI.Sprite(this.texture);
        blob.anchor.x = 0.5;
        blob.anchor.y = 0.5;
        var moveIndex = (i*this.structure.sizeGroup) + j;
        blob.position.x = 200 + (this.spacing*moveIndex);
        blob.position.y = 150;
        group.push(blob);
        this.stage.addChild(blob);
      }  
    }
  }
})

module.exports = TeamView;