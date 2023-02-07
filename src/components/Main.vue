<script setup>
import axios from "axios";
import { ref, computed, watch, onMounted, reactive } from "vue";

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

const getCategoriesClick = async (item) => {
  console.log(item);
  if (item == "Arts & Literature") {
    await axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=5"
      )
      .then((results) => {
        console.log(results.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  } else if (item == "Film & TV") {
    await axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5"
      )
      .then((results) => {
        console.log(results.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  } else if (item == "Food & Drink") {
    await axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=5"
      )
      .then((results) => {
        console.log(results.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  } else if (item == "General Knowledge") {
    await axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=5"
      )
      .then((results) => {
        console.log(results.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  } else if (item == "Society & Culture") {
    await axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=society_and_culture&limit=5"
      )
      .then((results) => {
        console.log(results.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  } else if (item == "Sport & Leisure") {
    await axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=5"
      )
      .then((results) => {
        console.log(results.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  } else {
    await axios
      .get(
        `https://the-trivia-api.com/api/questions?categories=${item.toLowerCase()}&limit=5`
      )
      .then((results) => {
        console.log(results.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }
};

onMounted(async () => {
  await getCategories();
});
</script>

<template>
  <main class="flex-1 py-10 px-5 sm:px-10">
    <div class="wrapper flex justify-center w-full flex-wrap gap-5">
      <div
        class="categories-1"
        v-for="(item, index) in categories.value"
        @click="getCategoriesClick(index)"
      >
        <a
          href="#"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ index }}
          </h5>
        </a>
      </div>
    </div>
  </main>
</template>
<script setup></script>
<style scoped></style>
