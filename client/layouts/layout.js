Template.layout.helpers({
  currentProjectName: function(){
    return Session.get('currentProjectName')
  },
  currentProjectId: function(){
    return Session.get('currentProjectId')
  }
})
