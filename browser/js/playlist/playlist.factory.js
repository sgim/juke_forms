juke.factory("playlistFactory", function ($http, $log) {
	var cachedPlaylists = [];
	
  var getData = function (res) {return res.data; };
	var create = function (playlist) {
    return $http.post("/api/playlists", playlist)
	         .then(getData)
	         .then(function (pl) {
						 cachedPlaylists.push(pl);
						 return pl;
					 })
	         .catch($log.error);
	};
	var getAll = function () {
		return $http.get("/api/playlists")
	         .then(getData)
	         .then(function (list) {
						 angular.copy(list, cachedPlaylists);
						 return cachedPlaylists;
					 })
	         .catch($log.error);
	};

  return {
		create: create,
    getAll: getAll
	}
});
