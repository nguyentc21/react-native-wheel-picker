export type Faces = {
    index: number;
    deg: number;
    offsetY: number;
    opacity: number;
    screenHeight: number;
};
export declare const calcPickerHeight: (faces: Faces[], itemHeight: number) => number;
export declare const createFaces: (itemHeight: number, visibleCount: number, maxDegree?: number, opacityRatio?: number, curveSpeed?: number) => Faces[];
//# sourceMappingURL=faces.d.ts.map