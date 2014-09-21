Template.invite_trigger.helpers({
  newInvite: function(e, tmpl){
    return RoomInvites.findOne({userId: Meteor.userId()})
  }
})

Template.room_invite.rendered = function(){
  $("#room_invite").modal("show");
  console.log(this.data)
  RoomInvites.remove(this._id)
}

Template.room_invite.events({

})
