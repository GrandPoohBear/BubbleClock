import {makeAutoObservable, reaction} from 'mobx';
import {bubbleModel} from '../Display/BubbleModel';

class TimerModel {
  isRunning = false;
  intervalHandle: NodeJS.Timer | undefined = undefined;
  finishTime = new Date();
  lastUpdatedTime = new Date();
  timeString = '000';
  initialTimeString = '100';
  isDone = false;

  constructor() {
    makeAutoObservable(this);
  }

  updateTimeString() {
    const now = new Date();
    const secsDiff = (this.finishTime.getTime() - now.getTime()) / 1000;

    const filteredSecsDiff =
      secsDiff - (secsDiff % bubbleModel.refreshIntervalSecs);

    if (secsDiff < 0) {
      this.isRunning = false;
      this.isDone = true;
      return '000';
    }

    const minutes = '' + Math.floor(filteredSecsDiff / 60);
    const seconds = ('' + (filteredSecsDiff % 60)).padStart(2, '0');

    this.timeString = `${minutes}${seconds}`;
  }

  startTimer = (numSeconds: number) => {
    const targetDate = new Date();
    targetDate.setTime(targetDate.getTime() + numSeconds * 1000);

    this.finishTime = targetDate;
    this.isRunning = true;
    this.isDone = false;
  };

  stopTimer = () => {
    this.isRunning = false;
  };

  setInitialTimeString = (timeString: string) => {
    this.initialTimeString = timeString;
    if (!this.isRunning) {
      this.timeString = timeString;
    }
  };

  updateTimer = (currentTime: Date, intervalHandle: NodeJS.Timer) => {
    this.lastUpdatedTime = currentTime;
    this.intervalHandle = intervalHandle;
    this.updateTimeString();
  };
}

export const timerModel = new TimerModel();
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
