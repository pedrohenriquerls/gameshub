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
    path: '/',
    template: 'signIn',
  })
  this.route('home', {
    path: 'rooms',
    template: 'home'
  })
  this.route('room', {
    path: 'room/:_id',
    template: 'room',
    data: function(){
      return Rooms.findOne({_id: this.params._id})
    },
    yieldTemplates: {
      "games_list": {to: "things"}
    }
  })
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else{
      this.render('accessDenied');
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

Router.onBeforeAction(requireLogin, {except: ['login']});
Router.onBeforeAction(function() { clearAlerts() });
