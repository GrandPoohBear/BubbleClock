import React, {useState, useCallback, useEffect} from 'react';
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
import {reaction} from 'mobx';
import {timerModel} from '../Timer/TimerModel';

export const BubbleContainer = observer(() => {
  const [displayData, setDisplayData] = useState({
    timeString: '0000',
    shuffleTable: makeShuffleTable(DISPLAY_DOTS_HEIGHT * DISPLAY_DOTS_WIDTH),
    dotArray: makeDotArray('0000'),
  });

  useEffect(() => {
    const disposer = reaction(
      () => timerModel.timeString,
      () => {
        setDisplayData({
          timeString: timerModel.timeString,
          shuffleTable: shuffle(displayData.shuffleTable),
          dotArray: makeDotArray(timerModel.timeString),
        });
      },
    );

    return () => {
      disposer();
    };
  });

  const shuffleCallback = useCallback(() => {
    setDisplayData({
      ...displayData,
      shuffleTable: shuffle(displayData.shuffleTable),
    });
  }, [displayData]);

  const start1MinuteTimer = useCallback(() => {
    timerModel.startTimer(1 * 60);
  }, []);

  const start3MinuteTimer = useCallback(() => {
    timerModel.startTimer(3 * 60);
  }, []);

  const start5MinuteTimer = useCallback(() => {
    timerModel.startTimer(5 * 60);
  }, []);

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
      <View
        style={{
          marginBottom:
            (bubbleModel.bubbleWidth + bubbleModel.interBubbleSpace) *
              DISPLAY_DOTS_HEIGHT +
            bubbleModel.topOffset +
            20,
        }}>
        {bubbleArray}
      </View>
      <Button title="Reshuffle" onPress={shuffleCallback} />
      <Button title="Start 1 Minute Timer" onPress={start1MinuteTimer} />
      <Button title="Start 3 Minute Timer" onPress={start3MinuteTimer} />
      <Button title="Start 5 Minute Timer" onPress={start5MinuteTimer} />
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
