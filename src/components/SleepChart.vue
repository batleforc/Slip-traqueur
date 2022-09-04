<script setup lang="ts">
import { useMainStore } from "@/stores/Main";
import { onMounted, ref, type Ref } from "vue";
import Chart, { type ChartItem } from "chart.js/auto";

const Main = useMainStore();
const chartSleep: Ref<Chart | null> = ref(null);
onMounted(() => {
  var ctx = document.getElementById("sleep");
  chartSleep.value = new Chart(ctx as ChartItem, {
    type: "line",
    data: {
      labels: Main.Day,
      datasets: [
        {
          label: "Sleep",
          data: Main.SleepValue,
          segment: {
            borderWidth: 1,
            borderColor: "black",
          },
          pointRadius: 8,
          backgroundColor: Main.sleepBackColors,
          borderColor: Main.sleepBorderColors,
          borderWidth: 1,
        },
        {
          label: "Sleep2",
          type: "bar",
          data: Main.SleepValue,
          backgroundColor: Main.sleepBackColors,
          borderColor: Main.sleepBorderColors,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: Main.sleepRatio,
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          position: "top",
          offset: true,
          beginAtZero: true,
          min: 1,
          max: 31,
        },
        y: {
          stackWeight: 1,
          beginAtZero: true,
          max: Main.SleepHours.length - 1,
          min: 0,
          offset: true,
          ticks: {
            stepSize: 1,
            callback: (value: any) => {
              return Main.SleepHours[value];
            },
          },
        },
      },
    },
  });
});
</script>
<template>
  <div class="sleepContainer">
    <canvas id="sleep"></canvas>
  </div>
</template>
