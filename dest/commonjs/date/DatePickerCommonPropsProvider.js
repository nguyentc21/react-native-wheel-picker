"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCommonProps = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactUsefulHooks = require("@rozhkov/react-useful-hooks");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DatePickerCommonPropsContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const DatePickerCommonPropsProvider = ({
  children,
  ...restProps
}) => {
  const memoizedValue = (0, _reactUsefulHooks.useMemoObject)(restProps);
  return /*#__PURE__*/_react.default.createElement(DatePickerCommonPropsContext.Provider, {
    value: memoizedValue
  }, children);
};
var _default = exports.default = DatePickerCommonPropsProvider;
const useDatePickerCommonProps = () => {
  const value = (0, _react.useContext)(DatePickerCommonPropsContext);
  if (value === undefined) {
    throw new Error('useDatePickerCommonProps must be called from within DatePickerCommonPropsContext.Provider!');
  }
  return (0, _react.useContext)(DatePickerCommonPropsContext);
};
const withCommonProps = WheelPickerComponent => {
  const WrappedWheelPicker = ({
    style: pickerStyleProp,
    contentContainerStyle: contentContainerStyleProp,
    itemTextStyle: itemTextStyleProp,
    overlayItemStyle: overlayItemStyleProp,
    ...restProps
  }, forwardedRef) => {
    const {
      pickerStyle: pickerStyleCommon,
      contentContainerStyle: contentContainerStyleCommon,
      itemTextStyle: itemTextStyleCommon,
      overlayItemStyle: overlayItemStyleCommon,
      ...restCommonProps
    } = useDatePickerCommonProps();
    const style = (0, _reactUsefulHooks.useMemoObject)([pickerStyleCommon, pickerStyleProp]);
    const contentContainerStyle = (0, _reactUsefulHooks.useMemoObject)([contentContainerStyleCommon, contentContainerStyleProp]);
    const itemTextStyle = (0, _reactUsefulHooks.useMemoObject)([itemTextStyleCommon, itemTextStyleProp]);
    const overlayItemStyle = (0, _reactUsefulHooks.useMemoObject)([overlayItemStyleCommon, overlayItemStyleProp]);
    return /*#__PURE__*/_react.default.createElement(WheelPickerComponent, _extends({}, restCommonProps, restProps, {
      style: style,
      contentContainerStyle: contentContainerStyle,
      itemTextStyle: itemTextStyle,
      overlayItemStyle: overlayItemStyle,
      ref: forwardedRef
    }));
  };
  WrappedWheelPicker.displayName = `withDateCommonProps(${WheelPickerComponent.displayName})`;
  return /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(WrappedWheelPicker));
};
exports.withCommonProps = withCommonProps;
//# sourceMappingURL=DatePickerCommonPropsProvider.js.map