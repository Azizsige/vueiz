<template>
  <div
    class="flex min-h-screen 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-zinc-700"
  >
    <LeftBar />
    <StartQuiz />
  </div>
</template>
<script setup>
import LeftBar from "../components/LeftBar.vue";
import StartQuiz from "../components/StartQuiz.vue";

import { useStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import axios from "axios";

const store = useStore();
const { name, getName, getQuiz, nameEnpoint } = storeToRefs(store);

console.log(store.name);
</script>
<style lang=""></style>
