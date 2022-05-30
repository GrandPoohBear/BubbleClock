import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Bubble, StaticBubble} from './Bubble';
import {make2DSparseShuffleTable} from '../utility/ShuffleTable';
import {bubbleModel} from './BubbleModel';
import {observer} from 'mobx-react-lite';
import {reaction} from 'mobx';
import {timerModel} from '../Timer/TimerModel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BACKGROUND_BLACKISH} from '../colors';
import {makeDotArray} from '../Font/makeDotArray';
import {isUndefined} from 'lodash';

const initialDotArray = makeDotArray('000', bubbleModel.currentFont);

export const BubbleContainer = observer(() => {
  const [displayData, setDisplayData] = useState({
    timeString: '000',
    shuffleTable: make2DSparseShuffleTable(initialDotArray),
    dotArray: initialDotArray,
  });

  const safeAreaInsets = useSafeAreaInsets();
  useEffect(() => {
    bubbleModel.setSafeAreaInsets(safeAreaInsets);
  }, [safeAreaInsets]);

  useEffect(() => {
    const disposer = reaction(
      () => timerModel.timeString,
      () => {
        const dotArray = makeDotArray(
          timerModel.timeString,
          bubbleModel.currentFont,
        );
        setDisplayData({
          timeString: timerModel.timeString,
          shuffleTable: make2DSparseShuffleTable(dotArray),
          dotArray: dotArray,
        });
      },
    );

    return () => {
      disposer();
    };
  });

  let staticCount = 0;
  let dynamicCount = 0;

  const bubbleArray = displayData.dotArray.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      if (isUndefined(cell)) {
        staticCount++;
        return (
          <StaticBubble
            key={`bubble_${rowIndex}_${colIndex}`}
            x={
              rowIndex *
              (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace)
            }
            y={
              colIndex *
              (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace)
            }
            enabled={false}
          />
        );
      }
      //console.log(`r: ${rowIndex}, c: ${colIndex}, v: ${cell}`);
      const shuffledVal = displayData.shuffleTable.getVal(rowIndex, colIndex);
      const shuffledCoords = displayData.shuffleTable.getCoords(
        rowIndex,
        colIndex,
      );
      dynamicCount++;
      return (
        <Bubble
          key={`bubble_${rowIndex}_${colIndex}`}
          x={
            shuffledCoords[1] *
            (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace)
          }
          y={
            shuffledCoords[0] *
            (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace)
          }
          enabled={shuffledVal || false}
        />
      );
    });
  });

  console.log(`static: ${staticCount}. dynamic: ${dynamicCount}`);
  return (
    <View style={bubbleStyles.container}>
      <View
        style={{
          marginBottom:
            (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace) *
              bubbleModel.currentFont.charHeight +
            bubbleModel.topOffset +
            20,
        }}>
        {bubbleArray}
      </View>
    </View>
  );
});

const bubbleStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_BLACKISH,
  },
});
