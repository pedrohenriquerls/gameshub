peerJSInstance = new Peer(Meteor.userId(), {key: 'i8d7td2q5oa2lnmi'});
roomConnection = null

Meteor.subscribe("rooms");
Meteor.subscribe("games");
