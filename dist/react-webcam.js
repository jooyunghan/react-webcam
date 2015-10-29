(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Webcam"] = factory(require("react"));
	else
		root["Webcam"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function hasGetUserMedia() {
	  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	var Webcam = (function (_Component) {
	  _inherits(Webcam, _Component);

	  _createClass(Webcam, null, [{
	    key: 'defaultProps',
	    value: {
	      audio: true,
	      height: 480,
	      width: 640
	    },
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: {
	      audio: _react.PropTypes.bool,
	      height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	      width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
	    },
	    enumerable: true
	  }, {
	    key: 'mountedInstances',
	    value: [],
	    enumerable: true
	  }, {
	    key: 'userMediaRequested',
	    value: false,
	    enumerable: true
	  }]);

	  function Webcam() {
	    _classCallCheck(this, Webcam);

	    _Component.call(this);
	    this.state = {
	      hasUserMedia: false
	    };
	  }

	  Webcam.prototype.componentDidMount = function componentDidMount() {
	    if (!hasGetUserMedia()) return;

	    Webcam.mountedInstances.push(this);

	    if (!this.state.hasUserMedia && !Webcam.userMediaRequested) {
	      this.requestUserMedia();
	    }
	  };

	  Webcam.prototype.requestUserMedia = function requestUserMedia() {
	    var _this = this;

	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	    var sourceSelected = function sourceSelected(audioSource, videoSource) {
	      var constraints = {
	        video: {
	          optional: [{ sourceId: videoSource }]
	        }
	      };

	      if (_this.props.audio) {
	        constraints.audio = {
	          optional: [{ sourceId: audioSource }]
	        };
	      }

	      navigator.getUserMedia(constraints, function (stream) {
	        Webcam.mountedInstances.forEach(function (instance) {
	          return instance.handleUserMedia(null, stream);
	        });
	      }, function (e) {
	        Webcam.mountedInstances.forEach(function (instance) {
	          return instance.handleUserMedia(error);
	        });
	      });
	    };

	    if (this.props.audioSource && this.props.videoSource) {
	      sourceSelected(this.props.audioSource, this.props.videoSource);
	    } else {
	      MediaStreamTrack.getSources(function (sourceInfos) {
	        var audioSource = null;
	        var videoSource = null;

	        sourceInfos.forEach(function (sourceInfo) {
	          if (sourceInfo.kind === 'audio') {
	            audioSource = sourceInfo.id;
	          } else if (sourceInfo.kind === 'video') {
	            videoSource = sourceInfo.id;
	          }
	        });

	        sourceSelected(audioSource, videoSource);
	      });
	    }

	    Webcam.userMediaRequested = true;
	  };

	  Webcam.prototype.handleUserMedia = function handleUserMedia(error, stream) {
	    if (error) {
	      this.setState({
	        hasUserMedia: false
	      });

	      return;
	    }

	    var src = window.URL.createObjectURL(stream);

	    this.setState({
	      hasUserMedia: true,
	      src: src
	    });
	  };

	  Webcam.prototype.componentWillUnmount = function componentWillUnmount() {
	    var index = Webcam.mountedInstances.indexOf(this);
	    Webcam.mountedInstances.splice(index, 1);

	    if (Webcam.mountedInstances.length === 0 && this.state.hasUserMedia) {
	      window.URL.revokeObjectURL(this.state.src);
	    }
	  };

	  Webcam.prototype.getScreenshot = function getScreenshot() {
	    if (!this.state.hasUserMedia) return;

	    var canvas = document.createElement('canvas');
	    var video = _react2['default'].findDOMNode(this.refs.video);
	    canvas.height = video.clientHeight;
	    canvas.width = video.clientWidth;

	    var ctx = canvas.getContext('2d');
	    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	    return canvas.toDataURL('image/webp');
	  };

	  Webcam.prototype.render = function render() {
	    return _react2['default'].createElement('video', {
	      autoPlay: true,
	      width: this.props.width,
	      height: this.props.height,
	      src: this.state.src,
	      ref: 'video'
	    });
	  };

	  return Webcam;
	})(_react.Component);

	exports['default'] = Webcam;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;