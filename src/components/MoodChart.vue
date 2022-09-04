<script setup lang="ts">
import { useMainStore } from "@/stores/Main";
import { onMounted, shallowRef, watch, type ShallowRef } from "vue";
import Chart, { type ChartItem } from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
const Main = useMainStore();
const chartMood: ShallowRef<Chart | null> = shallowRef(null);

watch(
  () => Main.MoodValue,
  () => {
    if (chartMood.value) {
      chartMood.value.data.datasets[0].data = Main.MoodValue;
      chartMood.value.data.datasets[0].backgroundColor = Main.moodBackColors;
      chartMood.value.data.datasets[0].borderColor = Main.moodBorderColors;
      chartMood.value.data.datasets[1].data = Main.MoodValue;
      chartMood.value.data.datasets[1].backgroundColor = Main.moodBackColors;
      chartMood.value.data.datasets[1].borderColor = Main.moodBorderColors;
      chartMood.value.update();
    }
  },
  { deep: true }
);

onMounted(() => {
  var ctx = document.getElementById("mood");
  if (chartMood.value === null)
    chartMood.value = new Chart(ctx as ChartItem, {
      type: "line",
      data: {
        labels: Main.Day,
        datasets: [
          {
            label: "Mood",
            data: Main.MoodValue,
            segment: {
              borderWidth: 1,
              borderColor: "black",
            },
            pointRadius: 8,
            backgroundColor: Main.moodBackColors,
            borderColor: Main.moodBorderColors,
            borderWidth: 1,
          },
          {
            label: "Mood2",
            type: "bar",
            data: Main.MoodValue,
            backgroundColor: Main.moodBackColors,
            borderColor: Main.moodBorderColors,
          },
        ],
      },
      options: {
        onClick: (e) => {
          if (chartMood.value !== null) {
            const canvasPosition = getRelativePosition(e, chartMood.value);
            const dataX = chartMood.value.scales.x.getValueForPixel(
              canvasPosition.x
            );
            const dataY = chartMood.value.scales.y.getValueForPixel(
              canvasPosition.y
            );
            if (dataX === undefined || dataY === undefined) return;
            Main.AddMoodValue(dataX, dataY);
          }
        },
        maintainAspectRatio: true,
        aspectRatio: Main.moodRatio,
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
            beginAtZero: false,
            min: 1,
            max: 31,
          },
          y: {
            stackWeight: 1,
            beginAtZero: true,
            max: Main.MoodType.length - 1,
            min: 0,
            offset: true,
            ticks: {
              stepSize: 1,
              callback: (value: any) => {
                return Main.MoodType[value].name;
              },
            },
          },
        },
      },
    });
});
</script>
<template>
  <div class="moodContainer">
    <canvas id="mood"></canvas>
  </div>
</template>
