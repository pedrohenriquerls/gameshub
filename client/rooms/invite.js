Template.invite_trigger.helpers({
  newInvite: function(e, tmpl){
    return RoomInvites.findOne({userId: Meteor.userId()})
  }
})

Template.room_invite.rendered = function(){
  var invite = this.data
  if(invite){
    $("#room_invite").modal('setting', {
      onClose: function(){
        RoomInvites.remove(invite._id)
      },
      onHide: function(){
        RoomInvites.remove(invite._id)
      }
    }).modal("show")
  }
}

Template.room_invite.helpers({
  room: function(){
    return Rooms.findOne(this.roomId)
  }
})

Template.room_invite.events({
  "click #accept_invite": function(e, tmpl){
    var roomId = this.roomId

    Rooms.update({_id: roomId}, {$set: {
        secondPlayerAvatar: Meteor.user().avatar,
        secondPlayerId: Meteor.userId()
      }
    })

    Router.go(Router.routes['room'].url({_id: roomId}))
    $("#room_invite").modal('hide')
  }
})

Template.create_invite.rendered = function(){
  $("#create_invite").modal('show')
}

Template.create_invite.events({
  "click #send_invite": function(e, tmpl){
    var invite = {
      userId: this._id,
      message: tmpl.$("#message").val(),
      roomId: Meteor.user().currentRoom,
      name: Meteor.user().name,
      avatar: Meteor.user().avatar
    }
    RoomInvites.insert(invite)

    $("#create_invite").modal('hide')
  },
  "click #cancel_invite": function(e, tmpl){
    $("#create_invite").modal('hide')
  }
})
