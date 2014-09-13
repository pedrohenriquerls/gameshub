Rooms = new Meteor.Collection('rooms')

Rooms.allow({
  insert: function(userId, doc){
    if(!Meteor.user())
      return false

    doc.createdAt = Date()
    doc.ownerId = userId
    doc.private = doc.password != ""

    doc.img = ""
    doc.streamId = guid()
    doc.closed = false

    return true
  },
  update: ownsDocument
});