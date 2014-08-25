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
    path: 'home',
    template: 'home'
  })
  this.route('gameplay', {
    path: 'game/playing/:_id',
    template: 'play'
  })
  this.route('games', {
    path: 'games',
    template: 'games'
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

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {except: ['login']});
Router.onBeforeAction(function() { clearAlerts() });
