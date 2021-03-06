'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Actions = exports.Content = exports.Dialog = exports.show = exports.defer = exports.prompt = exports.confirm = exports.alert = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Utility functions {{
function arrify(el) {
	if (typeof el == 'undefined') return [];
	return Array.isArray(el) ? el : [el];
}

function defer() {
	var d = {};
	d.promise = new Promise(function (y, n) {
		return d.resolve = y, d.reject = n;
	});
	return d;
}
// }}

// Helper React Components {{

var DialogContent = function (_React$Component) {
	_inherits(DialogContent, _React$Component);

	function DialogContent() {
		_classCallCheck(this, DialogContent);

		return _possibleConstructorReturn(this, (DialogContent.__proto__ || Object.getPrototypeOf(DialogContent)).apply(this, arguments));
	}

	_createClass(DialogContent, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.children
			);
		}
	}]);

	return DialogContent;
}(_react2.default.Component);

var DialogActions = function (_React$Component2) {
	_inherits(DialogActions, _React$Component2);

	function DialogActions() {
		_classCallCheck(this, DialogActions);

		return _possibleConstructorReturn(this, (DialogActions.__proto__ || Object.getPrototypeOf(DialogActions)).apply(this, arguments));
	}

	_createClass(DialogActions, [{
		key: 'getActions',
		value: function getActions() {
			return this.props.children;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.children
			);
		}
	}]);

	return DialogActions;
}(_react2.default.Component);

var DialogWrapper = function (_React$Component3) {
	_inherits(DialogWrapper, _React$Component3);

	function DialogWrapper(props) {
		_classCallCheck(this, DialogWrapper);

		var _this3 = _possibleConstructorReturn(this, (DialogWrapper.__proto__ || Object.getPrototypeOf(DialogWrapper)).call(this, props));

		_this3.state = { open: true };
		return _this3;
	}

	_createClass(DialogWrapper, [{
		key: 'close',
		value: function close() {
			this.setState({ open: false });
		}
	}, {
		key: 'render',
		value: function render() {
			var _arrify$filter = arrify(this.props.children).filter(function (c) {
				return c.type == DialogContent;
			}),
			    _arrify$filter2 = _slicedToArray(_arrify$filter, 1),
			    content = _arrify$filter2[0];

			var _arrify$filter3 = arrify(this.props.children).filter(function (c) {
				return c.type == DialogActions;
			}),
			    _arrify$filter4 = _slicedToArray(_arrify$filter3, 1),
			    actions = _arrify$filter4[0];

			return _react2.default.createElement(
				_MuiThemeProvider2.default,
				{ muiTheme: (0, _getMuiTheme2.default)() },
				_react2.default.createElement(
					_Dialog2.default,
					{
						open: this.state.open,
						actions: arrify(actions.props.children),
						title: this.props.title },
					_react2.default.cloneElement(content, { ref: 'content' })
				)
			);
		}
	}]);

	return DialogWrapper;
}(_react2.default.Component);
// }}

function show(dialog) {
	var div = document.createElement('div');
	document.body.appendChild(div);
	function cleanup() {
		_reactDom2.default.unmountComponentAtNode(div);
		document.body.removeChild(div);
	}

	var dlg = _reactDom2.default.render(dialog, div);

	return dlg.promise.then(function (result) {
		setTimeout(function () {
			return cleanup();
		}, 2000);
		return result;
	}).catch(function (e) {
		setTimeout(function () {
			return cleanup();
		}, 2000);
		throw e;
	});
}

