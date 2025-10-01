"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDatePickerLocale = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _date = require("./date");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DatePickerLocaleContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const DatePickerLocaleProvider = ({
  locale = 'en',
  children
}) => {
  const value = (0, _react.useMemo)(() => ({
    locale,
    monthLongNames: _date.DateUtils.getLocalizedMonthNames(locale),
    sortedDateUnitTypes: _date.DateUtils.getSortedDateUnitPositions(locale)
  }), [locale]);
  return /*#__PURE__*/_react.default.createElement(DatePickerLocaleContext.Provider, {
    value: value
  }, children);
};
var _default = exports.default = DatePickerLocaleProvider;
const useDatePickerLocale = () => {
  const value = (0, _react.useContext)(DatePickerLocaleContext);
  if (value === undefined) {
    throw new Error('useDatePickerLocale must be called from within DatePickerLocaleContext.Provider!');
  }
  return (0, _react.useContext)(DatePickerLocaleContext);
};
exports.useDatePickerLocale = useDatePickerLocale;
//# sourceMappingURL=DatePickerLocaleProvider.js.map