import { type RefObject } from 'react';
import type { ListMethods } from '../../types';
import type { Animated } from 'react-native';
declare const useSyncScrollEffect: ({ listRef, value, valueIndex, extraValues, activeIndexRef, touching, enableSyncScrollAfterScrollEnd, offsetYAv, itemHeight, }: {
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
    onScrollEnd: () => void;
};
export default useSyncScrollEffect;
//# sourceMappingURL=useSyncScrollEffect.d.ts.map