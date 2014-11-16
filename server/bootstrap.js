Meteor.startup(function () {
	if(Meteor.users.find().count() === 0){
		Accounts.createUser({email: "teste@teste.com", password: "blastoise"})
		Accounts.createUser({email: "guest@teste.com", password: "blastoise"})
		Accounts.createUser({email: "guest2@teste.com", password: "blastoise"})
	}

	if(Games.find().count() === 0){
		console.log("Criando acervo de jogos do SNES")
		//Snes
		var gamesDocuments = JSON.parse(Assets.getText("games_source/snes.json"))
		_.each(gamesDocuments, function(doc){
			if(!_.isEmpty(doc.title)){
				console.log(doc.title)
				Games.insert(doc)
			}
		})
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

	if(!RetroArch.findOne({emulator: 'snes'})){
		var retroarchSnes9x = Assets.getText("retroarch_core/snes9x.js_")
	  var doc = {
	    emulator: 'snes',
	    core: retroarchSnes9x
	  }
	  RetroArch.insert(doc)
	}
})
