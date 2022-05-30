import {reaction} from 'mobx';
import {TimerModel} from './TimerModel';
import Sound from 'react-native-sound';

export const addTimerReactions = (timerModel: TimerModel) => {
  reaction(
    () => timerModel.isRunning,
    (isRunning, wasRunning) => {
      if (isRunning && !wasRunning) {
        const interval = setInterval(() => {
          timerModel.updateTimer(new Date(), interval);
        }, 50);
      } else if (!isRunning && wasRunning) {
        clearInterval(timerModel.intervalHandle);
      }
    },
  );

  // Enable playback in silence mode
  Sound.setCategory('Playback');
  const bubblePop = new Sound('bubble-pop.mp3', Sound.MAIN_BUNDLE);
  reaction(
    () => timerModel.isDone,
    (isDone, wasDone) => {
      if (!wasDone && isDone) {
        bubblePop.play();
      } else if (wasDone && !isDone) {
        bubblePop.pause();
        bubblePop.reset();
      }
    },
  );
};
