Template.room_users.helpers({
  users: function(){
    return Meteor.users.find({})
  }
})

Template.room_user_item.helpers({
  name: function(){
    return this.name ? this.name : this.emails
  },
  avatar: function(){
    return this.avatar ? this.avatar : "/images/avatar.png"
  }
})

Template.room_user_item.events({
  "click .item": function(e, tmpl){
    e.stopPropagation()

    var invite = {
      userId: this._id,
      roomId: Meteor.user().currentRoom
    }

    console.log(invite)
    RoomInvites.insert(invite)
  }
})
