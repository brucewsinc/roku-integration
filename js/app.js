(function() {
	// curl -d '' 'http://192.168.1.122:8060/launch/15985?t=v&u=http://192.168.1.144/torrents/300%20(2006)%20%5b1080p%5d/300.2006.BluRay.1080p.x264.YIFY.mp4&videoName=Podcast&videoFormat=mp4'

	var http = require('http'),
		rokuHost = '192.168.1.122';

	// Private Roku Implementation Server
	var server = http.createServer(function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});

		if(!req.url.match(/^\/\?url=/)) console.log('Not a valid request: ' + req.url);
		else {
			var param1 = req.url.split('=')[1].split('&')[0];
			var param2 = req.url.split('=')[2];

			console.log(param1, param2);
			doRequest('/launch/15985?t=v&u=' + param1 + '&videoName=' + param2 + '&videoFormat=mp4');
		}

		res.write('Parameter: ');
		res.end('Got request!');
	});

	var doRequest = function(uri) {
		var opts = {
			hostname: rokuHost,
			port: 8060,
			path: uri,
			method: 'POST',
			headers: {}
		};

		var req = http.request(opts);
		req.on('error', function() {});
		req.end();
	};

	// ffmpeg -i fate.mkv -qscale 1 -acodec libfaac -vcodec mpeg4 fate-stay.m4v
	// See: https://trac.ffmpeg.org/wiki/HowToBurnSubtitlesIntoVideo
	//      https://trac.ffmpeg.org/wiki/Creating%20multiple%20outputs
	//      http://andrebluehs.net/blog/converting-avi-to-mp4-with-ffmpeg/

	// Reset
	//doRequest('/launch/15985?t=v&u=http%3A%2F%2F192.168.1.144%2Ftorrents%2F300%2520(2006)%2520%255b1080p%255d%2F300.2006.BluRay.1080p.x264.YIFY.mp4&videoName=300&videoFormat=mp4');

	server.listen(1337);
})();