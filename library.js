"use strict";

var controllers = require('./lib/controllers'),
		user = module.parent.require('./user'),
		winston = module.parent.require('winston'),
		EmailConfirm = {};

EmailConfirm.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/email-confirm-group', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/email-confirm-group', controllers.renderAdminPage);

	callback();
};

EmailConfirm.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/email-confirm-group',
		icon: 'fa-tint',
		name: 'Email Confirmation Group'
	});

	callback(null, header);
};

EmailConfirm.confirm = function(uid, callback) {
	winston.info('User with uid: ' + uid + ' confirmed email...');
};

module.exports = EmailConfirm;
