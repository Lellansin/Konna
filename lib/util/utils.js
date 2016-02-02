
exports.getEnv = function(param) {
	var argv, environment = {};

	if (param) {
		argv = param.split(' ').slice(2);
	} else {
		argv = process.argv.slice(2);
	}

	for (var i = 0; i < argv.length; i++) {
		if (argv[i]) {
			var item = argv[i].split('=');
			environment[item[0]] = parseStr(item[1]);
		}
	}

	return environment;
};

var parseStr = function(str) {
	if (/^[\d]+[\.][\d]+?$/.test(str))
		return parseFloat(str);
	if (/^[\d]+?$/.test(str))
		return parseInt(str);
	if (/^true$/.test(str))
		return true;
	if (/^false$/.test(str))
		return false;
	return str;
};

// var param = '/usr/local/bin/node /Users/chengbichun/root-2/dev/server/app.js env=dev id=auth-server-1 host=127.0.0.1 port=9910 clientPort=7925 frontend=true auto-restart=true args= --debug=7926  secretKey=sdfsdfrandom1 serverType=auth';
// console.log(exports.getEnv(param));