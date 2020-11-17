// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/router/route.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Route = /*#__PURE__*/function () {
  function Route(path, component, rootQuery, data) {
    _classCallCheck(this, Route);

    this.path = path;
    this.component = component;
    this.rootQuery = rootQuery;
    this.data = data;
  }

  _createClass(Route, [{
    key: "render",
    value: function render(data) {
      var root = document.querySelector(this.rootQuery);
      root.innerHTML = '';
      if (data) root.append(new this.component(data).render());else root.append(new this.component().render());
    }
  }]);

  return Route;
}();

exports.default = Route;
},{}],"modules/router/router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _route = _interopRequireDefault(require("./route.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Router = /*#__PURE__*/function () {
  function Router(rootQuery) {
    _classCallCheck(this, Router);

    this.routes = [];
    this.currentRoute = null;
    this.rootQuery = rootQuery;
  }

  _createClass(Router, [{
    key: "use",
    value: function use(path, component, data) {
      var route = new _route.default(path, component, this.rootQuery, data);
      this.routes.push(route);
      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      window.onpopstate = function (event) {
        _this.redirect(event.currentTarget.location.pathname);

        return false;
      }.bind(this);

      this.redirect(window.location.pathname);
    }
  }, {
    key: "redirect",
    value: function redirect(path) {
      this.currentRoute = this.routes.find(function (route) {
        return route.path === path || route.path.slice(0, route.path.lastIndexOf('/')) === path.slice(0, path.lastIndexOf('/')) && route.path.indexOf(':') !== -1;
      });

      if (!this.currentRoute) {
        this.redirect('/404');
      } else if (this.currentRoute.path.indexOf(':') !== -1) {
        var data = {};
        var value = path.split('/')[path.split('/').length - 1];
        var key = this.currentRoute.path.split('/')[this.currentRoute.path.split('/').length - 1].split('').splice(1).join('');
        data[key] = value;
        this.currentRoute.render(data);
      } else this.currentRoute.render();
    }
  }, {
    key: "findRoute",
    value: function findRoute(path) {//  path:   /item/1
      //  need:   /item/:index
    }
  }, {
    key: "back",
    value: function back() {
      this.history.back();
    }
  }, {
    key: "forward",
    value: function forward() {
      this.history.forward();
    }
  }]);

  return Router;
}();

exports.default = Router;
},{"./route.js":"modules/router/route.js"}],"modules/pubsub/pubsub.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PubSub = /*#__PURE__*/function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.events = {};
  }

  _createClass(PubSub, [{
    key: "subscribe",
    value: function subscribe(event, callback) {
      if (!this.events.hasOwnProperty(event)) {
        this.events[event] = [];
      }

      console.log('SUBSCRIBE this.events');
      console.log(this.events);
      return this.events[event].push(callback);
    }
  }, {
    key: "publish",
    value: function publish(event) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.events.hasOwnProperty(event)) {
        return [];
      }

      console.log('PUBLISH this.events');
      console.log(this.events);
      return this.events[event].map(function (callback) {
        return callback(data);
      });
    }
  }]);

  return PubSub;
}();

exports.default = PubSub;
},{}],"modules/store/store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pubsub = _interopRequireDefault(require("../pubsub/pubsub.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Store = /*#__PURE__*/function () {
  function Store(params) {
    _classCallCheck(this, Store);

    console.log('STORE constructor');
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';
    this.events = new _pubsub.default();

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }

    this.state = new Proxy(params.state || {}, {
      set: function set(state, key, value) {
        state[key] = value;
        console.log("stateChange: ".concat(key, ": ").concat(value)); // this.events.publish('stateChange', this.state);

        this.status = 'resting';
        return true;
      }
    });
  }

  _createClass(Store, [{
    key: "dispatch",
    value: function dispatch(actionKey, payload) {
      if (typeof this.actions[actionKey] !== 'function') {
        console.error("Action \"".concat(actionKey, " doesn't exist."));
        return false;
      }

      console.groupCollapsed("ACTION: ".concat(actionKey));
      this.status = 'action';
      this.actions[actionKey](this, payload);
      console.groupEnd();
      console.log('DISPATCH this.events');
      console.log(this.events);
      return true;
    }
  }, {
    key: "commit",
    value: function commit(mutationKey, payload) {
      if (typeof this.mutations[mutationKey] !== 'function') {
        console.log("Mutation \"".concat(mutationKey, "\" doesn't exist"));
        return false;
      }

      this.status = 'mutation';
      var newState = this.mutations[mutationKey](this.state, payload);
      this.state = Object.assign(this.state, newState);
      this.events.publish(mutationKey, this.state);
      console.log('COMMIT this.events');
      console.log(this.events);
      return true;
    }
  }]);

  return Store;
}();

