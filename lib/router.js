Router.configure({
  layoutTemplate: 'layout',
  progressSpinner: false
});

Router.map(function() {
  this.route('login', {
    path: '/login',
    template: 'signIn',
  })
  this.route('home', {
    path: '/',
    template: 'home',
    progress: false,
    waitOn: function(){
      return Meteor.subscribe("rooms");
    },
    data: function(){
      return {rooms: Rooms.find({})}
    },
    yieldTemplates: {
      "new_room_btn": {to: "rightMenu"}
    }
  })
  this.route('room', {
    path: 'room/:_id',
    template: 'room',
    waitOn: function(){
      return Meteor.subscribe("roomSecondPlayer", this.params._id)
    },
    data: function(){
      return Rooms.findOne({_id: this.params._id})
    },
    onBeforeAction: function(){
      Meteor.subscribe('users');
      this.next()
    },
    yieldTemplates: {
      "games_list": {to: "things"},
      "close_room_btn": {to: "rightMenu"}
    }
  })
});

var requireLogin = function(pause) {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    $("#sign_in").modal('setting', 'closable', false).modal("show");
    this.pause();
  }else{
    this.next();
  }

}

clearAlerts = function(){
  Session.set('alert', '');
  this.next()
}

Router.onBeforeAction(requireLogin, {except: ['login', 'home']});
Router.onBeforeAction(clearAlerts);

Router.onAfterAction(function(){
  if ( this.ready() ) {
    Session.set('firstLoaded', true);
  }
});
