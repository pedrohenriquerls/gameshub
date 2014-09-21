Meteor.startup(function () {
	if(Meteor.users.find().count() === 0){
		Accounts.createUser({name: "teste", email: "teste@teste.com", password: "blastoise"})
		Accounts.createUser({name: "guest1", email: "guest@teste.com", password: "blastoise"})
		Accounts.createUser({name: "guest2", email: "guest2@teste.com", password: "blastoise"})
	}

	if(Games.find().count() === 0){
		var smw = {
			name: "Super Mario World",
			img: "/snes/smc.png",
			sourcePath: "/snes/mario.smc",
			platform: "snes"
		}
		Games.insert(smw)

		var mk = {
			name: "Mortal Kombat 3",
			img: "/snes/mortalKombat.png",
			sourcePath: "/snes/mortal_kombat.smc",
			platform: "snes"
		}
		Games.insert(mk)
	}

	if (Accounts.loginServiceConfiguration.find({service: 'facebook'}).count()===0) {
	  Accounts.loginServiceConfiguration.insert({
	    service: "facebook",
	    appId: "1478661669075033",
	    secret: "1eb3afc31d71323c80a672194ec30723"
	  });
	}

	if (Accounts.loginServiceConfiguration.find({service: 'twitter'}).count()===0) {
		Accounts.loginServiceConfiguration.insert({
			service: "twitter",
			appId: "EeSvFC9t5pIs20xICEhlMpJ55",
			secret: "qHVcLhOrLPdP3AP01pcb3LsTIR6W7jg2qBPgQSlUQ4GVNK1H53"
		});
	}
})
