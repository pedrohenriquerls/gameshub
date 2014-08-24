Template.signOut.events({
  'click #signOut': function(e, t) {
    Meteor.logout(function() {
      Session.set('alert', 'See you soon :)');
      //Router.go("home")
    });
    return false;
  }
});
