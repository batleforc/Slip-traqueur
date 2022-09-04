<script setup lang="ts">
import {
  clearSleepValue,
  clearsMoodValue,
  clearStorage,
} from "@/model/Storage";
import { useMainStore } from "@/stores/Main";
import SheetMargin from "../components/Sheet/SheetMargin.vue";
import SheetTitle from "../components/Sheet/SheetTitle.vue";

const Main = useMainStore();
</script>

<template>
  <div class="sheet">
    <SheetMargin />
    <SheetTitle title="Help Menu" />
    <div class="content">
      <div class="flex flex-col">
        <button
          @click="
            clearStorage();
            Main.ReloadData();
          "
        >
          Reset Storage
        </button>
        <button
          @click="
            clearsMoodValue();
            Main.ReloadData();
          "
        >
          Reset Mood
        </button>
        <button
          @click="
            clearSleepValue();
            Main.ReloadData();
          "
        >
          Reset Sleep
        </button>
        <button @click="Main.ReloadData()">Reload Storage</button>
      </div>
      <div>
        <p>Sleep</p>
        <div v-if="Main.SleepValue.length == 0" class="my-2 mx-6">
          <p>Empty</p>
        </div>
        <ul class="list-disc my-2 mx-6">
          <li v-for="val in Main.SleepValue" :key="val.x">
            Day {{ val.x }} => {{ val.y }} : {{ Main.SleepHours[val.y] }}
          </li>
        </ul>
      </div>
      <div>
        <p>Mood</p>
        <div v-if="Main.MoodValue.length == 0" class="my-2 mx-6">
          <p>Empty</p>
        </div>
        <ul class="list-disc my-2 mx-6">
          <li v-for="val in Main.MoodValue" :key="val.x">
            Day {{ val.x }} => {{ val.y }} : {{ Main.MoodType[val.y] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
