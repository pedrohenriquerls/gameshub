Meteor.methods({
  setCurrentRoom: function (userId, currentRoomId) {
    Meteor.users.update({_id: userId}, {$set: {currentRoom: currentRoomId}})
  },
  unsetCurrentRoom: function(userId, currentRoomId){
    Meteor.users.update({_id: userId}, {$unset: {currentRoom: currentRoomId}})
  }
});

Accounts.onCreateUser(function(options, user){
	if ( user.services.twitter ) {
    var profile = user.services.twitter

		user.name = profile.screenName;
		user.username = profile.screenName;
		user.avatar = profile.profile_image_url_https;
    user.email = profile.email
	}

  if(user.services.facebook){
    var profile = user.services.facebook
    user.name = profile.name
    user.email = profile.email
    user.avatar = "http://graph.facebook.com/" + profile.id + "/picture/?type=large"
  }

	return user;
});
