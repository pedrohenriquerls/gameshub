Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
  disableProgressSpinner : true,
  progress:{
    enable: true
  }
});


Router.map(function() {
  this.route('login', {
    path: '/login',
    template: 'signIn',
  })
  this.route('home', {
    path: '/',
    template: 'home',
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
      return Meteor.subscribe('users');
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
    pause();
  }
}

clearAlerts = function(){
  Session.set('alert', '');
}

Router.onBeforeAction(function(){
  NProgress.start();
});
Router.onAfterAction(function(){
  NProgress.done();
})

Router.onBeforeAction(requireLogin, {except: ['login', 'home']});
Router.onBeforeAction(function() { clearAlerts() });

Router.onAfterAction(function(){
  if ( this.ready() ) {
    Session.set('firstLoaded', true);
  }
});
