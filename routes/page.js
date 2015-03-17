'use strict';

module.exports = function(app) {
  var page = app.controllers.page;
  app.get('/', page.mainPage);
};