exports.default = Store;
},{"../pubsub/pubsub.js":"modules/pubsub/pubsub.js"}],"modules/component/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("../store/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.render = this.render || function () {};

    this.props = props;
    this.name = this.name || '';
  }

  _createClass(Component, [{
    key: "reload",
    value: function reload() {
      if (this.element && this.element.parentElement) {
        var oldElement = this.element;
        var newElement = this.render();
        oldElement.parentElement.replaceChild(newElement, oldElement);
      } else {
        this.render();
      }
    }
  }, {
    key: "compile",
    value: function compile(template) {
      this.element = document.createElement(template.tagName || 'div');
      this.element = this.generate(this.element, template);
      return this.element;
    }
  }, {
    key: "generate",
    value: function generate(element, template) {
      var _this = this;

      if (template.hasOwnProperty('classList')) template.classList.forEach(function (className) {
        return element.classList.add(className);
      });
      if (template.hasOwnProperty('attributes')) for (var attrName in template.attributes) {
        element.setAttribute(attrName, template.attributes[attrName]);
      } //change CamelCase

      if (template.hasOwnProperty('events')) for (var eventName in template.events) {
        console.log('EVENT_NAME: ' + eventName);
        console.log(element);

        if (eventName in element) {
          element[eventName] = template.events[eventName];
          console.log('EVENT_FUNC_NAME: ', template.events[eventName].name);
          window[template.events[eventName].name] = template.events[eventName];
        }
      }
      if (template.hasOwnProperty('textContent')) element.textContent = template.textContent;
      if (template.hasOwnProperty('children')) template.children.forEach(function (child) {
        if (child instanceof HTMLElement) element.append(child);else {
          var childElement = document.createElement(child.tagName || 'div');
          element.append(_this.generate(childElement, child));
        }
      });
      return element;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.display = this.element.style.display;
      this.element.style.display = 'none';
    }
  }, {
    key: "show",
    value: function show() {
      this.element.style.display = this.display || 'block';
    }
  }]);

  return Component;
}();

exports.default = Component;
},{"../store/store.js":"modules/store/store.js"}],"components/header/header.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerTemplate = void 0;

var headerTemplate = function headerTemplate() {
  return {
    tagName: 'h3',
    classList: ['header'],
    attributes: {},
    textContent: "\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439 ".concat(this.props.store.state.items.length, ":"),
    children: []
  };
};

exports.headerTemplate = headerTemplate;
},{}],"store/cpm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cpmStore = void 0;
var cpmStore = {
  state: {
    ticketTypes: {
      support: {
        availableParameters: {
          id: 'Ticket id',
          accountId: 'Customer account id',
          comment: 'User comment',
          currentDate: 'Current date'
        }
      },
      security: {
        availableParameters: {
          id: 'Ticket id',
          accountId: 'Customer account id',
          email: 'Customer email',
          comment: 'User comment',
          currentDate: 'Current date'
        }
      },
      billing: {
        availableParameters: {
          id: 'Ticket id',
          accountId: 'Customer account id',
          billingId: 'Customer billing id',
          comment: 'User comment',
          currentDate: 'Current date'
        }
      },
      sale: {
        availableParameters: {
          id: 'Ticket id',
          accountId: 'Customer account id',
          billingId: 'Customer billing id',
          comment: 'User comment',
          currentDate: 'Current date'
        }
      },
      generic: {
        availableParameters: {
          id: 'Ticket id',
          accountId: 'Customer account id',
          billingId: 'Customer billing id',
          comment: 'User comment',
          currentDate: 'Current date'
        }
      }
    },
    ticketStatuses: ['active', 'canceled', 'executing', 'done', 'notDone'],
    ticketsByCustomers: {
      dateOfCreation: 'Date of creation',
      ticketType: 'Ticket type',
      ticketStatus: 'Ticket status',
      closingDate: 'Closing date'
    },
    sortTicketsByCustomersParameters: {
      dateOfCreation: 'Date of creations',
      closingDate: 'Closing date'
    },
    sortTicketsParameters: {
      ticketType: 'Ticket type',
      dateOfCreation: 'Date of creations',
      closingDate: 'Closing date',
      ticketStatus: 'Ticket status'
    }
  },
  actions: {},
  mutations: {}
};
exports.cpmStore = cpmStore;
},{}],"store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("../modules/store/store.js"));

var _cpm = require("./cpm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  items: ['Привет', 'Как дела', 'Заебись', 'А ты как', 'Тоже заебись'],
  cpm: _cpm.cpmStore.state
};

var _default = new _store.default({
  state: state,
  actions: _objectSpread({
    addItem: function addItem(context, payload) {
      context.commit('addItem', payload);
    },
    clearItem: function clearItem(context, payload) {
      context.commit('clearItem', payload);
    }
  }, _cpm.cpmStore.actions),
  mutations: _objectSpread({
    addItem: function addItem(state, payload) {
      state.items.push(payload);
      return state;
    },
    clearItem: function clearItem(state, payload) {
      state.items.splice(state.items.indexOf(payload.text), 1);
      return state;
    }
  }, _cpm.cpmStore.mutations)
});

