Template.signUp.events({
  'submit #signUpForm': function(e, t) {
    e.preventDefault();

    var signUpForm = $(e.currentTarget),
    email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
    password = signUpForm.find('#signUpPassword').val()

    if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && isValidPassword(password)) {
      Accounts.createUser({email: email, password: password}, function(err) {
        if (err) {
          if (err.message === 'Email already exists. [403]') {
            Session.set('alert', 'We\'re sorry but this email is already used.');
          } else {
            Session.set('alert', 'We\'re sorry but something went wrong.');
          }
        } else {
          Router.go("home")
        }
      });
    }
    return false;
  },
});
