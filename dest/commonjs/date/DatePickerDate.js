"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _dateFns = require("date-fns");
var _base = _interopRequireDefault(require("../base"));
var _pickerControl = require("../picker-control");
var _DatePickerValueProvider = require("./DatePickerValueProvider");
var _useOverlayItemStyle = require("./useOverlayItemStyle");
var _DatePickerLocaleProvider = require("./DatePickerLocaleProvider");
var _DatePickerCommonPropsProvider = require("./DatePickerCommonPropsProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HocPicker = (0, _DatePickerCommonPropsProvider.withCommonProps)((0, _pickerControl.withPickerControl)(_base.default));
const DatePickerDate = ({
  width = 60,
  overlayItemStyle: overlayItemStyleProp,
  ...restProps
}) => {
  const localeData = (0, _DatePickerLocaleProvider.useDatePickerLocale)();
  const dateContext = (0, _DatePickerValueProvider.useDateContext)();
  const value = dateContext.value;
  const daysInMount = (0, _dateFns.getDaysInMonth)(new Date(value.year, value.month));
  const data = (0, _react.useMemo)(() => {
    return [...Array(daysInMount).keys()].map(index => ({
      value: index + 1
    }));
  }, [daysInMount]);
  const overlayItemStyle = (0, _useOverlayItemStyle.useOverlayItemStyle)({
    curUnit: 'date',
    unitPositions: localeData.sortedDateUnitTypes,
    propStyle: overlayItemStyleProp
  });
  return /*#__PURE__*/_react.default.createElement(HocPicker, _extends({
    width: width,
    overlayItemStyle: overlayItemStyle
  }, restProps, {
    pickerName: 'date',
    control: dateContext.pickerControl,
    value: value.date,
    data: data
  }));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(DatePickerDate);
//# sourceMappingURL=DatePickerDate.js.map