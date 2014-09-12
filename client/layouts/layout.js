Template.layout.helpers({
  
})

Template.layout.events({
	'click #create_room_btn': function(e, t) {
		$('#create_room').modal('show')
	}
})
