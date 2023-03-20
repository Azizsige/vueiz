<script setup>
import axios from "axios";
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const { name, nameEndpoint } = storeToRefs(store);

const categories = reactive({
  value: [],
});

const getCategories = async () => {
  await axios
    .get("https://the-trivia-api.com/api/categories")
    .then((results) => {
      categories.value = results.data;
    })
    .catch((errr) => {
      console.log(errr);
    });
};

const getCategoriesClick = (item) => {
  console.log(item);
  store.name = item;
  if (store.name == "Arts & Literature") {
    store.nameEndpoint = "arts_and_literature";
  } else if (store.name == "Film & TV") {
    store.nameEndpoint = "film_and_tv";
  } else if (store.name == "Food & Drink") {
    store.nameEndpoint = "food_and_drink";
  } else if (store.name == "General Knowledge") {
    store.nameEndpoint = "general_knowledge";
  } else if (store.name == "Society & Culture") {
    store.nameEndpoint = "society_and_culture";
  } else if (store.name == "Sport & Leisure") {
    store.nameEndpoint = "sport_and_leisure";
  } else {
    store.nameEndpoint = store.name.toLowerCase();
  }

  router.push("/start-quiz");

  console.log(store.name);
};

onMounted(async () => {
  await getCategories();
});
</script>

<template>
  <main class="flex-1 py-10 px-5 sm:px-10">
    <h1 class="text-3xl text-white text-center font-bold mb-8">Categories</h1>

    <div class="selectDifficulty flex items-center space-x-2 mb-16">
      <label
        for="countries"
        class="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Select an difficulty :
      </label>
      <select
        v-model="store.difficultyStore"
        id="countries"
        class="bg-gray-50 hover:cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled value="">Choose a difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
        <option>Random</option>
      </select>
    </div>

    <div class="wrapper flex justify-center w-full flex-wrap gap-5">
      <div
        class="categories-1 hover:cursor-pointer"
        v-for="(item, index) in categories.value"
        @click="getCategoriesClick(index)"
      >
        <div
          class="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <p
            class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ index }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
