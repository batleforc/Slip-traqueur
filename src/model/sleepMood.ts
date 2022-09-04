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
  if (roundedVar < 2) return "red";
  if (roundedVar < 3) return "orange";
  if (roundedVar < 5) return "yellow";
  if (roundedVar < 8) return "green";
  return "blue";
};

export const sleepBorderColor = (val: number) => {
  return sleepBackColor(val);
};
