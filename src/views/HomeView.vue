<script setup lang="ts">
import { ref } from "vue";

const month = ref("Septembre");
const year = ref("2022");

const moodType = ["Great", "Good", "MEH !", "Tense/Anxous", "Sad/Angry"];
// https://vue-chartjs.org/guide/#creating-your-first-chart
</script>

<template>
  <div class="sheet">
    <div class="top-margin">
      <div class="hole"></div>
      <div class="hole"></div>
      <div class="hole hidden md:block"></div>
      <div class="hole hidden md:block"></div>
    </div>
    <div class="title">
      <h1>Mood & Sleep Trackers : {{ month }} {{ year }}</h1>
    </div>
    <div class="content">
      <p>Content</p>
    </div>
  </div>
</template>
