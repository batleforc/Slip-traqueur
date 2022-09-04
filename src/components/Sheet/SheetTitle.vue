<script setup lang="ts">
import { useMainStore } from "@/stores/Main";

const Main = useMainStore();
</script>

<template>
  <div class="title">
    <h1>Mood & Sleep Trackers : {{ Main.month }} {{ Main.year }}</h1>
  </div>
</template>
