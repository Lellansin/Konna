var util = require('util');
var path = require('path');
var utils = require('./util/utils');
var Server = require('socket.io');
var Client = require('socket.io-client');
var exec = require('child_process').exec;

// 应用程序状态
var STATE_INITED = 1; // app 已初始化
var STATE_START = 2; // app 启动
var STATE_STARTED = 3; // app 已启动
var STATE_STOPED = 4; // app 已停止

function Application(opts) {
    this.setting = {};
    this.init(opts);
}

module.exports = Application;

/**
 * 初始化服务器
 *     - 设置默认配置
 */
Application.prototype.init = function(opts) {
    // 初始化 server 表
    console.log('init!!');
    // this.BASE_DIR = process.cwd();
    this.BASE_DIR = '/Users/Lellansin/Documents/workspace/node/konna-example/';
    this.ENV = utils.getEnv();
    this.SERVERS_PATH = path.join(this.BASE_DIR, 'config/servers.json');
    this.SERVER_CONFIG = require(this.SERVERS_PATH)[this.ENV.env || 'development'];
    this.IS_MASTER = !!!this.ENV.id;
    console.log('server-id', this.ENV.id);
};

Application.prototype.masterServer = function() {
    this.server = new Server();

    this.server.on('connection', function(socket) {

        socket.emit('news', {
            hello: 'world'
        });

        socket.on('socket', function(data) {
            console.log(data);
        });


    });

    this.server.listen(8850);
};

Application.prototype.launchServants = function(cb) {
    console.log('launchServants...');
    var cmd = util.format('/usr/local/bin/node %s id=test-server', path.join(this.BASE_DIR, 'app.js'));
    console.log(cmd);
    var child = exec(cmd);

    child.stdout.on('data', function(data) {
        print(data);
    });

    child.stderr.on('data', function(data) {
        print('stderr data', data);
    });

    child.on('close', function(data) {
        console.log('close', data);
    });

    child.on('error', function(data) {
        console.log('error', data);
    });
};

Application.prototype.connectServer = function() {
    // 获取路由表
    this.client = Client('http://localhost:8850');

    this.client.on('connect', function() {
        console.log('connect~');
    });

    this.client.on('news', function(data) {
        console.log('news~', data);
    });

    this.client.on('disconnect', function() {
        console.log('disconnect~');
    });

    this.client.emit('socket', 'hello world other event');
};

/**
 * 添加一个过滤器用于前置和后置过滤
 */
Application.prototype.filter = function(filter) {

};

/**
 * 添加前置过滤
 */
Application.prototype.before = function(bf) {

};

/**
 * 添加后置过滤
 */
Application.prototype.after = function(af) {

};

/**
 * 加载组件
 */
Application.prototype.load = function(name, component, opts) {

};

/**
 * 加载 json配置文件 this.settings (支持不同环境目录且兼容旧的路径)
 * 例如： util/appUtil.js 的 loadServers 中调用：
 * app.loadConfigBaseApp('servers', '/config/servers.json');
 */
Application.prototype.loadConfigBaseApp = function(key, val) {

};

/**
 * 加载 json配置文件到 this.settings
 */
Application.prototype.loadConfig = function(key, val) {

};

/**
 * 为特定的服务器类型设置路由方法
 * Examples:
 *    app.route('area', routeFunc);
 *    var routeFunc = function(session, msg, app, cb) {
 *        // 所有对于 'area' 的请求 将被 分配到第一个 area 服务器
 *        var areas = app.getServersByType('area');
 *        cb(null, areas[0].id);
 *    };
 */
Application.prototype.route = function(serverType, routeFunc) {

};

/**
 * 设置服务器停止的前置回调函数. 将在服务器停止之前执行。
 * 注：该函数在 pomelo 0.8 中被废弃
 */
Application.prototype.beforeStopHook = function(fun) {

};

/**
 * 开始应用程序. 将会加载默认组件然后开启所有已加载的组件。
 */
Application.prototype.start = function(cb) {
    console.log('hello, let\'s start!');

    // check is master
    if (this.IS_MASTER) {
        console.log('this is master!');
        // start master server
        this.masterServer();
        // launch servants
        this.launchServants();
    } else {
        // 主动连接上级节点
        console.log('this is servant', this.ENV.id);

        this.connectServer();
    }
};

/**
 * 给设置项赋值, 或者返回设置项的值
 */
Application.prototype.set = function(key, value) {
    this.setting[key] = value;
};

/**
 * 获取 setting 中的属性(property)
 */
Application.prototype.get = function(key) {
    return this.setting[key];
};

/**
 * 检查 `setting` 项是否已启用
 */
Application.prototype.enabled = function(setting) {
    return !!this.get(setting);
};

/**
 * 检查 `setting` 项是否已失效
 */
Application.prototype.disabled = function(setting) {
    return !this.get(setting);
};

/**
 * 启用 `setting`项 (将其值设置为 true)
 */
Application.prototype.enable = function(setting) {
    return this.set(setting, true);
};

/**
 * 关闭 `setting`项 (将其值设置为 false)
 */
Application.prototype.disable = function(setting) {
    return this.set(setting, false);
};

var print = function() {
    process.stdout.write(util.format.apply(null, arguments));
};