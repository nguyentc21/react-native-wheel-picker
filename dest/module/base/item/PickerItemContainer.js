import React, { memo, useMemo } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { useScrollContentOffset } from '../contexts/ScrollContentOffsetContext';
import { usePickerItemHeight } from '../contexts/PickerItemHeightContext';
const PickerItemContainer = ({
  listRef,
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
  enableScrollByTapOnItem,
  readOnly,
  onPressItem
}) => {
  const offset = useScrollContentOffset();
  const height = usePickerItemHeight();
  const {
    opacity,
    rotateX,
    translateY
  } = useMemo(() => {
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
    return /*#__PURE__*/React.createElement(Animated.View, {
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
  if (readOnly || !enableScrollByTapOnItem && !onPressItem) {
    return renderAnimatedView();
  }
  const handlePress = () => {
    if (enableScrollByTapOnItem) {
      var _listRef$current;
      (_listRef$current = listRef.current) === null || _listRef$current === void 0 || _listRef$current.scrollToIndex({
        index,
        animated: true
      });
    }
    onPressItem === null || onPressItem === void 0 || onPressItem({
      item,
      index
    });
  };
  return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: handlePress
  }, renderAnimatedView());
};
export default /*#__PURE__*/memo(PickerItemContainer);
//# sourceMappingURL=PickerItemContainer.js.map