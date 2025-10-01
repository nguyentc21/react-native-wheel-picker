import React from 'react';
import type { TextStyle } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { KeyExtractor, OnValueChanged, OnValueChanging, PickerItem, RenderItem, RenderItemContainer, RenderList, RenderOverlay } from '../types';
type TransformOptions = {
    /** 0 to 90 (deg)*/
    maxDegree?: number;
    /** Default = 0.1. The larger the number, the dimmer the items near the center are*/
    opacityRatio?: number;
    /** Default = 2. The larger the number, the faster the items near the center change*/
    curveSpeed?: number;
};
export type PickerProps<ItemT extends PickerItem<any>> = {
    data: ReadonlyArray<ItemT>;
    value: ItemT['value'];
    extraValues?: unknown[];
    itemHeight?: number;
    visibleItemCount?: number;
    width?: number | 'auto' | `${number}%`;
    readOnly?: boolean;
    testID?: string;
    enableScrollByTapOnItem?: boolean;
    onValueChanging?: OnValueChanging<ItemT>;
    onValueChanged?: OnValueChanged<ItemT>;
    keyExtractor?: KeyExtractor<ItemT>;
    renderItem?: RenderItem<ItemT>;
    renderItemContainer?: RenderItemContainer<ItemT>;
    renderOverlay?: RenderOverlay | null;
    renderList?: RenderList<ItemT>;
    style?: StyleProp<ViewStyle>;
    itemTextStyle?: StyleProp<TextStyle>;
    overlayItemStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    scrollEventThrottle?: number;
    _enableSyncScrollAfterScrollEnd?: boolean;
    _onScrollStart?: () => void;
    _onScrollEnd?: () => void;
} & TransformOptions;
export declare const useValueIndex: (data: ReadonlyArray<PickerItem<any>>, value: any) => number;
declare const Picker: <ItemT extends PickerItem<any>>({ data, value, extraValues, width, itemHeight, visibleItemCount, readOnly, enableScrollByTapOnItem, testID, onValueChanged, onValueChanging, keyExtractor, renderItem, renderItemContainer, renderOverlay, renderList, style, itemTextStyle, overlayItemStyle, contentContainerStyle, _enableSyncScrollAfterScrollEnd, _onScrollStart, _onScrollEnd, maxDegree, opacityRatio, curveSpeed, ...restProps }: PickerProps<ItemT>) => React.JSX.Element;
export default Picker;
//# sourceMappingURL=Picker.d.ts.map