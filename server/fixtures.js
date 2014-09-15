Meteor.startup(function () {
	if(Meteor.users.find().count() === 0){
		Accounts.createUser({email: "teste@teste.com", password: "blastoise"})
		Accounts.createUser({email: "guest@teste.com", password: "blastoise"})
		Accounts.createUser({email: "guest2@teste.com", password: "blastoise"})
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
})
