import { Color } from "./Color";

export interface SleepMood {
  x: number;
  y: number;
}

export interface SleepMoodType {
  name: string;
  bgColor: string;
  borderColor: string;
}

export const sleepBackColor = (val: number) => {
  var roundedVar = Math.round(val);
  if (roundedVar < 4) return Color.Red;
  if (roundedVar < 6) return Color.Orange;
  if (roundedVar < 7) return Color.Purple;
  if (roundedVar < 8) return Color.Blue;
  return Color.Green;
};

export const sleepBorderColor = (val: number) => {
  return sleepBackColor(val);
};
