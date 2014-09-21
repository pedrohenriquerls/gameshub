Template.room_users.helpers({
  users: function(){
    return Meteor.users.find({})
  }
})

Template.room_user_item.helpers({
  name: function(){
    return this.name
  },
  avatar: function(){
    return this.avatar
  }
})

Template.room_user_item.events({
  "click .item": function(e, tmpl){
    e.stopPropagation()

    $("#create_invite").empty()
    UI.insert(UI.renderWithData(Template.create_invite, this), $("#create_invite").get(0))
  }
})
