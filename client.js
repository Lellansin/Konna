var dnode = require('dnode');

dnode.connect(5050, function(remote) {
	// remote.zing(1, function(n) {
	// 	console.log('n = ' + n);
	// });

	// remote.end();
	// console.log('remote', remote);

	// remote.set('test', 'function~', function() {
	// 	console.log('arguments', arguments);

	// 	remote.get('test', function() {
	// 		console.log('arguments', arguments);
	// 	});
	// });

	remote.define('hi', 'module.exports = function(cb) { var arr = []; for(var i = 0; i < 10000; i++) { arr.push(i); }  cb("hello world '+ Date.now() +' "); }', function() {
		remote.run('hi', function(result) {
			console.log('result', result);
			process.exit();
		});
	})

	// remote.test(function() {
	// 	console.log('arguments', arguments);
	// });
});