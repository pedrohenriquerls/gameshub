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
  update: function(userId, doc){
    if(!Meteor.user())
      return false

    var guest = RoomInvites.findOne({roomId: doc._id})
    if(guest)
      return (guest.userId == userId)

    return (doc.secondPlayerId == userId || userId == doc.ownerId)
  },
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