function alert(title, message) {
	if (typeof message == 'undefined') {
		message = title;
		title = 'Alert';
	}

	var DialogContainer = function (_React$Component4) {
		_inherits(DialogContainer, _React$Component4);

		function DialogContainer() {
			_classCallCheck(this, DialogContainer);

			var _this4 = _possibleConstructorReturn(this, (DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call(this));

			_this4.deferred = defer();
			_this4.promise = _this4.deferred.promise;
			return _this4;
		}

		_createClass(DialogContainer, [{
			key: 'render',
			value: function render() {
				var _this5 = this;

				return _react2.default.createElement(
					DialogWrapper,
					{ title: title, ref: 'dlg' },
					_react2.default.createElement(
						DialogContent,
						null,
						_react2.default.createElement(
							'div',
							null,
							message
						)
					),
					_react2.default.createElement(
						DialogActions,
						null,
						_react2.default.createElement(_FlatButton2.default, {
							label: 'Okay',
							onClick: function onClick() {
								_this5.deferred.resolve();
								_this5.refs.dlg.close();
							} })
					)
				);
			}
		}]);

		return DialogContainer;
	}(_react2.default.Component);

	return show(_react2.default.createElement(DialogContainer, null));
}

function confirm(title, message) {
	if (typeof message == 'undefined') {
		message = title;
		title = 'Confirm';
	}

	var DialogContainer = function (_React$Component5) {
		_inherits(DialogContainer, _React$Component5);

		function DialogContainer() {
			_classCallCheck(this, DialogContainer);

			var _this6 = _possibleConstructorReturn(this, (DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call(this));

			_this6.deferred = defer();
			_this6.promise = _this6.deferred.promise;
			return _this6;
		}

		_createClass(DialogContainer, [{
			key: 'render',
			value: function render() {
				var _this7 = this;

				return _react2.default.createElement(
					DialogWrapper,
					{ title: title, ref: 'dlg' },
					_react2.default.createElement(
						DialogContent,
						null,
						_react2.default.createElement(
							'div',
							null,
							message
						)
					),
					_react2.default.createElement(
						DialogActions,
						null,
						_react2.default.createElement(_FlatButton2.default, {
							label: 'No',
							secondary: true,
							onClick: function onClick() {
								_this7.deferred.resolve(false);
								_this7.refs.dlg.close();
							} }),
						_react2.default.createElement(_FlatButton2.default, {
							label: 'Yes',
							primary: true,
							onClick: function onClick() {
								_this7.deferred.resolve(true);
								_this7.refs.dlg.close();
							} })
					)
				);
			}
		}]);

		return DialogContainer;
	}(_react2.default.Component);

	return show(_react2.default.createElement(DialogContainer, null));
}

function prompt(title, message, defaultValue) {
	if (arguments.length == 1) {
		message = title;
		title = 'Prompt';
	}
	defaultValue = defaultValue || '';

	var DialogContainer = function (_React$Component6) {
		_inherits(DialogContainer, _React$Component6);

		function DialogContainer() {
			_classCallCheck(this, DialogContainer);

			var _this8 = _possibleConstructorReturn(this, (DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call(this));

			_this8.deferred = defer();
			_this8.promise = _this8.deferred.promise;
			return _this8;
		}

		_createClass(DialogContainer, [{
			key: 'render',
			value: function render() {
				var _this9 = this;

				return _react2.default.createElement(
					DialogWrapper,
					{ title: title, ref: 'dlg' },
					_react2.default.createElement(
						DialogContent,
						null,
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'div',
								null,
								this.props.message
							),
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_TextField2.default, {
									style: { width: '100%' },
									defaultValue: defaultValue,
									ref: 'text' })
							)
						)
					),
					_react2.default.createElement(
						DialogActions,
						null,
						_react2.default.createElement(_FlatButton2.default, {
							label: 'Cancel',
							secondary: true,
							onClick: function onClick() {
								_this9.deferred.resolve(null);
								_this9.refs.dlg.close();
							} }),
						_react2.default.createElement(_FlatButton2.default, {
							label: 'Okay',
							primary: true,
							onClick: function onClick() {
								_this9.deferred.resolve(_this9.refs.text.getValue());
								_this9.refs.dlg.close();
							} })
					)
				);
			}
		}]);

		return DialogContainer;
	}(_react2.default.Component);

	return show(_react2.default.createElement(DialogContainer, null));
}

exports.alert = alert;
exports.confirm = confirm;
exports.prompt = prompt;
exports.defer = defer;
exports.show = show;
exports.Dialog = DialogWrapper;
exports.Content = DialogContent;
exports.Actions = DialogActions;
