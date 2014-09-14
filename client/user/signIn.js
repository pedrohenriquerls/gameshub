Template.signIn.events({
  'click #signin_btn': function(e, tmpl) {
    var email = trimInput(tmpl.$('#email').val().toLowerCase()),
    password = tmpl.$('#password').val();

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          tmpl.$('#email').parent().addClass("error")
          tmpl.$('#password').parent().addClass("error")
          Session.set('sign_in_message', 'Credentials are not valid.');
        } else {
          Router.go("home");
        }
      });
    }else{
      tmpl.$('#email').parent().addClass("error")
      tmpl.$('#password').parent().addClass("error")
    }
    return false;
  },
  "click #sigin_cancel_btn": function(e, tmpl){
    $('#sign_in').modal("hide")
    Router.go("home")
  }
});

Template.signIn.helpers({
  signInMessage: function(){
    return Session.get('sign_in_message')
  }
})
