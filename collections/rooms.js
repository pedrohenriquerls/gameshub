Rooms = new Meteor.Collection('rooms')

Rooms.allow({
  insert: function(userId, doc){
    doc.createdAt = Date()
    doc.owner = userId
    doc.private = doc.password != ""

    doc.img = ""
    doc.streamId = guid()
    doc.closed = false

    return true
  },
  update: ownsDocument
});