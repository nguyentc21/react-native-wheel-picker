import { degToRad } from '../../utils/math';
/**
 * Calculates the height of the element after rotating it relative to the user's screen.
 * @param degree - the angle relative to the screen plane.
 * @param itemHeight - original height
 */
const calcHeight = (degree, itemHeight) => itemHeight * Math.cos(degToRad(degree));
export const calcPickerHeight = (faces, itemHeight) => {
  // TODO left for backward compatibility, it must be removed after updating the major version.
  if (faces.length === 7) {
    return itemHeight * 5;
  }
  return faces.reduce((r, v) => r + calcHeight(Math.abs(v.deg), itemHeight), 0);
};
function curveFunction(x, Z = 0.2, k = 0.1) {
  if (x < 0) throw new Error('X must be >= 0');
  if (Z <= 0 || Z >= 1) throw new Error('Z must be in (0,1)');
  return 1 - (1 - Z) * Math.exp(-k * x);
}
export const createFaces = (itemHeight, visibleCount, maxDegree = 90, opacityRatio = 0.1, curveSpeed = 2) => {
  if (__DEV__) {
    if (visibleCount < 1 || visibleCount % 2 === 0) {
      throw new Error(`WheelPicker cannot display the number of visible items "${visibleCount}".` + ` The value must be greater than 0 and be an odd number. E.g 1, 3, 5, 7...`);
    }
  }

  // e.g [30, 60, 90]
  const getDegreesRelativeCenter = () => {
    const maxStep = Math.trunc((visibleCount + 2) / 2); // + 2 because there are 2 more faces at 90 degrees
    const stepDegree = maxDegree / maxStep;
    const result = [];
    for (let i = 1; i <= maxStep; i++) {
      result.push(i * stepDegree);
    }
    return result;
  };
  const getScreenHeightsAndOffsets = degrees => {
    const screenHeights = degrees.map(deg => calcHeight(deg, itemHeight));
    const freeSpaces = screenHeights.map(screenHeight => itemHeight - screenHeight);
    const offsets = freeSpaces.map((freeSpace, index) => {
      let offset = freeSpace / 2;
      for (let i = 0; i < index; i++) {
        offset += freeSpaces[i];
      }
      return offset;
    });
    return [screenHeights, offsets];
  };
  const getOpacity = (faceIndex, length, opacityRatio) => {
    if (opacityRatio === 0) return 1;
    if (Math.abs(faceIndex) === length - 1) return 0;
    if (faceIndex === 0) return 1;
    return 1 + 0.2 - curveFunction(Math.pow(Math.abs(faceIndex), curveSpeed), 0.2, opacityRatio);
  };
  const degrees = getDegreesRelativeCenter();
  const [screenHeight, offsets] = getScreenHeightsAndOffsets(degrees);
  const length = degrees.length * 2 + 1;
  return [
  // top items
  ...degrees.map((degree, index) => {
    return {
      index: -1 * (index + 1),
      deg: degree,
      opacity: getOpacity(-1 * (index + 1), length, opacityRatio),
      offsetY: -1 * offsets[index],
      screenHeight: screenHeight[index]
    };
  }).reverse(),
  // center item
  {
    index: 0,
    deg: 0,
    opacity: 1,
    offsetY: 0,
    screenHeight: itemHeight
  },
  // bottom items
  ...degrees.map((degree, index) => {
    return {
      index: index + 1,
      deg: -1 * degree,
      opacity: getOpacity(index + 1, length, opacityRatio),
      offsetY: offsets[index],
      screenHeight: screenHeight[index]
    };
  })];
};
//# sourceMappingURL=faces.js.map