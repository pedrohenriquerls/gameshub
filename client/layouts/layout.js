Template.layout.helpers({
  
})

Template.layout.events({
	'click #create_room_btn': function(e, tmpl) {
		$('#create_room').modal('show')
	},
	'click #close_room_btn': function(e, tmpl){
		Router.go("/rooms")
	}
})
