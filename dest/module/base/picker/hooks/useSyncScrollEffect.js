import { useRef, useEffect } from 'react';
import { useStableCallback } from '@rozhkov/react-useful-hooks';
import { useEffectWithDynamicDepsLength } from '../../../utils/react';
const MAX_SYNC_SCROLL_RETRIES = 5;
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
  const lastOffsetYValueRef = useRef(0);
  useEffect(() => {
    const id = offsetYAv.addListener(({
      value
    }) => {
      lastOffsetYValueRef.current = value;
    });
    return () => offsetYAv.removeListener(id);
  }, [offsetYAv]);
  // guards against scrollToIndex -> onScrollEnd -> syncScroll looping forever
  // when the centering check never settles (e.g. a stale offset read)
  const retryCountRef = useRef(0);
  const syncScroll = useStableCallback(() => {
    const isSelectedNotInCenter = lastOffsetYValueRef.current % itemHeight > itemHeight * 0.1;
    if (listRef.current == null || touching || activeIndexRef.current === valueIndex && !isSelectedNotInCenter) {
      retryCountRef.current = 0;
      return;
    }
    if (retryCountRef.current >= MAX_SYNC_SCROLL_RETRIES) {
      return;
    }
    retryCountRef.current += 1;
    listRef.current.scrollToIndex({
      index: valueIndex,
      animated: true
    });
  });
  const timeoutId = useRef(undefined);
  useEffectWithDynamicDepsLength(() => {
    clearTimeout(timeoutId.current);
    retryCountRef.current = 0;
    // fix: loops between two values. We are making a small delay so that the value in other places can be updated for verification.
    timeoutId.current = setTimeout(syncScroll, 0);
  }, [valueIndex, enableSyncScrollAfterScrollEnd, ...extraValues]);
  const onScrollEnd = useStableCallback(() => {
    if (enableSyncScrollAfterScrollEnd && value !== undefined) {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(syncScroll, 0);
    }
  });
  return {
    onScrollEnd
  };
};
export default useSyncScrollEffect;
//# sourceMappingURL=useSyncScrollEffect.js.map