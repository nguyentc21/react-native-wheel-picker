"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactUsefulHooks = require("@rozhkov/react-useful-hooks");
var _react2 = require("../../../utils/react");
const useSyncScrollEffect = ({
  listRef,
  value,
  valueIndex,
  extraValues = [],
  activeIndexRef,
  touching,
  enableSyncScrollAfterScrollEnd,
  offsetYAv,
  itemHeight
}) => {
  const lastOffsetYValueRef = (0, _react.useRef)(0);
  (0, _react.useEffect)(() => {
    const id = offsetYAv.addListener(({
      value
    }) => {
      lastOffsetYValueRef.current = value;
    });
    return () => offsetYAv.removeListener(id);
  }, [offsetYAv]);
  const syncScroll = (0, _reactUsefulHooks.useStableCallback)(() => {
    const isSelectedNotInCenter = lastOffsetYValueRef.current % itemHeight > itemHeight * 0.1;
    if (listRef.current == null || touching || activeIndexRef.current === valueIndex && !isSelectedNotInCenter) {
      return;
    }
    listRef.current.scrollToIndex({
      index: valueIndex,
      animated: true
    });
  });
  const timeoutId = (0, _react.useRef)(undefined);
  (0, _react2.useEffectWithDynamicDepsLength)(() => {
    clearTimeout(timeoutId.current);
    // fix: loops between two values. We are making a small delay so that the value in other places can be updated for verification.
    timeoutId.current = setTimeout(syncScroll, 0);
  }, [valueIndex, enableSyncScrollAfterScrollEnd, ...extraValues]);
  const onScrollEnd = (0, _reactUsefulHooks.useStableCallback)(() => {
    if (enableSyncScrollAfterScrollEnd && value !== undefined) {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(syncScroll, 0);
    }
  });
  return {
    onScrollEnd
  };
};
var _default = exports.default = useSyncScrollEffect;
//# sourceMappingURL=useSyncScrollEffect.js.map