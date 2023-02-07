<template>
  <div
    class="flex min-h-screen 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-zinc-700"
  >
    <LeftBar />
    <Suspense>
      <!-- component with nested async dependencies -->
      <Main />
      <!-- loading state via #fallback slot -->
      <template #fallback>
        <h1 class="text-7xl text-red-700">Loading...</h1>
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import LeftBar from "../components/LeftBar.vue";
import Main from "../components/Main.vue";
</script>
<style></style>
