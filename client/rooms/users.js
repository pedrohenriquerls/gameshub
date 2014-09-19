Template.room_users.helpers({
  users: function(){
    var users = Meteor.users.find({}).fetch()
    console.log(users)
    return users
  }
})
