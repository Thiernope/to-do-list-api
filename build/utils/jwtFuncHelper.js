"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwtSimple = _interopRequireDefault(require("jwt-simple"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(user) {
  var accessToken = jwt.encode(user, process.env.ACCESS_SECRET_TOKEN);

  if (!accessToken) {
    return {
      message: "Oops, something went wrong"
    };
  }

  return {
    token: accessToken
  };
};

var _default = generateToken;
exports["default"] = _default;