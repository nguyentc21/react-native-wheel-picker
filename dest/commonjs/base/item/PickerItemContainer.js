"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ScrollContentOffsetContext = require("../contexts/ScrollContentOffsetContext");
var _PickerItemHeightContext = require("../contexts/PickerItemHeightContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PickerItemContainer = ({
  listRef,
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
  enableScrollByTapOnItem,
  readOnly
}) => {
  const offset = (0, _ScrollContentOffsetContext.useScrollContentOffset)();
  const height = (0, _PickerItemHeightContext.usePickerItemHeight)();
  const {
    opacity,
    rotateX,
    translateY
  } = (0, _react.useMemo)(() => {
    const inputRange = faces.map(f => height * (index + f.index));
    return {
      opacity: offset.interpolate({
        inputRange: inputRange,
        outputRange: faces.map(x => x.opacity),
        extrapolate: 'clamp'
      }),
      rotateX: offset.interpolate({
        inputRange: inputRange,
        outputRange: faces.map(x => `${x.deg}deg`),
        extrapolate: 'extend'
      }),
      translateY: offset.interpolate({
        inputRange: inputRange,
        outputRange: faces.map(x => x.offsetY),
        extrapolate: 'extend'
      })
    };
  }, [faces, height, index, offset]);
  const renderAnimatedView = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: [{
        height,
        opacity,
        transform: [{
          translateY
        },
        // first translateY, then rotateX for correct transformation.
        {
          rotateX
        }, {
          perspective: 1000
        } // without this line this Animation will not render on Android https://reactnative.dev/docs/animations#bear-in-mind
        ]
      }]
    }, renderItem({
      item,
      index,
      itemTextStyle
    }));
  };
  if (!enableScrollByTapOnItem || readOnly) {
    return renderAnimatedView();
  }
  const scrollToItem = () => {
    var _listRef$current;
    return (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollToIndex({
      index,
      animated: true
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: scrollToItem
  }, renderAnimatedView());
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(PickerItemContainer);
//# sourceMappingURL=PickerItemContainer.js.map