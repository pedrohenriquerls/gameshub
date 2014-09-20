Template.room_users.helpers({
  users: function(){
    return Meteor.users.find({})
  }
})

Template.room_user_item.helpers({
  name: function(){
    return this.name ? this.name : this.emails[0]
  },
  avatar: function(){
    return this.avatar ? this.avatar : "/images/avatar.png"
  }
})
