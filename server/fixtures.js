Meteor.startup(function () {
	if(Meteor.users.find().count() === 0){
		Accounts.createUser({email: "teste@teste.com", password: "blastoise"})
	}
})