exports.default = _default;
},{"../modules/store/store.js":"modules/store/store.js","./cpm.js":"store/cpm.js"}],"components/header/header.component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../modules/component/component.js"));

var _headerTemplate = require("./header.template.js");

var _index = _interopRequireDefault(require("../../store/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Header = /*#__PURE__*/function (_Component) {
  _inherits(Header, _Component);

  var _super = _createSuper(Header);

  function Header() {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, {
      store: _index.default
    });
    _this.state = {};

    _index.default.events.subscribe('addItem', _this.reload.bind(_assertThisInitialized(_this)));

    _index.default.events.subscribe('clearItem', _this.reload.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return this.compile(_headerTemplate.headerTemplate.call(this));
    }
  }]);

  return Header;
}(_component.default);

exports.default = Header;
},{"../../modules/component/component.js":"modules/component/component.js","./header.template.js":"components/header/header.template.js","../../store/index.js":"store/index.js"}],"components/list/list.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTemplate = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var listTemplate = function listTemplate() {
  var _this = this;

  return {
    tagName: 'div',
    classList: ['list'],
    children: [{
      tagName: 'ul',
      classList: ['list__content'],
      children: _toConsumableArray(this.props.store.state.items.map(function (text) {
        return {
          tagName: 'li',
          classList: ['list__item'],
          attributes: {
            'data-key': text
          },
          children: [{
            tagName: 'div',
            classList: ['list__text'],
            textContent: text
          }, {
            tagName: 'button',
            classList: ['list__delete-button'],
            events: {
              onclick: _this.methods.clearItem
            },
            textContent: 'X'
          }]
        };
      }))
    }, {
      tagName: 'input',
      classList: ['list__input']
    }, {
      tagName: 'button',
      classList: ['list__button'],
      events: {
        onclick: this.methods.addItem
      },
      textContent: 'Add'
    }]
  };
};

exports.listTemplate = listTemplate;
},{}],"components/list/list.component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../modules/component/component.js"));

var _listTemplate = require("./list.template.js");

var _index = _interopRequireDefault(require("../../store/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var List = /*#__PURE__*/function (_Component) {
  _inherits(List, _Component);

  var _super = _createSuper(List);

  function List() {
    var _this;

    _classCallCheck(this, List);

    _this = _super.call(this, {
      store: _index.default
    });
    _this.state = {};
    _this.methods = {
      addItem: function addItem() {
        var input = document.querySelector('.list__input');

        _index.default.dispatch('addItem', input.value);
      },
      clearItem: function clearItem(event) {
        _index.default.dispatch('clearItem', event.target.previousElementSibling.textContent);
      }
    };

    _index.default.events.subscribe('addItem', _this.reload.bind(_assertThisInitialized(_this)));

    _index.default.events.subscribe('clearItem', _this.reload.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      return this.compile(_listTemplate.listTemplate.call(this));
    }
  }]);

  return List;
}(_component.default);

exports.default = List;
},{"../../modules/component/component.js":"modules/component/component.js","./list.template.js":"components/list/list.template.js","../../store/index.js":"store/index.js"}],"components/example/example.temlate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exampleTemplate = void 0;

var exampleTemplate = function exampleTemplate() {
  return {
    tagName: 'h1',
    classList: ['example'],
    attributes: {
      style: 'color: red'
    },
    textContent: 'Это простой пример компонента с заголовком',
    children: []
  };
};

exports.exampleTemplate = exampleTemplate;
},{}],"components/example/example.component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../modules/component/component.js"));

var _index = _interopRequireDefault(require("../../store/index.js"));

var _exampleTemlate = require("./example.temlate.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Example = /*#__PURE__*/function (_Component) {
  _inherits(Example, _Component);

  var _super = _createSuper(Example);

  function Example() {
    _classCallCheck(this, Example);

    return _super.call(this, {
      store: _index.default
    });
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return this.compile(_exampleTemlate.exampleTemplate.call(this));
    }
  }]);

  return Example;
}(_component.default);

exports.default = Example;
},{"../../modules/component/component.js":"modules/component/component.js","../../store/index.js":"store/index.js","./example.temlate.js":"components/example/example.temlate.js"}],"components/todo/todo.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoTemplate = void 0;

var _headerComponent = _interopRequireDefault(require("../header/header.component.js"));

var _listComponent = _interopRequireDefault(require("../list/list.component.js"));

