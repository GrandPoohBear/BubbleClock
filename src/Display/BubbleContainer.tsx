import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {
  makeDotArray,
  DISPLAY_DOTS_HEIGHT,
  DISPLAY_DOTS_WIDTH,
} from './BubbleFont';
import {shuffle} from 'lodash';
import {Bubble} from './Bubble';
import {makeShuffleTable} from '../utility/ShuffleTable';
import {bubbleModel} from './BubbleModel';
import {observer} from 'mobx-react-lite';

export const BubbleContainer = observer(() => {
  const [displayData, setDisplayData] = useState({
    timeString: '0000',
    shuffleTable: makeShuffleTable(DISPLAY_DOTS_HEIGHT * DISPLAY_DOTS_WIDTH),
    dotArray: makeDotArray('0000'),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = ('' + date.getHours()).padStart(2, '0');
      const minutes = ('' + date.getMinutes()).padStart(2, '0');
      const newTimeString = `${hours}${minutes}`;
      if (displayData.timeString !== newTimeString) {
        setDisplayData({
          timeString: newTimeString,
          shuffleTable: shuffle(displayData.shuffleTable),
          dotArray: makeDotArray(newTimeString),
        });
      }
    }, 300);
    return () => {
      clearInterval(interval);
    };
  });

  const shuffleCallback = useCallback(() => {
    setDisplayData({
      ...displayData,
      shuffleTable: shuffle(displayData.shuffleTable),
    });
  }, [displayData]);

  const bubbleArray = displayData.dotArray.flatMap((row, rowIndex) => {
    return row.flatMap((cell, colIndex) => {
      const myIndex = rowIndex * row.length + colIndex;
      const shuffledIndex = displayData.shuffleTable[myIndex];
      const shuffledColIndex = shuffledIndex % DISPLAY_DOTS_WIDTH;
      const shuffledRowIndex = Math.floor(shuffledIndex / DISPLAY_DOTS_WIDTH);
      const shuffledCell =
        displayData.dotArray[shuffledRowIndex][shuffledColIndex];

      return (
        <Bubble
          key={`bubble_${myIndex}`}
          x={
            shuffledColIndex *
            (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace)
          }
          y={
            shuffledRowIndex *
            (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace)
          }
          enabled={shuffledCell}
        />
      );
    });
  });

  return (
    <View style={bubbleStyles.container}>
      <View>{bubbleArray}</View>
      <Button title="Reshuffle" onPress={shuffleCallback} />
    </View>
  );
});

const bubbleStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});
