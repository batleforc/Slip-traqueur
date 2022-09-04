<script setup lang="ts">
import SheetMargin from "../components/Sheet/SheetMargin.vue";
import SheetTitle from "../components/Sheet/SheetTitle.vue";
import MoodChart from "../components/MoodChart.vue";
import SleepChart from "../components/SleepChart.vue";
</script>

<template>
  <div class="sheet">
    <SheetMargin />
    <SheetTitle />
    <div class="content">
      <MoodChart />
      <SleepChart />
    </div>
  </div>
</template>
