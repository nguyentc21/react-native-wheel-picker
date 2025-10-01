"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PickerItemHeightContext = require("../contexts/PickerItemHeightContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PickerItem = ({
  value,
  label,
  itemTextStyle
}) => {
  const height = (0, _PickerItemHeightContext.usePickerItemHeight)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.root, {
      lineHeight: height
    }, itemTextStyle]
  }, label ?? value);
};
const styles = _reactNative.StyleSheet.create({
  root: {
    textAlign: 'center',
    fontSize: 20
  }
});
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(PickerItem);
//# sourceMappingURL=PickerItem.js.map