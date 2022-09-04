<script setup lang="ts">
import { useMainStore } from "@/stores/Main";
defineProps<{
  title?: string;
}>();

const Main = useMainStore();
</script>

<template>
  <div class="title">
    <h1 v-if="title === undefined">
      Mood & Sleep Trackers : {{ Main.month }} {{ Main.year }}
    </h1>
    <h1 v-else>{{ title }}</h1>
  </div>
</template>
