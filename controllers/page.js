'use strict';

module.exports = function(app) {
	var pageController = {
		mainPage: function(request, response) {
			response.render('index', { title: 'Main Page' });
		}
	};
	return pageController;
}
