import {type RefObject, useRef, useEffect} from 'react';
import {useStableCallback} from '@rozhkov/react-useful-hooks';
import {useEffectWithDynamicDepsLength} from '../../../utils/react';
import type {ListMethods} from '../../types';
import type {Animated} from 'react-native';
const useSyncScrollEffect = ({
  listRef,
  value,
  valueIndex,
  extraValues = [],
  activeIndexRef,
  touching,
  enableSyncScrollAfterScrollEnd,
  offsetYAv,
  itemHeight,
}: {
  listRef: RefObject<ListMethods | null>;
  value: unknown;
  valueIndex: number;
  extraValues: unknown[] | undefined;
  activeIndexRef: RefObject<number>;
  touching: boolean;
  enableSyncScrollAfterScrollEnd: boolean;
  offsetYAv: Animated.Value;
  itemHeight: number;
}) => {
  const lastOffsetYValueRef = useRef(0);
  useEffect(() => {
    const id = offsetYAv.addListener(({value}) => {
      lastOffsetYValueRef.current = value;
    });
    return () => offsetYAv.removeListener(id);
  }, [offsetYAv]);
  const syncScroll = useStableCallback(() => {
    const isSelectedNotInCenter =
      lastOffsetYValueRef.current % itemHeight > itemHeight * 0.1;
    if (
      listRef.current == null ||
      touching ||
      (activeIndexRef.current === valueIndex && !isSelectedNotInCenter)
    ) {
      return;
    }
    listRef.current.scrollToIndex({
      index: valueIndex,
      animated: true,
    });
  });
  const timeoutId = useRef<any>(undefined);
  useEffectWithDynamicDepsLength(() => {
    clearTimeout(timeoutId.current);
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
    onScrollEnd,
  };
};
export default useSyncScrollEffect;
