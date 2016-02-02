/*!
 * Konna
 *
 * lellansin <lellansin@gmail.com>
 * MIT Licensed
 *
 *
 * 报错情况，开发报错、部署报错
 * 相比 pomelo 
 * 更加轻量级，多个关节点可以自由定义（编码、压缩）
 * 我附庸的附庸，不是我的附庸，类似副本集。
 * 自由的 session
 * 类 express 改善 rpc 流程
 * 本模块只要做当前模块的事情即可（低耦合）
 * rpc 失败重定向
 * 自动更新代码
 * 完美热更新、完美的自动拓展、缩减、队列控制
 * 更加友好的错误提示，
 * rpc 支持单元测试，自带测试的框架
 */

var Application = require('./application');

var Konna = module.exports = {};

Konna.version = '0.0.0';
Konna.components = {};
Konna.filters = {};

var self = this;

/**
 * 创建一个 Konna 应用 (application).
 *
 * @return {Application}
 * @memberOf Konna
 * @api public
 */
Konna.createApp = function(opts) {
	return self.app = new Application(opts);
};

/**
 * 获取 Konna 应用
 */
Object.defineProperty(Konna, 'app', {
	get: function() {
		return self.app;
	}
});

if (true) {
	var _log = console.log;
	console.log = function() {
		_log.apply(this, ['[' + process.pid + ']'].concat(Array.prototype.slice.call(arguments)));
	};
}