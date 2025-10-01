"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _DatePickerDate = _interopRequireDefault(require("./DatePickerDate"));
var _DatePickerMonth = _interopRequireDefault(require("./DatePickerMonth"));
var _DatePickerYear = _interopRequireDefault(require("./DatePickerYear"));
var _DatePickerLocaleProvider = require("./DatePickerLocaleProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DatePickerContainer = ({
  renderDate = () => /*#__PURE__*/_react.default.createElement(_DatePickerDate.default, null),
  renderMonth = () => /*#__PURE__*/_react.default.createElement(_DatePickerMonth.default, null),
  renderYear = () => /*#__PURE__*/_react.default.createElement(_DatePickerYear.default, null),
  children
}) => {
  const localeData = (0, _DatePickerLocaleProvider.useDatePickerLocale)();
  const typeToRenderMap = {
    date: renderDate,
    month: renderMonth,
    year: renderYear
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, children({
    dateNodes: localeData.sortedDateUnitTypes.map(type => ({
      type,
      node: /*#__PURE__*/_react.default.createElement(_react.Fragment, {
        key: type
      }, typeToRenderMap[type]())
    }))
  }));
};
var _default = exports.default = DatePickerContainer;
//# sourceMappingURL=DatePickerContainer.js.map