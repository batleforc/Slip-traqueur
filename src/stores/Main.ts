import {
  sleepBackColor,
  sleepBorderColor,
  type SleepMood,
  type SleepMoodType,
} from "@/model/sleepMood";
import {
  getMoodValue,
  getSleeValue,
  setMoodValue,
  setSleepValue,
} from "@/model/Storage";
import type { Chart } from "chart.js";
import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "Main",
  state: () => ({
    counter: 0,
    month: "September",
    year: 2022,
    Day: [...Array(31).keys()].map((i) => i + 1),
    MoodType: [
      { name: "Great", bgColor: "blue", borderColor: "blue" },
      { name: "Good", bgColor: "green", borderColor: "green" },
      { name: "Meh", bgColor: "yellow", borderColor: "yellow" },
      { name: "Tense/Anxious", bgColor: "orange", borderColor: "orange" },
      { name: "Sad/Angry", bgColor: "red", borderColor: "red" },
    ].reverse() as SleepMoodType[],
    SleepHours: [...Array(11).keys()].map((i) => i + 1 + "h"),
    MoodValue: getMoodValue(),
    SleepValue: getSleeValue(),
  }),
  getters: {
    sleepRatio: (state) => 2.2,
    moodRatio: (state) => state.Day.length / state.MoodType.length,
    moodBorderColors: (state) =>
      state.MoodValue.map((m) => state.MoodType[Math.round(m.y)].borderColor),
    moodBackColors: (state) =>
      state.MoodValue.map((m) => state.MoodType[Math.round(m.y)].bgColor),
    sleepBorderColors: (state) =>
      state.SleepValue.map((m) => sleepBorderColor(m.y)),
    sleepBackColors: (state) =>
      state.SleepValue.map((m) => sleepBackColor(m.y)),
  },
  actions: {
    AddMoodValue(x: number | undefined, y: number | undefined) {
      if (x === undefined || y === undefined) return false;
      var index = this.MoodValue.findIndex((m) => m.x === Math.round(x) + 1);
      if (index === -1) {
        this.MoodValue = [
          ...this.MoodValue,
          { x: Math.round(x) + 1, y: Math.round(y) },
        ].sort((a, b) => a.x - b.x);
      } else {
        this.MoodValue[index].y = Math.round(y);
      }
      setMoodValue(this.MoodValue);
    },
    AddSleepValue(x: number | undefined, y: number | undefined) {
      if (x === undefined || y === undefined) return false;
      var index = this.SleepValue.findIndex((m) => m.x === Math.round(x) + 1);
      if (index === -1) {
        this.SleepValue = [
          ...this.SleepValue,
          { x: Math.round(x) + 1, y: Math.round(y) },
        ].sort((a, b) => a.x - b.x);
      } else {
        this.SleepValue[index].y = Math.round(y);
      }
      setSleepValue(this.SleepValue);
    },
    ReloadData() {
      this.MoodValue = getMoodValue();
      this.SleepValue = getSleeValue();
    },
  },
});
