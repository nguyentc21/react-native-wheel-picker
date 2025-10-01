"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateContext = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _dateFns = require("date-fns");
var _pickerControl = require("../picker-control");
var _date = require("./date");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DatePickerContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const DatePickerValueProvider = ({
  date,
  maxDate,
  minDate,
  onDateChanged,
  children
}) => {
  const {
    min,
    max
  } = (0, _react.useMemo)(() => {
    const now = new Date();
    const getMaxDefault = () => {
      const year = now.getFullYear() + 100;
      const month = 11;
      return new Date(year, month, _date.DateUtils.getDaysInMonth(year, month));
    };
    const getMinDefault = () => new Date(now.getFullYear() - 100, 0, 1);
    return {
      max: maxDate ? new Date(maxDate) : getMaxDefault(),
      min: minDate ? new Date(minDate) : getMinDefault()
    };
  }, [maxDate, minDate]);
  const pickerControl = (0, _pickerControl.usePickerControl)();
  (0, _pickerControl.useOnPickerValueChangedEffect)(pickerControl, event => {
    const nextUnits = {
      year: event.pickers.year.item.value,
      month: event.pickers.month.item.value,
      date: event.pickers.date.item.value
    };
    const daysInCurMonth = (0, _dateFns.getDaysInMonth)(new Date(nextUnits.year, nextUnits.month));
    if (daysInCurMonth < nextUnits.date) {
      nextUnits.date = daysInCurMonth;
    }
    const curDateObj = new Date(date);
    const dateObj = new Date(nextUnits.year, nextUnits.month, nextUnits.date);
    const normalizedDateObj = _date.DateUtils.withBoundaries(dateObj, min, max);
    if ((0, _dateFns.isSameDay)(curDateObj, normalizedDateObj)) {
      return;
    }
    onDateChanged === null || onDateChanged === void 0 || onDateChanged({
      date: _date.DateUtils.toOnlyDateFormat({
        year: normalizedDateObj.getFullYear(),
        month: normalizedDateObj.getMonth(),
        date: normalizedDateObj.getDate()
      })
    });
  });
  const value = (0, _react.useMemo)(() => ({
    pickerControl,
    value: _date.DateUtils.toUnits(_date.DateUtils.withBoundaries(new Date(date), min, max)),
    max,
    min
  }), [pickerControl, date, max, min]);
  return /*#__PURE__*/_react.default.createElement(DatePickerContext.Provider, {
    value: value
  }, children);
};
var _default = exports.default = DatePickerValueProvider;
const useDateContext = () => {
  const value = (0, _react.useContext)(DatePickerContext);
  if (value === undefined) {
    throw new Error('useDateContext must be called from within DatePicker.Provider!');
  }
  return (0, _react.useContext)(DatePickerContext);
};
exports.useDateContext = useDateContext;
//# sourceMappingURL=DatePickerValueProvider.js.map