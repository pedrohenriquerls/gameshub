Template.second_player_avatar.helpers({
  avatar: function(){
    var avatarImg = this.secondPlayerAvatar
    return avatarImg ? owner.avatar : "/images/avatar.png"
  },
})
