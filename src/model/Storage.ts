import type { SleepMood } from "./sleepMood";

export interface StoredValue {
  MoodValue: Array<SleepMood>;
  SleepValue: Array<SleepMood>;
}

const getStorage = (): StoredValue => {
  const storedValue = localStorage.getItem("SleepMood");
  if (storedValue === null) return { MoodValue: [], SleepValue: [] };
  return JSON.parse(storedValue);
};

const setStorage = (value: StoredValue) => {
  localStorage.setItem("SleepMood", JSON.stringify(value));
};

export const setSleepValue = (value: Array<SleepMood>) => {
  const storedValue = getStorage();
  storedValue.SleepValue = value;
  setStorage(storedValue);
};

export const setMoodValue = (value: Array<SleepMood>) => {
  const storedValue = getStorage();
  storedValue.MoodValue = value;
  setStorage(storedValue);
};

export const getSleeValue = (): Array<SleepMood> => {
  return getStorage().SleepValue;
};
export const getMoodValue = (): Array<SleepMood> => {
  return getStorage().MoodValue;
};

export const clearStorage = () => {
  localStorage.removeItem("SleepMood");
};

export const clearSleepValue = () => {
  const storedValue = getStorage();
  storedValue.SleepValue = [];
  setStorage(storedValue);
};

export const clearsMoodValue = () => {
  const storedValue = getStorage();
  storedValue.MoodValue = [];
  setStorage(storedValue);
};
