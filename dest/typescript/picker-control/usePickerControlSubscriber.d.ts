import type { PickerItem } from '@implementation/base';
import type { Control } from './create-control';
export declare const usePickerControlSubscriber: ({ control, pickerName, currentItem, }: {
    control: Control;
    pickerName: string;
    currentItem: PickerItem<unknown>;
}) => {
    extraValues: unknown[];
    enableSyncScrollAfterScrollEnd: boolean;
    onScrollStart: () => void;
    onScrollEnd: (() => void) | (() => void);
    emitOnValueChanged: (() => void) | ((event: import("@implementation/base").ValueChangedEvent<PickerItem<unknown>>) => void);
    emitOnValueChanging: (() => void) | ((event: import("@implementation/base").ValueChangingEvent<PickerItem<unknown>>) => void);
};
//# sourceMappingURL=usePickerControlSubscriber.d.ts.map