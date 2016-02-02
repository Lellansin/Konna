var util = require('util');

function Server() {
	// 当前服务器信息
	this.serverId = null; // 当前服务器 id
	this.serverType = null; // 当前服务器类型
	this.curServer = null; // 当前服务器信息
	this.startTime = null; // 当前服务器启动时间
}

module.exports = Server;

Server.prototype.init = function(opts) {

};

Server.prototype.getServerId = function() {
	return serverId;
};

Server.prototype.getServerType = function() {
	return serverType;
};

Server.prototype.getServerConfig = function() {

};

Server.prototype.start = function(force) {

};

Server.prototype.afterStart = function(cb) {

};

Server.prototype.stop = function(force) {

};