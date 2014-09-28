peerJSInstance = new Peer(Meteor.userId(), {key: '9lrq34293s5j0pb9'});
roomConnection = null

Meteor.subscribe("rooms");
Meteor.subscribe("games");
Meteor.subscribe("retroArch");

if(Meteor.userId()){
	Meteor.subscribe("roomInvite");
}
