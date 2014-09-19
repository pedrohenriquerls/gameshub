Template.layout.rendered = function(){
	Deps.autorun(function(){
		if(Meteor.userId())
			$('#sign_in').modal("hide")
	});
}

Template.layout.helpers({

})

Template.layout.events({
	'click #signin_btn': function(e, tmpl){
		$('#sign_in').modal("show")
	},
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
