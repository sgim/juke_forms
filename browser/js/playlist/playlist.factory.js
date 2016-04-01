juke.factory("playlistFactory", function($http, $log) {
    var cachedPlaylists = [];
    var url = "/api/playlists/";
    var getData = function(res) {
        return res.data; 
    };

    var create = function(playlist) {
        return $http.post(url, playlist)
            .then(getData)
            .then(function(pl) {
                cachedPlaylists.push(pl);
                return pl;
            })
            .catch($log.error);
    };

    var getAll = function() {
        return $http.get(url)
            .then(getData)
            .then(function(list) {
                angular.copy(list, cachedPlaylists);
                return cachedPlaylists;
            })
            .catch($log.error);
    };

    var getById = function(id) {
    	return $http.get(url +id)
    		.then(getData)
    		.catch($log.error);
    };

    var addSong = function(playlistId, song){
    	return $http.post(url + playlistId + '/songs', {song: song})
    		.then(getData)
    		.catch($log.error);
    };

    var deleteSong = function(playlistId, song){
    	return $http.delete(url + playlistId + '/songs/' + song._id)
    		.then(getData)
    		.catch($log.error);
    };

    return {
        create: create,
        getAll: getAll,
        getById: getById,
        addSong: addSong,
        deleteSong: deleteSong
    };
});
