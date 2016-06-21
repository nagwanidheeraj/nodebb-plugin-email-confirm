"use strict";

var groups = module.parent.require('./groups'),
    db = module.parent.require('./database'),
    meta = module.parent.require('./meta'),
    winston = module.parent.require('winston'),
    EmailConfirm = {};

var targetGroup;

EmailConfirm.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/email-confirm-group', hostMiddleware.admin.buildHeader, EmailConfirm.renderAdminPage);
	router.get('/api/admin/plugins/email-confirm-group', EmailConfirm.renderAdminPage);

	meta.settings.get('email-confirm-group', function(err, settings) {
		if (!err && settings && settings.targetGroup) {
			targetGroup = settings.targetGroup;
		} else {
			return winston.error('[plugins/email-confirm-group] Target group not set');
		}
	});

	callback();
};

EmailConfirm.renderAdminPage = function(req, res, next) {
	db.getSortedSetRevRange('groups:createtime', 0, -1, function(err, groupNames) {
		if(err) { return next(err); }

		groupNames = groupNames.filter(function(name) {
			return name.indexOf(':privileges:') === -1 && name !== 'registered-users';
		});

		groups.getGroupsData(groupNames, function(err, data) {
			res.render('admin/plugins/email-confirm-group', {groups: data});
		});
	});
};

EmailConfirm.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/email-confirm-group',
		icon: 'fa-tint',
		name: 'Email Confirmation Group'
	});

	callback(null, header);
};

EmailConfirm.confirm = function(data, callback) {
	if (targetGroup != null) {
		groups.join(targetGroup, data.uid);
	}
};

module.exports = EmailConfirm;
