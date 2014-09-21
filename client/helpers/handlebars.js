renderTemplateIntoRegionWithData = function(region, templateName, data){
  var layout = UI.render(Layout.extend({template: 'layout'}))
  UI.DomRange.insert(layout.dom, document.body)

  layout.setData(data)
  layout.setRegion(region, templateName)
}

Handlebars.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Handlebars.registerHelper('capitalize', function(text){
	return text.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
})
