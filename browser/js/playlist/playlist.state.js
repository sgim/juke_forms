'use strict';

juke.config(function($stateProvider) {
    $stateProvider.state("newPlaylist", {
        url: "/playlists/new",
        templateUrl: "/js/playlist/templates/playlists.html",
        controller: function($scope, playlistFactory, $state) {
            $scope.submitPlaylist = function() {
                playlistFactory.create($scope.playlist)
                    .then(function(playlist) {
                        $state.go("singlePlaylist", { id: playlist._id });
                    });
            };
        }
    });
    $stateProvider.state("singlePlaylist", {
        url: "/playlist/:id",
        templateUrl: "/js/playlist/templates/playlist.html",
        controller: function(PlayerFactory, $scope, $stateParams, playlistFactory, $log, SongFactory) {
            // angular.extend($scope, PlayerFactory);
            $scope.toggle = function(song) {
                if (song !== PlayerFactory.getCurrentSong()) {
                    PlayerFactory.start(song, $scope.playlist.songs);
                } else if (PlayerFactory.isPlaying()) {
                    PlayerFactory.pause();
                } else {
                    PlayerFactory.resume();
                }
            };

            $scope.getCurrentSong = function() {
                return PlayerFactory.getCurrentSong();
            };

            $scope.isPlaying = function(song) {
                return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
            };
            SongFactory.getAllSongs
            .then(function(songs) {
                $scope.songs = songs;
        		return playlistFactory.getById($stateParams.id);
            })
            .then(function(playlist) {
                $scope.playlist = playlist;
                var i = 0, len =  playlist.artists.length;
                $scope.playlist.songs.forEach(function (song) {
                	SongFactory.convert(song);
                	song.artists = song.artists.map(function (artistId) {
                		for(i = 0; i < len; i++) {
                			if(artistId === playlist.artists[i]._id) return playlist.artists[i];
                		}
                		return artistId;
                	});
                });
            })
            .catch($log.error);
            $scope.addSong = function(song) {
                SongFactory.convert(song);
                $scope.playlist.songs.push(song);
                playlistFactory.addSong($scope.playlist._id, song);
                $scope.addSongs.newSong.$pristine = true;
            };
            // $scope.convert = SongFactory.convert;

            $scope.deleteSong = function(song) {
            	playlistFactory.deleteSong($scope.playlist._id, song);
            	var i = $scope.playlist.songs.indexOf(song);
            	$scope.playlist.songs.splice(i, 1);

            };
        }
    });
});
