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
    path: '/rooms',
    template: 'home',
    yieldTemplates: {
      "new_room_btn": {to: "rightMenu"}
    }
  })
  this.route('room', {
    path: 'room/:_id',
    template: 'room',
    data: function(){
      return Rooms.findOne({_id: this.params._id})
    },
    yieldTemplates: {
      "games_list": {to: "things"},
      "close_room_btn": {to: "rightMenu"}
    }
  })
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else{
      $("#sign_in").modal("show");
    }

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