var _exampleComponent = _interopRequireDefault(require("../example/example.component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoTemplate = function todoTemplate() {
  return {
    tagName: 'div',
    classList: ['app__content'],
    attributes: {},
    children: [new _headerComponent.default().render(), new _listComponent.default().render()]
  };
};

exports.todoTemplate = todoTemplate;
},{"../header/header.component.js":"components/header/header.component.js","../list/list.component.js":"components/list/list.component.js","../example/example.component.js":"components/example/example.component.js"}],"components/todo/todo.component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../modules/component/component.js"));

var _todoTemplate = require("./todo.template.js");

var _index = _interopRequireDefault(require("../../store/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Todo = /*#__PURE__*/function (_Component) {
  _inherits(Todo, _Component);

  var _super = _createSuper(Todo);

  function Todo() {
    var _this;

    _classCallCheck(this, Todo);

    _this = _super.call(this, {
      store: _index.default
    });
    _this.state = {};
    return _this;
  }

  _createClass(Todo, [{
    key: "render",
    value: function render() {
      document.title = 'App';
      return this.compile(_todoTemplate.todoTemplate.call(this));
    }
  }]);

  return Todo;
}(_component.default);

exports.default = Todo;
},{"../../modules/component/component.js":"modules/component/component.js","./todo.template.js":"components/todo/todo.template.js","../../store/index.js":"store/index.js"}],"components/item/item.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemTemplate = void 0;

var itemTemplate = function itemTemplate() {
  return {
    tagName: 'div',
    classList: ['item'],
    attributes: {
      style: 'color: blue'
    },
    children: [{
      tagName: 'h1',
      classList: ['item__content'],
      attributes: {
        style: 'color: blue'
      },
      textContent: this.props.store.state.items[this.props.index - 1] ? this.props.store.state.items[this.props.index - 1] : 'Такого нет :(',
      children: []
    }, {
      tagName: 'h3',
      classList: ['item__logs'],
      attributes: {
        style: 'color: black'
      },
      textContent: JSON.stringify(this.props.store.state),
      children: []
    }]
  };
};

exports.itemTemplate = itemTemplate;
},{}],"components/item/item.component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../modules/component/component.js"));

var _index = _interopRequireDefault(require("../../store/index.js"));

var _itemTemplate = require("./item.template.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Item = /*#__PURE__*/function (_Component) {
  _inherits(Item, _Component);

  var _super = _createSuper(Item);

  function Item(data) {
    _classCallCheck(this, Item);

    return _super.call(this, _objectSpread({
      store: _index.default
    }, data));
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      return this.compile(_itemTemplate.itemTemplate.call(this));
    }
  }]);

  return Item;
}(_component.default);

exports.default = Item;
},{"../../modules/component/component.js":"modules/component/component.js","../../store/index.js":"store/index.js","./item.template.js":"components/item/item.template.js"}],"components/notFound/notFound.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = void 0;

var template = function template() {
  return {
    tagName: 'h1',
    classList: ['example'],
    attributes: {
      style: 'color: blue'
    },
    textContent: '404: Not found',
    children: []
  };
};

exports.template = template;
},{}],"components/notFound/notFound.component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../modules/component/component.js"));

var _index = _interopRequireDefault(require("../../store/index.js"));

var _notFoundTemplate = require("./notFound.template.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NotFound = /*#__PURE__*/function (_Component) {
  _inherits(NotFound, _Component);

  var _super = _createSuper(NotFound);

  function NotFound(text) {
    _classCallCheck(this, NotFound);

    return _super.call(this, {
      store: _index.default,
      text: text
    });
  }

  _createClass(NotFound, [{
    key: "render",
    value: function render() {
      return this.compile(_notFoundTemplate.template.call(this));
    }
  }]);

  return NotFound;
}(_component.default);

exports.default = NotFound;
},{"../../modules/component/component.js":"modules/component/component.js","../../store/index.js":"store/index.js","./notFound.template.js":"components/notFound/notFound.template.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _router = _interopRequireDefault(require("./modules/router/router.js"));

var _todoComponent = _interopRequireDefault(require("./components/todo/todo.component.js"));

var _exampleComponent = _interopRequireDefault(require("./components/example/example.component.js"));

var _itemComponent = _interopRequireDefault(require("./components/item/item.component.js"));

var _notFoundComponent = _interopRequireDefault(require("./components/notFound/notFound.component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _router.default('.app');
router.use('/', _todoComponent.default).use('/example', _exampleComponent.default).use('/item/:index', _itemComponent.default).use('/404', _notFoundComponent.default).start();
window.router = router;
},{"./modules/router/router.js":"modules/router/router.js","./components/todo/todo.component.js":"components/todo/todo.component.js","./components/example/example.component.js":"components/example/example.component.js","./components/item/item.component.js":"components/item/item.component.js","./components/notFound/notFound.component.js":"components/notFound/notFound.component.js"}],"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59783" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/client.e31bb0bc.js.map