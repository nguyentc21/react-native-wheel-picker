"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _scrolling = require("../../utils/scrolling");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// TODO "any" is not an exact type. How to pass the generic type?
const ExtendedAnimatedFlatList = (0, _scrolling.withScrollStartEndEvent)(_reactNative.Animated.FlatList);
const VirtualizedList = ({
  initialIndex,
  data,
  keyExtractor,
  renderItem,
  itemHeight,
  pickerHeight,
  visibleItemCount,
  readOnly,
  scrollOffset,
  onTouchEnd,
  onTouchStart,
  onTouchCancel,
  onScrollStart,
  onScrollEnd,
  contentContainerStyle: contentContainerStyleProp,
  initialNumToRender,
  maxToRenderPerBatch,
  updateCellsBatchingPeriod = 10,
  windowSize,
  ...restProps
}, forwardedRef) => {
  const snapToOffsets = (0, _react.useMemo)(() => data.map((_, i) => i * itemHeight), [data, itemHeight]);
  const onScroll = (0, _react.useMemo)(() => _reactNative.Animated.event([{
    nativeEvent: {
      contentOffset: {
        y: scrollOffset
      }
    }
  }], {
    useNativeDriver: true
  }), [scrollOffset]);
  const getItemLayout = (0, _react.useCallback)((_, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index
  }), [itemHeight]);
  const contentContainerStyle = (0, _react.useMemo)(() => {
    return [{
      paddingVertical: (pickerHeight - itemHeight) / 2
    }, contentContainerStyleProp];
  }, [pickerHeight, itemHeight, contentContainerStyleProp]);
  return /*#__PURE__*/_react.default.createElement(ExtendedAnimatedFlatList, _extends({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 16,
    scrollEnabled: !readOnly
  }, restProps, {
    ref: forwardedRef,
    data: data,
    renderItem: renderItem,
    keyExtractor: keyExtractor,
    getItemLayout: getItemLayout,
    initialScrollIndex: initialIndex,
    onScroll: onScroll,
    scrollOffset: scrollOffset,
    snapToOffsets: snapToOffsets,
    style: styles.list,
    contentContainerStyle: contentContainerStyle,
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd,
    onTouchCancel: onTouchCancel,
    onScrollStart: onScrollStart,
    onScrollEnd: onScrollEnd,
    initialNumToRender: initialNumToRender ?? Math.ceil(visibleItemCount / 2),
    maxToRenderPerBatch: maxToRenderPerBatch ?? Math.ceil(visibleItemCount / 2),
    updateCellsBatchingPeriod: updateCellsBatchingPeriod,
    windowSize: windowSize,
    nestedScrollEnabled: true,
    removeClippedSubviews: false
  }));
};
const styles = _reactNative.StyleSheet.create({
  list: {
    width: '100%',
    overflow: 'visible'
  }
});
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(VirtualizedList));
//# sourceMappingURL=VirtualizedList.js.map