var fs = require('fs');
var path = require('path');
var dnode = require('dnode');

function Self() {
	this.name = 'Konna';
	this.funcs = {};
}

Self.prototype.define = function(name, code) {
	fs.writeFileSync('./' + name + '.js', code);
	delete require.cache[path.join(__dirname, name + '.js')];
	this.funcs[name] = require('./' + name);

	this.funcs[name](function(result) {
		console.log('自测。。。', result);
	});
}

var self = new Self();

dnode({

	get: function(key, cb) {
		cb(null, self[key]);
	},

	set: function(key, value, cb) {
		self[key] = value;
		cb(null, true);
	},

	define: function(name, code, cb) {
		self.define(name, code);

		cb(null, true);
	},

	run: function(name, cb) {
		// self.funcs[name].apply(self, cb);
		self.funcs[name](cb);
	}
}).listen(5050);