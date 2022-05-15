import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {makeDotArray} from './BubbleUtilities';

import {Bubble} from './Bubble';

export const BUBBLE_WIDTH = 10;
export const INTER_BUBBLE_SPACE = 3;

export const BubbleView = () => {
  const [timeString, setTimeString] = useState('0000');
  const [dotArray, setDotArray] = useState(makeDotArray(timeString));

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = ('' + date.getHours()).padStart(2, '0');
      const minutes = ('' + date.getMinutes()).padStart(2, '0');
      const newTimeString = `${hours}${minutes}`;
      if (timeString !== newTimeString) {
        setTimeString(timeString);
        setDotArray(makeDotArray(newTimeString));
      }
    }, 300);
    return () => {
      clearInterval(interval);
    };
  });

  const bubbleArray = dotArray.flatMap((row, rowIndex) => {
    return row.flatMap((cell, colIndex) => {
      return (
        <Bubble
          key={`bubble_${rowIndex * row.length + colIndex}`}
          x={colIndex * (BUBBLE_WIDTH + INTER_BUBBLE_SPACE)}
          y={rowIndex * (BUBBLE_WIDTH + INTER_BUBBLE_SPACE)}
          enabled={cell}
        />
      );
    });
  });
  return <View style={bubbleStyles.container}>{bubbleArray}</View>;
};

const bubbleStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  bubble: {
    position: 'absolute',
    width: BUBBLE_WIDTH,
    height: BUBBLE_WIDTH,
    borderRadius: BUBBLE_WIDTH,
  },
});
