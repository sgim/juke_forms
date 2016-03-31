'use strict';

juke.controller('SidebarCtrl', function ($scope, playlistFactory) {

	playlistFactory.getAll().then(function(playlists) {
		$scope.playlists = playlists;
	});
  // nothing to see here for now… state transitions happening with ui-sref!

});
