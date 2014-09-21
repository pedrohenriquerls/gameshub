Rooms = new Meteor.Collection('rooms')

Rooms.allow({
  insert: function(userId, doc){
    if(!Meteor.user())
      return false

    doc.createdAt = Date()
    doc.private = doc.password != ""

    doc.img = ""
    doc.streamId = guid()
    doc.closed = false

    return true
  },
  update: ownsDocument,
  remove: ownsDocument
});

RoomInvites = new Meteor.Collection('room_invites')
RoomInvites.allow({
  insert: function(userId, doc){
    doc.read = false
    return true
  },
  update: function(userId, doc){
    return true
  },
  remove: function(userId, doc){
    return (userId == doc.userId)
  }
})
