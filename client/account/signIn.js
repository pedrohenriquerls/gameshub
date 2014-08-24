Template.signIn.events({
  'submit #signInForm': function(e, t) {
    e.preventDefault();

    var signInForm = $(e.currentTarget),
    email = trimInput(signInForm.find('.email').val().toLowerCase()),
    password = signInForm.find('.password').val();

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          Session.set('alert', 'We\'re sorry but these credentials are not valid.');
        } else {
          Router.go("home");
        }
      });
    }
    return false;
  },
});
