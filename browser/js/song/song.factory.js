'use strict';

juke.factory('SongFactory', function ($http, $log) {

  return {
    convert: function (song) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      return song;
    },
    getAllSongs: $http.get('/api/songs')
    		.then(function(res) {
    			return res.data;
    		})
    		.catch($log.error)
  };

});
