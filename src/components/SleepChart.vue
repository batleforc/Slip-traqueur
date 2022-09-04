<script setup lang="ts">
import { useMainStore } from "@/stores/Main";
import { onMounted, shallowRef, watch, type ShallowRef } from "vue";
import Chart, { type ChartItem } from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
const Main = useMainStore();
const chartSleep: ShallowRef<Chart | null> = shallowRef(null);

watch(
  () => Main.SleepValue,
  () => {
    if (chartSleep.value) {
      chartSleep.value.data.datasets[0].data = Main.SleepValue;
      chartSleep.value.data.datasets[0].backgroundColor = Main.sleepBackColors;
      chartSleep.value.data.datasets[0].borderColor = Main.sleepBorderColors;
      chartSleep.value.data.datasets[1].data = Main.SleepValue;
      chartSleep.value.data.datasets[1].backgroundColor = Main.sleepBackColors;
      chartSleep.value.data.datasets[1].borderColor = Main.sleepBorderColors;
      chartSleep.value.update();
    }
  },
  { deep: true }
);

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
      onClick: (e) => {
        if (chartSleep.value !== null) {
          const canvasPosition = getRelativePosition(e, chartSleep.value);
          const dataX = chartSleep.value.scales.x.getValueForPixel(
            canvasPosition.x
          );
          const dataY = chartSleep.value.scales.y.getValueForPixel(
            canvasPosition.y
          );
          if (dataX === undefined || dataY === undefined) return;
          Main.AddSleepValue(dataX, dataY);
        }
      },
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
