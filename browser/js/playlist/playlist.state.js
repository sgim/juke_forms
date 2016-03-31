'use strict';

juke.config(function ($stateProvider) {
	$stateProvider.state("newPlaylist", {
		url: "/playlists/new",
		templateUrl: "/js/playlist/templates/playlists.html",
		controller: function ($scope, playlistFactory) {
      $scope.submitPlaylist = function () {
				playlistFactory.create($scope.playlist)
		    .then(function (playlist) {
					$scope.playlist.name = "";
					$scope.newList.newName.$pristine = true;
					console.log(playlist);
				});
			};
		}
	});
});
