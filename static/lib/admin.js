'use strict';
/* globals $, app, socket */

define('admin/plugins/email-confirm-group', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('email-confirm-group', $('.email-confirm-group-settings'));

		$('#save').on('click', function() {
			Settings.save('email-confirm-group', $('.email-confirm-group-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'email-confirm-group-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});
