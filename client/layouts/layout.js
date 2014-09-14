Template.layout.rendered = function(){
	Deps.autorun(function(){
		$('#sign_in').modal("hide")
	});
}

Template.layout.helpers({

})

Template.layout.events({
	'click #create_room_btn': function(e, tmpl) {
		e.stopPropagation()

		if(Meteor.user())
			$('#create_room').modal('show')
		else{
			$('#sign_in').modal("show")
			return
		}
	},
	'click #close_room_btn': function(e, tmpl){
		Router.go(Router.routes['home'].url({}))
	}
})
